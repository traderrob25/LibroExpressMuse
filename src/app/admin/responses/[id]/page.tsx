import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CopyPromptButton from '@/components/CopyPromptButton'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function SessionDetail(props: PageProps) {
    const { id } = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Protect route: only admin email allowed
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        redirect('/')
    }

    const { data: session } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', id)
        .single()

    if (!session) redirect('/admin/responses')

    const { data: responses } = await supabase
        .from('responses')
        .select('*')
        .eq('session_id', id)
        .order('pregunta_numero', { ascending: true })

    const bloques = [
        { id: 1, name: 'Identidad', icon: '👤' },
        { id: 2, name: 'Expertise', icon: '🛠️' },
        { id: 3, name: 'Audiencia', icon: '🎯' },
        { id: 4, name: 'Arquitectura', icon: '🏗️' }
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8 pb-32 font-poppins">
            <div className="max-w-5xl mx-auto space-y-12">

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="space-y-4">
                        <Link href="/admin/responses" className="text-blue-600 font-bold hover:underline flex items-center space-x-2 text-sm">
                            <span>←</span>
                            <span>Volver al Listado</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            Expediente: {session.nombre}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{session.status}</span>
                            <span className="flex items-center space-x-2">
                                <span className="opacity-50">📅</span>
                                <span>Recibido el {new Date(session.updated_at).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-2 text-gray-900 font-medium underline">
                                <span className="opacity-50">📧</span>
                                <a href={`mailto:${session.email}`}>{session.email}</a>
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-600 p-6 rounded-3xl shadow-2xl shadow-blue-500/30 text-white space-y-4 min-w-[340px]">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">⚡</span>
                            <span className="font-bold text-lg">MUSE Extraction Tool</span>
                        </div>
                        <p className="text-[11px] text-blue-100 leading-relaxed opacity-90">
                            Copia todo el Blueprint formateado para Claude. Diseñado para extraer la voz del autor sin alucinaciones.
                        </p>
                        <CopyPromptButton sessionName={session.nombre} responses={responses || []} />
                    </div>
                </header>

                <div className="space-y-16">
                    {bloques.map((bloque) => {
                        const bloqueResponses = responses?.filter(r => r.bloque === bloque.id) || []
                        if (bloqueResponses.length === 0) return null

                        return (
                            <section key={bloque.id} className="space-y-6">
                                <div className="flex items-center space-x-3 text-2xl font-bold text-gray-900 border-l-4 border-blue-500 pl-4 py-1">
                                    <span>{bloque.icon}</span>
                                    <span>Bloque {bloque.id}: {bloque.name}</span>
                                </div>
                                <div className="grid gap-6">
                                    {bloqueResponses.map((r) => (
                                        <div key={r.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 group hover:border-gray-200 transition-colors">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{r.pregunta_texto}</h4>
                                            <div className="text-gray-900 leading-relaxed font-normal whitespace-pre-wrap">
                                                {r.respuesta}
                                            </div>
                                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-300">
                                                <span>P{r.pregunta_numero} • {r.word_count} palabras</span>
                                                <span>Auditado por MUSE System</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
