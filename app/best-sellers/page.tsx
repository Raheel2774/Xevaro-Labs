'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Sparkles, Target, Calendar, Phone, Pencil,
  ArrowRight, Star, Check, Zap, TrendingUp,
} from 'lucide-react'
import { BEST_SELLERS, CONTACT } from '@/lib/os'
import { MagneticButton } from '@/components/os/ui'
import { BentoCard, Sticker, CountUp, Pop, Marquee } from '@/components/os/bento'

const ICONS: Record<string, typeof Users> = {
  users: Users, sparkles: Sparkles, target: Target,
  calendar: Calendar, phone: Phone, pencil: Pencil,
}

const EASE = [0.34, 1.56, 0.64, 1] as const

// bento sizing per rank for a varied, playful grid
const SPAN = [
  'md:col-span-4', 'md:col-span-2', 'md:col-span-3',
  'md:col-span-3', 'md:col-span-2', 'md:col-span-4',
]

export default function BestSellersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 md:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <Pop>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#5D001E] px-4 py-2 text-white">
              <Zap className="h-3.5 w-3.5 text-[#EE4C7C]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em]">The Best Selling Six</span>
            </div>
          </Pop>

          <div className="relative mt-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-[#5D001E] md:text-8xl"
            >
              Our{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] bg-clip-text text-transparent">best sellers</span>
                <motion.svg
                  viewBox="0 0 300 20" className="absolute -bottom-3 left-0 w-full"
                >
                  <motion.path d="M5 12 Q150 2 295 12" fill="none" stroke="#EE4C7C" strokeWidth="4" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }} />
                </motion.svg>
              </span>
              <br />that do the work.
            </motion.h1>

            {/* floating stickers */}
            <Sticker className="absolute -left-2 top-2 bg-[#EE4C7C] text-white md:left-16" rotate={-8}>
              <Star className="h-3.5 w-3.5 fill-white" /> Loved by 100+ teams
            </Sticker>
            <Sticker className="absolute -right-1 bottom-0 bg-[#E3AFBC] text-[#5D001E] md:right-20" rotate={7}>
              <TrendingUp className="h-3.5 w-3.5" /> 48 hour setup
            </Sticker>
          </div>

          <Pop delay={0.15}>
            <p className="mx-auto mt-10 max-w-2xl text-lg font-light text-[#5D001E]/70">
              These six products get deployed the most, and for good reason. Clear pricing,
              live in 48 hours, and built to pay for themselves fast.
            </p>
          </Pop>
          <Pop delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book a Free Audit</MagneticButton>
              <MagneticButton href="/agents" variant="ghost">Browse all agents</MagneticButton>
            </div>
          </Pop>
        </div>
      </section>

      {/* ── Bento grid of best sellers ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-6">
          {BEST_SELLERS.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Sparkles
            return (
              <div key={p.id} className={SPAN[i] ?? 'md:col-span-3'}>
                <BentoCard accent={p.accent} delay={i * 0.06} className="p-7">
                  <Link href={`/products/${p.id}`} className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${p.accent}, #EE4C7C)` }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-[#E3AFBC]/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#9A1750]">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold text-[#5D001E] transition-colors group-hover:text-[#9A1750]">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[#9A1750]/80">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5D001E]/60">{p.description}</p>

                    {/* stat chips */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stats.map(s => (
                        <span key={s.label} className="rounded-full bg-[#E3E2DF] px-3 py-1 text-xs font-semibold text-[#5D001E]">
                          <span className="text-[#EE4C7C]">{s.value}</span> {s.label}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#5D001E]/10 pt-5">
                      <div>
                        <span className="font-display text-2xl font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}</span>
                        <span className="text-sm text-[#5D001E]/55">/mo</span>
                        <div className="text-xs text-[#5D001E]/45">+ ${p.setupPrice.toLocaleString()} setup</div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5D001E] px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105">
                        View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </BentoCard>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="relative px-6 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 rounded-[32px] bg-[#5D001E] p-8 text-center md:grid-cols-4 md:p-12">
            {[
              { v: 100, s: '+', l: 'Systems deployed' },
              { v: 48, s: 'h', l: 'Average setup time' },
              { v: 95, s: '%', l: 'Client retention' },
              { v: 25, s: '+', l: 'Industries served' },
            ].map((m) => (
              <div key={m.l}>
                <div className="font-display text-4xl font-bold text-[#EE4C7C] md:text-6xl">
                  <CountUp value={m.v} suffix={m.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wide text-[#E3AFBC]/80">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why these win ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="text-center font-display text-3xl font-bold text-[#5D001E] md:text-5xl">Why teams pick these first</h2></Pop>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { t: 'Live in 48 hours', d: 'No long builds. We set it up, test it and hand you the keys within two days.' },
              { t: 'Clear flat pricing', d: 'Know exactly what you pay every month. No surprise usage bills, month to month.' },
              { t: 'Pays for itself', d: 'Each product is scoped to return more than it costs, usually within the first month.' },
            ].map((c, i) => (
              <BentoCard key={c.t} delay={i * 0.08} className="p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3AFBC]/50 text-[#9A1750]">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-[#5D001E]">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5D001E]/65">{c.d}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <section className="relative py-10">
        <Marquee
          className="font-display text-2xl font-bold text-[#5D001E]/25"
          items={['Deploy fast', '•', 'Automate everything', '•', 'Never miss a lead', '•', 'Scale without hiring', '•']}
        />
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <div className="mx-auto max-w-3xl">
          <Pop><h2 className="font-display text-4xl font-bold text-[#5D001E] md:text-6xl">Pick your best seller.</h2></Pop>
          <Pop delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-[#5D001E]/65">
              Tell us your biggest bottleneck and we will recommend the product that clears it fastest.
            </p>
          </Pop>
          <Pop delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book a Free Audit</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-[#5D001E]/60 transition-colors hover:text-[#EE4C7C]">{CONTACT.email}</a>
            </div>
          </Pop>
        </div>
      </section>
    </>
  )
}
