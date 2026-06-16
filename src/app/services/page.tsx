import type { Metadata } from 'next'
import Link from 'next/link'
import { services, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Services — Web Design, SEO, Google Ads',
  description:
    'Four services built to stack: custom web design, local SEO, Google Business Profile optimization, and Google Ads for Louisiana businesses.',
  alternates: { canonical: `${site.url}/services` },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Built to stack."
        description="Four services. Web design leads, SEO compounds on top of it, GBP grabs the local pack, ads fill the gap while SEO catches up."
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
                  <p className="text-text-muted leading-relaxed mb-6">{s.long}</p>
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
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                    See {s.title.toLowerCase()}
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

      <CTA />
    </>
  )
}
