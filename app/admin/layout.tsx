import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import '../globals.css'

// Admin is a single-operator (Mohammad) tool, not part of the bilingual
// marketing site — English-only UI chrome, no next-intl. It sits outside
// app/[locale]/ entirely, so it needs its own <html>/<body>, same as the
// existing top-level app/not-found.tsx.
const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wameed Tech Admin',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={comfortaa.variable}>
      <body className="font-comfortaa bg-brand-bg text-brand-ink min-h-screen">{children}</body>
    </html>
  )
}
