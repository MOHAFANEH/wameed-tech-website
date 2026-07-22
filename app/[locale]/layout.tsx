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

const SITE_URL = 'https://wameedtech.com'
const SITE_TITLE = 'Wameed Tech | وميض تك - Web & App Development Studio'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const description = isArabic
    ? 'استوديو تطوير الويب والتطبيقات المحترف في عمّان، الأردن. نبني مواقع وتطبيقات للنمو.'
    : 'Professional web and mobile app development studio in Amman, Jordan. We build websites and apps for growth.'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Wameed Tech',
      default: SITE_TITLE,
    },
    description,
    keywords: ['web development', 'app development', 'Amman', 'Jordan', 'custom software', 'mobile apps'],
    authors: [{ name: 'Wameed Tech', url: SITE_URL }],
    creator: 'Wameed Tech',
    publisher: 'Wameed Tech',
    robots: 'index, follow',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_JO' : 'en_US',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Wameed Tech',
      title: SITE_TITLE,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Wameed Tech',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description,
      images: ['/og-image.png'],
    },
  }
}

// LocalBusiness intentionally omits openingHoursSpecification — no
// confirmed real business hours to publish as fact. Add it once
// Mohammad confirms actual hours.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Wameed Tech',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-circle.png`,
  description: 'Professional web and mobile app development studio in Amman, Jordan.',
  sameAs: ['https://www.facebook.com/wameedtech', 'https://www.instagram.com/wameedtech'],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Wameed Tech',
  image: `${SITE_URL}/images/logo-circle.png`,
  description: 'Web and App Development Studio',
  url: SITE_URL,
  telephone: '+962786277768',
  email: 'Info@wameedtech.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amman',
    addressCountry: 'JO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.9454,
    longitude: 35.9284,
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-comfortaa bg-brand-bg text-brand-ink">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
