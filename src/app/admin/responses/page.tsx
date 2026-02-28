import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Protect route: only admin email allowed
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        redirect('/')
    }

    const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .order('updated_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 p-12 font-poppins">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin: Respuestas MUSE</h1>
                    <div className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">MUSE Dashboard v1.0</div>
                </header>

                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombre / Email</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Empresa</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Últ. Actividad</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {sessions?.map((session) => (
                                <tr key={session.id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{session.nombre}</div>
                                        <div className="text-xs text-gray-400 font-medium">{session.email}</div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{session.empresa || '-'}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {session.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-400 font-medium">
                                        {new Date(session.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Link
                                            href={`/admin/responses/${session.id}`}
                                            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                                        >
                                            <span>Analizar Intake</span>
                                            <span className="opacity-50">→</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!sessions || sessions.length === 0) && (
                        <div className="p-24 text-center text-gray-300 font-medium italic">No hay sesiones registradas aún.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
