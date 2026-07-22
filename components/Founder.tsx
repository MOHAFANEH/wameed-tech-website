import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

const Founder = () => {
  const t = useTranslations('founder')

  return (
    <section id="founder" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-brand-bg rounded-lg p-8 md:p-12">
            {/*
              TODO: replace with next/image once Mohammad's headshot is
              provided. Swap is a one-line change:
              <Image src="/images/founder.jpg" alt={t('name')} width={160} height={160} className="rounded-full object-cover" />
            */}
            <div className="shrink-0 w-40 h-40 rounded-full gradient-brand flex items-center justify-center text-white text-4xl font-bold border-4 border-brand-teal">
              MA
            </div>

            <div className="text-center md:text-start">
              <h3 className="text-2xl font-bold text-brand-deep mb-1">{t('name')}</h3>
              <p className="text-brand-indigo font-semibold mb-4">{t('role')}</p>
              <p className="text-gray-700 text-lg">{t('bio')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Founder
