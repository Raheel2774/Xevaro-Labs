'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Bot, Globe, ShoppingBag, MessageSquare, Layers, GitBranch, ArrowRight, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'End-to-end automation powered by AI agents and n8n workflows that work 24/7.',
    features: ['n8n Workflow Automation', 'AI Agents & Copilots', 'CRM Automations', 'Lead Generation Systems', 'Data Pipeline Orchestration'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    imgAlt: 'AI automation visualization',
    gradient: 'from-[#7F1D1D] to-[#9B1C1C]',
    accent: '#E53E3E',
    glow: 'rgba(155,28,28,0.3)',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Conversion-optimized websites that reflect your premium brand and capture leads.',
    features: ['Custom Corporate Websites', 'High-Performance Landing Pages', 'CRO & A/B Testing', 'Next.js & React Apps', 'SEO Architecture'],
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
    imgAlt: 'Web development',
    gradient: 'from-[#1a0a0a] to-[#7F1D1D]',
    accent: '#FC8181',
    glow: 'rgba(252,129,129,0.2)',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'Premium Shopify stores engineered to convert visitors into loyal customers.',
    features: ['Custom Theme Development', 'Shopify Plus Customization', 'Store Automation', 'CRO Optimization', 'App Integrations'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    imgAlt: 'E-commerce store',
    gradient: 'from-[#5C0F0F] to-[#9B1C1C]',
    accent: '#FCA5A5',
    glow: 'rgba(252,165,165,0.2)',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI that qualifies leads and supports customers 24/7.',
    features: ['Customer Support AI', 'Lead Qualification Bots', 'WhatsApp AI Agents', 'GPT-4 Integration', 'Multi-channel Deployment'],
    img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
    imgAlt: 'AI chatbot interface',
    gradient: 'from-[#3B0000] to-[#7F1D1D]',
    accent: '#F87171',
    glow: 'rgba(248,113,113,0.25)',
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    description: 'Full-stack SaaS platforms built for scale, with beautiful UX and solid architecture.',
    features: ['Custom SaaS Platforms', 'Admin Dashboards', 'Multi-tenant Architecture', 'API Development', 'Internal Tools'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    imgAlt: 'SaaS dashboard',
    gradient: 'from-[#200000] to-[#5C0F0F]',
    accent: '#E53E3E',
    glow: 'rgba(229,62,62,0.2)',
  },
  {
    icon: GitBranch,
    title: 'Business Process Automation',
    description: 'Eliminate manual work, reduce costs, and free your team for high-value tasks.',
    features: ['CRM Integration', 'Email Automation', 'Data Pipelines', 'Report Generation', 'Zapier / Make Migrations'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    imgAlt: 'Business automation',
    gradient: 'from-[#4A0010] to-[#9B1C1C]',
    accent: '#FCA5A5',
    glow: 'rgba(155,28,28,0.25)',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setRot({
      x: ((e.clientY - r.top) / r.height - 0.5) * -10,
      y: ((e.clientX - r.left) / r.width - 0.5) * 10,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }) }}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(12px)`
          : 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)',
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.4s ease',
        boxShadow: hovered ? `0 20px 60px ${service.glow}` : '0 0 0 1px rgba(255,255,255,0.05)',
      }}
      className="rounded-2xl overflow-hidden border border-white/5 cursor-default group bg-[#0a0a0a]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.img}
          alt={service.imgAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
        <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${service.gradient}`} />

        {/* Icon overlay */}
        <div
          className="absolute bottom-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${service.accent}22`, border: `1px solid ${service.accent}44` }}
        >
          <service.icon size={20} style={{ color: service.accent }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#0a0a0a]">
        {/* Hover top-border */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg,transparent,${service.accent},transparent)` }}
        />

        <h3 className="font-heading font-semibold text-xl text-white mb-2">{service.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>

        <ul className="space-y-2">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.accent }} />
              {f}
            </li>
          ))}
        </ul>

        <div
          className="flex items-center gap-1.5 mt-5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ color: service.accent }}
        >
          Learn more <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-32 bg-black overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(100,10,10,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> What We Build
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Services That Drive{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Real Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            From AI automation to full-stack development — every service is built to maximize your ROI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
