import Link from 'next/link'
import { services, cities, cityServiceCombos, site, industries, SERVICE_BY_COMBO_SLUG, ogImage } from '@/config/site'
import PageHero from './PageHero'
import Reveal from './Reveal'
import CTA from './CTA'
import { Schema, faqSchema as buildFaqSchema } from './Schema'

interface Props {
  slug: string
}

interface CityMarketCopy {
  marketContext: string
  buyerSnapshot: string
  faqs: { q: string; a: string }[]
}

/**
 * Per-combo hero description. Each entry is the city + service combination's unique angle,
 * so no two city pages read with the same templated copy above the fold.
 * Fallback (if a combo is missing here) is the generic service.short.
 */
const COMBO_HERO_DESCRIPTION: Record<string, string> = {
  'web-design-thibodaux-la': 'Thibodaux runs on word-of-mouth and proof of work. When a referral lands on your website, it has to look as legit as the recommendation. Strykora builds Thibodaux service businesses custom sites that match the work, load fast on a phone, and are owned outright by you.',
  'seo-thibodaux-la': 'Thibodaux is a smaller, denser market: fewer competitors, faster rankings, but the keyword volume per page is lower. Strykora wins by ranking you for every search a Lafourche Parish buyer might type, instead of fighting for one big keyword.',
  'digital-marketing-thibodaux-la': 'Most Thibodaux service businesses rely on Facebook for their marketing. Strykora runs your whole digital footprint instead: website, Google, ads, AI search. One operator answers the phone, not an account rep.',
  'web-design-houma-la': 'Houma buyers respond to local proof: a Terrebonne address, recent project photos along the bayou, and a phone that gets answered. Strykora builds Houma service businesses sites that load fast in the field and put the local proof above the fold.',
  'seo-houma-la': 'Houma\'s SEO market is mid-competitive: several established shops with decent rankings, most stuck on slow WordPress sites with thin content. Strykora wins by being faster, more local, and set up so Google\'s AI answer can pull your services and credentials directly.',
  'web-design-baton-rouge-la': 'Baton Rouge buyers expect a polished website. A 2018 WordPress site with a stock-photo hero does not convert in this market the way it might in a smaller town. Strykora builds Baton Rouge service businesses custom sites that match what state-capital buyers expect.',
  'seo-baton-rouge-la': 'Baton Rouge is a competitive SEO market with deep keyword volume and established competitors who have been at it for years. Strykora targets the long-tail city + service + niche combinations the bigger agencies overlook, plus the AI search angle most of them are still ignoring.',
  'digital-marketing-baton-rouge-la': 'Baton Rouge buyers run their decisions through more options before calling. Strykora runs your full digital stack (website, SEO, Google Business Profile, ads, AI search) tuned for a market where both polish and proof matter.',
  'web-design-new-orleans-la': 'New Orleans buyers compare more options before they call. Reviews, photos, and recent work matter more here than in any other Louisiana market. Strykora builds New Orleans service businesses sites that surface the proof above the fold instead of burying it in a portfolio page.',
  'web-design-lafayette-la': 'Lafayette buyers are loyal to local brands and skeptical of out-of-region operators. Strykora builds Lafayette service businesses custom sites that name Lafayette Parish, mention the Acadiana oilfield cycle, and show local proof. Built by a Louisiana operator who knows the geography.',
  'seo-lafayette-la': 'Lafayette has less keyword volume than Baton Rouge but less competition too. Strykora wins niche city + service combinations fast across Acadiana (Lafayette, Crowley, Breaux Bridge) while the broader terms compound over six to twelve months.',
}

/**
 * Per-combo meta description (150-160 chars), keyword-led and city-specific.
 * Falls back to a generated string if a combo is missing.
 */
const COMBO_META_DESCRIPTION: Record<string, string> = {
  'web-design-thibodaux-la': 'Web design in Thibodaux, LA for service businesses. Custom, fast, mobile-first sites you own outright, built to match the work and turn referrals into calls.',
  'seo-thibodaux-la': "Local SEO in Thibodaux, LA. Rank across Lafourche Parish on Google and inside ChatGPT and Google's AI answer, in a smaller market where rankings come faster.",
  'digital-marketing-thibodaux-la': 'Digital marketing in Thibodaux, LA. Website, Google, ads, and AI search run by one Louisiana operator, not an account rep. Month-to-month, no lock-in.',
  'web-design-houma-la': 'Web design in Houma, LA for service businesses. Fast, custom, mobile-first sites that put your Terrebonne Parish local proof above the fold and get calls.',
  'seo-houma-la': "Local SEO in Houma, LA. Outrank the slow WordPress shops across Terrebonne Parish on Google and inside Google's AI answer, with faster, more local pages.",
  'web-design-baton-rouge-la': 'Web design in Baton Rouge, LA for service businesses. Polished custom sites that convert state-capital buyers, load fast on a phone, and are owned by you.',
  'seo-baton-rouge-la': 'Local SEO in Baton Rouge, LA. Win the long-tail city and service searches the big agencies overlook, plus the AI search angle most of them still ignore.',
  'digital-marketing-baton-rouge-la': 'Digital marketing in Baton Rouge, LA. Website, SEO, Google Business Profile, ads, and AI search run as one stack for a market where polish and proof matter.',
  'web-design-new-orleans-la': 'Web design in New Orleans, LA for service businesses. Custom sites that surface reviews, photos, and recent work above the fold so buyers call you first.',
  'web-design-lafayette-la': 'Web design in Lafayette, LA for service businesses. Custom Acadiana sites that name Lafayette Parish, show local proof, and are built by a Louisiana operator.',
  'seo-lafayette-la': 'Local SEO in Lafayette, LA. Win niche city and service searches fast across Acadiana while broader terms compound, on Google and inside AI answers.',
}

/**
 * Per-combo long-form sections rendered between the main grid and the FAQ block.
 * Only combos that need extra depth get an entry; everything else renders unchanged.
 */
const COMBO_DEEP_DIVE: Record<string, { heading: string; paragraphs: string[] }[]> = {
  'web-design-baton-rouge-la': [
    {
      heading: 'What web design costs in Baton Rouge.',
      paragraphs: [
        'Strykora builds custom websites starting at $3,750, one time, and you own every file when it is done. Around Baton Rouge you will see quotes from a few hundred dollars for a template reskin up to five figures from the bigger downtown agencies. Most of that price gap has nothing to do with how the site looks. It comes down to what is underneath: page speed, schema markup, city pages, and whether anyone actually built the thing to rank.',
        'Be careful with the monthly bundle deals where the website is "free" and you pay a couple hundred a month forever. Read the fine print on who owns the site. In most of those arrangements, cancel the payment and the website disappears with it.',
      ],
    },
    {
      heading: 'Custom code or WordPress?',
      paragraphs: [
        'Most Baton Rouge web design companies build on WordPress, and plenty of decent sites run on it. Strykora builds custom-coded sites on Next.js instead. The difference shows up after launch. WordPress sites carry a stack of plugins that need updating and patching for security holes. A custom-coded site has none of that maintenance overhead, and it loads faster than page-builder output on the same hosting.',
        'If you already have a WordPress site that ranks, keep it and put the budget into SEO. If you are starting over anyway, there is no reason to inherit the maintenance.',
      ],
    },
    {
      heading: 'Already building for the Baton Rouge metro.',
      paragraphs: [
        'Strykora client All Out Window Tint runs locations in Gonzales and Baton Rouge, and ChatGPT has recommended them for tint work in the area. That build is documented in the case studies, screenshots included.',
        'Strykora is based in Thibodaux, about an hour from Baton Rouge, and works with metro clients over calls and shared page drafts. Two current clients are in the Baton Rouge metro already.',
      ],
    },
  ],
}

/**
 * Per-combo FAQs shown ahead of the shared city FAQs and included in FAQPage schema.
 */
const COMBO_EXTRA_FAQS: Record<string, { q: string; a: string }[]> = {
  'web-design-baton-rouge-la': [
    {
      q: 'How much does web design cost in Baton Rouge?',
      a: 'Strykora custom builds start at $3,750 one time, including copywriting, SEO structure, schema markup, and mobile testing. The site is yours when it is done. Ongoing SEO is optional at $297 a month.',
    },
    {
      q: 'Do you build WordPress sites?',
      a: 'No. Every Strykora site is custom-coded on Next.js. It loads faster than WordPress, has no plugins to maintain, and gives Google and the AI engines a cleaner page to read.',
    },
    {
      q: 'Can you meet in person in Baton Rouge?',
      a: 'Strykora is in Thibodaux, about an hour out. Most projects run entirely over phone calls and emailed drafts, and that has worked for our existing Baton Rouge metro clients. If a project needs a face-to-face, ask. It is about an hour of driving, so a sit-down is doable when it matters.',
    },
  ],
}

const CITY_COPY: Record<string, CityMarketCopy> = {
  'thibodaux-la': {
    marketContext:
      'Thibodaux is the parish seat of Lafourche, home to Nicholls State, and the commercial center of Bayou Lafourche from the sugar mills to the South Lafourche oilfield service yards. Buyers here are split between the university crowd, sugar and ag operations, and the marine and oilfield service economy that runs Highway 1.',
    buyerSnapshot:
      'Most Thibodaux buyers Google a brand name they got from a neighbor before they call. Your website is the credibility check that decides whether the call ever happens.',
    faqs: [
      {
        q: 'How is Thibodaux different from Houma or Lafayette for local SEO?',
        a: 'Thibodaux is a smaller, denser market. Fewer competitors means rankings move faster, but the keyword volume per page is lower. The play is to rank for everything (every service in every parish) instead of fighting for a single big keyword.',
      },
      {
        q: 'Do you handle Lafourche Parish service-area SEO?',
        a: 'Yes. Most Thibodaux service businesses cover Lafourche Parish from Galliano to the city. Strykora builds a Thibodaux city page plus a Lafourche Parish service area page that targets buyers in Cut Off, Larose, and the South Lafourche oilfield corridor.',
      },
      {
        q: 'Should I target Houma buyers from my Thibodaux site?',
        a: 'Only if you genuinely service Terrebonne Parish. If yes, you need a dedicated Houma city page with Terrebonne-specific copy. Listing "Houma" in your Thibodaux footer is not enough to rank there.',
      },
    ],
  },
  'houma-la': {
    marketContext:
      'Houma is the seat of Terrebonne Parish and the marine, oilfield, and seafood capital of South Louisiana. The economy runs on oilfield service, marine logistics, fabrication, and the long shadow of every hurricane that has come up the bayou since Andrew. Buyers here are price-aware, brand-loyal, and Google for service businesses constantly during storm season.',
    buyerSnapshot:
      'Houma buyers respond hardest to local proof: a Terrebonne address, a parish-specific service area, and recent project photos within their own bayou.',
    faqs: [
      {
        q: 'How competitive is the Houma SEO market?',
        a: 'Mid-competitive. Several established Houma service businesses rank decent on Google, but most are stuck on slow WordPress sites with thin content. A faster, custom-built site with a properly set up Google Business Profile usually overtakes them in 90 to 120 days.',
      },
      {
        q: 'Do I need a separate Houma site or just a Houma page?',
        a: 'A Houma page on your main site is almost always the right answer. Separate domains split your link equity and double the SEO work. The exception is multi-location operators with separate brands per market.',
      },
      {
        q: 'What about Terrebonne Parish-wide targeting?',
        a: 'Strykora builds a Houma city page plus a Terrebonne Parish service area page so you rank for buyers in Bayou Blue, Chauvin, and Dulac, not just downtown Houma.',
      },
    ],
  },
  'baton-rouge-la': {
    marketContext:
      'Baton Rouge is the state capital and Louisiana\'s second-largest market. The economy runs on state government, LSU, the petrochemical corridor along the Mississippi River, and a sprawling residential service market across East Baton Rouge, Ascension, and Livingston Parishes. SEO competition is real here, but the buyer volume is real too.',
    buyerSnapshot:
      'Buyers here check the website before they call, and they have plenty of alternatives if what they find looks dated.',
    faqs: [
      {
        q: 'How long does it take to rank in Baton Rouge?',
        a: 'Longer than smaller Louisiana markets. Expect 90 to 180 days for meaningful organic lift in Baton Rouge, faster for niche queries (specific brand installer, specific subservice) and slower for broad terms like "[service] near me".',
      },
      {
        q: 'Should I target Ascension and Livingston Parishes from my Baton Rouge site?',
        a: 'Yes, with dedicated city pages for Gonzales, Prairieville, Denham Springs, and Walker if you service them. East Baton Rouge alone leaves Ascension and Livingston traffic on the table.',
      },
      {
        q: 'Is the Baton Rouge SEO market saturated?',
        a: 'For broad keywords, yes. For specific service plus city plus niche combinations, no. Strykora targets the long-tail combinations that established Baton Rouge agencies overlook.',
      },
      {
        q: 'How does Baton Rouge differ from a New Orleans market entry?',
        a: 'Baton Rouge is less competitive than New Orleans for most local service categories and rewards consistent local content. New Orleans rewards aggressive link building and review velocity. The cost to rank is meaningfully lower in Baton Rouge.',
      },
    ],
  },
  'new-orleans-la': {
    marketContext:
      'New Orleans is the largest, oldest, and most competitive market in Louisiana. The economy spans tourism, port logistics, healthcare, construction, and a dense residential service market across Orleans, Jefferson, and St. Tammany Parishes. Local SEO here rewards aggressive review velocity, strong link building, and substantive content.',
    buyerSnapshot:
      'New Orleans buyers vet you against more options. Reviews, photos, and recent work matter more here than in any other Louisiana market.',
    faqs: [
      {
        q: 'Can a Thibodaux-based agency rank a New Orleans business?',
        a: 'Yes. SEO is location-agnostic on the agency side. Strykora ranks New Orleans businesses by building city-specific content for Orleans, Jefferson, and St. Tammany Parishes, optimizing your GBP for the Orleans market, and pursuing local link partnerships.',
      },
      {
        q: 'How competitive is New Orleans for local service SEO?',
        a: 'High. Established New Orleans service businesses have been investing in SEO for years. Strykora wins by being faster than them on a phone, set up so Google\'s AI answer can pull from your site, and having more depth (more pages, more FAQs, more New Orleans-specific content).',
      },
      {
        q: 'How long until I see leads from New Orleans SEO?',
        a: 'Plan for 120 to 240 days for meaningful organic lift in New Orleans. Pairing SEO with Google Ads is usually worth it here to fill the gap while SEO compounds.',
      },
    ],
  },
  'lafayette-la': {
    marketContext:
      'Lafayette is the heart of Acadiana and a service economy anchored by oilfield, healthcare, and agriculture. Buyers here are loyal to local brands and skeptical of out-of-region operators. The SERP is moderately competitive, with several established Acadiana agencies and a number of national lead-gen sites farming local queries.',
    buyerSnapshot:
      'Lafayette buyers want a Louisiana operator who understands the local economy. A site that names Lafayette Parish, mentions the oilfield cycle, and shows local proof converts better than a generic agency build.',
    faqs: [
      {
        q: 'Do Lafayette buyers prefer Acadiana-based agencies?',
        a: 'They do, but proof beats geography. Strykora is built in Thibodaux but ranks Lafayette businesses for the keywords that matter, with case studies that show the work.',
      },
      {
        q: 'How does Lafayette differ from Baton Rouge for SEO?',
        a: 'Lafayette has less keyword volume than Baton Rouge but less competition too. Niche keywords (specific service plus Lafayette Parish) rank fast. Broad keywords are slower but achievable.',
      },
      {
        q: 'Do you target Acadia and St. Martin Parishes from Lafayette?',
        a: 'Yes, when you service them. Strykora builds a Lafayette city page plus parish service area pages so you rank in Crowley, Breaux Bridge, and the surrounding Acadiana parishes.',
      },
    ],
  },
}

export default function CityServicePage({ slug }: Props) {
  const combo = cityServiceCombos.find((c) => c.slug === slug)
  if (!combo) return null

  const serviceKey = SERVICE_BY_COMBO_SLUG[combo.service] ?? combo.service
  const service = services.find((s) => s.slug === serviceKey)
  const city = cities.find((c) => c.slug === combo.citySlug)
  if (!service || !city) return null

  const cityCopy = CITY_COPY[city.slug]
  const otherCombos = cityServiceCombos.filter((c) => c.citySlug === city.slug && c.slug !== slug)
  const otherCities = cityServiceCombos.filter(
    (c) => SERVICE_BY_COMBO_SLUG[c.service] === service.slug && c.citySlug !== city.slug
  )

  const title = `${service.title} in ${city.name}, ${city.state}`

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: service.long,
      provider: { '@id': `${site.url}/#business` },
      areaServed: {
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'AdministrativeArea', name: city.parish },
      },
      serviceType: service.title,
      url: `${site.url}/${slug}`,
      offers: {
        '@type': 'Offer',
        description: service.priceRange,
        priceCurrency: 'USD',
      },
    },
  ]
  const pageFaqs = [...(COMBO_EXTRA_FAQS[slug] ?? []), ...(cityCopy?.faqs ?? [])]
  if (pageFaqs.length > 0) {
    schemas.push(buildFaqSchema(pageFaqs))
  }

  return (
    <>
      <Schema data={schemas} />
      <PageHero
        eyebrow={`${city.name}, ${city.state}`}
        title={title}
        description={COMBO_HERO_DESCRIPTION[slug] ?? `${service.short} Built for ${city.name} businesses by an operator in ${site.address.city}.`}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: `/${slug}`, label: title },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <h2 className="text-display-md font-display text-text mb-6 text-balance">
                Why hire Strykora for {service.title.toLowerCase()} in {city.name}?
              </h2>
              {cityCopy ? (
                <>
                  <p className="text-text-muted leading-relaxed mb-4">{cityCopy.marketContext}</p>
                  <p className="text-text-muted leading-relaxed mb-6">
                    {cityCopy.buyerSnapshot} Strykora ships a faster, more local, more credible answer, owned outright by you. <span className="text-text">{service.priceRange}</span>
                  </p>
                </>
              ) : (
                <p className="text-text-muted leading-relaxed mb-6">
                  Strykora ships a faster, more local, more credible {service.title.toLowerCase()} answer for {city.name} buyers, owned outright by you. <span className="text-text">{service.priceRange}</span>
                </p>
              )}
              <ul className="space-y-3">
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

            <Reveal>
              <h2 className="text-2xl md:text-3xl font-display text-text mb-4">Industries Strykora serves in {city.name}.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((i) => (
                  <Link key={i.slug} href={`/industries/${i.slug}`} className="card group flex items-center justify-between text-sm">
                    <span className="text-text">{i.title}</span>
                    <svg className="w-4 h-4 text-text-dim group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="card p-6 lg:sticky lg:top-28 space-y-6">
                <div>
                  <p className="eyebrow mb-3">Local snapshot</p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-text-dim">City</dt><dd className="text-text">{city.name}, {city.state}</dd></div>
                    <div className="flex justify-between"><dt className="text-text-dim">Parish</dt><dd className="text-text">{city.parish}</dd></div>
                    <div className="flex justify-between"><dt className="text-text-dim">Service</dt><dd className="text-text">{service.title}</dd></div>
                    <div className="flex justify-between"><dt className="text-text-dim">Pricing</dt><dd className="text-text text-right">{service.priceRange}</dd></div>
                    <div className="flex justify-between"><dt className="text-text-dim">Ownership</dt><dd className="text-text">Yours</dd></div>
                  </dl>
                </div>

                {otherCombos.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Other services in {city.name}</p>
                    <ul className="space-y-2">
                      {otherCombos.map((o) => (
                        <li key={o.slug}>
                          <Link href={`/${o.slug}`} className="text-sm text-text-muted hover:text-text transition-colors">
                            {services.find((s) => s.slug === (SERVICE_BY_COMBO_SLUG[o.service] ?? o.service))?.title} in {o.cityName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link href="/contact" className="btn-primary w-full justify-center">Start a project</Link>
                <a href={`tel:${site.phoneRaw}`} className="btn-secondary w-full justify-center">Call {site.phoneDisplay}</a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {COMBO_DEEP_DIVE[slug] && (
        <section className="section-padding border-t border-border" aria-label={`More about ${service.title.toLowerCase()} in ${city.name}`}>
          <div className="container-narrow space-y-12">
            {COMBO_DEEP_DIVE[slug].map((sec) => (
              <Reveal key={sec.heading}>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-4 text-balance">{sec.heading}</h2>
                <div className="space-y-4">
                  {sec.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="text-text-muted leading-relaxed">{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {pageFaqs.length > 0 && (
        <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="city-faq-heading">
          <div className="container-narrow">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 id="city-faq-heading" className="text-display-md font-display text-text text-balance">
                {service.title} in {city.name}: common questions.
              </h2>
            </Reveal>
            <div className="space-y-3">
              {pageFaqs.map((f) => (
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

      {otherCities.length > 0 && (
        <section className="section-padding border-t border-border">
          <div className="container-wide">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">Also serving</p>
              <h2 className="text-display-md font-display text-text">{service.title} in other Louisiana cities.</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherCities.map((o) => (
                <Reveal key={o.slug}>
                  <Link href={`/${o.slug}`} className="card group flex items-center justify-between">
                    <span className="text-text">{o.cityName}, LA</span>
                    <svg className="w-4 h-4 text-text-dim group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA heading={`Ready for ${service.title.toLowerCase()} that actually ranks in ${city.name}?`} />
    </>
  )
}

export function buildMetadata(slug: string) {
  const combo = cityServiceCombos.find((c) => c.slug === slug)
  if (!combo) return {}
  const serviceKey = SERVICE_BY_COMBO_SLUG[combo.service] ?? combo.service
  const service = services.find((s) => s.slug === serviceKey)
  const city = cities.find((c) => c.slug === combo.citySlug)
  if (!service || !city) return {}
  const title = `${service.title} in ${city.name}, ${city.state}`
  const description =
    COMBO_META_DESCRIPTION[slug] ??
    `${service.title} in ${city.name}, ${city.state} for service businesses. ${service.short.slice(0, 100)}`
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/${slug}` },
    openGraph: { title, description, url: `${site.url}/${slug}`, images: [ogImage] },
  }
}
