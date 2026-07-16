'use client'

import { ArrowRight } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton } from '@/components/os/ui'
import { TIMELINE } from '@/lib/os'
import { TRUST_STATS, DIFFERENTIATORS, TESTIMONIALS } from '@/lib/social'

export default function AboutPage() {
  return (
    <>
      <section className="relative px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Intelligence Evolution</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">We build the systems<br />that build the future.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-[#5D001E]/65">
              Xevaro Labs exists on one conviction: every manual business operation can become an
              autonomous system. We don&apos;t sell tools, we engineer living infrastructure that
              thinks, executes, and improves on its own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-6 pb-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#5D001E]/10 bg-white/60 md:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-white/70 p-8 text-center backdrop-blur-xl">
                  <div className="bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">{s.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-[#5D001E]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ['Deconstruct', 'We map operational complexity and break it into modular, automatable nodes.'],
            ['Optimize', 'We tune each node for velocity, reliability, and zero overhead.'],
            ['Automate', 'We reassemble everything into a self executing autonomous system.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#5D001E]/10 bg-white/55 p-8 backdrop-blur-xl">
                <span className="font-mono text-xs tracking-widest text-[#EE4C7C]">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-[#5D001E]/90">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5D001E]/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal><Eyebrow>System Evolution Timeline</Eyebrow></Reveal>
          <div className="mt-12 space-y-px">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="group flex gap-8 border-l border-[#5D001E]/15 py-7 pl-8 transition-colors hover:border-[#EE4C7C]/50">
                  <span className="font-mono text-sm text-[#EE4C7C]">{t.year}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#5D001E]/90">{t.title}</h3>
                    <p className="mt-1.5 text-sm text-[#5D001E]/60">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why teams choose us */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Why teams choose Xevaro</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">A partner, not a vendor.</H2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-[#5D001E]/10 bg-white/55 p-7">
                  <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#EE4C7C]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#5D001E]/90">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/60">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative px-6 pb-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="p-10 text-center md:p-14">
              <div className="flex justify-center gap-0.5 text-[#EE4C7C]">★★★★★</div>
              <p className="mt-6 font-display text-2xl font-light leading-relaxed text-[#5D001E]/85 md:text-3xl">
                “{TESTIMONIALS[0].quote}”
              </p>
              <div className="mt-6 text-sm text-[#5D001E]/60">
                {TESTIMONIALS[0].name} · {TESTIMONIALS[0].role}, {TESTIMONIALS[0].industry}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Build with the system.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Open a Control Channel</MagneticButton>
            <MagneticButton href="/agents" variant="ghost">Explore AI Agents →</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
