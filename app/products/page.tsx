'use client'

import Link from 'next/link'
import {
  Users, Sparkles, Target, Calendar, Phone, Pencil, ArrowRight,
} from 'lucide-react'
import { PRODUCTS } from '@/lib/os'
import { MagneticButton } from '@/components/os/ui'
import { BentoCard, Pop } from '@/components/os/bento'

const ICONS: Record<string, typeof Users> = {
  users: Users, sparkles: Sparkles, target: Target, calendar: Calendar, phone: Phone, pencil: Pencil,
}
const SPAN = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-6']

export default function ProductsPage() {
  return (
    <>
      <section className="relative px-6 pb-8 pt-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop>
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EE4C7C]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#9A1750]/70">Product Catalog</span>
            </div>
          </Pop>
          <Pop delay={0.05}>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-[#F4E9EC] md:text-6xl">
              Six AI automation products. One unified platform.
            </h1>
          </Pop>
          <Pop delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#F4E9EC]/65">
              Start with one product or combine them into a complete automation platform.
              Deploy in 48 hours. Scale as you grow.
            </p>
          </Pop>
        </div>
      </section>

      {/* Products bento grid */}
      <section className="relative px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-6">
          {PRODUCTS.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Sparkles
            return (
              <div key={p.id} className={SPAN[i] ?? 'md:col-span-2'}>
                <BentoCard accent={p.accent} delay={i * 0.05} className="p-7">
                  <Link href={`/products/${p.id}`} className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${p.accent}, #EE4C7C)` }}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-xl font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}<span className="text-sm text-[#F4E9EC]/50">/mo</span></span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-[#F4E9EC] transition-colors group-hover:text-[#9A1750]">{p.name}</h3>
                    <p className="mt-2 text-sm font-medium text-[#9A1750]/80">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#F4E9EC]/60">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stats.slice(0, 3).map(s => (
                        <span key={s.label} className="rounded-full bg-[#120207] px-3 py-1 text-xs font-semibold text-[#F4E9EC]"><span className="text-[#EE4C7C]">{s.value}</span> {s.label}</span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4E9EC] transition-colors group-hover:text-[#EE4C7C]">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </BentoCard>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Pop><h2 className="font-display text-3xl font-bold text-[#F4E9EC] md:text-5xl">All pricing, in one place.</h2></Pop>
          <Pop delay={0.05}>
            <div className="mt-10 overflow-x-auto rounded-[28px] border border-white/10 bg-white/[0.06]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 font-semibold text-[#F4E9EC]">Product</th>
                    <th className="px-5 py-4 text-right font-semibold text-[#F4E9EC]">Monthly</th>
                    <th className="px-5 py-4 text-right font-semibold text-[#F4E9EC]">Setup</th>
                    <th className="px-5 py-4 text-right font-semibold text-[#F4E9EC]">Year 1</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} className="border-b border-white/10 transition-colors last:border-0 hover:bg-[#E3AFBC]/20">
                      <td className="px-5 py-4">
                        <Link href={`/products/${p.id}`} className="font-semibold text-[#F4E9EC] hover:text-[#9A1750]">{p.name}</Link>
                        <div className="text-xs text-[#F4E9EC]/55">{p.tagline}</div>
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}</td>
                      <td className="px-5 py-4 text-right text-[#F4E9EC]/75">${p.setupPrice.toLocaleString()}</td>
                      <td className="px-5 py-4 text-right font-semibold text-[#F4E9EC]">${((p.monthlyPrice * 12) + p.setupPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Pop>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Pop><h2 className="font-display text-4xl font-bold text-[#F4E9EC] md:text-5xl">Ready to automate?</h2></Pop>
          <Pop delay={0.1}>
            <p className="mt-6 text-lg text-[#F4E9EC]/65">
              Schedule a free 15 minute consultation. We&apos;ll recommend the perfect setup for your business.
            </p>
          </Pop>
          <Pop delay={0.15}>
            <div className="mt-8"><MagneticButton href="/contact">Book Free Consultation</MagneticButton></div>
          </Pop>
        </div>
      </section>
    </>
  )
}
