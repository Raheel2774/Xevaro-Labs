// ─── Xevaro AI Agents — catalog data layer ───────────────────────────────────
// 25 industry niches, each with 3 deployable AI agents, plus the 5 flagship
// "best seller" agents featured on /best-sellers. Consumed by /agents and
// /best-sellers. Icons are lucide-react names, resolved in the page component.
//
// Note: slug/id/icon are internal identifiers (never shown to users). All
// user-visible copy is intentionally written without hyphens or dashes.

export interface Agent {
  id: string          // stable slug, unique across the whole catalog
  name: string        // agent product name
  desc: string        // one-line what-it-does
  features: string[]  // 3 concrete capabilities
  outcome: string     // the business result
}

export interface Niche {
  slug: string
  name: string
  category: NicheCategory
  icon: string        // lucide-react icon name
  tagline: string     // short positioning line for the niche
  agents: Agent[]
}

export type NicheCategory =
  | 'Home Services'
  | 'Health & Wellness'
  | 'Professional'
  | 'Retail & Commerce'
  | 'Property & Finance'
  | 'Tech & Growth'

export const NICHE_CATEGORIES: NicheCategory[] = [
  'Home Services',
  'Health & Wellness',
  'Professional',
  'Retail & Commerce',
  'Property & Finance',
  'Tech & Growth',
]

export const NICHES: Niche[] = [
  {
    slug: 'cleaning',
    name: 'Cleaning Services',
    category: 'Home Services',
    icon: 'Sparkles',
    tagline: 'Turn every missed call and quote request into a booked job.',
    agents: [
      {
        id: 'cleaning-textback',
        name: 'Instant Callback Agent',
        desc: 'Instantly texts back every missed call and books the job before the lead calls a competitor.',
        features: ['Replies in under 30 seconds', 'Live calendar booking', 'Captures job details'],
        outcome: 'Recover 30 to 50 percent of missed call leads that used to vanish.',
      },
      {
        id: 'cleaning-quote',
        name: 'Instant Quote Agent',
        desc: 'Chats visitors through square footage, rooms and frequency to return an instant estimate.',
        features: ['Dynamic price logic', 'Room and photo intake', 'Auto follow up if idle'],
        outcome: 'Qualified quotes around the clock with zero staff time.',
      },
      {
        id: 'cleaning-recurring',
        name: 'Recurring Booking Agent',
        desc: 'Handles reschedules, reminders and rebooks recurring clients on autopilot.',
        features: ['Reminder and reschedule flow', 'No show recovery', 'Loyalty rebooking nudges'],
        outcome: 'Higher retention and a fuller recurring calendar.',
      },
    ],
  },
  {
    slug: 'hvac-plumbing',
    name: 'HVAC, Plumbing & Electrical',
    category: 'Home Services',
    icon: 'Wrench',
    tagline: 'Dispatch emergencies fast and never let an estimate go cold.',
    agents: [
      {
        id: 'hvac-dispatch',
        name: 'Emergency Dispatch Agent',
        desc: 'Answers around the clock, scores urgency, captures the issue and routes to the on call tech.',
        features: ['Urgency scoring', 'Address and issue capture', 'On call routing by text'],
        outcome: 'Every after hours emergency answered and booked.',
      },
      {
        id: 'hvac-review',
        name: 'Review Request Agent',
        desc: 'Fires a personalized review ask the moment a job is marked complete.',
        features: ['Post job trigger', 'Google and Facebook links', 'Sentiment gate'],
        outcome: 'A steady flow of five star reviews that win local search.',
      },
      {
        id: 'hvac-maintenance',
        name: 'Seasonal Maintenance Agent',
        desc: 'Reengages past customers for tune ups and service plans each season.',
        features: ['Service history recall', 'Seasonal campaigns', 'Plan upsell'],
        outcome: 'Reactivated revenue from your existing customer list.',
      },
    ],
  },
  {
    slug: 'roofing',
    name: 'Roofing & Contractors',
    category: 'Home Services',
    icon: 'HardHat',
    tagline: 'Catch storm leads instantly and rescue stalled estimates.',
    agents: [
      {
        id: 'roofing-stormlead',
        name: 'Storm Lead Callback Agent',
        desc: 'Captures inbound storm damage leads and triggers an instant callback.',
        features: ['Instant lead capture', 'Callback trigger', 'Insurance claim intake'],
        outcome: 'First to respond advantage on high value storm jobs.',
      },
      {
        id: 'roofing-estimate',
        name: 'Estimate Follow Up Agent',
        desc: 'Chases open estimates on a smart cadence so deals stop dying in the pipeline.',
        features: ['Multi touch follow up', 'Objection handling', 'Requote booking'],
        outcome: 'More signed contracts from estimates you already gave.',
      },
      {
        id: 'roofing-financing',
        name: 'Financing Prequalify Agent',
        desc: 'Prequalifies homeowners for financing before the sales visit.',
        features: ['Financing questionnaire', 'Soft check routing', 'Appointment set'],
        outcome: 'Higher close rates on bigger ticket jobs.',
      },
    ],
  },
  {
    slug: 'landscaping-pest',
    name: 'Landscaping & Pest Control',
    category: 'Home Services',
    icon: 'Leaf',
    tagline: 'Keep the seasonal calendar full and recurring routes booked.',
    agents: [
      {
        id: 'landscaping-quote',
        name: 'Seasonal Quote Agent',
        desc: 'Handles seasonal service inquiries and books site visits automatically.',
        features: ['Service selector', 'Site visit booking', 'Seasonal pricing'],
        outcome: 'A booked route before the season even starts.',
      },
      {
        id: 'landscaping-recurring',
        name: 'Recurring Route Agent',
        desc: 'Schedules and reminds recurring service customers to cut churn.',
        features: ['Auto scheduling', 'Weather reschedule', 'Renewal prompts'],
        outcome: 'Predictable recurring revenue with fewer cancellations.',
      },
      {
        id: 'landscaping-referral',
        name: 'Referral Engine Agent',
        desc: 'Asks happy customers for referrals and neighbor introductions.',
        features: ['Post service ask', 'Neighbor campaigns', 'Reward tracking'],
        outcome: 'Cheap, compounding word of mouth growth.',
      },
    ],
  },
  {
    slug: 'auto-repair',
    name: 'Auto Repair & Detailing',
    category: 'Home Services',
    icon: 'Car',
    tagline: 'Book more bays and bring customers back on schedule.',
    agents: [
      {
        id: 'auto-quote',
        name: 'Quote & Appointment Agent',
        desc: 'Answers service questions, quotes common jobs and books the bay.',
        features: ['Service pricing', 'Bay scheduling', 'Drop off reminders'],
        outcome: 'A fuller shop schedule without phone tag.',
      },
      {
        id: 'auto-reminder',
        name: 'Service Reminder Agent',
        desc: 'Sends mileage and time based reminders for the next service.',
        features: ['Interval tracking', 'Personalized reminders', 'Rebooking link'],
        outcome: 'Repeat visits that would otherwise be forgotten.',
      },
      {
        id: 'auto-upsell',
        name: 'Review & Upsell Agent',
        desc: 'Requests reviews and offers relevant add on services after each visit.',
        features: ['Review request', 'Add on offers', 'Loyalty tracking'],
        outcome: 'Higher ticket size and stronger reputation.',
      },
    ],
  },
  {
    slug: 'dental',
    name: 'Dental Practices',
    category: 'Health & Wellness',
    icon: 'Stethoscope',
    tagline: 'Fill the chair, recover no shows and keep recalls on time.',
    agents: [
      {
        id: 'dental-booking',
        name: 'Booking & Recovery Agent',
        desc: 'Books appointments and automatically recovers cancellations and no shows.',
        features: ['Real time booking', 'No show win back', 'Waitlist fill'],
        outcome: 'Fewer empty chairs and higher production.',
      },
      {
        id: 'dental-insurance',
        name: 'Insurance Precheck Agent',
        desc: 'Prequalifies insurance and coverage questions before the visit.',
        features: ['Coverage questions', 'Info collection', 'Front desk handoff'],
        outcome: 'Smoother check ins and fewer billing surprises.',
      },
      {
        id: 'dental-recall',
        name: 'Recall & Reactivation Agent',
        desc: 'Runs six month cleaning recalls and reactivates lapsed patients.',
        features: ['Recall automation', 'Lapsed patient outreach', 'Confirm or reschedule'],
        outcome: 'A predictable stream of hygiene appointments.',
      },
    ],
  },
  {
    slug: 'medspa',
    name: 'Med Spas & Aesthetics',
    category: 'Health & Wellness',
    icon: 'Syringe',
    tagline: 'Book high value consults and nurture every lead.',
    agents: [
      {
        id: 'medspa-consult',
        name: 'Consultation Booking Agent',
        desc: 'Answers treatment questions and books consultations round the clock.',
        features: ['Treatment questions', 'Consult scheduling', 'Deposit collection'],
        outcome: 'A booked consult calendar for premium services.',
      },
      {
        id: 'medspa-nurture',
        name: 'High Value Nurture Agent',
        desc: 'Nurtures leads over text toward high value procedures.',
        features: ['Multi touch nurture', 'Before and after sharing', 'Offer timing'],
        outcome: 'More closed high value treatments.',
      },
      {
        id: 'medspa-membership',
        name: 'Membership & Loyalty Agent',
        desc: 'Drives membership renewals and rebooking of recurring treatments.',
        features: ['Renewal reminders', 'Loyalty perks', 'Rebooking nudges'],
        outcome: 'Recurring revenue and higher lifetime value.',
      },
    ],
  },
  {
    slug: 'chiro-pt',
    name: 'Chiropractic & Physical Therapy',
    category: 'Health & Wellness',
    icon: 'Activity',
    tagline: 'Onboard new patients and keep treatment plans on track.',
    agents: [
      {
        id: 'chiro-intake',
        name: 'New Patient Intake Agent',
        desc: 'Qualifies and schedules new patients with intake paperwork prefilled.',
        features: ['Symptom intake', 'Scheduling', 'Form prefill'],
        outcome: 'More new patients with less admin load.',
      },
      {
        id: 'chiro-adherence',
        name: 'Plan Adherence Agent',
        desc: 'Reminds patients of appointments to keep treatment plans on schedule.',
        features: ['Visit reminders', 'Progress check ins', 'Reschedule flow'],
        outcome: 'Better outcomes and completed care plans.',
      },
      {
        id: 'chiro-reactivation',
        name: 'Dormant Patient Agent',
        desc: 'Reactivates patients who dropped off mid treatment.',
        features: ['Lapsed outreach', 'Reevaluation offers', 'Booking link'],
        outcome: 'Recovered revenue from your existing chart base.',
      },
    ],
  },
  {
    slug: 'veterinary',
    name: 'Veterinary Clinics',
    category: 'Health & Wellness',
    icon: 'PawPrint',
    tagline: 'Handle bookings, refills and after hours triage.',
    agents: [
      {
        id: 'vet-booking',
        name: 'Appointment & Refill Agent',
        desc: 'Books visits and handles prescription refill requests automatically.',
        features: ['Appointment booking', 'Refill requests', 'Pet record lookup'],
        outcome: 'A freed up front desk and faster service.',
      },
      {
        id: 'vet-reminders',
        name: 'Vaccination Reminder Agent',
        desc: 'Sends vaccination and checkup reminders on the right schedule.',
        features: ['Vaccine schedule', 'Checkup recall', 'Confirm or reschedule'],
        outcome: 'Healthier patients and steady visit volume.',
      },
      {
        id: 'vet-triage',
        name: 'After Hours Triage Agent',
        desc: 'Provides after hours triage and routes emergencies appropriately.',
        features: ['Urgency guidance', 'Emergency routing', 'Callback capture'],
        outcome: 'Peace of mind for pet owners and fewer missed emergencies.',
      },
    ],
  },
  {
    slug: 'fitness',
    name: 'Fitness & Gyms',
    category: 'Health & Wellness',
    icon: 'Dumbbell',
    tagline: 'Convert trials, win back cancellations and fill classes.',
    agents: [
      {
        id: 'fitness-trial',
        name: 'Trial & Onboarding Agent',
        desc: 'Books trial memberships and runs a first week onboarding sequence.',
        features: ['Trial booking', 'Onboarding flow', 'Goal capture'],
        outcome: 'Higher trial to member conversion.',
      },
      {
        id: 'fitness-winback',
        name: 'Cancellation Win Back Agent',
        desc: 'Intercepts cancellations and offers save incentives.',
        features: ['Cancel interception', 'Save offers', 'Pause options'],
        outcome: 'Lower churn and retained members.',
      },
      {
        id: 'fitness-classes',
        name: 'Class Scheduling Agent',
        desc: 'Handles class booking, waitlists and capacity reminders.',
        features: ['Class booking', 'Waitlist fill', 'Reminders'],
        outcome: 'Fuller classes and a better member experience.',
      },
    ],
  },
  {
    slug: 'law',
    name: 'Law Firms',
    category: 'Professional',
    icon: 'Scale',
    tagline: 'Qualify cases and book consults without the front desk grind.',
    agents: [
      {
        id: 'law-intake',
        name: 'Case Intake Agent',
        desc: 'Qualifies leads by case type and runs conflict check questions.',
        features: ['Case type triage', 'Conflict questions', 'Qualification'],
        outcome: 'Only qualified matters reach your attorneys.',
      },
      {
        id: 'law-consult',
        name: 'Consultation Scheduler Agent',
        desc: 'Books consultations and precollects relevant documents.',
        features: ['Consult booking', 'Document requests', 'Reminders'],
        outcome: 'Consults that are ready to be productive.',
      },
      {
        id: 'law-status',
        name: 'Client Status Agent',
        desc: 'Answers routine status questions and updates clients automatically.',
        features: ['Status updates', 'Question handling', 'Escalation to staff'],
        outcome: 'Happier clients and fewer interruption calls.',
      },
    ],
  },
  {
    slug: 'accounting',
    name: 'Accounting & Bookkeeping',
    category: 'Professional',
    icon: 'Calculator',
    tagline: 'Book discovery calls and chase documents automatically.',
    agents: [
      {
        id: 'accounting-booking',
        name: 'Discovery Call Agent',
        desc: 'Qualifies prospects and books discovery calls for new engagements.',
        features: ['Needs qualification', 'Call booking', 'Service routing'],
        outcome: 'A calendar of prequalified prospects.',
      },
      {
        id: 'accounting-docs',
        name: 'Document Collection Agent',
        desc: 'Chases missing documents so filings never stall.',
        features: ['Checklist tracking', 'Reminder cadence', 'Secure upload links'],
        outcome: 'Faster closes and on time filings.',
      },
      {
        id: 'accounting-deadline',
        name: 'Deadline Nurture Agent',
        desc: 'Runs tax deadline and quarterly nurture campaigns.',
        features: ['Deadline reminders', 'Quarterly outreach', 'Upsell prompts'],
        outcome: 'Retained clients and smoother busy seasons.',
      },
    ],
  },
  {
    slug: 'coaches',
    name: 'Coaches & Consultants',
    category: 'Professional',
    icon: 'GraduationCap',
    tagline: 'Qualify applicants and book high value discovery calls.',
    agents: [
      {
        id: 'coaches-discovery',
        name: 'Discovery Call Agent',
        desc: 'Qualifies leads and books discovery calls for high value offers.',
        features: ['Qualification quiz', 'Calendar booking', 'No show recovery'],
        outcome: 'A calendar full of right fit prospects.',
      },
      {
        id: 'coaches-magnet',
        name: 'Lead Magnet Funnel Agent',
        desc: 'Delivers lead magnets and nurtures subscribers toward a call.',
        features: ['Magnet delivery', 'Nurture sequence', 'Call timing'],
        outcome: 'A warm pipeline that books itself.',
      },
      {
        id: 'coaches-application',
        name: 'Application Review Agent',
        desc: 'Screens applications for high value programs and routes the best fits.',
        features: ['Application scoring', 'Auto routing', 'Follow up'],
        outcome: 'Time spent only on serious buyers.',
      },
    ],
  },
  {
    slug: 'marketing-agency',
    name: 'Marketing Agencies',
    category: 'Professional',
    icon: 'Megaphone',
    tagline: 'White label agents for onboarding, reporting and lead generation.',
    agents: [
      {
        id: 'agency-onboarding',
        name: 'Client Onboarding Agent',
        desc: 'Runs client intake and collects assets, access and brand details.',
        features: ['Intake forms', 'Asset collection', 'Kickoff scheduling'],
        outcome: 'Faster, cleaner client onboarding.',
      },
      {
        id: 'agency-reporting',
        name: 'Reporting Automation Agent',
        desc: 'Pulls metrics and generates client ready performance summaries.',
        features: ['Metric pulls', 'Auto summaries', 'Scheduled delivery'],
        outcome: 'Hours saved on monthly reporting.',
      },
      {
        id: 'agency-leadgen',
        name: 'Lead Qualification Agent',
        desc: 'Qualifies inbound leads for your own agency funnel.',
        features: ['Lead scoring', 'Booking', 'CRM sync'],
        outcome: 'A predictable pipeline for the agency itself.',
      },
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    category: 'Retail & Commerce',
    icon: 'UtensilsCrossed',
    tagline: 'Manage reservations, orders and reputation on autopilot.',
    agents: [
      {
        id: 'restaurant-reservation',
        name: 'Reservation & Waitlist Agent',
        desc: 'Takes reservations, manages the waitlist and confirms tables.',
        features: ['Reservation booking', 'Waitlist management', 'Confirmations'],
        outcome: 'Full tables and fewer no shows.',
      },
      {
        id: 'restaurant-order',
        name: 'Order Recovery Agent',
        desc: 'Recovers abandoned online orders and nudges repeat orders.',
        features: ['Abandoned order recovery', 'Repeat order nudges', 'Offer timing'],
        outcome: 'More completed and repeat orders.',
      },
      {
        id: 'restaurant-review',
        name: 'Review & Reputation Agent',
        desc: 'Requests reviews and responds to feedback to protect your rating.',
        features: ['Review requests', 'Response drafting', 'Sentiment gate'],
        outcome: 'A stronger rating that drives foot traffic.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce & DTC',
    category: 'Retail & Commerce',
    icon: 'ShoppingCart',
    tagline: 'Support shoppers and recover revenue around the clock.',
    agents: [
      {
        id: 'ecommerce-support',
        name: 'Support & Order Status Agent',
        desc: 'Answers order status, returns and sizing questions instantly.',
        features: ['Order status lookup', 'Returns handling', 'Sizing help'],
        outcome: 'Deflected tickets and happier customers.',
      },
      {
        id: 'ecommerce-cart',
        name: 'Abandoned Cart Agent',
        desc: 'Recovers abandoned carts across text and chat with smart offers.',
        features: ['Cart recovery', 'Dynamic offers', 'Multi channel'],
        outcome: 'Recovered revenue that was walking out the door.',
      },
      {
        id: 'ecommerce-postpurchase',
        name: 'Post Purchase Agent',
        desc: 'Requests reviews and drives replenishment and repeat orders.',
        features: ['Review requests', 'Replenishment reminders', 'Cross sell'],
        outcome: 'Higher lifetime value per customer.',
      },
    ],
  },
  {
    slug: 'salons',
    name: 'Salons & Barbershops',
    category: 'Retail & Commerce',
    icon: 'Scissors',
    tagline: 'Keep chairs booked and slow days full.',
    agents: [
      {
        id: 'salons-booking',
        name: 'Booking & Rebooking Agent',
        desc: 'Books and rebooks appointments and manages stylist calendars.',
        features: ['Online booking', 'Rebooking prompts', 'Stylist routing'],
        outcome: 'A consistently full appointment book.',
      },
      {
        id: 'salons-noshow',
        name: 'No Show Protection Agent',
        desc: 'Sends reminders and collects deposits to cut no shows.',
        features: ['Reminders', 'Deposit collection', 'Waitlist fill'],
        outcome: 'Protected revenue from empty chairs.',
      },
      {
        id: 'salons-slowday',
        name: 'Slow Day Fill Agent',
        desc: 'Runs flash offers to fill open slots on quiet days.',
        features: ['Gap detection', 'Flash campaigns', 'Instant booking'],
        outcome: 'Revenue from hours that would sit empty.',
      },
    ],
  },
  {
    slug: 'retail',
    name: 'Retail & Local Shops',
    category: 'Retail & Commerce',
    icon: 'Store',
    tagline: 'Answer shoppers, drive visits and grow loyalty.',
    agents: [
      {
        id: 'retail-concierge',
        name: 'Product Concierge Agent',
        desc: 'Answers product, stock and store hours questions instantly.',
        features: ['Inventory answers', 'Hours and location', 'Product guidance'],
        outcome: 'More informed shoppers and fewer missed sales.',
      },
      {
        id: 'retail-loyalty',
        name: 'Loyalty & Offers Agent',
        desc: 'Runs loyalty enrollment and targeted promo campaigns.',
        features: ['Loyalty signup', 'Targeted offers', 'Win back'],
        outcome: 'Repeat visits and higher basket size.',
      },
      {
        id: 'retail-reservation',
        name: 'Reserve & Pickup Agent',
        desc: 'Handles in store reservations and pickup requests.',
        features: ['Item reservation', 'Pickup scheduling', 'Ready alerts'],
        outcome: 'Seamless omnichannel convenience.',
      },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    category: 'Property & Finance',
    icon: 'Home',
    tagline: 'Qualify buyers, book showings and follow up fast.',
    agents: [
      {
        id: 'realestate-qual',
        name: 'Lead Qualification Agent',
        desc: 'Qualifies buyers and sellers by budget, timeline and preapproval.',
        features: ['Budget and timeline', 'Preapproval check', 'Routing to agent'],
        outcome: 'Time spent only on ready to move clients.',
      },
      {
        id: 'realestate-alerts',
        name: 'Listing Match Agent',
        desc: 'Matches buyers to new listings and alerts them automatically.',
        features: ['Criteria matching', 'New listing alerts', 'Showing prompt'],
        outcome: 'Engaged buyers who act on the right homes.',
      },
      {
        id: 'realestate-showing',
        name: 'Showing & Follow Up Agent',
        desc: 'Schedules showings and runs post tour follow up.',
        features: ['Showing booking', 'Post tour follow up', 'Feedback capture'],
        outcome: 'More second showings and faster offers.',
      },
    ],
  },
  {
    slug: 'mortgage',
    name: 'Mortgage & Lending',
    category: 'Property & Finance',
    icon: 'Landmark',
    tagline: 'Prequalify borrowers and keep files moving.',
    agents: [
      {
        id: 'mortgage-prequal',
        name: 'Prequalification Agent',
        desc: 'Runs borrower intake and prequalification before the loan officer calls.',
        features: ['Intake questionnaire', 'Soft prequal', 'Officer routing'],
        outcome: 'Loan officers focused on qualified borrowers.',
      },
      {
        id: 'mortgage-docs',
        name: 'Document & Status Agent',
        desc: 'Collects documents and keeps borrowers updated on file status.',
        features: ['Document chasing', 'Status updates', 'Milestone alerts'],
        outcome: 'Faster closings and fewer status calls.',
      },
      {
        id: 'mortgage-ratealert',
        name: 'Rate Reengagement Agent',
        desc: 'Reengages past leads when rates or programs change.',
        features: ['Rate alerts', 'Refinance outreach', 'Booking link'],
        outcome: 'Revived deals from your existing database.',
      },
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance Agencies',
    category: 'Property & Finance',
    icon: 'ShieldCheck',
    tagline: 'Qualify quotes, renew policies and cross sell.',
    agents: [
      {
        id: 'insurance-quote',
        name: 'Quote Qualification Agent',
        desc: 'Qualifies quote requests and routes them to the right producer.',
        features: ['Coverage intake', 'Qualification', 'Producer routing'],
        outcome: 'Producers working only warm quote requests.',
      },
      {
        id: 'insurance-renewal',
        name: 'Policy Renewal Agent',
        desc: 'Automates renewal reminders and prevents lapses.',
        features: ['Renewal reminders', 'Payment prompts', 'Lapse prevention'],
        outcome: 'Higher retention and steadier book value.',
      },
      {
        id: 'insurance-crosssell',
        name: 'Cross Sell Agent',
        desc: 'Identifies and pursues cross sell opportunities across auto, home and life.',
        features: ['Bundle detection', 'Cross sell outreach', 'Appointment set'],
        outcome: 'More policies per household.',
      },
    ],
  },
  {
    slug: 'property-management',
    name: 'Property Management',
    category: 'Property & Finance',
    icon: 'Building2',
    tagline: 'Handle tenants, maintenance and renewals automatically.',
    agents: [
      {
        id: 'pm-inquiry',
        name: 'Tenant & Maintenance Agent',
        desc: 'Answers tenant questions and logs maintenance requests.',
        features: ['Leasing questions', 'Maintenance intake', 'Vendor routing'],
        outcome: 'Faster response and fewer manual tickets.',
      },
      {
        id: 'pm-rent',
        name: 'Rent Reminder Agent',
        desc: 'Sends rent reminders and follows up on late payments.',
        features: ['Rent reminders', 'Late payment follow up', 'Payment links'],
        outcome: 'Improved on time payment rates.',
      },
      {
        id: 'pm-renewal',
        name: 'Lease Renewal Agent',
        desc: 'Runs lease renewal outreach ahead of expiry.',
        features: ['Renewal outreach', 'Offer terms', 'Signing coordination'],
        outcome: 'Higher renewal rates and lower vacancy.',
      },
    ],
  },
  {
    slug: 'solar',
    name: 'Solar & Home Energy',
    category: 'Property & Finance',
    icon: 'Sun',
    tagline: 'Qualify homeowners and set in home consults.',
    agents: [
      {
        id: 'solar-qual',
        name: 'Solar Qualification Agent',
        desc: 'Qualifies homeowners by roof, bill and ownership before booking.',
        features: ['Roof and bill intake', 'Ownership check', 'Qualification'],
        outcome: 'Only viable homes reach your closers.',
      },
      {
        id: 'solar-appointment',
        name: 'Consult Setter Agent',
        desc: 'Books in home or virtual consultations with qualified prospects.',
        features: ['Consult booking', 'Reminder flow', 'Rep routing'],
        outcome: 'A full calendar of qualified consults.',
      },
      {
        id: 'solar-nurture',
        name: 'Long Cycle Nurture Agent',
        desc: 'Nurtures slow decision buyers until they are ready to move.',
        features: ['Long nurture', 'Incentive timing', 'Reengagement'],
        outcome: 'Closed deals from patient, long cycle leads.',
      },
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS & Startups',
    category: 'Tech & Growth',
    icon: 'Cpu',
    tagline: 'Onboard users, convert trials and prevent churn.',
    agents: [
      {
        id: 'saas-onboarding',
        name: 'Onboarding & Product Tour Agent',
        desc: 'Guides new users through activation and answers setup questions.',
        features: ['Guided onboarding', 'In app answers', 'Activation nudges'],
        outcome: 'Higher activation and faster time to value.',
      },
      {
        id: 'saas-trial',
        name: 'Trial to Paid Agent',
        desc: 'Runs conversion sequences to turn trials into paying customers.',
        features: ['Trial nudges', 'Feature highlights', 'Upgrade prompt'],
        outcome: 'A measurable lift in trial conversion.',
      },
      {
        id: 'saas-churn',
        name: 'Churn Risk Agent',
        desc: 'Detects churn signals and triggers win back outreach.',
        features: ['Usage drop detection', 'Win back flows', 'Save offers'],
        outcome: 'Lower churn and stronger net revenue retention.',
      },
    ],
  },
  {
    slug: 'events-travel',
    name: 'Events, Weddings & Travel',
    category: 'Tech & Growth',
    icon: 'PartyPopper',
    tagline: 'Qualify inquiries and follow up until they book.',
    agents: [
      {
        id: 'events-inquiry',
        name: 'Inquiry & Availability Agent',
        desc: 'Handles inquiries, checks availability and captures event details.',
        features: ['Availability check', 'Detail capture', 'Quote routing'],
        outcome: 'Qualified inquiries with dates on hold.',
      },
      {
        id: 'events-followup',
        name: 'Quote Follow Up Agent',
        desc: 'Follows up on quotes and proposals until a decision is made.',
        features: ['Multi touch follow up', 'Add on upsell', 'Booking push'],
        outcome: 'More signed contracts from open quotes.',
      },
      {
        id: 'events-coordination',
        name: 'Pre Event Coordination Agent',
        desc: 'Sends reminders and coordinates details before the big day or trip.',
        features: ['Reminder flows', 'Detail confirmation', 'Vendor coordination'],
        outcome: 'Smooth events and glowing referrals.',
      },
    ],
  },
]

// ─── Flagship best sellers (top 5, cross industry) ───────────────────────────
// The highest demand agents, featured on /best-sellers. They map to real agents
// in the catalog but are positioned as universal, productized heroes.

export interface Flagship {
  id: string
  rank: number
  name: string
  tagline: string
  problem: string
  how: string[]          // how it works, step by step
  results: { stat: string; label: string }[]
  integrations: string[]
  bestFor: string
  badge: string
}

export const FLAGSHIP_AGENTS: Flagship[] = [
  {
    id: 'speed-to-lead',
    rank: 1,
    name: 'Speed to Lead AI',
    tagline: 'Every missed call and web lead answered in under 30 seconds, around the clock.',
    problem:
      '78 percent of customers buy from the business that responds first. Missed calls and slow replies quietly bleed revenue every single day.',
    how: [
      'Detects a missed call, form fill or message the instant it lands',
      'Texts back and starts a natural conversation immediately',
      'Qualifies the lead and books it straight onto your calendar',
      'Hands off hot leads to your team with full context',
    ],
    results: [
      { stat: 'Under 30s', label: 'Response time' },
      { stat: 'Up to 50%', label: 'More leads captured' },
      { stat: '24/7', label: 'Always on' },
    ],
    integrations: ['Twilio SMS', 'Google Calendar', 'Your CRM', 'WhatsApp'],
    bestFor: 'Any local or service business that runs on inbound calls and leads.',
    badge: 'Most Popular',
  },
  {
    id: 'ai-booking',
    rank: 2,
    name: 'AI Booking & Intake Agent',
    tagline: 'A tireless front desk that qualifies, books and reschedules on its own.',
    problem:
      'Your team drowns in scheduling back and forth while leads wait, and no shows quietly erode the calendar.',
    how: [
      'Answers questions and qualifies the customer in natural language',
      'Books directly into your live calendar with buffers and rules',
      'Sends reminders and handles reschedules automatically',
      'Fills gaps from a smart waitlist when slots open',
    ],
    results: [
      { stat: '40%', label: 'Fewer no shows' },
      { stat: '10+ hrs', label: 'Saved weekly' },
      { stat: '100%', label: 'After hours coverage' },
    ],
    integrations: ['Calendly', 'Google Calendar', 'Acuity', 'CRM, SMS and Email'],
    bestFor: 'Clinics, salons, agencies and trades, anyone booking appointments.',
    badge: 'Staff Favorite',
  },
  {
    id: 'ai-support',
    rank: 3,
    name: '24/7 AI Support Agent',
    tagline: 'Instant, on brand answers across chat, WhatsApp, email and voice.',
    problem:
      'Customers expect instant answers. Every delayed reply is a refund risk, a bad review, or a lost sale.',
    how: [
      'Learns your business from your own knowledge base and docs',
      'Answers routine questions instantly across every channel',
      'Looks up orders, bookings and account details in real time',
      'Escalates anything sensitive to a human with full context',
    ],
    results: [
      { stat: '80%', label: 'Tickets auto resolved' },
      { stat: 'Seconds', label: 'To first reply' },
      { stat: '5 star', label: 'Consistent experience' },
    ],
    integrations: ['Website Chat', 'WhatsApp', 'Email and Helpdesk', 'Voice'],
    bestFor: 'Ecommerce, SaaS and any business with repetitive customer questions.',
    badge: 'Best Value',
  },
  {
    id: 'ai-followup',
    rank: 4,
    name: 'AI Sales Follow Up Agent',
    tagline: 'Revives cold leads and old quotes until they buy, or opt out.',
    problem:
      'Most deals die in the follow up. Quotes go cold, and busy teams never chase every lead the way they should.',
    how: [
      'Runs a smart, human sounding multi touch cadence',
      'Handles common objections and answers questions',
      'Reengages old leads and stalled quotes automatically',
      'Books the meeting or requote the moment interest returns',
    ],
    results: [
      { stat: '2 to 3x', label: 'More closed deals' },
      { stat: 'Zero', label: 'Leads left cold' },
      { stat: '$0', label: 'Extra ad spend' },
    ],
    integrations: ['CRM', 'SMS and Email', 'Calendar', 'Pipeline tools'],
    bestFor: 'Contractors, real estate, high value services and B2B sales.',
    badge: 'Highest ROI',
  },
  {
    id: 'ai-reputation',
    rank: 5,
    name: 'AI Review & Reputation Engine',
    tagline: 'Turns happy customers into a flood of five star reviews automatically.',
    problem:
      'Reviews decide who wins local search and referrals, yet most businesses forget to ask, and let bad ones sit unanswered.',
    how: [
      'Triggers a personalized review request after each job or purchase',
      'Routes happy customers to Google and Facebook, catches unhappy ones first',
      'Drafts on brand responses to every review',
      'Tracks rating trends so you always know where you stand',
    ],
    results: [
      { stat: 'Up to 5x', label: 'More reviews' },
      { stat: '+0.5 star', label: 'Average rating lift' },
      { stat: 'No.1', label: 'Local visibility push' },
    ],
    integrations: ['Google Business', 'Facebook', 'SMS and Email', 'CRM'],
    bestFor: 'Every local business that lives and dies by reputation.',
    badge: 'Rising Star',
  },
]

// Total agent count for headline copy.
export const TOTAL_AGENTS = NICHES.reduce((n, x) => n + x.agents.length, 0)
