import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Never Miss Another Job, AI Missed Call Text Back',
  description:
    'For local service businesses: AI that texts every missed call back in 60 seconds, answers questions, and books the job, done for you and live in about a week. Stop losing jobs to the contractor who called back first.',
  path: '/never-miss-a-lead',
  keywords: [
    'missed call text back',
    'AI answering service for contractors',
    'lead follow up automation',
    'AI booking assistant for home services',
    'speed to lead',
  ],
})

// Page-specific FAQ, answer first, matches what a service business owner asks
// before buying, and doubles as FAQPage structured data for AI/answer engines.
const LP_FAQS = [
  {
    q: 'What is missed call text back?',
    a: 'Missed call text back automatically sends a text message to any caller you could not answer, within seconds. Instead of losing the lead to the next contractor, an AI assistant replies, answers their questions, and books the job onto your calendar, 24/7, even after hours.',
  },
  {
    q: 'How fast does it respond to a new lead?',
    a: 'Within about 60 seconds. Speed matters: most customers hire the business that responds first, and a lead becomes far harder to reach just five minutes after they reach out. The system replies instantly so you win the job before a competitor even sees it.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most systems are built, connected to your phone and tools, and live in about a week. It is fully done for you, Xevaro Labs handles the setup so you keep running your business.',
  },
  {
    q: 'Which businesses is this for?',
    a: 'Local service businesses that rely on the phone and lose leads when they cannot pick up, roofers, plumbers, HVAC, electricians, cleaners, landscapers, contractors, and other home service trades.',
  },
]

export default function NeverMissALeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Never Miss a Lead', path: '/never-miss-a-lead' },
          ]),
          faqSchema(LP_FAQS),
        ]}
      />
      {children}
    </>
  )
}
