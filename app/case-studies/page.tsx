'use client'

import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { CASE_STUDIES } from '@/lib/os'
import { TRUST_STATS, TESTIMONIALS } from '@/lib/social'

export default function CaseStudiesPage() {
  const glow = useGlow()
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Proven in production</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">
              Real systems.<br />
              <span className="text-white">Measurable impact.</span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-[#FFFFFF]/60">
              Every deployment reports back. These are real automation outcomes measured across
              commerce, SaaS, retail and enterprise operations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Aggregate impact ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] md:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-white/[0.06] p-7 text-center backdrop-blur-xl">
                  <div className="bg-gradient-to-br from-[#7C1418] to-[#B41D24] bg-clip-text font-display text-3xl font-bold text-transparent md:text-4xl">{s.value}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wide text-[#FFFFFF]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.client} delay={0.04}>
              <div onMouseMove={glow}>
                <GlassCard glow className="p-8 md:p-12">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tracking-widest text-[#B41D24]">CASE-0{i + 1}</span>
                        <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#FFFFFF]/55">{c.sector}</span>
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-bold text-[#FFFFFF]/90 md:text-3xl">{c.client}</h3>

                      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[#E0A86A]/80">Challenge</div>
                          <p className="mt-2 text-sm leading-relaxed text-[#FFFFFF]/65">{c.challenge}</p>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[#B41D24]/80">System deployed</div>
                          <p className="mt-2 text-sm leading-relaxed text-[#FFFFFF]/65">{c.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 text-center">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#FFFFFF]/55">Result</div>
                      <div className="mt-2 bg-gradient-to-br from-[#7C1418] to-[#B41D24] bg-clip-text font-display text-5xl font-bold text-transparent md:text-6xl">{c.metric}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide text-[#FFFFFF]/55">{c.label}</div>
                      <div className="mt-5 flex h-10 items-end justify-center gap-1">
                        {[40, 65, 50, 80, 95].map((h, k) => (
                          <span key={k} className="w-1.5 rounded-t bg-gradient-to-t from-[#7C1418] to-[#B41D24]" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="p-10 text-center md:p-14">
              <div className="flex justify-center gap-0.5 text-[#B41D24]">★★★★★</div>
              <p className="mt-6 font-display text-2xl font-light leading-relaxed text-[#FFFFFF]/85 md:text-3xl">
                “{TESTIMONIALS[3].quote}”
              </p>
              <div className="mt-6 text-sm text-[#FFFFFF]/60">
                {TESTIMONIALS[3].name} · {TESTIMONIALS[3].role}, {TESTIMONIALS[3].industry}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Your numbers, next.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Start Your Deployment</MagneticButton>
            <MagneticButton href="/best-sellers" variant="ghost">See Best Selling Agents →</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
