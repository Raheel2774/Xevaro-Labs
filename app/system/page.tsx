'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Overlay from '@/components/ui/Overlay'
import SmoothScroll from '@/components/ui/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'

const Experience = dynamic(() => import('@/components/3d/Experience'), { ssr: false })

export default function Page() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <SmoothScroll>
      <div className="custom-cursor-active contents">
      <CustomCursor />

      {/* Fixed full-screen 3D canvas */}
      <Experience scrollProgress={scrollProgress} />

      {/* Subtle vignette + grain over the canvas for depth */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,0,0,0.55) 100%)',
      }} />

      {/* Scrollable 2D overlay */}
      <div className="relative z-10">
        <Overlay scrollProgress={scrollProgress} />
      </div>
      </div>
    </SmoothScroll>
  )
}
