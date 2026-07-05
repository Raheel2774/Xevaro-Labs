import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'AI Automation FAQ',
  description:
    'Answers to common questions about AI automation, AI agents, n8n, pricing, timelines, ROI, and how to get started with Xevaro Labs.',
  path: '/faq',
  keywords: [
    'AI automation FAQ',
    'what is an AI agent',
    'how much does AI automation cost',
    'AI automation agency questions',
  ],
})

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          faqSchema(),
        ]}
      />
      {children}
    </>
  )
}
