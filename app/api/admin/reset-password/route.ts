import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { hashPassword } from '@/lib/password'

async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json()

    if (!token || typeof token !== 'string' || !newPassword || typeof newPassword !== 'string') {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const tokenHash = await hashToken(token)

    const rows = await sql`
      SELECT id, reset_token_expires FROM admin_users WHERE reset_token_hash = ${tokenHash}
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    const expires = rows[0].reset_token_expires as string
    if (new Date(expires) < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    const passwordHash = await hashPassword(newPassword)

    await sql`
      UPDATE admin_users
      SET password_hash = ${passwordHash},
          reset_token_hash = NULL,
          reset_token_expires = NULL,
          failed_login_attempts = 0,
          locked_until = NULL
      WHERE id = ${rows[0].id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
