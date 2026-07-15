'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, ShieldCheck, Wrench, LineChart, Star, Quote } from 'lucide-react'
import { Reveal, Eyebrow, GlassCard, MagneticButton, H2, useGlow } from '@/components/os/ui'
import { ProductCard } from '@/components/os/ProductCard'
import OrganicRobot from '@/components/os/OrganicRobot'
import { PRODUCTS, CASE_STUDIES, CONTACT } from '@/lib/os'
import { FLAGSHIP_AGENTS, TOTAL_AGENTS } from '@/lib/agents'
import { TESTIMONIALS, INDUSTRIES_SERVED, PROCESS, PROMISES } from '@/lib/social'
import ProofStrip from '@/components/sections/ProofStrip'
import { POSTS } from '@/lib/blog'

const PROMISE_ICONS: Record<string, typeof Rocket> = { Rocket, ShieldCheck, Wrench, LineChart }

const EASE = [0.34, 1.56, 0.64, 1] as const

export default function Home() {
  const glow = useGlow()

  return (
    <>
      {/* ── HERO: split layout, organic robot ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#9A1750]/20 bg-white/50 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#EE4C7C]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#9A1750]">Xevaro AI Operating System</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight text-[#5D001E] md:text-6xl lg:text-[4.6rem]"
            >
              The living AI system<br />
              that <span className="bg-gradient-to-r from-[#9A1750] via-[#EE4C7C] to-[#9A1750] bg-clip-text text-transparent">runs your business.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-[#5D001E]/70 md:text-xl lg:mx-0"
            >
              Xevaro Labs turns manual operations into self running systems, a network of AI agents,
              automations and data pipelines that capture leads, book work and run support around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: EASE }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
              <MagneticButton href="/agents" variant="ghost">Explore AI Agents</MagneticButton>
            </motion.div>

            {/* Instant credibility */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#EE4C7C] text-[#EE4C7C]" />
                  ))}
                </span>
                <span className="text-sm text-[#5D001E]/60">Rated 4.9/5</span>
              </div>
              <span className="hidden h-4 w-px bg-[#5D001E]/15 sm:block" />
              <span className="text-sm text-[#5D001E]/60">100+ systems deployed across 25+ industries</span>
            </motion.div>
          </div>

          {/* Right: organic robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            className="mx-auto w-full max-w-[380px] lg:max-w-[440px]"
          >
            <OrganicRobot className="aspect-[400/480] w-full" />
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#9A1750]/50">
          Scroll · System initializing
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="relative border-y border-[#5D001E]/10 bg-white/40 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#9A1750]/60">
            Deployed across 25+ industries worldwide
          </p>
          <div className="group relative mt-6 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
              {INDUSTRIES_SERVED.concat(INDUSTRIES_SERVED).map((name, i) => (
                <span key={i} className="whitespace-nowrap font-display text-lg font-medium text-[#5D001E]/40">{name}</span>
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
              {INDUSTRIES_SERVED.concat(INDUSTRIES_SERVED).map((name, i) => (
                <span key={i} className="whitespace-nowrap font-display text-lg font-medium text-[#5D001E]/40">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 MAIN PRODUCTS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Core Products</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">Six AI agents that work<br />like your full time team.</H2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.08} onMouseMove={glow} />
            ))}
          </div>

          {/* Quick CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-[#5D001E]/65 mb-6">
              Ready to automate? Start with a free consultation.
            </p>
            <MagneticButton href="/contact">Schedule Demo</MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Deployable AI Agents</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">
              {TOTAL_AGENTS} AI agents.{' '}
              <span className="bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] bg-clip-text text-transparent">25 industries.</span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-[#5D001E]/65">
              Prebuilt AI agents that capture leads, book appointments, recover revenue and run support,
              tailored to your industry. Pick the one you need and we set it up for you.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FLAGSHIP_AGENTS.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.08}>
                <Link href="/best-sellers" onMouseMove={glow}>
                  <GlassCard glow className="flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] font-display text-sm font-bold text-white shadow-[0_4px_14px_rgba(238,76,124,0.35)]">{a.rank}</span>
                      <span className="rounded-full border border-[#EE4C7C]/30 bg-[#E3AFBC]/30 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#9A1750]">{a.badge}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-[#5D001E] transition-transform duration-300 group-hover:translate-x-1">{a.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5D001E]/60">{a.tagline}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#5D001E]/50 transition-colors group-hover:text-[#EE4C7C]">
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
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-[#5D001E]/10 bg-[#5D001E]/10 shadow-[0_8px_36px_rgba(93,0,30,0.08)] md:grid-cols-4">
              {[['100+', 'Workflows automated'], ['80%', 'Avg. ops time saved'], ['95%', 'Client retention'], ['$2M+', 'Revenue unlocked']].map(([v, l]) => (
                <div key={l} className="bg-white/70 p-8 text-center backdrop-blur-xl md:p-10">
                  <div className="bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">{v}</div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-[#5D001E]/55">{l}</div>
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
                <div className="relative h-full rounded-[28px] border border-[#5D001E]/10 bg-white/60 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(154,23,80,0.14)]">
                  <span className="font-mono text-3xl font-bold text-[#EE4C7C]/30">{p.step}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#5D001E]">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5D001E]/65">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <span className="absolute right-5 top-8 hidden text-[#9A1750]/25 lg:block">→</span>
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
          <div className="mt-14 divide-y divide-[#5D001E]/10 border-t border-[#5D001E]/10">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.client} delay={i * 0.05}>
                <Link href="/case-studies" className="group flex items-center justify-between py-7">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-mono text-xs text-[#EE4C7C]">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#5D001E] transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">{c.client}</h3>
                      <span className="text-sm text-[#5D001E]/50">{c.sector}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-2xl font-bold text-transparent md:text-4xl">{c.metric}</div>
                    <div className="text-xs uppercase tracking-wide text-[#5D001E]/45">{c.label}</div>
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
                    <Quote className="h-6 w-6 text-[#EE4C7C]/60" />
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#5D001E]/75">“{t.quote}”</p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#5D001E]/10 pt-5">
                      <div>
                        <div className="text-sm font-semibold text-[#5D001E]">{t.name}</div>
                        <div className="text-xs text-[#5D001E]/55">{t.role} · {t.industry}</div>
                      </div>
                      <span className="rounded-full border border-[#EE4C7C]/30 bg-[#E3AFBC]/30 px-3 py-1 font-mono text-[10px] text-[#9A1750]">{t.result}</span>
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#5D001E]/55">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#EE4C7C] text-[#EE4C7C]" />
                ))}
              </span>
              <span>Rated 4.9/5 across client engagements</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/testimonials" variant="ghost">Read More Stories →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GUARANTEE BAND ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-[#9A1750]/15 bg-gradient-to-br from-[#E3AFBC]/40 via-white/60 to-transparent p-10 backdrop-blur-sm md:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#EE4C7C]/15 blur-3xl" />
              <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {PROMISES.map(({ icon, title, desc }) => {
                  const Icon = PROMISE_ICONS[icon] ?? Rocket
                  return (
                    <div key={title}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EE4C7C]/25 bg-white/70 text-[#EE4C7C]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="mt-4 font-display text-lg font-semibold text-[#5D001E]">{title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/65">{desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <ProofStrip />

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
                    <span className="font-mono text-xs tracking-widest text-[#EE4C7C]">{p.category}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-[#5D001E] transition-transform duration-300 group-hover:translate-x-1">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5D001E]/60">{p.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#5D001E]/50 transition-colors group-hover:text-[#EE4C7C]">Read article <span className="transition-transform group-hover:translate-x-1">→</span></span>
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
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-[#5D001E]/65">
              Your infrastructure, fully autonomous. Open a control channel and we&apos;ll architect your digital workforce.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book an Automation Audit</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-[#5D001E]/60 transition-colors hover:text-[#EE4C7C]">{CONTACT.email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
