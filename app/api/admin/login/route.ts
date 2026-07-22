import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyPassword } from '@/lib/password'
import { signAdminToken, ADMIN_COOKIE_NAME, ADMIN_TOKEN_TTL_SECONDS } from '@/lib/auth'
import { checkRateLimit, recordFailedLogin, resetRateLimit } from '@/lib/rate-limit'
import { generateCsrfToken, CSRF_COOKIE_NAME } from '@/lib/csrf'

// Single-admin system — the login form has one password field (matches the
// original spec's described UX), so the backend checks against the one
// known admin account rather than taking an email in the request body.
const ADMIN_EMAIL = 'Info@wameedtech.com'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const rateLimit = await checkRateLimit(ADMIN_EMAIL)
    if (rateLimit.locked) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again later.' },
        { status: 429 }
      )
    }

    const rows = await sql`SELECT id, email, password_hash FROM admin_users WHERE email = ${ADMIN_EMAIL}`
    if (rows.length === 0) {
      // Same generic error as a wrong password — don't reveal whether the
      // account exists.
      await recordFailedLogin(ADMIN_EMAIL)
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const user = rows[0]
    const valid = await verifyPassword(password, user.password_hash as string)

    if (!valid) {
      await recordFailedLogin(ADMIN_EMAIL)
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    await resetRateLimit(ADMIN_EMAIL)

    const token = await signAdminToken({ userId: user.id as number, email: user.email as string })
    const csrfToken = generateCsrfToken()

    const response = NextResponse.json({ success: true, csrfToken })

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_TOKEN_TTL_SECONDS,
      path: '/',
    })

    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: false, // must be readable by client JS for the double-submit pattern
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_TOKEN_TTL_SECONDS,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
