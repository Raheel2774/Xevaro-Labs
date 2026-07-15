'use client'

import { usePathname } from 'next/navigation'
import AmbientBackground from './AmbientBackground'
import Navbar from './Navbar'
import Footer from './Footer'

// Standalone immersive experiences manage their own chrome / background.
const STANDALONE = ['/system', '/deconstruct', '/admin']

export default function OSShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const standalone = STANDALONE.some(p => pathname.startsWith(p))

  if (standalone) return <>{children}</>

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  )
}
