import type { Metadata } from 'next'
import './globals.css'
import OSShell from '@/components/os/OSShell'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/Analytics'
import { SITE, organizationSchema, websiteSchema } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Xevaro Labs, Command the Autonomous Enterprise',
    template: '%s, Xevaro Labs',
  },
  description:
    'Xevaro Labs is an AI automation agency. We build custom AI agents, n8n workflow automation, lead generation systems, and high conversion websites that turn manual operations into self-running infrastructure.',
  applicationName: SITE.name,
  keywords: [
    'AI automation agency',
    'AI agents',
    'n8n workflow automation',
    'business process automation',
    'lead generation systems',
    'AI customer support',
    'Shopify development',
    'high conversion websites',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Xevaro Labs, AI Automation Agency',
    description:
      'We build AI agents, workflow automation, and lead systems that run your business on autopilot.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: SITE.ogImage, width: SITE.ogWidth, height: SITE.ogHeight, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xevaro Labs, AI Automation Agency',
    description:
      'We build AI agents, workflow automation, and lead systems that run your business on autopilot.',
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Global structured data, Organization + WebSite (AEO/GEO entity graph) */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="bg-[#000000] text-[#FFFFFF] antialiased overflow-x-hidden">
        <Analytics />
        <OSShell>{children}</OSShell>
      </body>
    </html>
  )
}
