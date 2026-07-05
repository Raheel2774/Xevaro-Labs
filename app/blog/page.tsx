import type { Metadata } from 'next'
import Link from 'next/link'
import { POSTS } from '@/lib/blog'
import { pageMeta, breadcrumbSchema, blogListingSchema } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = pageMeta({
  title: 'AI Automation Blog',
  description:
    'Practical, answer-first guides on AI automation, AI agents, n8n, and lead systems from Xevaro Labs — how to automate the parts of your business that eat your week.',
  path: '/blog',
  keywords: ['AI automation blog', 'AI agents guide', 'n8n tutorials', 'business automation guides'],
})

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
          blogListingSchema(POSTS),
        ]}
      />

      <section className="relative px-6 pb-10 pt-40 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00D6FF]/80">Insights</span>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white/90 md:text-7xl">
            The automation<br />playbook.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
            Plain-English guides on AI agents, workflow automation, and the systems that quietly run a business — written to actually be useful.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block py-8">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-white/35">
                <span className="text-[#00D6FF]">{p.category}</span>
                <span>·</span>
                <span>{fmt(p.date)}</span>
                <span>·</span>
                <span>{p.readingMinutes} min read</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white/90 transition-colors group-hover:text-[#00D6FF] md:text-3xl">
                {p.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/55">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/40 transition-colors group-hover:text-[#00D6FF]">
                Read article <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
