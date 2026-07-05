// ─── lib/blog.ts ─────────────────────────────────────────────────────────────
// Answer-first blog content, stored as typed blocks (no MDX dependency) and
// rendered server-side for maximum AEO/GEO. Each post carries its own metadata,
// keywords, and FAQ set (emitted as FAQPage schema on the article page).
//
// Inline markup supported inside text/items: **bold** and [label](/path or url).

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string          // ISO (published)
  updated?: string      // ISO (last modified)
  author: string
  readingMinutes: number
  category: string
  keywords: string[]
  body: Block[]
  faqs?: { q: string; a: string }[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'how-to-automate-customer-support-with-ai',
    title: 'How to Automate Customer Support with AI: A 2026 Guide',
    description:
      'A practical guide to automating customer support with AI — what to automate, the tools involved (AI agents + n8n), a step-by-step approach, and how to keep a human in the loop.',
    date: '2026-06-10',
    updated: '2026-07-06',
    author: 'Xevaro Labs',
    readingMinutes: 6,
    category: 'AI Agents',
    keywords: [
      'automate customer support with AI',
      'AI customer support',
      'AI support agent',
      'customer service automation',
      'n8n support automation',
    ],
    body: [
      { type: 'p', text: 'You automate customer support with AI by connecting an AI agent to your knowledge base and support channels, letting it answer common questions instantly, and routing anything complex or sensitive to a human. Done well, this resolves the majority of routine tickets in seconds — over chat, email, WhatsApp, or voice — while your team focuses on the conversations that actually need a person.' },
      { type: 'p', text: 'Here is exactly what that looks like, what to automate first, and how to avoid the common mistakes.' },

      { type: 'h2', text: 'What "AI customer support" actually means in 2026' },
      { type: 'p', text: 'Modern AI support is not the clunky decision-tree chatbot of a few years ago. An **AI support agent** is powered by a large language model, so it understands a customer\'s question in natural language, looks up the answer in *your* documentation and order data, and replies like a helpful human — or takes an action, like checking an order status or booking an appointment.' },
      { type: 'p', text: 'The two building blocks are:' },
      { type: 'ul', items: [
        '**The AI agent** — the reasoning layer that reads the message, decides what to do, and writes the response.',
        '**Workflow automation** (for example [n8n](/services)) — the plumbing that connects the agent to your help desk, CRM, knowledge base, and messaging channels, and moves data between them.',
      ] },

      { type: 'h2', text: 'What to automate first (and what to leave alone)' },
      { type: 'p', text: 'Start with the tickets that are **high-volume and rule-based** — they give the fastest return and the lowest risk:' },
      { type: 'ul', items: [
        'Frequently asked questions (hours, pricing, policies, "where is my order?").',
        'Status lookups (order, shipping, account) that pull from a system you already have.',
        'Triage and routing — classifying an incoming message and sending it to the right person with context attached.',
        'After-hours coverage — instant first responses when your team is offline.',
      ] },
      { type: 'p', text: 'Keep a human firmly in the loop for anything **high-stakes or emotional**: refunds above a threshold, complaints, cancellations, legal or safety issues. The goal is not to remove people — it is to stop them from drowning in repetitive questions so they can handle what matters.' },

      { type: 'h2', text: 'A step-by-step approach' },
      { type: 'h3', text: '1. Gather your knowledge' },
      { type: 'p', text: 'The agent is only as good as what it can read. Pull together your FAQs, help docs, policies, and past support replies. This becomes the source of truth the AI answers from — which also prevents it from making things up.' },
      { type: 'h3', text: '2. Connect the channels' },
      { type: 'p', text: 'Decide where customers reach you — website chat, email, WhatsApp, SMS, or phone — and wire the agent into each. A workflow tool routes messages in and responses out, and logs everything to your help desk.' },
      { type: 'h3', text: '3. Set the guardrails' },
      { type: 'p', text: 'Define what the agent can answer confidently, when it should escalate, and the tone it uses. A good rule: if confidence is low or the topic is sensitive, hand off to a human with the full conversation attached.' },
      { type: 'h3', text: '4. Launch narrow, then expand' },
      { type: 'p', text: 'Go live on one channel and one category (say, FAQs on website chat). Watch the transcripts, correct mistakes, then widen the scope. Shipping in stages beats a big-bang rollout that erodes trust.' },

      { type: 'h2', text: 'What results to expect' },
      { type: 'p', text: 'Businesses that automate support well typically see response times drop from hours to **seconds**, a large share of routine tickets resolved without a human, and consistent 24/7 coverage. The compounding win is speed: instant answers lift satisfaction and, for sales inquiries, conversion — because the fastest reply usually wins the customer.' },

      { type: 'h2', text: 'How Xevaro Labs helps' },
      { type: 'p', text: 'Xevaro Labs builds [AI agents and support systems](/services) end-to-end: connected to your knowledge base and tools, deployed across the channels your customers already use, with human escalation built in. Everything is scoped to your workflows and can be self-hosted so you own your data. If you want to see what is automatable in your support flow, [book an automation audit](/contact) or [request a quote](/pricing).' },
    ],
    faqs: [
      { q: 'Can AI fully replace human customer support?', a: 'No — and it should not. AI handles the high-volume, repetitive questions and instant first responses, while humans handle complex, sensitive, or emotional issues. The best setups keep a human in the loop and let the AI escalate with full context when needed.' },
      { q: 'How long does it take to set up AI customer support?', a: 'A focused AI support agent (for example, FAQs and order lookups on website chat) can go live within days to a couple of weeks. Broader coverage across multiple channels with custom integrations takes a few weeks. Launching narrow and expanding in stages is the reliable path.' },
      { q: 'Will the AI make up answers?', a: 'A properly built agent answers only from your approved knowledge base and escalates when it is unsure, which prevents fabricated answers. Guardrails, confidence thresholds, and human handoff are what keep it accurate.' },
    ],
  },

  {
    slug: 'n8n-vs-zapier-vs-make',
    title: 'n8n vs Zapier vs Make: Which Automation Tool Is Right for You?',
    description:
      'A clear, honest comparison of n8n, Zapier, and Make for business automation — how they differ on cost, flexibility, AI, and data ownership, and which to choose for your situation.',
    date: '2026-06-20',
    updated: '2026-07-06',
    author: 'Xevaro Labs',
    readingMinutes: 7,
    category: 'Automation',
    keywords: [
      'n8n vs zapier',
      'n8n vs make',
      'best automation tool',
      'zapier alternative',
      'workflow automation tools',
    ],
    body: [
      { type: 'p', text: 'Choose **Zapier** if you want the simplest possible setup and the most app integrations; choose **Make** if you want a visual builder with more logic at a lower price; choose **n8n** if you want maximum flexibility, the ability to self-host so cost does not scale with usage, and deep control over AI and custom code. All three connect your apps and automate work — they differ mainly on flexibility, price at scale, and data ownership.' },
      { type: 'p', text: 'Here is how to actually decide.' },

      { type: 'h2', text: 'The short version' },
      { type: 'ul', items: [
        '**Zapier** — easiest to start, the largest integration library, priced per task. Great for simple, low-volume automations; gets expensive as volume grows.',
        '**Make** (formerly Integromat) — a powerful visual canvas with branching and loops, generally cheaper per operation than Zapier. A strong middle ground.',
        '**n8n** — open-source and self-hostable. The most flexible for complex logic, custom code, and AI, and the most cost-effective at scale because you are not paying per task. Steeper learning curve.',
      ] },

      { type: 'h2', text: 'Cost: the factor that changes everything at scale' },
      { type: 'p', text: 'Zapier and Make charge by usage — tasks or operations per month. That is fine when volume is low, but as automations multiply, the bill climbs with them. **n8n**, when self-hosted, decouples cost from volume: you pay for the server, not per task. For a business running heavy automation, that difference compounds into real money — which is why many teams start on Zapier and migrate to n8n once volume justifies it.' },

      { type: 'h2', text: 'Flexibility and AI' },
      { type: 'p', text: 'If your automations are straightforward ("when a form is submitted, add a row and send an email"), any of the three works. The gap shows up with **complex logic and AI**: multi-step branching, custom code, calling AI models, and orchestrating agents. n8n leads here — it was built for exactly this and gives you room to run custom functions and wire in large language models. Make handles moderate complexity well. Zapier is catching up but is the most constrained for advanced builds.' },

      { type: 'h2', text: 'Data ownership' },
      { type: 'p', text: 'Because n8n can be **self-hosted**, your data and workflows live on infrastructure you control — important for privacy, compliance, or simply not wanting your business logic locked inside someone else\'s cloud. Zapier and Make are hosted services; convenient, but your automations run on their platform.' },

      { type: 'h2', text: 'Which should you choose?' },
      { type: 'ul', items: [
        '**Just getting started, few automations, want zero setup** → Zapier.',
        '**Want more power and better pricing without self-hosting** → Make.',
        '**Scaling automation, need AI/custom logic, or want to own your data** → n8n.',
      ] },
      { type: 'p', text: 'A common and smart path: prototype on Zapier or Make to prove the value, then move the heavy, high-volume workflows to n8n once the usage-based bills start to sting.' },

      { type: 'h2', text: 'Why Xevaro Labs builds on n8n' },
      { type: 'p', text: 'Xevaro Labs builds most [automation systems](/services) on n8n because it gives clients flexibility, AI orchestration, and self-hosting — so costs stay flat as usage grows and clients keep ownership of their data. That said, the right tool is the one that fits *your* situation; if a simpler stack serves you better, that is what we recommend. Want a recommendation for your workflows? [Book an automation audit](/contact).' },
    ],
    faqs: [
      { q: 'Is n8n better than Zapier?', a: 'It depends on your needs. n8n is more flexible, better for AI and custom logic, and far more cost-effective at scale because it can be self-hosted (you do not pay per task). Zapier is easier to start with and has more ready-made integrations. High-volume or complex automation favors n8n; simple, low-volume automation favors Zapier.' },
      { q: 'Is n8n free?', a: 'n8n is open-source and can be self-hosted for the cost of a server, which is why it scales cheaply. It also offers a paid cloud version if you prefer not to host it yourself. Zapier and Make are paid SaaS priced by task or operation volume.' },
      { q: 'Can I switch from Zapier to n8n later?', a: 'Yes. Many businesses start on Zapier or Make to validate an automation quickly, then migrate high-volume workflows to n8n once usage-based pricing becomes costly. The logic transfers; the main work is rebuilding the workflows on the new platform.' },
    ],
  },

  {
    slug: 'what-does-an-ai-automation-agency-do',
    title: 'What Does an AI Automation Agency Actually Do?',
    description:
      'A plain-English explanation of what an AI automation agency does, the systems they build, how they price, and when it makes sense to hire one instead of doing it yourself.',
    date: '2026-07-01',
    updated: '2026-07-06',
    author: 'Xevaro Labs',
    readingMinutes: 6,
    category: 'Guides',
    keywords: [
      'AI automation agency',
      'what does an AI automation agency do',
      'hire AI automation agency',
      'AI agency services',
    ],
    body: [
      { type: 'p', text: 'An AI automation agency designs and builds software systems that run business tasks automatically — answering customers, qualifying and following up with leads, moving data between tools, and generating reports — by combining AI agents with workflow automation. Instead of selling you a single tool, a good agency ships working systems that operate 24/7 and are tailored to how your business actually runs.' },
      { type: 'p', text: 'Here is what that involves, and how to know if you need one.' },

      { type: 'h2', text: 'The systems an AI automation agency builds' },
      { type: 'ul', items: [
        '**AI agents** — for customer support, sales, and lead qualification across chat, WhatsApp, email, and voice.',
        '**Workflow automation** — connecting your CRM, email, calendar, payments, and other tools so repetitive work runs itself (often built on [n8n](/blog/n8n-vs-zapier-vs-make)).',
        '**Lead-generation systems** — outreach, enrichment, and follow-up that keep a predictable pipeline full.',
        '**Websites and e-commerce** — high-conversion sites and Shopify systems, often with AI built in.',
        '**Business intelligence** — dashboards and reporting that update themselves.',
      ] },
      { type: 'p', text: 'You can see the full set of [productized systems here](/services). The unifying idea: take a manual, repetitive process and turn it into infrastructure that executes on its own.' },

      { type: 'h2', text: 'What the process usually looks like' },
      { type: 'ul', items: [
        '**Audit** — map where time leaks and where automation has the highest return.',
        '**Scope** — pick the one or two systems that move the needle first.',
        '**Build** — develop, connect, and test the workflows and agents.',
        '**Launch and iterate** — go live in stages, then refine and expand.',
      ] },
      { type: 'p', text: 'A strong agency ships something working fast rather than disappearing into months of discovery and slide decks.' },

      { type: 'h2', text: 'How AI automation agencies price' },
      { type: 'p', text: 'Most work is scoped to the client, so pricing is custom rather than a fixed menu. A common model is a **one-time setup fee plus a monthly retainer** that covers hosting, monitoring, and ongoing improvements — because automations are not "build once and forget," they need maintenance as your tools and needs change. See [how Xevaro approaches pricing](/pricing).' },

      { type: 'h2', text: 'When should you hire one (vs. do it yourself)?' },
      { type: 'p', text: 'Do it yourself if you are technical and it is a single, simple workflow — you will learn a lot. Consider an agency when:' },
      { type: 'ul', items: [
        'You have **several systems that need to talk to each other**, not just one automation.',
        'The work is **customer-facing** and can\'t be left flaky.',
        'Your time is worth more spent **on** the business than inside automation tools.',
        'You want it **built right the first time**, with someone maintaining it.',
      ] },

      { type: 'h2', text: 'About Xevaro Labs' },
      { type: 'p', text: 'Xevaro Labs is an AI automation agency that turns manual operations into self-running systems for founders and growing businesses — AI agents, workflow automation, lead engines, and high-conversion websites, delivered as productized systems you own. If you are weighing whether automation is worth it for your business, [tell us your biggest bottleneck](/contact) and we will map the highest-impact system, or browse [common questions](/faq).' },
    ],
    faqs: [
      { q: 'What is the difference between an AI automation agency and a regular automation agency?', a: 'A regular automation agency wires apps together with rule-based workflows. An AI automation agency adds AI agents — systems that reason, understand natural language, and hold conversations — on top of that automation, so it can handle tasks that previously needed a human to interpret them.' },
      { q: 'How much does it cost to hire an AI automation agency?', a: 'Pricing is usually custom because systems are scoped to each business. A common structure is a one-time setup fee plus a monthly retainer covering hosting, monitoring, and improvements. A single focused automation costs less than a multi-system build; most agencies quote after a short discovery call.' },
      { q: 'How do I know if my business needs AI automation?', a: 'If your team repeats the same rule-based tasks daily, loses leads to slow follow-up, or re-enters the same data across tools, automation will likely pay for itself. The simplest test: list what you do every day by hand that follows clear rules — that is what to automate first.' },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
