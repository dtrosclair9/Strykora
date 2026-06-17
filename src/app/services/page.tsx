import type { Metadata } from 'next'
import Link from 'next/link'
import { services, site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Web Design, SEO, Google Ads & AI Search — Louisiana',
  description:
    'Five services built to stack: custom Next.js web design from $3,750, local SEO from $297/month, Google Business Profile, Google Ads management, plus AI Search Optimization for ChatGPT and Google AI Overview citation.',
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
          <Reveal className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">The stack</p>
            <h2 className="text-display-md font-display text-text text-balance mb-5">
              Four core services. One sequence. Plus a fifth nobody else sells.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              A pretty site that nobody finds is a brochure. A #1 ranking for a slow, ugly site sends traffic to the wrong impression. The four core services below are the order Strykora runs in production. The fifth, AI Search Optimization, is the moat: getting your business cited inside the ChatGPT, Perplexity, and Google AI Overview answers your future customers already trust.
            </p>
          </Reveal>

          {(() => {
            const ai = services.find((s) => 'featured' in s && s.featured)
            if (!ai) return null
            return (
              <Reveal className="mb-8">
                <Link href={`/services/${ai.slug}`} className="block group relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-bg-elevated to-bg-elevated p-8 md:p-10 hover:border-accent/70 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] uppercase tracking-[0.18em] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          The Louisiana moat
                        </span>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim font-mono">
                          0{ai.priority} · {ai.eyebrow}
                        </p>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display text-text mb-3 text-balance">{ai.title}</h2>
                      <p className="text-text-muted leading-relaxed mb-5">{ai.long}</p>
                      <ul className="space-y-2 mb-4">
                        {ai.bullets.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-text-muted">
                            <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-text-dim font-mono">{ai.priceRange}</p>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                        See the playbook
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.filter((s) => !('featured' in s && s.featured)).map((s) => (
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

      <section className="section-padding bg-bg-elevated border-y border-border">
        <div className="container-wide">
          <Reveal className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">Where to start</p>
            <h2 className="text-display-md font-display text-text text-balance">
              Not sure which one you need first?
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              The honest answer depends on what's already broken. Pick the line that sounds like you, and that's the service to lead with.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                situation: 'My site looks dated, slow, or is on Wix or Squarespace.',
                lead: 'Web Design first.',
                why: 'A new build fixes Core Web Vitals, schema, and conversion before a single SEO dollar is spent. Otherwise you are buying traffic and watching it bounce.',
                href: '/services/web-design',
              },
              {
                situation: 'Site is fine. I just do not show up on Google in my city.',
                lead: 'Local SEO first.',
                why: 'On-page rebuilds, schema, GBP optimization, and monthly content compound for 6 to 12 months. The ranking work outlives any ad spend.',
                href: '/services/seo',
              },
              {
                situation: 'I need leads this month, not next year.',
                lead: 'Google Ads first.',
                why: 'Search ads buy you the top of page 1 today. Strykora runs them with a conversion-tracked landing page so the cost-per-lead is honest.',
                href: '/services/google-ads',
              },
              {
                situation: 'My Google Business Profile is empty or claimed by a previous agency.',
                lead: 'GBP Optimization first.',
                why: 'The local pack drives more calls than the blue links for most service businesses. Strykora rebuilds the profile, posts weekly, and matches it to the on-site copy.',
                href: '/services/google-business-profile',
              },
              {
                situation: 'My SEO is fine but ChatGPT and Google AI Overviews never name me.',
                lead: 'AI Search Optimization first.',
                why: 'The AI answers above the blue links are eating organic click-through. Strykora rebuilds your schema, entity, llms.txt, and direct-answer copy so ChatGPT, Perplexity, and Google AI Overview cite your business by name.',
                href: '/services/ai-search-optimization',
              },
            ].map((item) => (
              <Reveal key={item.situation}>
                <Link href={item.href} className="card-feature group block h-full p-7">
                  <p className="text-text font-display text-lg mb-3 leading-snug">{item.situation}</p>
                  <p className="text-accent font-medium mb-3">{item.lead}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{item.why}</p>
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
