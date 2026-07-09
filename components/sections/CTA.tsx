'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, FileText } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

function FloatingOrb({ x, y, size, opacity, delay }: { x: string; y: string; size: number; opacity: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: `rgba(155,28,28,${opacity})`, filter: 'blur(70px)' }}
      animate={{ x: [0, 25, -18, 0], y: [0, -18, 25, 0], opacity: [opacity, opacity * 2, opacity] }}
      transition={{ duration: 9 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function CTA() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cta" className="relative py-32 bg-black overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=80"
          alt="AI technology background"
          fill className="object-cover opacity-[0.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      {/* Orbs */}
      <FloatingOrb x="8%"  y="15%" size={420} opacity={0.12} delay={0} />
      <FloatingOrb x="60%" y="8%"  size={380} opacity={0.08} delay={2} />
      <FloatingOrb x="30%" y="55%" size={320} opacity={0.06} delay={4} />
      <FloatingOrb x="78%" y="45%" size={260} opacity={0.09} delay={1} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(196,30,30,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,30,30,1) 1px,transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center" ref={ref}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border"
          style={{ background: 'rgba(155,28,28,0.12)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#E53E3E' }} />
          Free Strategy Session, No commitment required
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white leading-[1.05] mb-6"
        >
          Ready to Automate and{' '}
          <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Scale Your Business?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Book a free 30-minute strategy call. We&apos;ll analyze your business, identify your biggest automation opportunities, and show you exactly how we&apos;d help you grow.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <MagneticButton
            href="https://cal.com/xevarolabs"
            className="group px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#9B1C1C,#C41E1E)', boxShadow: '0 0 30px rgba(155,28,28,0.4)' } as React.CSSProperties}
          >
            <Calendar size={18} className="inline mr-2" />
            Book Free Consultation
            <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href="mailto:hello@xevarolabs.com"
            className="px-8 py-4 rounded-2xl font-semibold text-base text-white border transition-all duration-300 hover:bg-white/5"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' } as React.CSSProperties}
          >
            <FileText size={18} className="inline mr-2" />
            Get Custom Proposal
          </MagneticButton>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          {['✓ No pressure consultation', '✓ Custom roadmap included', '✓ Response within 24 hours', '✓ 100% confidential'].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </motion.div>

        {/* Watermark */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-heading font-black leading-none select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: '18vw', color: 'rgba(155,28,28,0.04)' }}
          aria-hidden
        >
          XEVARO
        </div>
      </div>
    </section>
  )
}
