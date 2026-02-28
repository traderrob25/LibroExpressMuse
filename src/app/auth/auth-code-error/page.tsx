import Link from 'next/link'

export default function AuthCodeError() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-poppins font-bold text-red-600 mb-4">Error de Autenticación</h1>
                <p className="text-gray-600 mb-8">
                    No pudimos verificar tu acceso. Esto puede pasar si el enlace expiró o ya fue utilizado.
                </p>
                <Link
                    href="/"
                    className="inline-block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                >
                    Intentar de nuevo
                </Link>
            </div>
        </main>
    )
}
