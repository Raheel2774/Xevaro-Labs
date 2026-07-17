'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from './RevealText'

// ─── Navbar ─────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-auto mix-blend-difference"
    >
      <a href="#hero" className="flex items-center gap-3 group">
        <span className="relative w-7 h-7">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9B1C1C] to-[#E53E3E] group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute inset-[5px] rounded-full bg-black" />
          <span className="absolute inset-[9px] rounded-full bg-[#E53E3E] animate-pulse" />
        </span>
        <span className="font-display text-base font-bold tracking-[0.25em] text-white">XEVARO</span>
      </a>

      <div className="hidden md:flex items-center gap-10 text-[13px] tracking-wide text-white/70 font-medium">
        {[['Capabilities', '#services'], ['Work', '#work'], ['Process', '#process'], ['Contact', '#contact']].map(([l, h]) => (
          <a key={l} href={h} className="relative group">
            {l}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/[0.06] group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="group relative px-5 py-2 text-[13px] font-semibold text-white overflow-hidden rounded-full border border-white/20"
      >
        <span className="absolute inset-0 bg-white/[0.06] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        <span className="relative group-hover:text-black transition-colors duration-300">Let&apos;s talk →</span>
      </a>
    </motion.nav>
  )
}

// ─── Section frame ────────────────────────────────────────────────────────────

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative min-h-screen flex items-center pointer-events-none px-6 md:px-16 ${className}`}>
      {children}
    </section>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2.5 mb-7"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] animate-pulse" />
      <span className="text-[11px] tracking-[0.35em] uppercase text-white/50 font-medium">{children}</span>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const line = { hidden: { opacity: 0, y: 60 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] } }) }

  return (
    <Section id="hero">
      <motion.div ref={ref} style={{ y, opacity }} className="w-full max-w-6xl mx-auto text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-9"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] animate-pulse" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/60">AI Automation · Lahore → Worldwide</span>
        </motion.div>

        <h1 className="font-display font-black text-white leading-[0.92] tracking-[-0.02em] text-[15vw] md:text-[8.5vw] lg:text-[7.5rem]">
          <motion.span variants={line} initial="hidden" animate="show" custom={0} className="block">
            We engineer
          </motion.span>
          <motion.span variants={line} initial="hidden" animate="show" custom={1} className="block">
            <span className="bg-gradient-to-r from-[#9B1C1C] via-[#E53E3E] to-[#C41E1E] bg-clip-text text-transparent">intelligent</span> systems
          </motion.span>
          <motion.span variants={line} initial="hidden" animate="show" custom={2} className="block">
            that scale you.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-9 text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
        >
          Xevaro Labs builds autonomous AI workflows, high converting websites,
          and custom software that run your business on autopilot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-11 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="group relative px-9 py-4 rounded-full font-semibold text-sm tracking-wide text-white overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[#9B1C1C] to-[#C41E1E]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#C41E1E] to-[#E53E3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Start your AI journey →</span>
          </a>
          <a href="#work" className="px-9 py-4 rounded-full font-semibold text-sm tracking-wide text-white/80 border border-white/15 hover:border-white/40 hover:text-white transition-all duration-300 backdrop-blur-sm">
            View our work
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </Section>
  )
}

// ─── Marquee ────────────────────────────────────────────────────────────────

function Marquee() {
  const items = ['AI AUTOMATION', 'n8n WORKFLOWS', 'GPT-4o AGENTS', 'NEXT.JS', 'SHOPIFY', 'SAAS', 'RAG PIPELINES', 'WHATSAPP API', 'CUSTOM SOFTWARE']
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.06] pointer-events-none">
      <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="text-2xl md:text-3xl font-display font-bold text-white/15 tracking-tight flex items-center gap-12">
            {t} <span className="text-[#9B1C1C]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Intro / mission ──────────────────────────────────────────────────────────

function Intro() {
  return (
    <Section className="py-32">
      <div className="max-w-5xl mx-auto">
        <Tag>Our mission</Tag>
        <RevealText
          text="Most businesses drown in manual work. We replace it with AI that thinks, automates, and scales, so you focus on growth while the machine runs the rest."
          className="font-display font-semibold text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em]"
        />
      </div>
    </Section>
  )
}

// ─── Services (bento) ──────────────────────────────────────────────────────────

const services = [
  { n: '01', name: 'AI Automation',  desc: 'n8n + LangChain pipelines that run your ops 24/7.', span: 'md:col-span-2' },
  { n: '02', name: 'Web Development', desc: 'Next.js 15 sites engineered to convert.', span: '' },
  { n: '03', name: 'Shopify AI',      desc: 'Intelligent storefronts that sell while you sleep.', span: '' },
  { n: '04', name: 'AI Chatbots',     desc: 'GPT-4o agents with memory, tools & RAG.', span: 'md:col-span-2' },
  { n: '05', name: 'SaaS Products',   desc: 'Full stack SaaS from idea to launch.', span: '' },
  { n: '06', name: 'Process Automation', desc: 'BPA that eliminates repetitive work at scale.', span: '' },
]

function Services() {
  return (
    <Section id="services" className="py-32">
      <div className="w-full max-w-6xl mx-auto pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Tag>Capabilities</Tag>
            <h2 className="font-display font-black text-white text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
              What we<br />build for you
            </h2>
          </div>
          <p className="text-white/45 text-base max-w-sm font-light">
            Six core services, one outcome, an autonomous business that grows without adding headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              className={`group relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md overflow-hidden hover:border-[#9B1C1C]/50 transition-all duration-500 ${s.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#9B1C1C]/0 to-[#9B1C1C]/0 group-hover:from-[#9B1C1C]/10 group-hover:to-transparent transition-all duration-500" />
              <div className="relative">
                <span className="text-[#9B1C1C] font-mono text-sm tracking-widest">{s.n}</span>
                <h3 className="mt-5 font-display font-bold text-white text-2xl md:text-3xl group-hover:translate-x-1 transition-transform duration-300">{s.name}</h3>
                <p className="mt-3 text-white/45 text-[15px] leading-relaxed max-w-md">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-white/30 group-hover:text-[#E53E3E] transition-colors duration-300 text-sm">
                  Learn more <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Stats ──────────────────────────────────────────────────────────────────

function Stats() {
  const stats = [['100+', 'Projects shipped'], ['95%', 'Client retention'], ['3x', 'Average ROI'], ['$2M+', 'Revenue generated']]
  return (
    <Section className="py-24">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06] pointer-events-auto">
        {stats.map(([n, l], i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-10 text-center group hover:bg-[#9B1C1C]/10 transition-colors duration-500"
          >
            <div className="font-display font-black text-4xl md:text-6xl bg-gradient-to-br from-white/[0.06] to-[#E53E3E] bg-clip-text text-transparent">{n}</div>
            <div className="mt-2 text-white/40 text-xs md:text-sm tracking-wide uppercase">{l}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── Work / case studies ────────────────────────────────────────────────────

const work = [
  { client: 'RetailCo',     tag: 'E-commerce AI',   metric: '+340%', label: 'Revenue growth' },
  { client: 'TechFlow',     tag: 'SaaS Automation', metric: '80%',   label: 'Time saved' },
  { client: 'OmegaShop',    tag: 'Chatbot Deploy',  metric: '2x',    label: 'Conversion rate' },
  { client: 'AutoVentures', tag: 'BPA Pipeline',    metric: '$2M',   label: 'Recovered revenue' },
]

function Work() {
  return (
    <Section id="work" className="py-32">
      <div className="w-full max-w-6xl mx-auto pointer-events-auto">
        <Tag>Selected work</Tag>
        <h2 className="font-display font-black text-white text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] mb-16">
          Proven results,<br />real revenue.
        </h2>

        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {work.map((w, i) => (
            <motion.div
              key={w.client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-cursor="hover"
              className="group flex items-center justify-between py-8 md:py-10 cursor-pointer"
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-[#9B1C1C] font-mono text-sm">0{i + 1}</span>
                <div>
                  <h3 className="font-display font-bold text-white text-2xl md:text-4xl group-hover:translate-x-2 transition-transform duration-300">{w.client}</h3>
                  <span className="text-white/40 text-sm">{w.tag}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-3xl md:text-5xl bg-gradient-to-br from-white/[0.06] to-[#E53E3E] bg-clip-text text-transparent">{w.metric}</div>
                <div className="text-white/30 text-xs uppercase tracking-wide">{w.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────

const steps = [
  { n: '01', title: 'Discovery', desc: 'We map your workflows and find the highest leverage automation opportunities.' },
  { n: '02', title: 'Design',    desc: 'We architect AI systems tailored to your stack, data, and goals.' },
  { n: '03', title: 'Build',     desc: 'We ship production grade automations, agents, and interfaces, fast.' },
  { n: '04', title: 'Scale',     desc: 'We monitor, optimize, and expand the system as your business grows.' },
]

function Process() {
  return (
    <Section id="process" className="py-32">
      <div className="w-full max-w-6xl mx-auto pointer-events-auto">
        <Tag>How we work</Tag>
        <h2 className="font-display font-black text-white text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] mb-16">
          From idea to<br />autonomous.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-[#9B1C1C]/60 font-display font-black text-6xl mb-4">{s.n}</div>
              <h3 className="font-display font-bold text-white text-xl mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Contact / CTA ────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact" className="py-32">
      <div className="w-full max-w-4xl mx-auto text-center pointer-events-auto">
        <Tag>Get in touch</Tag>
        <h2 className="font-display font-black text-white text-6xl md:text-8xl leading-[0.9] tracking-[-0.03em]">
          Ready to build<br />
          the <span className="bg-gradient-to-r from-[#9B1C1C] via-[#E53E3E] to-[#C41E1E] bg-clip-text text-transparent">future?</span>
        </h2>
        <p className="mt-8 text-white/50 text-lg md:text-xl font-light max-w-xl mx-auto">
          Join 100+ businesses running on Xevaro AI infrastructure.
          Let&apos;s automate your growth.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:raheelchaudary774@gmail.com" className="group relative px-10 py-5 rounded-full font-semibold text-white overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[#9B1C1C] to-[#C41E1E]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#C41E1E] to-[#E53E3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Email us now →</span>
          </a>
          <a href="https://wa.me/" className="px-10 py-5 rounded-full font-semibold text-white/80 border border-white/15 hover:border-white/40 hover:text-white transition-all duration-300 backdrop-blur-sm">
            WhatsApp
          </a>
        </div>

        <footer className="mt-32 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.08]">
          <span className="font-display font-bold tracking-[0.25em] text-white/70">XEVARO LABS</span>
          <span className="text-white/30 text-sm">© 2026 · xevarolabs.com · All rights reserved</span>
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">X</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </footer>
      </div>
    </Section>
  )
}

// ─── Scroll progress dots ──────────────────────────────────────────────────────

function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 pointer-events-none">
      <div className="w-px h-28 bg-white/10 relative overflow-hidden rounded-full">
        <motion.div className="absolute top-0 left-0 right-0 bg-[#E53E3E]" style={{ height: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

// ─── Root ───────────────────────────────────────────────────────────────────

export default function Overlay({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <NavBar />
      <ScrollBar progress={scrollProgress} />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <Stats />
      <Work />
      <Process />
      <Contact />
    </>
  )
}
