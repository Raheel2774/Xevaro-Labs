'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 240
const EXPLODE_END = 0.82   // scroll fraction where full explode is reached
const framePath = (i: number) =>
  `/sequence/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

/**
 * Sticky full screen canvas that plays a 240-frame keyboard image sequence,
 * driven by scroll. 0 → EXPLODE_END maps assembled → fully exploded; the final
 * stretch reverses back toward assembled for the "reassembly" CTA beat.
 *
 * Frame index is eased (lerp) every rAF for buttery, flicker free playback.
 */
export default function ScrollSequence({ progressRef }: { progressRef: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const images    = useRef<HTMLImageElement[]>([])
  const current   = useRef(0)   // eased frame index (float)
  const target    = useRef(0)
  const [loaded, setLoaded]   = useState(0)
  const [ready, setReady]     = useState(false)

  // ── Preload frames ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    let count = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = img.onerror = () => {
        if (cancelled) return
        count++
        setLoaded(count)
        if (count === FRAME_COUNT) setReady(true)
      }
      imgs[i - 1] = img
    }
    images.current = imgs

    // Reveal as soon as the first frame is decodable
    imgs[0].decode?.().then(() => !cancelled && setReady(true)).catch(() => {})

    return () => { cancelled = true }
  }, [])

  // ── Canvas sizing (cover-fit, DPR-aware) ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.floor(window.innerWidth  * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width  = '100%'
      canvas.style.height = '100%'
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Draw loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let raf: number
    const draw = () => {
      const p = progressRef.current ?? 0

      // Ping-pong: explode 0→EXPLODE_END, reassemble EXPLODE_END→1
      let framePos: number
      if (p <= EXPLODE_END) {
        framePos = (p / EXPLODE_END) * (FRAME_COUNT - 1)
      } else {
        const back = (p - EXPLODE_END) / (1 - EXPLODE_END)
        framePos = (1 - back) * (FRAME_COUNT - 1)
      }
      target.current = framePos
      // ease toward target for smoothness
      current.current += (target.current - current.current) * 0.18

      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(current.current)))
      const img = images.current[idx]

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
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [progressRef])

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Loading veil */}
      {!ready && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050505]">
          <div className="font-display text-sm tracking-[0.4em] text-white/40 uppercase mb-5">Xevaro Labs</div>
          <div className="h-px w-48 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#760115] to-[#FF3B30] transition-[width] duration-200"
              style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-[11px] text-white/30">
            Initializing engine · {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        </div>
      )}
    </div>
  )
}
