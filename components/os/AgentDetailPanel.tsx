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
          <h2 className="text-xl font-bold text-[#FFFFFF]">{agent.name}</h2>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#FFFFFF]/65 mb-6">
        {agent.description}
      </p>

      {/* Included in a role */}
      <div className="rounded-lg border border-[#B41D24]/30 bg-[#B41D24]/[0.05] p-4 mb-6">
        <div className="text-sm font-semibold text-[#FFFFFF] mb-2">Included in your role</div>
        <p className="text-xs text-[#FFFFFF]/70 leading-relaxed">
          This capability is deployed as part of an AI role we build, onboard and manage.
          It is not a separate subscription.
        </p>
        <div className="border-t border-white/15 pt-3 mt-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#FFFFFF]/65">Roles from</span>
            <span className="font-bold text-[#B41D24]">$1,200/mo</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-[#FFFFFF]/80 mb-3 uppercase tracking-widest">Features</h4>
        <div className="space-y-2">
          {agent.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B41D24]" />
              <span className="text-sm text-[#FFFFFF]/75">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {isInCart ? (
        <motion.button
          onClick={onRemoveFromCart}
          className="w-full rounded-lg bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#FFFFFF] hover:bg-white/[0.07] transition-all"
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
      <p className="text-xs text-[#FFFFFF]/55 text-center mt-4">
        Selected agents combine into your custom automation stack.
      </p>
    </motion.div>
  )
}
