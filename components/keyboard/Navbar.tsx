'use client'

import { useEffect, useState } from 'react'

const links = ['Solutions', 'The Engine', 'Integrations', 'Case Studies']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,5,5,0.75)] backdrop-blur-xl border-b border-white/[0.06] opacity-100'
          : 'bg-transparent border-b border-transparent opacity-90'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Left: logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="relative h-4 w-4 rounded-[3px] bg-gradient-to-br from-[#760115] to-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.4)] group-hover:scale-110 transition-transform" />
          <span className="font-display text-[15px] font-medium tracking-tight text-white/90">Xevaro Labs</span>
        </a>

        {/* Center: links */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[13px] font-medium text-white/55 hover:text-white/90 transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <a
          href="#cta"
          className="group relative inline-flex items-center rounded-full px-4 py-1.5 text-[13px] font-semibold text-white"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#760115] to-[#FF3B30] opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,59,48,0.35)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative hidden sm:inline">Deploy Multi-Agent Systems</span>
          <span className="relative sm:hidden">Deploy</span>
        </a>
      </nav>
    </header>
  )
}
