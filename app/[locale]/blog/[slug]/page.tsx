import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/blog'

// Minimal styling for MDX output — avoids pulling in @tailwindcss/typography
// for a single blog article template.
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-brand-deep mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-brand-deep mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-brand-ink leading-relaxed mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc ps-6 mb-5 space-y-2 text-brand-ink" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-brand-indigo hover:text-brand-deep underline" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-brand-deep" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="text-gray-500" {...props} />,
}

async function getCompiledPost(locale: string, slug: string) {
  const post = await getPost(locale, slug)
  if (!post) return null

  // No parseFrontmatter here — the DB row already carries title/description/
  // date/author/category as columns (extracted once, at migration time, by
  // gray-matter). post.content is just the Markdown body, no frontmatter
  // block left in it.
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  })

  return { ...post, compiledContent: content }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://wameedtech.com/${locale}/blog/${slug}`,
      languages: {
        en: `https://wameedtech.com/en/blog/${slug}`,
        ar: `https://wameedtech.com/ar/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = await getCompiledPost(locale, slug)

  if (!post) notFound()

  return (
    <main className="min-h-screen py-32 bg-brand-bg">
      <article className="max-w-2xl mx-auto px-4">
        <header className="mb-12">
          <p className="text-brand-indigo font-semibold mb-2">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-deep mb-4">{post.title}</h1>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div>{post.compiledContent}</div>
      </article>
    </main>
  )
}
