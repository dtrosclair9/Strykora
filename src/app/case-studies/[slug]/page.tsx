import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudies.find((cs) => cs.slug === slug)
  if (!c) return {}
  return {
    title: `${c.client} — Case Study`,
    description: c.blurb.length > 160 ? c.blurb.slice(0, 157) + '...' : c.blurb,
    alternates: { canonical: `${site.url}/case-studies/${c.slug}` },
    openGraph: {
      title: `${c.client} — Case Study`,
      description: c.blurb.length > 160 ? c.blurb.slice(0, 157) + '...' : c.blurb,
      url: `${site.url}/case-studies/${c.slug}`,
      images: [c.cover],
    },
  }
}

const LIVE_SITES: Record<string, { url: string; screenshot: string; alt: string }> = {
  'foret-construction': {
    url: 'https://www.foretconstruction.co',
    screenshot: '/images/case-foret-screenshot.jpg',
    alt: 'Screenshot of foretconstruction.co, the live Strykora-built Next.js site for Foret Construction & Roofing.',
  },
  'elite-custom-automotive': {
    url: 'https://www.elitecustomauto.co',
    screenshot: '/images/case-elite-screenshot.jpg',
    alt: 'Screenshot of elitecustomauto.co, the live Strykora-built Next.js site for Elite Custom Automotive in Lockport, Louisiana.',
  },
  'all-out-window-tint': {
    url: 'https://all-outwindowtint.com',
    screenshot: '/images/case-allout-screenshot.jpg',
    alt: 'Screenshot of all-outwindowtint.com, the live Strykora-built Next.js site for All Out Window Tint in Gonzales and Baton Rouge.',
  },
  'hover-septic': {
    url: 'https://www.hoverseptic.com',
    screenshot: '/images/case-hover-screenshot.jpg',
    alt: 'Screenshot of hoverseptic.com, the live Strykora-built Next.js site for Hover Septic in Thibodaux, Louisiana.',
  },
}

const caseDetails: Record<string, { challenge: string; approach: string[]; result: string; coverAlt: string }> = {
  'foret-construction': {
    challenge:
      'Jacob Foret\'s FORTIFIED-certified roofing operation was running on a slow Wix site that ranked for nothing but the brand name. The real opportunity, high-ticket roof replacement searches across nine South Louisiana cities, was being eaten by national lead-gen sites and competitors with better content.',
    approach: [
      'Full Wix to Next.js rebuild on the Strykora stack',
      'Nine dedicated city landing pages, each with unique local content and FAQs',
      'FORTIFIED, GAF, and Owens Corning credentials surfaced above the fold',
      'Schema markup on every service and city page to feed AI Overviews',
      'Monthly SEO retainer to compound the rankings',
    ],
    result: 'Foret now owns the Next.js + SEO stack outright, no monthly Wix tax, with nine city landing pages targeting "roof replacement [city] la" queries across South Louisiana. The site is fast, schema-rich, and earns leads directly from organic search instead of paid social.',
    coverAlt: 'New metal roof installation at golden hour in South Louisiana, the kind of FORTIFIED-certified work Foret Construction is built around.',
  },
  'elite-custom-automotive': {
    challenge:
      'Colin Richard runs both performance builds (BDS lift kits, Cognito suspension) and bread-and-butter auto repair out of Lockport. One business, two completely different customer journeys, and a website that did neither justice.',
    approach: [
      'Two distinct conversion paths on one Strykora-built Next.js site',
      'Brand pages for the suspension installers (BDS, Cognito) that buyers search by name',
      'Nine city pages targeting auto repair searches across South Louisiana',
      'Lead form that routes to phone notifications instead of an inbox',
    ],
    result: 'Elite ships with both pipelines targeted: BDS and Cognito brand pages for lift kit buyers searching by manufacturer, and city-specific auto repair pages targeting "[city] auto repair" queries. Two distinct keyword sets, one site, no message conflict.',
    coverAlt: 'Aggressive mud-terrain tire on a lifted truck, the kind of BDS suspension build Elite Custom Automotive is known for.',
  },
  'all-out-window-tint': {
    challenge:
      'Reed runs window tint shops in Gonzales and Baton Rouge. The old Hibu-hosted site had one contact form going to one inbox, which meant the Gonzales team got Baton Rouge leads and vice versa. Cross-routing was killing conversion, and the Baton Rouge market is brutally competitive.',
    approach: [
      'Single Strykora-built site with location-specific landing pages',
      'Contact form that dynamically swaps Formspree endpoints by location selection',
      'Per-location Google Business Profiles fed by matching site content',
      'AI-search-ready schema across every page, llms.txt, and structured services entries',
      'Live at all-outwindowtint.com (yes, with the hyphen)',
    ],
    result: 'Two months after launch, the Baton Rouge location ranks #3 in Google AI search results for "tint baton rouge". Each location owns its own lead pipeline: Gonzales bookings hit Gonzales, Baton Rouge bookings hit Baton Rouge. One site, two clean funnels.',
    coverAlt: 'Black luxury car with heavily tinted windows at golden hour, the kind of tint installation All Out Window Tint specializes in.',
  },
  'hover-septic': {
    challenge:
      'Hover Septic does multi-thousand-dollar septic installations in Thibodaux and the surrounding parishes. They had no website. Every lead came through word-of-mouth and Facebook, with no leverage when a customer Googled them mid-decision.',
    approach: [
      'Custom Next.js site targeting the high-ticket "septic installs Thibodaux" search',
      'Service pages mapped to the actual jobs (new install, replacement, repair, inspection)',
      'Google Business Profile optimization with photos, posts, and services aligned to the on-site copy',
      'Schema and llms.txt for AI search citation',
    ],
    result: 'Hover Septic ranks #1 organic for "septic installs in Thibodaux LA", the exact keyword that pays the bills. Multi-thousand-dollar install leads now flow straight from search.',
    coverAlt: 'Heavy excavator at dusk on a rural Louisiana installation site, the kind of work Hover Septic delivers in Thibodaux and Lafourche Parish.',
  },
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const c = caseStudies.find((cs) => cs.slug === slug)
  if (!c) notFound()
  const details = caseDetails[c.slug]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.headline,
    description: c.blurb,
    image: `${site.url}${c.cover}`,
    url: `${site.url}/case-studies/${c.slug}`,
    author: { '@id': `${site.url}/#dayne` },
    publisher: { '@id': `${site.url}/#business` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/case-studies/${c.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: `${c.industry} in ${c.city}`,
    },
  }

  return (
    <>
      <Schema data={articleSchema} />
      <PageHero
        eyebrow={`${c.industry} · ${c.city}`}
        title={c.headline}
        description={c.blurb}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/case-studies', label: 'Case Studies' },
          { href: `/case-studies/${c.slug}`, label: c.client },
        ]}
      />

      <section className="pt-8 md:pt-12">
        <div className="container-wide">
          <Reveal className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border mb-12">
            <Image
              src={c.cover}
              alt={details?.coverAlt ?? `${c.client} project cover image`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
          </Reveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <Reveal className="grid grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border max-w-3xl mb-16">
            {c.metrics.map((m) => (
              <div key={m.label} className="bg-bg-elevated p-6 text-center">
                <p className="font-display text-3xl md:text-4xl gradient-text">{m.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-text-dim mt-2">{m.label}</p>
              </div>
            ))}
          </Reveal>

          {details && (
            <div className="container-narrow !px-0 space-y-14">
              <Reveal>
                <p className="eyebrow mb-3">Section 01</p>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-4">The challenge</h2>
                <p className="text-lg text-text-muted leading-relaxed">{details.challenge}</p>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-3">Section 02</p>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-4">The approach</h2>
                <ul className="space-y-3 mt-4">
                  {details.approach.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-text-muted">
                      <svg className="w-5 h-5 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-3">Section 03</p>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-4">The result</h2>
                <p className="text-lg text-text-muted leading-relaxed">{details.result}</p>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {LIVE_SITES[c.slug] && (
        <section className="section-padding border-t border-border" aria-labelledby="live-site-heading">
          <div className="container-wide">
            <Reveal className="mb-8 max-w-2xl">
              <p className="eyebrow mb-3">Live site</p>
              <h2 id="live-site-heading" className="text-display-md font-display text-text text-balance">
                See the live build.
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Want to see what Strykora actually ships? This is the live {c.client} site, running on Next.js + Vercel right now.
              </p>
            </Reveal>
            <Reveal>
              <a
                href={LIVE_SITES[c.slug].url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-[16/9] rounded-2xl overflow-hidden border border-border hover:border-border-light transition-colors"
              >
                <Image
                  src={LIVE_SITES[c.slug].screenshot}
                  alt={LIVE_SITES[c.slug].alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-bg via-bg/70 to-transparent flex items-center justify-between">
                  <p className="font-mono text-sm text-text">{LIVE_SITES[c.slug].url.replace(/^https?:\/\//, '')}</p>
                  <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Visit site
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">Other work</p>
            <h2 className="text-display-md font-display text-text">More Strykora builds.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {caseStudies.filter((cs) => cs.slug !== c.slug).map((cs) => (
              <Reveal key={cs.slug}>
                <Link href={`/case-studies/${cs.slug}`} className="card-feature group block p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-mono mb-2">{cs.client}</p>
                  <h3 className="text-lg font-display text-text mb-2">{cs.headline}</h3>
                  <p className="text-sm text-text-muted">{cs.industry} · {cs.city}</p>
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
