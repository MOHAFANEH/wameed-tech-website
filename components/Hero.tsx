import HeroSlideshow from './HeroSlideshow'

interface HeroProps {
  lang: string
}

const Hero = ({ lang }: HeroProps) => {
  const content = {
    en: {
      title: 'Wameed Tech',
      subtitle: 'وميض تك',
      tagline: 'Professional Web & App Development Studio',
      description: 'We design and develop beautiful, fast, and scalable web and mobile applications for businesses that want to grow.',
      cta: 'Start Your Project',
    },
    ar: {
      title: 'وميض تك',
      subtitle: 'Wameed Tech',
      tagline: 'استوديو تطوير الويب والتطبيقات المحترف',
      description: 'نصمم ونطور تطبيقات ويب وجوال جميلة وسريعة وقابلة للتوسع للشركات التي تريد النمو والتطور.',
      cta: 'ابدأ مشروعك الآن',
    },
  }

  const c = content[lang as keyof typeof content]

  return (
    <section id="home" className="hero-on-image relative pt-32 pb-20 text-white overflow-hidden">
      <HeroSlideshow />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center border-2 border-brand-teal backdrop-blur-sm">
            <span className="text-5xl">ω</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-2">{c.title}</h1>
        <p className="text-2xl text-brand-teal mb-6">{c.subtitle}</p>

        {/* Tagline */}
        <p className="text-xl opacity-90 mb-8">{c.tagline}</p>

        {/* Description */}
        <p className="text-lg max-w-2xl mx-auto mb-12 opacity-85">
          {c.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 bg-brand-teal text-brand-deep font-bold rounded-lg hover:bg-white transition"
          >
            {c.cta}
          </a>
          <a
            href="#about"
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-brand-deep transition"
          >
            {lang === 'en' ? 'Learn More' : 'تعرف على المزيد'}
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
