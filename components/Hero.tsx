import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('hero')

  return (
    <section id="home" className="relative pt-32 pb-20 text-white overflow-hidden">
      {/* Decorative background: brand gradient + soft circles (pure CSS, no assets) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep to-brand-indigo" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-brand-lilac/10" />
        <div className="absolute top-1/3 -start-16 w-72 h-72 rounded-full bg-brand-indigo/30" />
        <div className="absolute bottom-4 end-1/4 w-80 h-80 rounded-full bg-brand-lilac/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center border-2 border-brand-teal backdrop-blur-sm">
            <Image src="/images/logo-mark.svg" alt="" width={80} height={60} className="w-20 h-auto" priority />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-2">{t('title')}</h1>
        <p className="text-2xl text-brand-teal mb-6">{t('subtitle')}</p>

        {/* Tagline */}
        <p className="text-xl opacity-90 mb-8">{t('tagline')}</p>

        {/* Description */}
        <p className="text-lg max-w-2xl mx-auto mb-12 opacity-85">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 bg-brand-teal text-brand-deep font-bold rounded-lg hover:bg-white transition"
          >
            {t('cta_primary')}
          </a>
          <a
            href="#about"
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-brand-deep transition"
          >
            {t('cta_secondary')}
          </a>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="relative z-10 mt-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="#F7F6FB"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
