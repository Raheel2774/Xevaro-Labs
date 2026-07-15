'use client'

import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/os'
import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'
import { ProductCard } from '@/components/os/ProductCard'

export default function ProductsPage() {
  return (
    <>
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Product Catalog</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">Six AI automation products.<br />One unified platform.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-[#5D001E]/65 font-light leading-relaxed">
              Start with one product or combine them into a complete automation platform.
              Deploy in 48 hours. Scale as you grow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="relative px-6 py-28 md:px-10 border-t border-[#5D001E]/10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>Pricing Comparison</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-3xl md:text-4xl">All pricing detailed.</H2>
          </Reveal>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#5D001E]/15">
                  <th className="py-4 px-4 font-semibold text-[#5D001E]">Product</th>
                  <th className="py-4 px-4 font-semibold text-[#5D001E] text-right">Monthly</th>
                  <th className="py-4 px-4 font-semibold text-[#5D001E] text-right">Setup</th>
                  <th className="py-4 px-4 font-semibold text-[#5D001E] text-right">Year 1 Value</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <motion.tr
                    key={p.id}
                    className="border-b border-[#5D001E]/10 hover:bg-white/55 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[#5D001E]">{p.name}</div>
                      <div className="text-sm text-[#5D001E]/60">{p.tagline}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-[#EE4C7C]">${p.monthlyPrice.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-[#5D001E]/80">
                      ${p.setupPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-[#5D001E]">
                        ${((p.monthlyPrice * 12) + p.setupPrice).toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><H2 className="text-4xl md:text-5xl">Ready to automate?</H2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-[#5D001E]/65">
              Schedule a free 15 minute consultation. We'll recommend the perfect setup for your business.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <MagneticButton href="/contact">Book Free Consultation</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
