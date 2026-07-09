'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Search, Lightbulb, Code2, Rocket, Sparkles } from 'lucide-react'

const steps = [
  {
    step: '01', icon: Search,    title: 'Discovery',    subtitle: 'Deep dive into your business',
    description: 'We start with a thorough analysis of your goals, workflows, tech stack, and growth bottlenecks. No generic proposals, we go deep.',
    items: ['Business goals alignment', 'Technical audit', 'Competitive analysis', 'ROI projection'],
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80',
    imgAlt: 'Discovery and research',
    color: '#E53E3E',
  },
  {
    step: '02', icon: Lightbulb, title: 'Strategy',    subtitle: 'Build the blueprint',
    description: 'We design a custom roadmap with defined milestones, deliverables, and measurable success metrics tailored to your business.',
    items: ['Architecture design', 'Sprint planning', 'Stack selection', 'Success metrics'],
    img: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=500&q=80',
    imgAlt: 'Strategy planning',
    color: '#FC8181',
  },
  {
    step: '03', icon: Code2,     title: 'Development', subtitle: 'Build with precision',
    description: 'Our team executes with weekly updates and live demos. You see progress from day one, no black boxes, no surprises.',
    items: ['Agile sprints', 'Weekly demos', 'QA & testing', 'Performance optimization'],
    img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&q=80',
    imgAlt: 'Software development',
    color: '#FBBFBF',
  },
  {
    step: '04', icon: Rocket,    title: 'Scale',       subtitle: 'Launch and grow',
    description: "We don't just deliver and disappear. We monitor, optimize, and iterate so your systems continue to improve over time.",
    items: ['Go live support', 'Analytics setup', 'Ongoing optimization', '24/7 monitoring'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    imgAlt: 'Business growth analytics',
    color: '#E53E3E',
  },
]

export default function Process() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(80,8,8,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: 'rgba(155,28,28,0.1)', borderColor: 'rgba(155,28,28,0.3)', color: '#FC8181' }}
          >
            <Sparkles size={14} /> How We Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Our 4-Step{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Process
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            A proven framework for delivering transformative results, every time.
          </motion.p>
        </div>

        {/* Steps, alternating layout */}
        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Image side */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 group">
                  <Image
                    src={step.img}
                    alt={step.imgAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(155,28,28,0.3), rgba(0,0,0,0.5))` }} />

                  {/* Step number overlay */}
                  <div className="absolute top-6 left-6">
                    <div
                      className="font-heading font-black text-7xl leading-none select-none"
                      style={{ color: 'rgba(255,255,255,0.08)' }}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Icon badge */}
                  <div
                    className="absolute bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', border: `1px solid ${step.color}40` }}
                  >
                    <step.icon size={24} style={{ color: step.color }} />
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
                <span className="text-xs uppercase tracking-widest font-semibold mb-2 block" style={{ color: step.color }}>
                  Step {step.step}, {step.subtitle}
                </span>
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{step.description}</p>

                <ul className="space-y-3">
                  {step.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: j * 0.07 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: `${step.color}18`, color: step.color }}
                      >
                        {j + 1}
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
