import { NextRequest, NextResponse } from 'next/server'
import { d1Query, isD1Configured } from '@/lib/d1'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name    = (body.name    ?? '').toString().trim().slice(0, 200)
  const company = (body.company ?? '').toString().trim().slice(0, 200)
  const email   = (body.email   ?? '').toString().trim().slice(0, 320)
  const system  = (body.system  ?? '').toString().trim().slice(0, 200)
  const message = (body.message ?? '').toString().trim().slice(0, 5000)

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 422 })
  }

  if (!isD1Configured()) {
    // Fail soft in local/dev when DB isn't wired yet
    console.warn('[contact] D1 not configured — submission not persisted:', { email, system })
    return NextResponse.json({ ok: true, persisted: false }, { status: 200 })
  }

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
    const ua = req.headers.get('user-agent') ?? null

    await d1Query(
      `INSERT INTO submissions (name, company, email, system, message, ip, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name || null, company || null, email, system || null, message || null, ip, ua],
    )

    return NextResponse.json({ ok: true, persisted: true }, { status: 201 })
  } catch (err) {
    console.error('[contact] D1 insert failed:', err)
    return NextResponse.json({ error: 'Could not save submission. Please try again.' }, { status: 500 })
  }
}
