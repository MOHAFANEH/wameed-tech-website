import { neon, NeonQueryFunction } from '@neondatabase/serverless'

// The Neon Vercel integration was installed with a custom env var prefix
// (STORAGE), so Vercel created STORAGE_POSTGRES_URL rather than a plain
// POSTGRES_URL. Local .env.local uses the plain name (set manually when
// this was first wired up). Accept either so the same code works in both
// places without requiring the connection string to be hand-copied into a
// second env var (which risks a transcription error in a secret value).
//
// Lazily constructed: Next.js's build-time "Collecting page data" step
// statically imports every route module, which runs top-level code even
// though no request is being served. Marketplace/integration env vars
// aren't guaranteed to be resolved into that build step the same way they
// are at runtime, so eagerly calling neon() here at module scope can crash
// the whole build. Deferring construction to the first real query means
// build-time import is a no-op and the connection string is only read
// once an actual request needs it.
let client: NeonQueryFunction<false, false> | null = null

function getClient(): NeonQueryFunction<false, false> {
  if (client) return client

  const connectionString = process.env.POSTGRES_URL || process.env.STORAGE_POSTGRES_URL
  if (!connectionString) {
    throw new Error(
      'No Postgres connection string found — set POSTGRES_URL or STORAGE_POSTGRES_URL'
    )
  }

  client = neon(connectionString)
  return client
}

// Neon's tagged-template query function. Pooled connection — correct for
// normal app request-path queries. Schema/migration scripts use the
// non-pooled connection directly (see db/migrate.mjs), not this client.
export const sql: NeonQueryFunction<false, false> = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  getClient()(...args)) as NeonQueryFunction<false, false>
