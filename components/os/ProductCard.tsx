'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Product } from '@/lib/os'

const EASE = [0.34, 1.56, 0.64, 1] as const

interface ProductCardProps {
  product: Product
  delay?: number
  onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void
}

export function ProductCard({ product, delay = 0, onMouseMove }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.id}`}>
        <motion.div
          className="group relative h-full overflow-hidden rounded-[28px] border border-[#5D001E]/10 bg-white/70 p-7 backdrop-blur-xl shadow-[0_6px_28px_rgba(93,0,30,0.07)] transition-colors duration-300 hover:border-[#EE4C7C]/50"
          onMouseMove={onMouseMove}
          whileHover={{ y: -8, scale: 1.015, boxShadow: '0 20px 56px rgba(154, 23, 80, 0.2)' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Soft blush wash on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E3AFBC]/0 to-[#EE4C7C]/0 transition-all duration-500 group-hover:from-[#E3AFBC]/30 group-hover:to-[#EE4C7C]/10" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header: Index + Price */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tracking-widest text-[#9A1750]">
                PRODUCT {product.index}
              </span>
              <span className="text-xl font-bold text-[#EE4C7C]">
                ${product.monthlyPrice.toLocaleString()}/mo
              </span>
            </div>

            {/* Setup fee badge */}
            <div className="mt-2 inline-block rounded-full bg-[#E3AFBC]/40 px-3 py-1 text-xs text-[#5D001E]/70">
              Setup: ${product.setupPrice}
            </div>

            {/* Product name */}
            <h3 className="mt-5 font-display text-2xl font-bold text-[#5D001E] transition-colors duration-300 group-hover:text-[#9A1750]">
              {product.name}
            </h3>

            {/* Tagline */}
            <p className="mt-2 text-sm font-medium text-[#9A1750]/80">
              {product.tagline}
            </p>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-[#5D001E]/65">
              {product.description}
            </p>

            {/* Features */}
            <div className="mt-6 space-y-2">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EE4C7C]/70 transition-colors group-hover:bg-[#EE4C7C]" />
                  <span className="text-xs text-[#5D001E]/70">{feature}</span>
                </div>
              ))}
            </div>

            {/* Outcome box */}
            <div className="mt-6 rounded-2xl border border-[#9A1750]/15 bg-[#E3AFBC]/25 p-3 transition-all duration-300 group-hover:border-[#EE4C7C]/40 group-hover:bg-[#E3AFBC]/45">
              <p className="text-xs font-semibold text-[#5D001E]">{product.outcome}</p>
            </div>

            {/* CTA */}
            <motion.button
              className="mt-6 w-full rounded-full border-2 border-[#9A1750]/30 bg-transparent px-4 py-2.5 text-sm font-semibold text-[#5D001E] transition-all duration-300 group-hover:border-[#EE4C7C] group-hover:bg-[#EE4C7C] group-hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
