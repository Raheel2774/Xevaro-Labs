'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Reveal, Eyebrow, GlassCard, H2 } from '@/components/os/ui'
import { trackLead } from '@/components/Analytics'

export default function ClaimPage() {
  const [sent, setSent]   = useState(false)
  const [busy, setBusy]   = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const smsConsent = fd.get('smsConsent') ? 'yes' : 'no'
    const payload = {
      name:       fd.get('name'),
      company:    fd.get('company'),
      email:      fd.get('email'),
      phone:      fd.get('phone'),
      message:    fd.get('message'),
      system:     'High-Conversion Website Systems',
      source:     'claim',
      smsConsent,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Submission failed. Please try again.')
      }
      setSent(true)
      trackLead()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative px-6 pb-32 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>Free Website Demo</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <H2 className="max-w-4xl text-5xl md:text-7xl">Claim the website<br />we built for you.</H2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Tell us your business and we&apos;ll send you a live demo of a professional site — built for
            your company, with click-to-call, a quote form, and Google visibility. $0 to build, $199/mo
            once it&apos;s live. No obligation to look.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* What you get */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">What you get</div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
                  <li>· A live demo site with your business name — free to preview</li>
                  <li>· Mobile-friendly 5-page build (Home, Services, Area, About, Contact)</li>
                  <li>· Click-to-call + quote form so no lead slips through</li>
                  <li>· Google Business Profile setup for &ldquo;near me&rdquo; searches</li>
                  <li>· Hosting, edits, and local SEO included — $0 down, $199/mo</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">How it works</div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Submit the form. We build your demo and send you the link — by email, or by text if you
                  opt in. Like it? We make it yours. Don&apos;t? No charge, no follow-up.
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
                  <h3 className="font-display text-2xl text-white/90">Request received.</h3>
                  <p className="mt-2 text-sm text-white/55">We&apos;ll build your demo and send you the link shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Business name" name="company" placeholder="Your business" required />
                    <Field label="Your name" name="name" placeholder="Your name" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" placeholder="you@business.com" required />
                    <Field label="Mobile phone" name="phone" type="tel" placeholder="+1 555 123 4567" required />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Anything we should know? (optional)</label>
                    <textarea name="message" rows={3} placeholder="Your city, trade, or what you'd like on the site..." className="mt-2 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50" />
                  </div>

                  {/* SMS consent — unchecked by default, not required to submit */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.1] bg-white/[0.02] p-4">
                    <input type="checkbox" name="smsConsent" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-[#00D6FF]" />
                    <span className="text-[13px] leading-relaxed text-white/55">
                      Text me my website demo. By checking this box, I agree to receive SMS messages from
                      Xevaro Labs about my demo and related services at the number provided. Message
                      frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for
                      help. See our{' '}
                      <Link href="/privacy" className="text-[#00D6FF] hover:underline">Privacy Policy</Link> and{' '}
                      <Link href="/terms" className="text-[#00D6FF] hover:underline">Terms of Service</Link>.
                      Consent is not a condition of any purchase.
                    </span>
                  </label>

                  <button type="submit" disabled={busy} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white disabled:opacity-60">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF]" />
                    <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(0,214,255,0.5)] transition-opacity group-hover:opacity-100" />
                    <span className="relative">{busy ? 'Sending…' : 'Send me my demo'}</span>
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
