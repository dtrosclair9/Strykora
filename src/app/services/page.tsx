import type { Metadata } from 'next'
import Link from 'next/link'
import { services, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Four services built to stack: custom web design from $3,750, local SEO from $297/month, Google Business Profile optimization, and Google Ads management.',
  alternates: { canonical: `${site.url}/services` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Strykora services',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${site.url}/services/${s.slug}`,
    name: s.title,
  })),
}

export default function ServicesPage() {
  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Services"
        title="Built to stack."
        description="Four services. Web design leads, SEO compounds on top of it, Google Business Profile grabs the local pack, ads fill the gap while SEO catches up."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <Link href={`/services/${s.slug}`} className="card-feature group block h-full p-8">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim font-mono mb-3">
                    0{s.priority} · {s.eyebrow}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-display text-text mb-3 text-balance">{s.title}</h2>
                  <p className="text-text-muted leading-relaxed mb-5">{s.long}</p>
                  <ul className="space-y-2 mb-6">
                    {s.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-text-muted">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-text-dim font-mono">{s.priceRange}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                      See {s.title.toLowerCase()}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
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
