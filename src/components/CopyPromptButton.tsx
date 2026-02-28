'use client'

import { useState } from 'react'

interface CopyPromptButtonProps {
    sessionName: string
    responses: any[]
}

export default function CopyPromptButton({ sessionName, responses }: CopyPromptButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const formattedData = responses.map(r => `
--- PREGUNTA ${r.pregunta_numero}: ${r.pregunta_texto} ---
RESPUESTA:
${r.respuesta}
`).join('\n')

        const superPrompt = `
Eres un **Arquitecto de Libros de MUSE System**, un experto en extraer narrativa y expertise para autores de alto rendimiento que operan bajo el framework **Hexada (Soberanía, Arquitectura y Ventanas Críticas)** y el stack tecnológico **Antigravity**.

Tu tarea es procesar el **Intake Narrativo** de un autor y generar un **Blueprint de Autoridad** que sea la base para escribir un libro en tiempo récord. El libro NO debe sonar genérico; debe sonar a las palabras, tono y expertise del autor.

### 📜 TUS REGLAS DE ORO:
1. **NO INVENTES**: Usa solo la información, metáforas y casos provistos.
2. **IDENTIFICA LA VOZ**: Extrae los "MUSE Patterns" (muletillas, estilo, nivel de confrontación).
3. **PENSAMIENTO CONTRARIO**: Enfócate en lo que el autor dice que la industria hace MAL. Esa es la tesis del libro.
4. **ARCO NARRATIVO**: Organiza los 4 bloques en una estructura de 15-20 capítulos lógica.

### 📂 DATOS DEL INTAKE NARRATIVO (Autor: ${sessionName}):
${formattedData}

### 🚀 OUTPUT REQUERIDO:
1. **Perfil de Voz (The Muse Filter)**: Define el tono, longitud de párrafos y vocabulario clave a usar.
2. **Diagnóstico de Expertise**: Resume la metodología central y los 3 casos de éxito más fuertes.
3. **Índice Propuesto (The Blueprint)**: Crea una tabla de contenidos de 15-20 capítulos con un título de Hook y una breve descripción de qué se debe cubrir en cada uno apoyado por los datos de arriba.
4. **Resumen de la Tesis**: ¿Cuál es el "Enfoque Contrario" que hará que este libro sea viral en su nicho?
`.trim()

        navigator.clipboard.writeText(superPrompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
        >
            <span>{copied ? '¡Copiado para Claude! ✓' : 'Copiar Super-Prompt para Claude'}</span>
            {!copied && <span className="text-xs">⚡</span>}
        </button>
    )
}
