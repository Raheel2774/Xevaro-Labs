'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/os'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[rgba(5,5,5,0.72)] backdrop-blur-xl border-b border-white/[0.07]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-4 w-4 rounded-[4px] bg-gradient-to-br from-[#0050FF] to-[#00D6FF] shadow-[0_0_14px_rgba(0,214,255,0.5)]" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-white/90">Xevaro Labs</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                  active ? 'text-white' : 'text-white/55 hover:text-white/90'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10 shadow-[0_0_18px_rgba(0,214,255,0.15)]" />
                )}
                <span className="relative">{label}</span>
              </Link>
            )
          })}
        </div>

        <Link
          href="/contact"
          className="group relative hidden sm:inline-flex items-center rounded-full px-4 py-1.5 text-[13px] font-semibold text-white"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_20px_rgba(0,214,255,0.4)] group-hover:opacity-100 transition-opacity" />
          <span className="relative">Deploy Systems</span>
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className={`h-px w-5 bg-white transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px w-5 bg-white transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/[0.07] bg-[rgba(5,5,5,0.95)] backdrop-blur-xl px-5 py-4">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} className={`block py-3 text-base ${pathname === href ? 'text-[#00D6FF]' : 'text-white/70'}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
