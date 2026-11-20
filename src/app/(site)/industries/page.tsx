import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { industries, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Section from '@/components/Section'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'
import '../interiors.css'

export const metadata: Metadata = {
  title: 'Industries Served — Louisiana Web Design & SEO',
  description:
    'Custom websites and local SEO for Louisiana roofers, contractors, home services, auto shops, and commercial marine and oil and gas operators. Five lanes.',
  alternates: { canonical: `${site.url}/industries` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Strykora industries served',
  itemListElement: industries.map((i, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `${site.url}/industries/${i.slug}`,
    name: i.title,
  })),
}

export default function IndustriesPage() {
  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Industries"
        title="Web design and SEO for Louisiana service and commercial businesses."
        description="Generic agencies sell the same package to a roofer, a SaaS startup, and a law firm. Strykora picks lanes and goes deep. These are the verticals Strykora knows cold, and where the case studies prove the model works."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/industries', label: 'Industries' },
        ]}
      />

      <section className="ledger-section industry-index" aria-labelledby="industry-index-heading">
        <div className="site-container">
          <div className="industry-spread">
            <div className="ledger-section-heading">
              <p className="eyebrow">Why these five</p>
              <h2 id="industry-index-heading">Picked on purpose. Each one earned a slot.</h2>
              <p className="ledger-section-intro">
                The lanes below share three things: a high-ticket transaction (so a small lift in rank pays for the whole site), a buyer who searches before they call, and a competitive set Strykora has already beaten in production. Every vertical on this page has a live, ranking Strykora build behind it, not a deck slide.
              </p>
            </div>
            <Image
              className="industry-photo"
              src="/images/hero-industries-index.jpg"
              alt="An excavator at a South Louisiana marine job site."
              width={1920}
              height={1080}
              sizes="(min-width: 1400px) 710px, (min-width: 1024px) 51vw, (min-width: 810px) 740px, 92vw"
            />
          </div>

          <ul className="industry-index-list" role="list">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={`/industries/${industry.slug}`} className="industry-index-link interior-linked">
                  <div>
                    {'flagship' in industry && industry.flagship && <p className="eyebrow">Flagship</p>}
                    <h2>{industry.headline}</h2>
                  </div>
                  <p className="interior-copy">{industry.short}</p>
                  <span className="interior-link-label">See approach</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section
        id="industry-discipline"
        className="interior-wash interior-rail"
        eyebrow="Discipline"
        heading="What Strykora will not take on."
        description="Saying no is the whole reason the case studies work. A vertical only earns a slot once the playbook is repeatable, the buyer journey is understood, and the schema and content patterns are dialed in. Until then, the answer is no, and a referral."
      >
        <dl className="industry-discipline-list">
          {[
            { title: 'Restaurants and retail', body: 'Foot-traffic businesses ranked by visual social and review velocity. Different game.' },
            { title: 'Medical and legal', body: 'Regulated copy, HIPAA, compliance review cycles. Specialist territory.' },
            { title: 'National e-commerce', body: 'Shopify experts and paid-media shops already crush this. Not the Strykora edge.' },
            { title: 'Guaranteed-ranking SEO', body: 'No reputable SEO operator promises specific Google rankings. Strykora reports what changed, not what is promised.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTA />
    </>
  )
}
