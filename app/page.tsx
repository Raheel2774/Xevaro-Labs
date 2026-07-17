'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Sparkles, Target, Calendar, Phone, Pencil,
  ArrowRight, Quote, Rocket, ShieldCheck, Wrench, LineChart,
} from 'lucide-react'
import { MagneticButton } from '@/components/os/ui'
import { BentoCard, CountUp, Pop, Marquee } from '@/components/os/bento'
import { BEST_SELLERS, CASE_STUDIES, CONTACT } from '@/lib/os'
import { TOTAL_AGENTS } from '@/lib/agents'
import { TESTIMONIALS, INDUSTRIES_SERVED, PROCESS, PROMISES } from '@/lib/social'
import ProofStrip from '@/components/sections/ProofStrip'
import { POSTS } from '@/lib/blog'

const PROMISE_ICONS: Record<string, typeof Rocket> = { Rocket, ShieldCheck, Wrench, LineChart }
const PRODUCT_ICONS: Record<string, typeof Users> = {
  users: Users, sparkles: Sparkles, target: Target, calendar: Calendar, phone: Phone, pencil: Pencil,
}
const EASE = [0.34, 1.56, 0.64, 1] as const
const PSPAN = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-6']

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative -mt-16 min-h-screen overflow-hidden bg-black">
        {/* Giant background wordmark */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <span className="select-none whitespace-nowrap font-display text-[26vw] font-bold leading-none tracking-tighter text-white/20">
            Xevaro Labs
          </span>
        </div>

        {/* Scrims */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="pointer-events-none absolute -left-24 bottom-10 z-[2] h-[420px] w-[420px] rounded-full bg-[#B41D24]/18 blur-[120px]" />

        {/* Hero copy, anchored lower */}
        <div className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#B41D24]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E2A5A5]">Xevaro AI Operating System</span>
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
              The living AI system that{' '}
              <span className="text-white">runs your business.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-[#E2A5A5]/90">
              A network of AI agents, automations and data pipelines that capture leads,
              book work and run support around the clock.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
              <MagneticButton href="/agents" variant="ghost" className="!border-white/25 !text-white hover:!border-white/60">Explore AI Agents</MagneticButton>
            </div>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span>⭐ Rated 4.9/5</span>
              <span className="hidden h-4 w-px bg-white/[0.03] sm:block" />
              <span>100+ systems deployed across 25+ industries</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust marquee ── */}
      <section className="relative py-8">
        <Marquee
          className="whitespace-nowrap font-display text-lg font-medium text-[#FFFFFF]/35"
          items={INDUSTRIES_SERVED.flatMap(n => [n, <span key={n + '-dot'} className="text-[#B41D24]">•</span>])}
        />
      </section>

      {/* ── PRODUCTS bento ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop>
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B41D24]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#7C1418]/70">Core Products</span>
            </div>
          </Pop>
          <Pop delay={0.05}>
            <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-[#FFFFFF] md:text-6xl">
              Six AI agents that work like your full time team.
            </h2>
          </Pop>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
            {BEST_SELLERS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.icon] ?? Sparkles
              return (
                <div key={p.id} className={PSPAN[i] ?? 'md:col-span-2'}>
                  <BentoCard accent={p.accent} delay={i * 0.05} className="p-7">
                    <Link href={`/products/${p.id}`} className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${p.accent}, #B41D24)` }}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="font-display text-xl font-bold text-[#B41D24]">${p.monthlyPrice.toLocaleString()}<span className="text-sm text-[#FFFFFF]/50">/mo</span></span>
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-bold text-[#FFFFFF] transition-colors group-hover:text-[#7C1418]">{p.name}</h3>
                      <p className="mt-2 text-sm font-medium text-[#7C1418]/80">{p.tagline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#FFFFFF]/60">{p.description}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFFFFF] transition-colors group-hover:text-[#B41D24]">
                        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </BentoCard>
                </div>
              )
            })}
          </div>

          <Pop delay={0.2}>
            <div className="mt-12 text-center">
              <MagneticButton href="/best-sellers">See the best sellers</MagneticButton>
            </div>
          </Pop>
        </div>
      </section>

      {/* ── Agents teaser (big bento) ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop>
            <div className="relative overflow-hidden rounded-[36px] bg-black p-10 md:p-16">
              <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#B41D24]/25 blur-3xl" />
              <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div>
                  <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
                    {TOTAL_AGENTS} AI agents.{' '}
                    <span className="text-white">25 industries.</span>
                  </h2>
                  <p className="mt-5 max-w-md text-lg font-light text-[#E2A5A5]/85">
                    Prebuilt agents that capture leads, book appointments and run support,
                    tailored to your industry. Pick one, we set it up.
                  </p>
                  <div className="mt-8">
                    <MagneticButton href="/agents">Browse all agents</MagneticButton>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Cleaning', 'HVAC', 'Roofing', 'Dental', 'Med Spas', 'Real Estate', 'Legal', 'Fitness', 'Auto Repair', 'Restaurants', 'Insurance', 'SaaS'].map((n, i) => (
                    <motion.span
                      key={n}
                      initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.04, ...{ type: 'spring', stiffness: 260, damping: 18 } }}
                      whileHover={{ scale: 1.08, rotate: 2 }}
                      className="cursor-default rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                    >
                      {n}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Pop>
        </div>
      </section>

      {/* ── Process bento ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#FFFFFF] md:text-6xl">From audit to autonomous in four steps.</h2></Pop>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <BentoCard key={p.step} delay={i * 0.08} className="p-7">
                <span className="font-display text-4xl font-bold text-[#B41D24]/30">{p.step}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#FFFFFF]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#FFFFFF]/65">{p.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#FFFFFF] md:text-6xl">Real systems. Real impact.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((c, i) => (
              <BentoCard key={c.client} delay={(i % 2) * 0.08} accent="#7C1418" className="p-8">
                <Link href="/case-studies" className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#FFFFFF] transition-transform group-hover:translate-x-1 md:text-3xl">{c.client}</h3>
                    <span className="text-sm text-[#FFFFFF]/50">{c.sector}</span>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-br from-[#7C1418] to-[#B41D24] bg-clip-text font-display text-3xl font-bold text-transparent md:text-5xl">{c.metric}</div>
                    <div className="text-xs uppercase tracking-wide text-[#FFFFFF]/45">{c.label}</div>
                  </div>
                </Link>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials bento ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#FFFFFF] md:text-6xl">Results people feel.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <BentoCard key={t.name} delay={(i % 3) * 0.08} className="flex flex-col p-7">
                <Quote className="h-6 w-6 text-[#B41D24]/60" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#FFFFFF]/75">“{t.quote}”</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <div className="text-sm font-semibold text-[#FFFFFF]">{t.name}</div>
                    <div className="text-xs text-[#FFFFFF]/55">{t.role} · {t.industry}</div>
                  </div>
                  <span className="rounded-full bg-[#E2A5A5]/40 px-3 py-1 font-mono text-[10px] text-[#7C1418]">{t.result}</span>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee band ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop>
            <div className="grid grid-cols-1 gap-8 rounded-[36px] bg-gradient-to-br from-white/[0.06] via-white/60 to-white/40 p-10 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 md:p-14">
              {PROMISES.map(({ icon, title, desc }) => {
                const Icon = PROMISE_ICONS[icon] ?? Rocket
                return (
                  <div key={title}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.07] text-[#B41D24]"><Icon className="h-5 w-5" /></span>
                    <h4 className="mt-4 font-display text-lg font-bold text-[#FFFFFF]">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#FFFFFF]/65">{desc}</p>
                  </div>
                )
              })}
            </div>
          </Pop>
        </div>
      </section>

      <ProofStrip />

      {/* ── Blog ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#FFFFFF] md:text-6xl">Automation, explained.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3).map((p, i) => (
              <BentoCard key={p.slug} delay={(i % 3) * 0.08} className="flex flex-col p-7">
                <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                  <span className="font-mono text-xs tracking-widest text-[#B41D24]">{p.category}</span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#FFFFFF] transition-transform group-hover:translate-x-1">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#FFFFFF]/60">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FFFFFF]/60 transition-colors group-hover:text-[#B41D24]">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[40px] bg-black p-10 text-center md:p-20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#B41D24]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[#7C1418]/40 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold text-white md:text-7xl">Bring your operations online.</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg font-light text-[#E2A5A5]/85">
                Open a control channel and we will architect your digital workforce.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton href="/contact">Book an Automation Audit</MagneticButton>
                <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-[#E2A5A5]/80 transition-colors hover:text-white">{CONTACT.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
