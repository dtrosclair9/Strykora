import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import CaseMetrics from '@/components/CaseMetrics'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'
import '../editorial.css'

export const metadata: Metadata = {
  title: 'Case Studies — Louisiana Web Design & SEO Wins',
  description:
    'Real Louisiana businesses Strykora built sites and SEO for: roofers, auto shops, and window tinters. The work, the rankings, and the numbers behind each.',
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
  'foret-construction': 'Aerial photo of a completed shingle roof replacement by Foret Construction in Raceland, Louisiana.',
  'elite-custom-automotive': 'Lifted red GMC built by Elite Custom Automotive, photographed outside their Lockport shop.',
  'all-out-window-tint': 'Orange Corvette with the doors up, photographed inside the All Out Window Tint shop.',
  'hover-septic': 'Screenshot of hoverseptic.com, the Strykora-built website for Hover Septic in Thibodaux, Louisiana.',
  'acadia-pools': 'Completed inground pool and patio built by Acadia Pools in Thibodaux, Louisiana.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Schema data={itemListSchema} />
      <PageHero
        eyebrow="Case studies"
        title="Louisiana web design and SEO case studies."
        description="Strykora doesn't fabricate testimonials. Real Louisiana clients, what got built, and what changed."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/case-studies', label: 'Case Studies' },
        ]}
      />

      <section className="work-index ledger-section site-container">
        {caseStudies.map((c, index) => (
          <article key={c.slug} className={index === 0 ? 'work-entry work-entry-feature' : 'work-entry'}>
            <Link href={`/case-studies/${c.slug}`} className="work-entry-link">
              <div className="work-entry-media">
                <Image
                  src={c.cover}
                  alt={COVER_ALT[c.slug] ?? `${c.client} project cover`}
                  fill
                  sizes={index === 0
                    ? '(min-width: 1400px) 690px, (min-width: 1024px) 49vw, 92vw'
                    : '(min-width: 1400px) 380px, (min-width: 1024px) 27vw, 92vw'}
                />
              </div>
              <div className="work-entry-copy">
                <p className="eyebrow">{c.client} · {c.industry} · {c.city}</p>
                <h2>{c.headline}</h2>
                <p className="editorial-copy">{c.blurb}</p>
                <span className="text-link">Read case study</span>
              </div>
              <CaseMetrics metrics={c.metrics} />
            </Link>
          </article>
        ))}
      </section>

      <CTA />
    </>
  )
}
