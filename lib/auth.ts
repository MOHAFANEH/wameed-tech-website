// Subpath imports (not the 'jose' barrel) so the bundle only includes JWS
// sign/verify — the barrel also pulls in JWE (encryption), which uses
// CompressionStream/DecompressionStream, unsupported on the Edge Runtime
// that middleware.ts runs on.
import { SignJWT } from 'jose/jwt/sign'
import { jwtVerify } from 'jose/jwt/verify'

// Edge-runtime safe (jose uses Web Crypto, no native bindings) — this file
// is imported by middleware.ts, which runs on the Edge runtime by default.
// Never import bcrypt here; see lib/password.ts for password hashing, which
// is Node-only and only ever imported by API routes.

const COOKIE_NAME = 'admin_token'
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

export interface AdminTokenPayload {
  userId: number
  email: string
}

export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(getSecret())
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.userId !== 'number' || typeof payload.email !== 'string') {
      return null
    }
    return { userId: payload.userId, email: payload.email }
  } catch {
    return null
  }
}

export { COOKIE_NAME as ADMIN_COOKIE_NAME, TOKEN_TTL_SECONDS as ADMIN_TOKEN_TTL_SECONDS }
