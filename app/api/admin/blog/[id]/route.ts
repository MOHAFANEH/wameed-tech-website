import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { sql } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-guard'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const rows = await sql`
    SELECT id, slug, locale, title, description, content, author, category, date::text as date, status
    FROM blog_posts WHERE id = ${id}
  `
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  return NextResponse.json(rows[0])
}

interface UpdatePostBody {
  title: string
  description: string
  content: string
  author: string
  category: string
  date: string
  status: 'draft' | 'published'
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params

  try {
    const body = (await req.json()) as UpdatePostBody

    if (!body.title || !body.description || !body.content || !body.author || !body.category || !body.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const rows = await sql`
      UPDATE blog_posts
      SET title = ${body.title}, description = ${body.description}, content = ${body.content},
          author = ${body.author}, category = ${body.category}, date = ${body.date},
          status = ${body.status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING locale
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const locale = rows[0].locale as string
    revalidateTag(`blog-posts-${locale}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update blog post error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params

  const rows = await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING locale`
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const locale = rows[0].locale as string
  revalidateTag(`blog-posts-${locale}`)

  return NextResponse.json({ success: true })
}
