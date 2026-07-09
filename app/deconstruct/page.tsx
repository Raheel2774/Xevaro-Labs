'use client'

import { useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Navbar from '@/components/keyboard/Navbar'
import ScrollSequence from '@/components/keyboard/ScrollSequence'
import StoryBeats from '@/components/keyboard/StoryBeats'

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef  = useRef(0)

  // Master scroll progress over the tall pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Mirror into a plain ref for the canvas rAF loop (avoids React re-renders)
  useMotionValueEvent(scrollYProgress, 'change', (v) => { progressRef.current = v })

  return (
    <main className="relative bg-[#050505] text-white">
      <Navbar />

      {/* Ambient radial glow behind everything */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, #07091a 0%, #050505 70%)' }}
      />

      {/* Storytelling text, fixed, driven by master progress */}
      <StoryBeats progress={scrollYProgress} />

      {/* Tall scroll driver with sticky canvas */}
      <section ref={containerRef} id="hero" className="relative z-10 h-[600vh]">
        <ScrollSequence progressRef={progressRef} />
      </section>

      {/* Specs / footer coda */}
      <Coda />
    </main>
  )
}

function Coda() {
  const specs = [
    ['Workflows automated', '100+'],
    ['Avg. ops time saved', '80%'],
    ['Client retention', '95%'],
    ['Revenue unlocked', '$2M+'],
  ]
  return (
    <section id="case-studies" className="relative z-10 border-t border-white/[0.06] bg-[#0A0A0C] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">Proven in production</span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white/90 md:text-6xl">
            Engineered for the<br />enterprise that never stops.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.05] md:grid-cols-4">
          {specs.map(([label, value]) => (
            <div key={label} className="bg-[#050505] p-8 md:p-10">
              <div className="bg-gradient-to-br from-white to-[#E0A86A] bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">
                {value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wide text-white/40">{label}</div>
            </div>
          ))}
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
          <span className="font-display font-medium tracking-tight text-white/70">Xevaro Labs</span>
          <span className="text-sm text-white/30">© 2026 · xevarolabs.com · Command the autonomous enterprise.</span>
          <a href="mailto:raheelchaudary774@gmail.com" className="text-sm text-white/50 transition-colors hover:text-white">
            raheelchaudary774@gmail.com
          </a>
        </footer>
      </div>
    </section>
  )
}
