import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import '../editorial.css'

export const metadata: Metadata = {
  title: 'Local SEO & Web Design Blog — Louisiana',
  description: 'Notes on web design, local SEO, and the Google AI search shift from a Louisiana operator who ships sites every week. Plain English, no jargon, no course pitch.',
  alternates: { canonical: `${site.url}/blog` },
}

// Posts mirror the body source of truth in src/app/blog/[slug]/page.tsx
const posts = [
  {
    slug: 'why-chatgpt-recommends-your-competitor-louisiana',
    title: 'Why ChatGPT Recommends Your Competitor Instead of You',
    excerpt: 'Ask ChatGPT for a contractor and it hands back a name or two. How those picks get made, and how a Louisiana business gets on the list.',
    date: '2026-09-06',
  },
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    excerpt: 'A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era.',
    date: '2026-06-16',
  },
  {
    slug: 'google-may-2026-ai-search-update-louisiana-businesses',
    title: 'Google\'s May 2026 Core Update: What Louisiana Service Businesses Should Check',
    excerpt: 'Google ran a core update from May 21 to June 2, 2026. What it did and did not change, and what a Louisiana service business should check if traffic dropped.',
    date: '2026-05-21',
  },
  {
    slug: 'why-your-wix-site-isnt-ranking-louisiana',
    title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)',
    excerpt: 'A Wix site can rank on Google. Here is how to tell whether yours is holding you back, and three fixes to try first.',
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
        title="Local SEO and web design notes for Louisiana businesses."
        description="Honest takes on web design, local SEO, and the Google AI search shift, written by someone who ships sites every week, not someone selling a course."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
        ]}
      />

      <section className="ledger-section site-container journal-index">
        {sorted.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="journal-entry">
              <p className="eyebrow journal-date">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
              </p>
              <div>
                <h2>{post.title}</h2>
                <p className="editorial-copy">{post.excerpt}</p>
                <span className="text-link">Read post</span>
              </div>
            </Link>
          </article>
        ))}
        <p className="journal-note editorial-copy">New posts ship roughly monthly. Want a topic covered?{' '}
          <Link href="/contact" className="text-link">Send it over.</Link>
        </p>
      </section>
    </>
  )
}
