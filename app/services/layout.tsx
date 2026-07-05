import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, servicesItemListSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'AI Automation Services',
  description:
    'Xevaro Labs builds AI automation, AI agents, lead-generation systems, high-conversion websites, Shopify commerce, and BI dashboards — productized systems that run your operations 24/7.',
  path: '/services',
  keywords: [
    'AI automation services',
    'AI agent development',
    'n8n automation agency',
    'workflow automation services',
    'lead generation systems',
  ],
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          servicesItemListSchema(),
        ]}
      />
      {children}
    </>
  )
}
