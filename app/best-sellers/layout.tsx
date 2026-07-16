import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, SITE } from '@/lib/seo'
import { BEST_SELLERS } from '@/lib/os'

export const metadata: Metadata = pageMeta({
  title: 'Best Selling AI Products',
  description:
    'The 6 best selling AI products from Xevaro Labs: AI Human Resources, Business Assistant, Lead Generation, Appointment Recovery, Voice Agent and Content Generation. Deployed in 48 hours with clear monthly pricing.',
  path: '/best-sellers',
  keywords: [
    'best AI products',
    'best selling AI agents',
    'AI human resources',
    'AI business assistant',
    'AI lead generation',
    'AI voice agent',
    'top AI products for business',
  ],
})

function bestSellersItemListSchema() {
  const ORG_ID = `${SITE.url}/#organization`
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Xevaro Labs Best Selling AI Products',
    numberOfItems: BEST_SELLERS.length,
    itemListElement: BEST_SELLERS.map((p) => ({
      '@type': 'ListItem',
      position: p.bestSellerRank,
      item: {
        '@type': 'Service',
        name: p.name,
        serviceType: 'AI Product',
        description: `${p.tagline}. ${p.description}`,
        offers: {
          '@type': 'Offer',
          price: p.monthlyPrice,
          priceCurrency: 'USD',
        },
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
      },
    })),
  }
}

export default function BestSellersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Best Sellers', path: '/best-sellers' },
          ]),
          bestSellersItemListSchema(),
        ]}
      />
      {children}
    </>
  )
}
