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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{c.title}</h2>
          <p className="text-2xl text-brand-teal mb-4">{c.subtitle}</p>
          <p className="text-lg text-gray-600">{c.description}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {p.map((project, i) => (
            <div
              key={i}
              className={`${project.color} rounded-lg p-12 shadow-md hover:shadow-xl transition border-l-4 border-brand-teal min-h-80`}
            >
              <div className="text-7xl mb-6">{project.icon}</div>
              <h3 className="text-3xl font-bold text-brand-deep mb-3">{project.name}</h3>
              <p className="text-brand-teal text-base font-semibold mb-4">{project.category}</p>
              <p className="text-gray-700 mb-8 text-lg">{project.description}</p>
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-lilac transition"
              >
                {lang === 'en' ? 'View Project' : 'اعرض المشروع'}
              </a>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-brand-teal">20+</div>
            <p className="text-gray-600 text-lg">
              {lang === 'en' ? 'Projects Completed' : 'مشاريع مكتملة'}
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-teal">15+</div>
            <p className="text-gray-600 text-lg">
              {lang === 'en' ? 'Happy Clients' : 'عملاء سعداء'}
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-teal">5+</div>
            <p className="text-gray-600 text-lg">
              {lang === 'en' ? 'Years Experience' : 'سنوات من الخبرة'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
