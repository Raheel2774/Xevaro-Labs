'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Sparkles, Target, Calendar, Phone, Pencil,
  Star, ArrowRight, Quote, Rocket, ShieldCheck, Wrench, LineChart, Zap,
} from 'lucide-react'
import { MagneticButton } from '@/components/os/ui'
import { BentoCard, Sticker, CountUp, Pop, Marquee } from '@/components/os/bento'
import OrganicRobot from '@/components/os/OrganicRobot'
import { PRODUCTS, CASE_STUDIES, CONTACT } from '@/lib/os'
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
      {/* ── HERO (bento) ── */}
      <section className="relative px-6 pb-10 pt-28 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-6">
          {/* Big headline cell */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-[32px] bg-[#5D001E] p-8 md:col-span-4 md:p-12"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#EE4C7C]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#9A1750]/40 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#EE4C7C]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E3AFBC]">Xevaro AI Operating System</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
                The living AI system that{' '}
                <span className="bg-gradient-to-r from-[#EE4C7C] to-[#E3AFBC] bg-clip-text text-transparent">runs your business.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-[#E3AFBC]/85">
                A network of AI agents, automations and data pipelines that capture leads,
                book work and run support around the clock.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="/contact">Book a Free Automation Audit</MagneticButton>
                <MagneticButton href="/agents" variant="ghost" className="!border-white/25 !text-white hover:!border-white/60">Explore AI Agents</MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Robot cell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative flex items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#E3AFBC]/60 to-white/60 p-6 md:col-span-2"
          >
            <Sticker className="absolute right-4 top-4 z-10 bg-white text-[#5D001E]" rotate={8}>
              <Zap className="h-3 w-3 text-[#EE4C7C]" /> Always on
            </Sticker>
            <OrganicRobot className="aspect-[400/480] w-full max-w-[240px]" />
          </motion.div>

          {/* Stat cells */}
          {[
            { v: 100, s: '+', l: 'Systems deployed', bg: 'bg-white/70', fg: 'text-[#EE4C7C]', sub: 'text-[#5D001E]/55' },
            { v: 75, s: '', l: 'AI agents ready', bg: 'bg-[#EE4C7C]', fg: 'text-white', sub: 'text-white/80' },
            { v: 25, s: '+', l: 'Industries served', bg: 'bg-[#E3AFBC]/50', fg: 'text-[#9A1750]', sub: 'text-[#5D001E]/60' },
            { v: 48, s: 'h', l: 'Average setup', bg: 'bg-white/70', fg: 'text-[#9A1750]', sub: 'text-[#5D001E]/55' },
          ].map((m, i) => (
            <motion.div
              key={m.l}
              initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
              whileHover={{ y: -5 }}
              className={`flex flex-col justify-center rounded-[24px] p-6 shadow-[0_6px_24px_rgba(93,0,30,0.07)] md:col-span-3 lg:col-span-1 ${m.bg}`}
            >
              <div className={`font-display text-4xl font-bold ${m.fg}`}><CountUp value={m.v} suffix={m.s} /></div>
              <div className={`mt-1 text-xs uppercase tracking-wide ${m.sub}`}>{m.l}</div>
            </motion.div>
          ))}
          {/* rating cell */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="flex items-center gap-3 rounded-[24px] bg-white/70 p-6 shadow-[0_6px_24px_rgba(93,0,30,0.07)] md:col-span-6 lg:col-span-2"
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#EE4C7C] text-[#EE4C7C]" />)}
            </span>
            <span className="text-sm font-medium text-[#5D001E]/70">Rated 4.9/5 across client engagements</span>
          </motion.div>
        </div>
      </section>

      {/* ── Trust marquee ── */}
      <section className="relative py-8">
        <Marquee
          className="whitespace-nowrap font-display text-lg font-medium text-[#5D001E]/35"
          items={INDUSTRIES_SERVED.flatMap(n => [n, <span key={n + '-dot'} className="text-[#EE4C7C]">•</span>])}
        />
      </section>

      {/* ── PRODUCTS bento ── */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop>
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EE4C7C]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#9A1750]/70">Core Products</span>
            </div>
          </Pop>
          <Pop delay={0.05}>
            <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-[#5D001E] md:text-6xl">
              Six AI agents that work like your full time team.
            </h2>
          </Pop>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
            {PRODUCTS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.icon] ?? Sparkles
              return (
                <div key={p.id} className={PSPAN[i] ?? 'md:col-span-2'}>
                  <BentoCard accent={p.accent} delay={i * 0.05} className="p-7">
                    <Link href={`/products/${p.id}`} className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${p.accent}, #EE4C7C)` }}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="font-display text-xl font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}<span className="text-sm text-[#5D001E]/50">/mo</span></span>
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-bold text-[#5D001E] transition-colors group-hover:text-[#9A1750]">{p.name}</h3>
                      <p className="mt-2 text-sm font-medium text-[#9A1750]/80">{p.tagline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5D001E]/60">{p.description}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5D001E] transition-colors group-hover:text-[#EE4C7C]">
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
            <div className="relative overflow-hidden rounded-[36px] bg-[#5D001E] p-10 md:p-16">
              <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#EE4C7C]/25 blur-3xl" />
              <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div>
                  <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
                    {TOTAL_AGENTS} AI agents.{' '}
                    <span className="bg-gradient-to-r from-[#EE4C7C] to-[#E3AFBC] bg-clip-text text-transparent">25 industries.</span>
                  </h2>
                  <p className="mt-5 max-w-md text-lg font-light text-[#E3AFBC]/85">
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
          <Pop><h2 className="font-display text-4xl font-bold text-[#5D001E] md:text-6xl">From audit to autonomous in four steps.</h2></Pop>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <BentoCard key={p.step} delay={i * 0.08} className="p-7">
                <span className="font-display text-4xl font-bold text-[#EE4C7C]/30">{p.step}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#5D001E]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#5D001E]/65">{p.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#5D001E] md:text-6xl">Real systems. Real impact.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((c, i) => (
              <BentoCard key={c.client} delay={(i % 2) * 0.08} accent="#9A1750" className="p-8">
                <Link href="/case-studies" className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#5D001E] transition-transform group-hover:translate-x-1 md:text-3xl">{c.client}</h3>
                    <span className="text-sm text-[#5D001E]/50">{c.sector}</span>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] bg-clip-text font-display text-3xl font-bold text-transparent md:text-5xl">{c.metric}</div>
                    <div className="text-xs uppercase tracking-wide text-[#5D001E]/45">{c.label}</div>
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
          <Pop><h2 className="font-display text-4xl font-bold text-[#5D001E] md:text-6xl">Results people feel.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <BentoCard key={t.name} delay={(i % 3) * 0.08} className="flex flex-col p-7">
                <Quote className="h-6 w-6 text-[#EE4C7C]/60" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#5D001E]/75">“{t.quote}”</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#5D001E]/10 pt-5">
                  <div>
                    <div className="text-sm font-semibold text-[#5D001E]">{t.name}</div>
                    <div className="text-xs text-[#5D001E]/55">{t.role} · {t.industry}</div>
                  </div>
                  <span className="rounded-full bg-[#E3AFBC]/40 px-3 py-1 font-mono text-[10px] text-[#9A1750]">{t.result}</span>
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
            <div className="grid grid-cols-1 gap-8 rounded-[36px] bg-gradient-to-br from-[#E3AFBC]/50 via-white/60 to-white/40 p-10 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 md:p-14">
              {PROMISES.map(({ icon, title, desc }) => {
                const Icon = PROMISE_ICONS[icon] ?? Rocket
                return (
                  <div key={title}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#EE4C7C]"><Icon className="h-5 w-5" /></span>
                    <h4 className="mt-4 font-display text-lg font-bold text-[#5D001E]">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/65">{desc}</p>
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
          <Pop><h2 className="font-display text-4xl font-bold text-[#5D001E] md:text-6xl">Automation, explained.</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3).map((p, i) => (
              <BentoCard key={p.slug} delay={(i % 3) * 0.08} className="flex flex-col p-7">
                <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                  <span className="font-mono text-xs tracking-widest text-[#EE4C7C]">{p.category}</span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#5D001E] transition-transform group-hover:translate-x-1">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5D001E]/60">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#5D001E]/60 transition-colors group-hover:text-[#EE4C7C]">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[40px] bg-[#5D001E] p-10 text-center md:p-20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#EE4C7C]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[#9A1750]/40 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold text-white md:text-7xl">Bring your operations online.</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg font-light text-[#E3AFBC]/85">
                Open a control channel and we will architect your digital workforce.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton href="/contact">Book an Automation Audit</MagneticButton>
                <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-[#E3AFBC]/80 transition-colors hover:text-white">{CONTACT.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
