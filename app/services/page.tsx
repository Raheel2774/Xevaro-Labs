'use client'

import { Check, ArrowRight } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { PRODUCTS } from '@/lib/os'
import { TOTAL_AGENTS } from '@/lib/agents'
import { PROCESS, DIFFERENTIATORS, TESTIMONIALS, TRUST_STATS } from '@/lib/social'

export default function ServicesPage() {
  const glow = useGlow()
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative px-6 pb-16 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>AI Systems & Services</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">
              Automation that runs<br />
              <span className="bg-gradient-to-r from-[#7C1418] to-[#B41D24] bg-clip-text text-transparent">
                your business for you.
              </span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-[#FBF8F8]/65">
              Six productized AI systems that replace manual operations with self executing
              infrastructure, capturing leads, booking work, running support and surfacing insight, 24/7.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
              <MagneticButton href="/agents" variant="ghost">Browse {TOTAL_AGENTS} AI Agents →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="relative px-6 pb-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-white/[0.06] p-7 text-center backdrop-blur-xl">
                  <div className="bg-gradient-to-br from-[#7C1418] to-[#B41D24] bg-clip-text font-display text-3xl font-bold text-transparent md:text-4xl">{s.value}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wide text-[#FBF8F8]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Systems grid ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>The system catalog</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Six systems. One core.</H2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.08}>
                <div onMouseMove={glow} className="h-full">
                  <GlassCard glow className="h-full p-8 md:p-10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-widest text-[#B41D24]">{p.index}</span>
                      <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#FBF8F8]/55">{p.tagline}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-[#FBF8F8] md:text-3xl">{p.name}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#FBF8F8]/65">{p.description}</p>

                    <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {p.features.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-sm text-[#FBF8F8]/60">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 text-[#B41D24]" />{inc}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 rounded-xl border border-white/10 bg-white/55 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#7C1418]/60">Outcome</div>
                      <p className="mt-1.5 text-sm text-[#FBF8F8]/75">{p.outcome}</p>
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents cross-link ── */}
      <section className="relative px-6 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#B41D24]/20 bg-gradient-to-br from-[#7C1418]/[0.08] via-white/[0.02] to-transparent p-8 md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#7C1418]/20 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="max-w-xl font-display text-2xl font-semibold text-[#FBF8F8] md:text-3xl">
                    Want a ready made agent for your industry?
                  </h3>
                  <p className="mt-3 max-w-lg text-sm text-[#FBF8F8]/65">
                    {TOTAL_AGENTS} prebuilt AI agents across 25 industries, booking, lead capture,
                    follow up, support and reputation. Pick one and we set it up for you.
                  </p>
                </div>
                <MagneticButton href="/agents">Explore AI Agents</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>How we deliver</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">A proven deployment path.</H2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={(i % 4) * 0.08}>
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/55 p-7">
                  <span className="font-mono text-3xl font-bold text-[#B41D24]/20">{p.step}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#FBF8F8]">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#FBF8F8]/65">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Xevaro ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Why Xevaro</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Built different on purpose.</H2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/[0.07] bg-white/55 p-7">
                  <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#B41D24]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#FBF8F8]">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#FBF8F8]/65">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="p-10 text-center md:p-14">
              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#B41D24]">★</span>
                ))}
              </div>
              <p className="mt-6 font-display text-2xl font-light leading-relaxed text-white/85 md:text-3xl">
                “{TESTIMONIALS[4].quote}”
              </p>
              <div className="mt-6 text-sm text-[#FBF8F8]/60">
                {TESTIMONIALS[4].name} · {TESTIMONIALS[4].role}, {TESTIMONIALS[4].industry}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Compose your automation stack.</H2></Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[#FBF8F8]/65">
            Book a free audit and we&apos;ll map the highest ROI systems for your operation, no pressure, no jargon.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
            <MagneticButton href="/pricing" variant="ghost">See Pricing →</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
