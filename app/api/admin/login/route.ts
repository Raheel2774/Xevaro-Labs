import { NextRequest, NextResponse } from 'next/server'
import { safeEqual, makeSessionToken, SESSION_COOKIE, isAdminConfigured } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin access is not configured on the server.' }, { status: 503 })
  }

  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const password = (body.password ?? '').toString()
  if (!password || !safeEqual(password, process.env.ADMIN_PASSWORD!)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
