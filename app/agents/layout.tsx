import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, SITE } from '@/lib/seo'
import { NICHES, TOTAL_AGENTS } from '@/lib/agents'

export const metadata: Metadata = pageMeta({
  title: 'AI Agents for 25 Industries',
  description:
    `Browse ${TOTAL_AGENTS} deployable AI agents across 25 industries, booking, lead capture, follow up, support and reputation agents. Pick the agent you want and Xevaro Labs sets it up for you.`,
  path: '/agents',
  keywords: [
    'AI agents',
    'AI agents for business',
    'AI agent by industry',
    'AI booking agent',
    'AI lead generation agent',
    'AI customer support agent',
    'missed call text back',
  ],
})

// Machine-readable menu of every agent in the catalog (strong AEO/GEO signal).
function agentsItemListSchema() {
  const ORG_ID = `${SITE.url}/#organization`
  const items = NICHES.flatMap((niche) =>
    niche.agents.map((agent) => ({
      '@type': 'Service',
      name: agent.name,
      serviceType: 'AI Agent',
      description: `${agent.desc} ${agent.outcome}`,
      category: niche.name,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Place', name: 'Worldwide' },
    })),
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Xevaro Labs AI Agent Catalog',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  }
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI Agents', path: '/agents' },
          ]),
          agentsItemListSchema(),
        ]}
      />
      {children}
    </>
  )
}
