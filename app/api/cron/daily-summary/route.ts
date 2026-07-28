import { NextRequest, NextResponse } from 'next/server'
import { d1Query, isD1Configured } from '@/lib/d1'
import { sendTelegram, isTelegramConfigured } from '@/lib/telegram'
import { SITE } from '@/lib/seo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Daily visitor digest → Telegram. Triggered by Vercel Cron (see vercel.json).
// Auth: Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is
// set. A manual `?key=<CRON_SECRET>` also works for testing.
function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim()
  if (!secret) return true // no secret set → allow (dev)
  const header = req.headers.get('authorization')
  if (header === `Bearer ${secret}`) return true
  if (req.nextUrl.searchParams.get('key') === secret) return true
  return false
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!isD1Configured()) {
    return NextResponse.json({ error: 'D1 not configured' }, { status: 200 })
  }

  try {
    const since = "datetime('now','-1 day')"

    const totals = await d1Query<{ views: number; visitors: number }>(
      `SELECT COUNT(*) AS views, COUNT(DISTINCT ip) AS visitors
       FROM visits WHERE is_bot = 0 AND created_at >= ${since}`,
    )
    const topPaths = await d1Query<{ path: string; n: number }>(
      `SELECT path, COUNT(*) AS n FROM visits
       WHERE is_bot = 0 AND created_at >= ${since}
       GROUP BY path ORDER BY n DESC LIMIT 5`,
    )
    const topCountries = await d1Query<{ country: string; n: number }>(
      `SELECT COALESCE(country,'??') AS country, COUNT(DISTINCT ip) AS n FROM visits
       WHERE is_bot = 0 AND created_at >= ${since}
       GROUP BY country ORDER BY n DESC LIMIT 3`,
    )
    const leads = await d1Query<{ n: number }>(
      `SELECT COUNT(*) AS n FROM submissions WHERE created_at >= ${since}`,
    )

    const views = totals.results[0]?.views ?? 0
    const visitors = totals.results[0]?.visitors ?? 0
    const leadCount = leads.results[0]?.n ?? 0

    const pathsLine = topPaths.results.length
      ? topPaths.results.map(r => `  • <code>${r.path || '/'}</code> — ${r.n}`).join('\n')
      : '  • no pageviews logged'
    const countriesLine = topCountries.results.length
      ? topCountries.results.map(r => `${r.country} (${r.n})`).join(', ')
      : '—'

    const msg =
      `📊 <b>Xevaro Labs — daily traffic</b>\n` +
      `<i>last 24 hours</i>\n\n` +
      `👥 <b>${visitors}</b> visitors · <b>${views}</b> pageviews\n` +
      `📨 <b>${leadCount}</b> new lead${leadCount === 1 ? '' : 's'}\n` +
      `🌍 ${countriesLine}\n\n` +
      `<b>Top pages</b>\n${pathsLine}\n\n` +
      `${SITE.url}`

    const sent = await sendTelegram(msg)
    return NextResponse.json({ ok: true, sent, views, visitors, leads: leadCount })
  } catch (err) {
    console.error('[daily-summary] failed', err)
    // Surface a short alert even on failure, if Telegram is up
    if (isTelegramConfigured()) {
      await sendTelegram('⚠️ Xevaro daily summary failed to run. Check logs.')
    }
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
