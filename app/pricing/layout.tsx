import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Pricing',
  description:
    'Xevaro Labs pricing is custom and scoped to your workflows, a one time setup fee plus a monthly retainer. Request a precise quote for AI automation, AI agents, or a new website.',
  path: '/pricing',
  keywords: ['AI automation pricing', 'AI agency cost', 'automation retainer'],
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
      {children}
    </>
  )
}
