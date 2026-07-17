'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── Login screen ─────────────────────────────────────────────────────────────

export function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? 'Login failed.')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-white/[0.025] p-8 backdrop-blur-xl">
        <div className="mb-1 flex items-center gap-2.5">
          <span className="h-4 w-4 rounded-[4px] bg-gradient-to-br from-[#7C1418] to-[#E53E3E] shadow-[0_0_14px_rgba(229,62,62,0.5)]" />
          <span className="font-display font-semibold tracking-tight text-white/90">Xevaro OS</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-white/90">Admin Access</h1>
        <p className="mt-1 mb-6 text-sm text-white/45">Enter the admin password to view submissions.</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#E53E3E]/50"
        />
        {error && <p className="mt-3 text-sm text-[#E0A86A]">{error}</p>}

        <button type="submit" disabled={busy} className="group relative mt-5 inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-60">
          <span className="absolute inset-0 bg-gradient-to-r from-[#7C1418] to-[#E53E3E]" />
          <span className="relative">{busy ? 'Verifying…' : 'Enter'}</span>
        </button>
      </form>
    </div>
  )
}

// ─── Logout button ────────────────────────────────────────────────────────────

export function LogoutButton() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.refresh()
  }
  return (
    <button onClick={logout} className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white">
      Sign out
    </button>
  )
}
