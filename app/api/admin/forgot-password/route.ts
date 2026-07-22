import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { generateResetToken } from '@/lib/password'
import { sendEmail } from '@/lib/ses'

const ADMIN_EMAIL = 'Info@wameedtech.com'
const RESET_TOKEN_TTL_HOURS = 24

async function hashToken(token: string): Promise<string> {
  // SHA-256, not bcrypt: this token is already high-entropy (two concatenated
  // UUIDs, ~72 chars) — bcrypt truncates input past 72 bytes, which would sit
  // right at that boundary and risk silent truncation. A random secret this
  // strong only needs a fast, deterministic hash for comparison, not bcrypt's
  // slow salted hashing (which exists to blunt brute-forcing low-entropy
  // human passwords, not relevant here).
  const data = new TextEncoder().encode(token)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST() {
  try {
    const token = generateResetToken()
    const tokenHash = await hashToken(token)
    const expires = new Date(Date.now() + RESET_TOKEN_TTL_HOURS * 60 * 60 * 1000)

    const rows = await sql`
      UPDATE admin_users
      SET reset_token_hash = ${tokenHash}, reset_token_expires = ${expires.toISOString()}
      WHERE email = ${ADMIN_EMAIL}
      RETURNING id
    `

    if (rows.length === 0) {
      // No admin account with this email — respond the same as success so
      // this endpoint doesn't reveal account existence.
      return NextResponse.json({ success: true })
    }

    const resetUrl = `https://wameedtech.com/admin/forgot-password/${token}`

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: 'Reset your Wameed Tech admin password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2E2560, #4B3F9E); color: #fff; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; color: #fff;">Reset Your Admin Password</h2>
          </div>
          <div style="background: #F7F6FB; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e2f0;">
            <p>Click the link below to reset your Wameed Tech admin password. This link expires in 24 hours.</p>
            <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#2FD4C4;color:#2E2560;font-weight:bold;border-radius:8px;text-decoration:none;">Reset Password</a></p>
            <p style="color:#888;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 })
  }
}
