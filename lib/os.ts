// ─── Xevaro AI Operating System — shared data layer ──────────────────────────

export const CONTACT = {
  email: 'Info@xevarolabs.com',
  phone: '+12519106505',
  site:  'xevarolabs.com',
}

export const NAV = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Products',     href: '/products' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

/**
 * Each route maps to a window into the 150-frame robotic sequence + a system
 * "state" label shown in the HUD. Scroll interpolates within [start, end].
 */
export const ROBOT_STATES: Record<string, { start: number; end: number; state: string; sub: string }> = {
  '/':             { start: 1,   end: 55,  state: 'CORE ONLINE',        sub: 'System active · all modules nominal' },
  '/services':     { start: 40,  end: 90,  state: 'MODULES DEPLOYED',   sub: 'Automation systems executing' },
  '/products':     { start: 60,  end: 110, state: 'CATALOG ENGINE',     sub: 'Productized AI systems indexed' },
  '/case-studies': { start: 85,  end: 125, state: 'DATA INTELLIGENCE',  sub: 'Analyzing performance telemetry' },
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
    index: 'SYS-01',
    name: 'AI Automation Systems',
    function: 'Enterprise workflow automation engine that replaces manual operations with self-executing pipelines.',
    outcome: 'Fully automated workflows, scalable business execution, zero manual overhead.',
    integration: 'Core · Tier 1',
    includes: ['n8n workflow orchestration', 'CRM automation systems', 'Email automation pipelines', 'Business process automation', 'API integration layer'],
  },
  {
    id: 'agents',
    index: 'SYS-02',
    name: 'AI Agents & Voice Systems',
    function: 'Autonomous AI workforce handling communication, sales, and support around the clock.',
    outcome: 'A fully autonomous communication layer — human-like interaction, 24/7.',
    integration: 'Cognitive · Tier 1',
    includes: ['AI customer support agents', 'AI sales agents', 'WhatsApp automation bots', 'Voice AI calling systems', 'Lead qualification agents'],
  },
  {
    id: 'leadgen',
    index: 'SYS-03',
    name: 'Lead Generation Systems',
    function: 'AI-powered acquisition engine producing a predictable, automated sales pipeline.',
    outcome: 'Predictable lead flow, lower acquisition cost, automated pipeline.',
    integration: 'Growth · Tier 2',
    includes: ['Cold outreach automation', 'LinkedIn + email automation', 'CRM enrichment systems', 'Data scraping + validation', 'Funnel automation systems'],
  },
  {
    id: 'web',
    index: 'SYS-04',
    name: 'High-Conversion Website Systems',
    function: 'Premium AI-driven web infrastructure engineered for performance and conversion.',
    outcome: 'High-performance presence, conversion-optimized architecture, premium positioning.',
    integration: 'Interface · Tier 2',
    includes: ['Corporate websites', 'SaaS platforms', 'Landing pages', 'AI-integrated web apps', 'Conversion optimization systems'],
  },
  {
    id: 'commerce',
    index: 'SYS-05',
    name: 'Shopify AI Commerce Systems',
    function: 'AI-powered e-commerce engine that grows revenue per customer automatically.',
    outcome: 'Increased revenue per customer, automated e-commerce growth.',
    integration: 'Commerce · Tier 2',
    includes: ['Shopify store development', 'AI product recommendations', 'Automated marketing funnels', 'Cart optimization systems', 'Customer behavior AI tracking'],
  },
  {
    id: 'bi',
    index: 'SYS-06',
    name: 'Business Intelligence Systems',
    function: 'Real-time decision automation layer turning raw data into live business insight.',
    outcome: 'Live insights, smarter decisions, automated reporting infrastructure.',
    integration: 'Analytics · Tier 1',
    includes: ['AI dashboards', 'KPI tracking systems', 'Business analytics pipelines', 'Reporting automation', 'Data visualization systems'],
  },
]

// ─── Case studies ─────────────────────────────────────────────────────────────

export const CASE_STUDIES = [
  { client: 'RetailCo',     sector: 'E-Commerce',  metric: '+340%', label: 'Revenue growth',  desc: 'Deployed Shopify AI Commerce + automation engine; revenue tripled in 90 days.' },
  { client: 'TechFlow',     sector: 'SaaS',         metric: '80%',   label: 'Ops time saved',  desc: 'Replaced manual ops with orchestrator loops, cutting operational time 80%.' },
  { client: 'OmegaShop',    sector: 'Retail',       metric: '2.1x',  label: 'Conversion rate', desc: 'AI agents + conversion systems doubled qualified conversions.' },
  { client: 'AutoVentures', sector: 'Enterprise',   metric: '$2M+',  label: 'Revenue unlocked',desc: 'BI systems + lead-gen pipeline recovered seven figures in lost pipeline.' },
]

// ─── About: evolution timeline ────────────────────────────────────────────────

export const TIMELINE = [
  { year: '2023', title: 'Genesis', desc: 'Xevaro Labs founded to productize enterprise automation.' },
  { year: '2024', title: 'The Engine', desc: 'Launched the orchestrator core — autonomous multi-agent execution.' },
  { year: '2025', title: 'Scale', desc: '100+ workflows deployed across commerce, SaaS, and enterprise.' },
  { year: '2026', title: 'Operating System', desc: 'Unified every capability into the Xevaro AI OS.' },
]
