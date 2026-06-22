'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const mouse   = useRef({ x: 0, y: 0 })
  const dot     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const [render, setRender] = useState({ dx: 0, dy: 0, rx: 0, ry: 0 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled]   = useState(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const markHover = () => setHovering(true)
    const clearHover = () => setHovering(false)
    const interactive = () => document.querySelectorAll('a, button, [data-cursor="hover"]')

    let els = interactive()
    els.forEach(el => {
      el.addEventListener('mouseenter', markHover)
      el.addEventListener('mouseleave', clearHover)
    })

    // Re-scan after mount for dynamically added elements
    const rescan = setInterval(() => {
      els.forEach(el => {
        el.removeEventListener('mouseenter', markHover)
        el.removeEventListener('mouseleave', clearHover)
      })
      els = interactive()
      els.forEach(el => {
        el.addEventListener('mouseenter', markHover)
        el.addEventListener('mouseleave', clearHover)
      })
    }, 2000)

    const lerp = (a: number, b: number, f: number) => a + (b - a) * f
    let raf: number
    const animate = () => {
      dot.current.x  = lerp(dot.current.x,  mouse.current.x, 0.35)
      dot.current.y  = lerp(dot.current.y,  mouse.current.y, 0.35)
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)
      setRender({ dx: dot.current.x, dy: dot.current.y, rx: ring.current.x, ry: ring.current.y })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearInterval(rescan)
      els.forEach(el => {
        el.removeEventListener('mouseenter', markHover)
        el.removeEventListener('mouseleave', clearHover)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        className="absolute rounded-full bg-[#E53E3E]"
        style={{
          width: 6, height: 6,
          transform: 'translate(-50%, -50%)',
          left: render.dx, top: render.dy,
          boxShadow: '0 0 12px rgba(229,62,62,0.9)',
        }}
      />
      <div
        className="absolute rounded-full border transition-[width,height,border-color] duration-300"
        style={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          borderColor: hovering ? 'rgba(229,62,62,0.8)' : 'rgba(196,30,30,0.4)',
          backgroundColor: hovering ? 'rgba(155,28,28,0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          left: render.rx, top: render.ry,
        }}
      />
    </div>
  )
}
