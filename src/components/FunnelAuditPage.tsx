import { site, reviews, caseStudies } from '@/config/site'
import Reveal from '@/components/Reveal'
import AuditForm from '@/components/AuditForm'
import Stars from '@/components/Stars'

export interface FunnelConfig {
  /** utm/niche key sent with the lead, e.g. "roofers" */
  niche: string
  eyebrow: string
  h1: string
  lede: string
  /** Review authors (must exist in site config reviews) shown as proof. */
  reviewAuthors: string[]
  /** Case study slugs shown as static win cards. */
  winSlugs: string[]
}

const deliverables = [
  {
    label: '01',
    title: 'Your homepage, rebuilt',
    body: 'Not a report about your website. The page itself, built for your business, on a private link you can open on your phone. Most owners have never seen what their company could look like online without paying for it first.',
  },
  {
    label: '02',
    title: 'Try to hire yourself',
    body: 'Open it and see whether you can find the work you do, see a job you actually finished, and get to the phone number without hunting for it. That is how a customer judges you, and it is how you should judge the page.',
  },
  {
    label: '03',
    title: 'Built to be found',
    body: 'Set up so Google and ChatGPT can read your pages and quote them: real structure, plain answers to the questions people ask, and the data those systems look for. You will see it in the page, not in a promise.',
  },
]

const faqs = [
  {
    q: 'What is the catch on the free homepage?',
    a: 'There is no card and no invoice. Dayne builds it because showing you the work beats describing it, and because most owners have never seen their business presented properly. If you look at it and want nothing else, that is the end of it and you are out nothing.',
  },
  {
    q: 'What does the full site cost?',
    a: 'Custom builds start at $3,750. The exact number depends on how many pages you need, and you get a written scope with a fixed total before you pay anything. A $500 deposit starts the build and the balance is due when you have seen the finished site and approved it.',
  },
  {
    q: 'What if I do not like the finished site?',
    a: 'Before you approve it by email, you can cancel by email and get back every build payment you have made, without giving a reason. Not replying does not count as approving. Your existing domain and materials stay yours either way.',
  },
  {
    q: 'Do I really own it?',
    a: 'Once it is paid for, the source files and images go into a repository you control, and you can take them to any developer you like. Hosting and domain renewal are still ongoing costs, billed by those providers, and the scope lists what they are before you pay.',
  },
  {
    q: 'Will you call me?',
    a: 'Only if you ask. Everything happens by email. The phone field on the form is optional and Dayne uses it only if you say you would rather talk.',
  },
  {
    q: 'What if my website is old, or I do not have one?',
    a: 'Send whatever exists, including a Google Business Profile or a Facebook page. Dayne looks at what is there and asks you to confirm anything he cannot tell from the outside before building.',
  },
  {
    q: 'How long does the rebuilt homepage take?',
    a: 'Within three business days of the details being confirmed. The full site takes a few days once you have sent photos and the information about your work, since that part depends on you more than on Dayne.',
  },
]

export { faqs as funnelFaqs }

export default function FunnelAuditPage({ config }: { config: FunnelConfig }) {
  const proofReviews = config.reviewAuthors
    .map((a) => reviews.find((r) => r.author === a))
    .filter((r): r is (typeof reviews)[number] => Boolean(r))
  const wins = caseStudies.filter((c) => config.winSlugs.includes(c.slug))

  return (
    <>
      {/* Hero: form beside the pitch, form first on phones */}
      <section className="relative pt-10 md:pt-16 pb-14 md:pb-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl opacity-30" aria-hidden="true" />

        <div className="relative container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal as="div" stagger className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <p className="eyebrow">{config.eyebrow}</p>
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.05]">{config.h1}</h1>
            <p className="text-lg md:text-xl text-text-muted text-balance leading-relaxed max-w-2xl">{config.lede}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm">
              {['No card, no invoice', 'No sales call', 'Yours to keep either way'].map((item) => (
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
            <p className="text-sm text-text-muted border-l-2 border-accent pl-4">
              Straight about the money: if you want the rest of the site, custom builds start at{' '}
              <strong className="text-text">$3,750</strong>, a $500 deposit starts it, and every file is yours once it is
              paid for. The rebuilt homepage costs nothing either way.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5 order-1 lg:order-2">
            <div className="card p-6 md:p-8" id="audit-form">
              <p className="eyebrow mb-2">Get your homepage rebuilt</p>
              <h2 className="text-2xl font-display text-text mb-5">Your website and your email.</h2>
              <AuditForm niche={config.niche} />
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

      {/* Proof: wins + reviews, deliberately link-free */}
      <section className="section-padding bg-bg-elevated border-y border-border" aria-labelledby="proof-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Real businesses, real names</p>
            <h2 id="proof-heading" className="text-display-md font-display text-text text-balance">
              What happened after the first email.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {wins.map((w) => (
              <Reveal key={w.slug}>
                <article className="card-feature h-full p-7 flex flex-col">
                  <p className="font-mono text-xs text-text-dim mb-6">{w.client} · {w.city}</p>
                  <p className="text-4xl font-display text-text mb-1">{w.metrics[0].value}</p>
                  <p className="text-xs uppercase tracking-wider text-text-dim mb-5">{w.metrics[0].label}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{w.headline}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {proofReviews.map((r) => (
              <Reveal key={r.author}>
                <article className="card h-full p-7 flex flex-col">
                  <Stars rating={r.rating} size="sm" className="mb-4" />
                  <blockquote className="text-text-muted leading-relaxed text-sm mb-5 flex-1">{r.body}</blockquote>
                  <footer className="border-t border-border pt-4">
                    <p className="font-display text-text">{r.author}</p>
                    {r.business && <p className="text-xs text-text-dim mt-0.5 font-mono">{r.business}</p>}
                    <p className="text-[10px] text-text-dim mt-2 uppercase tracking-wider">Google review</p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
      <section className="section-padding pt-0" aria-label="Get your homepage rebuilt">
        <div className="container-wide">
          <Reveal>
            <div className="relative gradient-border">
              <div className="grid-pattern p-12 md:p-20 text-center">
                <p className="eyebrow mb-4">Takes about a minute</p>
                <h2 className="text-display-md font-display text-text mb-6 text-balance max-w-3xl mx-auto">
                  See your homepage rebuilt before you decide anything.
                </h2>
                <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                  Send your website and your email. You get a private link to look at, and you are not on the hook for
                  anything.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="#audit-form" className="btn-primary">Rebuild my homepage free</a>
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
