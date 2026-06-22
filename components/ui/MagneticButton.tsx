'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
  onClick?: () => void
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  style,
  strength = 0.35,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const Tag = href ? 'a' : 'button'

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block">
      <motion.div style={{ x: springX, y: springY }}>
        <Tag
          href={href}
          onClick={onClick}
          style={style}
          className={`cursor-pointer inline-flex items-center justify-center ${className}`}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  )
}
