'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Organic animated robot mascot. Pure SVG + framer motion springs:
 * - Gentle full-body float and breathing
 * - Head + eyes track the cursor with soft spring physics
 * - Blinks on a natural randomized interval
 * - Antenna sways, arm waves on hover
 * - Morphing blob shadow beneath
 */
export default function OrganicRobot({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [waving, setWaving] = useState(false)
  const [blink, setBlink] = useState(false)

  // Cursor tracking with organic springs
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const headX = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 14 })
  const headY = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 60, damping: 14 })
  const eyeX = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 120, damping: 12 })
  const eyeY = useSpring(useTransform(my, [-1, 1], [-4, 4]), { stiffness: 120, damping: 12 })
  const bodyTilt = useSpring(useTransform(mx, [-1, 1], [-3, 3]), { stiffness: 40, damping: 16 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Natural randomized blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        scheduleBlink()
      }, 2400 + Math.random() * 3200)
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      onMouseEnter={() => setWaving(true)}
      onMouseLeave={() => setWaving(false)}
    >
      {/* Morphing blob glow behind robot */}
      <div className="animate-blob absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#B41D24]/35 via-[#E2A5A5]/50 to-[#7C1418]/25 blur-2xl" />

      {/* Floating wrapper */}
      <motion.div
        className="animate-float"
        style={{ rotate: bodyTilt }}
      >
        <svg viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-[0_24px_48px_rgba(74, 8, 16,0.25)]">
          {/* ── Left arm (static, relaxed) ── */}
          <motion.g
            animate={{ rotate: [0, 4, 0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '110px', originY: '250px' }}
          >
            <path d="M115 250 Q80 280 78 330 Q77 352 92 356 Q108 360 112 338 Q116 300 135 275 Z" fill="#7C1418" />
            <circle cx="92" cy="352" r="20" fill="#B41D24" />
          </motion.g>

          {/* ── Right arm (waves on hover) ── */}
          <motion.g
            animate={waving
              ? { rotate: [0, -60, -40, -65, -40, -60, 0] }
              : { rotate: [0, -4, 0, 3, 0] }}
            transition={waving
              ? { duration: 1.6, ease: 'easeInOut' }
              : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '290px', originY: '250px' }}
          >
            <path d="M285 250 Q320 280 322 330 Q323 352 308 356 Q292 360 288 338 Q284 300 265 275 Z" fill="#7C1418" />
            <circle cx="308" cy="352" r="20" fill="#B41D24" />
          </motion.g>

          {/* ── Body (breathing) ── */}
          <g className="animate-breathe" style={{ transformOrigin: '200px 330px' }}>
            {/* Torso: soft organic rounded shape */}
            <path
              d="M130 260 Q125 230 155 225 L245 225 Q275 230 270 260 L268 360 Q268 405 200 408 Q132 405 132 360 Z"
              fill="#4A0810"
            />
            {/* Belly panel */}
            <ellipse cx="200" cy="330" rx="52" ry="58" fill="#E2A5A5" opacity="0.9" />
            {/* Heart core, pulsing */}
            <motion.circle
              cx="200" cy="322" r="16"
              fill="#B41D24"
              animate={{ r: [16, 19, 16], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="200" cy="322" r="24"
              stroke="#7C1418" strokeWidth="2" fill="none"
              animate={{ r: [24, 32], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
          </g>

          {/* ── Legs ── */}
          <g>
            <path d="M160 400 Q158 435 160 448 Q162 460 178 460 Q192 460 192 448 L190 405 Z" fill="#7C1418" />
            <path d="M240 400 Q242 435 240 448 Q238 460 222 460 Q208 460 208 448 L210 405 Z" fill="#7C1418" />
            <ellipse cx="172" cy="462" rx="26" ry="12" fill="#4A0810" />
            <ellipse cx="228" cy="462" rx="26" ry="12" fill="#4A0810" />
          </g>

          {/* ── Head group (cursor tracking) ── */}
          <motion.g style={{ x: headX, y: headY }}>
            {/* Antenna */}
            <motion.g
              animate={{ rotate: [-4, 5, -4] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '200px', originY: '86px' }}
            >
              <path d="M198 86 Q196 60 200 44" stroke="#7C1418" strokeWidth="6" strokeLinecap="round" fill="none" />
              <motion.circle
                cx="200" cy="36" r="11"
                fill="#B41D24"
                animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* Head: soft rounded organic shape */}
            <path
              d="M120 150 Q118 92 175 86 L225 86 Q282 92 280 150 L280 175 Q282 225 220 230 L180 230 Q118 225 120 175 Z"
              fill="#4A0810"
            />
            {/* Face screen */}
            <path
              d="M140 150 Q140 110 180 106 L220 106 Q260 110 260 150 L260 168 Q260 205 215 208 L185 208 Q140 205 140 168 Z"
              fill="#E3E2DF"
            />

            {/* Eyes (track cursor, blink) */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <motion.ellipse
                cx="175" cy="152" rx="11" ry="14"
                initial={{ ry: 14 }}
                animate={{ ry: blink ? 1.5 : 14 }}
                transition={{ duration: 0.08 }}
                fill="#7C1418"
              />
              <motion.ellipse
                cx="225" cy="152" rx="11" ry="14"
                initial={{ ry: 14 }}
                animate={{ ry: blink ? 1.5 : 14 }}
                transition={{ duration: 0.08 }}
                fill="#7C1418"
              />
              {/* Eye shine */}
              {!blink && (
                <>
                  <circle cx="178" cy="147" r="3.5" fill="#B41D24" />
                  <circle cx="228" cy="147" r="3.5" fill="#B41D24" />
                </>
              )}
            </motion.g>

            {/* Smile */}
            <motion.path
              d="M182 185 Q200 198 218 185"
              stroke="#B41D24" strokeWidth="5" strokeLinecap="round" fill="none"
              animate={waving ? { d: 'M178 183 Q200 204 222 183' } : { d: 'M182 185 Q200 198 218 185' }}
              transition={{ duration: 0.4 }}
            />

            {/* Cheek blushes */}
            <ellipse cx="152" cy="172" rx="9" ry="6" fill="#E2A5A5" />
            <ellipse cx="248" cy="172" rx="9" ry="6" fill="#E2A5A5" />

            {/* Ears */}
            <circle cx="118" cy="158" r="12" fill="#7C1418" />
            <circle cx="282" cy="158" r="12" fill="#7C1418" />
          </motion.g>

          {/* Neck */}
          <rect x="188" y="226" width="24" height="14" rx="7" fill="#7C1418" />
        </svg>
      </motion.div>

      {/* Ground shadow, breathing with the float */}
      <motion.div
        className="absolute -bottom-3 left-1/2 h-6 w-[55%] -translate-x-1/2 rounded-[50%] bg-[#4A0810]/15 blur-md"
        animate={{ scaleX: [1, 0.88, 1], opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
