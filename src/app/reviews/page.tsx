import type { Metadata } from 'next'
import { reviews, reviewStats, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Stars from '@/components/Stars'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: `Google Reviews — ${reviewStats.reviewCount} Verified Louisiana Clients`,
  description: `${reviewStats.reviewCount} verified Google reviews of Strykora from real, named Louisiana business owners. Average rating ${reviewStats.averageRating.toFixed(1)} of 5. Roofers, auto shops, septic installers, and more.`,
  alternates: { canonical: `${site.url}/reviews` },
}

// No Review/ItemList-of-Review schema here: reviews about Strykora on Strykora's
// own site are self-serving (Google Dec 2025 policy) — ineligible for stars and a
// manual-action risk. The real reviews stay as on-page cards below.

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

      <section className="section-padding">
        <div className="container-wide">
          <Reveal className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Stars rating={Math.round(reviewStats.averageRating)} size="lg" />
              <div>
                <p className="font-display text-2xl text-text">
                  {reviewStats.averageRating.toFixed(1)} out of 5
                </p>
                <p className="text-sm text-text-muted">{reviewStats.reviewCount} Google reviews</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.gbp.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                View on Google
              </a>
              <a
                href={site.gbp.leaveReview}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Leave a review
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((r) => (
              <Reveal key={r.author}>
                <article className="card-feature h-full p-8 flex flex-col">
                  <Stars rating={r.rating} size="sm" className="mb-4" />
                  <blockquote className="text-text-muted leading-relaxed mb-6 flex-1">
                    {r.body}
                  </blockquote>
                  <footer className="border-t border-border pt-5">
                    <p className="font-display text-lg text-text">{r.author}</p>
                    {r.business && (
                      <p className="text-sm text-text-dim mt-0.5 font-mono">{r.business}</p>
                    )}
                    <p className="text-[10px] text-text-dim mt-2 uppercase tracking-wider">
                      {new Date(r.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
