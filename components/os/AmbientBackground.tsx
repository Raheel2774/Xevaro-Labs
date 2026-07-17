'use client'

/**
 * Site-wide ambient background: pure black canvas with a faint crimson
 * vignette in the corners, matching the client portfolio deck.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Faint crimson corner glows on pure black */}
      <div
        className="animate-blob absolute -left-52 -top-52 h-[560px] w-[560px] bg-[#7C1418]/12 blur-[130px]"
        style={{ animationDuration: '26s' }}
      />
      <div
        className="animate-blob absolute -right-56 top-1/3 h-[600px] w-[600px] bg-[#B41D24]/[0.08] blur-[150px]"
        style={{ animationDuration: '30s', animationDelay: '-10s' }}
      />
      {/* Very subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(180, 29, 36, 0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  )
}
