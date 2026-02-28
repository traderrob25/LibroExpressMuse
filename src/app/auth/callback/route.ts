import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            console.log('--- AUTH SUCCESS, USER:', data.user?.email)
            const user = data.user
            if (user?.email) {
                console.log('--- UPSERTING SESSION FOR:', user.email)
                const { error: upsertError } = await supabase
                    .from('sessions')
                    .upsert({
                        email: user.email,
                        nombre: user.user_metadata.nombre || 'Usuario',
                        empresa: user.user_metadata.empresa || '',
                        status: 'started',
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'email' })

                if (upsertError) {
                    console.error('--- UPSERT ERROR:', upsertError)
                } else {
                    console.log('--- UPSERT SUCCESS')
                }
            }

            return NextResponse.redirect(`${origin}/cuestionario`)
        }
    }

    // Return the user to an error page with some instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
