'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Organic spring ease with slight overshoot
const EASE = [0.34, 1.56, 0.64, 1] as const

// ─── Reveal-on-scroll wrapper ─────────────────────────────────────────────────

export function Reveal({
  children, delay = 0, y = 34, className = '',
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section eyebrow ──────────────────────────────────────────────────────────

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2.5">
      <span className="h-2 w-2 rounded-full bg-[#B41D24]" />
      <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#7C1418]/70">{children}</span>
    </div>
  )
}

// ─── Soft card ────────────────────────────────────────────────────────────────

export function GlassCard({
  children, className = '', glow = false,
}: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_6px_28px_rgba(74, 8, 16,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B41D24]/40 hover:shadow-[0_16px_48px_rgba(124, 20, 24,0.16)] ${className}`}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(180, 29, 36,0.1), transparent 60%)' }} />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────────────

export function MagneticButton({
  children, href, variant = 'primary', className = '',
}: { children: React.ReactNode; href: string; variant?: 'primary' | 'ghost'; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 15 })
  const y = useSpring(my, { stiffness: 220, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => { mx.set(0); my.set(0) }

  const base = 'relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide overflow-hidden transition-shadow duration-300'
  const styles = variant === 'primary'
    ? 'text-white shadow-[0_8px_28px_rgba(180, 29, 36,0.35)] hover:shadow-[0_12px_40px_rgba(180, 29, 36,0.5)]'
    : 'text-[#FFFFFF] border-2 border-white/20 hover:border-[#7C1418]/60 hover:text-[#7C1418] backdrop-blur-sm transition-colors'

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#7C1418] to-[#B41D24]" />
      )}
      <span className="relative">{children}</span>
    </motion.a>
  )
}

// ─── Heading ──────────────────────────────────────────────────────────────────

export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display font-bold tracking-tight text-[#FFFFFF] ${className}`}>
      {children}
    </h2>
  )
}

// Tracks pointer for GlassCard glow follow
export function useGlow() {
  const [, force] = useState(0)
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    force(n => n)
  }
  return onMove
}
