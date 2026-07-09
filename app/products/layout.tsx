import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, servicesItemListSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'AI Systems & Products',
  description:
    'Explore the six productized AI systems from Xevaro Labs: AI automation, AI agents & voice, lead generation, high conversion websites, Shopify commerce, and business intelligence.',
  path: '/products',
  keywords: [
    'AI systems',
    'productized AI',
    'AI agents',
    'business intelligence dashboards',
    'Shopify AI',
  ],
})

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ]),
          servicesItemListSchema(),
        ]}
      />
      {children}
    </>
  )
}
