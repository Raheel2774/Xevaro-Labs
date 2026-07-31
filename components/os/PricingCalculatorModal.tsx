'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/lib/os'

interface PricingCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  items: Agent[]
  onRemoveItem: (id: string) => void
}

export function PricingCalculatorModal({ isOpen, onClose, items, onRemoveItem }: PricingCalculatorModalProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#000000] p-8 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#FFFFFF]">Your shortlist</h2>
                <button
                  onClick={onClose}
                  className="text-[#FFFFFF]/60 hover:text-[#FFFFFF] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-[#FFFFFF]/65 uppercase tracking-widest mb-4">
                  Selected capabilities ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-white/15 bg-white/55"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-[#FFFFFF]">{item.name}</div>
                        <div className="text-xs text-[#FFFFFF]/60 mt-1">{item.niche}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#FFFFFF]/55 hover:text-[#B41D24] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div className="rounded-xl border border-[#B41D24]/30 bg-[#B41D24]/[0.05] p-6 mb-8">
                <div className="text-sm font-semibold text-[#FFFFFF] mb-3">These ship inside a role</div>
                <p className="text-sm text-[#FFFFFF]/75 leading-relaxed">
                  Capabilities are not sold separately. They are deployed as part of an AI role that we
                  build, onboard and manage for you: the AI Recruiter, the AI Receptionist, the AI SDR
                  or the AI Visibility Manager. Send us your shortlist and we will tell you which role
                  covers it and what it costs.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-white/15 p-3">
                    <div className="font-semibold text-[#FFFFFF]">Roles from</div>
                    <div className="text-[#B41D24] font-bold text-lg">$1,200/mo</div>
                  </div>
                  <div className="rounded-lg border border-white/15 p-3">
                    <div className="font-semibold text-[#FFFFFF]">Live in</div>
                    <div className="text-[#B41D24] font-bold text-lg">14 days</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-4">
                <motion.button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-white/25 px-6 py-3 font-semibold text-[#FFFFFF] hover:bg-white/[0.06] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Keep browsing
                </motion.button>
                <motion.a
                  href="/contact"
                  className="flex-1 rounded-lg bg-[#B41D24] px-6 py-3 font-semibold text-white hover:bg-[#7C1418] transition-all text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Quote
                </motion.a>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#FFFFFF]/55 text-center mt-6">
                Role pricing depends on which capabilities you need and how complex the integration is. We will quote it on a short call, no obligation.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
