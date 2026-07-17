'use client'

/**
 * Site-wide ambient background: warm light canvas with slow morphing
 * organic blobs in the Red and Lively palette. Replaces the old dark
 * robot frame sequence.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0B0506]">
      {/* Large drifting blobs */}
      <div
        className="animate-blob absolute -left-40 -top-40 h-[560px] w-[560px] bg-[#E2A5A5]/50 blur-[90px]"
        style={{ animationDuration: '22s' }}
      />
      <div
        className="animate-blob absolute -right-48 top-1/4 h-[640px] w-[640px] bg-[#B41D24]/20 blur-[110px]"
        style={{ animationDuration: '26s', animationDelay: '-8s' }}
      />
      <div
        className="animate-blob absolute -bottom-52 left-1/4 h-[520px] w-[520px] bg-[#7C1418]/15 blur-[100px]"
        style={{ animationDuration: '30s', animationDelay: '-14s' }}
      />
      {/* Fine grain texture for warmth */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(74, 8, 16,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  )
}
