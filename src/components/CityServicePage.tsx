import Link from 'next/link'
import { services, cities, cityServiceCombos, site, industries } from '@/config/site'
import PageHero from './PageHero'
import Reveal from './Reveal'
import CTA from './CTA'
import { Schema } from './Schema'

interface Props {
  slug: string
}

const SERVICE_BY_SLUG: Record<string, (typeof services)[number]['slug']> = {
  'web-design': 'web-design',
  'seo': 'seo',
  'digital-marketing': 'seo',
  'advertising': 'google-ads',
  'google-ads': 'google-ads',
  'google-business-profile': 'google-business-profile',
}

export default function CityServicePage({ slug }: Props) {
  const combo = cityServiceCombos.find((c) => c.slug === slug)
  if (!combo) return null

  const serviceKey = SERVICE_BY_SLUG[combo.service] ?? combo.service
  const service = services.find((s) => s.slug === serviceKey)
  const city = cities.find((c) => c.slug === combo.citySlug)
  if (!service || !city) return null

  const otherCombos = cityServiceCombos.filter((c) => c.citySlug === city.slug && c.slug !== slug)
  const otherCities = cityServiceCombos.filter((c) => c.service === combo.service && c.citySlug !== city.slug)

  const title = `${service.title} in ${city.name}, ${city.state}`

  const schema = [
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: title, item: `${site.url}/${slug}` },
      ],
    },
  ]

  return (
    <>
      <Schema data={schema} />
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
                Why hire {site.name} for {service.title.toLowerCase()} in {city.name}?
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {city.name} is in {city.parish}, and the buyers who type &quot;{service.title.toLowerCase()} {city.name}&quot; into Google
                are ready to spend. The problem is the SERP is crowded with generic agencies, national lead-gen sites,
                and slow WordPress builds. {site.name} ships a faster, more local, more credible answer.
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

            <Reveal>
              <h2 className="text-2xl md:text-3xl font-display text-text mb-4">What this looks like in {city.name}.</h2>
              <p className="text-text-muted leading-relaxed">
                Every {site.name} {city.name} project starts with the same questions: which keywords actually
                drive revenue in this market, which competitor pages are beatable, and what does the buyer
                journey look like for businesses in {city.parish}? The answers shape the build before a
                single line of code is written.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl md:text-3xl font-display text-text mb-4">Industries we serve in {city.name}.</h2>
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
                    <div className="flex justify-between"><dt className="text-text-dim">Stack</dt><dd className="text-text">Next.js + Vercel</dd></div>
                  </dl>
                </div>

                {otherCombos.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Other services in {city.name}</p>
                    <ul className="space-y-2">
                      {otherCombos.map((o) => (
                        <li key={o.slug}>
                          <Link href={`/${o.slug}`} className="text-sm text-text-muted hover:text-text transition-colors">
                            {services.find((s) => s.slug === (SERVICE_BY_SLUG[o.service] ?? o.service))?.title} in {o.cityName}
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

      {otherCities.length > 0 && (
        <section className="section-padding border-t border-border bg-bg-elevated">
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
  const serviceKey = SERVICE_BY_SLUG[combo.service] ?? combo.service
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
