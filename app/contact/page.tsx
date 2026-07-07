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
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">Direct uplink</div>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 block font-display text-xl text-white/90 transition-colors hover:text-[#00D6FF]">{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phone}`} className="mt-2 block font-display text-xl text-white/90 transition-colors hover:text-[#00D6FF]">{CONTACT.phone}</a>
              </GlassCard>
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">System status</div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D6FF] shadow-[0_0_10px_#00D6FF]" />
                  <span className="text-white/70">All systems operational · accepting deployments</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  Typical response within one business day. We&apos;ll scope your automation audit and
                  return a module map for your operations.
                </p>
              </GlassCard>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <GlassCard className="p-8 md:p-10">
              {sent ? (
                <div className="flex h-full min-h-[340px] flex-col items-center justify-center text-center">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D6FF]/10 text-2xl text-[#00D6FF]">✓</span>
                  <h3 className="font-display text-2xl text-white/90">Signal received.</h3>
                  <p className="mt-2 text-sm text-white/55">Our core will respond to your channel shortly.</p>
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
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">System of interest</label>
                    <select name="system" className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors focus:border-[#00D6FF]/50">
                      <option className="bg-[#0A0A0C]">AI Automation Systems</option>
                      <option className="bg-[#0A0A0C]">AI Agents &amp; Voice Systems</option>
                      <option className="bg-[#0A0A0C]">Lead Generation Systems</option>
                      <option className="bg-[#0A0A0C]">High-Conversion Website Systems</option>
                      <option className="bg-[#0A0A0C]">Shopify AI Commerce Systems</option>
                      <option className="bg-[#0A0A0C]">Business Intelligence Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Message</label>
                    <textarea name="message" rows={4} placeholder="Describe your operations..." className="mt-2 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50" />
                  </div>
                  <button type="submit" disabled={busy} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white disabled:opacity-60">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF]" />
                    <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(0,214,255,0.5)] transition-opacity group-hover:opacity-100" />
                    <span className="relative">{busy ? 'Transmitting…' : 'Transmit to Core'}</span>
                  </button>
                  {error && <p className="text-center text-sm text-[#FF6b63]" role="alert">{error}</p>}
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
      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} required={required}
        className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50"
      />
    </div>
  )
}
