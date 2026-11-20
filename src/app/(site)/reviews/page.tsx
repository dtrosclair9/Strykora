import type { Metadata } from 'next'
import { reviews, reviewStats, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import { ReviewList } from '@/components/ReviewsSection'
import Stars from '@/components/Stars'
import CTA from '@/components/CTA'
import '../editorial.css'

export const metadata: Metadata = {
  title: `Google Reviews — ${reviewStats.reviewCount} Verified Louisiana Clients`,
  description: `${reviewStats.reviewCount} verified Google reviews of Strykora from real, named Louisiana business owners. Average rating ${reviewStats.averageRating.toFixed(1)} of 5. Roofers, auto shops, septic installers, and more.`,
  alternates: { canonical: `${site.url}/reviews` },
}

// No Review/ItemList-of-Review schema here: reviews about Strykora on Strykora's
// own site are self-serving (Google Dec 2025 policy) — ineligible for stars and a
// manual-action risk. The real reviews remain visible on the page.

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={`${reviewStats.reviewCount} clients. ${reviewStats.averageRating.toFixed(1)} stars.`}
        description="Real, dated, verified Google reviews from Louisiana business owners Strykora has built sites for."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/reviews', label: 'Reviews' },
        ]}
      />

      <section className="ledger-section site-container reviews-directory">
        <div className="reviews-rating">
          <div>
            <p className="reviews-score">
              <strong>{reviewStats.averageRating.toFixed(1)}</strong> out of 5
            </p>
            <Stars rating={Math.round(reviewStats.averageRating)} size="lg" decorative />
            <p className="reviews-count">{reviewStats.reviewCount} Google reviews</p>
          </div>
          <div className="action-row">
            <a href={site.gbp.profile} target="_blank" rel="noopener noreferrer" className="text-link">View on Google</a>
            <a href={site.gbp.leaveReview} target="_blank" rel="noopener noreferrer" className="btn-secondary">Leave a review</a>
          </div>
        </div>

        <ReviewList items={reviews} fullDate />
      </section>

      <CTA />
    </>
  )
}
