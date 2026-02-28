import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CuestionarioPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    // Get current session data
    const { data: session } = await supabase
        .from('sessions')
        .select('*')
        .eq('email', user.email)
        .single()

    return (
        <div className="space-y-12 py-12">
            <header className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-4xl font-poppins font-semibold text-gray-900 leading-tight">
                    Bienvenido/a al Intake Estratégico, <span className="text-blue-600">{session?.nombre}</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Este es el primer paso para capturar tu voz y expertise. El cuestionario está dividido en 4 bloques temáticos. Tu progreso se guardará automáticamente mientras escribes.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {[
                    {
                        id: 1,
                        name: 'Identidad',
                        desc: 'Tu historia de origen, tu voz natural y tu posición única.',
                        status: '7 preguntas'
                    },
                    {
                        id: 2,
                        name: 'Expertise',
                        desc: 'Tu metodología, casos de éxito y marcos conceptuales.',
                        status: '7 preguntas'
                    },
                    {
                        id: 3,
                        name: 'Audiencia',
                        desc: 'Quién es tu lector ideal y qué transformación le prometes.',
                        status: '6 preguntas'
                    },
                    {
                        id: 4,
                        name: 'Arquitectura',
                        desc: 'La visión del libro, estructura de capítulos y estilo.',
                        status: '7 preguntas'
                    },
                ].map((bloque) => (
                    <div key={bloque.id} className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-500/5 flex flex-col items-start text-left">
                        <div className="mb-4 text-sm font-semibold text-blue-600 uppercase tracking-widest">Bloque {bloque.id}</div>
                        <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-2">{bloque.name}</h3>
                        <p className="text-gray-500 mb-8 flex-1">{bloque.desc}</p>
                        <div className="w-full flex items-center justify-between mt-auto">
                            <span className="text-xs text-gray-400 font-medium">{bloque.status}</span>
                            <Link
                                href={`/cuestionario/bloque/${bloque.id}`}
                                className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                            >
                                Comenzar →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                    &quot;No te preocupes por la redacción perfecta. MUSE se encarga de pulir tu contenido crudo en un borrador profesional.&quot;
                </p>
            </div>
        </div>
    )
}
