import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Contact & Automation Audit',
  description:
    'Book an automation audit or request a quote from Xevaro Labs. Email Info@xevarolabs.com or call +1 251 910 6505 to start automating your operations.',
  path: '/contact',
  keywords: ['contact Xevaro Labs', 'book automation audit', 'AI automation consultation'],
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      {children}
    </>
  )
}
