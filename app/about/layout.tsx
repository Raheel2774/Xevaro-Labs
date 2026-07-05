import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About Xevaro Labs',
  description:
    'Xevaro Labs is an AI automation agency founded in 2023. We deconstruct, optimize, and automate business operations into self-running systems that clients own and that improve over time.',
  path: '/about',
  keywords: ['about Xevaro Labs', 'AI automation agency', 'automation company'],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      {children}
    </>
  )
}
