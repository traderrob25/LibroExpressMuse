import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Create session in 'sessions' table if it doesn't exist
            const user = data.user
            if (user?.email) {
                await supabase
                    .from('sessions')
                    .upsert({
                        email: user.email,
                        nombre: user.user_metadata.nombre || 'Usuario',
                        empresa: user.user_metadata.empresa || '',
                        status: 'started',
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'email' })
            }

            return NextResponse.redirect(`${origin}/cuestionario`)
        }
    }

    // Return the user to an error page with some instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
