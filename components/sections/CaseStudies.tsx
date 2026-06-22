'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Zap, DollarSign, Sparkles } from 'lucide-react'

const cases = [
  {
    client: 'FinTech SaaS',
    project: 'AI-Powered Lead Qualification System',
    description: 'Built an n8n + GPT-4 workflow that automatically scores and qualifies inbound leads, routing hot prospects to sales instantly.',
    tag: 'AI Automation',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    imgAlt: 'FinTech analytics dashboard',
    metrics: [
      { icon: TrendingUp,   label: 'Lead Conversion', value: '+340%', color: '#E53E3E' },
      { icon: Zap,          label: 'Response Time',   value: '2 min', color: '#FC8181' },
      { icon: DollarSign,   label: 'Revenue Impact',  value: '$1.2M', color: '#FBBFBF' },
    ],
    accent: '#E53E3E',
  },
  {
    client: 'E-commerce Brand',
    project: 'Shopify Conversion Overhaul',
    description: 'Redesigned Shopify Plus store with custom UX, AI product recommendations, and automated cart recovery flows.',
    tag: 'Shopify + CRO',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    imgAlt: 'E-commerce store interface',
    metrics: [
      { icon: TrendingUp,   label: 'Revenue Growth',  value: '+280%', color: '#E53E3E' },
      { icon: Users,        label: 'Conv. Rate',       value: '4.8%', color: '#FC8181' },
      { icon: DollarSign,   label: 'AOV Increase',    value: '+65%',  color: '#FBBFBF' },
    ],
    accent: '#FC8181',
  },
  {
    client: 'Healthcare Tech',
    project: 'Patient Intake Automation',
    description: 'Automated entire patient onboarding using AI chatbots, eliminating 40+ hours of manual admin work per week.',
    tag: 'Process Automation',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    imgAlt: 'Healthcare technology',
    metrics: [
      { icon: Zap,        label: 'Time Saved/Week',   value: '40 hrs', color: '#E53E3E' },
      { icon: Users,      label: 'Satisfaction',      value: '97%',    color: '#FC8181' },
      { icon: DollarSign, label: 'Cost Reduction',    value: '-60%',   color: '#FBBFBF' },
    ],
    accent: '#FBBFBF',
  },
  {
    client: 'Real Estate Agency',
    project: 'AI CRM & Follow-up System',
    description: 'Integrated AI agents with HubSpot to automate follow-ups, property matching, and client nurture across email and WhatsApp.',
    tag: 'AI + CRM',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    imgAlt: 'Real estate property',
    metrics: [
      { icon: TrendingUp,   label: 'Deals Closed',    value: '+190%',  color: '#E53E3E' },
      { icon: Users,        label: 'Productivity',    value: '3×',     color: '#FC8181' },
      { icon: DollarSign,   label: 'Commission +',    value: '$800K',  color: '#FBBFBF' },
    ],
    accent: '#E53E3E',
  },
]

export default function CaseStudies() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="case-studies" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(100,10,10,0.12), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> Proven Results
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Case Studies That{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Speak for Themselves
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Real projects. Real metrics. Real ROI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl overflow-hidden border cursor-default"
              style={{ background: '#0a0a0a', borderColor: 'rgba(155,28,28,0.15)' }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.imgAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(ellipse at 30% 50%, ${c.accent}30, transparent 60%)` }} />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: c.accent, border: `1px solid ${c.accent}30` }}
                  >
                    {c.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-2 font-medium">{c.client}</p>
                <h3 className="font-heading font-semibold text-xl text-white mb-3 leading-tight">{c.project}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{c.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {c.metrics.map((m, j) => (
                    <div
                      key={j}
                      className="rounded-xl p-3 text-center border"
                      style={{ background: `${m.color}0d`, borderColor: `${m.color}22` }}
                    >
                      <div className="font-heading font-bold text-lg" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                  style={{ color: c.accent }}
                >
                  View full case study <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
