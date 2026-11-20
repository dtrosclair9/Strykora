import Link from 'next/link'
import { reviews, reviewStats, site } from '@/config/site'
import Section from './Section'
import Stars from './Stars'
import ReviewQuote from './ReviewQuote'

interface ReviewsSectionProps {
  limit?: number
  featuredOnly?: boolean
  heading?: string
  eyebrow?: string
  showSeeAllLink?: boolean
}

export function ReviewList({ items, fullDate = false }: { items: readonly (typeof reviews)[number][]; fullDate?: boolean }) {
  const dateFormat: Intl.DateTimeFormatOptions = fullDate
    ? { month: 'long', day: 'numeric', year: 'numeric' }
    : { month: 'short', year: 'numeric' }

  return (
    <div className="review-list">
      {items.map(({ author, business, body, rating, date }) => (
        <figure key={author} className="review-entry">
          <div className="review-quote">
            <Stars rating={rating} size="sm" />
            <ReviewQuote body={body} />
          </div>
          <figcaption>
            <p><strong>{author}</strong></p>
            {business && <p>{business}</p>}
            <p className="review-date">{new Date(date).toLocaleDateString('en-US', dateFormat)}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function ReviewsSection({
  limit,
  featuredOnly = false,
  heading = 'What clients say.',
  eyebrow = 'Reviews',
  showSeeAllLink = false,
}: ReviewsSectionProps) {
  const filtered = featuredOnly ? reviews.filter((review) => 'featured' in review && review.featured) : reviews
  const list = limit ? filtered.slice(0, limit) : filtered

  return (
    <Section id="reviews" className="review-excerpts" eyebrow={eyebrow} heading={heading}>
      <div className="review-summary">
        <Stars rating={Math.round(reviewStats.averageRating)} decorative />
        <p>{reviewStats.averageRating.toFixed(1)} · {reviewStats.reviewCount} Google reviews</p>
        <a href={site.gbp.profile} target="_blank" rel="noopener noreferrer" className="text-link">View on Google</a>
      </div>

      <ReviewList items={list} />

      <div className="action-row editorial-follow">
        {showSeeAllLink && <Link href="/reviews" className="text-link">See all reviews</Link>}
        <a href={site.gbp.leaveReview} target="_blank" rel="noopener noreferrer" className="text-link">Leave a Google review</a>
      </div>
    </Section>
  )
}
