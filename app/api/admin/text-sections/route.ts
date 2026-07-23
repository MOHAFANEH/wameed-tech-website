import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { sql } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-guard'

// Also see requireAdmin's doc comment for why instanceof NextResponse is
// the check here rather than a discriminated-union {ok, ...} result.

// Edit Text scope, per spec: Hero, Services, Contact Form, Footer. These
// are stored as full sub-objects within site_copy.messages — GET returns
// them as-is (including sub-fields the edit form doesn't render inputs
// for, e.g. services.values), and POST expects the client to send back the
// same shape it received (edited in place) so nothing gets silently
// dropped by a partial update.
const EDITABLE_KEYS = ['hero', 'services', 'cta', 'footer'] as const

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const rows = await sql`SELECT locale, messages FROM site_copy`
  const result: Record<string, Record<string, unknown>> = {}
  for (const row of rows) {
    const messages = row.messages as Record<string, unknown>
    const scoped: Record<string, unknown> = {}
    for (const key of EDITABLE_KEYS) {
      scoped[key] = messages[key]
    }
    result[row.locale as string] = scoped
  }
  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const body = (await req.json()) as Record<string, Record<string, unknown>>

    for (const locale of Object.keys(body)) {
      if (locale !== 'en' && locale !== 'ar') continue
      const sections = body[locale]

      const rows = await sql`SELECT messages FROM site_copy WHERE locale = ${locale}`
      if (rows.length === 0) continue
      const existing = rows[0].messages as Record<string, unknown>

      const merged: Record<string, unknown> = { ...existing }
      for (const key of EDITABLE_KEYS) {
        if (sections[key] !== undefined) {
          merged[key] = sections[key]
        }
      }

      await sql`
        UPDATE site_copy
        SET messages = ${JSON.stringify(merged)}::jsonb, updated_at = CURRENT_TIMESTAMP
        WHERE locale = ${locale}
      `
      revalidateTag(`site-copy-${locale}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Text sections save error:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}
