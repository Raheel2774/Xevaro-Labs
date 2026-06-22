'use client'

import { usePathname } from 'next/navigation'
import RobotCore from './RobotCore'
import Navbar from './Navbar'
import Footer from './Footer'
import HUD from './HUD'

// Standalone immersive experiences manage their own chrome / background.
const STANDALONE = ['/system', '/deconstruct']

export default function OSShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const standalone = STANDALONE.some(p => pathname.startsWith(p))

  if (standalone) return <>{children}</>

  return (
    <>
      <RobotCore />
      <HUD />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  )
}
