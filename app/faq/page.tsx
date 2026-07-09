'use client'

import { useState } from 'react'
import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'
import { FAQS } from '@/lib/seo'
import { CONTACT } from '@/lib/os'

export default function FaqPage() {
  // First item open by default; all answers stay mounted in the DOM (height is
  // animated, not conditionally rendered) so crawlers and AI engines read them.
  const [open, setOpen] = useState<number>(0)

  return (
    <>
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow>Knowledge Base</Eyebrow></div></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-5xl md:text-7xl">Questions,<br />answered.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
              Everything you might ask about AI automation, AI agents, timelines, pricing, and
              working with Xevaro Labs, in plain language.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={i}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={`font-display text-lg font-medium transition-colors md:text-xl ${isOpen ? 'text-white' : 'text-white/80'}`}>
                        {f.q}
                      </span>
                      <span
                        className={`relative mt-1 h-5 w-5 flex-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                        aria-hidden
                      >
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-[#00D6FF]" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-[#00D6FF]" />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-white/55">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal><H2 className="text-4xl md:text-6xl">Still have a question?</H2></Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-lg font-light text-white/55">
              Tell us what you want to automate and we&apos;ll map the highest impact system for your business.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book an Automation Audit</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-white/50 transition-colors hover:text-[#00D6FF]">
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
