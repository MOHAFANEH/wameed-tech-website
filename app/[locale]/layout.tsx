import type { Metadata } from 'next'
import { Comfortaa, Noto_Sans_Arabic } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${comfortaa.variable} ${notoSansArabic.variable}`}
    >
      <body className="font-comfortaa bg-brand-bg text-brand-ink">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
