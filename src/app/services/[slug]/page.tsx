import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, site, cities } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const title = `${service.title} — Louisiana`
  const description = service.long.slice(0, 158)
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: { title, description, url: `${site.url}/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.long,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'State', name: 'Louisiana' },
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
  }

  return (
    <>
      <Schema data={schema} />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
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
                <p className="eyebrow mb-3">Where we deliver this</p>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {service.title} for Louisiana businesses statewide. Strongest in:
                </p>
                <ul className="space-y-2 mb-6">
                  {cities.slice(0, 5).map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${service.slug}-${c.slug}`} className="text-sm text-text-muted hover:text-text transition-colors flex items-center justify-between">
                        <span>{c.name}, {c.state}</span>
                        <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary w-full justify-center">Start a project</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <Reveal className="mb-12">
            <p className="eyebrow mb-3">Stack it with</p>
            <h2 className="text-display-md font-display text-text">Other services that compound.</h2>
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
