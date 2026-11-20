import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import FAQAccordion from '@/components/FAQAccordion'
import Section from '@/components/Section'
import CTA from '@/components/CTA'
import ReviewsSection from '@/components/ReviewsSection'
import { Schema, personSchema, faqSchema as buildFaqSchema } from '@/components/Schema'
import '../editorial.css'

const portraitPreload = '/images/dayne-headshot-400.avif'
const portraitSrcSet = `${portraitPreload} 400w, /images/dayne-headshot-640.avif 640w, /images/dayne-headshot-800.avif 800w`
const portraitSizes = '(min-width: 1170px) 400px, (min-width: 1024px) 34.24vw, (min-width: 448px) 400px, calc(100vw - 48px)'

export const metadata: Metadata = {
  title: 'About Dayne Trosclair, Louisiana Web Designer',
  description: `${site.name} is built and run by ${site.owner} out of ${site.address.city}, Louisiana. One operator, every site built by hand, every client kept on a first-name basis.`,
  alternates: { canonical: `${site.url}/about` },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${site.url}/about`,
  mainEntity: { '@id': `${site.url}/#dayne` },
}

const aboutFaqs = [
  {
    q: `Who actually builds Strykora websites?`,
    a: `${site.owner} builds every Strykora website by hand, from the first commit to the last deploy. No subcontractors, no offshore teams, no junior developers handed the project after the sales call.`,
  },
  {
    q: `Does Strykora take clients outside Louisiana?`,
    a: `Strykora is built around the Louisiana market, which is where the case studies are and where the local SEO work goes deepest. But web design, Google Ads, and AI search optimization are location-agnostic, so out-of-state inquiries are welcome. Just ask and we will see if it is a fit.`,
  },
  {
    q: `What is Strykora's tech setup and why does it matter?`,
    a: `Strykora builds on Next.js, the same professional framework agencies in San Francisco and New York charge five and six figures for. It loads fast on a phone, comes with the search-engine code Google reads, and stays fast as your site grows. You do not need to know any of this; the short version is your site is built the right way, run from Thibodaux at Louisiana prices.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        href={portraitPreload}
        imageSrcSet={portraitSrcSet}
        imageSizes={portraitSizes}
        fetchPriority="high"
      />
      <Schema data={[aboutPageSchema, personSchema, buildFaqSchema(aboutFaqs)]} />
      <PageHero
        eyebrow="About"
        title="One operator. South Louisiana. No layers."
        description={`I'm ${site.owner}. I build every ${site.name} website by hand and run the SEO myself, out of ${site.address.city}.`}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
        ]}
      />

      <div className="ledger-section site-container about-profile">
        <figure className="about-portrait">
          <picture>
            <source type="image/avif" srcSet={portraitSrcSet} sizes={portraitSizes} />
            {/* eslint-disable-next-line @next/next/no-img-element -- Static variants avoid a first-visit image transform. */}
            <img
              src="/images/dayne-headshot-800.webp"
              alt={`${site.owner}, founder of ${site.name}, in ${site.address.city}, Louisiana`}
              width={400}
              height={531}
              fetchPriority="high"
            />
          </picture>
          <figcaption>
            <p><strong>{site.owner}</strong></p>
            <p>Founder · {site.address.city}, {site.address.state}</p>
          </figcaption>
        </figure>
        <div className="about-story editorial-copy">
          <p>
            I&apos;m from {site.address.city}. I&apos;ve worked next to Louisiana service business owners my whole life, so I know how they think and what their customers actually search for.
          </p>
          <p>
            Most agencies sell you a sales rep, then hand the real work to a junior. You never talk to whoever built your site. Every text change after launch becomes a two-week ticket.
          </p>
          <p>
            {site.name} is built differently. I take a small number of Louisiana clients each year, build every
            site by hand, and handle the SEO myself. No account managers, no offshore subcontractors,
            no Wix templates with your logo on them.
          </p>
          <p>
            The stack {site.name} builds on is the same one high-end agencies in San Francisco and New
            York use. I run it from {site.address.city} and price it for Louisiana service businesses. You
            get a real custom build for a small business budget, and you own the code outright.
          </p>
          <p className="about-pull">
            You call, I answer. You text a change, it ships the same day. You decide to leave, you take the
            code, the domain, the analytics, and the GBP with you. That&apos;s the trade. No lock-in, no
            account managers, no nonsense. If that&apos;s the kind of partner you want, we&apos;ll work well together.
          </p>
        </div>
      </div>

      <div className="about-facts">
        <dl className="site-container">
          {[
            { label: 'Owned by', value: 'You' },
            { label: 'Based in', value: `${site.address.city}, ${site.address.state}` },
            { label: 'Rooted in', value: 'Louisiana' },
            { label: 'Footprint', value: 'One operator' },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section id="about-wins" eyebrow="Recent wins" heading="Real Louisiana businesses, real rankings." className="about-wins">
        <dl className="about-results">
          <div>
            <dt>#1 Organic</dt>
            <dd>Hover Septic, Thibodaux LA<br />&quot;septic installs Thibodaux LA&quot;</dd>
          </div>
          <div>
            <dt>#3 AI Search</dt>
            <dd>All Out Window Tint, Baton Rouge<br />&quot;tint baton rouge&quot;, 2 months post-launch</dd>
          </div>
          <div>
            <dt>9 City Pages</dt>
            <dd>Foret Construction<br />FORTIFIED roofer, South LA</dd>
          </div>
        </dl>
      </Section>

      <ReviewsSection limit={2} featuredOnly heading="What clients say about working with Strykora." eyebrow="Reviews" showSeeAllLink />

      <Section id="about-faq" eyebrow="FAQ" heading="About Strykora." className="editorial-faq">
        <FAQAccordion items={aboutFaqs} />
      </Section>

      <CTA />
    </>
  )
}
