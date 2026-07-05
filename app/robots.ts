import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

// AI crawlers Xevaro explicitly welcomes. Being crawled by BOTH training bots
// (GPTBot, ClaudeBot, CCBot…) and citation/search bots (OAI-SearchBot,
// PerplexityBot, Claude-SearchBot…) maximizes AEO/GEO: our content can enter
// model knowledge AND be cited in live AI answers.
const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
  'Timpibot',
]

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: '/', disallow: ['/admin', '/api/'] }
  return {
    rules: [
      { userAgent: '*', ...rule },
      ...AI_BOTS.map((bot) => ({ userAgent: bot, ...rule })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
