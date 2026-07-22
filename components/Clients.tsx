import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

interface Project {
  icon: string
  name: string
  category: string
  description: string
  link: string
  color: string
}

interface Stat {
  number: string
  label: string
}

const Clients = () => {
  const t = useTranslations('clients')
  const projects = t.raw('projects') as Project[]
  const stats = t.raw('stats') as Stat[]

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{t('section_title')}</h2>
            <p className="text-2xl text-brand-indigo mb-4">{t('section_subtitle')}</p>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 200}>
              <div
                className={`${project.color} rounded-lg p-12 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-s-4 border-brand-teal min-h-80 h-full`}
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
                  {t('view_project')}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 150}>
              <div>
                <div className="text-4xl font-bold text-brand-indigo">{stat.number}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
