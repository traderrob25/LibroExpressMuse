import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '600'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: 'Libro Express MUSE | BizReadyTo',
    description: 'Herramienta de intake narrativo para la producción de tu libro.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={`${inter.variable} ${poppins.variable} font-sans bg-white text-gray-900 antialiased`}>
                {children}
            </body>
        </html>
    )
}
