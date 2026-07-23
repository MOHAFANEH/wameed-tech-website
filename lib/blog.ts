import { unstable_cache } from 'next/cache'
import { sql } from './db'

export interface PostSummary {
  slug: string
  title: string
  description: string
  date: string
  author: string
}

export interface Post extends PostSummary {
  content: string
  category: string
}

async function fetchPosts(locale: string): Promise<PostSummary[]> {
  // date::text avoids the Neon driver's DATE -> JS Date conversion, which
  // applies timezone-dependent parsing and can shift the value by a day
  // (confirmed empirically: a stored 2026-01-15 came back as a Date object
  // reading 2026-01-14T21:00:00.000Z). Casting to text in SQL returns the
  // exact stored string with no client-side date-math involved.
  const rows = await sql`
    SELECT slug, title, description, date::text as date, author
    FROM blog_posts
    WHERE locale = ${locale} AND status = 'published'
    ORDER BY date DESC
  `
  return rows.map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    description: r.description as string,
    date: r.date as string,
    author: r.author as string,
  }))
}

async function fetchPost(locale: string, slug: string): Promise<Post | null> {
  const rows = await sql`
    SELECT slug, title, description, content, author, category, date::text as date
    FROM blog_posts
    WHERE locale = ${locale} AND slug = ${slug} AND status = 'published'
    LIMIT 1
  `
  if (rows.length === 0) return null
  const r = rows[0]
  return {
    slug: r.slug as string,
    title: r.title as string,
    description: r.description as string,
    content: r.content as string,
    author: r.author as string,
    category: r.category as string,
    date: r.date as string,
  }
}

async function fetchAllSlugs(): Promise<string[]> {
  const rows = await sql`SELECT DISTINCT slug FROM blog_posts WHERE status = 'published'`
  return rows.map((r) => r.slug as string)
}

// Tagged for on-demand revalidation from the Phase 5b admin blog API after
// create/update/delete — same reasoning as lib/site-copy.ts.
export function getPosts(locale: string): Promise<PostSummary[]> {
  return unstable_cache(() => fetchPosts(locale), [`blog-posts-${locale}`], {
    tags: [`blog-posts-${locale}`],
  })()
}

export function getPost(locale: string, slug: string): Promise<Post | null> {
  return unstable_cache(() => fetchPost(locale, slug), [`blog-post-${locale}-${slug}`], {
    tags: [`blog-posts-${locale}`, `blog-post-${locale}-${slug}`],
  })()
}

export function getAllSlugs(): Promise<string[]> {
  return unstable_cache(() => fetchAllSlugs(), ['blog-all-slugs'], {
    tags: ['blog-posts-en', 'blog-posts-ar'],
  })()
}
