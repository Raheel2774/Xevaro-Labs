'use client'

import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'
import { TIMELINE } from '@/lib/os'

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
            <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/60">
              Xevaro Labs exists on one conviction: every manual business operation can become an
              autonomous system. We don&apos;t sell tools — we engineer living infrastructure that
              thinks, executes, and improves on its own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ['Deconstruct', 'We map operational complexity and break it into modular, automatable nodes.'],
            ['Optimize', 'We tune each node for velocity, reliability, and zero overhead.'],
            ['Automate', 'We reassemble everything into a self-executing autonomous system.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 backdrop-blur-xl">
                <span className="font-mono text-xs tracking-widest text-[#00D6FF]">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-white/90">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{d}</p>
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
                <div className="group flex gap-8 border-l border-white/10 py-7 pl-8 transition-colors hover:border-[#00D6FF]/50">
                  <span className="font-mono text-sm text-[#00D6FF]">{t.year}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white/90">{t.title}</h3>
                    <p className="mt-1.5 text-sm text-white/55">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Build with the system.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center"><MagneticButton href="/contact">Open a Control Channel</MagneticButton></div>
        </Reveal>
      </section>
    </>
  )
}
