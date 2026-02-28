import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { sessionId } = await request.json()
    const supabase = await createClient()

    const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .update({
            status: 'completed',
            completed_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .select()
        .single()

    if (sessionError) {
        return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    // Next Steps text from original doc
    const nextSteps = `
Paso 1 (Hoy): Tu enviaste este cuestionario completo.
Paso 2 (Dia 2-3): MUSE procesa tus respuestas: extrae patrones de voz, organiza temas, identifica huecos narrativos.
Paso 3 (Dia 4-5): Recibes la estructura completa: indice de 15-20 capitulos con sinopsis de cada uno + introduccion completa escrita con tu voz.
Paso 4 (Dia 5-7): Recibes 2-3 capitulos sample de diferentes zonas del libro para validar tono, profundidad y estilo.
Paso 5 (Dia 7): Sesion de revision (30 min): ajustes finales al Blueprint.
  `

    try {
        // Send email to user
        await resend.emails.send({
            from: 'MUSE Pilot <onboarding@resend.dev>', // Change to your domain in production
            to: session.email,
            subject: '¡Intake Recibido! Próximos pasos de tu Libro Express',
            text: `Hola ${session.nombre},\n\nHemos recibido tus respuestas. Felicidades por completar este paso crítico.\n\nPróximos Pasos:\n${nextSteps}\n\nBizReadyTo | Hexada`
        })

        // Send alert to owner
        await resend.emails.send({
            from: 'MUSE System <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL || 'contact@bizreadyto.com',
            subject: `NUEVO SUBMISSION: ${session.nombre} (${session.empresa})`,
            text: `Nuevo cuestionario completado por ${session.nombre}.\nEmail: ${session.email}\nEmpresa: ${session.empresa}\nLink: ${process.env.NEXT_PUBLIC_APP_URL}/admin/responses/${session.id}`
        })
    } catch (emailError) {
        console.error('Error sending emails:', emailError)
        // We don't fail the whole request if email fails, but we should log it
    }

    return NextResponse.json({ success: true })
}
