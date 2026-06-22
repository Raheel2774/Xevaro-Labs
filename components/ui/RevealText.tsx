'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Word-by-word scroll reveal — words fade from dim to bright as they enter view.
 * Signature peachweb / award-site effect.
 */
export default function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end   = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
