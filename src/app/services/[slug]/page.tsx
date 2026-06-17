import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, site, cities, comboSlugFor } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema, faqSchema as buildFaqSchema } from '@/components/Schema'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const title = `${service.title} in Louisiana`
  const description = service.short.length > 160 ? service.short.slice(0, 157) + '...' : service.short
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: { title, description, url: `${site.url}/services/${service.slug}` },
  }
}

const SERVICE_PAGE_COPY: Record<string, {
  howWeDoIt: { step: string; title: string; body: string }[]
  faqs: { q: string; a: string }[]
}> = {
  'web-design': {
    howWeDoIt: [
      { step: '01', title: 'Brief', body: 'One call to pin down your services, target cities, brand voice, and the highest-ticket keywords worth ranking for.' },
      { step: '02', title: 'Wireframe & content', body: 'Strykora drafts every page (homepage, services, city pages, about, contact) and routes it back to you for sign-off before any code is written.' },
      { step: '03', title: 'Build', body: 'Custom Next.js + Tailwind site, schema-rich and mobile-first, deployed to a preview URL within days.' },
      { step: '04', title: 'Launch', body: 'DNS cutover, sitemap submission, schema validation, and a handoff doc so you own the keys.' },
    ],
    faqs: [
      { q: 'How long does a Strykora website take to build?', a: 'Most builds ship live in about one week from kickoff. The stack is dialed in and you work directly with the builder, so there are no agency handoffs.' },
      { q: 'How much does a custom website cost?', a: 'Custom websites start at $3,750 one-time, depending on number of pages and scope. Every quote is a fixed price up front, no hourly billing.' },
      { q: 'Will I own the code?', a: 'Yes. Every Strykora site is delivered with the source code in a GitHub repo you own. You can leave Strykora at any time without rebuilding.' },
      { q: 'Can you take over an existing site?', a: 'Yes, if it\'s on Next.js or another modern framework. For Wix, Squarespace, or page-builder WordPress sites, a rebuild is almost always faster and cheaper than retrofitting.' },
      { q: 'Do you handle hosting and domain setup?', a: 'Strykora deploys to Vercel and walks you through DNS cutover from your current registrar. Hosting on Vercel\'s free tier covers most small business sites.' },
      { q: 'What if I need changes after launch?', a: 'Post-launch edits are billed at a flat per-edit rate or rolled into a monthly retainer. No surprise hourly invoices.' },
      { q: 'Do you offer ongoing maintenance?', a: 'Yes. Optional maintenance retainers cover security updates, schema additions, content updates, and uptime monitoring.' },
    ],
  },
  'seo': {
    howWeDoIt: [
      { step: '01', title: 'Audit', body: 'Strykora audits your current rankings, Google Business Profile, on-page SEO, schema, and backlink profile. You get the report whether or not we work together.' },
      { step: '02', title: 'Keyword & city mapping', body: 'Every service × city combination that matters for your business gets mapped to a target keyword backed by real search volume.' },
      { step: '03', title: 'On-page execution', body: 'Strykora ships title and meta updates, schema, internal links, FAQ blocks, and structural fixes that compound over time.' },
      { step: '04', title: 'Monthly retainer', body: 'New content, link building, GBP posts, and reporting every month. You see every move in a shared dashboard.' },
    ],
    faqs: [
      { q: 'How much does Strykora SEO cost?', a: 'Local SEO retainers start at $297/month with no long-term contract. Larger multi-city or multi-location operators are quoted custom.' },
      { q: 'How long until I see rankings move?', a: 'Expect meaningful organic lift in 60 to 120 days for a new site. Faster for sites with existing domain authority, slower in brutally competitive markets like Baton Rouge legal or New Orleans plumbing.' },
      { q: 'Do you work on platforms other than Next.js?', a: 'Yes. SEO retainers work on whatever platform you\'re on. If your current site is on Wix or a slow WordPress build, Strykora will tell you up front when a rebuild would beat six months of SEO.' },
      { q: 'What\'s included in the monthly retainer?', a: 'Two new content pages per month, on-page optimization, Google Business Profile posts and photo uploads, citation cleanup, internal link building, and a monthly report showing rankings, traffic, and leads.' },
      { q: 'Do you build backlinks?', a: 'Yes, ethically. Strykora pursues local citations, partnerships with adjacent Louisiana businesses, and editorial mentions. No private blog networks, no link farms.' },
      { q: 'How do you measure success?', a: 'Booked leads, phone calls, form submissions, and tracked ranking positions for the keywords that pay your bills. Vanity rankings don\'t count.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No long-term contracts. Strykora retainers are month-to-month.' },
    ],
  },
  'google-business-profile': {
    howWeDoIt: [
      { step: '01', title: 'Audit & cleanup', body: 'Strykora audits your profile, fixes incorrect categories, NAP inconsistencies, and any old or duplicate listings dragging your local pack ranking.' },
      { step: '02', title: 'Profile build-out', body: 'Every Services entry, every product, every photo, written for the local pack and the AI Overview.' },
      { step: '03', title: 'Weekly cadence', body: 'Weekly posts, photo uploads, review request follow-up, and Q&A monitoring. The profile stays active, which is the single biggest local SEO signal.' },
      { step: '04', title: 'Report', body: 'Monthly insights: views, calls, direction requests, top search queries, ranking changes.' },
    ],
    faqs: [
      { q: 'Can I get just GBP management without a full SEO retainer?', a: 'GBP optimization is bundled into the local SEO retainer because the two compound. Strykora doesn\'t offer GBP as a standalone monthly service.' },
      { q: 'Will you respond to reviews?', a: 'Strykora drafts review responses for your approval and posts on your behalf. Brand voice stays consistent and nothing slips through.' },
      { q: 'What if I have multiple locations?', a: 'Multi-location GBP setups are handled per-location, with shared brand assets and per-location content. All Out Window Tint runs two locations this way.' },
      { q: 'How does GBP affect AI Overviews?', a: 'Google now treats your Business Profile as a primary structured data source for local AI Overviews. Properly formatted Services entries, posts, and photos directly influence whether your business is named in the AI answer.' },
      { q: 'How quickly can the local pack rank improve?', a: 'Profiles with active posting, fresh photos, and consistent review velocity typically see local pack movement within 30 to 60 days.' },
    ],
  },
  'google-ads': {
    howWeDoIt: [
      { step: '01', title: 'Account audit', body: 'If you have an existing Google Ads account, Strykora audits it and identifies the wasted spend before touching anything. If you don\'t, Strykora builds it from scratch in your name.' },
      { step: '02', title: 'Build', body: 'Tight match types, conversion-tracked landing pages, exhaustive negative keyword lists, and bid strategies aligned to your real margin.' },
      { step: '03', title: 'Weekly optimization', body: 'Search term reports reviewed weekly. Negative keywords added, bids adjusted, ad copy A/B tested, landing pages iterated.' },
      { step: '04', title: 'Reporting', body: 'Shared dashboard with leads, cost per lead, and ROI. You see every dollar, every click, every form fill.' },
    ],
    faqs: [
      { q: 'How much should I budget for Google Ads?', a: 'For most South Louisiana service businesses, a $1,500 to $3,000/month ad budget covers a single high-intent service in one to two cities. Strykora will tell you up front if your budget is too low for the keywords you want to target.' },
      { q: 'How is management billed?', a: 'Management starts at $500/month plus your ad spend. The management fee covers build, weekly optimization, landing page work, and reporting. Ad spend goes directly to Google on your credit card.' },
      { q: 'Will I own the account?', a: 'Yes. Strykora builds and manages the account under your Google billing. If you ever leave, the account stays with you.' },
      { q: 'Do you build the landing page?', a: 'Yes. Conversion-tracked landing pages are built in-house on the same Next.js stack as your main site, with the same speed and SEO standards.' },
      { q: 'How long until ads start producing leads?', a: 'Leads start in week one. The first two weeks are learning and optimization; expect cost per lead to stabilize and trend down in weeks three and four.' },
      { q: 'Can I run ads without SEO?', a: 'Yes, but ads are most efficient when paired with strong SEO. Ads cover the gap while SEO catches up; SEO carries the load once it ranks. Stacking both compounds.' },
    ],
  },
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)
  const copy = SERVICE_PAGE_COPY[service.slug]

  // Only render city sidebar links to combos that actually exist
  const availableCityLinks = cities
    .map((c) => ({ city: c, combo: comboSlugFor(service.slug, c.slug) }))
    .filter((x): x is { city: typeof cities[number]; combo: string } => x.combo !== null)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in Louisiana`,
    description: service.long,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'State', name: 'Louisiana' },
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
    offers: {
      '@type': 'Offer',
      description: service.priceRange,
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <Schema data={[serviceSchema, ...(copy ? [buildFaqSchema(copy.faqs)] : [])]} />
      <PageHero
        eyebrow={service.eyebrow}
        title={`${service.title} in Louisiana`}
        description={service.long}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-md font-display text-text mb-6 text-balance">What you get</h2>
              <ul className="space-y-4">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-text-muted">
                    <svg className="w-5 h-5 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="card p-6 lg:sticky lg:top-28">
                <p className="eyebrow mb-3">Pricing</p>
                <p className="font-display text-2xl text-text mb-2">{service.priceRange}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Every quote is a fixed price up front. No hourly billing, no surprise invoices.
                </p>

                {availableCityLinks.length > 0 && (
                  <>
                    <p className="eyebrow mb-3">Cities</p>
                    <ul className="space-y-2 mb-6">
                      {availableCityLinks.map(({ city, combo }) => (
                        <li key={city.slug}>
                          <Link href={`/${combo}`} className="text-sm text-text-muted hover:text-text transition-colors flex items-center justify-between">
                            <span>{city.name}, {city.state}</span>
                            <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link href="/contact" className="btn-primary w-full justify-center">Start a project</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {copy && (
        <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="how-heading">
          <div className="container-wide">
            <Reveal className="mb-12 max-w-2xl">
              <p className="eyebrow mb-3">How it works</p>
              <h2 id="how-heading" className="text-display-md font-display text-text text-balance">
                How Strykora delivers {service.title.toLowerCase()}.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {copy.howWeDoIt.map((step) => (
                <Reveal key={step.step}>
                  <div className="card h-full">
                    <p className="font-mono text-xs text-accent mb-4">{step.step}</p>
                    <h3 className="text-lg font-display text-text mb-2">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy && (
        <section className="section-padding" aria-labelledby="service-faq-heading">
          <div className="container-narrow">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 id="service-faq-heading" className="text-display-md font-display text-text text-balance">
                {service.title} questions, honest answers.
              </h2>
            </Reveal>
            <div className="space-y-3">
              {copy.faqs.map((f) => (
                <Reveal key={f.q}>
                  <details className="card group">
                    <summary className="font-medium text-text cursor-pointer flex items-start justify-between gap-4 list-none">
                      <span>{f.q}</span>
                      <svg className="w-5 h-5 text-text-dim group-open:rotate-45 transition-transform shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-text-muted leading-relaxed">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="stack-heading">
        <div className="container-wide">
          <Reveal className="mb-12">
            <p className="eyebrow mb-3">Stack it with</p>
            <h2 id="stack-heading" className="text-display-md font-display text-text">Other services that compound.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {others.map((o) => (
              <Reveal key={o.slug}>
                <Link href={`/services/${o.slug}`} className="card-feature group block h-full">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim font-mono mb-3">0{o.priority}</p>
                  <h3 className="text-lg font-display text-text mb-2">{o.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{o.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
