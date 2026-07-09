'use client'

import { useState } from 'react'
import { Check, Rocket, ShieldCheck, Wrench, LineChart } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2 } from '@/components/os/ui'
import { PRODUCTS, CONTACT } from '@/lib/os'
import { PROMISES } from '@/lib/social'

const PROMISE_ICONS: Record<string, typeof Rocket> = { Rocket, ShieldCheck, Wrench, LineChart }

const PACKAGES = [
  {
    name: 'Launch',
    tagline: 'One high impact system, live fast.',
    for: 'Best for a single flagship agent or automation.',
    features: [
      '1 AI agent or automation',
      'Core integration (calendar / CRM / SMS)',
      'Setup, testing & go live',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    tagline: 'A connected stack that compounds.',
    for: 'Best for businesses automating multiple workflows.',
    features: [
      'Up to 3 agents + automations',
      'Multi tool integration layer',
      'Lead capture + follow up + support',
      'Monthly optimization & reporting',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Command',
    tagline: 'Your entire operation, autonomous.',
    for: 'Best for scaling companies going all in.',
    features: [
      'Unlimited agents + full automation suite',
      'Custom website / web app',
      'Business intelligence dashboards',
      'Dedicated build & strategy partner',
      'Continuous optimization',
    ],
    featured: false,
  },
]

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
              Every Xevaro system is scoped to your workflows, so pricing is tailored. Most engagements
              pair a one time build with a monthly retainer for hosting, monitoring and improvements.
              Pick the tier that fits and we&apos;ll send a precise quote.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={(i % 3) * 0.08}>
              <div className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                pkg.featured
                  ? 'border-[#E53E3E]/40 bg-gradient-to-b from-[#7F1D1D]/[0.10] to-white/[0.02] shadow-[0_0_40px_rgba(229,62,62,0.12)]'
                  : 'border-white/[0.08] bg-white/[0.02]'
              }`}>
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7F1D1D] to-[#E53E3E] px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white/90">{pkg.name}</h3>
                <p className="mt-2 text-sm text-white/60">{pkg.tagline}</p>
                <div className="mt-5 border-t border-white/[0.07] pt-5">
                  <span className="font-display text-3xl font-bold text-white/90">Custom</span>
                  <span className="ml-2 text-sm text-white/40">tailored quote</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E53E3E]" />{f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/40">{pkg.for}</p>
                <a
                  href="#quote"
                  className={`group relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold ${
                    pkg.featured ? 'text-white' : 'border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white'
                  }`}
                >
                  {pkg.featured && <span className="absolute inset-0 bg-gradient-to-r from-[#7F1D1D] to-[#E53E3E]" />}
                  <span className="relative">Get {pkg.name} Quote</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Guarantee band ── */}
      <section className="relative px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 md:grid-cols-4 md:p-10">
              {PROMISES.map(({ icon, title, desc }) => {
                const Icon = PROMISE_ICONS[icon] ?? Rocket
                return (
                  <div key={title}>
                    <Icon className="h-5 w-5 text-[#E53E3E]" />
                    <h4 className="mt-3 font-display text-sm font-semibold text-white/90">{title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/50">{desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="quote" className="relative scroll-mt-24 px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal><div className="mb-8 text-center"><Eyebrow>Get your custom quote</Eyebrow></div></Reveal>
          <GlassCard className="p-8 md:p-10">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E53E3E]/10 text-2xl text-[#E53E3E]">✓</span>
                <h3 className="font-display text-2xl text-white/90">Request received.</h3>
                <p className="mt-2 max-w-sm text-sm text-white/55">
                  Thanks, we&apos;ll review your needs and reach out within one business day with pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-white/55">
                  Request a custom quote. Fields marked <span className="text-[#E53E3E]">*</span> are required.
                </p>

                {/* Required service */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    Service you need pricing for <span className="text-[#E53E3E]">*</span>
                  </label>
                  <select
                    name="system"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors focus:border-[#E53E3E]/50"
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
                  <textarea name="message" rows={4} placeholder="Tell us about your operations and goals…" className="mt-2 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#E53E3E]/50" />
                </div>

                <button type="submit" disabled={busy} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white disabled:opacity-60">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7F1D1D] to-[#E53E3E]" />
                  <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(229,62,62,0.5)] transition-opacity group-hover:opacity-100" />
                  <span className="relative">{busy ? 'Sending…' : 'Request My Quote'}</span>
                </button>
                {error && <p className="text-center text-sm text-[#E0A86A]" role="alert">{error}</p>}

                <p className="text-center text-xs text-white/30">
                  Prefer to talk now? Call <a href={`tel:${CONTACT.phone}`} className="text-white/50 hover:text-[#E53E3E]">{CONTACT.phone}</a> or
                  email <a href={`mailto:${CONTACT.email}`} className="text-white/50 hover:text-[#E53E3E]">{CONTACT.email}</a>.
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
        {label} {required && <span className="text-[#E53E3E]">*</span>}
      </label>
      <input
        type={type} name={name} placeholder={placeholder} required={required}
        className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#E53E3E]/50"
      />
    </div>
  )
}
