import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, SITE } from '@/lib/seo'
import { FLAGSHIP_AGENTS } from '@/lib/agents'

export const metadata: Metadata = pageMeta({
  title: 'Best-Selling AI Agents',
  description:
    'The 5 best-selling AI agents from Xevaro Labs: Speed-to-Lead, AI Booking, 24/7 Support, Sales Follow-Up and Reputation. Battle-tested agents that capture leads, book appointments and close deals 24/7.',
  path: '/best-sellers',
  keywords: [
    'best AI agents',
    'best selling AI agents',
    'AI speed to lead',
    'AI booking agent',
    'AI sales follow up agent',
    'AI review agent',
    'top AI agents for business',
  ],
})

function flagshipItemListSchema() {
  const ORG_ID = `${SITE.url}/#organization`
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Xevaro Labs Best-Selling AI Agents',
    numberOfItems: FLAGSHIP_AGENTS.length,
    itemListElement: FLAGSHIP_AGENTS.map((a) => ({
      '@type': 'ListItem',
      position: a.rank,
      item: {
        '@type': 'Service',
        name: a.name,
        serviceType: 'AI Agent',
        description: `${a.tagline} ${a.problem}`,
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
          flagshipItemListSchema(),
        ]}
      />
      {children}
    </>
  )
}
