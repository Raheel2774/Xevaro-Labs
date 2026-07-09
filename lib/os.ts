// ─── Xevaro AI Operating System, shared data layer ──────────────────────────

export const CONTACT = {
  email: 'Info@xevarolabs.com',
  phone: '+12519106505',
  site:  'xevarolabs.com',
}

export const NAV = [
  { label: 'Home',         href: '/' },
  { label: 'AI Agents',    href: '/agents' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Services',     href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'FAQ',          href: '/faq' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

export const LEGAL = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Refund Policy',    href: '/refund' },
]

/**
 * Each route maps to a window into the 150-frame robotic sequence + a system
 * "state" label shown in the HUD. Scroll interpolates within [start, end].
 */
export const ROBOT_STATES: Record<string, { start: number; end: number; state: string; sub: string }> = {
  '/':             { start: 1,   end: 55,  state: 'CORE ONLINE',        sub: 'System active · all modules nominal' },
  '/agents':       { start: 45,  end: 95,  state: 'AGENT SWARM',        sub: 'Autonomous agents indexed · 25 industries' },
  '/best-sellers': { start: 60,  end: 105, state: 'FLAGSHIP UNITS',     sub: 'Top performing agents online' },
  '/services':     { start: 40,  end: 90,  state: 'MODULES DEPLOYED',   sub: 'Automation systems executing' },
  '/products':     { start: 60,  end: 110, state: 'CATALOG ENGINE',     sub: 'Productized AI systems indexed' },
  '/case-studies': { start: 85,  end: 125, state: 'DATA INTELLIGENCE',  sub: 'Analyzing performance telemetry' },
  '/testimonials': { start: 90,  end: 130, state: 'CLIENT SIGNAL',      sub: 'Verified outcomes streaming in' },
  '/faq':          { start: 70,  end: 115, state: 'KNOWLEDGE BASE',     sub: 'Resolving common operator queries' },
  '/blog':         { start: 55,  end: 100, state: 'SIGNAL FEED',        sub: 'Broadcasting automation intelligence' },
  '/about':        { start: 100, end: 150, state: 'EVOLUTION',          sub: 'Intelligence narrative loading' },
  '/contact':      { start: 120, end: 150, state: 'CONTROL INTERFACE',  sub: 'Operator channel open' },
}

export const FRAME_COUNT = 150

// ─── Products (productized AI systems) ────────────────────────────────────────

export interface Product {
  id: string
  index: string
  name: string
  function: string
  outcome: string
  integration: string   // system integration level
  includes: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'automation',
    index: 'SYS 01',
    name: 'AI Automation Systems',
    function: 'Enterprise workflow automation engine that replaces manual operations with self executing pipelines.',
    outcome: 'Fully automated workflows, scalable business execution, zero manual overhead.',
    integration: 'Core · Tier 1',
    includes: ['n8n workflow orchestration', 'CRM automation systems', 'Email automation pipelines', 'Business process automation', 'API integration layer'],
  },
  {
    id: 'agents',
    index: 'SYS 02',
    name: 'AI Agents & Voice Systems',
    function: 'Autonomous AI workforce handling communication, sales, and support around the clock.',
    outcome: 'A fully autonomous communication layer, human like interaction, 24/7.',
    integration: 'Cognitive · Tier 1',
    includes: ['AI customer support agents', 'AI sales agents', 'WhatsApp automation bots', 'Voice AI calling systems', 'Lead qualification agents'],
  },
  {
    id: 'leadgen',
    index: 'SYS 03',
    name: 'Lead Generation Systems',
    function: 'AI powered acquisition engine producing a predictable, automated sales pipeline.',
    outcome: 'Predictable lead flow, lower acquisition cost, automated pipeline.',
    integration: 'Growth · Tier 2',
    includes: ['Cold outreach automation', 'LinkedIn + email automation', 'CRM enrichment systems', 'Data scraping + validation', 'Funnel automation systems'],
  },
  {
    id: 'web',
    index: 'SYS 04',
    name: 'High Conversion Website Systems',
    function: 'Premium AI driven web infrastructure engineered for performance and conversion.',
    outcome: 'High performance presence, conversion optimized architecture, premium positioning.',
    integration: 'Interface · Tier 2',
    includes: ['Corporate websites', 'SaaS platforms', 'Landing pages', 'AI integrated web apps', 'Conversion optimization systems'],
  },
  {
    id: 'commerce',
    index: 'SYS 05',
    name: 'Shopify AI Commerce Systems',
    function: 'AI powered ecommerce engine that grows revenue per customer automatically.',
    outcome: 'Increased revenue per customer, automated ecommerce growth.',
    integration: 'Commerce · Tier 2',
    includes: ['Shopify store development', 'AI product recommendations', 'Automated marketing funnels', 'Cart optimization systems', 'Customer behavior AI tracking'],
  },
  {
    id: 'bi',
    index: 'SYS 06',
    name: 'Business Intelligence Systems',
    function: 'Real time decision automation layer turning raw data into live business insight.',
    outcome: 'Live insights, smarter decisions, automated reporting infrastructure.',
    integration: 'Analytics · Tier 1',
    includes: ['AI dashboards', 'KPI tracking systems', 'Business analytics pipelines', 'Reporting automation', 'Data visualization systems'],
  },
]

// ─── Case studies ─────────────────────────────────────────────────────────────

export interface CaseStudy {
  client: string
  sector: string
  metric: string
  label: string
  desc: string
  challenge: string
  solution: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'RetailCo', sector: 'Ecommerce', metric: '+340%', label: 'Revenue growth',
    desc: 'Deployed Shopify AI Commerce + automation engine; revenue tripled in 90 days.',
    challenge: 'Manual marketing and a leaky checkout were capping growth despite strong traffic.',
    solution: 'Shopify AI Commerce with automated funnels, cart recovery and behavior based recommendations.',
  },
  {
    client: 'TechFlow', sector: 'SaaS', metric: '80%', label: 'Ops time saved',
    desc: 'Replaced manual ops with orchestrator loops, cutting operational time 80%.',
    challenge: 'A small team was buried in repetitive operational tasks that did not scale.',
    solution: 'n8n orchestration loops connecting their tools into self running workflows with AI decisioning.',
  },
  {
    client: 'OmegaShop', sector: 'Retail', metric: '2.1x', label: 'Conversion rate',
    desc: 'AI agents + conversion systems doubled qualified conversions.',
    challenge: 'Website visitors bounced without answers and leads went cold before sales could reach them.',
    solution: 'A 24/7 AI support + sales agent that answered instantly, qualified visitors and booked demos.',
  },
  {
    client: 'AutoVentures', sector: 'Enterprise', metric: '$2M+', label: 'Revenue unlocked',
    desc: 'BI systems + lead gen pipeline recovered seven figures in lost pipeline.',
    challenge: 'Leadership lacked live visibility, and qualified pipeline was slipping through the cracks.',
    solution: 'Business intelligence dashboards plus an automated lead gen and follow up pipeline.',
  },
]

// ─── About: evolution timeline ────────────────────────────────────────────────

export const TIMELINE = [
  { year: '2023', title: 'Genesis', desc: 'Xevaro Labs founded to productize enterprise automation.' },
  { year: '2024', title: 'The Engine', desc: 'Launched the orchestrator core, autonomous multi agent execution.' },
  { year: '2025', title: 'Scale', desc: '100+ workflows deployed across commerce, SaaS, and enterprise.' },
  { year: '2026', title: 'Operating System', desc: 'Unified every capability into the Xevaro AI OS.' },
]
