import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { industries, services, caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: industry.headline,
    description: `${industry.short} Custom Next.js sites and SEO for Louisiana ${industry.title.toLowerCase()}.`,
    alternates: { canonical: `${site.url}/industries/${industry.slug}` },
  }
}

const industryCopy: Record<string, { intro: string; pain: string[]; outcomes: string[]; faqs: { q: string; a: string }[] }> = {
  'roofers-louisiana': {
    intro:
      'Louisiana roofing buyers don\'t care about your fonts. They care that your phone is at the top of the search result when their roof is leaking. Our roofer sites are built to win the high-ticket "roof replacement [city]" search and convert it into a booked estimate.',
    pain: [
      'Your Wix site loads in 4 seconds. Google deprioritizes it.',
      'You rank for your brand name only. Nobody searches your brand.',
      'GBP has zero posts, zero photos, and 8 reviews from 2022.',
    ],
    outcomes: [
      'Roof replacement and storm damage pages in every city you serve.',
      'FORTIFIED, GAF, Owens Corning credentials surfaced where buyers look.',
      'GBP optimized for the local pack on "[city] roofer" searches.',
    ],
    faqs: [
      { q: 'Do you work with roofing companies outside Louisiana?', a: 'Louisiana only. We\'re built around the geography and storm season here.' },
      { q: 'How long until I see leads?', a: 'Google Ads drive leads in week one. SEO compounds; expect meaningful organic lift in 60 to 120 days.' },
    ],
  },
  'contractors-louisiana': {
    intro:
      'General contractor, paving, fencing, dirt work, demo. Louisiana service contractors all face the same problem: customers can\'t tell you apart from the next guy in the SERP. We build sites that name what you actually do, where you do it, and why a buyer should call you over the truck pulling up across the street.',
    pain: [
      'Your site says "services" instead of the specific job you\'re hired for.',
      'No city-specific pages, so Google has no reason to show you in Houma or Baton Rouge.',
      'Your portfolio is on Facebook. Buyers want to see it on your site, with one click.',
    ],
    outcomes: [
      'Specific service pages (concrete driveway, board fence, land clearing) per city.',
      'Project photo galleries with rich alt text and schema.',
      'Quote forms that route to your phone without you logging into a portal.',
    ],
    faqs: [
      { q: 'I do five different things — should I have five different pages?', a: 'Yes. Google ranks pages, not businesses. Each service gets its own.' },
    ],
  },
  'home-services-louisiana': {
    intro:
      'Window tint, lawn care, pressure washing, pest control, mobile detailing. Home services live and die by "near me" searches and the local pack. We build the website and the GBP to win both.',
    pain: [
      'You depend on Facebook for leads. One algorithm change and the pipeline is empty.',
      'Your site has one page with all services jammed into a list.',
      'No reviews shown above the fold. Buyers bounce.',
    ],
    outcomes: [
      'One page per service per city. Each ranks independently.',
      'Reviews surfaced in the hero, not buried in the footer.',
      'GBP and on-site schema aligned to feed the AI local pack.',
    ],
    faqs: [
      { q: 'Can you handle multi-location?', a: 'Yes. Multi-location routing is built into the contact form — All Out Window Tint runs two locations on one site.' },
    ],
  },
  'auto-shops-louisiana': {
    intro:
      'Lift kits, custom builds, mechanical, detailing, tint. Auto shops have wildly different buyer journeys but the same SEO problem: the SERP for "[city] auto repair" is owned by Yelp and four mediocre WordPress sites. We build a site that beats them on speed, content depth, and conversion paths.',
    pain: [
      'Your shop does five things. Your site sells one.',
      'Customers can\'t tell what brands you install (BDS, Cognito, KMC, etc.).',
      'Quote requests go into a Wix inbox you check once a week.',
    ],
    outcomes: [
      'Service-specific pages (lift kits, brake jobs, AC repair) per city.',
      'Brand pages for installers (BDS, Cognito) — searchable by brand.',
      'Forms that ping your phone the second they fire.',
    ],
    faqs: [
      { q: 'Do you build for shops that do both performance and mechanical?', a: 'Yes — Elite Custom Automotive runs both pipelines on one Strykora site.' },
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

  const faqSchema = copy ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      {faqSchema && <Schema data={faqSchema} />}
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
          <section className="section-padding">
            <div className="container-narrow">
              <Reveal>
                <p className="text-lg md:text-xl text-text-muted leading-relaxed text-balance">{copy.intro}</p>
              </Reveal>
            </div>
          </section>

          <section className="section-padding border-t border-border bg-bg-elevated">
            <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal>
                <p className="eyebrow mb-4">What&apos;s broken</p>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-6 text-balance">Common pain points.</h2>
                <ul className="space-y-3">
                  {copy.pain.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-text-muted">
                      <span className="text-accent mt-1.5">—</span>
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <p className="eyebrow mb-4">What we ship</p>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-6 text-balance">What you actually get.</h2>
                <ul className="space-y-3">
                  {copy.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-text-muted">
                      <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {relatedCases.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">Proof</p>
              <h2 className="text-display-md font-display text-text text-balance">A client doing this work.</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5">
              {relatedCases.map((c) => (
                <Reveal key={c.slug}>
                  <Link href={`/case-studies/${c.slug}`} className="card-feature group block p-8">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-mono mb-3">
                      {c.client} · {c.industry} · {c.city}
                    </p>
                    <h3 className="text-2xl font-display text-text mb-3 text-balance">{c.headline}</h3>
                    <p className="text-text-muted leading-relaxed mb-6">{c.blurb}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                      Read case study
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">Services</p>
            <h2 className="text-display-md font-display text-text">How we build for {industry.title.toLowerCase()}.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <Link href={`/services/${s.slug}`} className="card-feature h-full block">
                  <p className="font-mono text-xs text-accent mb-3">0{s.priority}</p>
                  <h3 className="text-lg font-display text-text mb-2">{s.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA heading={`Ready to outrank the other ${industry.title.toLowerCase()} in your city?`} />
    </>
  )
}
