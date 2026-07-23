import { neon } from '@neondatabase/serverless'

// The Neon Vercel integration was installed with a custom env var prefix
// (STORAGE), so Vercel created STORAGE_POSTGRES_URL rather than a plain
// POSTGRES_URL. Local .env.local uses the plain name (set manually when
// this was first wired up). Accept either so the same code works in both
// places without requiring the connection string to be hand-copied into a
// second env var (which risks a transcription error in a secret value).
const connectionString = process.env.POSTGRES_URL || process.env.STORAGE_POSTGRES_URL

if (!connectionString) {
  throw new Error(
    'No Postgres connection string found — set POSTGRES_URL or STORAGE_POSTGRES_URL'
  )
}

// Neon's tagged-template query function. Pooled connection — correct for
// normal app request-path queries. Schema/migration scripts use the
// non-pooled connection directly (see db/migrate.mjs), not this client.
export const sql = neon(connectionString)
