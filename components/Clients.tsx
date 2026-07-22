import { useTranslations } from 'next-intl'
import Reveal from './Reveal'
import CaseStudy from './CaseStudy'

interface Project {
  image: string
  imageAlt: string
  name: string
  category: string
  description: string
  techStack: string[]
  link: string
}

interface Stat {
  number: string
  label: string
}

const Clients = () => {
  const t = useTranslations('work')
  const projects = t.raw('projects') as Project[]
  const stats = t.raw('stats') as Stat[]

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{t('section_title')}</h2>
            <p className="text-2xl text-brand-indigo mb-4">{t('section_subtitle')}</p>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>
        </Reveal>

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 200}>
              <CaseStudy
                image={project.image}
                imageAlt={project.imageAlt}
                name={project.name}
                category={project.category}
                description={project.description}
                techStack={project.techStack}
                link={project.link}
                viewProjectLabel={t('view_project')}
              />
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
