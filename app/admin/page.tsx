import { cookies } from 'next/headers'
import { verifySessionToken, SESSION_COOKIE, isAdminConfigured } from '@/lib/auth'
import { d1Query, isD1Configured } from '@/lib/d1'
import { AdminLogin, LogoutButton } from './AdminClient'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface Submission {
  id: number
  name: string | null
  company: string | null
  email: string
  system: string | null
  message: string | null
  created_at: string
}

export default async function AdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value

  if (!isAdminConfigured()) {
    return (
      <Shell>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-8 text-center">
          <h1 className="font-display text-xl text-white/90">Admin not configured</h1>
          <p className="mt-2 text-sm text-white/50">Set <code className="text-[#00D6FF]">ADMIN_PASSWORD</code> in your environment variables, then redeploy.</p>
        </div>
      </Shell>
    )
  }

  if (!verifySessionToken(token)) return <AdminLogin />

  let rows: Submission[] = []
  let total = 0
  let error = ''

  if (isD1Configured()) {
    try {
      const r = await d1Query<Submission>(
        `SELECT id, name, company, email, system, message, created_at
         FROM submissions ORDER BY id DESC LIMIT 500`,
      )
      rows = r.results
      const c = await d1Query<{ n: number }>(`SELECT COUNT(*) AS n FROM submissions`)
      total = c.results[0]?.n ?? rows.length
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load submissions.'
    }
  } else {
    error = 'Database not configured (CF_D1_* env vars missing).'
  }

  // simple "today" count
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = rows.filter(r => (r.created_at ?? '').slice(0, 10) === today).length

  return (
    <Shell>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-4 w-4 rounded-[4px] bg-gradient-to-br from-[#0050FF] to-[#00D6FF] shadow-[0_0_14px_rgba(0,214,255,0.5)]" />
          <span className="font-display font-semibold tracking-tight text-white/90">Xevaro OS · Admin</span>
        </div>
        <LogoutButton />
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Total submissions" value={total} />
        <Stat label="Showing" value={rows.length} />
        <Stat label="Today" value={todayCount} />
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-[#FF6b63]/30 bg-[#FF6b63]/[0.06] p-4 text-sm text-[#FF9b94]">{error}</div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/[0.08] text-[11px] uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">System</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {rows.length === 0 && !error && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-white/40">No submissions yet.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="align-top transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-white/40">{r.id}</td>
                  <td className="px-4 py-3 text-white/85">{r.name || '—'}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="text-[#00D6FF] hover:underline">{r.email}</a>
                  </td>
                  <td className="px-4 py-3 text-white/60">{r.company || '—'}</td>
                  <td className="px-4 py-3 text-white/60">{r.system || '—'}</td>
                  <td className="px-4 py-3 max-w-xs text-white/55">{r.message || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-white/40">{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
      <div className="bg-gradient-to-br from-white to-[#00D6FF] bg-clip-text font-display text-4xl font-bold text-transparent">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-white/40">{label}</div>
    </div>
  )
}
