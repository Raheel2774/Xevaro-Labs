import type { Metadata } from 'next'
import './globals.css'
import OSShell from '@/components/os/OSShell'

export const metadata: Metadata = {
  title: 'Xevaro Labs — Command the Autonomous Enterprise',
  description:
    'Xevaro Labs translates complex operations into flawless, zero-friction automated infrastructure. Custom AI agents, orchestrator loops, and enterprise automation. One keystroke ahead.',
  keywords: [
    'AI automation',
    'n8n workflows',
    'AI agents',
    'Shopify development',
    'SaaS development',
    'CRM automation',
    'web development agency',
  ],
  authors: [{ name: 'Xevaro Labs', url: 'https://xevarolabs.com' }],
  openGraph: {
    title: 'Xevaro Labs — AI Automation Agency',
    description: 'We build AI systems that scale businesses.',
    url: 'https://xevarolabs.com',
    siteName: 'Xevaro Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xevaro Labs — AI Automation Agency',
    description: 'We build AI systems that scale businesses.',
  },
  metadataBase: new URL('https://xevarolabs.com'),
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
      </head>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        <OSShell>{children}</OSShell>
      </body>
    </html>
  )
}
