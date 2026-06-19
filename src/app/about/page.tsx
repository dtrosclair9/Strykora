import type { Metadata } from 'next'
import Image from 'next/image'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import ReviewsSection from '@/components/ReviewsSection'
import { Schema, personSchema, faqSchema as buildFaqSchema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'About Dayne Trosclair, Louisiana Web Designer',
  description: `${site.name} is built and run by ${site.owner} out of ${site.address.city}, Louisiana. One operator, every site built by hand, every client kept on a first-name basis.`,
  alternates: { canonical: `${site.url}/about` },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${site.url}/about`,
  mainEntity: { '@id': `${site.url}/#dayne` },
}

const aboutFaqs = [
  {
    q: `Who actually builds Strykora websites?`,
    a: `${site.owner} builds every Strykora website by hand, from the first commit to the last deploy. No subcontractors, no offshore teams, no junior developers handed the project after the sales call.`,
  },
  {
    q: `Does Strykora take clients outside Louisiana?`,
    a: `No. Strykora is built around the South Louisiana market: the buyers, the search behavior, the seasonal cycle, and the local pack dynamics. Out-of-state inquiries get referred to other operators.`,
  },
  {
    q: `What is Strykora's tech setup and why does it matter?`,
    a: `Strykora builds on Next.js, the same professional framework agencies in San Francisco and New York charge five and six figures for. It loads fast on a phone, comes with the search-engine code Google reads, and stays fast as your site grows. You do not need to know any of this; the short version is your site is built the right way, run from Thibodaux at Louisiana prices.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <Schema data={[aboutPageSchema, personSchema, buildFaqSchema(aboutFaqs)]} />
      <PageHero
        eyebrow="About"
        title="One operator. South Louisiana. No layers."
        description={`I'm ${site.owner}. I build every ${site.name} website by hand and run the SEO myself, out of ${site.address.city}.`}
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
                alt={`${site.owner}, founder of ${site.name}, in ${site.address.city}, Louisiana`}
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
              I grew up in {site.address.city}, Louisiana. {site.address.parish}, sugar cane, hurricane
              cycles, oilfield neighbors. I know what a Louisiana service business looks like and what its customers
              actually search for, because I&apos;ve lived next door to them my whole life.
            </Reveal>
            <Reveal as="p">
              Most marketing agencies sell you a sales rep, then hand the actual work to a project manager
              who hands it to a junior contractor who hands it to a template. By the time the site goes live,
              nobody on the team has met you and the result looks like every other site they shipped that month.
              And every text change after launch is a ticket and a two-week wait.
            </Reveal>
            <Reveal as="p">
              {site.name} is built differently. I take a small number of Louisiana clients each year, build every
              site by hand, and handle the SEO myself. No account managers, no offshore subcontractors,
              no Wix templates with your logo on them.
            </Reveal>
            <Reveal as="p">
              The stack {site.name} builds on is the same one high-end agencies in San Francisco and New
              York use. I run it from {site.address.city} and price it for Louisiana service businesses. You
              get a real custom build for a small business budget, and you own the code outright.
            </Reveal>
            <Reveal as="p" className="text-text">
              You call, I answer. You text a change, it ships the same day. You decide to leave, you take the
              code, the domain, the analytics, and the GBP with you. That&apos;s the trade. No lock-in, no
              account managers, no nonsense. If that&apos;s the kind of partner you want, we&apos;ll work well together.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-bg-elevated">
        <div className="container-wide grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { label: 'Owned by', value: 'You' },
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
                <p className="text-sm text-text-muted mt-2">All Out Window Tint, Baton Rouge<br /><span className="text-text-dim">&quot;tint baton rouge&quot;, 2 months post-launch</span></p>
              </div>
              <div className="bg-bg-elevated p-6">
                <p className="font-display text-2xl gradient-text">9 City Pages</p>
                <p className="text-sm text-text-muted mt-2">Foret Construction<br /><span className="text-text-dim">FORTIFIED roofer, South LA</span></p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ReviewsSection heading="What clients say about working with Strykora." eyebrow="Reviews" />

      <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="about-faq-heading">
        <div className="container-narrow">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 id="about-faq-heading" className="text-display-md font-display text-text text-balance">
              About Strykora.
            </h2>
          </Reveal>
          <div className="space-y-3">
            {aboutFaqs.map((f) => (
              <Reveal key={f.q}>
                <details className="card group">
                  <summary className="font-medium text-text cursor-pointer flex items-start justify-between gap-4 list-none">
                    <span>{f.q}</span>
                    <svg className="w-5 h-5 text-text-dim group-open:rotate-45 transition-transform shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-text-muted leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
