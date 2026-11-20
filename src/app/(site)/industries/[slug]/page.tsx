import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { industries, services, caseStudies, site, ogImage } from '@/config/site'
import PageHero from '@/components/PageHero'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import CTA from '@/components/CTA'
import { Schema, faqSchema as buildFaqSchema } from '@/components/Schema'
import '../../interiors.css'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

type Params = { params: Promise<{ slug: string }> }

const SEO_TITLE_OVERRIDE: Record<string, string> = {
  'commercial-louisiana': 'Websites & SEO for Louisiana Commercial Operators',
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}
  const title = SEO_TITLE_OVERRIDE[industry.slug] ?? industry.headline
  const description = industry.metaDescription
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/industries/${industry.slug}` },
    openGraph: { title, description, url: `${site.url}/industries/${industry.slug}`, images: [ogImage] },
  }
}

const industryPhotos: Record<string, { src: string; alt: string }> = {
  'roofers-louisiana': {
    src: '/images/hero-industry-roofers.jpg',
    alt: 'Architectural shingles on a roof installed by a Strykora client in Raceland, Louisiana.',
  },
  'contractors-louisiana': {
    src: '/images/hero-industry-contractors.jpg',
    alt: 'Wood framing going up on a pool house build by a Strykora contractor client in South Louisiana.',
  },
  'home-services-louisiana': {
    src: '/images/hero-industry-home-services.jpg',
    alt: 'Zero-turn mower parked in front of a Louisiana home on a job by a Strykora land management client.',
  },
  'auto-shops-louisiana': {
    src: '/images/hero-industry-auto-shops.jpg',
    alt: 'Lifted black Ford F-250 Super Duty built by Strykora client Elite Custom Automotive in Lockport, Louisiana.',
  },
  'commercial-louisiana': {
    src: '/images/hero-industry-commercial.jpg',
    alt: 'A Melancon Marine tugboat on the Intracoastal Waterway in South Louisiana.',
  },
}

const caseScreenshots: Record<string, { src: string; height: number }> = {
  'foret-construction': { src: '/images/case-foret-screenshot.jpg', height: 915 },
  'elite-custom-automotive': { src: '/images/case-elite-screenshot.jpg', height: 900 },
  'all-out-window-tint': { src: '/images/case-allout-screenshot.jpg', height: 900 },
  'hover-septic': { src: '/images/case-hover-screenshot.jpg', height: 915 },
}

const industryCopy: Record<string, { intro: string; pain: string[]; outcomes: string[]; faqs: { q: string; a: string }[] }> = {
  'roofers-louisiana': {
    intro:
      'Louisiana roofing buyers don\'t care about your fonts. They care that your phone is at the top of the search result when their roof is leaking. Strykora roofer sites are built to win the high-ticket "roof replacement [city]" search and convert it into a booked estimate.',
    pain: [
      'Your Wix or Squarespace site loads slowly, and Google ranks the faster competitor above you.',
      'You rank for your brand name only, but new customers search by service, not by company name.',
      'Your Google Business Profile has zero posts, few photos, and a handful of reviews from 2022.',
    ],
    outcomes: [
      'A dedicated roof replacement and storm damage page in every city you serve.',
      'Your credentials (FORTIFIED, GAF, manufacturer certifications, insurance carriers) surfaced where buyers look.',
      'Google Business Profile optimized for the local pack on "[city] roofer" searches.',
      'The behind-the-scenes code AI search engines look for, so Google\'s AI answer and ChatGPT name your business when buyers ask for a Louisiana roofer.',
    ],
    faqs: [
      {
        q: 'Do you work with roofing companies outside Louisiana?',
        a: 'Strykora is built around South Louisiana roofing: storm seasons, FORTIFIED certifications, the insurance-carrier dynamics. That depth is the wedge for the case study work. Roofers in similar storm markets (Mississippi Gulf Coast, Alabama, East Texas) are welcome to inquire. Just ask.',
      },
      {
        q: 'How long until I see leads?',
        a: 'Google Ads drive leads in the first week of launch. SEO compounds; expect meaningful organic lift in 60 to 120 days for a new site, faster for a rebuild on existing domain authority.',
      },
      {
        q: 'Do you handle the Google Business Profile build-out too?',
        a: 'Yes. GBP optimization is bundled into the local SEO retainer. Weekly posts, photo uploads, review request automation, and the Services entries tuned for AI Overview citation are all included.',
      },
      {
        q: 'Can you build during hurricane season?',
        a: 'Yes. Tell Strykora your deadline on the first call and the build gets scheduled around it. If you want to be found when storm calls spike, start early, because rankings take longer than a launch.',
      },
      {
        q: 'What does a Louisiana roofer site cost?',
        a: 'A roofer site is quoted by the number of city pages and storm-damage pages it needs, and you pay for it once. Local SEO is a flat monthly fee with no long-term contract. You get a fixed quote in writing before any work starts.',
      },
    ],
  },
  'contractors-louisiana': {
    intro:
      'General contractor, paving, fencing, dirt work, demo. Louisiana service contractors all face the same problem: customers can\'t tell you apart from the next guy in the SERP. Strykora builds sites that name what you actually do, where you do it, and why a buyer should call you over the truck pulling up across the street.',
    pain: [
      'Your site says "services" instead of the specific job you\'re hired for.',
      'You have no city-specific pages, so Google has no reason to show you in Houma or Baton Rouge.',
      'Your portfolio lives on Facebook, but buyers want to see it on your site with one click.',
    ],
    outcomes: [
      'Specific service pages (concrete driveway, board fence, land clearing, demolition) per city you serve.',
      'Project photo galleries with descriptive labels Google can read, so your work shows up in image search too.',
      'Quote forms that route straight to your phone, no portal login.',
      'A site fast enough to load on a job-site phone with bad signal.',
    ],
    faqs: [
      {
        q: 'I do five different things. Should I have five different pages?',
        a: 'Yes. Google ranks pages, not businesses. Each service gets its own page targeting the specific keyword buyers type when they need that exact work.',
      },
      {
        q: 'Do you build for general contractors or specialty trades?',
        a: 'Both. Strykora builds for general contractors, paving, fencing, concrete, dirt work, demolition, and pool builders across South Louisiana.',
      },
      {
        q: 'How do you handle insurance, bonding, and license info?',
        a: 'Every Strykora contractor site has a dedicated trust block surfacing your Louisiana state license number, insurance and bonding, and any specialty certifications. Search-visible and screen-reader accessible.',
      },
      {
        q: 'What if I do residential and commercial work?',
        a: 'Strykora splits the buyer journeys into separate paths. Residential prospects land on residential service pages and convert via quick-quote forms. Commercial prospects land on commercial pages and convert via project-detail forms or direct phone.',
      },
      {
        q: 'How long does a Louisiana contractor site take to build?',
        a: 'Most builds go live about a week after the build starts. The stack is dialed in and you work directly with the builder, no agency handoffs.',
      },
    ],
  },
  'home-services-louisiana': {
    intro:
      'Window tint, lawn care, pressure washing, pest control, mobile detailing. Home services live and die by "near me" searches and the local pack. Strykora builds the website and the Google Business Profile to win both.',
    pain: [
      'You depend on Facebook for leads, and one algorithm change empties the pipeline.',
      'Your site has one page with all services jammed into a list.',
      'No reviews shown above the fold, so buyers bounce without contacting you.',
    ],
    outcomes: [
      'One page per service per city. Each ranks independently in local search.',
      'Reviews surfaced in the hero, not buried in the footer.',
      'Your Google Business Profile and your site lined up so Google\'s AI answer can recommend you in the map results.',
      'Per-location lead routing if you run multiple shops.',
    ],
    faqs: [
      {
        q: 'Can you handle multi-location businesses?',
        a: 'Yes. Multi-location routing is built into the contact form. All Out Window Tint runs Gonzales and Baton Rouge on one Strykora site, with leads routed per-location.',
      },
      {
        q: 'What home-service trades do you build for?',
        a: 'Window tinting, lawn care, pressure washing, pest control, mobile detailing, fence cleaning, gutter cleaning, septic, and similar local home-service trades across South Louisiana.',
      },
      {
        q: 'How do I get reviews surfaced on the site?',
        a: 'Every Strykora home-service site has a reviews block in the hero or just below, pulling from your Google Business Profile. New reviews appear on the site within minutes of being posted, with no manual updates.',
      },
      {
        q: 'What about seasonal services?',
        a: 'Strykora builds seasonal pages (storm damage, holiday lighting, mosquito season, etc.) that activate ahead of demand and rank in time for the search peak.',
      },
      {
        q: 'How fast can I be ranking?',
        a: 'Google Ads drive leads in week one. SEO compounds; for home services in smaller Louisiana markets expect top-3 local pack visibility within 60 to 120 days.',
      },
    ],
  },
  'auto-shops-louisiana': {
    intro:
      'Lift kits, custom builds, mechanical, detailing, tint. Auto shops have wildly different buyer journeys but the same SEO problem: the SERP for "[city] auto repair" is owned by Yelp and four mediocre WordPress sites. Strykora builds a site that beats them on speed, content depth, and conversion paths.',
    pain: [
      'Your shop does five things. Your site sells one.',
      'Customers can\'t tell what brands you install (BDS, Cognito, KMC, etc.).',
      'Quote requests go into a Wix inbox you check once a week.',
    ],
    outcomes: [
      'Service-specific pages (lift kits, brake jobs, AC repair, detailing) per city.',
      'Brand pages for installers (BDS, Cognito, KMC) so buyers searching by brand find you.',
      'Forms that ping your phone the second they fire.',
      'A site that loads fast on a 4G connection in a service bay.',
    ],
    faqs: [
      {
        q: 'Do you build for shops that do both performance and mechanical?',
        a: 'Yes. Elite Custom Automotive runs both pipelines on one Strykora site: lift kit and suspension builds on one path, day-to-day auto repair on another.',
      },
      {
        q: 'Can buyers search by the brands I install?',
        a: 'Yes. Every Strykora auto shop site has brand-specific pages (BDS, Cognito, KMC, Method, Fox, etc.) so buyers searching by brand name find your shop.',
      },
      {
        q: 'Do you handle scheduling integrations?',
        a: 'Strykora wires the lead form into your phone via SMS notifications. For full appointment scheduling, Strykora partners with Mitchell1, Tekmetric, or Shop-Ware integrations on request.',
      },
      {
        q: 'How fast can a Louisiana auto shop rank?',
        a: 'Google Ads drive leads from launch. SEO for "[city] auto repair" typically takes 90 to 180 days for a meaningful lift, faster for niche queries like "[city] lift kit installer".',
      },
      {
        q: 'What does an auto shop site cost?',
        a: 'An auto shop site is quoted by the services and brands it covers, and you pay for it once. SEO and Google Ads management are flat monthly fees, and ad spend goes straight to Google. Every quote is fixed and in writing before work starts.',
      },
    ],
  },
  'commercial-louisiana': {
    intro:
      'Louisiana marine operators, oil and gas service companies, and industrial contractors sell to procurement teams that vet vendors hard. Your website is the first credential check before anyone calls. Most operator sites in this market are stuck on early-2010s WordPress builds with broken contact forms, and it costs them when bid season starts.',
    pain: [
      'Your site is a brochure that hasn\'t been updated since the last admin clicked through.',
      'Procurement buyers can\'t quickly verify your fleet, vessel specs, SIRE/CDI/ISO credentials, or insurance carriers.',
      'Recruiting crew is half the battle and your careers page is a single PDF link.',
    ],
    outcomes: [
      'A site that names every service line clearly: towing, transport, offshore support, vessel ops, industrial services.',
      'Fleet and equipment pages with specs and credentials surfaced for procurement review.',
      'A recruiting-ready careers section with role-specific landing pages for mariners, deckhands, and operators.',
      'The behind-the-scenes code AI search engines look for, so ChatGPT can pull your services and credentials directly when a procurement person searches.',
    ],
    faqs: [
      {
        q: 'Do you work with marine and oil & gas operators outside Louisiana?',
        a: 'Strykora is built around the South Louisiana commercial market: the buyers, the procurement networks, the Gulf Coast service cycle. For Gulf-Coast-adjacent operators outside Louisiana (Mississippi, Alabama, East Texas), the work translates cleanly. Ask and we will see if it is a fit.',
      },
      {
        q: 'Can you build under NDA?',
        a: 'Yes. Strykora can build under a mutual NDA and keep client names off the public case study list until you\'re ready to attribute. Confidential builds are common in this segment.',
      },
      {
        q: 'How does your work differ from a generic agency build for B2B?',
        a: 'Most agencies treat a marine operator or oilfield service company like a local home service business. Strykora treats the procurement journey separately from the recruiting journey, and builds both into the site with distinct conversion paths.',
      },
      {
        q: 'Can you handle multi-location operators with separate billing entities?',
        a: 'Yes. Strykora ships per-location or per-entity pages with the right addresses, credentials, and contact routing, all under one parent site and one domain.',
      },
      {
        q: 'How long does a commercial operator site take to build?',
        a: 'Most builds go live about a week after the build starts, with optional confidential pre-launch staging for procurement review and client sign-off.',
      },
    ],
  },
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) notFound()
  const copy = industryCopy[industry.slug]

  const relatedCases = caseStudies.filter((c) => {
    if (industry.slug === 'roofers-louisiana') return c.slug === 'foret-construction'
    if (industry.slug === 'auto-shops-louisiana') return c.slug === 'elite-custom-automotive'
    if (industry.slug === 'home-services-louisiana') return c.slug === 'all-out-window-tint' || c.slug === 'hover-septic'
    return false
  })

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.headline,
    description: industry.short,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'State', name: 'Louisiana' },
    serviceType: `${industry.title} Web Design and SEO`,
    url: `${site.url}/industries/${industry.slug}`,
  }

  const photo = industryPhotos[industry.slug]

  return (
    <>
      <Schema data={[serviceSchema, ...(copy ? [buildFaqSchema(copy.faqs)] : [])]} />
      <PageHero
        eyebrow={industry.title}
        title={industry.headline}
        description={industry.short}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/industries', label: 'Industries' },
          { href: `/industries/${industry.slug}`, label: industry.title },
        ]}
      />

      {copy && (
        <>
          <div className="ledger-section industry-introduction">
            <div className="site-container industry-spread">
              <p className="interior-lede">{copy.intro}</p>
              {photo && (
                <Image
                  className="industry-photo"
                  src={photo.src}
                  alt={photo.alt}
                  width={1920}
                  height={1080}
                  sizes="(min-width: 1400px) 710px, (min-width: 1024px) 51vw, (min-width: 810px) 740px, 92vw"
                />
              )}
            </div>
          </div>

          <div className="industry-comparison interior-wash">
            <div className="site-container">
              <section aria-labelledby="industry-pain-heading">
                <p className="eyebrow">What&apos;s broken</p>
                <h2 id="industry-pain-heading" className="interior-title">Common pain points.</h2>
                <ul className="interior-ruled-list" role="list">
                  {copy.pain.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
              <section aria-labelledby="industry-outcomes-heading" className="industry-outcomes">
                <p className="eyebrow">What we ship</p>
                <h2 id="industry-outcomes-heading" className="interior-title">What you actually get.</h2>
                <ul className="interior-ruled-list" role="list">
                  {copy.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
              </section>
            </div>
          </div>
        </>
      )}

      {relatedCases.length > 0 && (
        <Section id="industry-proof" className="industry-proof" eyebrow="Proof" heading="A client doing this work.">
          <div className="industry-proof-list">
            {relatedCases.map((study) => {
              const screenshot = caseScreenshots[study.slug]
              return (
                <article key={study.slug}>
                  <Link href={`/case-studies/${study.slug}`} className="industry-proof-link interior-linked">
                    {screenshot && (
                      <Image
                        className="industry-proof-image"
                        src={screenshot.src}
                        alt={`${study.client} website homepage.`}
                        width={1600}
                        height={screenshot.height}
                        sizes="(min-width: 1400px) 690px, (min-width: 1024px) 50vw, (min-width: 810px) 740px, 92vw"
                      />
                    )}
                    <div>
                      <p className="eyebrow">{study.client} · {study.industry} · {study.city}</p>
                      <h3>{study.headline}</h3>
                      <p className="interior-copy">{study.blurb}</p>
                      <span className="interior-link-label">Read case study</span>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </Section>
      )}

      {copy && (
        <Section
          id="industry-faq"
          className="interior-faq interior-wash interior-rail"
          eyebrow="FAQ"
          heading={`${industry.title} in Louisiana: common questions.`}
        >
          <FAQAccordion items={copy.faqs} />
        </Section>
      )}

      <Section
        id="industry-services"
        className="interior-rule interior-rail"
        eyebrow="Services"
        heading={`How Strykora builds for ${industry.title.toLowerCase()}.`}
      >
        <ul className="interior-link-list" role="list">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="interior-linked">
                <h3>{service.title}</h3>
                <p>{service.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA heading={`Ready to outrank the ${industry.slug.startsWith('commercial') ? 'other commercial businesses' : `other ${industry.title.toLowerCase()}`} in your city?`} />
    </>
  )
}
