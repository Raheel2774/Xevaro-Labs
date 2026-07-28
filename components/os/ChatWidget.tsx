'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING: Msg = {
  role: 'assistant',
  content: "Hi! I'm Xevaro, the AI assistant. Ask me about our products, pricing, or agents — or I can help you book a free automation audit.",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? 'Request failed')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: acc }
          return copy
        })
      }
    } catch {
      setMessages(m => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'assistant', content: 'Sorry, I could not respond just now. Please email Info@xevarolabs.com or try again.' }
        return copy
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_rgba(238,76,124,0.45)]"
        style={{ background: 'linear-gradient(135deg, #9A1750, #EE4C7C)' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'x' : 'chat'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-5 z-[60] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[24px] border border-[#5D001E]/10 bg-white shadow-[0_24px_70px_rgba(93,0,30,0.25)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ background: 'linear-gradient(135deg, #5D001E, #9A1750)' }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><Bot className="h-5 w-5" /></span>
              <div>
                <div className="font-display text-sm font-bold">Xevaro Assistant</div>
                <div className="text-[11px] text-[#E3AFBC]">Usually replies instantly</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#E3E2DF]/40 px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#EE4C7C] text-white'
                      : 'border border-[#5D001E]/10 bg-white text-[#5D001E]'
                  }`}>
                    {m.content || (busy && i === messages.length - 1 ? <span className="inline-flex gap-1"><Dot /><Dot d={0.15} /><Dot d={0.3} /></span> : '')}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-[#5D001E]/10 bg-white p-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                placeholder="Ask about products, pricing…"
                className="flex-1 rounded-full border border-[#5D001E]/15 bg-[#E3E2DF]/40 px-4 py-2.5 text-sm text-[#5D001E] outline-none placeholder:text-[#5D001E]/40 focus:border-[#EE4C7C]/50"
              />
              <button
                onClick={send}
                disabled={busy || !input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #9A1750, #EE4C7C)' }}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-[#9A1750]/50"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, delay: d }}
    />
  )
}
