import { setRequestLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Clients from '@/components/Clients'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // NOTE (Phase 2, commit 1): components below still receive `lang` and use
  // their internal content objects. Commit 3 removes this prop and switches
  // them to useTranslations(). Navigation is already locale-aware via
  // useLocale(), so it takes no prop.
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero lang={locale} />
      <Services lang={locale} />
      <Clients lang={locale} />
      <CTA lang={locale} />
      <Footer lang={locale} />
    </div>
  )
}
