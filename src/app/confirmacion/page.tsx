import Link from 'next/link'

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center animate-in fade-in zoom-in duration-1000">
            <div className="max-w-2xl w-full bg-white p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">
                    ✓
                </div>

                <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4 tracking-tight">
                    ¡Cuestionario Enviado!
                </h1>

                <p className="text-gray-500 text-lg mb-12 leading-relaxed">
                    Tu intake narrativo ha sido recibido con éxito. El equipo de MUSE comenzará la extracción de tu voz y expertise de inmediato.
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-12 text-left space-y-6">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Timeline Estimado</h2>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</div>
                            <div>
                                <p className="font-bold text-gray-900">Día 2-3: Procesamiento</p>
                                <p className="text-sm text-gray-500">MUSE extrae patrones de voz e identifica huecos narrativos.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</div>
                            <div>
                                <p className="font-bold text-gray-900">Día 4-5: Estructura Completa</p>
                                <p className="text-sm text-gray-500">Recibes el índice de 15-20 capítulos y la introducción escrita.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</div>
                            <div>
                                <p className="font-bold text-gray-900">Día 7: Sesión de Revisión</p>
                                <p className="text-sm text-gray-500">Ajustes finales al Blueprint y decisión de avanzar al libro completo.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-8">
                    Hemos enviado una copia de estos próximos pasos a tu correo electrónico.
                </p>

                <Link
                    href="/"
                    className="text-blue-600 font-bold hover:underline"
                >
                    Volver al Inicio
                </Link>
            </div>

            <footer className="mt-12 text-gray-400 text-xs font-medium">
                BizReadyTo | Hexada
            </footer>
        </main>
    )
}
