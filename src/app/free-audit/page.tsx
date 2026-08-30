import type { Metadata } from 'next'
import Link from 'next/link'
import { site, caseStudies, ogImage } from '@/config/site'
import Reveal from '@/components/Reveal'
import AuditForm from '@/components/AuditForm'
import ReviewsSection from '@/components/ReviewsSection'
import { Schema, breadcrumbSchema, faqSchema } from '@/components/Schema'

const title = 'Free Website & AI-Search Audit for Louisiana Businesses'
const description =
  'Send your business name and current site. Within one business day Dayne sends back what is costing you calls, whether Google and ChatGPT can find you, and the three fixes that matter. No sales call.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/free-audit` },
  openGraph: {
    title,
    description,
    url: `${site.url}/free-audit`,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [ogImage],
  },
}

const deliverables = [
  {
    label: '01',
    title: 'Your site, on a phone',
    body: 'How it loads, what it looks like, and the exact spot where a customer gives up and taps the next result. Most owners have never watched their own site the way a stranger on a phone does.',
  },
  {
    label: '02',
    title: 'Can they find you?',
    body: "Whether you show up on Google, in the AI answer at the top of Google, and inside ChatGPT for your main service in your city. Either your business gets named, or a competitor's does.",
  },
  {
    label: '03',
    title: 'The three fixes',
    body: 'The three changes that would actually move the needle, in plain English, with a fixed price if you want Strykora to do them. The list is yours either way. Take it to anyone you like.',
  },
]

const wins = caseStudies
  .filter((c) => ['hover-septic', 'all-out-window-tint', 'acadia-pools'].includes(c.slug))
  .map((c) => ({
    slug: c.slug,
    client: c.client,
    city: c.city,
    stat: c.metrics[0],
    headline: c.headline,
  }))

const faqs = [
  {
    q: 'Is the audit actually free?',
    a: 'Yes. There is no invoice and no card. You get the written reply whether or not you ever hire Strykora. Some people take the list to a friend who builds websites, and that is fine.',
  },
  {
    q: 'What do you need from me?',
    a: 'Your name, business name, phone, email, and the address of your current website if you have one. If you do not have a site yet, leave that blank. The audit then covers your Google Business Profile and where you show up today instead.',
  },
  {
    q: 'How long does the audit take?',
    a: 'You get the reply within one business day. Dayne reads every form personally and writes each audit by hand, so it is specific to your business and your city, not a report spat out by software.',
  },
  {
    q: 'Will you call me?',
    a: 'Only if you ask. The audit arrives by email. If you want to talk after reading it, the number is at the bottom of the reply, and you can also call the office directly any time.',
  },
  {
    q: 'What happens after I read it?',
    a: 'Nothing, unless you want it to. If the fixes make sense, Strykora sends a fixed price, a one-page scope, and a launch date. Design work is one price, half up front and half at launch. No auto-billing, no long contract.',
  },
  {
    q: "I'm outside Louisiana. Can I still send it?",
    a: 'Send it anyway. Strykora is built around Louisiana, and that is where the case studies live, but the audit works for any local service business in the United States.',
  },
]

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/free-audit`,
  url: `${site.url}/free-audit`,
  name: title,
  description,
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#business` },
}

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free website and AI-search audit',
  serviceType: 'Website audit',
  provider: { '@id': `${site.url}/#business` },
  areaServed: { '@type': 'State', name: 'Louisiana' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: `${site.url}/free-audit` },
  description,
}

export default function FreeAuditPage() {
  return (
    <>
      <Schema data={pageSchema} />
      <Schema data={offerSchema} />
      <Schema data={faqSchema(faqs)} />
      <Schema
        data={breadcrumbSchema([
          { href: '/', label: 'Home' },
          { href: '/free-audit', label: 'Free audit' },
        ])}
      />

      {/* Hero: copy + form side by side on desktop, form first on phones */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl opacity-30" aria-hidden="true" />

        <div className="relative container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal as="div" stagger className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <p className="eyebrow">Free audit · Louisiana businesses</p>
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">
              Free website and AI-search audit for Louisiana businesses.
            </h1>
            <p className="text-lg md:text-xl text-text-muted text-balance leading-relaxed max-w-2xl">
              Send your business name and your current site. Within one business day, Dayne sends back what is
              costing you calls, whether Google and ChatGPT can find you, and the three fixes that matter. Written by
              hand, for your business, in your city.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm">
              {[
                'No card, no invoice',
                'No sales call',
                'Reply within one business day',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-text">
                  <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0" aria-hidden="true">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-dim pt-2">
              Rather talk first? Call{' '}
              <a href={`tel:${site.phoneRaw}`} className="text-accent hover:underline">{site.phoneDisplay}</a>.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5 order-1 lg:order-2">
            <div className="card p-6 md:p-8" id="audit-form">
              <p className="eyebrow mb-2">Request the audit</p>
              <h2 className="text-2xl font-display text-text mb-5">Five fields. One business day.</h2>
              <AuditForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="section-padding" aria-labelledby="deliverables-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">What you get</p>
            <h2 id="deliverables-heading" className="text-display-md font-display text-text text-balance">
              What is in the audit?
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              Three things, written in plain English. You will know what a customer sees, whether the search engines
              and AI assistants can find you, and what to fix first.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {deliverables.map((d) => (
              <Reveal key={d.label}>
                <article className="card-feature h-full p-7">
                  <p className="font-mono text-xs text-accent mb-4">{d.label}</p>
                  <h3 className="text-xl font-display text-text mb-3">{d.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wins */}
      <section className="section-padding bg-bg-elevated border-y border-border" aria-labelledby="wins-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Real Louisiana businesses</p>
            <h2 id="wins-heading" className="text-display-md font-display text-text text-balance">
              What happened after the first email.
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              Every one of these started with the owner sending a short note. Every one of them owns their website
              outright today.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {wins.map((w) => (
              <Reveal key={w.slug}>
                <Link href={`/case-studies/${w.slug}`} className="card-feature h-full p-7 flex flex-col group">
                  <p className="font-mono text-xs text-text-dim mb-6">{w.client} · {w.city}</p>
                  <p className="text-4xl font-display text-text mb-1">{w.stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-text-dim mb-5">{w.stat.label}</p>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">{w.headline}</p>
                  <span className="mt-6 text-sm text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the case study
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

      <ReviewsSection
        featuredOnly
        limit={3}
        eyebrow="Google reviews"
        heading="Owners who sent the form first."
        showSeeAllLink
      />

      {/* FAQ */}
      <section className="section-padding" aria-labelledby="audit-faq-heading">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Quick answers</p>
            <h2 id="audit-faq-heading" className="text-display-md font-display text-text text-balance mb-8">
              Questions owners ask before they send it.
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((item) => (
              <Reveal key={item.q}>
                <details className="card p-6 group">
                  <summary className="cursor-pointer font-display text-text text-lg flex justify-between items-center gap-4">
                    <span>{item.q}</span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform shrink-0" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-4 text-text-muted leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA back to the form */}
      <section className="section-padding pt-0" aria-label="Request the audit">
        <div className="container-wide">
          <Reveal>
            <div className="relative gradient-border">
              <div className="grid-pattern p-12 md:p-20 text-center">
                <p className="eyebrow mb-4">Takes about a minute</p>
                <h2 className="text-display-md font-display text-text mb-6 text-balance max-w-3xl mx-auto">
                  Find out what your website is costing you.
                </h2>
                <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                  Five fields, one business day, and a list you can act on with or without Strykora.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="#audit-form" className="btn-primary">Request the free audit</a>
                  <a href={`tel:${site.phoneRaw}`} className="btn-secondary">Call {site.phoneDisplay}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
