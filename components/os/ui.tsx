'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Reveal-on-scroll wrapper ─────────────────────────────────────────────────

export function Reveal({
  children, delay = 0, y = 30, className = '',
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
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
      <span className="h-1.5 w-1.5 rounded-full bg-[#00D6FF] shadow-[0_0_10px_rgba(0,214,255,0.9)]" />
      <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">{children}</span>
    </div>
  )
}

// ─── Glass card ───────────────────────────────────────────────────────────────

export function GlassCard({
  children, className = '', glow = false,
}: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:border-[#00D6FF]/40 ${className}`}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(0,214,255,0.08), transparent 60%)' }} />
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
  const x = useSpring(mx, { stiffness: 250, damping: 18 })
  const y = useSpring(my, { stiffness: 250, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => { mx.set(0); my.set(0) }

  const base = 'relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide overflow-hidden'
  const styles = variant === 'primary'
    ? 'text-white'
    : 'text-white/75 border border-white/15 hover:border-white/40 hover:text-white backdrop-blur-sm transition-colors'

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles} ${className}`}
    >
      {variant === 'primary' && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF]" />
          <span className="absolute inset-0 opacity-0 shadow-[0_0_36px_rgba(0,214,255,0.55)] transition-opacity duration-300 hover:opacity-100" />
        </>
      )}
      <span className="relative">{children}</span>
    </motion.a>
  )
}

// ─── Gradient heading ─────────────────────────────────────────────────────────

export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display font-bold tracking-tight text-white/90 [text-shadow:0_2px_40px_rgba(0,0,0,0.5)] ${className}`}>
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
