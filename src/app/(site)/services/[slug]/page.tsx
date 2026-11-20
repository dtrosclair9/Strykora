import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, site, cities, comboSlugFor, ogImage } from '@/config/site'
import PageHero from '@/components/PageHero'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import CTA from '@/components/CTA'
import { Schema, faqSchema as buildFaqSchema } from '@/components/Schema'
import '../../interiors.css'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

/** One plain line on terms per service (the old shared fragment line repeated on all five pages). */
const SERVICE_TERMS: Record<string, string> = {
  'web-design': 'Once the pages and forms are scoped, you get the price in writing. You pay for the build once, with no hourly billing.',
  seo: 'The plan runs month to month. Your written scope lists the work and the searches Strykora tracks for you.',
  'google-business-profile': 'Profile management comes with the monthly local SEO plan, so there is no separate bill for it.',
  'google-ads': 'Management is quoted separately as a flat fee. You pay Google directly for ad spend, and Strykora adds no markup.',
  'ai-search-optimization': 'You can get the audit and 30-day sprint on their own, or as part of the monthly local SEO plan.',
}

/** Closing band per service, so no two service pages end on the same pitch. */
const SERVICE_CTA: Record<string, { heading: string; body: string }> = {
  'web-design': {
    heading: 'Ready for a website you own?',
    body: "Send your current site, or tell me you don't have one yet, and which jobs you want it to bring in. I'll get back to you within one business day to talk it through.",
  },
  seo: {
    heading: 'Want to show up for the jobs you want?',
    body: 'Tell me the searches you want to be found for and the towns you work. I will reply within one business day with what the monthly plan would cover.',
  },
  'google-business-profile': {
    heading: 'Want help with your Business Profile?',
    body: "Send me a link to your Google Business Profile and tell me where you'd like it to show up. You'll hear back within one business day.",
  },
  'google-ads': {
    heading: 'Thinking about Google Ads?',
    body: "Tell me what you sell, where, and roughly what you'd like to spend a month. I'll reply within one business day and tell you whether ads make sense at that budget.",
  },
  'ai-search-optimization': {
    heading: 'Want to know what the AI tools say about you?',
    body: 'Tell me your business, your main service and your town. Within one business day I will reply with how the audit or the 30-day sprint would work for you, at a fixed price.',
  },
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  // Search-phrase titles (~50-60 chars with the template); the H1 stays "<Service> in Louisiana".
  const SEO_TITLES: Record<string, string> = {
    'web-design': 'Custom Website Design in Louisiana You Own',
    seo: 'Local SEO Services for Louisiana Businesses',
    'google-business-profile': 'Google Business Profile Management in Louisiana',
    'google-ads': 'Google Ads Management for Louisiana Businesses',
    'ai-search-optimization': 'AI Search Optimization for Louisiana Businesses',
  }
  const title = SEO_TITLES[service.slug] ?? `${service.title} in Louisiana`
  const description = service.metaDescription
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: { title, description, url: `${site.url}/services/${service.slug}`, images: [ogImage] },
  }
}

const SERVICE_RELATED_POSTS: Record<string, { slug: string; title: string; blurb: string }[]> = {
  'web-design': [
    { slug: 'why-your-wix-site-isnt-ranking-louisiana', title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)', blurb: 'Why a slow, generic Wix site loses close calls in Google, and three fixes.' },
  ],
  'seo': [
    { slug: 'why-seo-matters-for-small-businesses-louisiana', title: 'Why SEO Matters for Small Businesses in Louisiana', blurb: 'What actually moves local rankings for a Louisiana service business.' },
  ],
  'ai-search-optimization': [
    { slug: 'why-chatgpt-recommends-your-competitor-louisiana', title: 'Why ChatGPT Recommends Your Competitor Instead of You', blurb: 'How AI assistants pick which local business to name, and what it takes to be one of them.' },
    { slug: 'google-may-2026-ai-search-update-louisiana-businesses', title: 'Google\'s May 2026 Core Update: What Louisiana Service Businesses Should Check', blurb: 'What Google\'s May 2026 core update did and did not change, and what to do about AI search.' },
  ],
}

const SERVICE_PAGE_COPY: Record<string, {
  howWeDoIt: { step: string; title: string; body: string }[]
  faqs: { q: string; a: string }[]
}> = {
  'web-design': {
    howWeDoIt: [
      { step: '01', title: 'One call to listen', body: 'Strykora gets on a call to nail down your services, the cities you work in, your brand voice, and the jobs that pay the bills (those are what we build the site around).' },
      { step: '02', title: 'Page-by-page drafts', body: 'Strykora drafts every page (home, services, city pages, about, contact) and sends them back for your sign-off before writing a single line of code. No surprises at launch.' },
      { step: '03', title: 'Build', body: 'Strykora builds the site custom (no Wix, no Squarespace, no templates), mobile-first, fast on a phone. You see a working preview within days.' },
      { step: '04', title: 'Launch', body: 'Strykora handles the domain switch, submits the site to Google, and hands you a one-page sheet with every login and account so you own the keys.' },
    ],
    faqs: [
      { q: 'How long does a Strykora website take to build?', a: 'Most builds go live in about a week from when we start. You work directly with the person building your site, so there is no agency runaround.' },
      { q: 'How much does a custom website cost?', a: 'It depends on how many pages you need and how much custom work goes into them. You pay once, and every quote is a fixed price in writing before work starts. No hourly billing, no surprise invoices. Send the form and I will get back to you within one business day. Most quotes start with a short call about where your site stands now.' },
      { q: 'Will I really own everything?', a: 'Yes. When the site launches, Strykora hands you the source code, the domain, and every account (Google, hosting, analytics). If you ever leave, you take all of it with you. No rebuild needed.' },
      { q: 'Can you take over my existing site?', a: 'Sometimes. If it is already custom-built, often yes. If it is on Wix, Squarespace, GoDaddy, or a templated WordPress site, a rebuild is almost always faster and cheaper than trying to fix the old one. Strykora will tell you the honest answer on the first call.' },
      { q: 'Who hosts the site after launch?', a: 'Strykora handles the hosting setup and walks you through the domain switch from your current registrar. Hosting is included for most small-business sites and runs about as cheap as it gets.' },
      { q: 'What if I need changes after launch?', a: 'Small edits are billed at a flat per-edit rate or rolled into a monthly retainer. No surprise hourly bills. Most text edits go live the same day.' },
      { q: 'Do you offer ongoing maintenance?', a: 'Yes. An optional monthly retainer covers security updates, content updates, and watching the site so it stays up. Most clients pair it with the Local SEO retainer.' },
    ],
  },
  'seo': {
    howWeDoIt: [
      { step: '01', title: 'Audit', body: 'Strykora checks where you rank now, what your Google Business Profile looks like, what other sites link to you, and what is broken under the hood. You get the report whether or not we work together.' },
      { step: '02', title: 'Map every job to every city', body: 'Every service in every city that matters for your business gets matched to the exact words people actually type into Google. Real search data, not guesses.' },
      { step: '03', title: 'Fix the site', body: 'Strykora fixes your page titles, headings, internal links and site speed, and rewrites thin pages so each one answers what a buyer asks before calling. Most of this happens in the first 30 days.' },
      { step: '04', title: 'Monthly retainer', body: 'New content, new links, weekly Google Business Profile posts, and a plain-English report every month. You see every move in a shared dashboard.' },
    ],
    faqs: [
      { q: 'How much does Strykora SEO cost?', a: 'Local SEO is a flat monthly fee with no long-term contract. The fee depends on how many cities and locations you need covered, and you get it in writing before anything starts.' },
      { q: 'How long until I see rankings move?', a: 'Expect real movement in 60 to 120 days for a new site. Faster for sites that already have some history with Google. Slower in brutally competitive markets like Baton Rouge legal or New Orleans plumbing.' },
      { q: 'Does this work if my site is on Wix, Squarespace, or WordPress?', a: 'Yes. The SEO retainer works on whatever platform your site is on. But if your current site is slow or hard to update, Strykora will tell you up front when a rebuild would beat six months of SEO on a broken foundation.' },
      { q: 'What is included in the monthly retainer?', a: 'New pages when your business needs them (your written scope says how many), on-page updates, Google Business Profile posts and photos, cleaning up your business listings across the web, building links from other Louisiana sites, and a monthly report with rankings, traffic, and leads.' },
      { q: 'Do you build backlinks?', a: 'Yes, the honest way. Strykora gets your business listed on directories that matter, partners with adjacent Louisiana businesses, and earns mentions on real websites. No private blog networks, no link farms.' },
      { q: 'How do you measure success?', a: 'By the leads that come in: phone calls and form submissions. The report also tracks where you rank for the searches that bring in real jobs. A ranking for a phrase nobody searches does not count for much.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No long-term contracts. Strykora retainers are month-to-month.' },
    ],
  },
  'google-business-profile': {
    howWeDoIt: [
      { step: '01', title: 'Clean up what is wrong', body: 'Strykora fixes incorrect business categories, mismatched addresses or phone numbers, and old duplicate listings on Google that are dragging your map ranking down.' },
      { step: '02', title: 'Build the profile out', body: 'Every service, every photo, every section gets written for both the map results and Google\'s AI answer. The profile looks legit because it is.' },
      { step: '03', title: 'Weekly activity', body: 'Posts, photos, review request follow-ups, and answering questions on your profile every week. Recent reviews move the map ranking. Posts and photos mostly help the people deciding whether to call.' },
      { step: '04', title: 'Monthly report', body: 'Plain-English numbers every month: views, calls, direction requests, what people searched to find you, and how your ranking moved.' },
    ],
    faqs: [
      { q: 'Can I get just Google Business Profile help without the SEO retainer?', a: 'No. Profile work and SEO are the same job done two places, so they are bundled into the monthly Local SEO retainer. Strykora does not sell the Google Business Profile as a standalone monthly service.' },
      { q: 'Will you respond to my reviews?', a: 'Strykora drafts the response for every review and sends it to you to approve. Your brand voice stays consistent and no review slips through unanswered.' },
      { q: 'What if I have more than one location?', a: 'Each location gets its own profile with shared brand assets and location-specific content. All Out Window Tint runs two locations this way (Gonzales and Baton Rouge), each with its own lead routing.' },
      { q: 'How does the Google Business Profile help with the AI answer at the top of Google?', a: 'Google says its AI answer uses Business Profiles when it recommends a local business. A profile with the right category, a complete services list, accurate hours, and recent reviews gives it accurate facts to work from.' },
      { q: 'How quickly will my map ranking move?', a: 'Profiles with the right category, complete details, and a steady stream of new reviews usually start moving up the map results in 30 to 60 days. How close you are to the person searching still matters, and no profile work changes that.' },
    ],
  },
  'google-ads': {
    howWeDoIt: [
      { step: '01', title: 'Account check', body: 'If you have an existing Google Ads account, Strykora goes through it and shows you where your money is being wasted before touching anything. If you do not have one, Strykora opens it in your name.' },
      { step: '02', title: 'Build the campaign', body: 'Strykora targets the exact words your buyers type, blocks the words that waste money, builds a landing page that tracks which clicks turn into actual phone calls, and sets a bid strategy that matches what each lead is worth to you.' },
      { step: '03', title: 'Weekly tune-ups', body: 'Strykora reviews every search term every week, blocks the ones bringing junk traffic, tests new ad copy, and tweaks the landing page based on what is converting.' },
      { step: '04', title: 'Plain-English reporting', body: 'A shared dashboard shows leads, cost per lead, and return on your money. You see every dollar, every click, every form fill, every call.' },
    ],
    faqs: [
      { q: 'How much should I budget for Google Ads?', a: 'For most South Louisiana service businesses, a $1,500 to $3,000-per-month ad budget covers one high-value service in one or two cities. Strykora will tell you up front if your budget is too low for the searches you want to win.' },
      { q: 'How is management billed?', a: 'A flat monthly management fee, quoted up front, plus your ad spend. The management fee covers the setup, the weekly tune-ups, the landing page, and the reporting. Your ad spend goes directly to Google on your credit card, with no markup.' },
      { q: 'Will I own the account?', a: 'Yes. Strykora builds and runs the account under your billing. If you ever leave, the account, the campaigns, and the history all stay with you.' },
      { q: 'Do you build the landing page too?', a: 'Yes. The landing page is built in-house on the same custom-built setup as your main website, with tracking that shows which clicks turn into phone calls or form fills.' },
      { q: 'How long until ads start producing leads?', a: 'Calls can start soon after the campaign goes live, depending on your budget and the competition. The first two weeks are mostly learning and tuning, and the cost per lead usually settles down after that.' },
      { q: 'Can I run ads without SEO?', a: 'Yes, but they work best together. Ads bring in calls while SEO is still building, and once the site ranks, SEO does more of the work and the ad budget can come down.' },
    ],
  },
  'ai-search-optimization': {
    howWeDoIt: [
      { step: '01', title: 'Where do you show up now?', body: 'Strykora asks ChatGPT, Perplexity, Gemini, and Google\'s AI answer the same questions your future customers ask. You get a plain-English report of where you appear, where you do not, and what the AI is recommending instead. No guessing.' },
      { step: '02', title: 'Rewrite the pages in plain answers', body: 'Strykora rewrites your key service pages to answer the exact questions buyers ask, in plain sentences an AI can quote: what you do, where, what it costs to think about, how long it takes. AI tools read the visible page, so that is where the work goes.' },
      { step: '03', title: 'Rebuild the Google profile to match', body: 'Strykora rebuilds your Google Business Profile services list so it lines up with the on-site copy. Google\'s AI answer pulls from your Business Profile, so the two have to tell the same story.' },
      { step: '04', title: 'Monthly proof', body: 'Every month you get a report showing which AI assistants named you, for which searches, and what changed since last month. If the AI stops citing you, we see it before you do.' },
    ],
    faqs: [
      { q: 'What is AI Search Optimization in plain English?', a: 'It is the work of getting your business named inside the answers that ChatGPT, Perplexity, Google\'s AI answer, and Gemini give people who ask for a recommendation. The industry calls this Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Strykora checks which businesses and sources come up when a customer asks about your service, fixes what those tools read about you, and reruns the same questions each month so you can see what changed. Nobody can guarantee an AI will name you, and answers vary from one run to the next.' },
      { q: 'How is this different from your regular SEO?', a: 'Regular SEO gets you ranked in the blue links and the map results below them. AI Search Optimization gets you named in the AI answer that now sits above both. The two overlap, and Strykora bundles AI Search Optimization into the monthly Local SEO retainer at no extra cost. The standalone audit is for businesses who already have someone else doing their regular SEO and just want help showing up in AI answers.' },
      { q: 'Why does this matter right now?', a: 'More people now ask an AI who to call. For searches like "roofer near me," Google still mostly shows the map results, so the Business Profile matters most there. AI answers show up most on question searches, like how much a new roof costs or whether gunite beats fiberglass. Being the business those answers cite puts you in front of buyers before they ever search for a company.' },
      { q: 'How do you know it worked?', a: 'Every month Strykora asks the AI assistants the same questions your customers ask, takes screenshots, and shows you when the AI named you. Hover Septic, a Strykora client, is the #1 recommendation across ChatGPT and Perplexity for "septic installs Thibodaux LA" right now. The screenshots are on the homepage.' },
      { q: 'How much is the standalone audit?', a: 'One fixed price, quoted up front, for the written audit plus 30 days of optimization. Includes the report across four AI engines, the rewrites on your key pages, the list of local sites and directories you are missing from, the Google Business Profile services rebuild, and a 30-day re-check to confirm it worked. New Strykora Local SEO clients get all of this included in their plan at no extra cost.' },
      { q: 'Will the AI keep naming me after the 30 days end?', a: 'The rewritten pages and the Business Profile rebuild keep working. The AI tools change how they answer, new competitors show up, and reviews age, so it needs ongoing attention, which is why the monthly Local SEO retainer covers it. Standalone-audit clients are welcome to re-run the sprint every quarter.' },
    ],
  },
}

/** "Local SEO" -> "local SEO", "Google Ads" stays "Google Ads": lowercase ordinary words, keep acronyms and brand names. */
function midSentence(title: string) {
  return title.split(' ').map((w) => (w === w.toUpperCase() || ['Google', 'Business', 'Profile', 'Ads', 'AI'].includes(w) ? w : w.toLowerCase())).join(' ')
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

  const relatedPosts = SERVICE_RELATED_POSTS[service.slug]

  return (
    <>
      <Schema data={[serviceSchema, ...(copy ? [buildFaqSchema(copy.faqs)] : [])]} />
      <PageHero
        eyebrow={service.eyebrow}
        title={`${service.title} in Louisiana`}
        description={service.short}
        actions
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
      />

      <section className="ledger-section service-specification" aria-labelledby="service-includes-heading">
        <div className="site-container">
          <div className="service-specification-body">
            <p className="interior-lede">{service.long}</p>
            <h2 id="service-includes-heading" className="interior-title">
              What {midSentence(service.title)} from Strykora includes
            </h2>
            <ul className="interior-ruled-list" role="list">
              {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>

          <aside className="service-terms" aria-labelledby="service-terms-label">
            <p id="service-terms-label" className="eyebrow">How it&apos;s priced</p>
            <p className="service-terms-summary">{service.priceRange}</p>
            <p className="interior-copy">
              {SERVICE_TERMS[service.slug]}
            </p>

            {availableCityLinks.length > 0 && (
              <div className="service-terms-cities">
                <p className="eyebrow">Cities</p>
                <ul className="interior-directory">
                  {availableCityLinks.map(({ city, combo }) => (
                    <li key={city.slug}>
                      <Link href={`/${combo}`} className="text-link">{city.name}, {city.state}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/contact" className="btn-conversion">Start a project</Link>
          </aside>
        </div>
      </section>

      {copy && (
        <>
          <Section
            id="how"
            className="service-process surface-dark"
            eyebrow="How it works"
            heading={`How Strykora delivers ${service.title.toLowerCase()}.`}
          >
            <ol className="service-process-list" role="list">
              {copy.howWeDoIt.map((step) => (
                <li key={step.step}>
                  <span className="service-process-number" aria-hidden="true">{step.step}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            id="service-faq"
            className="interior-faq interior-wash interior-rail"
            eyebrow="FAQ"
            heading={`${service.title} questions, honest answers.`}
          >
            <FAQAccordion items={copy.faqs} />
          </Section>
        </>
      )}

      {relatedPosts && (
        <Section id="reading" className="interior-rail interior-rule" eyebrow="From the blog" heading="Related reading.">
          <ul className="interior-link-list" role="list">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="interior-linked">
                  <h3>{post.title}</h3>
                  <p>{post.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="stack" className="interior-rail interior-rule" eyebrow="Related services" heading="Services that work well with this one.">
        <ul className="interior-link-list" role="list">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/services/${other.slug}`} className="interior-linked">
                <h3>{other.title}</h3>
                <p>{other.eyebrow}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA {...SERVICE_CTA[service.slug]} />
    </>
  )
}
