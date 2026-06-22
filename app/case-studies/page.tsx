'use client'

import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { CASE_STUDIES } from '@/lib/os'

export default function CaseStudiesPage() {
  const glow = useGlow()
  return (
    <>
      <section className="relative px-6 pb-16 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Data Intelligence</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">Performance telemetry<br />from live systems.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-white/55">
              Every deployment reports back. These are real automation outcomes measured across
              commerce, SaaS, and enterprise operations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.client} delay={(i % 2) * 0.08}>
              <div onMouseMove={glow}>
                <GlassCard glow className="h-full p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-[#00D6FF]">CASE-0{i + 1}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">{c.sector}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white/90 md:text-3xl">{c.client}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/55">{c.desc}</p>

                  <div className="mt-8 flex items-end justify-between border-t border-white/[0.07] pt-6">
                    <div>
                      <div className="bg-gradient-to-br from-white to-[#00D6FF] bg-clip-text font-display text-5xl font-bold text-transparent">{c.metric}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide text-white/40">{c.label}</div>
                    </div>
                    <div className="flex h-12 items-end gap-1">
                      {[40, 65, 50, 80, 95].map((h, k) => (
                        <span key={k} className="w-1.5 rounded-t bg-gradient-to-t from-[#0050FF] to-[#00D6FF]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Your numbers, next.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center"><MagneticButton href="/contact">Start Your Deployment</MagneticButton></div>
        </Reveal>
      </section>
    </>
  )
}
