'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, ShieldCheck, Wrench, LineChart, Star, Quote } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, MagneticButton, H2, useGlow } from '@/components/os/ui'
import { PRODUCTS, CASE_STUDIES, CONTACT } from '@/lib/os'
import { FLAGSHIP_AGENTS, TOTAL_AGENTS } from '@/lib/agents'
import { TESTIMONIALS, INDUSTRIES_SERVED, PROCESS, PROMISES } from '@/lib/social'
import { POSTS } from '@/lib/blog'

const PROMISE_ICONS: Record<string, typeof Rocket> = { Rocket, ShieldCheck, Wrench, LineChart }

const EASE = [0.16, 1, 0.3, 1] as const

export default function Home() {
  const glow = useGlow()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D6FF] shadow-[0_0_10px_#00D6FF]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">Xevaro AI Operating System</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="mt-7 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white/90 md:text-7xl lg:text-[5.2rem] [text-shadow:0_2px_50px_rgba(0,0,0,0.6)]"
          >
            The living AI system<br />
            that <span className="bg-gradient-to-b from-white to-[#00D6FF] bg-clip-text text-transparent">runs your business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/55 md:text-xl"
          >
            Xevaro Labs deconstructs, optimizes, and automates enterprise operations into
            self-executing infrastructure — a network of AI agents, workflows, and data pipelines
            running in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact">Deploy Your System</MagneticButton>
            <MagneticButton href="/products" variant="ghost">Explore the Engine</MagneticButton>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll · System initializing
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            Deployed across 25+ industries worldwide
          </p>
          <div className="group relative mt-6 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
              {INDUSTRIES_SERVED.concat(INDUSTRIES_SERVED).map((name, i) => (
                <span key={i} className="whitespace-nowrap font-display text-lg font-medium text-white/40">{name}</span>
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
              {INDUSTRIES_SERVED.concat(INDUSTRIES_SERVED).map((name, i) => (
                <span key={i} className="whitespace-nowrap font-display text-lg font-medium text-white/40">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES STRIP ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>System Modules</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">Six productized AI systems.<br />One autonomous core.</H2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <Link href="/products" onMouseMove={glow}>
                  <GlassCard glow className="h-full p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-widest text-[#00D6FF]">{p.index}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">{p.integration}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">{p.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{p.function}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/40 transition-colors group-hover:text-[#00D6FF]">
                      View system <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Deployable AI Agents</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">
              {TOTAL_AGENTS} AI agents.{' '}
              <span className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] bg-clip-text text-transparent">25 industries.</span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-white/55">
              Pre-built AI agents that capture leads, book appointments, recover revenue and run support —
              tailored to your industry. Pick the one you need and we set it up for you.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FLAGSHIP_AGENTS.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.08}>
                <Link href="/best-sellers" onMouseMove={glow}>
                  <GlassCard glow className="flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0050FF] to-[#00D6FF] font-display text-sm font-bold text-white shadow-[0_0_18px_rgba(0,214,255,0.3)]">{a.rank}</span>
                      <span className="rounded-full border border-[#00D6FF]/30 bg-[#00D6FF]/5 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#00D6FF]">{a.badge}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">{a.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{a.tagline}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/40 transition-colors group-hover:text-[#00D6FF]">
                      View best seller <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/agents">Browse All AI Agents</MagneticButton>
              <MagneticButton href="/best-sellers" variant="ghost">See the Best Sellers →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-4">
              {[['100+', 'Workflows automated'], ['80%', 'Avg. ops time saved'], ['95%', 'Client retention'], ['$2M+', 'Revenue unlocked']].map(([v, l]) => (
                <div key={l} className="bg-[rgba(5,5,7,0.6)] p-8 text-center backdrop-blur-xl md:p-10">
                  <div className="bg-gradient-to-br from-white to-[#00D6FF] bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">{v}</div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-white/40">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">From audit to autonomous<br />in four steps.</H2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={(i % 4) * 0.08}>
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                  <span className="font-mono text-3xl font-bold text-[#00D6FF]/20">{p.step}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white/90">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <span className="absolute right-5 top-8 hidden text-white/15 lg:block">→</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE PREVIEW ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Proven in production</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Real systems. Real impact.</H2></Reveal>
          <div className="mt-14 divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.client} delay={i * 0.05}>
                <Link href="/case-studies" className="group flex items-center justify-between py-7">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-mono text-xs text-[#00D6FF]">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">{c.client}</h3>
                      <span className="text-sm text-white/40">{c.sector}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-br from-white to-[#00D6FF] bg-clip-text font-display text-2xl font-bold text-transparent md:text-4xl">{c.metric}</div>
                    <div className="text-xs uppercase tracking-wide text-white/30">{c.label}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>What clients say</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Results people feel.</H2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.08}>
                <div onMouseMove={glow} className="h-full">
                  <GlassCard glow className="flex h-full flex-col p-7">
                    <Quote className="h-6 w-6 text-[#00D6FF]/50" />
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/70">“{t.quote}”</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                      <div>
                        <div className="text-sm font-semibold text-white/85">{t.name}</div>
                        <div className="text-xs text-white/45">{t.role} · {t.industry}</div>
                      </div>
                      <span className="rounded-full border border-[#00D6FF]/30 bg-[#00D6FF]/5 px-3 py-1 font-mono text-[10px] text-[#00D6FF]">{t.result}</span>
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/45">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#00D6FF] text-[#00D6FF]" />
                ))}
              </span>
              <span>Rated 4.9/5 across client engagements</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GUARANTEE BAND ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0050FF]/[0.08] via-white/[0.02] to-transparent p-10 md:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00D6FF]/12 blur-3xl" />
              <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {PROMISES.map(({ icon, title, desc }) => {
                  const Icon = PROMISE_ICONS[icon] ?? Rocket
                  return (
                    <div key={title}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D6FF]/20 bg-[#00D6FF]/5 text-[#00D6FF]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="mt-4 font-display text-lg font-semibold text-white/90">{title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LATEST INSIGHTS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>From the blog</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Automation, explained.</H2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <Link href={`/blog/${p.slug}`} onMouseMove={glow}>
                  <GlassCard glow className="flex h-full flex-col p-7">
                    <span className="font-mono text-xs tracking-widest text-[#00D6FF]">{p.category}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{p.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/40 transition-colors group-hover:text-[#00D6FF]">Read article <span className="transition-transform group-hover:translate-x-1">→</span></span>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center"><MagneticButton href="/blog" variant="ghost">View all articles</MagneticButton></div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-32 text-center md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal><H2 className="text-5xl md:text-7xl">Bring your operations online.</H2></Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
              Your infrastructure, fully autonomous. Open a control channel and we&apos;ll architect your digital workforce.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book an Automation Audit</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-white/50 transition-colors hover:text-[#00D6FF]">{CONTACT.email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
