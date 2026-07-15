'use client'

import Link from 'next/link'
import { NAV, LEGAL, CONTACT } from '@/lib/os'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#5D001E]/10 bg-[#5D001E] text-[#E3E2DF]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#EE4C7C] to-[#E3AFBC] shadow-[0_0_14px_rgba(238,76,124,0.5)]" />
              <span className="font-display text-lg font-bold tracking-tight text-white">Xevaro Labs</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#E3AFBC]/80">
              The AI Operating System for autonomous business. We deconstruct, optimize, and
              automate enterprise operations into self executing infrastructure.
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E3AFBC]/60">System</div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#E3E2DF]/70 transition-colors hover:text-[#EE4C7C]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E3AFBC]/60">Control Channel</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-[#E3E2DF]/85 transition-colors hover:text-[#EE4C7C]">{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="text-[#E3E2DF]/85 transition-colors hover:text-[#EE4C7C]">{CONTACT.phone}</a>
              </li>
              <li className="text-[#E3AFBC]/70">{CONTACT.site}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-[#E3AFBC]/60 transition-colors hover:text-[#EE4C7C]">{label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-[#E3AFBC]/50 md:flex-row md:items-center md:gap-4">
            <span>© 2026 Xevaro Labs · All systems operational</span>
            <span className="font-mono tracking-widest">XEVARO OS · v5.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
