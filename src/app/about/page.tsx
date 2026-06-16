import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: `About — ${site.owner}`,
  description: `${site.name} is built and run by ${site.owner} out of ${site.address.city}, LA. Web design and SEO for Louisiana businesses, no layers between you and the work.`,
  alternates: { canonical: `${site.url}/about` },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${site.url}/about`,
  mainEntity: {
    '@type': 'Person',
    name: site.owner,
    jobTitle: 'Founder & Lead Developer',
    worksFor: { '@id': `${site.url}/#business` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.city,
      addressRegion: site.address.state,
    },
  },
}

export default function AboutPage() {
  return (
    <>
      <Schema data={schema} />
      <PageHero
        eyebrow="About"
        title="One operator. South Louisiana. No layers."
        description={`I'm ${site.owner}. I build the websites and run the SEO for every ${site.name} client out of ${site.address.city}.`}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow space-y-8 text-lg text-text-muted leading-relaxed">
          <Reveal as="p">
            Most marketing agencies sell you a sales rep, then hand the actual work to a project manager
            who hands it to a junior contractor who hands it to a template. By the time your site goes live,
            nobody on the team has met you and the result looks like every other site they built that month.
          </Reveal>
          <Reveal as="p">
            {site.name} is built differently. I take a small number of Louisiana clients each year, build every
            site by hand in Next.js, and handle the SEO myself. No account managers, no offshore subcontractors,
            no Wix templates with your logo on them.
          </Reveal>
          <Reveal as="p">
            The stack I use (Next.js, Tailwind, Vercel) is the same stack agencies in San Francisco and New
            York charge $30–60K to deploy. I run it from {site.address.city} and price it for Louisiana service
            businesses. You get an enterprise build for a small business budget, owned outright.
          </Reveal>
          <Reveal as="p" className="text-text">
            If you want a partner who picks up the phone and ships fast, we&apos;ll work well together.
          </Reveal>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { label: 'Stack', value: 'Next.js + Vercel' },
            { label: 'Based in', value: `${site.address.city}, ${site.address.state}` },
            { label: 'Built since', value: '2025' },
          ].map((s) => (
            <Reveal key={s.label} className="bg-bg-elevated p-8 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim">{s.label}</p>
              <p className="font-display text-2xl text-text mt-2">{s.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
