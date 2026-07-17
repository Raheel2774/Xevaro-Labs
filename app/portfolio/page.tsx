import type { Metadata } from 'next'
import { Reveal, Eyebrow, H2, MagneticButton } from '@/components/os/ui'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected AI systems Xevaro Labs has shipped for real businesses, across hiring, lead generation, and voice, with the dashboards and numbers behind each.',
  alternates: { canonical: '/portfolio' },
}

const SLIDES = Array.from(
  { length: 10 },
  (_, i) => `/portfolio/slide-${String(i + 1).padStart(2, '0')}.jpg`,
)

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative px-6 pb-12 pt-40 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Client Portfolio &amp; Results</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <H2 className="max-w-4xl text-5xl md:text-7xl">
              Real businesses.
              <br />
              <span className="bg-gradient-to-r from-[#9A1750] to-[#EE4C7C] bg-clip-text text-transparent">
                Real AI systems.
              </span>
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light text-[#5D001E]/60">
              Five production systems across hiring, lead generation, and voice. Scroll the deck for
              the story behind each, or download the full portfolio as a PDF.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="/portfolio/Xevaro-Labs-Portfolio.pdf">
                Download the PDF
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost">
                Start a project
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Deck ── */}
      <section className="relative px-6 pb-28 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
          {SLIDES.map((src, i) => (
            <Reveal key={src} delay={i < 4 ? 0.04 * i : 0.05}>
              <figure className="relative overflow-hidden rounded-3xl border border-[#5D001E]/12 bg-[#120207] shadow-[0_36px_90px_-44px_rgba(93,0,30,0.55)]">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-[#5D001E]/70 px-3 py-1 font-display text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')} / 10
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Xevaro Labs portfolio, slide ${i + 1} of 10`}
                  className="block w-full"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
