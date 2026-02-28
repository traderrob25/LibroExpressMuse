import { createClient } from '@/lib/supabase/server'
import { questions } from '@/lib/questions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SubmitButton from '@/components/SubmitButton'

export default async function PreviewPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/')

    const { data: session } = await supabase
        .from('sessions')
        .select('*')
        .eq('email', user.email)
        .single()

    if (!session) redirect('/')

    const { data: responses } = await supabase
        .from('responses')
        .select('*')
        .eq('session_id', session.id)

    const responsesMap = (responses || []).reduce<Record<number, string>>((acc, curr) => {
        acc[curr.pregunta_numero] = curr.respuesta
        return acc
    }, {})

    // Validation: 80% of required questions must be answered
    const requiredQuestions = questions.filter(q => q.requerida !== false).length
    const answeredCount = questions.filter(q => {
        const res = responsesMap[q.id]
        return res && res.trim().split(/\s+/).length > 5
    }).length

    const completionRate = Math.round((answeredCount / requiredQuestions) * 100)
    const canSubmit = completionRate >= 80

    const bloques = [
        { id: 1, name: 'Identidad' },
        { id: 2, name: 'Expertise' },
        { id: 3, name: 'Audiencia' },
        { id: 4, name: 'Arquitectura' },
    ]

    return (
        <div className="space-y-12 py-8 pb-32">
            <header className="space-y-4 text-center">
                <h1 className="text-4xl font-poppins font-bold text-gray-900 tracking-tight">
                    Revisión Final
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                    Estás a punto de enviar tu intake narrativo. Revisa tus respuestas por bloque. Recuerda que una vez enviado, el formulario quedará bloqueado para edición.
                </p>
            </header>

            {/* Stats Table */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Tasa de Completado</div>
                    <div className="text-3xl font-poppins font-bold text-gray-900">{completionRate}%</div>
                </div>
                <div className="h-12 w-px bg-gray-100" />
                <div className="space-y-1">
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Preguntas con Respuesta</div>
                    <div className="text-3xl font-poppins font-bold text-gray-900">{answeredCount} / {questions.length}</div>
                </div>
                <div className="h-12 w-px bg-gray-100" />
                <div className="flex flex-col items-end">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${canSubmit ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {canSubmit ? 'Listo para Enviar' : 'Pendiente (>80% req.)'}
                    </span>
                </div>
            </div>

            <div className="space-y-8">
                {bloques.map(bloque => (
                    <details key={bloque.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all" open={bloque.id === 1}>
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                            <h3 className="text-xl font-poppins font-semibold text-gray-900 flex items-center space-x-3">
                                <span className="text-gray-300">Bloque {bloque.id}:</span>
                                <span>{bloque.name}</span>
                            </h3>
                            <span className="text-gray-400 group-open:rotate-180 transition-transform duration-300">↓</span>
                        </summary>

                        <div className="p-6 pt-0 space-y-8 border-t border-gray-50 bg-white">
                            {questions.filter(q => q.bloque === bloque.id).map(q => (
                                <div key={q.id} className="space-y-2 border-l-2 border-gray-50 pl-6 py-2 transition-all hover:border-blue-100">
                                    <h4 className="text-sm font-bold text-gray-400">{q.titulo}</h4>
                                    <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                                        {responsesMap[q.id] || <span className="text-gray-300 italic">Sin respuesta...</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>
                ))}
            </div>

            <div className="fixed bottom-12 left-0 right-0 max-w-4xl mx-auto px-8 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl flex items-center justify-between pointer-events-auto">
                    <Link
                        href="/cuestionario/bloque/4"
                        className="text-gray-500 hover:text-gray-900 font-semibold px-4 py-2"
                    >
                        ← Seguir Editando
                    </Link>

                    <SubmitButton canSubmit={canSubmit} sessionId={session.id} />
                </div>
            </div>
        </div>
    )
}
