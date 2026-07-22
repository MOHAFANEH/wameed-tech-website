import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

interface ServiceItem {
  icon: string
  title: string
  description: string
}

interface ValueItem {
  label: string
  value: string
}

const Services = () => {
  const t = useTranslations('services')
  const items = t.raw('items') as ServiceItem[]
  const values = t.raw('values') as ValueItem[]

  return (
    <section id="about" className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{t('section_title')}</h2>
            <p className="text-2xl text-brand-indigo mb-8">{t('section_subtitle')}</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
          </div>
        </Reveal>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((service, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-t-4 border-brand-teal h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-brand-deep mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Core Values */}
        <Reveal>
        <div className="gradient-brand text-white rounded-lg p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">
            {t('values_title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-brand-teal mb-2">{i + 1}</div>
                <h4 className="text-xl font-bold mb-2">{value.label}</h4>
                <p className="opacity-90">{value.value}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Services
