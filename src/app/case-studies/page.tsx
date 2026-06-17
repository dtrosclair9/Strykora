import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Case Studies — Louisiana Web Design & SEO Wins',
  description:
    'Real Louisiana businesses Strykora has built sites and SEO for. Roofers, auto shops, window tinters, and septic installers. The work, the rankings, and the numbers behind each one.',
  alternates: { canonical: `${site.url}/case-studies` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Strykora case studies',
  itemListElement: caseStudies.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${site.url}/case-studies/${c.slug}`,
    name: c.client,
  })),
}

const COVER_ALT: Record<string, string> = {
  'foret-construction': 'New metal roof installation at golden hour, the kind of FORTIFIED-certified work Foret Construction is built around.',
  'elite-custom-automotive': 'Aggressive mud-terrain tire on a lifted truck, the kind of BDS suspension build Elite Custom Automotive is known for.',
  'all-out-window-tint': 'Black luxury car with heavily tinted windows at golden hour, the kind of tint installation All Out Window Tint specializes in.',
  'hover-septic': 'Heavy excavator at dusk on a rural Louisiana installation site, the kind of work Hover Septic delivers in Thibodaux and Lafourche Parish.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Case studies"
        title="The work, with receipts."
        description="Strykora doesn't fabricate testimonials. Real Louisiana clients, what got built, what changed, and what it cost."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/case-studies', label: 'Case Studies' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide space-y-6">
          {caseStudies.map((c) => (
            <Reveal key={c.slug}>
              <Link href={`/case-studies/${c.slug}`} className="card-feature group block overflow-hidden !p-0">
                <div className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src={c.cover}
                    alt={COVER_ALT[c.slug] ?? `${c.client} project cover`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 md:p-10">
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
