'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Original glossy "heart" robot mascot, hand built in SVG (no third party
 * viewer, no watermark). Boxy LED screen head with pixel eyes, white glossy
 * body with a red heart, red tipped limbs, holding a small flower bouquet.
 * Floats, breathes, blinks and tracks the cursor with soft springs.
 */
export default function HeartRobot({ className = '' }: { className?: string }) {
  const [blink, setBlink] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const headX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 60, damping: 14 })
  const headY = useSpring(useTransform(my, [-1, 1], [-6, 6]), { stiffness: 60, damping: 14 })
  const tilt = useSpring(useTransform(mx, [-1, 1], [-2.5, 2.5]), { stiffness: 40, damping: 16 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 130)
        loop()
      }, 2600 + Math.random() * 3200)
    }
    loop()
    return () => clearTimeout(t)
  }, [])

  // 5x5 LED eye grid
  const eyeGrid = (cx: number, cy: number) => {
    const cells = []
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        // rounded diamond-ish mask: skip corners for a soft look
        if ((r === 0 || r === 4) && (c === 0 || c === 4)) continue
        cells.push(
          <rect key={`${r}-${c}`} x={cx - 20 + c * 8} y={cy - 20 + r * 8} width="6" height="6" rx="1.5"
            fill="#FF3B5C" opacity={0.55 + ((r + c) % 3) * 0.15} />,
        )
      }
    }
    return cells
  }

  return (
    <div className={`relative select-none ${className}`}>
      {/* glow puddle */}
      <div className="animate-blob absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#EE4C7C]/40 via-[#9A1750]/30 to-[#5D001E]/20 blur-3xl" />

      <motion.div className="animate-float" style={{ rotate: tilt }}>
        <svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-[0_30px_50px_rgba(93,0,30,0.45)]">
          <defs>
            <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#EAD9DE" />
            </linearGradient>
            <linearGradient id="bodyShade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#9A1750" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3A0713" />
              <stop offset="1" stopColor="#1A0308" />
            </linearGradient>
            <radialGradient id="heart" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#FF6B84" />
              <stop offset="0.5" stopColor="#EE1F45" />
              <stop offset="1" stopColor="#9A0F26" />
            </radialGradient>
            <linearGradient id="limb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E3AFBC" />
            </linearGradient>
          </defs>

          {/* ground shadow */}
          <ellipse cx="210" cy="500" rx="120" ry="18" fill="#5D001E" opacity="0.25" />

          {/* ── Left arm holding bouquet ── */}
          <motion.g
            animate={{ rotate: [0, 3, 0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '150px 300px' }}
          >
            <rect x="120" y="292" width="34" height="96" rx="17" fill="url(#limb)" />
            <rect x="120" y="360" width="34" height="30" rx="15" fill="#9A1750" />
            <circle cx="137" cy="392" r="22" fill="url(#limb)" />
            {/* bouquet */}
            <g transform="translate(96 250)">
              <path d="M40 150 Q34 90 40 40" stroke="#2E7D32" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M40 110 Q20 96 12 74" stroke="#2E7D32" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M40 120 Q60 104 70 82" stroke="#2E7D32" strokeWidth="4" fill="none" strokeLinecap="round" />
              {[[40, 30], [14, 60], [66, 62], [30, 74], [56, 30]].map(([fx, fy], i) => (
                <g key={i} transform={`translate(${fx} ${fy})`}>
                  {[0, 72, 144, 216, 288].map(a => (
                    <ellipse key={a} cx="0" cy="-11" rx="7" ry="12" fill={i % 2 ? '#FF5A76' : '#EE1F45'} transform={`rotate(${a})`} />
                  ))}
                  <circle cx="0" cy="0" r="6" fill="#FFD1A6" />
                </g>
              ))}
            </g>
          </motion.g>

          {/* ── Right arm ── */}
          <motion.g
            animate={{ rotate: [0, -3, 0, 2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '270px 300px' }}
          >
            <rect x="266" y="292" width="34" height="96" rx="17" fill="url(#limb)" />
            <rect x="266" y="360" width="34" height="30" rx="15" fill="#9A1750" />
            <circle cx="283" cy="392" r="22" fill="url(#limb)" />
          </motion.g>

          {/* ── Legs ── */}
          <g>
            <rect x="168" y="430" width="34" height="60" rx="17" fill="url(#limb)" />
            <rect x="218" y="430" width="34" height="60" rx="17" fill="url(#limb)" />
            <ellipse cx="185" cy="492" rx="26" ry="14" fill="#9A1750" />
            <ellipse cx="235" cy="492" rx="26" ry="14" fill="#9A1750" />
          </g>

          {/* ── Body (breathing) ── */}
          <g className="animate-breathe" style={{ transformOrigin: '210px 340px' }}>
            <rect x="146" y="252" width="128" height="176" rx="46" fill="url(#body)" />
            <rect x="146" y="252" width="128" height="176" rx="46" fill="url(#bodyShade)" />
            {/* seam grid, subtle */}
            <g stroke="#5D001E" strokeOpacity="0.06" strokeWidth="2">
              <line x1="180" y1="262" x2="180" y2="418" />
              <line x1="210" y1="262" x2="210" y2="418" />
              <line x1="240" y1="262" x2="240" y2="418" />
              <line x1="156" y1="300" x2="264" y2="300" />
              <line x1="156" y1="340" x2="264" y2="340" />
              <line x1="156" y1="380" x2="264" y2="380" />
            </g>
            {/* heart */}
            <motion.g
              style={{ transformOrigin: '210px 330px' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M210 356 C186 336 176 322 176 306 C176 293 186 285 197 285 C204 285 209 289 210 293 C211 289 216 285 223 285 C234 285 244 293 244 306 C244 322 234 336 210 356 Z" fill="url(#heart)" />
              <ellipse cx="199" cy="303" rx="6" ry="8" fill="#ffffff" opacity="0.55" transform="rotate(-25 199 303)" />
            </motion.g>
            {/* body highlight */}
            <rect x="158" y="262" width="20" height="150" rx="10" fill="#ffffff" opacity="0.4" />
          </g>

          {/* ── Head (cursor tracking) ── */}
          <motion.g style={{ x: headX, y: headY }}>
            {/* neck */}
            <rect x="196" y="232" width="28" height="26" rx="10" fill="#E3AFBC" />
            {/* ears */}
            <circle cx="150" cy="150" r="18" fill="url(#limb)" />
            <circle cx="150" cy="150" r="8" fill="#9A1750" />
            <circle cx="270" cy="150" r="18" fill="url(#limb)" />
            <circle cx="270" cy="150" r="8" fill="#9A1750" />
            {/* head shell */}
            <rect x="150" y="70" width="120" height="160" rx="40" fill="url(#body)" />
            <rect x="150" y="70" width="120" height="160" rx="40" fill="url(#bodyShade)" />
            {/* screen */}
            <rect x="166" y="92" width="88" height="116" rx="30" fill="url(#screen)" />
            <rect x="166" y="92" width="88" height="116" rx="30" fill="#000" opacity="0.15" />
            {/* eyes */}
            {!blink ? (
              <>
                {eyeGrid(190, 138)}
                {eyeGrid(230, 138)}
              </>
            ) : (
              <>
                <rect x="176" y="136" width="28" height="5" rx="2.5" fill="#FF3B5C" opacity="0.8" />
                <rect x="216" y="136" width="28" height="5" rx="2.5" fill="#FF3B5C" opacity="0.8" />
              </>
            )}
            {/* smile */}
            <path d="M196 176 Q210 188 224 176" stroke="#FF3B5C" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
            {/* screen glare */}
            <path d="M176 100 L206 100 L184 150 L166 150 Z" fill="#ffffff" opacity="0.06" />

            {/* antenna */}
            <motion.g
              animate={{ rotate: [-3, 4, -3] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '210px 70px' }}
            >
              <path d="M210 70 Q208 44 210 30" stroke="#E3AFBC" strokeWidth="6" strokeLinecap="round" />
              <motion.circle cx="210" cy="24" r="10" fill="#EE1F45"
                animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}
