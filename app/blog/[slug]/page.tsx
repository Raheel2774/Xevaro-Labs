import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSTS, getPost } from '@/lib/blog'
import { pageMeta, breadcrumbSchema, articleSchema, faqSchema } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ArticleBody from '@/components/blog/ArticleBody'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
  })
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    articleSchema(post),
    ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
  ]

  return (
    <>
      <JsonLd data={schema} />

      <article className="relative px-6 pb-24 pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="font-mono text-xs uppercase tracking-widest text-[#FFFFFF]/55 transition-colors hover:text-[#B41D24]">
            ← All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-[#FFFFFF]/55">
            <span className="text-[#B41D24]">{post.category}</span>
            <span>·</span>
            <span>{fmt(post.date)}</span>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[#FFFFFF]/90 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg font-light leading-relaxed text-[#FFFFFF]/65">{post.description}</p>

          <ArticleBody blocks={post.body} />

          {post.faqs?.length ? (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-[#FFFFFF]/90 md:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {post.faqs.map((f, i) => (
                  <div key={i} className="py-5">
                    <h3 className="font-display text-lg font-medium text-[#FFFFFF]/85">{f.q}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#FFFFFF]/60">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/55 p-8 text-center backdrop-blur-xl">
            <h2 className="font-display text-2xl font-semibold text-[#FFFFFF]/90">Want this built for your business?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#FFFFFF]/60">
              Tell us your biggest manual bottleneck and we&apos;ll map the highest impact system to automate it.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-[#FFFFFF]">
                <span className="absolute inset-0 bg-gradient-to-r from-[#7C1418] to-[#B41D24]" />
                <span className="relative">Book an automation audit</span>
              </Link>
              <Link href="/services" className="text-sm text-[#FFFFFF]/60 transition-colors hover:text-[#B41D24]">Explore our systems →</Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
