'use client'

import { Reveal, Eyebrow, H2, MagneticButton, GlassCard } from '@/components/os/ui'
import { CONTACT } from '@/lib/os'

// ─── Ad matched landing page ─────────────────────────────────────────────────
// Message matches the Reddit "missed call" campaign for local service
// businesses (roofers, plumbers, HVAC, electricians). Every headline here
// echoes the ad promise: answer + text back in 60 seconds + book the job.

const STEPS = [
  {
    n: '01',
    title: 'A lead calls or fills out a form',
    body: 'Missed calls, web forms, Google, Facebook, every new lead is captured the second it comes in, no matter where you are.',
  },
  {
    n: '02',
    title: 'AI texts back in 60 seconds',
    body: 'An AI assistant instantly replies by text, answers their questions, qualifies the job, and books the estimate straight onto your calendar, 24/7.',
  },
  {
    n: '03',
    title: 'You show up and close',
    body: 'You get a booked appointment with all the details. Follow ups, reminders, and review requests run on autopilot so nothing slips.',
  },
]

const INCLUDED = [
  { title: 'Missed call text back', body: 'Every unanswered call gets an instant text so the lead never calls your competitor next.' },
  { title: 'AI booking assistant', body: 'Answers, qualifies, and books jobs by text or chat around the clock, even at 2am.' },
  { title: 'Speed to lead follow up', body: 'Automated sequences chase every new lead until they book or reply. No more “I forgot to call them back.”' },
  { title: 'Calendar + reminders', body: 'Appointments land on your calendar with automatic reminders that cut no shows.' },
  { title: 'Review requests', body: 'Happy customers get an automatic ask for a Google review, more 5-stars, more inbound calls.' },
  { title: 'Done for you setup', body: 'We build, connect, and launch the whole system for you in about a week. You keep running your business.' },
]

export default function NeverMissALeadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow>For Local Service Businesses</Eyebrow></div></Reveal>
          <Reveal delay={0.05}>
            <H2 className="text-5xl md:text-7xl">Never miss<br />another job.</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
              You&apos;re on a roof, under a sink, or on the road, and the phone rings. When you can&apos;t pick up,
              that lead calls the next contractor. We install the AI that <span className="text-white/80">texts every
              missed call back in 60 seconds</span>, answers questions, and books the job for you. Done for you, live in about a week.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Get the missed call system</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-white/50 transition-colors hover:text-[#E53E3E]">
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The cost of a missed call */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {[
            { stat: '78%', label: 'of customers buy from the business that responds first.' },
            { stat: '5 min', label: 'after that, a lead is far less likely to ever answer.' },
            { stat: '1 job', label: 'a week recovered usually pays for the whole system.' },
          ].map((s, i) => (
            <Reveal key={s.stat} delay={i * 0.08}>
              <GlassCard className="h-full p-7 text-center">
                <div className="font-display text-4xl font-bold text-[#E53E3E] md:text-5xl">{s.stat}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{s.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow>How it works</Eyebrow></div></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">From missed call<br />to booked job.</H2></Reveal>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <GlassCard className="h-full p-7">
                <div className="font-mono text-xs tracking-[0.3em] text-[#E53E3E]/80">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white/90">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">{s.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="relative px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow>What&apos;s included</Eyebrow></div></Reveal>
          <Reveal delay={0.05}><H2 className="text-4xl md:text-6xl">Your 24/7 office,<br />without hiring one.</H2></Reveal>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {INCLUDED.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <GlassCard className="h-full p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#E53E3E] shadow-[0_0_10px_rgba(229,62,62,0.9)]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white/90">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/55">{c.body}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-24 text-center md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal><H2 className="text-4xl md:text-6xl">Stop losing jobs<br />to a ringing phone.</H2></Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-lg font-light text-white/55">
              Book a 15-minute call. We&apos;ll map exactly where leads are slipping through and set up the system that
              catches them, with nothing for you to manage.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact">Book my free lead audit</MagneticButton>
              <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-white/50 transition-colors hover:text-[#E53E3E]">
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
