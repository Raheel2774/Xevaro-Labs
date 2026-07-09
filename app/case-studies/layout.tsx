import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Case Studies & Results',
  description:
    'Real outcomes from Xevaro Labs AI systems, roughly 80% operational time saved, +340% revenue growth, 2.1x conversion, and $2M+ pipeline recovered across e-commerce, SaaS, and enterprise.',
  path: '/case-studies',
  keywords: ['AI automation case studies', 'automation ROI', 'AI agency results'],
})

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
        ])}
      />
      {children}
    </>
  )
}
