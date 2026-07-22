import { useLocale, useTranslations } from 'next-intl'
import Reveal from './Reveal'

interface Step {
  number: string
  title: string
}

const Process = () => {
  const t = useTranslations('process')
  const locale = useLocale()
  const steps = t.raw('steps') as Step[]

  return (
    <section id="process" className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep text-center mb-16">
            {t('section_title')}
          </h2>
        </Reveal>

        {/* dir="ltr" here keeps the 5 steps in a fixed visual left-to-right
            order (1..5) — this is a numbered timeline, not reading content,
            so it should not mirror under RTL like a normal grid would. Each
            step's own wrapper below restores the correct text direction for
            its title. */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-4" dir="ltr">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 100} className="flex-1">
              <div
                className="flex md:flex-col items-center md:text-center gap-4 md:gap-3"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-teal text-brand-deep font-bold text-xl flex items-center justify-center">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-brand-deep">{step.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={steps.length * 100}>
          <p className="text-center text-lg text-brand-indigo font-semibold mt-16">
            {t('closing_line')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Process
