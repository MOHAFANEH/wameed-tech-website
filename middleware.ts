import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from './lib/auth'

const intlMiddleware = createMiddleware(routing)

// /admin/login and /admin/forgot-password (+ its [token] page) must stay
// reachable without a valid session, or nobody could ever log in.
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/forgot-password']

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Legal pages for the AutoAccept: Driver Assistant app. App stores store
  // the policy URL literally, so these must resolve at exactly
  // /autoclikerksa/term and /autoclikerksa/privacy — next-intl would
  // otherwise redirect them to /en/autoclikerksa/..., a different address.
  // Public: no session required.
  if (pathname === '/autoclikerksa' || pathname.startsWith('/autoclikerksa/')) {
    return NextResponse.next()
  }

  // Admin routes are a separate, non-i18n section (app/admin/..., not
  // app/[locale]/admin/...) — they must never go through next-intl's
  // locale-detection/redirect logic, which would otherwise try to prefix
  // them with /en or /ar.
  if (pathname.startsWith('/admin')) {
    if (isPublicAdminPath(pathname)) {
      return NextResponse.next()
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
    const payload = token ? await verifyAdminToken(token) : null

    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - API routes (/api, /trpc)
  // - Next.js internals (/_next, /_vercel)
  // - files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
