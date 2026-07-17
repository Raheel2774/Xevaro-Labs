'use client'

import Link from 'next/link'
import { NAV, LEGAL, CONTACT } from '@/lib/os'

const ICON = 'h-4 w-4'

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/xevaro-labs/',
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/xevaro_labs/',
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61563330963890',
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Crunchbase',
    href: 'https://www.crunchbase.com/organization/xevaro-labs',
    icon: <span className="font-display text-[11px] font-bold leading-none">cb</span>,
  },
  {
    label: 'Clutch',
    href: 'https://clutch.co/profile/xevarolabs',
    icon: <span className="font-display text-[13px] font-bold leading-none">C</span>,
  },
  {
    label: 'Reddit (founder)',
    href: 'https://www.reddit.com/user/Secure-Square-8066/',
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black text-[#E3E2DF]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#B41D24] to-[#E2A5A5] shadow-[0_0_14px_rgba(180, 29, 36,0.5)]" />
              <span className="font-display text-lg font-bold tracking-tight text-white">Xevaro Labs</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#E2A5A5]/80">
              The AI Operating System for autonomous business. We deconstruct, optimize, and
              automate enterprise operations into self executing infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#B41D24] hover:bg-[#B41D24] hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E2A5A5]/60">System</div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#E3E2DF]/70 transition-colors hover:text-[#B41D24]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E2A5A5]/60">Control Channel</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-[#E3E2DF]/85 transition-colors hover:text-[#B41D24]">{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="text-[#E3E2DF]/85 transition-colors hover:text-[#B41D24]">{CONTACT.phone}</a>
              </li>
              <li className="text-[#E2A5A5]/70">{CONTACT.site}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-[#E2A5A5]/60 transition-colors hover:text-[#B41D24]">{label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-[#E2A5A5]/50 md:flex-row md:items-center md:gap-4">
            <span>© 2026 Xevaro Labs · All systems operational</span>
            <span className="font-mono tracking-widest">XEVARO OS · v5.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
