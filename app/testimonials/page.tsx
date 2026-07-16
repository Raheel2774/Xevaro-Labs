'use client'

import { Quote, Star } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { TESTIMONIALS, TRUST_STATS } from '@/lib/social'

export default function TestimonialsPage() {
  const glow = useGlow()
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Wall of love</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">
              Loved by the businesses{' '}
              <span className="bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] bg-clip-text text-transparent">
                we run for.
              </span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-[#5D001E]/60">
              Real outcomes from real deployments. Owners, founders and operators who put an AI agent
              to work and never looked back.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex items-center gap-3 text-sm text-[#5D001E]/60">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#EE4C7C] text-[#EE4C7C]" />
                ))}
              </span>
              <span>Rated 4.9 out of 5 across client engagements</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#5D001E]/10 bg-white/60 md:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-white/70 p-7 text-center backdrop-blur-xl">
                  <div className="bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-3xl font-bold text-transparent md:text-4xl">{s.value}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wide text-[#5D001E]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Wall ── */}
      <section className="relative px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.06}>
                <div onMouseMove={glow} className="break-inside-avoid">
                  <GlassCard glow className="flex flex-col p-7">
                    <Quote className="h-6 w-6 text-[#EE4C7C]/50" />
                    <p className="mt-4 text-[15px] leading-relaxed text-[#5D001E]/75">“{t.quote}”</p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#5D001E]/10 pt-5">
                      <div>
                        <div className="text-sm font-semibold text-[#5D001E]/85">{t.name}</div>
                        <div className="text-xs text-[#5D001E]/55">{t.role} · {t.industry}</div>
                      </div>
                      <span className="rounded-full border border-[#EE4C7C]/30 bg-[#EE4C7C]/5 px-3 py-1 font-mono text-[10px] text-[#EE4C7C]">{t.result}</span>
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Write your own success story.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
            <MagneticButton href="/best-sellers" variant="ghost">See Best Selling Agents →</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
