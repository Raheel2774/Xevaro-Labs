'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimationFrame } from 'framer-motion'
import { Star, Quote, Sparkles } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus Tanner',
    role: 'CEO, FinCore AI',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: "Xevaro Labs transformed our entire lead pipeline. The AI automation they built saves us 30+ hours per week and has tripled our conversion rate. Best investment we've ever made.",
  },
  {
    name: 'Sophia Reeves',
    role: 'Founder, LuxCart',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    text: "Our Shopify store revenue doubled in 60 days after Xevaro rebuilt it. The attention to detail, speed, and quality of work is unlike any agency I've worked with before.",
  },
  {
    name: 'David Chen',
    role: 'CTO, MediFlow',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    text: "The patient intake automation system is flawless. Our admin team is freed up to focus on care instead of paperwork. Xevaro Labs delivered beyond our expectations.",
  },
  {
    name: 'Priya Kapoor',
    role: 'VP Growth, ScaleUp SaaS',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    rating: 5,
    text: "Working with Xevaro is like having a world-class tech team on-demand. Their AI chatbot handles 70% of our support tickets automatically. Outstanding results.",
  },
  {
    name: 'James Whitfield',
    role: 'Director, PrimeRealty',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
    text: "The CRM automation and AI follow-up system made every agent 3× more productive. The ROI was evident within the first month. Highly recommend.",
  },
  {
    name: 'Elena Vasquez',
    role: 'COO, NovaTech',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    text: "We came to Xevaro with a complex data pipeline problem. They solved it with elegance and built it in half the time we expected. Exceptional team.",
  },
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl p-6 border group hover:border-white/12 transition-colors duration-300 cursor-default"
      style={{ background: '#0a0a0a', borderColor: 'rgba(155,28,28,0.15)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(155,28,28,0.12), transparent 70%)' }}
      />

      <Quote size={18} className="text-gray-700 mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-6">{t.text}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border" style={{ borderColor: 'rgba(155,28,28,0.3)' }}>
          <Image src={t.img} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const x1 = useRef(0)
  const x2 = useRef(0)

  useAnimationFrame(() => {
    if (!row1Ref.current || !row2Ref.current) return
    x1.current -= 0.45
    x2.current += 0.45
    const half = row1Ref.current.scrollWidth / 2
    if (Math.abs(x1.current) >= half) x1.current = 0
    if (x2.current >= 0) x2.current = -half
    row1Ref.current.style.transform = `translateX(${x1.current}px)`
    row2Ref.current.style.transform = `translateX(${x2.current}px)`
  })

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#050506' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(100,10,10,0.1) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div ref={ref} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> Client Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            What Our Clients{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Say About Us
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Don&apos;t just take our word for it.
          </motion.p>
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-5 overflow-hidden">
        <div className="flex gap-5" style={{ width: 'max-content' }}>
          <div ref={row1Ref} className="flex gap-5" style={{ willChange: 'transform' }}>
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
        <div className="flex gap-5" style={{ width: 'max-content' }}>
          <div ref={row2Ref} className="flex gap-5" style={{ willChange: 'transform' }}>
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #050506, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #050506, transparent)' }} />
    </section>
  )
}
