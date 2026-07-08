import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'
import { POSTS } from '@/lib/blog'

type Freq = 'weekly' | 'monthly' | 'yearly'

// Public, indexable routes. /admin and /api are intentionally excluded.
const ROUTES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/agents', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/best-sellers', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/never-miss-a-lead', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/system', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/deconstruct', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/refund', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticRoutes = ROUTES.map((r) => ({
    url: SITE.url + r.path,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
  const articleRoutes = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'monthly' as Freq,
    priority: 0.7,
  }))
  return [...staticRoutes, ...articleRoutes]
}
