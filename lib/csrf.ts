// Double-submit cookie CSRF protection. At login, a random token is set as
// BOTH an httpOnly-false cookie (so client JS can read it) and returned in
// the login response body. Every state-changing admin request must echo it
// back in an X-CSRF-Token header. An attacker forging a cross-site request
// can make the browser send cookies automatically, but cannot read the
// cookie value to put it in a custom header — so the two won't match.

export const CSRF_COOKIE_NAME = 'csrf_token'
export const CSRF_HEADER_NAME = 'x-csrf-token'

export function generateCsrfToken(): string {
  return crypto.randomUUID()
}

export function verifyCsrfToken(cookieValue: string | undefined, headerValue: string | null): boolean {
  if (!cookieValue || !headerValue) return false
  return cookieValue === headerValue
}
