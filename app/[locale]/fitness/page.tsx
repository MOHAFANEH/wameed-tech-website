import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import FitnessTracker from '@/components/FitnessTracker'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  return {
    title: isArabic ? 'خطة ١٢ أسبوعاً' : '12-Week Plan',
    description: isArabic
      ? 'خطة تغذية وتدريب شخصية لمدة ١٢ أسبوعاً مع متابعة يومية.'
      : 'A personal 12-week nutrition and training plan with daily tracking.',
    // Personal page on a studio site — kept out of search results and out of
    // the sitemap on purpose.
    robots: 'noindex, nofollow',
  }
}

export default async function FitnessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  return (
    <main className="min-h-screen bg-brand-bg pb-24">
      <div className="gradient-brand pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-brand-teal"
          >
            <span aria-hidden="true">{isArabic ? '←' : '←'}</span>
            {isArabic ? 'وميض تك' : 'Wameed Tech'}
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            {isArabic ? 'خطة ١٢ أسبوعاً' : 'The 12-Week Plan'}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {isArabic
              ? 'من ١٢٠٫١ كغ إلى ١٠٦ كغ في ١٢ أسبوعاً — بعضلات محفوظة. هدف الـ٩٦ كغ يأتي في الشهر الخامس أو السادس، وهذا هو الطريق الذي يثبت.'
              : 'From 120.1 kg to 106 kg in twelve weeks, with your muscle intact. The 96 kg mark lands in month five or six — that is the route that actually holds.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-12">
        <FitnessTracker locale={locale} />
      </div>
    </main>
  )
}
