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
  description: `${site.name} is ${site.owner}, a web designer in ${site.address.city}, Louisiana who builds every client site and runs the local SEO personally.`,
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
    a: `${site.owner} builds every Strykora website, from the first line of code to launch day. The project is never passed to a subcontractor or a junior developer after the sales call.`,
  },
  {
    q: `Does Strykora take clients outside Louisiana?`,
    a: `Strykora is built around the Louisiana market, which is where the case studies are and where the local SEO work goes deepest. But web design, Google Ads, and AI search optimization are location-agnostic, so out-of-state inquiries are welcome. Just ask and we will see if it is a fit.`,
  },
  {
    q: `What is Strykora's tech setup and why does it matter?`,
    a: `Strykora builds on Next.js, the same professional framework agencies in San Francisco and New York charge five and six figures for. It loads fast on a phone, comes with the search-engine code Google reads, and stays fast as your site grows. You do not need to know any of this. The short version: the site is fast, Google can read it, and you are paying Louisiana prices for it.`,
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
        title={`I build websites and run local SEO from ${site.address.city}.`}
        description={`I'm ${site.owner}. Every ${site.name} website is one I built, and I run the SEO on it myself.`}
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
            At most agencies, the person who sells you the site is not the person who builds it. After launch, every small change turns into a ticket that takes a week or two.
          </p>
          <p>
            I keep the client list small, a handful of Louisiana businesses a year, so I can build every site and
            run the SEO myself. Nothing goes to a subcontractor, and nobody gets a Wix template with their logo
            dropped in.
          </p>
          <p>
            I build on Next.js, the same framework a lot of big-city agencies use, and price the work for
            Louisiana service businesses. You get a custom build on a small business budget, and you own the
            code outright.
          </p>
          <p className="about-pull">
            You can call me directly, and when you send a change you hear back within one business day. If
            you ever leave, the code, the domain, the analytics and your Google Business Profile go with you.
            If that&apos;s how you&apos;d like to work, we&apos;ll get along fine.
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

      <Section id="about-wins" eyebrow="Recent wins" heading="Recent results for Louisiana clients." className="about-wins">
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
            <dt>9 Service Pages</dt>
            <dd>Foret Construction<br />Raceland, Houma and Thibodaux</dd>
          </div>
        </dl>
        <p className="source-note">Where the numbers come from: Local Falcon map-ranking scans, searches on Google, and what clients reported. Rankings move over time.</p>
      </Section>

      <ReviewsSection limit={2} featuredOnly heading="What clients say about working with Strykora." eyebrow="Reviews" showSeeAllLink />

      <Section id="about-faq" eyebrow="FAQ" heading="About Strykora." className="editorial-faq">
        <FAQAccordion items={aboutFaqs} />
      </Section>

      <CTA
        heading="Talk to Dayne."
        body="Tell me what your business does and what you want the website to do for it. I read every message myself and reply within one business day."
      />
    </>
  )
}
