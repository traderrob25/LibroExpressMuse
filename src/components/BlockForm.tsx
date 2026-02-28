'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Question } from '@/lib/questions'
import Link from 'next/link'

interface BlockFormProps {
    questions: Question[]
    initialResponses: Record<number, string>
    sessionId: string
    bloqueId: number
}

export default function BlockForm({ questions, initialResponses, sessionId, bloqueId }: BlockFormProps) {
    const [responses, setResponses] = useState<Record<number, string>>(initialResponses)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [saving, setSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const supabase = createClient()

    const saveResponse = useCallback(async (questionId: number, text: string) => {
        if (!text) return

        setSaving(true)
        const { error } = await supabase
            .from('responses')
            .upsert({
                session_id: sessionId,
                bloque: bloqueId,
                pregunta_numero: questionId,
                pregunta_texto: questions.find(q => q.id === questionId)?.titulo || '',
                respuesta: text,
                word_count: text.trim().split(/\s+/).length,
                saved_at: new Date().toISOString()
            }, { onConflict: 'session_id,pregunta_numero' })

        if (error) {
            console.error('Error saving response:', error)
        } else {
            setLastSaved(new Date())
            setHasChanges(false)
        }
        setSaving(false)
    }, [sessionId, bloqueId, questions, supabase])

    // Auto-save every 30 seconds if there are changes
    useEffect(() => {
        const interval = setInterval(() => {
            if (hasChanges) {
                Object.entries(responses).forEach(([id, text]) => {
                    saveResponse(parseInt(id), text)
                })
            }
        }, 30000)

        return () => clearInterval(interval)
    }, [hasChanges, responses, saveResponse])

    const handleBlur = (questionId: number) => {
        if (responses[questionId] !== initialResponses[questionId]) {
            saveResponse(questionId, responses[questionId])
        }
    }

    const handleChange = (questionId: number, value: string) => {
        setResponses(prev => ({ ...prev, [questionId]: value }))
        setHasChanges(true)
    }

    const progress = Math.round((Object.values(responses).filter(r => r.length > 20).length / questions.length) * 100)

    return (
        <div className="space-y-16 pb-24">
            {/* Progress Bar Top */}
            <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md pt-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{progress}% Completado</span>
                </div>

                <div className="flex items-center space-x-4">
                    {lastSaved && (
                        <span className="text-[10px] text-gray-400">
                            {saving ? 'Guardando...' : `Guardado hace ${Math.round((new Date().getTime() - lastSaved.getTime()) / 1000)}s ✓`}
                        </span>
                    )}
                    {bloqueId < 4 && (
                        <Link
                            href={`/cuestionario/bloque/${bloqueId + 1}`}
                            className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200"
                        >
                            Siguiente Bloque
                        </Link>
                    )}
                </div>
            </div>

            {questions.map((q) => (
                <section key={q.id} className="space-y-4 group">
                    <div className="space-y-2">
                        <h3 className="text-xl font-poppins font-semibold text-gray-900 flex items-center space-x-2">
                            <span className="text-blue-200 group-hover:text-blue-500 transition-colors">#</span>
                            <span>{q.titulo}</span>
                        </h3>
                        <p className="text-sm text-gray-400 italic font-medium leading-relaxed">
                            {q.contexto}
                        </p>
                    </div>

                    <div className="relative">
                        <textarea
                            className="w-full min-h-[250px] p-6 text-gray-800 bg-white border border-gray-100 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all resize-y font-normal text-base leading-relaxed leading-7"
                            placeholder={q.placeholder}
                            value={responses[q.id] || ''}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            onBlur={() => handleBlur(q.id)}
                            style={{ userSelect: 'text' }}
                        />
                        <div className="absolute bottom-4 right-6 text-[10px] text-gray-300 font-medium">
                            {(responses[q.id] || '').trim().split(/\s+/).filter(Boolean).length || 0} palabras
                        </div>
                    </div>
                </section>
            ))}

            <footer className="pt-12 flex items-center justify-between border-t border-gray-100">
                <Link
                    href={bloqueId > 1 ? `/cuestionario/bloque/${bloqueId - 1}` : '/cuestionario'}
                    className="text-gray-400 hover:text-gray-900 font-semibold transition-colors flex items-center space-x-2"
                >
                    <span>←</span>
                    <span>Anterior</span>
                </Link>

                {bloqueId === 4 ? (
                    <Link
                        href="/cuestionario/preview"
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:translate-y-0"
                    >
                        Revisar y Enviar 🏗️
                    </Link>
                ) : (
                    <Link
                        href={`/cuestionario/bloque/${bloqueId + 1}`}
                        className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center space-x-2"
                    >
                        <span>Bloque Siguiente</span>
                        <span>→</span>
                    </Link>
                )}
            </footer>
        </div>
    )
}
