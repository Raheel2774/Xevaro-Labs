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
                <h2 className="text-2xl font-bold text-[#FFFFFF]">Pricing Calculator</h2>
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
                  Selected Agents ({items.length})
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
                        <div className="text-right">
                          <div className="font-semibold text-[#FFFFFF]">${item.monthlyPrice}/mo</div>
                          <div className="text-xs text-[#FFFFFF]/60">+${item.setupPrice}</div>
                        </div>
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

              {/* Pricing Summary */}
              <div className="rounded-xl border border-[#B41D24]/30 bg-[#B41D24]/[0.05] p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF]/75">Monthly Subscription</span>
                    <span className="text-2xl font-bold text-[#B41D24]">
                      ${totalMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF]/75">One time Setup</span>
                    <span className="text-lg font-semibold text-[#FFFFFF]">
                      ${totalSetup.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-white/15 pt-4 flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#FFFFFF]">Year 1 Total Investment</span>
                    <span className="text-3xl font-bold text-[#B41D24]">
                      ${year1Value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold text-[#FFFFFF]/65 uppercase tracking-widest mb-4">
                  Detailed Breakdown
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/15">
                        <th className="text-left py-3 px-3 font-semibold text-[#FFFFFF]">Agent</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#FFFFFF]">Monthly</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#FFFFFF]">Setup</th>
                        <th className="text-right py-3 px-3 font-semibold text-[#FFFFFF]">Year 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-white/10 hover:bg-white/55"
                        >
                          <td className="py-3 px-3 text-[#FFFFFF]/80">{item.name}</td>
                          <td className="text-right py-3 px-3 text-[#FFFFFF] font-medium">${item.monthlyPrice}</td>
                          <td className="text-right py-3 px-3 text-[#FFFFFF]/75">${item.setupPrice}</td>
                          <td className="text-right py-3 px-3 text-[#FFFFFF] font-medium">
                            ${((item.monthlyPrice * 12) + item.setupPrice).toLocaleString()}
                          </td>
                        </motion.tr>
                      ))}
                      <tr className="bg-[#B41D24]/[0.05]">
                        <td colSpan={1} className="py-4 px-3 font-bold text-[#FFFFFF]">TOTAL</td>
                        <td className="text-right py-4 px-3 font-bold text-[#B41D24] text-lg">${totalMonthly.toLocaleString()}</td>
                        <td className="text-right py-4 px-3 font-bold text-[#FFFFFF]">${totalSetup.toLocaleString()}</td>
                        <td className="text-right py-4 px-3 font-bold text-[#B41D24] text-lg">${year1Value.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
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
                  Continue Shopping
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
                Prices shown are starting rates. Final pricing may vary based on deployment complexity, custom integrations, and service level agreements.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
