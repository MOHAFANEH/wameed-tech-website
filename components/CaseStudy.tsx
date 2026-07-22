import Image from 'next/image'

interface CaseStudyProps {
  image: string
  imageAlt: string
  name: string
  category: string
  description: string
  techStack: string[]
  link: string
  viewProjectLabel: string
}

const CaseStudy = ({
  image,
  imageAlt,
  name,
  category,
  description,
  techStack,
  link,
  viewProjectLabel,
}: CaseStudyProps) => {
  return (
    <div className="bg-gradient-to-br from-brand-bg to-brand-lilac/10 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Device frame mockup — plain CSS, no new dependency */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-black/5 bg-white mb-6">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-black/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>
        <div className="relative w-full aspect-[9/10]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-brand-deep mb-1">{name}</h3>
      <p className="text-brand-indigo text-sm font-semibold mb-4">{category}</p>
      <p className="text-gray-700 mb-5">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-deep/5 text-brand-deep border border-brand-deep/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={`https://${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 bg-brand-teal text-brand-deep font-semibold rounded-lg hover:bg-brand-lilac transition"
      >
        {viewProjectLabel}
      </a>
    </div>
  )
}

export default CaseStudy
