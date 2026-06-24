'use client'

import { useState } from 'react'
import { Reveal, Eyebrow, GlassCard, H2 } from '@/components/os/ui'
import { PRODUCTS, CONTACT } from '@/lib/os'

export default function PricingPage() {
  const [sent, setSent]   = useState(false)
  const [busy, setBusy]   = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const service = (fd.get('system') ?? '').toString()
    if (!service) { setError('Please select the service you need pricing for.'); return }

    setBusy(true); setError('')
    const payload = {
      name:    fd.get('name'),
      company: fd.get('company'),
      email:   fd.get('email'),
      phone:   fd.get('phone'),
      system:  service,
      message: fd.get('message'),
      source:  'pricing',
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? 'Could not send your request. Please try again.')
      }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your request.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow>Pricing</Eyebrow></div></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-5xl md:text-7xl">Tailored to your<br />operations.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
              Every Xevaro system is scoped to your workflows, so pricing is custom. Tell us which
              system you need and a few details — we&apos;ll call or email you with a precise quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-2xl">
          <GlassCard className="p-8 md:p-10">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D6FF]/10 text-2xl text-[#00D6FF]">✓</span>
                <h3 className="font-display text-2xl text-white/90">Request received.</h3>
                <p className="mt-2 max-w-sm text-sm text-white/55">
                  Thanks — we&apos;ll review your needs and reach out within one business day with pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-white/55">
                  Request a custom quote. Fields marked <span className="text-[#00D6FF]">*</span> are required.
                </p>

                {/* Required service */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    Service you need pricing for <span className="text-[#00D6FF]">*</span>
                  </label>
                  <select
                    name="system"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors focus:border-[#00D6FF]/50"
                  >
                    <option value="" disabled className="bg-[#0A0A0C]">Select a system…</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name} className="bg-[#0A0A0C]">{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" />
                  <Field label="Company" name="company" placeholder="Organization" />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                  <Field label="Phone" name="phone" type="tel" placeholder="+1 555 123 4567" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Project details</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your operations and goals…" className="mt-2 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50" />
                </div>

                <button type="submit" disabled={busy} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white disabled:opacity-60">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF]" />
                  <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(0,214,255,0.5)] transition-opacity group-hover:opacity-100" />
                  <span className="relative">{busy ? 'Sending…' : 'Request My Quote'}</span>
                </button>
                {error && <p className="text-center text-sm text-[#FF6b63]" role="alert">{error}</p>}

                <p className="text-center text-xs text-white/30">
                  Prefer to talk now? Call <a href={`tel:${CONTACT.phone}`} className="text-white/50 hover:text-[#00D6FF]">{CONTACT.phone}</a> or
                  email <a href={`mailto:${CONTACT.email}`} className="text-white/50 hover:text-[#00D6FF]">{CONTACT.email}</a>.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, type = 'text', placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label} {required && <span className="text-[#00D6FF]">*</span>}
      </label>
      <input
        type={type} name={name} placeholder={placeholder} required={required}
        className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50"
      />
    </div>
  )
}
