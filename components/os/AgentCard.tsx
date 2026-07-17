'use client'

import { motion } from 'framer-motion'
import { Agent } from '@/lib/os'

interface AgentCardProps {
  agent: Agent
  isSelected: boolean
  onSelect: (agent: Agent) => void
  onAddToCart: (agent: Agent) => void
  delay?: number
}

export function AgentCard({ agent, isSelected, onSelect, onAddToCart, delay = 0 }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        className={`group relative h-full overflow-hidden rounded-xl border-2 p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
          isSelected
            ? 'border-[#B41D24] bg-[#B41D24]/[0.1]'
            : 'border-white/15 bg-white/[0.06] hover:border-[#B41D24]/50'
        }`}
        onClick={() => onSelect(agent)}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 30px rgba(180, 29, 36, 0.2)',
        }}
      >
        {/* Background glow */}
        <div className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
          isSelected
            ? 'bg-gradient-to-br from-[#B41D24]/20 to-[#7C1418]/10'
            : 'bg-gradient-to-br from-[#B41D24]/0 to-[#7C1418]/0 group-hover:from-[#B41D24]/10 group-hover:to-[#7C1418]/5'
        }`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="text-xs font-mono tracking-widest text-[#B41D24]/70 uppercase mb-2">
                {agent.niche}
              </div>
              <h3 className="font-display text-lg font-bold text-[#FFFFFF] leading-tight">
                {agent.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-[#FFFFFF]/65 line-clamp-2">
            {agent.description}
          </p>

          {/* Features */}
          <div className="mt-4 space-y-2">
            {agent.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[#B41D24]/60 group-hover:bg-[#B41D24]" />
                <span className="text-xs text-[#FFFFFF]/60 group-hover:text-[#FFFFFF]/75">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-5 flex items-baseline gap-2 border-t border-white/15 pt-4">
            <span className="text-2xl font-bold text-[#B41D24]">
              ${agent.monthlyPrice}
            </span>
            <span className="text-xs text-[#FFFFFF]/60">/month</span>
            <span className="text-xs text-[#FFFFFF]/55 ml-auto">
              +${agent.setupPrice} setup
            </span>
          </div>

          {/* CTA */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(agent)
            }}
            className="mt-4 w-full rounded-lg border border-[#B41D24]/50 bg-[#B41D24]/[0.05] px-3 py-2 text-xs font-semibold text-[#FFFFFF] transition-all hover:border-[#B41D24] hover:bg-[#B41D24]/[0.15]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
