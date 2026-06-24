import crypto from 'crypto'

// Secret used to sign the admin session cookie. Falls back to the password so a
// single env var works, but set ADMIN_SESSION_SECRET separately in production.
function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'insecure-dev-secret'
}

/** Constant-time string compare (hashes first so unequal lengths don't throw). */
export function safeEqual(a: string, b: string) {
  const ha = crypto.createHash('sha256').update(a).digest()
  const hb = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export const SESSION_COOKIE = 'xv_admin'

/** Create a signed session token (no secret/password stored inside it). */
export function makeSessionToken() {
  const payload = 'admin'
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

/** Verify a session token produced by makeSessionToken(). */
export function verifySessionToken(token?: string | null) {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (payload !== 'admin' || !sig) return false
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

/** True if an admin password is configured. */
export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}
