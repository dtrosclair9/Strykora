import type { Metadata } from 'next'
import Link from 'next/link'
import { industries, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Industries Served — Louisiana Web Design & SEO',
  description:
    'Custom websites and local SEO for Louisiana roofers, contractors, home services, auto shops, and commercial marine and oil & gas operators. Five lanes, deep playbooks, live case studies.',
  alternates: { canonical: `${site.url}/industries` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Strykora industries served',
  itemListElement: industries.map((i, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `${site.url}/industries/${i.slug}`,
    name: i.title,
  })),
}

export default function IndustriesPage() {
  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Industries"
        title="Built for Louisiana service and commercial businesses."
        description="Generic agencies sell the same package to a roofer, a SaaS startup, and a law firm. Strykora picks lanes and goes deep. These are the verticals Strykora knows cold, and where the case studies prove the model works."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/industries', label: 'Industries' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <Reveal className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">Why these five</p>
            <h2 className="text-display-md font-display text-text text-balance mb-5">
              Picked on purpose. Each one earned a slot.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              The lanes below share three things: a high-ticket transaction (so a small lift in rank pays for the whole site), a buyer who searches before they call, and a competitive set Strykora has already beaten in production. Every vertical on this page has a live, ranking Strykora build behind it, not a deck slide.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((i) => (
              <Reveal key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="card-feature group block h-full p-8">
                  {'flagship' in i && i.flagship && (
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-mono mb-3">Flagship</p>
                  )}
                  <h2 className="text-2xl font-display text-text mb-3">{i.headline}</h2>
                  <p className="text-text-muted leading-relaxed mb-6">{i.short}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                    See approach
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-elevated border-y border-border">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">Discipline</p>
            <h2 className="text-display-md font-display text-text text-balance">
              What Strykora will not take on.
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              Saying no is the whole reason the case studies work. A vertical only earns a slot once the playbook is repeatable, the buyer journey is understood, and the schema and content patterns are dialed in. Until then, the answer is no, and a referral.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Restaurants and retail', body: 'Foot-traffic businesses ranked by visual social and review velocity. Different game.' },
              { title: 'Medical and legal', body: 'Regulated copy, HIPAA, compliance review cycles. Specialist territory.' },
              { title: 'National e-commerce', body: 'Shopify experts and paid-media shops already crush this. Not the Strykora edge.' },
              { title: 'Out-of-state clients', body: 'Strykora is Louisiana-only. Local market knowledge is half the product.' },
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="card p-6 h-full">
                  <p className="font-display text-text text-lg mb-2">{item.title}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
