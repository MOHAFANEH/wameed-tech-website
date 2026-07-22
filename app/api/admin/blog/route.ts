import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { sql } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-guard'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const rows = await sql`
    SELECT id, slug, locale, title, category, date::text as date, status, author
    FROM blog_posts
    ORDER BY date DESC, slug ASC
  `
  return NextResponse.json({ posts: rows })
}

interface CreatePostBody {
  titleEn?: string
  titleAr?: string
  descriptionEn?: string
  descriptionAr?: string
  contentEn?: string
  contentAr?: string
  category: string
  date: string
  author: string
  language: 'en' | 'ar' | 'both'
  status: 'draft' | 'published'
  slug?: string
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const body = (await req.json()) as CreatePostBody

    if (!body.category || !body.date || !body.author || !body.language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const wantsEn = body.language === 'en' || body.language === 'both'
    const wantsAr = body.language === 'ar' || body.language === 'both'

    if (wantsEn && (!body.titleEn || !body.descriptionEn || !body.contentEn)) {
      return NextResponse.json({ error: 'English title, description, and content are required' }, { status: 400 })
    }
    if (wantsAr && (!body.titleAr || !body.descriptionAr || !body.contentAr)) {
      return NextResponse.json({ error: 'Arabic title, description, and content are required' }, { status: 400 })
    }

    const slug = body.slug?.trim() || slugify(body.titleEn || body.titleAr || '')
    if (!slug) {
      return NextResponse.json({ error: 'Could not generate a slug from the title' }, { status: 400 })
    }

    const created: { id: number; locale: string }[] = []

    if (wantsEn) {
      const rows = await sql`
        INSERT INTO blog_posts (slug, locale, title, description, content, author, category, date, status)
        VALUES (${slug}, 'en', ${body.titleEn}, ${body.descriptionEn}, ${body.contentEn}, ${body.author}, ${body.category}, ${body.date}, ${body.status})
        RETURNING id, locale
      `
      created.push(rows[0] as { id: number; locale: string })
    }

    if (wantsAr) {
      const rows = await sql`
        INSERT INTO blog_posts (slug, locale, title, description, content, author, category, date, status)
        VALUES (${slug}, 'ar', ${body.titleAr}, ${body.descriptionAr}, ${body.contentAr}, ${body.author}, ${body.category}, ${body.date}, ${body.status})
        RETURNING id, locale
      `
      created.push(rows[0] as { id: number; locale: string })
    }

    if (wantsEn) revalidateTag('blog-posts-en')
    if (wantsAr) revalidateTag('blog-posts-ar')

    return NextResponse.json({ success: true, created, slug })
  } catch (error) {
    console.error('Create blog post error:', error)
    // UNIQUE(slug, locale) violation is the most likely real-world failure
    // here (creating a post whose slug already exists for that locale).
    const message =
      error instanceof Error && error.message.includes('unique')
        ? 'A post with this slug already exists for that language'
        : 'Failed to create post'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
