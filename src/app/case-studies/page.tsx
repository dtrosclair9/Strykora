import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Case Studies — Real Louisiana Builds',
  description: 'Real Louisiana businesses we\'ve built sites and SEO for. Roofers, auto shops, window tinters — the work and the numbers behind it.',
  alternates: { canonical: `${site.url}/case-studies` },
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="The work, with receipts."
        description="We don\'t fabricate testimonials. Here\'s real Louisiana clients we\'ve shipped for — what we built, what changed, and what it cost."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/case-studies', label: 'Case Studies' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide space-y-6">
          {caseStudies.map((c) => (
            <Reveal key={c.slug}>
              <Link href={`/case-studies/${c.slug}`} className="card-feature group block p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-mono mb-3">
                      {c.client} · {c.industry} · {c.city}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display text-text mb-3 text-balance">{c.headline}</h2>
                    <p className="text-text-muted leading-relaxed">{c.blurb}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all mt-5">
                      Read case study
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                  <div className="lg:col-span-4 grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="bg-bg p-4 text-center">
                        <p className="font-display text-xl md:text-2xl gradient-text">{m.value}</p>
                        <p className="text-[10px] uppercase tracking-wider text-text-dim mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
