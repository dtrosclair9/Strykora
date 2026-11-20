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
      'When a roof is leaking, the homeowner calls whoever shows up first with a phone number. Strykora roofer sites are built to rank for "roof replacement [city]" in the towns you work and turn that search into a booked estimate.',
    pain: [
      'Your Wix or Squarespace site loads slowly, and Google ranks the faster competitor above you.',
      'You rank for your brand name only, but new customers search by service, not by company name.',
      'Your Google Business Profile has zero posts, few photos, and a handful of reviews from 2022.',
    ],
    outcomes: [
      'A dedicated roof replacement and storm damage page in every city you serve.',
      'Your credentials (FORTIFIED, GAF and other manufacturer certifications, your verified license and insurance) shown where buyers look.',
      'Google Business Profile optimized for the local pack on "[city] roofer" searches.',
      'Service and city pages that answer what homeowners ask before they call: what a replacement involves, how long it takes, and which towns you cover.',
    ],
    faqs: [
      {
        q: 'Do you work with roofing companies outside Louisiana?',
        a: 'Strykora is built around South Louisiana roofing: storm seasons, FORTIFIED roofs, and the state rules on what a contractor is allowed to advertise. Roofers in similar storm markets (Mississippi Gulf Coast, Alabama, East Texas) are welcome to ask.',
      },
      {
        q: 'How long until I see leads?',
        a: 'Google Ads can start bringing in calls soon after a campaign goes live, depending on your budget and the competition. SEO is slower: expect meaningful organic lift in 60 to 120 days for a new site, sooner for a rebuild on a domain that already ranks.',
      },
      {
        q: 'Do you handle the Google Business Profile build-out too?',
        a: 'Yes. GBP optimization is bundled into the local SEO retainer. Weekly posts, photo uploads, review request automation, and Services entries written the way homeowners search are all included.',
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
      'General contractors, paving, fencing, dirt work and demolition crews have the same problem online: in the search results they all look alike. Strykora builds sites that name the exact work you do and the towns you do it in, with photos of real jobs, so a buyer has a reason to call you.',
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
        a: 'They go in a trust block near the top of the site: your Louisiana license number, insurance and bonding, and any specialty certifications. Strykora checks the license on the state board\'s lookup and words it exactly the way it is issued.',
      },
      {
        q: 'What if I do residential and commercial work?',
        a: 'They get separate pages. Homeowners land on residential service pages with a short quote form. Commercial buyers land on commercial pages with a form for project details, or they call.',
      },
      {
        q: 'How long does a Louisiana contractor site take to build?',
        a: 'Most builds go live about a week after the build starts. You deal directly with the person building it the whole time.',
      },
    ],
  },
  'home-services-louisiana': {
    intro:
      'Window tint, lawn care, pressure washing, pest control and mobile detailing get most of their new customers from "near me" searches and Google\'s map results. Strykora builds the website and the Google Business Profile with both in mind.',
    pain: [
      'You depend on Facebook for leads, and one algorithm change empties the pipeline.',
      'Your site has one page with all services jammed into a list.',
      'No reviews shown above the fold, so buyers bounce without contacting you.',
    ],
    outcomes: [
      'One page per service per city. Each ranks independently in local search.',
      'Reviews shown near the top of the page, where people decide whether to call.',
      'Your Google Business Profile and your site saying the same thing about your services, hours and service area.',
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
        a: 'Strykora puts your Google reviews in a block near the top of the page, where a buyer sees them before deciding to call, with a link to the full list on Google.',
      },
      {
        q: 'What about seasonal services?',
        a: 'Strykora builds seasonal pages (storm damage, holiday lighting, mosquito season, etc.) that activate ahead of demand and rank in time for the search peak.',
      },
      {
        q: 'How fast can I be ranking?',
        a: 'Google Ads can bring in calls soon after a campaign starts. Map rankings take longer: in smaller Louisiana markets, expect them to start moving within 60 to 120 days.',
      },
    ],
  },
  'auto-shops-louisiana': {
    intro:
      'Lift kits, custom builds, mechanical, detailing and tint each bring in a different customer, but they share one search problem: the results for "[city] auto repair" are usually Yelp and a few slow WordPress sites. Strykora builds a shop site that loads faster, explains each service on its own page, and makes calling or asking for a quote easy.',
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
        a: 'Yes. Strykora can give the brands you install (BDS, Cognito, KMC, Method, Fox and so on) their own pages, so a buyer searching by brand name finds your shop.',
      },
      {
        q: 'Do you handle scheduling integrations?',
        a: 'Strykora sends form leads to your phone by text. If you already book appointments in shop software, ask on the first call and Strykora will look at linking the site to it.',
      },
      {
        q: 'How fast can a Louisiana auto shop rank?',
        a: 'Google Ads can bring in calls soon after launch. SEO for "[city] auto repair" typically takes 90 to 180 days for a meaningful lift, faster for niche queries like "[city] lift kit installer".',
      },
      {
        q: 'What does an auto shop site cost?',
        a: 'An auto shop site is quoted by the services and brands it covers, and you pay for it once. SEO and Google Ads management are flat monthly fees, and ad spend goes straight to Google. Every quote is fixed and in writing before work starts.',
      },
    ],
  },
  'commercial-louisiana': {
    intro:
      'Louisiana marine operators, oil and gas service companies, and industrial contractors sell to procurement teams that vet vendors hard. Your website is the first credential check before anyone calls. A lot of operator sites in this market have not been touched in years, and that shows when a buyer checks you out before a bid.',
    pain: [
      'Your site is a brochure that hasn\'t been updated since the last admin clicked through.',
      'Procurement buyers can\'t quickly verify your fleet, vessel specs, SIRE/CDI/ISO credentials, or insurance carriers.',
      'Recruiting crew is half the battle and your careers page is a single PDF link.',
    ],
    outcomes: [
      'A site that names every service line clearly: towing, transport, offshore support, vessel ops, industrial services.',
      'Fleet and equipment pages with specs and credentials surfaced for procurement review.',
      'A recruiting-ready careers section with role-specific landing pages for mariners, deckhands, and operators.',
      'Clear pages for each service line and credential, so a buyer searching Google or asking ChatGPT finds the facts about you in your own words.',
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
        a: 'A marine operator or oilfield service company sells to procurement teams and hires crew, and those are two different visitors. Strykora builds a separate path for each: service and credential pages with a bid request form for buyers, and a careers section with an application for crew.',
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
    if (industry.slug === 'contractors-louisiana') return c.slug === 'foret-construction' || c.slug === 'acadia-pools'
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
        <Section id="industry-proof" className="industry-proof" eyebrow="Proof" heading={relatedCases.length > 1 ? "Clients doing this work." : "A client doing this work."}>
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
                <p>{service.eyebrow}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA heading={`Ready to outrank the ${industry.slug.startsWith('commercial') ? 'other commercial businesses' : `other ${industry.title.toLowerCase()}`} in your city?`}
        body="Send me your website and the jobs you want more of. Within one business day I'll come back with a fixed-price quote, or let you know if I'm not the right fit."
      />
    </>
  )
}
