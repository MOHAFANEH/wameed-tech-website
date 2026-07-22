import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface PostSummary {
  slug: string
  title: string
  description: string
  date: string
  author: string
}

const POSTS_DIR = path.join(process.cwd(), 'app/[locale]/blog/posts')

function getPosts(locale: string): PostSummary[] {
  const files = fs.readdirSync(POSTS_DIR)

  return files
    .filter((file) => (locale === 'ar' ? file.endsWith('.ar.mdx') : file.endsWith('.mdx') && !file.endsWith('.ar.mdx')))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.ar\.mdx$|\.mdx$/, ''),
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        author: data.author as string,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  return {
    title: isArabic ? 'المدونة' : 'Blog',
    description: isArabic
      ? 'أحدث المقالات والرؤى من وميض تك.'
      : 'Latest articles and insights from Wameed Tech.',
    alternates: {
      canonical: `https://wameedtech.com/${locale}/blog`,
      languages: {
        en: 'https://wameedtech.com/en/blog',
        ar: 'https://wameedtech.com/ar/blog',
      },
    },
  }
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const posts = getPosts(locale)

  return (
    <main className="min-h-screen py-32 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-deep mb-4">{t('title')}</h1>
        <p className="text-lg text-brand-ink mb-12">{t('description')}</p>

        {posts.length === 0 ? (
          <p className="text-brand-ink">{t('no_posts')}</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 bg-white rounded-lg border border-brand-lilac/30 hover:border-brand-teal transition group"
              >
                <h2 className="text-2xl font-bold text-brand-deep group-hover:text-brand-teal transition mb-2">
                  {post.title}
                </h2>
                <p className="text-brand-ink mb-4">{post.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
