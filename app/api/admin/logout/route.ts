import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME } from '@/lib/auth'
import { CSRF_COOKIE_NAME } from '@/lib/csrf'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(ADMIN_COOKIE_NAME)
  response.cookies.delete(CSRF_COOKIE_NAME)
  return response
}
