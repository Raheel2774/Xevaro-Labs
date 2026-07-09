'use client'

import { INTEGRATIONS } from '@/lib/social'

// A premium "integrates with the tools you already use" proof strip.
// Renders the integration wordmarks in a seamless two-track marquee.
export default function ProofStrip() {
  const items = INTEGRATIONS.concat(INTEGRATIONS)
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          Built on the tools you already use
        </p>
        <div className="relative mt-7 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
            {items.map((name, i) => (
              <span key={i} className="whitespace-nowrap font-display text-xl font-semibold text-white/45 transition-colors hover:text-white/80">
                {name}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12" aria-hidden>
            {items.map((name, i) => (
              <span key={i} className="whitespace-nowrap font-display text-xl font-semibold text-white/45 transition-colors hover:text-white/80">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
