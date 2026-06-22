'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, Sparkles } from 'lucide-react'

const faqs = [
  { q: 'What types of AI automation do you build?', a: "We specialize in n8n workflow automation, custom AI agents powered by GPT-4 and Claude, CRM automations, lead qualification systems, customer support bots, WhatsApp AI agents, and end-to-end data pipelines. Every system is custom-built for your specific business processes." },
  { q: 'How long does a typical project take?', a: "Timelines vary by scope: a focused AI workflow typically takes 2–4 weeks, a complete website rebuild 3–6 weeks, and a full SaaS platform 6–16 weeks. We provide a detailed timeline in every proposal with weekly milestones so you're always informed." },
  { q: 'What is your pricing structure?', a: "We work on project-based pricing, not hourly rates. After the discovery call, we provide a fixed-price proposal. Projects typically range from $5,000 for focused automations to $50,000+ for enterprise-scale platforms." },
  { q: 'Do you work with Shopify Plus stores?', a: "Yes — we handle everything from custom theme development and app integrations to store automations, CRO optimization, and headless Shopify builds." },
  { q: 'What happens after the project launches?', a: "Every project includes a 30-day post-launch support period at no extra cost. After that, we offer ongoing retainer packages for monitoring, optimization, and continued development." },
  { q: 'Can you integrate with our existing tools?', a: "Absolutely. We integrate with HubSpot, Salesforce, Slack, Notion, Google Workspace, Stripe, Shopify, and hundreds more via n8n, or custom API integrations." },
  { q: 'How do you ensure quality and security?', a: "We follow enterprise-grade practices: code reviews, automated testing, staging environments, and security audits. For AI systems, we implement rate limiting, prompt injection protection, and data privacy controls." },
  { q: 'Do you provide training for our team?', a: "Yes. Every delivery includes documentation and a live walkthrough. For complex systems, we provide video tutorials and a 30-day onboarding period so your team is fully empowered." },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 border"
      style={{
        background: isOpen ? 'rgba(155,28,28,0.08)' : '#0a0a0a',
        borderColor: isOpen ? 'rgba(155,28,28,0.35)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300'}`}>
          {item.q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(155,28,28,0.25)' : 'rgba(255,255,255,0.05)',
            color: isOpen ? '#E53E3E' : '#94A3B8',
          }}
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-5">
              <div className="w-full h-px mb-4" style={{ background: 'rgba(155,28,28,0.2)' }} />
              <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="relative py-32 overflow-hidden" style={{ background: '#050506' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(80,8,8,0.1) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> Got Questions?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl text-white mb-4"
          >
            Frequently Asked{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Everything you need to know before working with us.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          Still have questions?{' '}
          <a href="#cta" className="hover:text-white transition-colors font-medium" style={{ color: '#E53E3E' }}>
            Book a free strategy call
          </a>{' '}
          and we&apos;ll answer everything.
        </motion.p>
      </div>
    </section>
  )
}
