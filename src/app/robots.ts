import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // AI crawlers explicitly welcomed
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
