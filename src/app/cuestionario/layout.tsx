import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function QuestionarioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    const bloques = [
        { id: 1, name: 'Identidad', icon: '👤' },
        { id: 2, name: 'Expertise', icon: '🛠️' },
        { id: 3, name: 'Audiencia', icon: '🎯' },
        { id: 4, name: 'Arquitectura', icon: '🏗️' },
    ]

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full shadow-sm">
                <div className="p-6 border-b border-gray-50">
                    <Link href="/cuestionario" className="text-xl font-poppins font-semibold text-gray-900">
                        MUSE Pilot
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {bloques.map((bloque) => (
                        <Link
                            key={bloque.id}
                            href={`/cuestionario/bloque/${bloque.id}`}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-all group"
                        >
                            <span className="text-lg">{bloque.icon}</span>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">Bloque {bloque.id}</span>
                                <span className="text-xs text-gray-400">{bloque.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                            {user.email?.substring(0, 1)}
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-xs font-medium text-gray-900 truncate">{user.email}</span>
                            <span className="text-[10px] text-gray-400">Sesión Activa</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
