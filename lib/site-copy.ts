import { unstable_cache } from 'next/cache'
import { sql } from './db'

// Wraps the DB read in Next's Data Cache with a per-locale tag. Postgres
// queries (unlike fetch()) don't participate in Next's cache automatically,
// so without this every request would hit the database directly and static
// pages would become effectively uncached. The admin dashboard (Phase 5b)
// calls revalidateTag(`site-copy-${locale}`) after a save, which is what
// makes "edit text, no redeploy" actually take effect immediately instead
// of waiting for a timed revalidation window.
async function fetchSiteCopy(locale: string): Promise<Record<string, unknown>> {
  const rows = await sql`SELECT messages FROM site_copy WHERE locale = ${locale}`
  if (rows.length === 0) {
    throw new Error(`No site_copy row found for locale "${locale}"`)
  }
  return rows[0].messages as Record<string, unknown>
}

export function getSiteCopy(locale: string): Promise<Record<string, unknown>> {
  return unstable_cache(() => fetchSiteCopy(locale), [`site-copy-${locale}`], {
    tags: [`site-copy-${locale}`],
  })()
}
