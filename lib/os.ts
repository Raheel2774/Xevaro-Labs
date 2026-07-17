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
  { label: 'Portfolio',    href: '/portfolio' },
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

export interface ProductStep { title: string; desc: string }
export interface ProductStat { value: string; label: string }
export interface ProductFAQ { q: string; a: string }

export interface Product {
  id: string
  index: string
  name: string
  tagline: string
  description: string
  longDescription: string
  monthlyPrice: number
  setupPrice: number
  features: string[]
  outcome: string
  icon: string          // lucide-react icon name
  accent: string        // palette hex used for this product's bento theming
  bestSellerRank: number
  badge: string         // short marketing badge shown on best-sellers
  howItWorks: ProductStep[]
  integrations: string[]
  useCases: string[]
  stats: ProductStat[]
  faq: ProductFAQ[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'human-resources',
    index: '01',
    name: 'AI Human Resources',
    tagline: 'Screening, onboarding, compliance',
    description: 'Auto screen resumes, schedule interviews, generate offers and onboard new hires.',
    longDescription: 'Your always on HR teammate. It reads every inbound resume, scores candidates against the role, books interviews on your calendar, drafts offer letters and walks new hires through onboarding. What used to eat a full day of admin per hire runs in the background while you focus on picking the right people.',
    monthlyPrice: 900,
    setupPrice: 1000,
    features: [
      'Resume screening and scoring',
      'Interview scheduling',
      'Offer letter generation',
      'New hire onboarding flows',
      'Compliance document tracking',
    ],
    outcome: 'Hire 3x faster with zero admin work.',
    icon: 'users',
    accent: '#9A1750',
    bestSellerRank: 1,
    badge: 'Team favorite',
    howItWorks: [
      { title: 'Resume lands', desc: 'Every application flows into one inbox and is parsed instantly.' },
      { title: 'AI scores it', desc: 'Candidates are ranked against your role criteria in seconds.' },
      { title: 'Interviews booked', desc: 'Top matches get a calendar link and self schedule.' },
      { title: 'Offer and onboard', desc: 'Offer letters draft automatically and onboarding kicks off.' },
    ],
    integrations: ['Gmail', 'Google Calendar', 'Notion', 'Slack', 'DocuSign', 'Airtable'],
    useCases: ['High volume hiring', 'Agencies and staffing', 'Franchises', 'Growing teams'],
    stats: [
      { value: '3x', label: 'Faster time to hire' },
      { value: '90%', label: 'Screening automated' },
      { value: '8 hrs', label: 'Saved per hire' },
    ],
    faq: [
      { q: 'Does it work with our existing ATS?', a: 'Yes. It connects to your inbox, calendar and common HR tools, or runs standalone with its own candidate board.' },
      { q: 'Can it handle our compliance docs?', a: 'It tracks required documents per hire and flags anything missing before day one.' },
    ],
  },
  {
    id: 'business-assistant',
    index: '02',
    name: 'AI Business Assistant',
    tagline: 'Email summaries, task automation, CRM sync',
    description: 'Summarizes your inbox, creates tasks and keeps your CRM up to date automatically.',
    longDescription: 'A chief of staff that never sleeps. It reads and summarizes your inbox, turns important threads into tasks, updates your CRM after every conversation and surfaces what actually needs you. The busywork that quietly eats your day just disappears.',
    monthlyPrice: 200,
    setupPrice: 800,
    features: [
      'Daily inbox summaries',
      'Automatic task creation',
      'CRM sync after every thread',
      'Meeting prep briefs',
      'Follow up reminders',
    ],
    outcome: 'Cut admin overhead by 50%.',
    icon: 'sparkles',
    accent: '#EE4C7C',
    bestSellerRank: 2,
    badge: 'Best value',
    howItWorks: [
      { title: 'Connect inbox', desc: 'Securely link your email and CRM in a few clicks.' },
      { title: 'It reads everything', desc: 'Threads are summarized and prioritized every morning.' },
      { title: 'Tasks appear', desc: 'Action items become tasks with owners and due dates.' },
      { title: 'CRM stays clean', desc: 'Contacts and deals update themselves after each exchange.' },
    ],
    integrations: ['Gmail', 'Outlook', 'HubSpot', 'Notion', 'Slack', 'Google Calendar'],
    useCases: ['Founders', 'Sales teams', 'Consultants', 'Busy operators'],
    stats: [
      { value: '50%', label: 'Less admin time' },
      { value: '2 hrs', label: 'Saved daily' },
      { value: '100%', label: 'CRM coverage' },
    ],
    faq: [
      { q: 'Is my email data safe?', a: 'It uses read scoped access and never stores full message bodies beyond the summary you approve.' },
      { q: 'Which CRM does it support?', a: 'HubSpot, Pipedrive, Salesforce and most common CRMs, or a simple built in pipeline.' },
    ],
  },
  {
    id: 'lead-generation',
    index: '03',
    name: 'AI Lead Generation',
    tagline: '50+ qualified leads per month',
    description: 'Sources, qualifies and reaches out to leads automatically with built in cold email sequences.',
    longDescription: 'A full outbound engine on autopilot. It builds targeted lead lists, enriches and qualifies each contact, then runs personalized cold email sequences that book meetings straight onto your calendar. Predictable pipeline without a single hour of manual prospecting.',
    monthlyPrice: 1000,
    setupPrice: 1200,
    features: [
      '50 plus qualified leads per month',
      'Automatic lead sourcing and enrichment',
      'Personalized cold email sequences',
      'Reply detection and routing',
      'Meetings booked to your calendar',
    ],
    outcome: 'Predictable lead flow at lower cost per meeting.',
    icon: 'target',
    accent: '#5D001E',
    bestSellerRank: 3,
    badge: 'Top seller',
    howItWorks: [
      { title: 'Define your buyer', desc: 'We set your ideal customer profile and targeting rules.' },
      { title: 'Lists build themselves', desc: 'Fresh, enriched leads are sourced every week.' },
      { title: 'Sequences send', desc: 'Personalized outreach goes out and follows up automatically.' },
      { title: 'Meetings land', desc: 'Interested replies are booked straight to your calendar.' },
    ],
    integrations: ['Instantly', 'Apollo', 'HubSpot', 'Google Calendar', 'Slack', 'Clay'],
    useCases: ['Agencies', 'B2B services', 'SaaS', 'Local service businesses'],
    stats: [
      { value: '50+', label: 'Leads per month' },
      { value: '3 step', label: 'Follow up cadence' },
      { value: '24/7', label: 'Always prospecting' },
    ],
    faq: [
      { q: 'Will this hurt our domain reputation?', a: 'No. We warm inboxes, stay inside safe sending limits and monitor deliverability continuously.' },
      { q: 'Do you write the copy?', a: 'Yes. We craft and test the sequences, then optimize based on reply data.' },
    ],
  },
  {
    id: 'appointment-recovery',
    index: '04',
    name: 'AI Appointment Recovery',
    tagline: 'Auto text missed appointments',
    description: 'Recovers up to 40 percent of no shows with automatic SMS and email rebooking sequences.',
    longDescription: 'Every missed appointment is lost revenue you can win back. The moment someone no shows or cancels, this agent texts and emails them with a friendly rebooking link and keeps nudging until they book again. It quietly rescues thousands in revenue every month.',
    monthlyPrice: 800,
    setupPrice: 1000,
    features: [
      'Auto text missed appointments',
      '40 percent average recovery rate',
      'One tap rebooking links',
      'SMS and email sequences',
      'Revenue recovered reporting',
    ],
    outcome: 'Recover lost revenue from no shows.',
    icon: 'calendar',
    accent: '#9A1750',
    bestSellerRank: 4,
    badge: 'Fast payback',
    howItWorks: [
      { title: 'No show detected', desc: 'A missed or cancelled appointment triggers instantly.' },
      { title: 'Outreach fires', desc: 'A warm SMS and email go out within minutes.' },
      { title: 'Rebooking link', desc: 'One tap lets them grab a new slot on your calendar.' },
      { title: 'Revenue reported', desc: 'You see exactly how much was recovered each month.' },
    ],
    integrations: ['Twilio', 'Google Calendar', 'Calendly', 'Acuity', 'HubSpot', 'Square'],
    useCases: ['Clinics and dental', 'Salons and spas', 'Home services', 'Med spas'],
    stats: [
      { value: '40%', label: 'No shows recovered' },
      { value: '5 min', label: 'To first outreach' },
      { value: '10x', label: 'Return on cost' },
    ],
    faq: [
      { q: 'Does it use our booking system?', a: 'Yes. It plugs into your calendar or booking tool and sends real available slots.' },
      { q: 'Will messages feel spammy?', a: 'No. Sequences are warm, branded and stop the moment someone rebooks.' },
    ],
  },
  {
    id: 'voice-agent',
    index: '05',
    name: 'AI Voice Agent',
    tagline: 'Answer every call 24/7',
    description: 'An intelligent voice agent that answers calls, qualifies leads and books appointments around the clock.',
    longDescription: 'The phone never goes unanswered again. This natural sounding voice agent picks up every call, answers common questions, qualifies the caller and books them straight into your calendar. Nights, weekends and busy afternoons all covered without hiring a single receptionist.',
    monthlyPrice: 1200,
    setupPrice: 1000,
    features: [
      '24/7 call answering',
      'Natural sounding conversation',
      'Live lead qualification',
      'Appointment booking on the call',
      'Call transcripts and summaries',
    ],
    outcome: 'Never miss a call. Capture leads around the clock.',
    icon: 'phone',
    accent: '#EE4C7C',
    bestSellerRank: 5,
    badge: 'Never miss a lead',
    howItWorks: [
      { title: 'Call comes in', desc: 'The agent answers instantly in a natural voice.' },
      { title: 'It understands', desc: 'Callers are greeted, helped and qualified in real time.' },
      { title: 'Books the slot', desc: 'Qualified callers get booked onto your calendar live.' },
      { title: 'You get the recap', desc: 'A transcript and summary land in your inbox.' },
    ],
    integrations: ['Twilio', 'Google Calendar', 'Calendly', 'HubSpot', 'Slack', 'Zapier'],
    useCases: ['Home services', 'Clinics', 'Law firms', 'Real estate'],
    stats: [
      { value: '24/7', label: 'Always answering' },
      { value: '0', label: 'Missed calls' },
      { value: '100%', label: 'Calls logged' },
    ],
    faq: [
      { q: 'Does it sound robotic?', a: 'No. It uses natural voice and handles interruptions and follow up questions smoothly.' },
      { q: 'Can it transfer to a human?', a: 'Yes. It routes complex or high value calls to your team when needed.' },
    ],
  },
  {
    id: 'content-generation',
    index: '06',
    name: 'AI Content Generation',
    tagline: '4 blog posts plus 20 social posts monthly',
    description: 'Writes, schedules and publishes your blog and social content on autopilot.',
    longDescription: 'A content team in a box. It researches topics in your niche, writes on brand blog posts and social captions, then schedules and publishes them across your channels. Consistent presence that compounds, with zero writer overhead and nothing left to chase.',
    monthlyPrice: 1000,
    setupPrice: 500,
    features: [
      '4 blog posts per month',
      '20 social media captions',
      'On brand voice and tone',
      'Auto scheduling and publishing',
      'SEO optimized drafts',
    ],
    outcome: 'Consistent content with zero writer overhead.',
    icon: 'pencil',
    accent: '#5D001E',
    bestSellerRank: 6,
    badge: 'Set and forget',
    howItWorks: [
      { title: 'Set your voice', desc: 'We tune the agent to your brand, topics and audience.' },
      { title: 'It writes', desc: 'Blog posts and captions are drafted on a schedule.' },
      { title: 'You approve', desc: 'Review and tweak in one place, or let it run.' },
      { title: 'It publishes', desc: 'Content posts and schedules across your channels.' },
    ],
    integrations: ['WordPress', 'Webflow', 'LinkedIn', 'Instagram', 'X', 'Buffer'],
    useCases: ['Personal brands', 'Agencies', 'Local businesses', 'SaaS marketing'],
    stats: [
      { value: '24', label: 'Pieces per month' },
      { value: '0', label: 'Writers to manage' },
      { value: '100%', label: 'On schedule' },
    ],
    faq: [
      { q: 'Will it sound like us?', a: 'Yes. We train it on your voice and examples so every piece stays on brand.' },
      { q: 'Do we approve before it posts?', a: 'Your choice. Run it fully automatic or keep a one click approval step.' },
    ],
  },
]

export const BEST_SELLERS = [...PRODUCTS].sort((a, b) => a.bestSellerRank - b.bestSellerRank)

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
    client: 'Bridgewater Mechanical', sector: 'HVAC & Plumbing', metric: '$75K', label: 'Client-reported value',
    desc: 'AI Hiring Agent sourced 1,240 candidates and made 24 hires on autopilot, with time to fill down 12%.',
    challenge: 'Manual job posting across Indeed and Facebook, with hours lost reviewing applicants and no consistent way to spot qualified techs.',
    solution: 'An AI Hiring Agent that centralizes every application, screens against defined criteria, and runs the pipeline end to end into one dashboard.',
  },
  {
    client: 'NYC Skincare Studio', sector: 'Medical Spa', metric: '< 3 wks', label: 'Time to fill roles',
    desc: 'AI Hiring Agent filled open roles in under three weeks on a fully automated candidate pipeline.',
    challenge: 'Facebook recruitment could not fill positions fast enough to keep pace with demand, capping bookable appointments.',
    solution: 'Automated candidate engagement, qualification, and interview booking through a live, self updating hiring dashboard.',
  },
  {
    client: 'HM Marketing Studio', sector: 'Digital Marketing', metric: '198', label: 'Interviews booked',
    desc: 'AI outbound engine using the Interview Method, with 30,000 emails sent and 198 interviews booked.',
    challenge: 'Manual outreach for podcast and interview opportunities generated limited results and burned hours.',
    solution: 'AI personalized cold email and follow up sequences that invite prospects onto an interview series instead of pitching.',
  },
  {
    client: 'Trafficost', sector: 'Software', metric: '+$30K', label: 'First-year revenue',
    desc: 'AI cold email layered on Meta and Google Ads drove 14.1K sends and a repeatable qualified lead flow.',
    challenge: 'The team wanted predictable recurring revenue but lacked a repeatable qualified lead pipeline.',
    solution: 'AI email campaigns combined with paid demand from Meta and Google Ads into one measured funnel.',
  },
  {
    client: 'Luxe Aesthetics', sector: 'Medical Spa', metric: '30+/wk', label: 'Appointments booked',
    desc: 'AVA, a 24/7 AI voice receptionist, booked 30+ appointments in a single week from calls that would have been missed.',
    challenge: 'The clinic missed calls and appointments during busy periods, losing bookable revenue.',
    solution: 'AVA answers calls, handles FAQs, books appointments, and confirms by SMS, live around the clock.',
  },
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

// ─── Agents (75 specialized AI agents) ────────────────────────────────────────

export interface Agent {
  id: string
  name: string
  niche: string
  description: string
  monthlyPrice: number
  setupPrice: number
  features: string[]
  icon: string
}

export const AGENTS: Agent[] = [
  // Home Services: Cleaning
  { id: 'cleaning-lead-gen', name: 'Cleaning Lead Generator', niche: 'Cleaning', description: 'Find residential cleaning prospects in your area', monthlyPrice: 500, setupPrice: 800, features: ['Local lead sourcing', 'Auto-qualify by property size', 'SMS outreach'], icon: 'sparkles' },
  { id: 'cleaning-scheduler', name: 'Cleaning Scheduler', niche: 'Cleaning', description: 'Auto-book cleaning appointments 24/7', monthlyPrice: 400, setupPrice: 600, features: ['Calendar sync', 'SMS confirmation', 'Rescheduling auto-handled'], icon: 'calendar' },
  { id: 'cleaning-recovery', name: 'Cleaning No Show Recovery', niche: 'Cleaning', description: 'Recover missed cleaning appointments', monthlyPrice: 300, setupPrice: 500, features: ['Auto text customers', '35% recovery rate', 'Rebooking links'], icon: 'phone' },

  // Home Services: HVAC
  { id: 'hvac-emergency', name: 'HVAC Emergency Dispatcher', niche: 'HVAC', description: 'Handle emergency HVAC calls 24/7', monthlyPrice: 700, setupPrice: 1000, features: ['Call qualification', 'Auto dispatch', 'Warranty check'], icon: 'phone' },
  { id: 'hvac-maintenance', name: 'HVAC Maintenance Reminder', niche: 'HVAC', description: 'Auto-remind customers for maintenance', monthlyPrice: 350, setupPrice: 600, features: ['Seasonal scheduling', 'SMS/email campaigns', 'Booking links'], icon: 'calendar' },
  { id: 'hvac-leads', name: 'HVAC Lead Qualifier', niche: 'HVAC', description: 'Qualify HVAC repair leads instantly', monthlyPrice: 550, setupPrice: 750, features: ['Damage assessment', 'Estimate generation', 'Lead scoring'], icon: 'target' },

  // Home Services: Roofing
  { id: 'roofing-inspection', name: 'Roofing Inspection Bot', niche: 'Roofing', description: 'Schedule and pre-qualify roof inspections', monthlyPrice: 600, setupPrice: 900, features: ['Photo assessment requests', 'Insurance quote prep', 'Site surveys'], icon: 'camera' },
  { id: 'roofing-follow-up', name: 'Roofing Follow Up Agent', niche: 'Roofing', description: 'Follow up on roof quotes automatically', monthlyPrice: 450, setupPrice: 700, features: ['Multi-touch sequences', 'Insurance coordination', 'Deadline tracking'], icon: 'mail' },
  { id: 'roofing-leads', name: 'Roofing Storm Lead Hunter', niche: 'Roofing', description: 'Find storm damage roofing leads in real time', monthlyPrice: 800, setupPrice: 1200, features: ['Weather tracking', 'Permit monitoring', 'Geo-targeting'], icon: 'target' },

  // Home Services: Landscaping
  { id: 'landscape-seasonal', name: 'Landscaping Seasonal Planner', niche: 'Landscaping', description: 'Manage seasonal landscaping projects', monthlyPrice: 400, setupPrice: 600, features: ['Weather-based scheduling', 'Service reminders', 'Photo galleries'], icon: 'calendar' },
  { id: 'landscape-estimates', name: 'Landscaping Estimate Agent', niche: 'Landscaping', description: 'Generate landscaping quotes instantly', monthlyPrice: 550, setupPrice: 800, features: ['Space measurement', 'Plant databases', 'Price calculations'], icon: 'pencil' },
  { id: 'landscape-retention', name: 'Landscaping Retention Bot', niche: 'Landscaping', description: 'Keep landscaping customers coming back', monthlyPrice: 350, setupPrice: 500, features: ['Upsell automation', 'Referral requests', 'Seasonal offers'], icon: 'sparkles' },

  // Home Services: Auto Repair
  { id: 'auto-service-reminder', name: 'Auto Service Reminder', niche: 'Auto Repair', description: 'Auto remind customers for maintenance', monthlyPrice: 400, setupPrice: 650, features: ['Mileage tracking', 'SMS reminders', 'Booking links'], icon: 'calendar' },
  { id: 'auto-repair-booking', name: 'Auto Repair Booking Agent', niche: 'Auto Repair', description: 'Book auto repair appointments 24/7', monthlyPrice: 500, setupPrice: 800, features: ['Symptom diagnosis', 'Parts check', 'Warranty verification'], icon: 'phone' },
  { id: 'auto-warranty', name: 'Auto Warranty Inspector', niche: 'Auto Repair', description: 'Check warranty coverage automatically', monthlyPrice: 350, setupPrice: 600, features: ['VIN lookup', 'Coverage verification', 'Claim filing'], icon: 'shield' },

  // Health & Wellness: Fitness
  { id: 'fitness-onboarding', name: 'Fitness Onboarding Bot', niche: 'Fitness', description: 'Onboard gym members automatically', monthlyPrice: 400, setupPrice: 600, features: ['Assessment quizzes', 'Program matching', 'Intro class booking'], icon: 'sparkles' },
  { id: 'fitness-retention', name: 'Fitness Retention Agent', niche: 'Fitness', description: 'Reduce gym member churn', monthlyPrice: 450, setupPrice: 700, features: ['Engagement tracking', 'Re-engagement campaigns', 'Cancellation prevention'], icon: 'heart' },
  { id: 'fitness-class-booking', name: 'Fitness Class Scheduler', niche: 'Fitness', description: 'Auto-book fitness classes and trainers', monthlyPrice: 350, setupPrice: 500, features: ['Calendar sync', 'Waitlist management', 'Cancellation handling'], icon: 'calendar' },

  // Health & Wellness: Medical Practices
  { id: 'medical-appointment', name: 'Medical Appointment Agent', niche: 'Medical', description: 'Book and manage medical appointments', monthlyPrice: 600, setupPrice: 900, features: ['Insurance verification', 'Pre-visit screening', 'HIPAA compliant'], icon: 'phone' },
  { id: 'medical-recall', name: 'Medical Recall Bot', niche: 'Medical', description: 'Auto-send patient recalls and follow ups', monthlyPrice: 500, setupPrice: 800, features: ['Patient database sync', 'Multi-channel reminders', 'Outcomes tracking'], icon: 'mail' },
  { id: 'medical-billing', name: 'Medical Billing Assistant', niche: 'Medical', description: 'Automate medical billing and collections', monthlyPrice: 700, setupPrice: 1100, features: ['Insurance claims', 'Payment processing', 'Reconciliation'], icon: 'receipt' },

  // Health & Wellness: Wellness Coaching
  { id: 'wellness-coaching', name: 'Wellness Coaching Bot', niche: 'Wellness', description: 'AI wellness coach for clients', monthlyPrice: 450, setupPrice: 700, features: ['Daily check ins', 'Progress tracking', 'Goal management'], icon: 'heart' },
  { id: 'wellness-retention', name: 'Wellness Client Retention', niche: 'Wellness', description: 'Keep wellness clients engaged', monthlyPrice: 400, setupPrice: 600, features: ['Engagement scoring', 'Personalized content', 'Re-engagement flows'], icon: 'sparkles' },

  // Health & Wellness: Dental
  { id: 'dental-appointment', name: 'Dental Appointment Bot', niche: 'Dental', description: 'Manage dental appointments 24/7', monthlyPrice: 500, setupPrice: 800, features: ['Insurance pre-auth', 'Treatment reminders', 'Cancellation management'], icon: 'phone' },

  // Professional Services: Legal
  { id: 'legal-intake', name: 'Legal Client Intake', niche: 'Professional Services', description: 'Automated legal client intake forms', monthlyPrice: 600, setupPrice: 900, features: ['Document gathering', 'Case classification', 'Follow up sequencing'], icon: 'pencil' },
  { id: 'legal-follow-up', name: 'Legal Follow Up Agent', niche: 'Professional Services', description: 'Follow up on legal leads and cases', monthlyPrice: 500, setupPrice: 800, features: ['Matter tracking', 'Deadline reminders', 'Status updates'], icon: 'mail' },
  { id: 'legal-consultation', name: 'Legal Consultation Scheduler', niche: 'Professional Services', description: 'Book legal consultations automatically', monthlyPrice: 450, setupPrice: 700, features: ['Calendar integration', 'Pre-consultation questionnaire', 'Conflict checking'], icon: 'calendar' },

  // Professional Services: Accounting
  { id: 'accounting-client-onboard', name: 'Accounting Client Onboarding', niche: 'Professional Services', description: 'Automate accounting client setup', monthlyPrice: 550, setupPrice: 850, features: ['Document requests', 'System setup guides', 'Initial review scheduling'], icon: 'receipt' },

  // Retail & Commerce: Ecommerce
  { id: 'ecommerce-cart-recovery', name: 'Ecommerce Cart Recovery', niche: 'Retail', description: 'Recover abandoned shopping carts', monthlyPrice: 400, setupPrice: 600, features: ['Auto email sequences', 'SMS reminders', 'Discount incentives'], icon: 'shopping-cart' },
  { id: 'ecommerce-recommendations', name: 'Ecommerce Recommender', niche: 'Retail', description: 'AI product recommendations engine', monthlyPrice: 500, setupPrice: 800, features: ['Behavior tracking', 'Personalized suggestions', 'A/B testing'], icon: 'sparkles' },
  { id: 'ecommerce-retention', name: 'Ecommerce Retention Bot', niche: 'Retail', description: 'Increase customer lifetime value', monthlyPrice: 600, setupPrice: 900, features: ['Repurchase predictions', 'Loyalty programs', 'VIP segmentation'], icon: 'heart' },

  // Retail & Commerce: Brick & Mortar
  { id: 'retail-customer-flow', name: 'Retail Customer Flow Optimizer', niche: 'Retail', description: 'Optimize in-store customer experience', monthlyPrice: 450, setupPrice: 700, features: ['Foot traffic tracking', 'Staff scheduling', 'Promotion timing'], icon: 'chart' },
  { id: 'retail-loyalty', name: 'Retail Loyalty Program', niche: 'Retail', description: 'Manage loyalty program automation', monthlyPrice: 400, setupPrice: 650, features: ['Point tracking', 'Redemption processing', 'Tier management'], icon: 'gift' },

  // Property & Finance: Real Estate
  { id: 'real-estate-lead-qual', name: 'Real Estate Lead Qualifier', niche: 'Property & Finance', description: 'Qualify real estate leads instantly', monthlyPrice: 650, setupPrice: 1000, features: ['Property valuation', 'Buyer/seller classification', 'Timeline detection'], icon: 'target' },
  { id: 'real-estate-showing', name: 'Real Estate Showing Scheduler', niche: 'Property & Finance', description: 'Book property showings 24/7', monthlyPrice: 550, setupPrice: 850, features: ['MLS integration', 'Buyer pre-qual', 'Showing feedback'], icon: 'calendar' },
  { id: 'real-estate-follow-up', name: 'Real Estate Follow Up Agent', niche: 'Property & Finance', description: 'Follow up on real estate leads', monthlyPrice: 500, setupPrice: 800, features: ['Multi-touch campaigns', 'CRM sync', 'Market updates'], icon: 'mail' },

  // Property & Finance: Mortgage
  { id: 'mortgage-pre-qual', name: 'Mortgage Pre Qualification', niche: 'Property & Finance', description: 'Pre-qualify mortgage applicants', monthlyPrice: 600, setupPrice: 900, features: ['Credit check', 'Income verification', 'Rate quotes'], icon: 'receipt' },
  { id: 'mortgage-application', name: 'Mortgage Application Bot', niche: 'Property & Finance', description: 'Streamline mortgage applications', monthlyPrice: 700, setupPrice: 1100, features: ['Document collection', 'Compliance checks', 'Status updates'], icon: 'pencil' },

  // Tech & Growth: SaaS
  { id: 'saas-trial-onboard', name: 'SaaS Trial Onboarding', niche: 'Tech & Growth', description: 'Onboard trial users automatically', monthlyPrice: 450, setupPrice: 700, features: ['Interactive walkthroughs', 'Usage tracking', 'Success metrics'], icon: 'sparkles' },
  { id: 'saas-churn-prevention', name: 'SaaS Churn Prevention', niche: 'Tech & Growth', description: 'Prevent SaaS customer churn', monthlyPrice: 550, setupPrice: 850, features: ['Health scoring', 'Intervention triggers', 'Win back campaigns'], icon: 'heart' },

  // Add remaining agents to reach 75
  { id: 'consulting-lead-gen', name: 'Consulting Lead Generator', niche: 'Professional Services', description: 'Generate qualified consulting leads', monthlyPrice: 600, setupPrice: 950, features: ['Industry targeting', 'Company research', 'Decision maker ID'], icon: 'target' },
  { id: 'consulting-proposal', name: 'Consulting Proposal Bot', niche: 'Professional Services', description: 'Generate consulting proposals auto', monthlyPrice: 500, setupPrice: 800, features: ['Scope templating', 'Pricing logic', 'Version control'], icon: 'pencil' },
  { id: 'saas-onboarding', name: 'SaaS Onboarding Specialist', niche: 'Tech & Growth', description: 'Complete SaaS customer onboarding', monthlyPrice: 500, setupPrice: 800, features: ['Video tutorials', 'Email sequences', 'Success tracking'], icon: 'sparkles' },
  { id: 'saas-expansion', name: 'SaaS Expansion Agent', niche: 'Tech & Growth', description: 'Identify and pursue upsell opps', monthlyPrice: 600, setupPrice: 900, features: ['Usage analytics', 'Feature adoption', 'Upgrade triggers'], icon: 'rocket' },
  { id: 'restaurant-reservation', name: 'Restaurant Reservation Bot', niche: 'Retail', description: 'Manage restaurant reservations', monthlyPrice: 400, setupPrice: 650, features: ['Booking management', 'Wait list handling', 'No show prevention'], icon: 'calendar' },
  { id: 'restaurant-orders', name: 'Restaurant Order Bot', niche: 'Retail', description: 'Handle takeout and delivery orders', monthlyPrice: 450, setupPrice: 700, features: ['Menu management', 'Order processing', 'Payment handling'], icon: 'shopping-cart' },
  { id: 'restaurant-loyalty', name: 'Restaurant Loyalty Program', niche: 'Retail', description: 'Manage restaurant loyalty members', monthlyPrice: 350, setupPrice: 550, features: ['Point tracking', 'Rewards redemption', 'Personalized offers'], icon: 'gift' },
  { id: 'hotel-booking', name: 'Hotel Booking Agent', niche: 'Retail', description: 'Boost hotel direct bookings', monthlyPrice: 550, setupPrice: 850, features: ['Rate management', 'Upsell offers', 'Loyalty integration'], icon: 'calendar' },
  { id: 'hotel-guest-experience', name: 'Hotel Guest Experience', niche: 'Retail', description: 'Personalize hotel guest journey', monthlyPrice: 500, setupPrice: 800, features: ['Check in automation', 'Service requests', 'Feedback collection'], icon: 'sparkles' },
  { id: 'insurance-quote', name: 'Insurance Quote Agent', niche: 'Property & Finance', description: 'Generate insurance quotes instantly', monthlyPrice: 600, setupPrice: 900, features: ['Risk assessment', 'Coverage comparison', 'Premium calculation'], icon: 'receipt' },
  { id: 'insurance-claims', name: 'Insurance Claims Processor', niche: 'Property & Finance', description: 'Automate insurance claims filing', monthlyPrice: 700, setupPrice: 1100, features: ['Document collection', 'Adjuster coordination', 'Status tracking'], icon: 'pencil' },
  { id: 'education-enrollment', name: 'Education Enrollment Bot', niche: 'Professional Services', description: 'Automate student enrollment', monthlyPrice: 450, setupPrice: 700, features: ['Application processing', 'Document verification', 'Payment collection'], icon: 'pencil' },
  { id: 'education-retention', name: 'Education Student Retention', niche: 'Professional Services', description: 'Reduce student dropout rates', monthlyPrice: 400, setupPrice: 650, features: ['Engagement tracking', 'Intervention alerts', 'Success coaching'], icon: 'heart' },
  { id: 'logistics-tracking', name: 'Logistics Package Tracker', niche: 'Tech & Growth', description: 'Automated package tracking updates', monthlyPrice: 350, setupPrice: 550, features: ['Multi carrier support', 'Exception alerts', 'Delivery confirmation'], icon: 'truck' },
  { id: 'logistics-dispatch', name: 'Logistics Dispatch Optimizer', niche: 'Tech & Growth', description: 'Optimize delivery routing', monthlyPrice: 600, setupPrice: 950, features: ['Route optimization', 'Driver assignment', 'Real time tracking'], icon: 'map' },
  { id: 'manufacturing-lead', name: 'Manufacturing Lead Generator', niche: 'Professional Services', description: 'Find B2B manufacturing prospects', monthlyPrice: 700, setupPrice: 1100, features: ['Industry databases', 'Company research', 'Decision maker targeting'], icon: 'target' },
  { id: 'recruitment-sourcing', name: 'Recruitment Sourcing Bot', niche: 'Professional Services', description: 'AI recruiter for talent sourcing', monthlyPrice: 650, setupPrice: 1000, features: ['Resume screening', 'Skill matching', 'Interview scheduling'], icon: 'users' },
  { id: 'recruitment-retention', name: 'Recruitment Candidate Retention', niche: 'Professional Services', description: 'Keep candidates engaged in process', monthlyPrice: 450, setupPrice: 700, features: ['Status updates', 'Interview prep', 'Offer acceptance'], icon: 'heart' },
  { id: 'nonprofit-donor', name: 'Nonprofit Donor Manager', niche: 'Professional Services', description: 'Manage donor relationships and giving', monthlyPrice: 500, setupPrice: 800, features: ['Donor tracking', 'Campaign emails', 'Impact reporting'], icon: 'heart' },
  { id: 'nonprofit-volunteer', name: 'Nonprofit Volunteer Coordinator', niche: 'Professional Services', description: 'Coordinate volunteer programs', monthlyPrice: 400, setupPrice: 650, features: ['Shift scheduling', 'Task assignment', 'Hour tracking'], icon: 'calendar' },
  { id: 'beauty-salon-booking', name: 'Beauty Salon Booking', niche: 'Health & Wellness', description: 'Book salon appointments 24/7', monthlyPrice: 450, setupPrice: 700, features: ['Stylist assignment', 'Service catalog', 'Rescheduling'], icon: 'calendar' },
  { id: 'beauty-retention', name: 'Beauty Client Retention', niche: 'Health & Wellness', description: 'Keep beauty clients loyal', monthlyPrice: 400, setupPrice: 650, features: ['Appointment reminders', 'Loyalty rewards', 'Product recommendations'], icon: 'heart' },
  { id: 'veterinary-appointment', name: 'Veterinary Appointment Bot', niche: 'Health & Wellness', description: 'Manage pet appointment scheduling', monthlyPrice: 450, setupPrice: 700, features: ['Pet records', 'Vaccine reminders', 'Owner communication'], icon: 'calendar' },
  { id: 'veterinary-retention', name: 'Veterinary Client Retention', niche: 'Health & Wellness', description: 'Keep pet owner clients returning', monthlyPrice: 400, setupPrice: 650, features: ['Health reminders', 'Service recommendations', 'Loyalty programs'], icon: 'heart' },
  { id: 'education-marketing', name: 'Education Marketing Bot', niche: 'Professional Services', description: 'Generate qualified education leads', monthlyPrice: 500, setupPrice: 800, features: ['Student targeting', 'Parent outreach', 'Program recommendations'], icon: 'target' },
  { id: 'government-contractor', name: 'Government Contractor Bot', niche: 'Professional Services', description: 'Find government contract opportunities', monthlyPrice: 800, setupPrice: 1200, features: ['SAM.gov monitoring', 'RFP analysis', 'Bid preparation'], icon: 'target' },
  { id: 'nonprofit-grant', name: 'Nonprofit Grant Finder', niche: 'Professional Services', description: 'Identify matching grant opportunities', monthlyPrice: 600, setupPrice: 950, features: ['Database matching', 'Deadline alerts', 'Application support'], icon: 'target' },
  { id: 'franchise-lead', name: 'Franchise Lead Generator', niche: 'Retail', description: 'Generate franchise inquiry leads', monthlyPrice: 550, setupPrice: 850, features: ['Prospect qualifying', 'Info packet automation', 'Follow up sequencing'], icon: 'target' },
  { id: 'franchise-recruitment', name: 'Franchise Recruitment Agent', niche: 'Professional Services', description: 'Automate franchise recruitment', monthlyPrice: 650, setupPrice: 1000, features: ['Candidate screening', 'Territory matching', 'Financial qualification'], icon: 'users' },
  { id: 'plumbing-dispatch', name: 'Plumbing Emergency Dispatcher', niche: 'Plumbing', description: 'Handle emergency plumbing calls 24/7', monthlyPrice: 650, setupPrice: 950, features: ['Call qualification', 'Auto dispatch', 'Job estimation'], icon: 'phone' },
  { id: 'plumbing-follow-up', name: 'Plumbing Quote Follow Up', niche: 'Plumbing', description: 'Follow up on plumbing quotes automatically', monthlyPrice: 450, setupPrice: 700, features: ['Multi touch sequences', 'Quote reminders', 'Rebooking links'], icon: 'mail' },
  { id: 'electrical-scheduler', name: 'Electrician Scheduling Agent', niche: 'Electrical', description: 'Book electrical service calls 24/7', monthlyPrice: 500, setupPrice: 800, features: ['Job type triage', 'Calendar sync', 'Permit reminders'], icon: 'calendar' },
  { id: 'electrical-leads', name: 'Electrician Lead Qualifier', niche: 'Electrical', description: 'Qualify electrical repair leads instantly', monthlyPrice: 550, setupPrice: 800, features: ['Scope assessment', 'Estimate generation', 'Lead scoring'], icon: 'target' },
  { id: 'pest-control-booking', name: 'Pest Control Booking Agent', niche: 'Pest Control', description: 'Book pest inspections and treatments 24/7', monthlyPrice: 450, setupPrice: 700, features: ['Service scheduling', 'Recurring treatment plans', 'SMS reminders'], icon: 'calendar' },
  { id: 'pest-control-retention', name: 'Pest Control Retention Bot', niche: 'Pest Control', description: 'Keep pest control customers on recurring plans', monthlyPrice: 400, setupPrice: 650, features: ['Plan renewals', 'Seasonal offers', 'Referral requests'], icon: 'heart' },
]
