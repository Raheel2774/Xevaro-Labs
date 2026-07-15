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
  const totalMonthly = items.reduce((sum, item) => sum + item.monthlyPrice, 0)
  const totalSetup = items.reduce((sum, item) => sum + item.setupPrice, 0)
  const year1Value = totalMonthly * 12 + totalSetup

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
            className="fixed inset-0 z-40 bg-[#5D001E]/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl rounded-2xl border border-[#5D001E]/15 bg-[#E3E2DF] p-8 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#5D001E]">Pricing Calculator</h2>
                <button
                  onClick={onClose}
                  className="text-[#5D001E]/60 hover:text-[#5D001E] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-[#5D001E]/65 uppercase tracking-widest mb-4">
                  Selected Agents ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-[#5D001E]/15 bg-white/55"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-[#5D001E]">{item.name}</div>
                        <div className="text-xs text-[#5D001E]/60 mt-1">{item.niche}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-semibold text-[#5D001E]">${item.monthlyPrice}/mo</div>
                          <div className="text-xs text-[#5D001E]/60">+${item.setupPrice}</div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#5D001E]/55 hover:text-[#EE4C7C] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="rounded-xl border border-[#EE4C7C]/30 bg-[#EE4C7C]/[0.05] p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5D001E]/75">Monthly Subscription</span>
                    <span className="text-2xl font-bold text-[#EE4C7C]">
                      ${totalMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5D001E]/75">One time Setup</span>
                    <span className="text-lg font-semibold text-[#5D001E]">
                      ${totalSetup.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-[#5D001E]/15 pt-4 flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#5D001E]">Year 1 Total Investment</span>
                    <span className="text-3xl font-bold text-[#EE4C7C]">
                      ${year1Value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold text-[#5D001E]/65 uppercase tracking-widest mb-4">
                  Detailed Breakdown
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#5D001E]/15">
                        <th className="text-left py-3 px-3 font-semibold text-[#5D001E]">Agent</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#5D001E]">Monthly</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#5D001E]">Setup</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#5D001E]">Year 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-[#5D001E]/10 hover:bg-white/55"
                        >
                          <td className="py-3 px-3 text-[#5D001E]/80">{item.name}</td>
                          <td className="text-right py-3 px-3 text-[#5D001E] font-medium">${item.monthlyPrice}</td>
                          <td className="text-right py-3 px-3 text-[#5D001E]/75">${item.setupPrice}</td>
                          <td className="text-right py-3 px-3 text-[#5D001E] font-medium">
                            ${((item.monthlyPrice * 12) + item.setupPrice).toLocaleString()}
                          </td>
                        </motion.tr>
                      ))}
                      <tr className="bg-[#EE4C7C]/[0.05]">
                        <td colSpan={1} className="py-4 px-3 font-bold text-[#5D001E]">TOTAL</td>
                        <td className="text-right py-4 px-3 font-bold text-[#EE4C7C] text-lg">${totalMonthly.toLocaleString()}</td>
                        <td className="text-right py-4 px-3 font-bold text-[#5D001E]">${totalSetup.toLocaleString()}</td>
                        <td className="text-right py-4 px-3 font-bold text-[#EE4C7C] text-lg">${year1Value.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-4">
                <motion.button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-[#5D001E]/25 px-6 py-3 font-semibold text-[#5D001E] hover:bg-white/60 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
                <motion.a
                  href="/contact"
                  className="flex-1 rounded-lg bg-[#EE4C7C] px-6 py-3 font-semibold text-white hover:bg-[#9A1750] transition-all text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Quote
                </motion.a>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#5D001E]/55 text-center mt-6">
                Prices shown are starting rates. Final pricing may vary based on deployment complexity, custom integrations, and service level agreements.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
