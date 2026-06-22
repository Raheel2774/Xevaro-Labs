// ─── Cloudflare D1 client (HTTP REST API) ─────────────────────────────────────
// Works from any Node host (incl. Hostinger) — no Workers binding required.
// Requires env vars: CF_ACCOUNT_ID, CF_D1_DATABASE_ID, CF_D1_API_TOKEN

interface D1Result<T = Record<string, unknown>> {
  success: boolean
  results: T[]
  meta?: Record<string, unknown>
  errors?: { code: number; message: string }[]
}

function config() {
  const accountId  = process.env.CF_ACCOUNT_ID?.trim()
  const databaseId = process.env.CF_D1_DATABASE_ID?.trim()
  const token      = process.env.CF_D1_API_TOKEN?.trim()
  if (!accountId || !databaseId || !token) {
    throw new Error('Cloudflare D1 env vars missing (CF_ACCOUNT_ID, CF_D1_DATABASE_ID, CF_D1_API_TOKEN)')
  }
  return { accountId, databaseId, token }
}

/**
 * Run a parameterized SQL statement against the D1 database.
 * Uses positional `?` placeholders bound via `params`.
 */
export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: (string | number | null)[] = [],
): Promise<D1Result<T>> {
  const { accountId, databaseId, token } = config()
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
    // D1 should never be cached
    cache: 'no-store',
  })

  const json = await res.json()
  if (!res.ok || !json.success) {
    const msg = json?.errors?.[0]?.message ?? `D1 request failed (${res.status})`
    throw new Error(msg)
  }
  // D1 returns an array of result objects (one per statement)
  return json.result[0] as D1Result<T>
}

export function isD1Configured() {
  return Boolean(process.env.CF_ACCOUNT_ID && process.env.CF_D1_DATABASE_ID && process.env.CF_D1_API_TOKEN)
}
