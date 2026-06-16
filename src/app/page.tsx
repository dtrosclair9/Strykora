import type { Metadata } from 'next'
import Link from 'next/link'
import { services, industries, caseStudies, cities, site, trustStrip } from '@/config/site'
import HeroVideo from '@/components/HeroVideo'
import Reveal from '@/components/Reveal'
import { Schema, localBusinessSchema, websiteSchema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Web Design & SEO for Louisiana Businesses',
  description:
    'We build the website. Then we make sure Google sends people to it. Custom Next.js sites and local SEO for Louisiana businesses, built in Thibodaux.',
  alternates: { canonical: site.url },
}

const pillars = [
  {
    label: '01',
    title: 'No-fluff stack',
    body: 'Custom Next.js, not Wix or Squarespace. Faster sites, better SEO, you own the code.',
  },
  {
    label: '02',
    title: 'Local-first SEO',
    body: 'We rank you for what people in your city actually type, not vanity keywords.',
  },
  {
    label: '03',
    title: 'Built for AI search',
    body: 'Schema, llms.txt, structured FAQs — built to get cited by Google AI Overviews and ChatGPT.',
  },
  {
    label: '04',
    title: 'One operator, no agency layers',
    body: 'You work directly with the person building your site. No account manager between you and the work.',
  },
]

const processSteps = [
  { n: '01', title: 'Discovery', body: 'We pin down your services, cities, and the highest-ticket keywords worth ranking for.' },
  { n: '02', title: 'Build', body: 'Custom Next.js site, mobile-first, schema-rich, deployed to a preview URL in days.' },
  { n: '03', title: 'Rank', body: 'On-page SEO, GBP optimization, and technical foundations, all live before we hand off.' },
  { n: '04', title: 'Grow', body: 'Monthly SEO retainer or pay-as-you-go ads. Transparent reporting, no lock-in.' },
]

const faqs = [
  {
    q: 'How long does a custom website take?',
    a: 'Most builds ship live in 14–21 days. We work fast because there\'s one person doing it and the stack (Next.js + Tailwind + Vercel) is dialed in.',
  },
  {
    q: 'Why Next.js instead of Wix or Squarespace?',
    a: 'Next.js sites load in under a second, score 95+ on Lighthouse, and Google ranks them faster. Page builders add bloat that costs you both speed and search rankings. You also own the code outright.',
  },
  {
    q: 'Do you do SEO without redesigning the site?',
    a: 'Yes. SEO retainers start at $299/month and work on whatever platform you\'re on. But: if your current site is on Wix or a slow WordPress build, we\'ll be honest that a rebuild gets you further than 6 months of SEO ever will.',
  },
  {
    q: 'What cities do you serve?',
    a: `We\'re built in ${site.address.city} and serve all of Louisiana. Our biggest markets are Thibodaux, Houma, Baton Rouge, New Orleans, and Lafayette — but we ship sites for clients anywhere in the state.`,
  },
  {
    q: 'How are you different from EZMarketing or other generalist agencies?',
    a: 'They\'re wide and shallow — content, social, ads, design, all generic. We\'re narrow and deep: custom web design and local SEO, done by the person who builds your site. No account manager, no template, no platform tax.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const featuredCase = caseStudies.find((c) => 'featured' in c && c.featured) ?? caseStudies[0]

export default function HomePage() {
  return (
    <>
      <Schema data={[localBusinessSchema, websiteSchema, faqSchema]} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex items-center pt-24" aria-label="Hero">
        <HeroVideo src="/videos/hero.mp4" poster="/images/hero-poster.jpg" />

        <div className="relative z-10 container-wide pb-16 pt-16">
          <Reveal as="div" stagger className="max-w-4xl space-y-6">
            <p className="eyebrow">{site.address.city}, {site.address.state} · Web design + SEO</p>
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">
              We build the website.<br />
              Then we make sure <span className="gradient-text">Google sends people to it.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl text-balance leading-relaxed">
              Custom Next.js sites and local SEO for Louisiana businesses. Built by one operator
              in Thibodaux. No agency layers, no template farms, no monthly platform tax.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn-primary">
                Start a project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                See the work
              </Link>
            </div>
          </Reveal>

          {/* Trust strip */}
          <Reveal as="div" className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border max-w-3xl" stagger>
            {trustStrip.map((t) => (
              <div key={t.label} className="bg-bg-elevated/80 backdrop-blur p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim">{t.label}</p>
                <p className="mt-1 font-medium text-text">{t.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="section-padding relative" aria-labelledby="services-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">What we do</p>
            <h2 id="services-heading" className="text-display-md font-display text-text text-balance">
              Web design first.<br /> SEO that stacks on top.
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              Four services, in a sales stack that compounds. We don\'t do content writing, social media, or photography — and we won\'t pretend to.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <Link href={`/services/${s.slug}`} className="card-feature block group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-text-dim font-mono">
                      0{s.priority} / {s.eyebrow}
                    </p>
                    <span className="text-text-dim group-hover:text-accent transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-display text-text mb-2">{s.title}</h3>
                  <p className="text-text-muted leading-relaxed">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="section-padding bg-bg-elevated border-y border-border" aria-labelledby="industries-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Industries we serve</p>
            <h2 id="industries-heading" className="text-display-md font-display text-text text-balance">
              We know how Louisiana service businesses run.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((i) => (
              <Reveal key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="card-feature group block h-full"
                >
                  <h3 className="text-xl font-display text-text mb-2">{i.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{i.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
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

      {/* ── FEATURED CASE STUDY ──────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="case-heading">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow mb-4">Recent work</p>
            <h2 id="case-heading" className="text-display-md font-display text-text mb-14 text-balance">
              From stuck on Wix to ranking in {featuredCase.city.split(',')[0]}.
            </h2>
          </Reveal>

          <Reveal className="card-feature p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-[0.18em] text-accent font-mono mb-3">
                  {featuredCase.client} · {featuredCase.industry} · {featuredCase.city}
                </p>
                <h3 className="text-2xl md:text-3xl font-display text-text mb-4 text-balance">
                  {featuredCase.headline}
                </h3>
                <p className="text-text-muted leading-relaxed mb-8">{featuredCase.blurb}</p>
                <Link href={`/case-studies/${featuredCase.slug}`} className="btn-secondary text-sm">
                  Read the full story
                </Link>
              </div>
              <div className="lg:col-span-5 grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
                {featuredCase.metrics.map((m) => (
                  <div key={m.label} className="bg-bg p-5 text-center">
                    <p className="font-display text-2xl md:text-3xl gradient-text">{m.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-text-dim mt-1.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY STRYKORA ─────────────────────────────────────────────── */}
      <section className="section-padding bg-bg-elevated border-y border-border" aria-labelledby="why-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Why {site.name}</p>
            <h2 id="why-heading" className="text-display-md font-display text-text text-balance">
              Built like a craftsman, priced like a partner.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {pillars.map((p) => (
              <Reveal key={p.label} className="bg-bg-elevated p-8 md:p-10">
                <p className="font-mono text-xs text-accent">{p.label}</p>
                <h3 className="text-xl font-display text-text mt-3 mb-2">{p.title}</h3>
                <p className="text-text-muted leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="process-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">How it works</p>
            <h2 id="process-heading" className="text-display-md font-display text-text text-balance">
              Four steps from kickoff to ranking.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step) => (
              <Reveal key={step.n}>
                <div className="card h-full">
                  <p className="font-mono text-xs text-accent mb-4">{step.n}</p>
                  <h3 className="text-lg font-display text-text mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-bg-elevated border-y border-border" aria-labelledby="faq-heading">
        <div className="container-narrow">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 id="faq-heading" className="text-display-md font-display text-text text-balance">
              Common questions, honest answers.
            </h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((f) => (
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="cta-heading">
        <div className="container-wide">
          <Reveal>
            <div className="relative gradient-border">
              <div className="grid-pattern p-12 md:p-20 text-center">
                <p className="eyebrow mb-4">Ready when you are</p>
                <h2 id="cta-heading" className="text-display-md font-display text-text mb-6 text-balance max-w-3xl mx-auto">
                  Stop losing leads to a slow website.
                </h2>
                <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                  Tell me about your business in 60 seconds. I\'ll send back a candid take and a fixed-price quote within 24 hours.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Start a project
                  </Link>
                  <a href={`tel:${site.phoneRaw}`} className="btn-secondary">
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
