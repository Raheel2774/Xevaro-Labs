'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

const navLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'Why Us',       href: '#why-us' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Process',      href: '#process' },
  { label: 'FAQ',          href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #9B1C1C, #C41E1E)', boxShadow: '0 0 20px rgba(155,28,28,0.5)' }}
            >
              <Zap size={17} className="text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-white tracking-tight">
              Xevaro{' '}
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #E53E3E, #FBBFBF, #E53E3E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Labs
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton
              href="#cta"
              className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #9B1C1C, #C41E1E)', boxShadow: '0 0 20px rgba(155,28,28,0.35)' }}
            >
              Book a Call
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/5 px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-gray-300 hover:text-white py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center px-5 py-3 rounded-xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #9B1C1C, #C41E1E)' }}
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
