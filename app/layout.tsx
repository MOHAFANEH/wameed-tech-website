import type { Metadata } from 'next'
import { Comfortaa, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'

// Same weights as the previous <link>: 400 (regular) + 700 (bold).
const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wameed Tech | وميض تك - Web & App Development Studio',
  description: 'Professional web and mobile app development studio in Amman, Jordan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${comfortaa.variable} ${notoSansArabic.variable}`}>
      <body className="font-comfortaa bg-brand-bg text-brand-ink">
        {children}
      </body>
    </html>
  )
}
