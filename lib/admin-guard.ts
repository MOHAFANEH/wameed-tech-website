import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, ADMIN_COOKIE_NAME, AdminTokenPayload } from './auth'
import { verifyCsrfToken, CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from './csrf'

// middleware.ts's matcher explicitly excludes /api/* (matcher:
// ['/((?!api|_next|_vercel|.*\\..*).*)']), so it never runs on API routes —
// every admin API route that isn't a public auth entry point (login,
// forgot-password, reset-password) must independently verify the session
// here, or it has zero protection.

// Returns the verified payload on success, or a NextResponse to return
// immediately on failure. Callers check with `instanceof NextResponse`,
// which narrows reliably (a discriminated-union `{ok, ...}` return type
// did not narrow correctly at call sites under this project's tsconfig —
// this is the more robust pattern).
export async function requireAdmin(
  req: NextRequest
): Promise<AdminTokenPayload | NextResponse> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  const payload = token ? await verifyAdminToken(token) : null

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // CSRF only matters for state-changing methods — GET is safe by definition.
  if (req.method !== 'GET') {
    const cookieValue = req.cookies.get(CSRF_COOKIE_NAME)?.value
    const headerValue = req.headers.get(CSRF_HEADER_NAME)
    if (!verifyCsrfToken(cookieValue, headerValue)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }
  }

  return payload
}
