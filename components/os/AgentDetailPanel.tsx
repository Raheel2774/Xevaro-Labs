'use client'

import { motion } from 'framer-motion'
import { Agent } from '@/lib/os'

interface AgentDetailPanelProps {
  agent: Agent
  isInCart: boolean
  onAddToCart: () => void
  onRemoveFromCart: () => void
}

export function AgentDetailPanel({ agent, isInCart, onAddToCart, onRemoveFromCart }: AgentDetailPanelProps) {
  return (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="sticky top-32 rounded-xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-mono tracking-widest text-[#B41D24]/70 uppercase mb-2">
            {agent.niche}
          </div>
          <h2 className="text-xl font-bold text-[#FBF8F8]">{agent.name}</h2>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#FBF8F8]/65 mb-6">
        {agent.description}
      </p>

      {/* Pricing Box */}
      <div className="rounded-lg border border-[#B41D24]/30 bg-[#B41D24]/[0.05] p-4 mb-6">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-[#B41D24]">${agent.monthlyPrice}</span>
          <span className="text-xs text-[#FBF8F8]/60">/month</span>
        </div>
        <div className="text-xs text-[#FBF8F8]/65 mb-3">Setup: ${agent.setupPrice.toLocaleString()}</div>
        <div className="border-t border-white/15 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#FBF8F8]/65">Year 1 Value:</span>
            <span className="font-bold text-[#FBF8F8]">
              ${((agent.monthlyPrice * 12) + agent.setupPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-[#FBF8F8]/80 mb-3 uppercase tracking-widest">Features</h4>
        <div className="space-y-2">
          {agent.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B41D24]" />
              <span className="text-sm text-[#FBF8F8]/75">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {isInCart ? (
        <motion.button
          onClick={onRemoveFromCart}
          className="w-full rounded-lg bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#FBF8F8] hover:bg-white/[0.07] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Remove from Cart
        </motion.button>
      ) : (
        <motion.button
          onClick={onAddToCart}
          className="w-full rounded-lg bg-[#B41D24] px-4 py-3 text-sm font-semibold text-white hover:bg-[#7C1418] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart
        </motion.button>
      )}

      {/* Info text */}
      <p className="text-xs text-[#FBF8F8]/55 text-center mt-4">
        Selected agents combine into your custom automation stack.
      </p>
    </motion.div>
  )
}
