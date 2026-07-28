import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '@/lib/chatbot-knowledge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Model: Haiku 4.5 — fast and cost-effective for a public website chatbot.
// Bump to "claude-opus-4-8" if you want maximum answer quality.
const MODEL = 'claude-haiku-4-5'
const MAX_TURNS = 12 // trim history to bound cost/abuse

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'Chat is not configured yet.' }), {
      status: 503, headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { messages?: ChatMessage[] }
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 })
  }

  const raw = Array.isArray(body.messages) ? body.messages : []
  // Sanitize + clamp: alternating roles not required, but bound size.
  const messages = raw
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_TURNS)
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }))

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return new Response(JSON.stringify({ error: 'A user message is required.' }), { status: 422 })
  }

  const client = new Anthropic()

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
          messages,
        })
        claudeStream.on('text', (delta) => controller.enqueue(encoder.encode(delta)))
        await claudeStream.finalMessage()
        controller.close()
      } catch (err) {
        console.error('[chat] stream error', err)
        controller.enqueue(encoder.encode('\n\nSorry, something went wrong. Please email ' + (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'us') + ' or try again.'))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
