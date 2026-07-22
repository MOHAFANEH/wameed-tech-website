import { neon } from '@neondatabase/serverless'

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set')
}

// Neon's tagged-template query function. Pooled connection — correct for
// normal app request-path queries. Schema/migration scripts use
// POSTGRES_URL_NON_POOLING directly (see db/migrate.mjs), not this client.
export const sql = neon(process.env.POSTGRES_URL)
