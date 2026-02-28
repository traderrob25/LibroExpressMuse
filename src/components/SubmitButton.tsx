'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubmitButton({ canSubmit, sessionId }: { canSubmit: boolean, sessionId: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (!confirm('¿Estás seguro/a de enviar el cuestionario? Una vez enviado no prodrás editar tus respuestas.')) {
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            })

            if (response.ok) {
                router.push('/confirmacion')
            } else {
                alert('Error al enviar el cuestionario. Por favor intenta de nuevo.')
            }
        } catch (err) {
            console.error(err)
            alert('Error de conexión.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${canSubmit
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:-translate-y-1'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } disabled:opacity-50`}
        >
            {loading ? 'Enviando...' : 'Confirmar y Enviar Cuestionario ✅'}
        </button>
    )
}
