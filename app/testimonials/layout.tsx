import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, SITE } from '@/lib/seo'
import { TESTIMONIALS } from '@/lib/social'

export const metadata: Metadata = pageMeta({
  title: 'Client Testimonials',
  description:
    'Real results from businesses running Xevaro Labs AI agents and automation systems. Owners, founders and operators share the outcomes they measured, from more booked jobs to fewer no shows.',
  path: '/testimonials',
  keywords: [
    'Xevaro Labs reviews',
    'AI automation testimonials',
    'AI agent client results',
    'automation agency reviews',
  ],
})

// Review structured data helps AI engines surface real client sentiment.
function reviewsSchema() {
  const ORG_ID = `${SITE.url}/#organization`
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Xevaro Labs Client Testimonials',
    itemListElement: TESTIMONIALS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: t.quote,
        author: { '@type': 'Person', name: t.name },
        itemReviewed: { '@id': ORG_ID },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    })),
  }
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Testimonials', path: '/testimonials' },
          ]),
          reviewsSchema(),
        ]}
      />
      {children}
    </>
  )
}
