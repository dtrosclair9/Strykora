import type { Metadata } from 'next'
import Image from 'next/image'
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
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-bg-elevated">
              <Image
                src="/images/dayne-headshot.jpg"
                alt={`${site.owner}, founder of ${site.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-bg via-bg/70 to-transparent">
                <p className="font-display text-lg text-text">{site.owner}</p>
                <p className="text-sm text-text-muted">Founder · {site.address.city}, {site.address.state}</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-6 text-lg text-text-muted leading-relaxed">
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
        </div>
      </section>

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { label: 'Stack', value: 'Next.js + Vercel' },
            { label: 'Based in', value: `${site.address.city}, ${site.address.state}` },
            { label: 'Clients', value: 'Louisiana only' },
            { label: 'Footprint', value: 'One operator' },
          ].map((s) => (
            <Reveal key={s.label} className="bg-bg-elevated p-8 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim">{s.label}</p>
              <p className="font-display text-xl text-text mt-2">{s.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="eyebrow mb-4">Recent wins</p>
            <h2 className="text-display-md font-display text-text mb-6 text-balance">
              Real Louisiana businesses, real rankings.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border mt-10">
              <div className="bg-bg-elevated p-6">
                <p className="font-display text-2xl gradient-text">#1 Organic</p>
                <p className="text-sm text-text-muted mt-2">Hover Septic, Thibodaux LA<br /><span className="text-text-dim">&quot;septic installs Thibodaux LA&quot;</span></p>
              </div>
              <div className="bg-bg-elevated p-6">
                <p className="font-display text-2xl gradient-text">#3 AI Search</p>
                <p className="text-sm text-text-muted mt-2">All Out Window Tint, Baton Rouge<br /><span className="text-text-dim">2 months post-launch</span></p>
              </div>
              <div className="bg-bg-elevated p-6">
                <p className="font-display text-2xl gradient-text">9 Cities</p>
                <p className="text-sm text-text-muted mt-2">Foret Construction<br /><span className="text-text-dim">FORTIFIED roofer, South LA</span></p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  )
}
