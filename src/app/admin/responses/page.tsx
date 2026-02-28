import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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
        <div className="min-h-screen bg-gray-50 p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-poppins font-bold text-gray-900">Admin: Respuestas MUSE</h1>
                    <div className="text-sm text-gray-400 font-medium">BETA v1.0</div>
                </header>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Nombre / Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Empresa</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Últ. Actividad</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {sessions?.map((session) => (
                                <tr key={session.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{session.nombre}</div>
                                        <div className="text-xs text-gray-400">{session.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{session.empresa || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {session.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {new Date(session.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Ver Respuestas</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!sessions || sessions.length === 0) && (
                        <div className="p-12 text-center text-gray-400 italic">No hay sesiones registradas aún.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
