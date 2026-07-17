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
          <div className="text-xs font-mono tracking-widest text-[#EE4C7C]/70 uppercase mb-2">
            {agent.niche}
          </div>
          <h2 className="text-xl font-bold text-[#F4E9EC]">{agent.name}</h2>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#F4E9EC]/65 mb-6">
        {agent.description}
      </p>

      {/* Pricing Box */}
      <div className="rounded-lg border border-[#EE4C7C]/30 bg-[#EE4C7C]/[0.05] p-4 mb-6">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-[#EE4C7C]">${agent.monthlyPrice}</span>
          <span className="text-xs text-[#F4E9EC]/60">/month</span>
        </div>
        <div className="text-xs text-[#F4E9EC]/65 mb-3">Setup: ${agent.setupPrice.toLocaleString()}</div>
        <div className="border-t border-white/15 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#F4E9EC]/65">Year 1 Value:</span>
            <span className="font-bold text-[#F4E9EC]">
              ${((agent.monthlyPrice * 12) + agent.setupPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-[#F4E9EC]/80 mb-3 uppercase tracking-widest">Features</h4>
        <div className="space-y-2">
          {agent.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EE4C7C]" />
              <span className="text-sm text-[#F4E9EC]/75">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {isInCart ? (
        <motion.button
          onClick={onRemoveFromCart}
          className="w-full rounded-lg bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#F4E9EC] hover:bg-white/[0.07] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Remove from Cart
        </motion.button>
      ) : (
        <motion.button
          onClick={onAddToCart}
          className="w-full rounded-lg bg-[#EE4C7C] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9A1750] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart
        </motion.button>
      )}

      {/* Info text */}
      <p className="text-xs text-[#F4E9EC]/55 text-center mt-4">
        Selected agents combine into your custom automation stack.
      </p>
    </motion.div>
  )
}
