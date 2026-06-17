import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Local SEO & Web Design Blog — Louisiana',
  description: 'Notes on web design, local SEO, and the Google AI search shift from a Louisiana operator who ships sites every week. Plain English, no jargon, no course pitch.',
  alternates: { canonical: `${site.url}/blog` },
}

// Posts mirror the body source of truth in src/app/blog/[slug]/page.tsx
const posts = [
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    excerpt: 'A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era.',
    date: '2026-06-16',
  },
  {
    slug: 'google-may-2026-ai-search-update-louisiana-businesses',
    title: 'Google\'s May 2026 AI Search Update: What Louisiana Service Businesses Need to Know',
    excerpt: 'The May 21, 2026 core update reshaped how local search works. The plain-English version for Louisiana service businesses.',
    date: '2026-05-21',
  },
  {
    slug: 'why-your-wix-site-isnt-ranking-louisiana',
    title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)',
    excerpt: 'A slow Wix site can hurt your rankings more than having no site at all. The honest diagnosis and three fixes.',
    date: '2026-04-22',
  },
]

export default function BlogPage() {
  // Newest first
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the build."
        description="Honest takes on web design, local SEO, and the Google AI search shift, written by someone who ships sites every week, not someone selling a course."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="card-feature group block p-8 h-full">
                  <p className="text-xs uppercase tracking-wider text-text-dim mb-3 font-mono">
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h2 className="text-xl font-display text-text mb-3 text-balance">{p.title}</h2>
                  <p className="text-text-muted leading-relaxed text-sm">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all mt-5">
                    Read post
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center text-text-dim text-sm">
            <p>New posts ship roughly monthly. Want a topic covered?{' '}
              <Link href="/contact" className="text-accent hover:underline">Send it over.</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
