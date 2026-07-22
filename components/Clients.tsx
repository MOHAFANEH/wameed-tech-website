import Reveal from './Reveal'

interface ClientsProps {
  lang: string
}

const Clients = ({ lang }: ClientsProps) => {
  const content = {
    en: {
      title: 'Our Clients',
      subtitle: 'Projects We\'re Proud Of',
      description: 'We have had the pleasure of working with innovative companies across various industries.',
    },
    ar: {
      title: 'عملاؤنا',
      subtitle: 'مشاريع نفخر بها',
      description: 'كان لدينا شرف العمل مع شركات مبتكرة عبر قطاعات مختلفة.',
    },
  }

  const projects = {
    en: [
      {
        name: 'Flashwash',
        description: 'Laundry & Dry Cleaning Pickup & Delivery Service',
        link: 'flashwash.co',
        category: 'E-Commerce & Logistics',
        color: 'bg-blue-50',
        icon: '🧺',
      },
      {
        name: 'Leap on Deals',
        description: 'Online marketplace for discovering amazing deals and discounts',
        link: 'www.leapondeals.com',
        category: 'E-Commerce',
        color: 'bg-purple-50',
        icon: '🎯',
      },
    ],
    ar: [
      {
        name: 'فلاش واش',
        description: 'خدمة الغسيل والتنظيف الجاف مع التوصيل',
        link: 'flashwash.co',
        category: 'التجارة الإلكترونية واللوجستيات',
        color: 'bg-blue-50',
        icon: '🧺',
      },
      {
        name: 'قفزة العروض',
        description: 'منصة تسوق إلكترونية لاكتشاف أفضل العروض والخصومات',
        link: 'www.leapondeals.com',
        category: 'التجارة الإلكترونية',
        color: 'bg-purple-50',
        icon: '🎯',
      },
    ],
  }

  const c = content[lang as keyof typeof content]
  const p = projects[lang as keyof typeof projects]

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{c.title}</h2>
            <p className="text-2xl text-brand-indigo mb-4">{c.subtitle}</p>
            <p className="text-lg text-gray-600">{c.description}</p>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {p.map((project, i) => (
            <Reveal key={i} delay={i * 200}>
              <div
                className={`${project.color} rounded-lg p-12 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-brand-teal min-h-80 h-full`}
              >
                <div className="text-7xl mb-6">{project.icon}</div>
                <h3 className="text-3xl font-bold text-brand-deep mb-3">{project.name}</h3>
                <p className="text-brand-indigo text-base font-semibold mb-4">{project.category}</p>
                <p className="text-gray-700 mb-8 text-lg">{project.description}</p>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-brand-teal text-brand-deep font-semibold rounded-lg hover:bg-brand-lilac transition"
                >
                  {lang === 'en' ? 'View Project' : 'اعرض المشروع'}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {[
            { num: '20+', en: 'Projects Completed', ar: 'مشاريع مكتملة' },
            { num: '15+', en: 'Happy Clients', ar: 'عملاء سعداء' },
            { num: '5+', en: 'Years Experience', ar: 'سنوات من الخبرة' },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 150}>
              <div>
                <div className="text-4xl font-bold text-brand-indigo">{stat.num}</div>
                <p className="text-gray-600 text-lg">
                  {lang === 'en' ? stat.en : stat.ar}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
