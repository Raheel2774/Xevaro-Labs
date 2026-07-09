'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ROBOT_STATES, CONTACT } from '@/lib/os'

/**
 * System HUD, floating operating-system telemetry that reinforces the
 * "living AI OS" feel. Reads the active route's robot state.
 */
export default function HUD() {
  const pathname = usePathname()
  const st = ROBOT_STATES[pathname] ?? ROBOT_STATES['/']
  const [load, setLoad] = useState(42)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setLoad(40 + Math.round(Math.random() * 18))
      setClock(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block font-mono text-[10px] tracking-widest text-white/40">
      {/* Top-left: system state */}
      <div className="absolute left-6 top-20">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D6FF] shadow-[0_0_8px_#00D6FF]" />
          <span className="text-white/70">{st.state}</span>
        </div>
        <div className="mt-1 text-white/30">{st.sub}</div>
      </div>

      {/* Bottom-left: load */}
      <div className="absolute bottom-6 left-6">
        <div>NEURAL LOAD · {load}%</div>
        <div className="mt-1.5 h-px w-32 bg-white/10">
          <div className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transition-all duration-700" style={{ width: `${load}%` }} />
        </div>
      </div>

      {/* Bottom-right: channel */}
      <div className="absolute bottom-6 right-6 text-right">
        <div>{CONTACT.email}</div>
        <div className="mt-1 text-white/30">{clock || '--:--:--'} · UTC</div>
      </div>
    </div>
  )
}
