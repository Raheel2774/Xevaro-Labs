'use client'

import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { PRODUCTS } from '@/lib/os'

export default function ServicesPage() {
  const glow = useGlow()
  return (
    <>
      <section className="relative px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>AI Modules View</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">Automation systems,<br />deployed as modules.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-white/55">
              Every Xevaro capability is a self-contained module that plugs into the core —
              executing workflows, conversations, and decisions without human intervention.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <div onMouseMove={glow}>
                <GlassCard glow className="h-full p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-[#00D6FF]">{p.index}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">{p.integration}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white/90 md:text-3xl">{p.name}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/55">{p.function}</p>

                  <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {p.includes.map(inc => (
                      <li key={inc} className="flex items-center gap-2 text-sm text-white/50">
                        <span className="h-1 w-1 rounded-full bg-[#0050FF]" />{inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">Outcome</div>
                    <p className="mt-1.5 text-sm text-white/70">{p.outcome}</p>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Compose your automation stack.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center"><MagneticButton href="/contact">Request a Module Map</MagneticButton></div>
        </Reveal>
      </section>
    </>
  )
}
