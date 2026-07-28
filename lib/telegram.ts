// ─── Telegram notifier ────────────────────────────────────────────────────────
// Sends a message to your Telegram chat via a bot. Requires env vars:
//   TELEGRAM_BOT_TOKEN  — from @BotFather when you create the bot
//   TELEGRAM_CHAT_ID    — your chat id (message the bot, then read getUpdates)
// Fails soft: returns false and logs if not configured, never throws.

export function isTelegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
}

export async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()
  if (!token || !chatId) {
    console.warn('[telegram] not configured — skipping message')
    return false
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error('[telegram] send failed', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('[telegram] send error', err)
    return false
  }
}
