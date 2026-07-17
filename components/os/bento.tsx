'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion, useMotionValue, useSpring, useTransform,
  useInView, animate, MotionValue,
} from 'framer-motion'

export const SPRING = { type: 'spring', stiffness: 260, damping: 20 } as const
export const EASE = [0.34, 1.56, 0.64, 1] as const

// ─── Cursor-follow blob (global, sits behind content) ─────────────────────────

export function CursorBlob() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 220); y.set(e.clientY - 220) }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[440px] w-[440px] rounded-full bg-[#EE4C7C]/20 blur-[120px] md:block"
    />
  )
}

// ─── Tilt + spring bento card ─────────────────────────────────────────────────

export function BentoCard({
  children, className = '', tilt = true, accent = '#EE4C7C', delay = 0, href,
}: {
  children: React.ReactNode; className?: string; tilt?: boolean
  accent?: string; delay?: number; href?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), SPRING)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), SPRING)
  const glowX = useTransform(mx, v => `${v * 100}%`)
  const glowY = useTransform(my, v => `${v * 100}%`)
  const glowBg = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(340px circle at ${gx} ${gy}, ${accent}22, transparent 65%)`)

  const onMove = (e: React.MouseEvent) => {
    if (!tilt) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      whileHover={{ y: -6 }}
      style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_30px_rgba(93,0,30,0.07)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(154,23,80,0.2)] ${className}`}
    >
      {/* pointer glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBg }}
      />
      <div className="relative h-full" style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  )

  if (href) return <a href={href} className={`block h-full ${className ? '' : ''}`}>{inner}</a>
  return inner
}

// ─── Floating sticker (parallax bob) ──────────────────────────────────────────

export function Sticker({
  children, className = '', rotate = -6, float = true,
}: { children: React.ReactNode; className?: string; rotate?: number; float?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ ...SPRING, delay: 0.2 }}
      whileHover={{ scale: 1.12, rotate: rotate + 4 }}
      className={`${float ? 'animate-float' : ''} inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-[0_6px_18px_rgba(93,0,30,0.16)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ─── Count-up number ──────────────────────────────────────────────────────────

export function CountUp({
  value, suffix = '', prefix = '', className = '', duration = 1.4,
}: { value: number; suffix?: string; prefix?: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(v),
    })
    return controls.stop
  }, [inView, value, duration])

  const rounded = value % 1 === 0 ? Math.round(display) : display.toFixed(1)
  return <span ref={ref} className={className}>{prefix}{rounded.toLocaleString()}{suffix}</span>
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

export function Marquee({
  items, className = '', reverse = false, speed = 34,
}: { items: React.ReactNode[]; className?: string; reverse?: boolean; speed?: number }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {[0, 1].map(k => (
        <div
          key={k}
          aria-hidden={k === 1}
          className="flex shrink-0 items-center gap-4 pr-4"
          style={{ animation: `marquee ${speed}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {items.map((it, i) => (
            <span key={i} className={className}>{it}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Draggable chip cluster ───────────────────────────────────────────────────

export function DragChip({
  children, className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
      dragElastic={0.4}
      whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex cursor-grab select-none items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-[0_4px_14px_rgba(93,0,30,0.12)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ─── Reveal helper re-export style ────────────────────────────────────────────

export function Pop({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export type { MotionValue }
