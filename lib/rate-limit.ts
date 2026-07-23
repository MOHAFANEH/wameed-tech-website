import { sql } from './db'

// DB-backed login rate limiting. A serverless function has no reliable
// shared in-memory state between invocations (different instances, cold
// starts, multiple regions), so "max 5 tries / 10 minutes" has to live
// somewhere durable — admin_users.failed_login_attempts / locked_until.

const MAX_ATTEMPTS = 5
const LOCKOUT_MINUTES = 10

export interface RateLimitStatus {
  locked: boolean
  lockedUntil: Date | null
}

export async function checkRateLimit(email: string): Promise<RateLimitStatus> {
  const rows = await sql`
    SELECT locked_until FROM admin_users WHERE email = ${email}
  `
  if (rows.length === 0) {
    // Don't reveal whether the email exists — treat as not locked, the
    // login attempt itself will fail on credential mismatch.
    return { locked: false, lockedUntil: null }
  }
  const lockedUntil = rows[0].locked_until as string | null
  if (lockedUntil && new Date(lockedUntil) > new Date()) {
    return { locked: true, lockedUntil: new Date(lockedUntil) }
  }
  return { locked: false, lockedUntil: null }
}

export async function recordFailedLogin(email: string): Promise<void> {
  // Lockout expiry is computed in JS (Date.now()), not via Postgres
  // CURRENT_TIMESTAMP + make_interval() server-side. Verified empirically
  // that doing the arithmetic in SQL produced a locked_until value ~2h50min
  // off from real time in a clean, sub-15-second round-trip test — not a
  // clean timezone offset, just an unreliable server-side computation for
  // this purpose. Computing it in JS and passing it as a plain parameter
  // sidesteps the whole class of server-clock issues, since the same JS
  // Date.now() is also what checkRateLimit compares against on read.
  const rows = await sql`
    SELECT failed_login_attempts FROM admin_users WHERE email = ${email}
  `
  if (rows.length === 0) return

  const nextCount = (rows[0].failed_login_attempts as number) + 1
  const lockedUntil =
    nextCount >= MAX_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000) : null

  if (lockedUntil) {
    await sql`
      UPDATE admin_users
      SET failed_login_attempts = ${nextCount}, locked_until = ${lockedUntil.toISOString()}
      WHERE email = ${email}
    `
  } else {
    await sql`
      UPDATE admin_users
      SET failed_login_attempts = ${nextCount}
      WHERE email = ${email}
    `
  }
}

export async function resetRateLimit(email: string): Promise<void> {
  await sql`
    UPDATE admin_users
    SET failed_login_attempts = 0, locked_until = NULL
    WHERE email = ${email}
  `
}
