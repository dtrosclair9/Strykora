import Link from 'next/link'
import { reviews, reviewStats, site } from '@/config/site'
import Reveal from './Reveal'
import Stars from './Stars'

interface ReviewsSectionProps {
  /** How many reviews to show. Defaults to all. */
  limit?: number
  /** When true, only renders reviews flagged featured. */
  featuredOnly?: boolean
  /** Heading copy override. */
  heading?: string
  /** Eyebrow copy override. */
  eyebrow?: string
  /** Show a "See all reviews" link at the bottom. */
  showSeeAllLink?: boolean
}

export default function ReviewsSection({
  limit,
  featuredOnly = false,
  heading = 'What clients say.',
  eyebrow = 'Reviews',
  showSeeAllLink = false,
}: ReviewsSectionProps) {
  const filtered = featuredOnly ? reviews.filter((r) => 'featured' in r && r.featured) : reviews
  const list = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="section-padding border-y border-border bg-bg-elevated" aria-labelledby="reviews-heading">
      <div className="container-wide">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 id="reviews-heading" className="text-display-md font-display text-text text-balance">
            {heading}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-text-muted">
            <Stars rating={Math.round(reviewStats.averageRating)} size="lg" />
            <span className="font-mono text-sm">
              {reviewStats.averageRating.toFixed(1)} · {reviewStats.reviewCount} Google reviews
            </span>
            <a
              href={site.gbp.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              View on Google →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((r) => (
            <Reveal key={r.author}>
              <article className="card-feature h-full p-7 flex flex-col">
                <Stars rating={r.rating} size="sm" className="mb-4" />
                <blockquote className="text-text-muted leading-relaxed text-sm mb-6 flex-1">
                  {r.body}
                </blockquote>
                <footer className="border-t border-border pt-4">
                  <p className="font-display text-text">{r.author}</p>
                  {r.business && (
                    <p className="text-xs text-text-dim mt-0.5 font-mono">{r.business}</p>
                  )}
                  <p className="text-[10px] text-text-dim mt-2 uppercase tracking-wider">
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>

        {showSeeAllLink && (
          <Reveal className="mt-12 text-center">
            <Link href="/reviews" className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all">
              See all reviews
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Reveal>
        )}

        <Reveal className="mt-10 text-center">
          <a
            href={site.gbp.leaveReview}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Leave a Google review
          </a>
        </Reveal>
      </div>
    </section>
  )
}
