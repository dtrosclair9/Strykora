import type { MetadataRoute } from 'next'
import { site, services, industries, caseStudies, cityServiceCombos } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/industries`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-studies`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/free-audit`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/9-questions`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/reviews`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/accessibility`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const cityServicePages: MetadataRoute.Sitemap = cityServiceCombos.map((c) => ({
    url: `${base}/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Real last-edit dates only. Pages without a trustworthy date leave lastModified out
  // (a sitemap that stamps every URL with the build time teaches Google to ignore it).
  const blogPostUpdated: [string, string][] = [
    ['why-chatgpt-recommends-your-competitor-louisiana', '2026-11-18'],
    ['why-seo-matters-for-small-businesses-louisiana', '2026-11-18'],
    ['google-may-2026-ai-search-update-louisiana-businesses', '2026-11-18'],
    ['why-your-wix-site-isnt-ranking-louisiana', '2026-11-18'],
  ]
  const blogPosts: MetadataRoute.Sitemap = blogPostUpdated.map(([slug, updated]) => ({
    url: `${base}/blog/${slug}`,
    lastModified: updated,
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...caseStudyPages,
    ...cityServicePages,
    ...blogPosts,
  ]
}
