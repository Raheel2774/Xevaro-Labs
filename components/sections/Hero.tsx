'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Star, TrendingUp, Users, Zap } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

/* ─── Particle Canvas ────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = []

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.45 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(196,30,30,${0.07 * (1 - d / 110)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196,30,30,${p.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden />
}

/* ─── Floating Image Card ────────────────────────────── */
function FloatCard({
  src, alt, title, stat, delay, className,
}: {
  src: string; alt: string; title: string; stat: string; delay: number; className: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute hidden xl:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)' }}
      >
        <div className="relative w-48 h-28 overflow-hidden">
          <Image src={src} alt={alt} fill className="object-cover opacity-80" sizes="192px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-white">{title}</p>
          <p className="text-xs text-maroon-400 font-bold mt-0.5" style={{ color: '#E53E3E' }}>{stat}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Tool logos marquee data ────────────────────────── */
const tools = [
  { name: 'n8n',      icon: '⚡', color: '#EA4B71' },
  { name: 'OpenAI',   icon: '🤖', color: '#10A37F' },
  { name: 'Shopify',  icon: '🛒', color: '#95BF47' },
  { name: 'HubSpot',  icon: '🔶', color: '#FF7A59' },
  { name: 'Vercel',   icon: '▲',  color: '#FFFFFF' },
  { name: 'Stripe',   icon: '💳', color: '#6772E5' },
  { name: 'Notion',   icon: '📝', color: '#FFFFFF' },
  { name: 'Slack',    icon: '💬', color: '#4A154B' },
  { name: 'Make',     icon: '🔄', color: '#9C36B5' },
  { name: 'Zapier',   icon: '⚡', color: '#FF4A00' },
  { name: 'Supabase', icon: '🟢', color: '#3ECF8E' },
  { name: 'Claude',   icon: '🧠', color: '#CC9B7A' },
]
const doubledTools = [...tools, ...tools]

const heroWords = ['We', 'Build', 'AI', 'Systems', 'That', 'Scale', 'Businesses']

export default function Hero() {
  const { scrollY } = useScroll()
  const heroY       = useTransform(scrollY, [0, 600], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1920&q=80"
          alt="AI background"
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, rgba(155,28,28,0.18) 0%, transparent 70%)' }} />
      <div className="absolute top-[25%] right-[-8%] w-[450px] h-[450px] rounded-full pointer-events-none animate-float"
        style={{ background: 'radial-gradient(ellipse, rgba(100,10,10,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none animate-float-delayed"
        style={{ background: 'radial-gradient(ellipse, rgba(155,28,28,0.1) 0%, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(196,30,30,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,30,30,1) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Floating image cards */}
      <FloatCard
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
        alt="AI automation workflow"
        title="AI Workflow Active"
        stat="↑ 340% Conversion"
        delay={1.4}
        className="left-[-2%] top-[28%]"
      />
      <FloatCard
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
        alt="Analytics dashboard"
        title="Revenue Dashboard"
        stat="$1.2M Generated"
        delay={1.7}
        className="right-[-2%] top-[32%]"
      />
      <FloatCard
        src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80"
        alt="AI chatbot interface"
        title="AI Chatbot Live"
        stat="97% Satisfaction"
        delay={2.0}
        className="right-[4%] top-[62%]"
      />

      {/* Main content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
          style={{ background: 'rgba(155,28,28,0.12)', borderColor: 'rgba(155,28,28,0.35)', color: '#FC8181' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#E53E3E' }} />
          Next generation AI Automation Agency
          <ArrowRight size={14} />
        </motion.div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.03] tracking-tight mb-6">
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.22em]"
              style={
                ['AI', 'Systems'].includes(word)
                  ? {
                      backgroundImage: 'linear-gradient(90deg, #E53E3E, #FBBFBF, #E53E3E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }
                  : { color: '#FFFFFF' }
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Transform your business with{' '}
          <span className="text-white font-medium">AI Automation</span>,{' '}
          <span className="text-white font-medium">Intelligent Workflows</span>,
          High Converting Websites, Shopify Development, and Custom Software Solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.92, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <MagneticButton
            href="#cta"
            className="group px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 gap-2"
            style={{ background: 'linear-gradient(135deg,#9B1C1C,#C41E1E)', boxShadow: '0 0 30px rgba(155,28,28,0.4)' } as React.CSSProperties}
          >
            Book Strategy Call
            <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href="#case-studies"
            className="px-8 py-4 rounded-2xl font-semibold text-base text-white border transition-all duration-300 hover:bg-white/5"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' } as React.CSSProperties}
          >
            View Case Studies
          </MagneticButton>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {[
            { icon: TrendingUp, label: '300% avg ROI' },
            { icon: Users, label: '100+ Clients' },
            { icon: Star, label: '5-Star Rated' },
            { icon: Zap, label: 'AI Powered' },
          ].map(({ icon: Icon, label }, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-gray-300"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <Icon size={13} style={{ color: '#E53E3E' }} />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 max-w-2xl mx-auto mb-16 border"
          style={{ background: 'rgba(155,28,28,0.08)', borderColor: 'rgba(155,28,28,0.2)' }}
        >
          {[
            { value: '100+', label: 'Projects Delivered' },
            { value: '95%',  label: 'Client Retention' },
            { value: '$2M+', label: 'Revenue Generated' },
            { value: '24/7', label: 'Support' },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <div
                className="font-heading font-bold text-2xl"
                style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {m.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tool marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="relative z-10 w-full overflow-hidden border-t py-8"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-5 font-medium">
          Powered by the world&apos;s best tools
        </p>
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubledTools.map((t, i) => (
              <span key={i} className="mx-7 flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors font-heading font-semibold text-sm cursor-default">
                <span>{t.icon}</span>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-gray-700 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-gray-700" />
        </motion.div>
      </motion.div>
    </section>
  )
}
