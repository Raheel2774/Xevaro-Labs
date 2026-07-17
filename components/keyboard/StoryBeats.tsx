'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

/**
 * A single scroll-pinned beat. Fades + slides in over [start, in], holds,
 * then fades out over [out, end] of the master scroll progress.
 */
function Beat({
  progress, start, end, align, children,
}: {
  progress: MotionValue<number>
  start: number
  end: number
  align: 'left' | 'right' | 'center'
  children: React.ReactNode
}) {
  const span = end - start
  const fadeIn  = start + span * 0.18
  const fadeOut = end   - span * 0.18

  const opacity = useTransform(progress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0])
  const slideX  = align === 'left' ? -60 : align === 'right' ? 60 : 0
  const x = useTransform(progress, [start, fadeIn], [slideX, 0])
  const y = useTransform(progress, [fadeOut, end], [0, -40])

  const pos =
    align === 'left'   ? 'items-start text-left' :
    align === 'right'  ? 'items-end text-right'  :
                         'items-center text-center'

  return (
    <motion.div
      style={{ opacity, x, y }}
      className={`pointer-events-none fixed inset-0 z-20 flex flex-col justify-center px-6 md:px-20 ${pos}`}
    >
      <div className="max-w-xl">{children}</div>
    </motion.div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_10px_rgba(255,59,48,0.8)]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">{children}</span>
    </div>
  )
}

const H = 'font-display font-bold tracking-tight text-white/90 [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]'
const P = 'text-white/55 leading-relaxed font-light'

export default function StoryBeats({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      {/* HERO 0 to 15% */}
      <Beat progress={progress} start={0} end={0.16} align="center">
        <Eyebrow>Autonomous Infrastructure</Eyebrow>
        <h1 className={`${H} text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95]`}>
          Command the<br />
          <span className="bg-gradient-to-b from-white/[0.06] to-[#7fb0ff] bg-clip-text text-transparent">Autonomous Enterprise.</span>
        </h1>
        <p className={`${P} mx-auto mt-7 max-w-md text-lg`}>
          We translate complex operations into flawless, zero friction automated
          infrastructure. One keystroke ahead.
        </p>
        <div className="pointer-events-auto mt-9 flex items-center justify-center gap-2 text-white/30">
          <span className="text-[11px] uppercase tracking-[0.3em]">Scroll to deconstruct</span>
        </div>
      </Beat>

      {/* DECONSTRUCTION 16 to 40% */}
      <Beat progress={progress} start={0.17} end={0.41} align="left">
        <Eyebrow>Agent Architecture</Eyebrow>
        <h2 className={`${H} text-4xl md:text-6xl leading-[0.98]`}>Deconstructing<br />Complexity.</h2>
        <p className={`${P} mt-6 text-base md:text-lg`}>
          We audit your operational bottlenecks, breaking down manual workflows
          into modular, AI driven nodes, custom orchestrator loops and autonomous
          agents built to execute without human intervention.
        </p>
      </Beat>

      {/* CORE CIRCUIT 41 to 65% */}
      <Beat progress={progress} start={0.42} end={0.66} align="right">
        <Eyebrow>Connected Infrastructure</Eyebrow>
        <h2 className={`${H} text-4xl md:text-6xl leading-[0.98]`}>Connected<br />Infrastructure.</h2>
        <p className={`${P} mt-6 text-base md:text-lg`}>
          Native API integrations and webhook architectures that bridge your legacy
          stacks with cutting edge cognitive models. Secure, hardware-accelerated
          data routing engineered for enterprise stability.
        </p>
      </Beat>

      {/* EFFICIENCY 66 to 85% */}
      <Beat progress={progress} start={0.67} end={0.84} align="left">
        <Eyebrow>Operational Velocity</Eyebrow>
        <h2 className={`${H} text-4xl md:text-6xl leading-[0.98]`}>Acoustically Tuned<br />Efficiency.</h2>
        <p className={`${P} mt-6 text-base md:text-lg`}>
          Eliminating noise from your pipelines. Our automated systems run silently
          in the background, maximizing operational velocity while stripping away
          overhead.
        </p>
      </Beat>

      {/* REASSEMBLY + CTA 86 to 100% */}
      <Beat progress={progress} start={0.86} end={1.0} align="center">
        <Eyebrow>Press Enter</Eyebrow>
        <h2 className={`${H} text-5xl md:text-7xl leading-[0.95]`}>
          Press Enter on<br />
          <span className="bg-gradient-to-b from-white/[0.06] to-[#E0A86A] bg-clip-text text-transparent">Automation.</span>
        </h2>
        <p className={`${P} mx-auto mt-6 max-w-md text-lg`}>
          Your infrastructure, fully autonomous. Let&apos;s build your digital workforce.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:raheelchaudary774@gmail.com"
            className="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#760115] to-[#FF3B30]" />
            <span className="absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(255,59,48,0.5)] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Book an Automation Audit</span>
          </a>
          <a
            href="/system"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            Explore Our Stack
          </a>
        </div>
      </Beat>
    </>
  )
}
