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
  const title = `${c.client} Case Study: ${c.industry} in ${c.city.split(',')[0]}`
  const description = c.blurb.length > 160 ? c.blurb.slice(0, 157) + '...' : c.blurb
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/case-studies/${c.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/case-studies/${c.slug}`,
      images: [c.cover],
    },
  }
}

interface CitationShot {
  src: string
  engine: string
  alt: string
  caption: string
  highlight: string
}

const AI_CITATIONS: Record<string, { heading: string; intro: string; shots: CitationShot[] }> = {
  'hover-septic': {
    heading: 'Three AI engines. One client. All recommend Hover by name.',
    intro: 'When a real customer asks any of the major AI assistants for the best septic installer in Thibodaux, Hover Septic wins. These screenshots were captured in June 2026.',
    shots: [
      {
        src: '/images/ai-citation-perplexity-hover.jpg',
        engine: 'Perplexity',
        caption: '"Recommend me the best septic system installer in Thibodaux LA."',
        highlight: 'Answer leads with: "the strongest option I found is Hover Septic Services."',
        alt: 'Screenshot of Perplexity recommending Hover Septic Services as the strongest option for a septic installer in Thibodaux, Louisiana.',
      },
      {
        src: '/images/ai-citation-chatgpt-best-overall.jpg',
        engine: 'ChatGPT',
        caption: '"Recommend me the best septic installation service Thibodaux LA."',
        highlight: 'Answer crowns Hover Septic Services as "Best overall."',
        alt: 'Screenshot of ChatGPT crowning Hover Septic Services as Best overall for septic installation in Thibodaux, Louisiana.',
      },
      {
        src: '/images/ai-citation-chatgpt-why-hover.jpg',
        engine: 'ChatGPT (follow-up)',
        caption: '"Why I\'d start with Hover."',
        highlight: 'The AI explains its own pick, citing the exact positioning Strykora built into the site.',
        alt: 'Screenshot of ChatGPT explaining why Hover Septic is the closest match for septic installation in Thibodaux.',
      },
    ],
  },
  'elite-custom-automotive': {
    heading: 'Perplexity recommends Elite by name. Twice.',
    intro: 'When a real customer asked Perplexity for the best lift kit installer in Lockport, the answer named Elite Custom Automotive twice in the same response — once as the best match, once as the practical pick.',
    shots: [
      {
        src: '/images/ai-citation-perplexity-elite.jpg',
        engine: 'Perplexity',
        caption: '"Recommend me the best auto shop in Lockport that does lift kits."',
        highlight: '"The best match I found in Lockport is Elite Custom Automotive." Three supporting bullet points follow. Lower in the answer: "For a lift kit, I\'d start with Elite Custom Automotive."',
        alt: 'Screenshot of Perplexity recommending Elite Custom Automotive as the best lift kit installer in Lockport, Louisiana.',
      },
    ],
  },
  'all-out-window-tint': {
    heading: 'ChatGPT lists All Out in its top picks for Baton Rouge.',
    intro: 'When a real customer asked ChatGPT for the best window tinting shop in Baton Rouge, All-Out Window Tint made the "My pick" list as the quality option with broader services. Captured roughly two months after the Baton Rouge location launched from scratch.',
    shots: [
      {
        src: '/images/ai-citation-chatgpt-allout.jpg',
        engine: 'ChatGPT',
        caption: '"Best window tinting shop in Baton Rouge."',
        highlight: 'All-Out Window Tint is named alongside Auto Evolution and Signature Rides, described as "a quality shop with more services" beyond tint (ceramic, carbon, PPF, wraps).',
        alt: 'Screenshot of ChatGPT naming All-Out Window Tint in its top picks for window tinting in Baton Rouge, Louisiana.',
      },
    ],
  },
  'acadia-pools': {
    heading: 'Perplexity names Acadia Pools first when asked for a Thibodaux pool builder.',
    intro: 'When a real customer asked Perplexity for a pool builder in Thibodaux, Acadia Pools was the first option named in the answer, ahead of Backyard Makeover and Coastal Pool Company. Perplexity even extracted Matt Glover\'s phone number directly into the answer text.',
    shots: [
      {
        src: '/images/ai-citation-perplexity-acadia.jpg',
        engine: 'Perplexity',
        caption: '"Recommend me a pool builder in Thibodaux LA."',
        highlight: '"A strong local option in Thibodaux is Acadia Pools. They describe themselves as a custom gunite pool and spa builder in Thibodaux and list a local phone number, (985) 413-2954, along with free site visits and estimates."',
        alt: 'Screenshot of Perplexity recommending Acadia Pools as a strong local option for a pool builder in Thibodaux, Louisiana.',
      },
    ],
  },
}

const LIVE_SITES: Record<string, { url: string; screenshot: string; alt: string }> = {
  'foret-construction': {
    url: 'https://www.foretconstruction.co',
    screenshot: '/images/case-foret-screenshot.jpg',
    alt: 'Screenshot of foretconstruction.co, the live Strykora-built site for Foret Construction & Roofing in Raceland, Louisiana.',
  },
  'elite-custom-automotive': {
    url: 'https://www.elitecustomauto.co',
    screenshot: '/images/case-elite-screenshot.jpg',
    alt: 'Screenshot of elitecustomauto.co, the live Strykora-built site for Elite Custom Automotive in Lockport, Louisiana.',
  },
  'all-out-window-tint': {
    url: 'https://all-outwindowtint.com',
    screenshot: '/images/case-allout-screenshot.jpg',
    alt: 'Screenshot of all-outwindowtint.com, the live Strykora-built site for All Out Window Tint serving Gonzales and Baton Rouge, Louisiana.',
  },
  'hover-septic': {
    url: 'https://www.hoverseptic.com',
    screenshot: '/images/case-hover-screenshot.jpg',
    alt: 'Screenshot of hoverseptic.com, the live Strykora-built site for Hover Septic in Thibodaux, Louisiana.',
  },
  'acadia-pools': {
    url: 'https://www.acadiapools.com',
    screenshot: '/images/case-acadia-screenshot.jpg',
    alt: 'Screenshot of acadiapools.com, the live Strykora-built site for Acadia Pools in Thibodaux, Louisiana.',
  },
}

const caseDetails: Record<string, { challenge: string; approach: string[]; result: string; coverAlt: string }> = {
  'foret-construction': {
    challenge:
      'Jacob Foret\'s FORTIFIED-certified roofing operation had a Wix site with decent SEO foundations and working contact popups, but it was templated, leaned on stock photography, and charged Foret a monthly Wix rental fee with no path to ownership. The Google Business Profile had only a couple of photos, no posts, and no service descriptions. Invisible to the local pack and to AI Overviews. The bones of an SEO program were there; the foundation was not built to scale.',
    approach: [
      'Wix to Next.js rebuild on the Strykora stack, owned outright by Foret with no more Wix monthly fee',
      'Nine dedicated city landing pages targeting the high-ticket "roof replacement [city] la" search across South Louisiana',
      'FORTIFIED, GAF, and Owens Corning credentials surfaced above the fold where storm-season buyers look',
      'Schema markup and llms.txt on every service and city page to feed Google AI Overviews and ChatGPT citation',
      'Google Business Profile fully rebuilt with photos, weekly posts, and Services entries aligned to the on-site copy',
      'Monthly SEO retainer to compound the rankings',
    ],
    result: 'Foret now owns the new site outright, no more monthly Wix tax, with nine city landing pages targeting roof replacement queries across South Louisiana. The site is fast, schema-rich, and the credentials buyers actually care about are surfaced where they look.',
    coverAlt: 'New metal roof installation at golden hour in South Louisiana, the kind of FORTIFIED-certified work Foret Construction is built around.',
  },
  'elite-custom-automotive': {
    challenge:
      'Colin Richard had built Elite Custom Automotive into a real shop in Lockport, but the website didn\'t show it. The old site was templated, stock-photo heavy, and looked like every other low-budget auto shop site on the SERP. Colin was also paying monthly rental fees to the web provider with no path to ownership. The Google Business Profile had zero photos, zero posts, and no service descriptions. Invisible to the local pack.',
    approach: [
      'Custom rebuild from scratch with a badass 3D hero treatment that finally showcases Elite\'s actual brand',
      'Two distinct conversion paths: performance builds (BDS lift kits, Cognito suspension) on one path, day-to-day auto repair on the other',
      'Brand pages for the suspension installers (BDS, Cognito) so buyers searching by manufacturer find Elite first',
      'Nine city pages targeting "[city] auto repair" across South Louisiana',
      'Google Business Profile fully built out: photos, posts, service descriptions, all aligned to the on-site copy',
      'Lead form that pings Colin\'s phone instead of sitting in a never-checked inbox',
    ],
    result: 'Elite now ranks top 3 in its niche in Lockport, Louisiana, the local pack position that actually drives booked work. Colin owns the code outright. No more monthly rental fee. Two pipelines (performance and repair) running on one site without the messages stepping on each other.',
    coverAlt: 'Aggressive mud-terrain tire on a lifted truck, the kind of BDS suspension build Elite Custom Automotive is known for.',
  },
  'all-out-window-tint': {
    challenge:
      'Reed Babin had built All Out Window Tint into a respected Gonzales shop with a decent professional site. When Dax came in as co-owner to expand into Baton Rouge, the existing rental site couldn\'t tell the dual-location story or capture the new market. The old web provider was charging monthly fees with no path to ownership, and the brand new Baton Rouge location had no Google Business Profile at all.',
    approach: [
      'Custom rebuild that Reed and Dax own outright, no more monthly platform tax',
      'Dual-location architecture with per-location landing pages and contact forms (Gonzales routes to Reed, Baton Rouge routes to Dax)',
      'Dedicated franchising page targeting future partners, a marketing angle the old rental site could not accommodate',
      'Full Google Business Profile takeover for both locations, including building the Baton Rouge profile from scratch',
      'AI-search-ready schema, llms.txt, and structured Services entries on every page',
      'Live at all-outwindowtint.com (yes, with the hyphen)',
    ],
    result: 'Two months after launch, the Baton Rouge location ranks #3 in Google AI search results for "tint baton rouge", a market All Out was not ranking in at all before launch. Each location owns its own lead pipeline. Gonzales bookings hit Gonzales. Baton Rouge bookings hit Baton Rouge. The franchising page surfaces new partner inquiries Reed and Dax can vet without ever rebuilding the site.',
    coverAlt: 'Black luxury car with heavily tinted windows at golden hour, the kind of tint installation All Out Window Tint specializes in.',
  },
  'hover-septic': {
    challenge:
      'Trey Hover ran Hover Septic out of Thibodaux with zero digital footprint. No website, no Google Business Profile, just a Facebook page. Every install lead came through word-of-mouth, with no leverage when a customer Googled them mid-decision. This was a clean-slate build.',
    approach: [
      'First-time website built from scratch for Hover Septic',
      'Service pages mapped to the actual jobs Trey does: new install, replacement, repair, inspection',
      'Google Business Profile built from scratch with photos, posts, and Services entries aligned to the on-site copy',
      'On-page SEO and schema targeting the high-ticket "septic installs Thibodaux" search',
    ],
    result: 'Hover Septic ranks #1 organic for "septic installs in Thibodaux LA", the exact keyword that pays the bills. The impact was so profound that Trey was able to drop low-ticket pumpout work entirely and focus on multi-thousand-dollar installs. The site rewrote the business model.',
    coverAlt: 'Heavy excavator at dusk on a rural Louisiana installation site, the kind of work Hover Septic delivers in Thibodaux and Lafourche Parish.',
  },
  'acadia-pools': {
    challenge:
      'Matt Glover built Acadia Pools into Thibodaux\'s premier custom gunite pool operation by hand, the same way he runs crab traps on weekends. Cajun, born and raised in Thibodaux, People\'s Choice Award winner. The web presence didn\'t match the craft. Matt needed a site that told the story honestly, ranked for Thibodaux and Lafourche Parish pool buyers, and stayed in his hands instead of a platform vendor\'s.',
    approach: [
      'Custom Next.js build at acadiapools.com, owned outright by Matt, no monthly platform tax',
      'Six service pages mapped to what Acadia actually does: custom gunite pools, renovation, water features, outdoor living, turf installation, pool maintenance',
      'Owner story written in Matt\'s actual voice (Cajun lifestyle, born and raised, crab traps and cooking) instead of generic "trusted local builder" agency boilerplate',
      'Google Business Profile rebuilt with photos, services, and post cadence aligned to the on-site copy',
      'Schema, llms.txt, and direct-answer copy patterns tuned for AI Overview and Perplexity citation on Thibodaux pool builder queries',
      'Trust signals surfaced: licensed and insured, open 7 days a week, People\'s Choice Award, free consultations',
    ],
    result: 'When a real customer asks Perplexity for a pool builder in Thibodaux, Acadia Pools is the first option named in the answer, ahead of Backyard Makeover and Coastal Pool Company. Perplexity pulls Matt\'s phone number ((985) 413-2954) and the "custom gunite pool and spa builder" positioning directly out of the schema and copy Strykora built. The AI citation arrived within months of launch.',
    coverAlt: 'Hero of the live Strykora-built acadiapools.com site for Acadia Pools in Thibodaux, Louisiana.',
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

      {AI_CITATIONS[c.slug] && (
        <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="ai-citation-heading">
          <div className="container-wide">
            <Reveal className="mb-10 max-w-3xl">
              <p className="eyebrow mb-3">AI search receipts</p>
              <h2 id="ai-citation-heading" className="text-display-md font-display text-text text-balance">
                {AI_CITATIONS[c.slug].heading}
              </h2>
              <p className="mt-4 text-text-muted text-lg leading-relaxed">
                {AI_CITATIONS[c.slug].intro}
              </p>
            </Reveal>
            <div className={`grid grid-cols-1 gap-5 ${
              AI_CITATIONS[c.slug].shots.length >= 3 ? 'md:grid-cols-3' :
              AI_CITATIONS[c.slug].shots.length === 2 ? 'md:grid-cols-2' :
              'max-w-md'
            }`}>
              {AI_CITATIONS[c.slug].shots.map((shot) => (
                <Reveal key={shot.src}>
                  <figure className="card-feature !p-0 overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[1100/2136] bg-white">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="p-6 border-t border-border">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-mono mb-2">{shot.engine}</p>
                      <p className="text-sm text-text-muted leading-relaxed mb-2">
                        <span className="text-text-dim">Query:</span> {shot.caption}
                      </p>
                      <p className="text-sm text-text leading-relaxed">{shot.highlight}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <Link href="/services/ai-search-optimization" className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all">
                See how Strykora ranks clients inside AI answers
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {LIVE_SITES[c.slug] && (
        <section className="section-padding border-t border-border" aria-labelledby="live-site-heading">
          <div className="container-wide">
            <Reveal className="mb-8 max-w-2xl">
              <p className="eyebrow mb-3">Live site</p>
              <h2 id="live-site-heading" className="text-display-md font-display text-text text-balance">
                See the live build.
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Want to see what Strykora actually ships? This is the live {c.client} site right now.
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
