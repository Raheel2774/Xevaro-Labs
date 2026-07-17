import { Eyebrow } from './ui'

export function LegalPage({
  title, updated, children,
}: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="relative px-6 pb-32 pt-40 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-4xl font-bold tracking-tight text-[#F4E9EC]/90 md:text-6xl [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">{title}</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#F4E9EC]/55">Last updated · {updated}</p>
        <div className="mt-12 space-y-10">{children}</div>
      </div>
    </section>
  )
}

export function Clause({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-[#F4E9EC]/90 md:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#F4E9EC]/60">{children}</div>
    </div>
  )
}
