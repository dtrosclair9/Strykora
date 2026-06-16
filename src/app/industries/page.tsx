import type { Metadata } from 'next'
import Link from 'next/link'
import { industries, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Industries — Web Design & SEO',
  description:
    'Websites and SEO for Louisiana roofers, contractors, home service businesses, and auto shops. Built by an operator who knows how these businesses run.',
  alternates: { canonical: `${site.url}/industries` },
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for Louisiana service businesses."
        description="We don't take every client. These are the verticals we know cold — and where our case studies prove the model works."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/industries', label: 'Industries' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide">
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

      <CTA />
    </>
  )
}
