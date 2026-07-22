import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

// No real client quotes are available yet — do not populate this with
// invented names, companies, or quotes. Once real testimonials arrive,
// add a `quotes` array to messages.testimonials (shape: { name, title,
// quote }[]) and map over it here in place of the placeholder card below.
const Testimonials = () => {
  const t = useTranslations('testimonials')

  return (
    <section id="testimonials" className="py-20 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep text-center mb-12">
            {t('section_title')}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-2 border-dashed border-brand-indigo/20 rounded-lg p-12 text-center bg-white/50">
            <p className="text-lg text-gray-500">{t('placeholder_text')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Testimonials
