'use client'

import { useState } from 'react'
import { Reveal, Eyebrow, GlassCard, H2 } from '@/components/os/ui'
import { CONTACT } from '@/lib/os'
import { trackLead } from '@/components/Analytics'

export default function ContactPage() {
  const [sent, setSent]       = useState(false)
  const [busy, setBusy]       = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name:    fd.get('name'),
      company: fd.get('company'),
      email:   fd.get('email'),
      phone:   fd.get('phone'),
      system:  fd.get('system'),
      message: fd.get('message'),
      source:  'contact',
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Transmission failed. Please try again.')
      }
      setSent(true)
      trackLead() // fire Reddit/GA conversion on a real submission
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transmission failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative px-6 pb-32 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>Control Interface</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <H2 className="max-w-4xl text-5xl md:text-7xl">Open a channel to<br />the Xevaro core.</H2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Channel info */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">Direct uplink</div>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 block font-display text-xl text-[#F4E9EC]/90 transition-colors hover:text-[#EE4C7C]">{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phone}`} className="mt-2 block font-display text-xl text-[#F4E9EC]/90 transition-colors hover:text-[#EE4C7C]">{CONTACT.phone}</a>
              </GlassCard>
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">System status</div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#EE4C7C] shadow-[0_0_10px_#EE4C7C]" />
                  <span className="text-[#F4E9EC]/75">All systems operational · accepting deployments</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#F4E9EC]/60">
                  Typical response within one business day. We&apos;ll scope your automation audit and
                  return a module map for your operations.
                </p>
              </GlassCard>
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">What happens next</div>
                <ol className="mt-4 space-y-3.5">
                  {[
                    ['1', 'We reply within one business day to book a short call.'],
                    ['2', 'We map your highest return automation and send a clear plan.'],
                    ['3', 'We build and launch your system, usually within one to two weeks.'],
                  ].map(([n, t]) => (
                    <li key={n} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#EE4C7C]/30 bg-[#EE4C7C]/5 font-mono text-[11px] text-[#EE4C7C]">{n}</span>
                      <span className="text-sm leading-relaxed text-[#F4E9EC]/65">{t}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-[#F4E9EC]/55">
                  No obligation, no pressure, no jargon.
                </p>
              </GlassCard>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <GlassCard className="p-8 md:p-10">
              {sent ? (
                <div className="flex h-full min-h-[340px] flex-col items-center justify-center text-center">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EE4C7C]/10 text-2xl text-[#EE4C7C]">✓</span>
                  <h3 className="font-display text-2xl text-[#F4E9EC]/90">Signal received.</h3>
                  <p className="mt-2 text-sm text-[#F4E9EC]/60">Our core will respond to your channel shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" placeholder="Your name" />
                    <Field label="Company" name="company" placeholder="Organization" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                    <Field label="Phone" name="phone" type="tel" placeholder="+1 555 123 4567" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">System of interest</label>
                    <select name="system" className="mt-2 w-full rounded-xl border border-white/15 bg-white/55 px-4 py-3 text-sm text-[#F4E9EC]/85 outline-none transition-colors focus:border-[#EE4C7C]/50">
                      <option className="bg-white/[0.06] text-[#F4E9EC]">AI Automation Systems</option>
                      <option className="bg-white/[0.06] text-[#F4E9EC]">AI Agents &amp; Voice Systems</option>
                      <option className="bg-white/[0.06] text-[#F4E9EC]">Lead Generation Systems</option>
                      <option className="bg-white/[0.06] text-[#F4E9EC]">High Conversion Website Systems</option>
                      <option className="bg-white/[0.06] text-[#F4E9EC]">Shopify AI Commerce Systems</option>
                      <option className="bg-white/[0.06] text-[#F4E9EC]">Business Intelligence Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">Message</label>
                    <textarea name="message" rows={4} placeholder="Describe your operations..." className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/55 px-4 py-3 text-sm text-[#F4E9EC]/85 outline-none transition-colors placeholder:text-white/25 focus:border-[#EE4C7C]/50" />
                  </div>
                  <button type="submit" disabled={busy} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-[#F4E9EC] disabled:opacity-60">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#9A1750] to-[#EE4C7C]" />
                    <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(238, 76, 124,0.5)] transition-opacity group-hover:opacity-100" />
                    <span className="relative">{busy ? 'Transmitting…' : 'Transmit to Core'}</span>
                  </button>
                  {error && <p className="text-center text-sm text-[#E0A86A]" role="alert">{error}</p>}
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-[#F4E9EC]/55">{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} required={required}
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/55 px-4 py-3 text-sm text-[#F4E9EC]/85 outline-none transition-colors placeholder:text-white/25 focus:border-[#EE4C7C]/50"
      />
    </div>
  )
}
