'use client'

import { useState } from 'react'
import { Check, X, Zap, ArrowRight, Star, ShieldCheck, Clock, Sparkles } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { FLAGSHIP_AGENTS, type Flagship } from '@/lib/agents'
import { trackLead } from '@/components/Analytics'

export default function BestSellersPage() {
  const glow = useGlow()
  const [selected, setSelected] = useState<Flagship | null>(null)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-[#9A1750]/[0.10] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EE4C7C]/30 bg-[#EE4C7C]/[0.06] px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-[#EE4C7C]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#5D001E]/65">The Flagship Five</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <H2 className="mx-auto mt-7 max-w-4xl text-5xl md:text-8xl">
              Our{' '}
              <span className="bg-gradient-to-r from-[#9A1750] via-[#9A1750] to-[#EE4C7C] bg-clip-text text-transparent">
                best selling
              </span>{' '}
              AI agents.
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[#5D001E]/60">
              Five battle tested agents that capture leads, book appointments, close deals and build
              reputation, deployed across hundreds of businesses. These are the ones clients start with.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="#agents">See the Five</MagneticButton>
              <MagneticButton href="/agents" variant="ghost">Full Catalog →</MagneticButton>
            </div>
          </Reveal>

          {/* Trust bar */}
          <Reveal delay={0.2}>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Clock, v: '24/7', l: 'Always on' },
                { icon: Zap, v: '<30s', l: 'Response time' },
                { icon: Star, v: '5★', l: 'On brand' },
                { icon: ShieldCheck, v: '100%', l: 'You own it' },
              ].map(({ icon: Icon, v, l }) => (
                <div key={l} className="rounded-2xl border border-[#5D001E]/10 bg-white/55 p-5">
                  <Icon className="mx-auto h-5 w-5 text-[#EE4C7C]" />
                  <div className="mt-2 font-display text-2xl font-bold text-[#5D001E]/90">{v}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-[#5D001E]/55">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Flagship agents ──────────────────────────────────────────────── */}
      <section id="agents" className="relative scroll-mt-24 px-6 pb-24 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {FLAGSHIP_AGENTS.map((agent, i) => (
            <Reveal key={agent.id} delay={0.04}>
              <div onMouseMove={glow}>
                <GlassCard glow className="p-8 md:p-12">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left: identity + problem + how */}
                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] font-display text-lg font-bold text-white shadow-[0_0_24px_rgba(238, 76, 124,0.35)]">
                          {agent.rank}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EE4C7C]/30 bg-[#EE4C7C]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#EE4C7C]">
                          <Star className="h-3 w-3" /> {agent.badge}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-3xl font-bold text-[#5D001E]/90 md:text-4xl">{agent.name}</h3>
                      <p className="mt-3 text-lg font-light text-[#5D001E]/75">{agent.tagline}</p>

                      <div className="mt-6 rounded-xl border border-[#5D001E]/10 bg-white/55 p-5">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#E0A86A]/80">The problem</div>
                        <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/65">{agent.problem}</p>
                      </div>

                      <div className="mt-6">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#5D001E]/55">How it works</div>
                        <ol className="mt-3 space-y-3">
                          {agent.how.map((step, s) => (
                            <li key={step} className="flex gap-3">
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#EE4C7C]/30 bg-[#EE4C7C]/5 font-mono text-[11px] text-[#EE4C7C]">
                                {s + 1}
                              </span>
                              <span className="text-sm leading-relaxed text-[#5D001E]/75">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <button
                        onClick={() => setSelected(agent)}
                        className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-[#5D001E]"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#9A1750] to-[#EE4C7C]" />
                        <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(238, 76, 124,0.5)] transition-opacity group-hover:opacity-100" />
                        <span className="relative flex items-center gap-2">
                          Deploy {agent.name}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    </div>

                    {/* Right: results + integrations + best for */}
                    <div className={`flex flex-col gap-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="grid grid-cols-3 gap-3">
                        {agent.results.map((r) => (
                          <div key={r.label} className="rounded-2xl border border-[#5D001E]/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 text-center">
                            <div className="bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-2xl font-bold text-transparent md:text-3xl">
                              {r.stat}
                            </div>
                            <div className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-[#5D001E]/55">{r.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-[#5D001E]/10 bg-white/55 p-6">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#5D001E]/55">Connects with</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {agent.integrations.map((int) => (
                            <span key={int} className="rounded-full border border-[#5D001E]/15 bg-white/55 px-3 py-1.5 text-xs text-[#5D001E]/65">
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#EE4C7C]/15 bg-[#EE4C7C]/[0.03] p-6">
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#EE4C7C]">
                          <Sparkles className="h-3 w-3" /> Best for
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/75">{agent.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Guarantee band ───────────────────────────────────────────────── */}
      <section className="relative px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#5D001E]/10 bg-gradient-to-br from-[#9A1750]/[0.08] via-white/[0.02] to-transparent p-10 md:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#EE4C7C]/15 blur-3xl" />
              <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  { icon: Zap, t: 'Live in days, not months', d: 'We ship working agents fast, most go live within one to two weeks.' },
                  { icon: ShieldCheck, t: 'You own the system', d: 'Self hostable infrastructure. Your data, your accounts, your control.' },
                  { icon: Star, t: 'Built for your workflow', d: 'Every agent is tailored to your business, not a generic chatbot.' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EE4C7C]/20 bg-[#EE4C7C]/5 text-[#EE4C7C]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-4 font-display text-lg font-semibold text-[#5D001E]/90">{t}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/60">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><Eyebrow>Deploy your first agent</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <H2 className="mx-auto max-w-3xl text-4xl md:text-6xl">Pick an agent. We build it. You grow.</H2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="#agents">Choose a Best Seller</MagneticButton>
            <MagneticButton href="/agents" variant="ghost">Browse All 75 Agents →</MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* ── Inquiry modal ────────────────────────────────────────────────── */}
      {selected && <FlagshipModal agent={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

// ─── Flagship inquiry modal ───────────────────────────────────────────────────

function FlagshipModal({ agent, onClose }: { agent: Flagship; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      company: fd.get('company'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      system: `${agent.name} (Best Seller #${agent.rank})`,
      message: fd.get('message'),
      source: 'best-sellers',
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
      trackLead()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transmission failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#5D001E]/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#5D001E]/15 bg-[#0A0A0C] shadow-[0_0_60px_rgba(238, 76, 124,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#5D001E]/15 text-[#5D001E]/60 transition-colors hover:border-white/30 hover:text-[#5D001E]"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-8 py-12 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EE4C7C]/10 text-[#EE4C7C]">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="font-display text-2xl text-[#5D001E]/90">Request received.</h3>
            <p className="mt-2 max-w-xs text-sm text-[#5D001E]/60">
              We&apos;ll reach out within one business day to deploy your <span className="text-[#5D001E]/85">{agent.name}</span>.
            </p>
            <button onClick={onClose} className="mt-6 rounded-full border border-[#5D001E]/20 px-6 py-2.5 text-sm text-[#5D001E]/75 transition-colors hover:border-white/40 hover:text-[#5D001E]">
              Close
            </button>
          </div>
        ) : (
          <div className="max-h-[85vh] overflow-y-auto">
            <div className="border-b border-[#5D001E]/10 bg-gradient-to-br from-[#9A1750]/[0.08] to-transparent p-6 pr-14">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#EE4C7C]">Deploy best seller #{agent.rank}</div>
              <h3 className="mt-2 font-display text-xl font-semibold text-[#5D001E]/90">{agent.name}</h3>
              <p className="mt-1 text-[13px] text-[#5D001E]/60">{agent.tagline}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ModalField label="Name" name="name" placeholder="Your name" />
                <ModalField label="Company" name="company" placeholder="Business name" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ModalField label="Email" name="email" type="email" placeholder="you@company.com" required />
                <ModalField label="Phone" name="phone" type="tel" placeholder="+1 555 123 4567" />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#5D001E]/55">Anything we should know?</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your business…"
                  className="mt-2 w-full resize-none rounded-xl border border-[#5D001E]/15 bg-white/55 px-4 py-3 text-sm text-[#5D001E]/85 outline-none transition-colors placeholder:text-white/25 focus:border-[#EE4C7C]/50"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-[#5D001E] disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#9A1750] to-[#EE4C7C]" />
                <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(238, 76, 124,0.5)] transition-opacity group-hover:opacity-100" />
                <span className="relative">{busy ? 'Sending…' : 'Request Setup'}</span>
              </button>
              {error && <p className="text-center text-sm text-[#E0A86A]" role="alert">{error}</p>}
              <p className="text-center text-[11px] text-[#5D001E]/55">No obligation. We&apos;ll reply within one business day.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

function ModalField({ label, name, type = 'text', placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-[#5D001E]/55">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-[#5D001E]/15 bg-white/55 px-4 py-3 text-sm text-[#5D001E]/85 outline-none transition-colors placeholder:text-white/25 focus:border-[#EE4C7C]/50"
      />
    </div>
  )
}
