'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Clock, TrendingUp, Shield, Zap, HeartHandshake, Target, Sparkles } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 100, suffix: '+', label: 'Projects Delivered',   icon: Target,        color: '#E53E3E' },
  { value: 95,  suffix: '%', label: 'Client Retention',     icon: HeartHandshake, color: '#FC8181' },
  { value: 300, suffix: '%', label: 'Average ROI',          icon: TrendingUp,    color: '#FBBFBF' },
  { value: 2,   prefix: '$', suffix: 'M+', label: 'Revenue Generated', icon: TrendingUp, color: '#E53E3E' },
]

const advantages = [
  { icon: Zap,          title: 'Fast Delivery',           description: 'We move at startup speed. Most projects go live in 2 to 6 weeks, not months.', color: '#E53E3E' },
  { icon: TrendingUp,   title: 'ROI Driven Solutions',    description: 'Every decision is tied back to your revenue and growth metrics.', color: '#FC8181' },
  { icon: Shield,       title: 'Enterprise Grade Quality',description: 'Production ready code with security, scalability, and performance built in.', color: '#FBBFBF' },
  { icon: Clock,        title: '24/7 Support',            description: 'Dedicated support team available around the clock, whenever you need us.', color: '#E53E3E' },
  { icon: HeartHandshake, title: 'True Partnership',      description: 'We act as your dedicated tech team, not just a vendor. Your success is ours.', color: '#FC8181' },
  { icon: Target,       title: 'Precision Built Systems', description: 'Every automation is custom built for your specific business needs.', color: '#FBBFBF' },
]

export default function WhyUs() {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why-us" className="relative py-32 overflow-hidden" style={{ background: '#050506' }}>
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(100,10,10,0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(155,28,28,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> Why Xevaro Labs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Built Different.{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Priced for Results.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            We don&apos;t just build technology, we build competitive advantages.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-6 text-center border overflow-hidden group cursor-default"
              style={{ background: 'rgba(155,28,28,0.06)', borderColor: 'rgba(155,28,28,0.15)' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(155,28,28,0.2), transparent 70%)` }}
              />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(155,28,28,0.15)', color: stat.color }}>
                <stat.icon size={18} />
              </div>
              <div className="font-heading font-bold text-3xl md:text-4xl" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.value} prefix={stat.prefix ?? ''} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Image + advantages split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                alt="Team working on AI projects"
                fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(155,28,28,0.25), rgba(0,0,0,0.6))' }} />
            </div>

            {/* Overlay stats card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-5 border"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderColor: 'rgba(155,28,28,0.3)' }}
            >
              <p className="text-xs text-gray-400 mb-1">Average Project ROI</p>
              <p className="font-heading font-bold text-3xl" style={{ color: '#E53E3E' }}>300%+</p>
              <p className="text-xs text-gray-500 mt-1">Within first 6 months</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-5 rounded-2xl p-4 border"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderColor: 'rgba(155,28,28,0.25)' }}
            >
              <p className="text-xs text-gray-400 mb-1">Projects Delivered</p>
              <p className="font-heading font-bold text-2xl text-white">100+</p>
            </motion.div>
          </motion.div>

          {/* Right: advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-5 rounded-2xl border group cursor-default transition-colors duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(155,28,28,0.15)', color: adv.color }}>
                  <adv.icon size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-1">{adv.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{adv.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
