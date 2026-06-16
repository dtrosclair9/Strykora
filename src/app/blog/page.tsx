import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on web design, SEO, and Google AI search from a Louisiana operator.',
  alternates: { canonical: `${site.url}/blog` },
}

// Existing post preserved from old site (slug was earning impressions)
const posts = [
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    excerpt: 'A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era.',
    date: '2025-09-12',
  },
]

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the build."
        description="Honest takes on web design, local SEO, and the AI-search shift — written by someone who ships sites every week, not someone selling a course."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="card-feature group block p-8 h-full">
                  <p className="text-xs uppercase tracking-wider text-text-dim mb-3 font-mono">
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h2 className="text-xl font-display text-text mb-3 text-balance">{p.title}</h2>
                  <p className="text-text-muted leading-relaxed text-sm">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center text-text-dim text-sm">
            <p>More posts shipping monthly. Want a topic covered?{' '}
              <Link href="/contact" className="text-accent hover:underline">Send it over.</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
