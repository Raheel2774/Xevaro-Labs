'use client'

import { useMemo, useState } from 'react'
import {
  Sparkles, Wrench, HardHat, Leaf, Car, Stethoscope, Syringe, Activity,
  PawPrint, Dumbbell, Scale, Calculator, GraduationCap, Megaphone,
  UtensilsCrossed, ShoppingCart, Scissors, Store, Home, Landmark,
  ShieldCheck, Building2, Sun, Cpu, PartyPopper, Search, X, Check,
  ArrowRight, Zap, type LucideIcon,
} from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { NICHES, NICHE_CATEGORIES, TOTAL_AGENTS, FLAGSHIP_AGENTS, type Agent } from '@/lib/agents'
import { trackLead } from '@/components/Analytics'

const ICONS: Record<string, LucideIcon> = {
  Sparkles, Wrench, HardHat, Leaf, Car, Stethoscope, Syringe, Activity,
  PawPrint, Dumbbell, Scale, Calculator, GraduationCap, Megaphone,
  UtensilsCrossed, ShoppingCart, Scissors, Store, Home, Landmark,
  ShieldCheck, Building2, Sun, Cpu, PartyPopper,
}

export default function AgentsPage() {
  const glow = useGlow()
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<{ agent: Agent; niche: string } | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return NICHES.filter((n) => {
      if (category !== 'All' && n.category !== category) return false
      if (!q) return true
      return (
        n.name.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.agents.some((a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-16 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>AI Agent Catalog</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-5xl text-5xl md:text-7xl">
              {TOTAL_AGENTS} AI agents.<br />
              <span className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] bg-clip-text text-transparent">
                25 industries.
              </span>{' '}
              One command layer.
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-white/55">
              Deployable AI agents engineered to capture leads, book appointments, recover revenue
              and run support, around the clock. Pick the agent you want, and we&apos;ll set it up for you.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#catalog">Browse the Catalog</MagneticButton>
              <MagneticButton href="/best-sellers" variant="ghost">See Best Sellers →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Flagship band ────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#00D6FF]/20 bg-gradient-to-br from-[#0050FF]/[0.08] via-white/[0.02] to-transparent p-8 md:p-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#0050FF]/20 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00D6FF]/30 bg-[#00D6FF]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00D6FF]">
                    <Zap className="h-3 w-3" /> Top 5 Best Sellers
                  </div>
                  <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold text-white/90 md:text-3xl">
                    The 5 agents our clients deploy first, and swear by.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm text-white/55">
                    Cross industry heroes: {FLAGSHIP_AGENTS.map((f) => f.name).slice(0, 3).join(', ')} and more.
                  </p>
                </div>
                <MagneticButton href="/best-sellers">Explore Best Sellers</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section id="catalog" className="relative scroll-mt-24 px-6 pb-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {['All', ...NICHE_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                    category === cat
                      ? 'border-[#00D6FF]/50 bg-[#00D6FF]/10 text-white'
                      : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents or industries…"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white/80 outline-none transition-colors placeholder:text-white/30 focus:border-[#00D6FF]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Niche grid ───────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-16 text-center text-white/50">
              No agents match “{query}”. Try another search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((niche, i) => {
                const Icon = ICONS[niche.icon] ?? Sparkles
                return (
                  <Reveal key={niche.slug} delay={(i % 3) * 0.06}>
                    <div onMouseMove={glow} className="h-full">
                      <GlassCard glow className="flex h-full flex-col p-7">
                        <div className="flex items-start justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D6FF]/20 bg-[#00D6FF]/5 text-[#00D6FF]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white/40">
                            {niche.category}
                          </span>
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold text-white/90">{niche.name}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-white/50">{niche.tagline}</p>

                        <div className="mt-5 flex flex-1 flex-col gap-2.5">
                          {niche.agents.map((agent) => (
                            <button
                              key={agent.id}
                              onClick={() => setSelected({ agent, niche: niche.name })}
                              className="group/agent flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition-all hover:border-[#00D6FF]/40 hover:bg-[#00D6FF]/[0.04]"
                            >
                              <span>
                                <span className="block text-[13px] font-medium text-white/85">{agent.name}</span>
                                <span className="mt-0.5 block text-[11px] leading-snug text-white/40">{agent.desc}</span>
                              </span>
                              <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/25 transition-all group-hover/agent:translate-x-0.5 group-hover/agent:text-[#00D6FF]" />
                            </button>
                          ))}
                        </div>
                      </GlassCard>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Don&apos;t see your exact use case?</H2></Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-white/55">
            Every agent is custom built to your workflow. Tell us what you want automated and
            we&apos;ll scope it for you.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-9 flex justify-center">
            <MagneticButton href="/contact">Request a Custom Agent</MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* ── Inquiry modal ────────────────────────────────────────────────── */}
      {selected && (
        <InquiryModal agent={selected.agent} niche={selected.niche} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

// ─── Per-agent inquiry modal ──────────────────────────────────────────────────

function InquiryModal({ agent, niche, onClose }: { agent: Agent; niche: string; onClose: () => void }) {
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
      system: `${agent.name} · ${niche}`,
      message: fd.get('message'),
      source: 'agents',
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
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0C] shadow-[0_0_60px_rgba(0,214,255,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-8 py-12 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D6FF]/10 text-[#00D6FF]">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="font-display text-2xl text-white/90">Request received.</h3>
            <p className="mt-2 max-w-xs text-sm text-white/55">
              Our team will reach out within one business day to set up your <span className="text-white/80">{agent.name}</span>.
            </p>
            <button onClick={onClose} className="mt-6 rounded-full border border-white/15 px-6 py-2.5 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white">
              Close
            </button>
          </div>
        ) : (
          <div className="max-h-[85vh] overflow-y-auto">
            {/* Agent summary header */}
            <div className="border-b border-white/[0.06] bg-gradient-to-br from-[#0050FF]/[0.08] to-transparent p-6 pr-14">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#00D6FF]">Set up this agent</div>
              <h3 className="mt-2 font-display text-xl font-semibold text-white/90">{agent.name}</h3>
              <p className="mt-1 text-[13px] text-white/50">{niche}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {agent.features.map((f) => (
                  <li key={f} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
                    <Check className="h-3 w-3 text-[#00D6FF]" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
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
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">What do you need it to do?</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={`Tell us about your ${niche.toLowerCase()} business…`}
                  className="mt-2 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF]" />
                <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(0,214,255,0.5)] transition-opacity group-hover:opacity-100" />
                <span className="relative">{busy ? 'Sending…' : 'Request Setup'}</span>
              </button>
              {error && <p className="text-center text-sm text-[#FF6b63]" role="alert">{error}</p>}
              <p className="text-center text-[11px] text-white/35">
                No obligation. We&apos;ll reply within one business day.
              </p>
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
      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-[#00D6FF]/50"
      />
    </div>
  )
}
