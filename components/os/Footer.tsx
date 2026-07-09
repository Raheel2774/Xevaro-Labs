'use client'

import Link from 'next/link'
import { NAV, LEGAL, CONTACT } from '@/lib/os'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-[rgba(8,8,12,0.6)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded-[4px] bg-gradient-to-br from-[#0050FF] to-[#00D6FF] shadow-[0_0_14px_rgba(0,214,255,0.5)]" />
              <span className="font-display text-lg font-semibold tracking-tight text-white/90">Xevaro Labs</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
              The AI Operating System for autonomous business. We deconstruct, optimize, and
              automate enterprise operations into self executing infrastructure.
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">System</div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/55 transition-colors hover:text-[#00D6FF]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">Control Channel</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-white/70 transition-colors hover:text-[#00D6FF]">{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="text-white/70 transition-colors hover:text-[#00D6FF]">{CONTACT.phone}</a>
              </li>
              <li className="text-white/45">{CONTACT.site}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-white/40 transition-colors hover:text-[#00D6FF]">{label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-white/30 md:flex-row md:items-center md:gap-4">
            <span>© 2026 Xevaro Labs · All systems operational</span>
            <span className="font-mono tracking-widest">XEVARO OS · v4.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
