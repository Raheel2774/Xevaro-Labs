'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Eyebrow, GlassCard, H2, MagneticButton, useGlow } from '@/components/os/ui'
import { PRODUCTS } from '@/lib/os'
import { TOTAL_AGENTS } from '@/lib/agents'
import { TRUST_STATS } from '@/lib/social'

export default function ProductsPage() {
  const [active, setActive] = useState(PRODUCTS[0].id)
  const glow = useGlow()
  const current = PRODUCTS.find(p => p.id === active)!

  return (
    <>
      <section className="relative px-6 pb-16 pt-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Catalog Engine</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">The Xevaro<br />product network.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-white/55">
              Connected nodes in one AI network. Select a system to inspect its function,
              outcome, and integration level.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-[rgba(5,5,7,0.6)] p-6 text-center backdrop-blur-xl">
                  <div className="bg-gradient-to-br from-white to-[#E53E3E] bg-clip-text font-display text-2xl font-bold text-transparent md:text-3xl">{s.value}</div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-wide text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 pb-20 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Node selector */}
          <div className="flex flex-col gap-2.5">
            {PRODUCTS.map(p => {
              const on = p.id === active
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                    on ? 'border-[#E53E3E]/50 bg-[#E53E3E]/[0.06] shadow-[0_0_24px_rgba(229,62,62,0.12)]' : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`h-2 w-2 rounded-full ${on ? 'bg-[#E53E3E] shadow-[0_0_10px_#E53E3E]' : 'bg-white/20'}`} />
                    <span className="font-mono text-[11px] tracking-widest text-white/40">{p.index}</span>
                    <span className={`font-display text-[15px] font-medium ${on ? 'text-white' : 'text-white/70'}`}>{p.name}</span>
                  </div>
                  <span className={`text-sm transition-transform ${on ? 'text-[#E53E3E] translate-x-0' : 'text-white/30 -translate-x-1 group-hover:translate-x-0'}`}>→</span>
                </button>
              )
            })}
          </div>

          {/* Holographic detail card */}
          <div onMouseMove={glow}>
            <GlassCard glow className="h-full p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-[#E53E3E]">{current.index}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">{current.integration}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-bold text-white/90 md:text-4xl">{current.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/55">{current.function}</p>

                  <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/35">System includes</div>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {current.includes.map(inc => (
                      <li key={inc} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="h-1 w-1 rounded-full bg-[#7F1D1D]" />{inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl border border-[#E53E3E]/20 bg-[#E53E3E]/[0.04] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#E53E3E]/80">Outcome</div>
                    <p className="mt-1.5 text-[15px] text-white/80">{current.outcome}</p>
                  </div>

                  <div className="mt-8"><MagneticButton href="/contact">Deploy {current.index}</MagneticButton></div>
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── Agents cross link ── */}
      <section className="relative px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#E53E3E]/20 bg-gradient-to-br from-[#7F1D1D]/[0.08] via-white/[0.02] to-transparent p-8 md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#7F1D1D]/20 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="max-w-xl font-display text-2xl font-semibold text-white/90 md:text-3xl">
                    Prefer a ready made agent?
                  </h3>
                  <p className="mt-3 max-w-lg text-sm text-white/55">
                    Explore {TOTAL_AGENTS} deployable AI agents across 25 industries, then pick the one you want and we set it up for you.
                  </p>
                </div>
                <MagneticButton href="/agents">Browse AI Agents</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <Reveal><H2 className="text-4xl md:text-6xl">Deploy a system that pays for itself.</H2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
            <MagneticButton href="/pricing" variant="ghost">See Pricing →</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
