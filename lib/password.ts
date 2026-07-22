import bcrypt from 'bcrypt'

// Node-only (bcrypt uses native bindings) — never import this from
// middleware.ts or anything that runs on the Edge runtime. Only API routes
// (which run as regular Node serverless functions) should import this.

const SALT_ROUNDS = 12

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS)
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

export function generateResetToken(): string {
  // crypto.randomUUID() is available in Node 19+ globally, no import needed.
  return crypto.randomUUID() + crypto.randomUUID()
}
