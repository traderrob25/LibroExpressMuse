'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LandingPage() {
    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const supabase = createClient()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            // 1. Check if session exists for this email
            const { error: sessionError } = await supabase
                .from('sessions')
                .select('*')
                .eq('email', email)
                .order('updated_at', { ascending: false })
                .limit(1)

            if (sessionError) throw sessionError

            // 2. Auth via Magic Link
            const { error: authError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: {
                        nombre,
                        empresa
                    }
                }
            })

            if (authError) throw authError

            setMessage('¡Revisa tu correo! Te hemos enviado un link mágico para entrar.')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error desconocido'
            setMessage(`Error: ${message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-poppins font-semibold text-gray-900 mb-2">Libro Express MUSE</h1>
                    <p className="text-gray-600">Herramienta de intake narrativo</p>
                </header>

                <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <p className="text-sm text-blue-800 leading-relaxed">
                        <strong>Contexto:</strong> Este cuestionario toma 2-3 horas. Puedes pausar y retomar — tu progreso se guarda automáticamente.
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            id="nombre"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Ej: Roberto Noguez"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="tue@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa (Opcional)</label>
                        <input
                            id="empresa"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="BizReadyTo"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : 'Comenzar / Retomar Cuestionario'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-lg text-sm ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {message}
                    </div>
                )}
            </div>

            <footer className="mt-12 text-center text-gray-400 text-xs">
                BizReadyTo | Hexada © 2026
            </footer>
        </main>
    )
}
