import { NextRequest, NextResponse } from 'next/server'
import { d1Query, isD1Configured } from '@/lib/d1'

export const runtime = 'nodejs'

// Lightweight first-party pageview beacon. Called fire-and-forget from the
// client on every route change. Stores minimal data in D1 for the daily digest.
const BOT_RE = /bot|crawl|spider|slurp|bing|google|facebookexternalhit|preview|monitor|curl|wget|headless|lighthouse/i

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {}
  try { body = await req.json() } catch { /* ignore */ }

  const path     = (body.path ?? '').toString().slice(0, 300)
  const referrer = (body.referrer ?? '').toString().slice(0, 300)

  if (!isD1Configured()) {
    return NextResponse.json({ ok: true, persisted: false })
  }

  try {
    const ua = req.headers.get('user-agent') ?? ''
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
    const country = req.headers.get('x-vercel-ip-country') ?? null
    const isBot = BOT_RE.test(ua) ? 1 : 0

    await d1Query(
      `INSERT INTO visits (path, referrer, country, ip, user_agent, is_bot)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [path, referrer, country, ip, ua.slice(0, 400), isBot],
    )
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[track] insert failed', err)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
