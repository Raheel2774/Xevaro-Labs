'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'
import { PRODUCTS } from '@/lib/os'

const EASE = [0.34, 1.56, 0.64, 1] as const

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) notFound()

  const others = PRODUCTS.filter(p => p.id !== id).slice(0, 3)
  const year1 = product.monthlyPrice * 12 + product.setupPrice

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-36 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal><Eyebrow>Product {product.index}</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <H2 className="text-4xl md:text-6xl">{product.name}</H2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-xl font-medium text-[#9A1750]">{product.tagline}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#5D001E]/70">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 space-y-3">
                {product.features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E3AFBC]/50 text-[#9A1750]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-[#5D001E]/80">{f}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 rounded-[24px] border border-[#9A1750]/15 bg-[#E3AFBC]/25 p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#9A1750]/70">Outcome</div>
                <p className="mt-2 text-lg font-semibold text-[#5D001E]">{product.outcome}</p>
              </div>
            </Reveal>
          </div>

          {/* Pricing card */}
          <Reveal delay={0.2}>
            <div className="sticky top-28 rounded-[28px] border border-[#5D001E]/10 bg-white/70 p-8 shadow-[0_12px_44px_rgba(154,23,80,0.14)] backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9A1750]/70">Pricing</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-[#EE4C7C]">${product.monthlyPrice.toLocaleString()}</span>
                <span className="text-[#5D001E]/60">/month</span>
              </div>
              <div className="mt-2 inline-block rounded-full bg-[#E3AFBC]/40 px-3 py-1 text-sm text-[#5D001E]/70">
                One time setup: ${product.setupPrice.toLocaleString()}
              </div>

              <div className="mt-6 border-t border-[#5D001E]/10 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5D001E]/60">Year 1 investment</span>
                  <span className="font-bold text-[#5D001E]">${year1.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-[#5D001E]/60">Deployment</span>
                  <span className="font-bold text-[#5D001E]">48 hours</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-[#5D001E]/60">Contract</span>
                  <span className="font-bold text-[#5D001E]">Month to month</span>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <MagneticButton href="/contact" className="w-full">Get Started</MagneticButton>
                <MagneticButton href="/contact" variant="ghost" className="w-full">Book a Demo</MagneticButton>
              </div>

              <p className="mt-5 text-center text-xs text-[#5D001E]/50">
                No long contracts. Cancel anytime.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other products */}
      <section className="relative border-t border-[#5D001E]/10 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Pairs well with</Eyebrow></Reveal>
          <Reveal delay={0.05}><H2 className="text-3xl md:text-4xl">Combine products, compound results.</H2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link href={`/products/${p.id}`}>
                  <div className="group h-full rounded-[24px] border border-[#5D001E]/10 bg-white/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#EE4C7C]/40 hover:shadow-[0_16px_44px_rgba(154,23,80,0.14)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#9A1750]">{p.index}</span>
                      <span className="font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}/mo</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#5D001E] group-hover:text-[#9A1750]">{p.name}</h3>
                    <p className="mt-2 text-sm text-[#5D001E]/60">{p.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
