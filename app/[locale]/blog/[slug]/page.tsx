import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { compileMDX } from 'next-mdx-remote/rsc'

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

interface PostFrontmatter {
  title: string
  description: string
  date: string
  author: string
  category: string
}

const POSTS_DIR = path.join(process.cwd(), 'app/[locale]/blog/posts')

function resolvePostPath(locale: string, slug: string): string | null {
  const filename = locale === 'ar' ? `${slug}.ar.mdx` : `${slug}.mdx`
  const filePath = path.join(POSTS_DIR, filename)
  return fs.existsSync(filePath) ? filePath : null
}

async function getPost(locale: string, slug: string) {
  const filePath = resolvePostPath(locale, slug)
  if (!filePath) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  })

  return { content, frontmatter }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR)
  const slugs = new Set<string>()
  files.forEach((file) => {
    slugs.add(file.replace(/\.ar\.mdx$|\.mdx$/, ''))
  })
  return Array.from(slugs).map((slug) => ({ slug }))
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
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `https://wameedtech.com/${locale}/blog/${slug}`,
      languages: {
        en: `https://wameedtech.com/en/blog/${slug}`,
        ar: `https://wameedtech.com/ar/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
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
  const post = await getPost(locale, slug)

  if (!post) notFound()

  return (
    <main className="min-h-screen py-32 bg-brand-bg">
      <article className="max-w-2xl mx-auto px-4">
        <header className="mb-12">
          <p className="text-brand-indigo font-semibold mb-2">{post.frontmatter.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-deep mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{post.frontmatter.author}</span>
            <span>{post.frontmatter.date}</span>
          </div>
        </header>

        <div>{post.content}</div>
      </article>
    </main>
  )
}
