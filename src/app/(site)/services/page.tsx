import type { Metadata } from 'next'
import Link from 'next/link'
import { services, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Section from '@/components/Section'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'
import '../interiors.css'

export const metadata: Metadata = {
  title: 'Web Design, SEO, Google Ads & AI Search — Louisiana',
  description:
    'Five services built to stack: custom web design you own, local SEO, Google Business Profile, Google Ads, and AI Search Optimization. Fixed quotes, no long contracts.',
  alternates: { canonical: `${site.url}/services` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Strykora services',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${site.url}/services/${s.slug}`,
    name: s.title,
  })),
}

export default function ServicesPage() {
  const featured = services.find((service) => 'featured' in service && service.featured)
  const core = services.filter((service) => !('featured' in service && service.featured))

  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Services"
        title="Web design, SEO and Google Ads for Louisiana businesses."
        description="Strykora builds websites and runs local SEO, Google Business Profiles, Google Ads and AI search optimization for Louisiana businesses. Most clients start with the website and add the rest from there."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
        ]}
      />

      <Section
        id="service-stack"
        className="interior-split-intro"
        eyebrow="How the services fit"
        heading="Five services, usually done in this order."
        description="A good-looking site nobody finds does not bring in work, and ranking a slow site just sends people to a bad first impression. That is why the four core services below run in this order. The fifth, AI search optimization, checks whether ChatGPT, Perplexity and Google's AI answer name your business, and fixes what they read about you."
      >
        {featured && (
          <article className="services-feature">
            <Link href={`/services/${featured.slug}`} className="interior-linked">
              <div className="services-feature-intro surface-dark">
                <div>
                  <p className="eyebrow">AI search</p>
                  <h2>{featured.title}</h2>
                </div>
                <div className="interior-copy">
                  {featured.long.split(/ (?=Strykora audits)/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <div className="services-feature-details interior-copy">
                <ul className="services-index-deliverables" role="list">
                  {featured.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <p className="interior-note">{featured.priceRange}</p>
                <span className="interior-link-label">How it works</span>
              </div>
            </Link>
          </article>
        )}

        <ol className="services-index-list" role="list">
          {core.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="services-index-link interior-linked">
                <div>
                  <p className="eyebrow">{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                </div>
                <div className="interior-copy">
                  <p>{service.long}</p>
                  <ul className="services-index-deliverables" role="list">
                    {service.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <p className="interior-note">{service.priceRange}</p>
                  <span className="interior-link-label">See {service.title.toLowerCase()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="service-start"
        className="service-start interior-wash interior-rail"
        eyebrow="Where to start"
        heading="Not sure which one you need first?"
        description="It depends on what is already broken. Find the line that sounds like your business and start there."
      >
        <ul className="service-start-list" role="list">
          {[
            {
              situation: 'My site looks dated, slow, or is on Wix or Squarespace.',
              lead: 'Web Design first.',
              why: 'A new site fixes the speed, search rankings, and lead-tracking before you spend a dollar on SEO. Otherwise you are paying for traffic that lands on a site that scares it away.',
              href: '/services/web-design',
            },
            {
              situation: 'My site is fine. I just do not show up on Google in my city.',
              lead: 'Local SEO first.',
              why: 'Page updates, your Google Business Profile and monthly content build on each other over six to twelve months. Unlike ads, the rankings do not switch off when you stop paying.',
              href: '/services/seo',
            },
            {
              situation: 'I need leads this month, not next year.',
              lead: 'Google Ads first.',
              why: 'Search ads can put you at the top of the page as soon as the campaign is live. Strykora runs the ads with a landing page that tracks which clicks turn into actual phone calls, so you see your real cost per lead.',
              href: '/services/google-ads',
            },
            {
              situation: 'My Google Business Profile is empty or stuck with my last agency.',
              lead: 'Google Business Profile first.',
              why: 'The map results drive more calls than the regular Google results for most service businesses. Strykora rebuilds the profile, keeps the reviews coming, and lines it up with the rest of your site.',
              href: '/services/google-business-profile',
            },
            {
              situation: 'My SEO is fine but ChatGPT and Google\'s AI answer never name me.',
              lead: 'AI Search Optimization first.',
              why: 'AI tools recommend businesses from what they can read about you: your pages, your Business Profile, your reviews, and other sites that mention you. Strykora finds where you are missing and fixes those places first.',
              href: '/services/ai-search-optimization',
            },
          ].map((item) => (
            <li key={item.situation}>
              <Link href={item.href} className="service-start-link interior-linked">
                <p className="service-start-situation">{item.situation}</p>
                <div>
                  <p className="interior-link-label">{item.lead}</p>
                  <p className="interior-copy">{item.why}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA
        heading="Not sure where to start?"
        body="Send me your website and tell me what you need most right now. I'll tell you which service makes sense first, and send a fixed-price quote for it."
      />
    </>
  )
}
