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
        description="Strykora works with a short list of Louisiana trades and commercial operators. Each page below explains what a website in that trade needs, and links to related client work where there is some."
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
              <h2 id="industry-index-heading">Five trades Strykora builds for.</h2>
              <p className="ledger-section-intro">
                The trades below have two things in common: a high-ticket job, so a small move up in the rankings can pay for the whole site, and a buyer who searches before calling. The roofing, contractor, home service and auto shop pages each link to Strykora client work in that trade.
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
        description="Some businesses need a specialist Strykora is not. If yours is one of them, you will hear that on the first call, along with a referral to someone who fits better."
      >
        <dl className="industry-discipline-list">
          {[
            { title: 'Restaurants and retail', body: 'They win customers through foot traffic, social media and review volume, which is different work from what Strykora does.' },
            { title: 'Medical and legal', body: 'Medical and legal sites need regulated copy, HIPAA handling and compliance review. That calls for a specialist.' },
            { title: 'National e-commerce', body: 'Selling products nationwide is a job for Shopify and paid-media specialists.' },
            { title: 'Guaranteed-ranking SEO', body: 'Nobody can honestly promise a specific Google ranking, and Strykora will not. The monthly report shows what actually changed.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTA
        heading="Don't see your trade here?"
        body="These five pages cover most of the work, not all of it. Tell me what you do and where you do it, and within one business day I'll tell you whether Strykora is a good fit."
      />
    </>
  )
}
