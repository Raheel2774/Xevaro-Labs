'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AGENTS } from '@/lib/os'
import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'
import { AgentCard } from '@/components/os/AgentCard'
import { AgentDetailPanel } from '@/components/os/AgentDetailPanel'
import { PricingCalculatorModal } from '@/components/os/PricingCalculatorModal'

const NICHES = Array.from(new Set(AGENTS.map(a => a.niche))).sort()

export default function AgentsPage() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0])
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [cartItems, setCartItems] = useState<typeof AGENTS>([])

  const filteredAgents = useMemo(() => {
    if (!selectedNiche) return AGENTS
    return AGENTS.filter(a => a.niche === selectedNiche)
  }, [selectedNiche])

  const addToCart = (agent: typeof AGENTS[0]) => {
    if (!cartItems.find(item => item.id === agent.id)) {
      setCartItems([...cartItems, agent])
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  return (
    <>
      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>AI Agent Catalog</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-4xl md:text-6xl">{filteredAgents.length} specialized AI agents<br />ready to deploy.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-[#FFFFFF]/65 font-light">
              Browse our complete catalog. Filter by niche, add to cart, and combine agents into your perfect automation stack.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative flex gap-8 px-6 py-16 md:px-10">
        <div className="mx-auto w-full max-w-7xl flex gap-8">
          {/* Sidebar: Niche Filter */}
          <div className="sticky top-32 h-fit w-48 flex-shrink-0">
            <div className="rounded-lg border border-white/15 bg-white/55 p-4 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4">FILTER BY NICHE</h3>
              <div className="space-y-2">
                <motion.button
                  onClick={() => setSelectedNiche(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedNiche === null
                      ? 'bg-[#B41D24] text-white font-semibold'
                      : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  All Agents ({AGENTS.length})
                </motion.button>
                {NICHES.map(niche => {
                  const count = AGENTS.filter(a => a.niche === niche).length
                  return (
                    <motion.button
                      key={niche}
                      onClick={() => setSelectedNiche(niche)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                        selectedNiche === niche
                          ? 'bg-[#B41D24] text-white font-semibold'
                          : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      {niche}
                      <span className="ml-2 text-xs text-[#FFFFFF]/60">({count})</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="mt-6 rounded-lg border border-[#B41D24]/30 bg-[#B41D24]/[0.05] p-4">
                <div className="text-xs font-semibold text-[#B41D24] mb-3">CART ({cartItems.length})</div>
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs text-[#FFFFFF]/80">
                      <span className="truncate">{item.name}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#FFFFFF]/60 hover:text-[#B41D24]"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/15 pt-3 mb-3">
                  <div className="flex justify-between text-sm font-semibold text-[#FFFFFF]">
                    <span>Monthly:</span>
                    <span className="text-[#B41D24]">${cartItems.reduce((sum, a) => sum + a.monthlyPrice, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#FFFFFF]/65 mt-1">
                    <span>Setup:</span>
                    <span>${cartItems.reduce((sum, a) => sum + a.setupPrice, 0).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPricingModal(true)}
                  className="w-full py-2 rounded-lg bg-[#B41D24] text-white text-xs font-semibold hover:bg-[#7C1418] transition-all"
                >
                  View Details
                </button>
              </div>
            )}
          </div>

          {/* Main: Agent Grid + Detail */}
          <div className="flex-1 flex gap-8">
            {/* Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {filteredAgents.map((agent, i) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      isSelected={selectedAgent.id === agent.id}
                      onSelect={setSelectedAgent}
                      onAddToCart={addToCart}
                      delay={i * 0.03}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Detail Panel (Desktop only) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <AgentDetailPanel
                agent={selectedAgent}
                isInCart={cartItems.some(item => item.id === selectedAgent.id)}
                onAddToCart={() => addToCart(selectedAgent)}
                onRemoveFromCart={() => removeFromCart(selectedAgent.id)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      <PricingCalculatorModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />

      {/* CTA */}
      <section className="relative px-6 py-28 md:px-10 border-t border-white/10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><H2 className="text-4xl md:text-5xl">Need help choosing?</H2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-[#FFFFFF]/65">
              Schedule a 30 minute consultation with our experts. We&apos;ll recommend the perfect agent combo for your business.
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
