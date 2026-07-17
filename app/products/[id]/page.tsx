'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users, Sparkles, Target, Calendar, Phone, Pencil,
  Check, ArrowRight, Plug,
} from 'lucide-react'
import { MagneticButton } from '@/components/os/ui'
import { BentoCard, Sticker, Pop } from '@/components/os/bento'
import { PRODUCTS } from '@/lib/os'

const ICONS: Record<string, typeof Users> = {
  users: Users, sparkles: Sparkles, target: Target, calendar: Calendar, phone: Phone, pencil: Pencil,
}
const EASE = [0.34, 1.56, 0.64, 1] as const

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) notFound()

  const Icon = ICONS[product.icon] ?? Sparkles
  const others = PRODUCTS.filter(p => p.id !== id).slice(0, 3)
  const year1 = product.monthlyPrice * 12 + product.setupPrice

  return (
    <>
      {/* ── Hero (bento) ── */}
      <section className="relative px-6 pb-12 pt-28 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-[32px] bg-[#5D001E] p-8 md:p-12"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#EE4C7C]/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${product.accent}, #EE4C7C)` }}>
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E3AFBC]">Product {product.index}</span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">{product.name}</h1>
              <p className="mt-3 text-xl font-medium text-[#EE4C7C]">{product.tagline}</p>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#E3AFBC]/85">{product.longDescription}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="/contact">Get Started</MagneticButton>
                <MagneticButton href="/contact" variant="ghost" className="!border-white/25 !text-white hover:!border-white/60">Book a Demo</MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right: pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative flex flex-col justify-between rounded-[32px] border border-white/10 bg-white/75 p-8 shadow-[0_12px_44px_rgba(154,23,80,0.14)] backdrop-blur-xl"
          >
            <Sticker className="absolute -top-3 right-6 bg-[#EE4C7C] text-white" rotate={5}>{product.badge}</Sticker>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9A1750]/70">Pricing</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-[#EE4C7C]">${product.monthlyPrice.toLocaleString()}</span>
                <span className="text-[#F4E9EC]/60">/month</span>
              </div>
              <div className="mt-2 inline-block rounded-full bg-[#E3AFBC]/40 px-3 py-1 text-sm text-[#F4E9EC]/70">
                One time setup ${product.setupPrice.toLocaleString()}
              </div>
              <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                {[['Year 1 investment', `$${year1.toLocaleString()}`], ['Deployment', '48 hours'], ['Contract', 'Month to month']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-[#F4E9EC]/60">{k}</span>
                    <span className="font-bold text-[#F4E9EC]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <MagneticButton href="/contact" className="w-full">Get Started</MagneticButton>
              <p className="mt-4 text-center text-xs text-[#F4E9EC]/50">No long contracts. Cancel anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="relative px-6 py-8 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-3">
          {product.stats.map((s, i) => (
            <BentoCard key={s.label} delay={i * 0.08} className="p-8 text-center">
              <div className="font-display text-4xl font-bold text-[#EE4C7C] md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-wide text-[#F4E9EC]/55">{s.label}</div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-3xl font-bold text-[#F4E9EC] md:text-5xl">How it works</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.howItWorks.map((step, i) => (
              <BentoCard key={step.title} delay={i * 0.08} accent={product.accent} className="p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5D001E] font-display text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#F4E9EC]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F4E9EC]/65">{step.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features + Use cases ── */}
      <section className="relative px-6 py-8 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-2">
          <BentoCard className="p-8" accent={product.accent}>
            <h3 className="font-display text-2xl font-bold text-[#F4E9EC]">What you get</h3>
            <div className="mt-6 space-y-3">
              {product.features.map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3AFBC]/50 text-[#9A1750]"><Check className="h-4 w-4" /></span>
                  <span className="text-[#F4E9EC]/80">{f}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-[#E3AFBC]/25 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9A1750]/70">Outcome</div>
              <p className="mt-1.5 text-lg font-semibold text-[#F4E9EC]">{product.outcome}</p>
            </div>
          </BentoCard>

          <BentoCard className="p-8">
            <h3 className="font-display text-2xl font-bold text-[#F4E9EC]">Perfect for</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.useCases.map((u, i) => (
                <motion.span key={u} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.06, rotate: 2 }}
                  className="cursor-default rounded-full bg-[#5D001E] px-4 py-2 text-sm font-semibold text-white">{u}</motion.span>
              ))}
            </div>
            <h3 className="mt-10 flex items-center gap-2 font-display text-2xl font-bold text-[#F4E9EC]"><Plug className="h-5 w-5 text-[#EE4C7C]" /> Integrates with</h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {product.integrations.map((int, i) => (
                <motion.span key={int} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[#F4E9EC]/75">{int}</motion.span>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Pop><h2 className="font-display text-3xl font-bold text-[#F4E9EC] md:text-5xl">Questions, answered</h2></Pop>
          <div className="mt-8 space-y-4">
            {product.faq.map((f, i) => (
              <BentoCard key={f.q} delay={i * 0.06} tilt={false} className="p-6">
                <h3 className="font-display text-lg font-bold text-[#F4E9EC]">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F4E9EC]/65">{f.a}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other products ── */}
      <section className="relative border-t border-white/10 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-3xl font-bold text-[#F4E9EC] md:text-4xl">Pairs well with</h2></Pop>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {others.map((p, i) => {
              const OIcon = ICONS[p.icon] ?? Sparkles
              return (
                <BentoCard key={p.id} delay={i * 0.08} accent={p.accent} className="p-6">
                  <Link href={`/products/${p.id}`} className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${p.accent}, #EE4C7C)` }}><OIcon className="h-5 w-5" /></span>
                      <span className="font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}/mo</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#F4E9EC] group-hover:text-[#9A1750]">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-[#F4E9EC]/60">{p.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4E9EC] group-hover:text-[#EE4C7C]">View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </BentoCard>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
