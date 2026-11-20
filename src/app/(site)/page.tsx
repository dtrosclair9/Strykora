import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTA from '@/components/CTA'
import FAQAccordion from '@/components/FAQAccordion'
import ProjectActions from '@/components/ProjectActions'
import Section from '@/components/Section'
import Stars from '@/components/Stars'
import ReviewQuote from '@/components/ReviewQuote'
import { Schema, localBusinessSchema, websiteSchema, personSchema, faqSchema as buildFaqSchema } from '@/components/Schema'
import { industries, reviews, reviewStats, services, site, trustStrip } from '@/config/site'
import { citations, comparisonRows, faqs, featuredCase, home, pillars, processSteps } from '@/content/home'
import './home.css'

export const metadata: Metadata = {
  title: 'Web Design & SEO for Louisiana Businesses',
  description:
    'Custom-built websites and local SEO for Louisiana service businesses. Built in Thibodaux, ranks on Google and inside ChatGPT, and you own the code outright.',
  alternates: { canonical: site.url },
}

const ratingLabel = `${reviewStats.averageRating.toFixed(1)} · ${reviewStats.reviewCount} Google reviews`
const featuredReviews = reviews.filter((review) => 'featured' in review && review.featured).slice(0, 3)
const featuredServices = services.filter((service) => 'featured' in service && service.featured)
const coreServices = services.filter((service) => !('featured' in service && service.featured))

function HomeHero() {
  return (
    <>
      <section className="ledger-hero" aria-labelledby="home-title">
        <div className="site-container">
          <div className="ledger-hero-content">
            <p className="eyebrow hero-eyebrow">{home.hero.eyebrow}</p>
            <h1 id="home-title" className="ledger-hero-title">{home.hero.firstLine} {home.hero.secondLine}</h1>
            <p className="ledger-hero-description">{home.hero.body}</p>
            <ProjectActions projectLabel={home.cta.projectLink} phoneLabel={home.cta.phoneLink}>
              <Link href="/case-studies" className="text-link" prefetch={false}>{home.hero.workLink}</Link>
            </ProjectActions>
            <a
              className="home-hero-rating"
              href={site.gbp.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="home-hero-stars" aria-hidden="true">★★★★★</span>
              <span>{ratingLabel}</span>
            </a>
          </div>
        </div>
      </section>
      <div className="home-trust">
        <dl className="site-container">
          {trustStrip.map(({ label, value }) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

function Services() {
  return (
    <Section
      id="services" className="home-services"
      eyebrow={home.services.eyebrow}
      heading={<>{home.services.firstLine}<br />{' '}{home.services.secondLine}</>}
      description={home.services.body}
    >
      <div className="home-service-list">
        {[...featuredServices, ...coreServices].map((service) => {
          const featured = 'featured' in service && service.featured
          return (
            <article key={service.slug} className={featured ? 'home-service-feature surface-dark' : 'home-service'}>
              <Link href={`/services/${service.slug}`} prefetch={false} className="home-service-link">
                <p className="eyebrow">{featured ? home.services.featuredEyebrow : service.eyebrow}</p>
                <h3>{service.title}</h3>
                <div className="home-service-copy">
                  <p>{service.short}</p>
                  <p className="home-note">{service.priceRange}</p>
                  {featured && <span className="home-inline-label">{home.services.featuredLink}</span>}
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

function Industries() {
  return (
    <Section id="industries" className="home-industries" eyebrow={home.industries.eyebrow} heading={home.industries.heading} description={home.industries.body}>
      <div className="home-industry-list">
        {industries.map(({ slug, title, short }) => (
          <article className="home-industry" key={slug}>
            <Link href={`/industries/${slug}`} className="home-industry-link" prefetch={false}>
              <h3>{title}</h3>
              <p>{short}</p>
              <span className="home-inline-label">{home.industries.link}</span>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Proof() {
  return (
    <Section id="proof" eyebrow={home.proof.eyebrow} heading={home.proof.heading} description={home.proof.body} className="home-proof surface-dark">
      <div className="home-evidence">
        {[{ label: home.proof.depth, items: citations.slice(0, 3) }, { label: home.proof.breadth, items: citations.slice(3) }].map((group, index) => (
          <div className="home-evidence-group" key={group.label}>
            <div className="home-evidence-head">
              <p className="eyebrow">{group.label}</p>
              {index === 0 && <Link href="/case-studies/hover-septic" prefetch={false} className="text-link">{home.proof.depthLink}</Link>}
            </div>
            <div className={`home-evidence-items home-evidence-items-${group.items.length}`}>
              {group.items.map(({ src, alt, label, lead, quote, follow, href }) => (
                <figure className="home-citation" key={src}>
                  <a href={src} target="_blank" rel="noopener" className="receipt-link" aria-label={`${alt} Open full screenshot in a new tab`}>
                    <div className="home-citation-image">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes={`(min-width: 1360px) ${group.items.length === 3 ? 411 : 302}px, (min-width: 1024px) ${group.items.length === 3 ? 29 : 22}vw, (min-width: 834px) 150px, (min-width: 489px) 23vw, 112px`}
                      />
                    </div>
                    <span aria-hidden="true" className="receipt-link-preview">↗</span>
                  </a>
                  <figcaption>
                    <p className="eyebrow">{label}</p>
                    <p>{lead}<strong>{quote}</strong>{follow}</p>
                    {href && <Link href={href} prefetch={false} className="text-link">{home.proof.caseLink}</Link>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link href="/services/ai-search-optimization" prefetch={false} className="text-link home-section-link">{home.proof.link}</Link>
    </Section>
  )
}

function FeaturedCase() {
  return (
    <Section id="case" className="home-work" eyebrow={home.caseStudy.eyebrow} heading={home.caseStudy.heading} description={
      `${featuredCase.client} · ${featuredCase.industry} · ${featuredCase.city}`
    }>
      <article className="home-case">
        <div className="home-case-image">
          <Image
            src={featuredCase.cover}
            alt={`Cover image for the ${featuredCase.client} Strykora case study in ${featuredCase.city}.`}
            fill
            sizes="(min-width: 1400px) 740px, (min-width: 1024px) 53vw, calc(100vw - 8.4vw)"
          />
        </div>
        <div className="home-case-copy">
          <h3>{featuredCase.headline}</h3>
          <p>{featuredCase.blurb}</p>
          <Link href={`/case-studies/${featuredCase.slug}`} prefetch={false} className="btn-conversion">{home.caseStudy.link}</Link>
        </div>
        <dl className="home-case-metrics">
          {featuredCase.metrics.map(({ label, value }) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </article>
      <Link href="/case-studies" className="text-link home-section-link" prefetch={false}>{home.caseStudy.allLink}</Link>
    </Section>
  )
}

function Reviews() {
  return (
    <Section id="reviews" className="home-reviews" eyebrow="Reviews" heading={home.reviews.heading} description={ratingLabel}>
      <a className="text-link home-reviews-google" href={site.gbp.profile} target="_blank" rel="noopener noreferrer">View on Google</a>
      <div className="home-reviews-list">
        {featuredReviews.map((review) => (
          <figure key={review.author}>
            <Stars rating={review.rating} size="sm" />
            <ReviewQuote body={review.body} />
            <figcaption>
              <p><strong>{review.author}</strong></p>
              {review.business && <p>{review.business}</p>}
              <time dateTime={review.date}>
                {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}
              </time>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="action-row home-section-link">
        <Link href="/reviews" className="text-link" prefetch={false}>See all reviews</Link>
        <a href={site.gbp.leaveReview} className="text-link" target="_blank" rel="noopener noreferrer">Leave a Google review</a>
      </div>
    </Section>
  )
}

function Pillars() {
  return (
    <Section id="why" className="home-why" eyebrow={home.why.eyebrow} heading={home.why.heading}>
      <div className="home-pillars">
        {pillars.map((pillar, index) => (
          <article key={pillar.label}>
            <p className="eyebrow">{pillar.label}</p>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
            {index === 1 && (
              <div className="home-founder">
                <Image src="/images/dayne-headshot.jpg" alt={site.owner} width={64} height={64} sizes="64px" />
                <div>
                  <p><strong>{site.owner}</strong></p>
                  <p>{home.why.founder}</p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}

function Comparison() {
  return (
    <Section id="comparison" className="home-comparison" eyebrow={home.comparison.eyebrow} heading={home.comparison.heading} description={home.comparison.body}>
      <table className="home-comparison-table" aria-labelledby="comparison-heading">
        <thead>
          <tr>
            <th scope="col">{home.comparison.feature}</th>
            <th scope="col">{home.comparison.agency}</th>
            <th scope="col">{site.name}</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map(({ label, them, us }) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{them}</td>
              <td>{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  )
}

function Process() {
  return (
    <Section id="process" className="home-process" eyebrow={home.process.eyebrow} heading={home.process.heading}>
      <ol className="home-steps" role="list">
        {processSteps.map(({ n, title, body }) => (
          <li key={n}>
            <span className="home-step-number" aria-hidden="true">{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default function HomePage() {
  return (
    <>
      <Schema data={[localBusinessSchema, websiteSchema, personSchema, buildFaqSchema(faqs)]} />
      <HomeHero />
      <Services />
      <Industries />
      <Proof />
      <FeaturedCase />
      <Reviews />
      <Pillars />
      <Comparison />
      <Process />
      <Section id="faq" className="home-faq" eyebrow={home.faq.eyebrow} heading={home.faq.heading}>
        <FAQAccordion items={faqs} />
      </Section>
      <CTA
        eyebrow={home.cta.eyebrow}
        heading={<>{home.cta.firstLine}<br />{home.cta.secondLine}</>}
        body={home.cta.body}
        projectLabel={home.cta.projectLink}
        phoneLabel={home.cta.phoneLink}
        showMark
      />
    </>
  )
}
