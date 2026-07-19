interface ServicesProps {
  lang: string
}

const Services = ({ lang }: ServicesProps) => {
  const content = {
    en: {
      title: 'About Us',
      subtitle: 'Why Choose Wameed Tech?',
      intro: 'Wameed Tech is a web and mobile app development studio based in Amman, Jordan. We specialize in creating custom digital solutions that help businesses grow and succeed in the digital world.',
      services: [
        {
          icon: '🌐',
          title: 'Web Development',
          description: 'Modern, fast, and scalable websites built with the latest technologies.',
        },
        {
          icon: '📱',
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications for iOS and Android.',
        },
        {
          icon: '⚙️',
          title: 'Custom Solutions',
          description: 'Tailored software solutions designed specifically for your business needs.',
        },
        {
          icon: '💡',
          title: 'Strategy & Consulting',
          description: 'Expert guidance to help you navigate your digital transformation.',
        },
      ],
      values: [
        { label: 'Quality', value: 'Clean, maintainable code and best practices' },
        { label: 'Speed', value: 'Fast development without compromising quality' },
        { label: 'Support', value: 'Ongoing support and maintenance after launch' },
      ],
    },
    ar: {
      title: 'عننا',
      subtitle: 'لماذا تختار وميض تك؟',
      intro: 'وميض تك هو استوديو متخصص في تطوير تطبيقات الويب والهاتف المحمول في عمّان، الأردن. نركز على إنشاء حلول رقمية مخصصة تساعد الشركات على النمو والنجاح في العالم الرقمي.',
      services: [
        {
          icon: '🌐',
          title: 'تطوير الويب',
          description: 'مواقع حديثة وسريعة وقابلة للتوسع مبنية بأحدث التقنيات.',
        },
        {
          icon: '📱',
          title: 'تطبيقات الهاتف',
          description: 'تطبيقات محمولة أصلية وعابرة للأنظمة الأساسية.',
        },
        {
          icon: '⚙️',
          title: 'حلول مخصصة',
          description: 'حلول برمجية مخصصة تم تصميمها خصيصاً لاحتياجات عملك.',
        },
        {
          icon: '💡',
          title: 'الاستراتيجية والاستشارات',
          description: 'إرشادات خبير لمساعدتك في التحول الرقمي.',
        },
      ],
      values: [
        { label: 'الجودة', value: 'كود نظيف وممارسات أفضل' },
        { label: 'السرعة', value: 'تطوير سريع دون المساس بالجودة' },
        { label: 'الدعم', value: 'دعم وصيانة مستمرة بعد الإطلاق' },
      ],
    },
  }

  const c = content[lang as keyof typeof content]

  return (
    <section id="about" className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{c.title}</h2>
          <p className="text-2xl text-brand-teal mb-8">{c.subtitle}</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{c.intro}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {c.services.map((service, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-brand-teal"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-brand-deep mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="bg-gradient-brand text-white rounded-lg p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">
            {lang === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {c.values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-brand-teal mb-2">{i + 1}</div>
                <h4 className="text-xl font-bold mb-2">{value.label}</h4>
                <p className="opacity-90">{value.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
