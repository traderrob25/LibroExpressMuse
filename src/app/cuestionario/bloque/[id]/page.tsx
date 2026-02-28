import { createClient } from '@/lib/supabase/server'
import { questions } from '@/lib/questions'
import BlockForm from '@/components/BlockForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Params = Promise<{ id: string }>

export default async function BloquePage(props: { params: Params }) {
    const params = await props.params
    const bloqueId = parseInt(params.id)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/')

    // Get session id from email
    let { data: session } = await supabase
        .from('sessions')
        .select('id')
        .eq('email', user.email)
        .single()

    if (!session) {
        // Auto-heal: Try to create the session if it's missing (failsafe)
        const { data: newSession, error: upsertError } = await supabase
            .from('sessions')
            .upsert({
                email: user.email,
                nombre: user.user_metadata.nombre || 'Usuario',
                empresa: user.user_metadata.empresa || '',
                status: 'started',
                updated_at: new Date().toISOString()
            }, { onConflict: 'email' })
            .select('id')
            .single()

        if (upsertError || !newSession) {
            console.error('CRITICAL: Could not find or create session record:', upsertError)
            return redirect('/')
        }
        session = newSession
    }

    // Get existing responses for this block
    const { data: responses } = await supabase
        .from('responses')
        .select('*')
        .eq('session_id', session.id)
        .eq('bloque', bloqueId)

    const blockQuestions = questions.filter(q => q.bloque === bloqueId)

    // Transform responses into a lookup map
    const responsesMap = (responses || []).reduce<Record<number, string>>((acc, curr) => {
        acc[curr.pregunta_numero] = curr.respuesta
        return acc
    }, {})

    const titles: Record<number, string> = {
        1: 'Identidad: Quién Eres y Por Qué Importa',
        2: 'Expertise: Lo Que Sabes y Cómo lo Demuestras',
        3: 'Audiencia: Para Quién Escribes',
        4: 'Arquitectura: La Visión de Tu Libro'
    }

    return (
        <div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
                <div className="flex items-center space-x-3 text-sm font-semibold text-blue-600 uppercase tracking-widest">
                    <span>Bloque {bloqueId}</span>
                    <span className="text-gray-200">/</span>
                    <span className="text-gray-400">Páginas de Trabajo</span>
                </div>
                <h1 className="text-4xl font-poppins font-bold text-gray-900 tracking-tight leading-tight">
                    {titles[bloqueId]}
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl italic leading-relaxed">
                    {bloqueId === 1 && "Este bloque extrae tu historia de origen, tu voz natural, y tu posición única en tu campo. Las respuestas aquí determinan el tono de todo el libro."}
                    {bloqueId === 2 && "Este bloque extrae el contenido duro de tu libro: tu metodología, tus números, tus casos. Sin esto, tienes un libro de opiniones."}
                    {bloqueId === 3 && "Este bloque define a tu lector ideal. Un libro escrito para 'todos' no le habla a nadie."}
                    {bloqueId === 4 && "Este bloque define la forma del libro: su estructura, tono, referencias, y lo que quieres que el lector haga después de leerlo."}
                </p>
            </header>

            <BlockForm
                questions={blockQuestions}
                initialResponses={responsesMap}
                sessionId={session.id}
                bloqueId={bloqueId}
            />
        </div>
    )
}
