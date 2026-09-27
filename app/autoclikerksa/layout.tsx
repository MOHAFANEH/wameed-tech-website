import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import '../globals.css'

// Legal pages for the AutoAccept: Driver Assistant app. English-only and
// outside app/[locale]/ so the URLs stay exactly /autoclikerksa/term and
// /autoclikerksa/privacy with no locale prefix — app stores store the URL
// literally, so a redirect to /en/... would be a different address. That
// means this section needs its own <html>/<body>, same as app/admin/.
const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
})

export const metadata: Metadata = {
  // Unlisted rather than private: reachable by anyone with the link, which
  // app stores require, but kept out of search and linked from nowhere.
  robots: 'noindex, nofollow',
}

export default function AutoAcceptLegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={comfortaa.variable}>
      <body className="font-comfortaa bg-brand-bg text-brand-ink">
        <main className="mx-auto max-w-3xl px-4 py-16">{children}</main>
      </body>
    </html>
  )
}
