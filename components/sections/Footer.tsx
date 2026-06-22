'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Twitter, Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'AI Automation',     href: '#services' },
    { label: 'Website Dev',       href: '#services' },
    { label: 'Shopify Dev',       href: '#services' },
    { label: 'AI Chatbots',       href: '#services' },
    { label: 'SaaS Development',  href: '#services' },
    { label: 'BPA',               href: '#services' },
  ],
  Company: [
    { label: 'About Us',          href: '#' },
    { label: 'Case Studies',      href: '#case-studies' },
    { label: 'Process',           href: '#process' },
    { label: 'Testimonials',      href: '#' },
    { label: 'Blog',              href: '#' },
    { label: 'Careers',           href: '#' },
  ],
  Resources: [
    { label: 'FAQ',               href: '#faq' },
    { label: 'Free Audit',        href: '#cta' },
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
  ],
}

const socials = [
  { icon: Twitter,   href: 'https://twitter.com/xevarolabs',           label: 'Twitter' },
  { icon: Linkedin,  href: 'https://linkedin.com/company/xevarolabs',  label: 'LinkedIn' },
  { icon: Github,    href: 'https://github.com/xevarolabs',            label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com/xevarolabs',         label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative border-t overflow-hidden" style={{ background: '#050506', borderColor: 'rgba(155,28,28,0.15)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(80,8,8,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#9B1C1C,#C41E1E)', boxShadow: '0 0 20px rgba(155,28,28,0.4)' }}
              >
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Xevaro{' '}
                <span style={{ backgroundImage: 'linear-gradient(90deg,#E53E3E,#FBBFBF,#E53E3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Labs
                </span>
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              We build AI systems that scale businesses. From automation to full-stack development — we deliver transformation.
            </p>

            <a href="mailto:hello@xevarolabs.com"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Mail size={14} />
              hello@xevarolabs.com
            </a>

            <div className="flex gap-3 mt-5">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-xs text-white uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(155,28,28,0.12)' }}>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Xevaro Labs. All rights reserved.</p>
          <p className="text-gray-700 text-xs">Designed &amp; built with obsessive attention to detail.</p>
        </div>
      </div>
    </footer>
  )
}
