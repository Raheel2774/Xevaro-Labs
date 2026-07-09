// ─── Xevaro Labs — social proof & trust layer ────────────────────────────────
// Centralized credibility content reused across the homepage, services, about,
// pricing, case study and testimonials pages. Keeping it here guarantees a
// consistent story. All user-visible copy is written without hyphens or dashes.
//
// NOTE: TESTIMONIALS are realistic placeholders (role + industry, anonymized).
// Replace the quotes and attribution with real, permissioned client quotes as
// they come in. The structure stays the same.

export interface Testimonial {
  quote: string
  name: string
  role: string
  industry: string
  result: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Within the first week the callback agent booked jobs we would have lost. It paid for itself before we finished onboarding.',
    name: 'Marcus D.',
    role: 'Owner',
    industry: 'HVAC & Plumbing',
    result: '38% more jobs',
  },
  {
    quote:
      'Our front desk stopped drowning in scheduling. The booking agent handles it around the clock and no shows dropped off a cliff.',
    name: 'Dr. Priya S.',
    role: 'Practice Owner',
    industry: 'Dental',
    result: 'No shows down 41%',
  },
  {
    quote:
      'Support tickets that used to take hours now resolve in seconds. Our team only touches the hard stuff now.',
    name: 'Elena R.',
    role: 'Head of CX',
    industry: 'Ecommerce',
    result: '80% auto resolved',
  },
  {
    quote:
      'The follow up agent revived quotes we had written off. It is the highest return thing we have ever plugged in.',
    name: 'James T.',
    role: 'Sales Director',
    industry: 'Roofing',
    result: '2.4x close rate',
  },
  {
    quote:
      'They did not hand us a slide deck, they handed us a working system in two weeks. Completely different from other agencies.',
    name: 'Sofia M.',
    role: 'Founder',
    industry: 'SaaS',
    result: 'Live in 14 days',
  },
  {
    quote:
      'Reviews went from a trickle to a flood, and we climbed to the top of local search. The reputation engine just runs itself.',
    name: 'Andre K.',
    role: 'GM',
    industry: 'Auto Services',
    result: '4.9 star average',
  },
  {
    quote:
      'We plugged the AI agent into WhatsApp and it now answers leads at midnight and books them for the morning. Game changer.',
    name: 'Nadia H.',
    role: 'Founder',
    industry: 'Med Spa',
    result: '3x consult bookings',
  },
  {
    quote:
      'Xevaro built our whole automation stack in stages, so we saw wins every single week instead of waiting for a big launch.',
    name: 'Tom B.',
    role: 'Operations Lead',
    industry: 'Real Estate',
    result: '12 hrs saved weekly',
  },
]

// Headline company metrics, one source of truth (also used on the homepage).
export const TRUST_STATS: { value: string; label: string }[] = [
  { value: '100+', label: 'Workflows automated' },
  { value: '80%', label: 'Avg. ops time saved' },
  { value: '95%', label: 'Client retention' },
  { value: '$2M+', label: 'Revenue unlocked' },
]

// Platforms Xevaro builds on and integrates with, shown as a proof strip.
// These are real integration targets, so the strip is honest and credible.
export const INTEGRATIONS: string[] = [
  'n8n', 'OpenAI', 'Claude', 'WhatsApp', 'Shopify', 'Google', 'Twilio',
  'Zapier', 'Make', 'Stripe', 'HubSpot', 'Calendly', 'Slack', 'Notion',
]

// Industries served, used as a scrolling "trusted across" bar.
export const INDUSTRIES_SERVED: string[] = [
  'Home Services', 'Healthcare', 'Ecommerce', 'SaaS', 'Real Estate',
  'Legal', 'Med Spas', 'Automotive', 'Fitness', 'Professional Services',
  'Hospitality', 'Finance & Lending',
]

// How we work, the delivery process (builds trust by removing uncertainty).
export interface ProcessStep {
  step: string
  title: string
  desc: string
}

export const PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Audit',
    desc: 'A short discovery call to map your workflows and pinpoint the highest return automation to build first.',
  },
  {
    step: '02',
    title: 'Architect',
    desc: 'We design your agent or system around your exact tools, rules and brand, and show you the plan before we build.',
  },
  {
    step: '03',
    title: 'Deploy',
    desc: 'We build, test and launch a working system in days, integrated with your calendar, CRM and messaging.',
  },
  {
    step: '04',
    title: 'Optimize',
    desc: 'We monitor, tune and expand your systems over time so results compound month after month.',
  },
]

// Guarantees and risk reversal, what makes buying safe.
export interface Promise {
  icon: string  // lucide-react icon name
  title: string
  desc: string
}

export const PROMISES: Promise[] = [
  {
    icon: 'Rocket',
    title: 'Live in days, not months',
    desc: 'Most systems go live within one to two weeks, so you see results fast, not after a long build.',
  },
  {
    icon: 'ShieldCheck',
    title: 'You own everything',
    desc: 'Self hostable infrastructure on your accounts and data. No lock in, no per task software tax.',
  },
  {
    icon: 'Wrench',
    title: 'Built for your workflow',
    desc: 'Every agent is custom built to how you actually operate, not a generic chatbot template.',
  },
  {
    icon: 'LineChart',
    title: 'Measured on outcomes',
    desc: 'We track the metric that matters, booked jobs, recovered revenue, hours saved, not vanity stats.',
  },
]

// Why Xevaro, differentiators against typical agencies.
export const DIFFERENTIATORS: { title: string; desc: string }[] = [
  {
    title: 'Systems, not slideware',
    desc: 'Other agencies sell strategy decks and long discovery. We ship working infrastructure you can use this month.',
  },
  {
    title: 'One partner, whole stack',
    desc: 'Agents, automations, websites and data, architected to work together as one command layer, not disconnected tools.',
  },
  {
    title: 'Human in the loop by design',
    desc: 'Automation handles the repetitive work, your team is looped in on anything sensitive, with full context.',
  },
  {
    title: 'A retainer that compounds',
    desc: 'We do not disappear at launch. Systems are monitored and improved continuously so your return keeps climbing.',
  },
]
