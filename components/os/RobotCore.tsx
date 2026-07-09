'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FRAME_COUNT, ROBOT_STATES } from '@/lib/os'

const framePath = (i: number) => `/robot/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

/**
 * Persistent robotic AI "brain" rendered behind the entire OS.
 * - Preloads the 150-frame sequence once (shared across route changes).
 * - Each route selects a frame window (ROBOT_STATES); scroll interpolates it.
 * - Eased every rAF for buttery, flicker free transformation.
 * - Pauses when tab hidden; mobile shows a single static frame (no scroll cost).
 */
export default function RobotCore() {
  const pathname = usePathname()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const images    = useRef<HTMLImageElement[]>([])
  const current   = useRef(1)
  const target    = useRef(1)
  const range     = useRef(ROBOT_STATES['/'])
  const [ready, setReady]   = useState(false)
  const [mobile, setMobile] = useState(false)
  const visible   = useRef(true)

  // Track active route window
  useEffect(() => {
    range.current = ROBOT_STATES[pathname] ?? ROBOT_STATES['/']
  }, [pathname])

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  // Preload sequence
  useEffect(() => {
    let cancelled = false
    let count = 0
    const imgs: HTMLImageElement[] = []
    const total = mobile ? 1 : FRAME_COUNT
    for (let i = 1; i <= FRAME_COUNT; i++) {
      // On mobile, only load a representative frame to save bandwidth
      if (mobile && i !== 1) { imgs[i - 1] = imgs[0]; continue }
      const img = new Image()
      img.src = framePath(i)
      img.onload = img.onerror = () => {
        if (cancelled) return
        count++
        if (count >= total) setReady(true)
      }
      imgs[i - 1] = img
    }
    images.current = imgs
    return () => { cancelled = true }
  }, [mobile])

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width  = Math.floor(window.innerWidth  * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Visibility pause
  useEffect(() => {
    const onVis = () => { visible.current = !document.hidden }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let raf: number
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible.current) return

      const { start, end } = range.current
      // Scroll progress within current page
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const p = docH > 0 ? Math.min(Math.max(window.scrollY / docH, 0), 1) : 0
      target.current = start + (end - start) * p

      // Ease toward target frame
      current.current += (target.current - current.current) * (mobile ? 1 : 0.1)
      const idx = Math.round(Math.min(Math.max(current.current, 1), FRAME_COUNT))
      const img = mobile ? images.current[0] : images.current[idx - 1]

      if (img && img.complete && img.naturalWidth) {
        const cw = canvas.width, ch = canvas.height
        const ir = img.naturalWidth / img.naturalHeight
        const cr = cw / ch
        let dw = cw, dh = ch, dx = 0, dy = 0
        if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2 }
        else         { dw = cw; dh = cw / ir; dy = (ch - dh) / 2 }
        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, cw, ch)
        ctx.drawImage(img, dx, dy, dw, dh)
      }
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [mobile])

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Legibility + brand grade: darken and cool-tint the cinematic plate */}
      <div className="absolute inset-0" style={{
        background:
          'linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,7,0.55) 35%, rgba(5,5,10,0.78) 100%)',
      }} />
      <div className="absolute inset-0 mix-blend-color" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,80,255,0.18), transparent 70%)',
      }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(3,3,8,0.65) 100%)',
      }} />
      {/* Scanline texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
      }} />
      {!ready && <div className="absolute inset-0 bg-[#050505]" />}
    </div>
  )
}
