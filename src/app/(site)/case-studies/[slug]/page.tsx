import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import CaseMetrics from '@/components/CaseMetrics'
import Section from '@/components/Section'
import CTA from '@/components/CTA'
import { Schema, faqSchema } from '@/components/Schema'
import '../../editorial.css'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudies.find((cs) => cs.slug === slug)
  if (!c) return {}
  const title = `${c.client}: ${c.industry} Case Study`
  const description = c.metaDescription
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
    heading: 'ChatGPT and Perplexity both recommend Hover by name.',
    intro: 'When we asked ChatGPT and Perplexity for the best septic installer in Thibodaux, both put Hover Septic first. These screenshots were captured in June 2026. AI answers change over time, so we re-check them every month.',
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
  'foret-construction': {
    heading: 'ChatGPT names Foret its top roofing pick in Raceland.',
    intro: 'When asked for the best roofing company in Raceland, ChatGPT leads with Foret Construction & Roofing, pulls in its Google rating, address and phone number, and calls out its FORTIFIED roofing. Captured October 14, 2026.',
    shots: [
      {
        src: '/images/ai-citation-chatgpt-foret-raceland.jpg',
        engine: 'ChatGPT',
        caption: '"Best roofing company in Raceland."',
        highlight: '"For Raceland, Louisiana, my top local pick would be Foret Construction & Roofing LLC, based on its local presence, customer feedback, and roofing services."',
        alt: 'Screenshot of ChatGPT naming Foret Construction and Roofing its top local pick for the best roofing company in Raceland, Louisiana.',
      },
    ],
  },
}

const LIVE_SITES: Record<string, { url: string; screenshot: string; alt: string; coverShowsLiveSite?: boolean }> = {
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
    coverShowsLiveSite: true,
  },
  'acadia-pools': {
    url: 'https://www.acadiapools.com',
    screenshot: '/images/case-acadia-screenshot.jpg',
    alt: 'Screenshot of acadiapools.com, the live Strykora-built site for Acadia Pools in Thibodaux, Louisiana.',
  },
}

const caseDetails: Record<string, { challenge: string; approach: string[]; result: string; coverAlt: string; faqs: { q: string; a: string }[] }> = {
  'foret-construction': {
    challenge:
      'Jacob Foret\'s FORTIFIED-certified roofing operation had a Wix site with decent SEO foundations and working contact popups, but it was templated, leaned on stock photography, and charged Foret a monthly Wix rental fee with no path to ownership. The Google Business Profile had only a couple of photos, no posts, and no service descriptions. Invisible to the local pack and to AI Overviews. The bones of an SEO program were there; the foundation was not built to scale.',
    approach: [
      'Wix site retired. Rebuilt as a custom site Foret owns outright, no more monthly Wix bill',
      'Nine city landing pages targeting "roof replacement [city] la" searches across South Louisiana',
      'FORTIFIED, GAF, and Owens Corning credentials moved above the fold where storm-season buyers actually look',
      'Every service and city page written to answer what storm-season buyers ask, in plain sentences Google\'s AI answer and ChatGPT can quote',
      'Google Business Profile fully rebuilt with photos, weekly posts, and a services list that matches the site',
      'Monthly Local SEO retainer to keep the rankings growing',
    ],
    result: 'Foret now owns the new site outright, no more monthly Wix bill, with nine city landing pages targeting roof replacement searches across South Louisiana. The site is fast, set up for both Google and AI search, and the credentials buyers actually care about are surfaced where they look.',
    coverAlt: 'Aerial photo of a completed shingle roof replacement by Foret Construction in Raceland, Louisiana.',
    faqs: [
      { q: "Why did Foret Construction leave Wix?", a: "Jacob was paying Wix a monthly fee for a templated, stock-photo site he could never own. The rebuild is custom code Foret owns outright, so there is no monthly Wix bill and nothing to lose if he ever changes providers." },
      { q: "What did the Foret rebuild include?", a: "A custom site, nine city landing pages aimed at roof replacement searches across South Louisiana, his FORTIFIED, GAF and Owens Corning credentials moved to the top of the page, a rebuilt Google Business Profile, and an ongoing monthly Local SEO retainer." },
      { q: "What would a roofing site like Foret's cost?", a: "Every Strykora build gets one fixed price, in writing, after a short scoping conversation. For a roofer, the number depends mostly on how many service and city pages the business needs." },
    ],
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
    coverAlt: 'Lifted red GMC built by Elite Custom Automotive, photographed outside their Lockport shop.',
    faqs: [
      { q: "Why does Elite's site have two separate paths?", a: "Elite does two kinds of work for two kinds of customers: performance builds like lift kits and suspension, and everyday auto repair. Giving each its own path keeps a lift-kit buyer and someone with a check-engine light from wading through each other's pages." },
      { q: "Does Colin own the Elite website?", a: "Yes. Elite was paying a web provider monthly rent with no path to ownership. The rebuild is custom code Colin owns outright, with no monthly platform fee." },
      { q: "What would a shop site like Elite's cost?", a: "Every Strykora build gets one fixed price, in writing, after a short scoping conversation. For a shop like Elite, brand pages, city pages and booking tools are what move the price, so the quote lists each one." },
    ],
  },
  'all-out-window-tint': {
    challenge:
      'Reed Babin had built All Out Window Tint into a respected Gonzales shop with a decent professional site. When Dax came in as co-owner to expand into Baton Rouge, the existing rental site couldn\'t tell the dual-location story or capture the new market. The old web provider was charging monthly fees with no path to ownership, and the brand new Baton Rouge location had no Google Business Profile at all.',
    approach: [
      'Custom rebuild that Reed and Dax own outright, no more monthly platform tax',
      'Dual-location architecture with per-location landing pages and contact forms (Gonzales routes to Reed, Baton Rouge routes to Dax)',
      'Dedicated franchising page targeting future partners, a marketing angle the old rental site could not accommodate',
      'Full Google Business Profile takeover for both locations, including building the Baton Rouge profile from scratch',
      'Both the site and the Business Profile set up so ChatGPT and Google\'s AI answer can recommend All Out by name',
      'Live at all-outwindowtint.com (yes, with the hyphen)',
    ],
    result: 'Two months after launch, the Baton Rouge location ranks #3 in Google AI search results for "tint baton rouge", a market All Out was not ranking in at all before launch. Each location owns its own lead pipeline. Gonzales bookings hit Gonzales. Baton Rouge bookings hit Baton Rouge. The franchising page surfaces new partner inquiries Reed and Dax can vet without ever rebuilding the site.',
    coverAlt: 'Orange Corvette with the doors up, photographed inside the All Out Window Tint shop.',
    faqs: [
      { q: "How does one website handle two All Out locations?", a: "Each location has its own landing pages and its own contact form. Gonzales inquiries go to Reed and Baton Rouge inquiries go to Dax, so neither owner has to sort the other's leads." },
      { q: "How quickly did the Baton Rouge location show up in search?", a: "Two months after launch, the brand new Baton Rouge location ranked #3 in Google's AI search results for \"tint baton rouge\", a market All Out had not ranked in before. AI results change over time, so we re-check them monthly." },
      { q: "What would a two-location site like this cost?", a: "Every Strykora build gets one fixed price, in writing, after a short scoping conversation. A second location adds its own pages, form routing and Business Profile work, and the quote spells that out." },
    ],
  },
  'hover-septic': {
    challenge:
      'Trey Hover ran Hover Septic out of Thibodaux with zero digital footprint. No website, no Google Business Profile, just a Facebook page. Every install lead came through word-of-mouth, with no leverage when a customer Googled them mid-decision. This was a clean-slate build.',
    approach: [
      'First-time website built from scratch for Hover Septic',
      'Service pages mapped to the actual jobs Trey does: new install, replacement, repair, inspection',
      'Google Business Profile built from scratch with photos, posts, and Services entries aligned to the on-site copy',
      'On-page SEO and the behind-the-scenes code Google reads, all targeting the high-ticket "septic installs Thibodaux" search',
    ],
    result: 'Hover Septic ranks #1 organic for "septic installs in Thibodaux LA", the exact keyword that pays the bills. The impact was so profound that Trey was able to drop low-ticket pumpout work entirely and focus on multi-thousand-dollar installs. The site rewrote the business model.',
    coverAlt: 'Screenshot of hoverseptic.com, the Strykora-built website for Hover Septic in Thibodaux, Louisiana.',
    faqs: [
      { q: "Where did Hover Septic start?", a: "With no website and no Google Business Profile, only a Facebook page. Every install lead came from word of mouth, so a customer who searched for Hover mid-decision found nothing." },
      { q: "What changed for Hover Septic's business?", a: "The site ranked #1 organic for \"septic installs Thibodaux LA\", the search that brings in the high-ticket work. That let Trey drop low-ticket pump-out jobs and focus on multi-thousand-dollar installs." },
      { q: "What would a first website like Hover's cost?", a: "Every Strykora build gets one fixed price, in writing, after a short scoping conversation. A first site also needs a Google Business Profile set up from scratch, and the quote covers that." },
    ],
  },
  'acadia-pools': {
    challenge:
      'Matt Glover builds custom gunite pools in Thibodaux. Real builder, real reputation, real customers. But Matt did not have a website at all when he came to Strykora. The reputation was there locally. The web presence was zero. Every install lead came through word-of-mouth, which meant Matt was leaving money on the table any time a customer Googled "pool builder Thibodaux" mid-decision.',
    approach: [
      'Custom-built site at acadiapools.com, owned outright by Matt, no monthly platform fee',
      'Six service pages mapped to what Acadia actually does: custom gunite pools, renovation, water features, outdoor living, turf installation, pool maintenance',
      'Owner story written in Matt\'s voice, not generic "trusted local builder" agency boilerplate',
      'Google Business Profile rebuilt with photos, services, and a regular post schedule lined up with the on-site copy',
      'Page copy that answers what pool buyers ask (cost, timeline, gunite vs fiberglass) in plain sentences AI tools can quote, aimed at Thibodaux pool builder searches',
      'Trust signals surfaced where buyers look: insured, People\'s Choice Award, free quotes',
    ],
    result: 'When a real customer asks Perplexity for a pool builder in Thibodaux, Acadia Pools is the first name in the answer, ahead of Backyard Makeover and Coastal Pool Company. Perplexity pulls Matt\'s phone number (985) 413-2954 and the "custom gunite pool and spa builder" wording directly from the page copy Strykora built. The AI started naming Acadia within months of launch.',
    coverAlt: 'Completed inground pool and patio built by Acadia Pools in Thibodaux, Louisiana.',
    faqs: [
      { q: "Where did Acadia Pools start?", a: "Matt Glover had a strong local reputation for custom gunite pools but no website at all. Leads came from word of mouth, and a buyer searching \"pool builder Thibodaux\" mid-decision could not find him." },
      { q: "How does Perplexity know to recommend Acadia?", a: "Its answer quotes Acadia's own page wording, \"custom gunite pool and spa builder\", and the phone number from the site. Clear, specific copy about what the business does and where is what an AI answer can pull from. AI answers change over time, so we re-check them monthly." },
      { q: "What would a pool builder site like Acadia's cost?", a: "Every Strykora build gets one fixed price, in writing, after a short scoping conversation. Acadia's site has six service pages, and the page count is the biggest driver of the price." },
    ],
  },
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const c = caseStudies.find((cs) => cs.slug === slug)
  if (!c) notFound()
  const details = caseDetails[c.slug]
  const citations = AI_CITATIONS[c.slug]
  const liveSite = LIVE_SITES[c.slug]

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

      <div className={liveSite?.coverShowsLiveSite ? 'case-summary case-summary-metrics site-container' : 'case-summary site-container'}>
        {!liveSite?.coverShowsLiveSite && (
          <div className="case-cover">
            <Image
              src={c.cover}
              alt={details?.coverAlt ?? `${c.client} project cover image`}
              fill
              sizes="(min-width: 1400px) 910px, (min-width: 1024px) 66vw, 92vw"
              priority
            />
          </div>
        )}
        <CaseMetrics metrics={c.metrics} />
      </div>

      {details && (
        <div className="site-container case-narrative">
          <section aria-labelledby="challenge-heading">
            <header>
              <p className="eyebrow">Section 01</p>
              <h2 id="challenge-heading">The challenge</h2>
            </header>
            <p>{details.challenge}</p>
          </section>
          <section aria-labelledby="approach-heading">
            <header>
              <p className="eyebrow">Section 02</p>
              <h2 id="approach-heading">The approach</h2>
            </header>
            <ul role="list">
              {details.approach.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className="case-result" aria-labelledby="result-heading">
            <header>
              <p className="eyebrow">Section 03</p>
              <h2 id="result-heading">The result</h2>
            </header>
            <p>{details.result}</p>
          </section>
        </div>
      )}

      {citations && (
        <Section
          id="ai-citation"
          eyebrow="AI search receipts"
          heading={citations.heading}
          description={citations.intro}
          className="case-evidence surface-dark"
        >
          <div className={citations.shots.length === 1 ? 'case-citations case-citations-single' : 'case-citations'}>
            {citations.shots.map((shot) => (
              <figure key={shot.src}>
                <a href={shot.src} target="_blank" rel="noopener" className="receipt-link" aria-label={`${shot.alt} Open full screenshot in a new tab`}>
                  <div className="case-citation-image">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes={citations.shots.length === 1
                        ? '(min-width: 1024px) 288px, (min-width: 640px) 208px, (min-width: 390px) 342px, calc(100vw - 48px)'
                        : '(min-width: 1400px) 408px, (min-width: 1024px) 30vw, (min-width: 640px) 208px, (min-width: 390px) 342px, calc(100vw - 48px)'}
                    />
                  </div>
                  <span aria-hidden="true" className="receipt-link-preview">↗</span>
                </a>
                <figcaption>
                  <p className="eyebrow">{shot.engine}</p>
                  <p>Query: {shot.caption}</p>
                  <p>{shot.highlight}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <Link href="/services/ai-search-optimization" className="text-link editorial-follow">
            See how Strykora ranks clients inside AI answers
          </Link>
        </Section>
      )}

      {liveSite && (
        <Section
          id="live-site"
          eyebrow="Live site"
          heading="See the live build."
          description={`Want to see what Strykora actually ships? This is the live ${c.client} site right now.`}
          className="case-live"
        >
          <a href={liveSite.url} target="_blank" rel="noopener noreferrer" className="case-live-link">
            <div className="case-live-image">
              <Image
                src={liveSite.screenshot}
                alt={liveSite.alt}
                fill
                sizes="(min-width: 1400px) 780px, (min-width: 1024px) 55vw, 92vw"
              />
            </div>
            <div className="case-live-label">
              <p>{liveSite.url.replace(/^https?:\/\//, '')}</p>
              <span className="text-link">Visit site</span>
            </div>
          </a>
        </Section>
      )}

      {details?.faqs?.length ? (
        <Section id="case-faq" eyebrow="Questions" heading={`Common questions about the ${c.client} project.`} className="editorial-faq">
          <Schema data={faqSchema(details.faqs)} />
          <div className="case-questions">
            {details.faqs.map(({ q, a }) => (
              <div key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="other-work" eyebrow="Other work" heading="More Strykora builds." className="case-related">
        <ul role="list">
          {caseStudies.filter((cs) => cs.slug !== c.slug).map((cs) => (
            <li key={cs.slug}>
              <Link href={`/case-studies/${cs.slug}`}>
                <p className="eyebrow">{cs.client}</p>
                <h3>{cs.headline}</h3>
                <p>{cs.industry} · {cs.city}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA />
    </>
  )
}
