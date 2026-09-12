import { setRequestLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Clients from '@/components/Clients'
import Process from '@/components/Process'
import Founder from '@/components/Founder'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { Link } from '@/i18n/navigation'
import WhatsAppButton from '@/components/WhatsAppButton'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Clients />
      <Process />
      <Founder />
      <Testimonials />
      <CTA />

      {/* Personal 12-week plan — linked from the home page at Mohammad's
          request. The page itself is noindex and out of the sitemap. */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-5xl px-4">
          <Link
            href="/fitness"
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-brand-lilac/30 bg-white px-6 py-5 transition hover:border-brand-teal"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-brand-teal">
                {locale === 'ar' ? 'شخصي' : 'Personal'}
              </span>
              <span className="mt-1 block text-lg font-bold text-brand-deep">
                {locale === 'ar' ? 'خطة ١٢ أسبوعاً' : 'The 12-Week Plan'}
              </span>
              <span className="mt-1 block text-sm text-brand-ink/70">
                {locale === 'ar'
                  ? 'برنامج تغذية وتدريب مع متابعة يومية'
                  : 'Nutrition and training program with daily tracking'}
              </span>
            </span>
            <span aria-hidden="true" className="text-2xl text-brand-indigo">
              {locale === 'ar' ? '←' : '→'}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
