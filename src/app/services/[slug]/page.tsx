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

const SERVICE_HERO_IMAGE: Record<string, { src: string; alt: string }> = {
  'web-design': {
    src: '/images/hero-service-web-design.jpg',
    alt: 'Abstract glowing code editor and UI components on glass, the kind of custom-built web design Strykora ships.',
  },
  'seo': {
    src: '/images/hero-service-seo.jpg',
    alt: 'Abstract glowing ascending line graph and upward arrow, representing local SEO ranking growth for Louisiana businesses.',
  },
  'google-business-profile': {
    src: '/images/hero-service-gbp.jpg',
    alt: 'Glowing 3D map pin over a digital city grid, representing Google Business Profile optimization for the local pack.',
  },
  'google-ads': {
    src: '/images/hero-service-ads.jpg',
    alt: 'Light streaks racing toward a target point in deep obsidian space, representing high-intent Google Ads traffic.',
  },
  'ai-search-optimization': {
    src: '/images/hero-service-ai-search.jpg',
    alt: 'Glowing electric blue glass quotation mark icon floating in deep navy space surrounded by a constellation of satellite nodes connected by geometric threads, representing AI search citation for Louisiana businesses inside ChatGPT and Perplexity answers.',
  },
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
      { q: 'How much does a custom website cost?', a: 'Custom websites start at $3,750 one-time, depending on how many pages and how much custom work. Every quote is a fixed price up front. No hourly billing, no surprise invoices.' },
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
      { step: '03', title: 'Fix the site', body: 'Strykora updates your page titles, search-engine code (called schema), internal links, and adds FAQ sections that compound over time. Most of this happens in the first 30 days.' },
      { step: '04', title: 'Monthly retainer', body: 'New content, new links, weekly Google Business Profile posts, and a plain-English report every month. You see every move in a shared dashboard.' },
    ],
    faqs: [
      { q: 'How much does Strykora SEO cost?', a: 'Local SEO retainers start at $297 a month with no long-term contract. Larger multi-city or multi-location operators get a custom quote.' },
      { q: 'How long until I see rankings move?', a: 'Expect real movement in 60 to 120 days for a new site. Faster for sites that already have some history with Google. Slower in brutally competitive markets like Baton Rouge legal or New Orleans plumbing.' },
      { q: 'Does this work if my site is on Wix, Squarespace, or WordPress?', a: 'Yes. The SEO retainer works on whatever platform your site is on. But if your current site is slow or hard to update, Strykora will tell you up front when a rebuild would beat six months of SEO on a broken foundation.' },
      { q: 'What is included in the monthly retainer?', a: 'Two new content pages per month, on-page updates, Google Business Profile posts and photos, cleaning up your business listings across the web, building links from other Louisiana sites, and a monthly report with rankings, traffic, and leads.' },
      { q: 'Do you build backlinks?', a: 'Yes, the honest way. Strykora gets your business listed on directories that matter, partners with adjacent Louisiana businesses, and earns mentions on real websites. No private blog networks, no link farms.' },
      { q: 'How do you measure success?', a: 'Booked leads. Phone calls. Form submissions. Plus tracked ranking positions for the keywords that pay your bills. Vanity rankings on keywords no one searches for do not count.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No long-term contracts. Strykora retainers are month-to-month.' },
    ],
  },
  'google-business-profile': {
    howWeDoIt: [
      { step: '01', title: 'Clean up what is wrong', body: 'Strykora fixes incorrect business categories, mismatched addresses or phone numbers, and old duplicate listings on Google that are dragging your map ranking down.' },
      { step: '02', title: 'Build the profile out', body: 'Every service, every photo, every section gets written for both the map results and Google\'s AI answer. The profile looks legit because it is.' },
      { step: '03', title: 'Weekly activity', body: 'Posts, photos, review request follow-ups, and answering questions on your profile every week. An active profile is the single biggest signal Google uses to rank you locally.' },
      { step: '04', title: 'Monthly report', body: 'Plain-English numbers every month: views, calls, direction requests, what people searched to find you, and how your ranking moved.' },
    ],
    faqs: [
      { q: 'Can I get just Google Business Profile help without the SEO retainer?', a: 'No. Profile work and SEO are the same job done two places, so they are bundled into the monthly Local SEO retainer. Strykora does not sell the Google Business Profile as a standalone monthly service.' },
      { q: 'Will you respond to my reviews?', a: 'Strykora drafts the response for every review and sends it to you to approve. Your brand voice stays consistent and no review slips through unanswered.' },
      { q: 'What if I have more than one location?', a: 'Each location gets its own profile with shared brand assets and location-specific content. All Out Window Tint runs two locations this way (Gonzales and Baton Rouge), each with its own lead routing.' },
      { q: 'How does the Google Business Profile help with the AI answer at the top of Google?', a: 'Google\'s AI answer pulls heavily from your Business Profile when picking who to recommend. Done right, your services list, posts, and photos feed straight into whether the AI names you.' },
      { q: 'How quickly will my map ranking move?', a: 'Profiles with weekly posts, fresh photos, and a steady stream of new reviews usually start moving up the map results in 30 to 60 days.' },
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
      { q: 'How is management billed?', a: 'Management starts at $500 a month plus your ad spend. The management fee covers the setup, the weekly tune-ups, the landing page, and the reporting. Your ad spend goes directly to Google on your credit card, with no markup.' },
      { q: 'Will I own the account?', a: 'Yes. Strykora builds and runs the account under your billing. If you ever leave, the account, the campaigns, and the history all stay with you.' },
      { q: 'Do you build the landing page too?', a: 'Yes. The landing page is built in-house on the same custom-built setup as your main website, with tracking that shows which clicks turn into phone calls or form fills.' },
      { q: 'How long until ads start producing leads?', a: 'Leads usually start in week one. The first two weeks are learning and tuning. Expect the cost per lead to stabilize and trend down in weeks three and four.' },
      { q: 'Can I run ads without SEO?', a: 'Yes, but they work best together. Ads cover the gap while SEO is still building. SEO carries the load once it ranks. Stacking both compounds the results.' },
    ],
  },
  'ai-search-optimization': {
    howWeDoIt: [
      { step: '01', title: 'Where do you show up now?', body: 'Strykora asks ChatGPT, Perplexity, Gemini, and Google\'s AI answer the same questions your future customers ask. You get a plain-English report of where you appear, where you do not, and what the AI is recommending instead. No guessing.' },
      { step: '02', title: 'Rewrite the site so AI can quote it', body: 'Strykora rewrites your key service pages to answer the exact questions buyers ask. Then we add the behind-the-scenes code (the industry calls it schema and llms.txt) that AI search engines look for when picking who to recommend. You never see it; the AI does.' },
      { step: '03', title: 'Rebuild the Google profile to match', body: 'Strykora rebuilds your Google Business Profile services list so it lines up with the on-site copy. Google\'s AI answer pulls from your Business Profile, so the two have to tell the same story.' },
      { step: '04', title: 'Monthly proof', body: 'Every month you get a report showing which AI assistants named you, for which searches, and what changed since last month. If the AI stops citing you, we see it before you do.' },
    ],
    faqs: [
      { q: 'What is AI Search Optimization in plain English?', a: 'It is the work of getting your business named inside the answers that ChatGPT, Perplexity, Google\'s AI answer, and Gemini give people who ask for a recommendation. The industry calls this Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Different names, same outcome: when a customer asks an AI assistant who they should call, the AI says your name.' },
      { q: 'How is this different from your regular SEO?', a: 'Regular SEO gets you ranked in the blue links and the map results below them. AI Search Optimization gets you named in the AI answer that now sits above both. The two overlap, and Strykora bundles AI Search Optimization into the monthly Local SEO retainer at no extra cost. The standalone audit is for businesses who already have someone else doing their regular SEO and just want help showing up in AI answers.' },
      { q: 'Why does this matter right now?', a: 'When Google shows an AI answer above the regular search results, clicks on the regular results drop 58%. Google\'s AI answer reaches over a billion people a month. And almost no Louisiana competitor is set up to show up there yet. The opening is real and the window is small.' },
      { q: 'How do you know it worked?', a: 'Every month Strykora asks the AI assistants the same questions your customers ask, takes screenshots, and shows you when the AI named you. Hover Septic, a Strykora client, is the #1 recommendation across ChatGPT and Perplexity for "septic installs Thibodaux LA" right now. The screenshots are on the homepage.' },
      { q: 'How much is the standalone audit?', a: 'A fixed $1,997 for the written audit plus 30 days of optimization. Includes the report across four AI engines, the rewrites on your key pages, the schema and llms.txt setup, the Google Business Profile services rebuild, and a 30-day re-check to confirm it worked. New Strykora Local SEO clients get all of this bundled into the $297-a-month retainer at no extra cost.' },
      { q: 'Will the AI keep naming me after the 30 days end?', a: 'The structural work (schema, llms.txt, the FAQ blocks, the Business Profile rebuild) keeps working. The content side needs ongoing tune-ups because the AI engines change their rules, which is why the monthly Local SEO retainer covers ongoing maintenance. Standalone-audit clients are welcome to re-run the sprint every quarter.' },
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

  const heroImg = SERVICE_HERO_IMAGE[service.slug]

  return (
    <>
      <Schema data={[serviceSchema, ...(copy ? [buildFaqSchema(copy.faqs)] : [])]} />
      <PageHero
        eyebrow={service.eyebrow}
        title={`${service.title} in Louisiana`}
        description={service.long}
        bgImage={heroImg?.src}
        bgImageAlt={heroImg?.alt}
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
                  Fixed price up front. No hourly billing. No 12-month contract. No monthly platform tax stacked on top.
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
