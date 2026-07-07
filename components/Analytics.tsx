'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// ─── Analytics ───────────────────────────────────────────────────────────────
// Env-gated. Nothing loads and nothing breaks unless the matching public env
// var is set, so the site is safe to deploy before you have the IDs.
//
//   NEXT_PUBLIC_REDDIT_PIXEL_ID   — Reddit Ads → Events Manager → your Pixel ID
//   NEXT_PUBLIC_GA_ID             — (optional) GA4 Measurement ID, e.g. G-XXXX
//
// The Reddit pixel is the important one for the ad campaign: it reports
// PageVisit + Lead conversions back into Reddit Ads Manager and lets Reddit
// optimize delivery toward people who actually convert.

const RDT_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

// Call on a real conversion (e.g. contact-form submit). Safe no-op if the
// pixels aren't configured or haven't loaded yet.
export function trackLead() {
  if (typeof window === 'undefined') return
  window.rdt?.('track', 'Lead')
  window.gtag?.('event', 'generate_lead')
}

export default function Analytics() {
  const pathname = usePathname()

  // Re-fire page-view on client-side route changes (App Router is a SPA).
  useEffect(() => {
    if (!pathname) return
    window.rdt?.('track', 'PageVisit')
    if (GA_ID) window.gtag?.('config', GA_ID, { page_path: pathname })
  }, [pathname])

  return (
    <>
      {RDT_ID && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${RDT_ID}');rdt('track','PageVisit');`}
        </Script>
      )}

      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  )
}
