import Link from 'next/link'
import { services, cities, cityServiceCombos, site, industries, SERVICE_BY_COMBO_SLUG } from '@/config/site'
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
        a: 'Mid-competitive. There are several established Houma service businesses with decent SEO, but most are stuck on slow WordPress builds with thin content. A well-built modern site with proper schema and a real GBP overtakes them in 90 to 120 days.',
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
      'Baton Rouge buyers expect a polished website. A 2018 WordPress site with a stock-photo hero does not convert in this market the way it might in a smaller town.',
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
        a: 'High. Established New Orleans service businesses have been investing in SEO for years. Strykora\'s play is to outrank them on speed (Core Web Vitals), schema (AI Overview citation), and depth (more pages, more FAQs, more localized content).',
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
  if (cityCopy) {
    schemas.push(buildFaqSchema(cityCopy.faqs))
  }

  return (
    <>
      <Schema data={schemas} />
      <PageHero
        eyebrow={`${city.name}, ${city.state}`}
        title={title}
        description={`${service.long} Built for ${city.name} businesses by an operator in ${site.address.city}.`}
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
              <p className="text-text-muted leading-relaxed mb-6">
                {city.name} is in {city.parish}, and the buyers who type &quot;{service.title.toLowerCase()} {city.name}&quot; into Google
                are ready to spend. The problem: the SERP is crowded with generic agencies, national lead-gen sites,
                and slow WordPress builds. Strykora ships a faster, more local, more credible answer, with pricing
                that starts at <span className="text-text">{service.priceRange}</span>
              </p>
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

            {cityCopy && (
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-display text-text mb-4">The {city.name} market.</h2>
                <p className="text-text-muted leading-relaxed mb-4">{cityCopy.marketContext}</p>
                <p className="text-text-muted leading-relaxed">{cityCopy.buyerSnapshot}</p>
              </Reveal>
            )}

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

      {cityCopy && (
        <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="city-faq-heading">
          <div className="container-narrow">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 id="city-faq-heading" className="text-display-md font-display text-text text-balance">
                {service.title} in {city.name}: common questions.
              </h2>
            </Reveal>
            <div className="space-y-3">
              {cityCopy.faqs.map((f) => (
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
  const description = `${service.title} for ${city.name}, ${city.state} businesses. ${service.short.slice(0, 110)}`
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/${slug}` },
    openGraph: { title, description, url: `${site.url}/${slug}` },
  }
}
