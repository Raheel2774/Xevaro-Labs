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
        scrolled ? 'bg-[#E3E2DF]/85 backdrop-blur-xl border-b border-[#5D001E]/10 shadow-[0_4px_24px_rgba(93,0,30,0.06)]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-4 w-4 rounded-full bg-gradient-to-br from-[#9A1750] to-[#EE4C7C] shadow-[0_0_14px_rgba(238,76,124,0.45)]" />
          <span className={`font-display text-[15px] font-bold tracking-tight transition-colors ${scrolled ? 'text-[#5D001E]' : 'text-white'}`}>Xevaro Labs</span>
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
                  active
                    ? (scrolled ? 'text-[#9A1750]' : 'text-white')
                    : (scrolled ? 'text-[#5D001E]/60 hover:text-[#5D001E]' : 'text-white/70 hover:text-white')
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-[#E3AFBC]/50 border border-[#9A1750]/15" />
                )}
                <span className="relative">{label}</span>
              </Link>
            )
          })}
        </div>

        <Link
          href="/contact"
          className="group relative hidden sm:inline-flex items-center rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] shadow-[0_6px_20px_rgba(238,76,124,0.35)]" />
          <span className="relative">Deploy Systems</span>
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className={`h-0.5 w-5 rounded-full transition-transform ${scrolled || open ? 'bg-[#5D001E]' : 'bg-white'} ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full transition-transform ${scrolled || open ? 'bg-[#5D001E]' : 'bg-white'} ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#5D001E]/10 bg-[#E3E2DF]/97 backdrop-blur-xl px-5 py-4">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} className={`block py-3 text-base ${pathname === href ? 'text-[#EE4C7C] font-semibold' : 'text-[#5D001E]/75'}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
