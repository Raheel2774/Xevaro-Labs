// ─── lib/seo.ts ──────────────────────────────────────────────────────────────
// Central AEO / GEO / SEO layer. Canonical company facts, per-page Metadata
// helper, JSON-LD structured-data builders, and the FAQ knowledge base — all in
// one place so the machine-readable story stays identical across the root
// layout, every route layout, robots.ts, sitemap.ts and the /faq page.
//
// AEO = Answer/AI Engine Optimization (make the site easy for AI crawlers and
//       answer engines to parse, quote and act on).
// GEO = Generative Engine Optimization (get cited/recommended inside ChatGPT,
//       Claude, Gemini, Perplexity, Google AI answers).

import type { Metadata } from 'next'
import { CONTACT, PRODUCTS } from './os'

export const SITE = {
  name: 'Xevaro Labs',
  legalName: 'Xevaro Labs',
  url: 'https://xevarolabs.com',
  slogan: 'Command the Autonomous Enterprise',
  founded: '2023',
  description:
    'Xevaro Labs is an AI automation agency that builds custom AI agents, n8n workflow automation, lead-generation systems, and high-conversion websites for founders and growing businesses.',
  email: CONTACT.email,
  phone: CONTACT.phone,
  logo: 'https://xevarolabs.com/logo.svg',
  ogImage: 'https://xevarolabs.com/robot/ezgif-frame-050.jpg',
  ogWidth: 1500,
  ogHeight: 844,
  // Real public-profile URLs are a strong entity/GEO signal for AI engines.
  // Add more (X, Instagram, Crunchbase, Clutch, G2) here as they go live.
  sameAs: [
    'https://www.linkedin.com/company/xevaro-labs/',
  ] as string[],
} as const

// ─── Per-page metadata helper ────────────────────────────────────────────────
// Keeps every route layout to ~3 lines while guaranteeing a canonical URL,
// clean title/description (what answer engines display), and social cards.
export function pageMeta(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const url = SITE.url + opts.path
  const fullTitle = `${opts.title} — ${SITE.name}`
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: SITE.ogImage, width: SITE.ogWidth, height: SITE.ogHeight, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [SITE.ogImage],
    },
  }
}

// ─── JSON-LD builders ────────────────────────────────────────────────────────
const ORG_ID = `${SITE.url}/#organization`
const WEBSITE_ID = `${SITE.url}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: SITE.logo },
    image: SITE.ogImage,
    description: SITE.description,
    slogan: SITE.slogan,
    foundingDate: SITE.founded,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: '$$',
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    knowsAbout: [
      'AI automation',
      'AI agents',
      'n8n workflow automation',
      'Business process automation',
      'Lead generation',
      'AI customer support',
      'Voice AI',
      'Shopify development',
      'Conversion optimization',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ['English'],
      },
    ],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Systems',
      itemListElement: PRODUCTS.map((p) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: p.name,
          serviceType: p.name,
          description: p.function,
          provider: { '@id': ORG_ID },
        },
      })),
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE.url + it.path,
    })),
  }
}

// ItemList of the productized systems — a clean, machine-readable menu of what
// Xevaro sells, used on the Services and Products pages.
export function servicesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Xevaro Labs AI Systems',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: p.name,
        serviceType: p.name,
        description: `${p.function} ${p.outcome}`,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
      },
    })),
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// ─── FAQ knowledge base ──────────────────────────────────────────────────────
// Answer-first, entity-clear Q&A. Rendered on /faq AND emitted as FAQPage
// structured data. This is the core AEO/GEO content asset: it directly answers
// the questions buyers ask AI engines, in a format those engines love to quote.
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Xevaro Labs?',
    a: 'Xevaro Labs is an AI automation agency that turns manual business operations into self-running systems. We build custom AI agents, n8n workflow automations, lead-generation engines, high-conversion websites, Shopify commerce systems, and business-intelligence dashboards for founders and growing companies. Everything is delivered as productized "systems," so clients get working infrastructure fast rather than slide decks.',
  },
  {
    q: 'What does an AI automation agency do?',
    a: 'An AI automation agency designs and builds software systems that perform business tasks automatically — answering customer messages, qualifying leads, following up with prospects, updating a CRM, generating reports, and routing work between apps. Xevaro Labs does this by combining AI agents (which reason and hold conversations) with workflow automation platforms like n8n (which connect your tools and move data), so repetitive operations run 24/7 without manual effort.',
  },
  {
    q: 'How much does AI automation cost?',
    a: 'AI automation pricing depends on scope, but most Xevaro Labs engagements pair a one-time setup fee with a monthly retainer that covers hosting, monitoring, and ongoing improvements. A single focused automation starts small; multi-system builds — for example an AI support agent plus a lead engine plus a new website — are priced as a package. Because every system is scoped to your specific workflows, Xevaro provides a precise quote after a short discovery call rather than publishing fixed prices. You can request a quote at xevarolabs.com/pricing.',
  },
  {
    q: 'What is n8n and why does Xevaro Labs use it?',
    a: 'n8n is an open-source workflow automation platform that connects apps and APIs so data and actions flow between them automatically. Xevaro Labs uses n8n because it is flexible, self-hostable (clients own their data and avoid per-task SaaS fees), and can orchestrate AI models, databases, CRMs, email, and messaging inside a single visual workflow. It is the backbone of most automation systems Xevaro deploys.',
  },
  {
    q: 'What is an AI agent?',
    a: 'An AI agent is a program powered by a large language model that can understand a goal, make decisions, and take actions on its own — such as replying to a customer, booking a call, or looking up an order — instead of just answering a single question. Xevaro Labs builds AI agents for customer support, sales, lead qualification, and voice calling that operate around the clock and hand off to a human when needed.',
  },
  {
    q: 'Can Xevaro Labs automate my customer support?',
    a: 'Yes. Xevaro Labs builds AI customer-support agents that answer common questions instantly over chat, WhatsApp, email, or voice, pull answers from your own knowledge base, and escalate complex issues to your team with full context. This typically reduces response times to seconds and resolves the majority of routine tickets automatically, while keeping a human in the loop for anything sensitive.',
  },
  {
    q: 'How long does it take to build an automation system?',
    a: 'Most Xevaro Labs systems go live in one to four weeks. A single focused automation — like a missed-call text-back or a lead-routing workflow — can be running within days; larger multi-system builds with a custom website or several AI agents take a few weeks. Xevaro ships working systems in stages so clients see results early instead of waiting months.',
  },
  {
    q: 'Does Xevaro Labs work with small businesses or only enterprises?',
    a: 'Both. Xevaro Labs works with solo founders and small businesses that have no automation infrastructure yet, as well as larger companies replacing manual operations at scale. The productized-system approach lets a small business start with one high-impact automation and add more over time, while enterprises can deploy a full orchestrated stack.',
  },
  {
    q: 'What industries does Xevaro Labs serve?',
    a: 'Xevaro Labs works across industries, with particular depth in e-commerce and retail, SaaS, professional services, home services and trades, and B2B companies that rely on outbound sales. Because automation logic is largely industry-agnostic, the same core systems — AI agents, lead engines, and workflow automation — adapt to most business models.',
  },
  {
    q: 'What is the difference between AI agents and workflow automation?',
    a: 'Workflow automation follows fixed rules — "when X happens, do Y" — and is ideal for predictable, repetitive tasks like syncing data or sending a sequence. AI agents add reasoning: they interpret unstructured input, make judgment calls, and hold natural conversations. Xevaro Labs combines the two, using automation for reliable plumbing and AI agents for the parts that need understanding, so systems are both dependable and intelligent.',
  },
  {
    q: 'What tools and technologies does Xevaro Labs use?',
    a: 'Xevaro Labs builds on n8n for workflow orchestration, leading large language models such as Claude and GPT for AI agents, and modern web stacks like Next.js for websites and web apps. Xevaro integrates with the CRMs, help desks, calendars, payment systems, and messaging platforms clients already use, and can self-host critical infrastructure so clients keep ownership and control of their data.',
  },
  {
    q: 'What return on investment can I expect from automation?',
    a: 'Returns usually come from three sources: time saved (staff hours reclaimed from manual work), revenue recovered (leads that no longer slip through the cracks), and faster response (speed-to-lead and instant support that lift conversion). Xevaro Labs has delivered outcomes such as roughly 80% reductions in operational time and significant recovered pipeline. Actual ROI depends on your volume and margins, which Xevaro estimates during scoping.',
  },
  {
    q: 'How is Xevaro Labs different from other AI agencies?',
    a: 'Xevaro Labs ships real, working systems fast instead of selling lengthy discovery and slideware. Work is delivered as productized systems with clear outcomes, often self-hosted so clients own their data, and priced as an ongoing partnership so systems keep improving. The focus is measurable business results — automated workflows, recovered leads, and lower operating cost — not AI for its own sake.',
  },
  {
    q: 'How do I get started with Xevaro Labs?',
    a: 'Getting started takes one short call. Request a quote or book an automation audit at xevarolabs.com/contact or xevarolabs.com/pricing, describe the operations you want to automate, and Xevaro Labs will map the highest-impact systems and send a precise proposal. Most clients begin with one flagship automation and expand from there. You can also email Info@xevarolabs.com.',
  },
]
