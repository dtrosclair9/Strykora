import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { services, industries, caseStudies, site, trustStrip, reviewStats } from '@/config/site'
import HeroVideo from '@/components/HeroVideo'
import Reveal from '@/components/Reveal'
import Stars from '@/components/Stars'
import ReviewsSection from '@/components/ReviewsSection'
import { Schema, localBusinessSchema, websiteSchema, personSchema, faqSchema as buildFaqSchema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Web Design & SEO for Louisiana Businesses',
  description:
    'Custom Next.js websites and local SEO for Louisiana service businesses. Built in Thibodaux, ships in about a week, you own the code outright.',
  alternates: { canonical: site.url },
}

const pillars = [
  {
    label: '01',
    title: 'No-fluff stack',
    body: 'Custom Next.js, not Wix or Squarespace. Faster, easier to rank, and you own the code outright.',
  },
  {
    label: '02',
    title: 'Local-first SEO',
    body: 'Strykora ranks you for what people in your city actually type into Google, not vanity keywords.',
  },
  {
    label: '03',
    title: 'Built for AI search',
    body: 'Schema, llms.txt, and structured FAQs on every page, tuned to get cited by Google AI Overviews and ChatGPT.',
  },
  {
    label: '04',
    title: 'One operator, no agency layers',
    body: 'You work directly with the person building your site. No account manager, no offshore handoffs, no design committee.',
  },
]

const processSteps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Strykora pins down your services, cities, and the highest-ticket keywords worth ranking for. One call, written brief, no fluff.',
  },
  {
    n: '02',
    title: 'Build',
    body: 'Custom Next.js site, mobile-first, schema-rich, deployed to a preview URL within days for your sign-off.',
  },
  {
    n: '03',
    title: 'Rank',
    body: 'On-page SEO, Google Business Profile optimization, and technical foundations all live before launch.',
  },
  {
    n: '04',
    title: 'Grow',
    body: 'Monthly SEO retainer or pay-as-you-go ads. Transparent reporting, no long-term lock-in.',
  },
]

const faqs = [
  {
    q: 'How long does a custom website take to build?',
    a: `Most Strykora websites ship live in about one week. The stack is dialed in (Next.js + Tailwind + Vercel) and you work directly with the builder, so there are no agency handoffs, offshore queues, or design committees slowing the project down.`,
  },
  {
    q: 'How much does a Strykora website cost?',
    a: `Custom websites start at $3,750 one-time, depending on scope and number of pages. Local SEO retainers start at $297/month. Google Ads management starts at $500/month plus your ad spend. Every quote is a fixed price up front, no hourly billing.`,
  },
  {
    q: 'Why Next.js instead of Wix, Squarespace, or WordPress?',
    a: `Next.js sites are engineered for Core Web Vitals, ship with schema baked in, and stay fast as you add pages. Page builders and WordPress add bloat that costs you both speed and search rankings. You also own the code outright, so you can leave Strykora at any time without rebuilding.`,
  },
  {
    q: 'Do you do SEO without redesigning the site?',
    a: `Yes. Local SEO retainers start at $297/month and work on whatever platform you are on. That said, if your current site is on Wix or a slow WordPress build, a rebuild usually moves the needle further than six months of SEO on the broken foundation.`,
  },
  {
    q: 'What cities and markets do you serve?',
    a: `Strykora is built in ${site.address.city}, Louisiana and serves the whole state. The strongest markets are Thibodaux, Houma, Baton Rouge, New Orleans, and Lafayette, but Strykora ships sites for clients anywhere in Louisiana.`,
  },
  {
    q: 'Do you work with clients outside Louisiana?',
    a: `No. Strykora is built around the South Louisiana market: the buyers, the search behavior, the seasonal cycle, and the local pack dynamics. Out-of-state inquiries get referred to other operators.`,
  },
  {
    q: 'Do you offer content writing, social media, or photography?',
    a: `No. Strykora is web design and SEO only. For copywriting, social media management, or photo and video, Strykora refers to Louisiana freelancers who specialize. Honest scope keeps quality high.`,
  },
  {
    q: 'How are you different from a generic marketing agency?',
    a: `Generic agencies are wide and shallow: content, social, ads, design, branding, all average. Strykora is narrow and deep: custom web design and local SEO, done by the person who builds your site. No account manager, no template, no platform tax.`,
  },
  {
    q: 'How do you measure success?',
    a: `Booked leads, phone calls, form submissions, and tracked ranking positions for the keywords that pay your bills. Every retainer client gets a monthly report that shows what changed, what ranked, and what to do next.`,
  },
  {
    q: 'How fast will you respond to my inquiry?',
    a: `Strykora responds to every project inquiry within one business day. You will get a candid take on whether Strykora is the right fit and, if so, a fixed-price quote and timeline.`,
  },
]

const featuredCase = caseStudies.find((c) => 'featured' in c && c.featured) ?? caseStudies[0]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Strykora builds and ranks a Louisiana small business website',
  description:
    'The four-step Strykora process from discovery through ongoing SEO growth for a Louisiana service or commercial business.',
  step: processSteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

export default function HomePage() {
  return (
    <>
      <Schema data={[localBusinessSchema, websiteSchema, personSchema, buildFaqSchema(faqs), howToSchema]} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex items-center pt-24" aria-label="Hero">
        <HeroVideo
          src="/videos/hero.mp4"
          poster="/images/hero-poster.jpg"
          alt="Strykora hero — cinematic light particles converging on a focal point"
        />

        <div className="relative z-10 container-wide pb-16 pt-16">
          <Reveal as="div" stagger className="max-w-4xl space-y-6">
            <p className="eyebrow">{site.address.city}, {site.address.state} · Web design + SEO</p>
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">
              We build the website.<br />
              Then we make sure <span className="gradient-text">Google sends people to it.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl text-balance leading-relaxed">
              Custom Next.js sites and local SEO for Louisiana businesses. Built by one operator
              in Thibodaux. Ships in about a week, owned outright by you.
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
            <a
              href={site.gbp.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-text-muted hover:text-text transition-colors group"
              aria-label={`Strykora has ${reviewStats.reviewCount} Google reviews with a ${reviewStats.averageRating} star average`}
            >
              <Stars rating={Math.round(reviewStats.averageRating)} size="sm" />
              <span className="font-mono">
                {reviewStats.averageRating.toFixed(1)} · {reviewStats.reviewCount} Google reviews
              </span>
              <span className="text-accent group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
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
              Four services, in a sales stack that compounds. Strykora does not offer content writing, social media management, or photography, and won&apos;t pretend to.
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
                  <p className="text-text-muted leading-relaxed mb-3">{s.short}</p>
                  <p className="text-sm text-text-dim font-mono">{s.priceRange}</p>
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
              Built for Louisiana service and commercial businesses.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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

          <Reveal className="card-feature overflow-hidden !p-0">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={featuredCase.cover}
                alt={`Custom metal roof installation in ${featuredCase.city}, the kind of work ${featuredCase.client} is built around.`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 md:p-12">
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

          <Reveal className="mt-8 text-center">
            <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all">
              See all case studies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <ReviewsSection
        limit={3}
        featuredOnly
        heading="Real clients. Real reviews."
        showSeeAllLink
      />

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
                  Tell me about your business in 60 seconds. I&apos;ll send back a candid take and a fixed-price quote within one business day.
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
