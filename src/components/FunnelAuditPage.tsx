import { site, reviews, caseStudies } from '@/config/site'
import AuditForm from '@/components/AuditForm'
import FAQAccordion from '@/components/FAQAccordion'
import Section from '@/components/Section'
import Stars from '@/components/Stars'
import ReviewQuote from '@/components/ReviewQuote'

export interface FunnelConfig {
  /** utm/niche key sent with the lead, e.g. "roofers" */
  niche: string
  eyebrow: string
  h1: string
  lede: string
  /** Review authors (must exist in site config reviews) shown as proof. */
  reviewAuthors: string[]
  /** Case study slugs shown in the results section. */
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
    body: 'The page says plainly what you do, the towns you cover and how to reach you, with answers to the questions customers ask before they call. Google and the AI tools read the same page a customer does.',
  },
]

const faqs = [
  {
    q: 'What is the catch on the free homepage?',
    a: 'There is no card and no invoice. Dayne builds it because showing you the work beats describing it, and because most owners have never seen their business presented properly. If you look at it and want nothing else, that is the end of it and you are out nothing.',
  },
  {
    q: 'What does the full site cost?',
    a: 'It depends on how many pages you need. You get a written scope with a fixed total before you pay anything. A deposit starts the build and the balance is due when you have seen the finished site and approved it.',
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
    a: 'Once, after your rebuilt homepage is already built and in your hands. It runs about fifteen minutes and it is a walkthrough of what changed and why, not a pitch. Dayne also looks up your domain and hosting beforehand and tells you straight whose name they are in, which takes him two minutes and is worth knowing either way. If you would rather skip it, say so in your reply and he will not call.',
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
      <section className="funnel-hero funnel-audit-hero" aria-labelledby="audit-title">
        <div className="site-container funnel-audit-intro">
          <div className="funnel-audit-title">
            <p className="eyebrow hero-eyebrow">{config.eyebrow}</p>
            <h1 id="audit-title" className="ledger-hero-title">{config.h1}</h1>
          </div>

          <section id="audit-form" className="funnel-form-panel funnel-audit-panel" aria-labelledby="audit-form-heading" tabIndex={-1}>
            <p className="eyebrow">Get your homepage rebuilt</p>
            <h2 id="audit-form-heading">Your website and your email.</h2>
            <AuditForm niche={config.niche} />
          </section>

          <div className="funnel-audit-copy">
            <p className="funnel-lede">{config.lede}</p>
            <ul className="funnel-assurances" role="list">
              {['No card, no invoice', 'Nothing to sign', 'Yours to keep either way'].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="funnel-aside">
              Straight about the money: if you want the rest of the site, you get a fixed price in writing first, a deposit
              starts it, and every file is yours once it is paid for. The rebuilt homepage costs nothing either way.
            </p>
          </div>
        </div>
      </section>

      <Section id="deliverables" className="funnel-index-section" eyebrow="What you get" heading="What you get, and what it costs you.">
        <ol className="funnel-index" role="list">
          {deliverables.map(({ label, title, body }) => (
            <li key={label}>
              <span className="funnel-index-number" aria-hidden="true">{label}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="proof" className="funnel-proof surface-dark" eyebrow="Real businesses, real names" heading="What happened after the first email.">
        <div className="funnel-results">
          {wins.map(({ slug, client, city, metrics, headline }) => (
            <div key={slug}>
              <p className="eyebrow">{client} · {city}</p>
              <dl>
                <div>
                  <dt>{metrics[0].label}</dt>
                  <dd>{metrics[0].value}</dd>
                </div>
              </dl>
              <p>{headline}</p>
            </div>
          ))}
        </div>
        <div className="funnel-reviews">
          {proofReviews.map(({ author, rating, body, business }) => (
            <figure key={author}>
              <Stars rating={rating} size="sm" />
              <ReviewQuote body={body} />
              <figcaption>
                <p><strong>{author}</strong></p>
                {business && <p>{business}</p>}
                <p className="eyebrow">Google review</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="audit-faq" className="funnel-index-section" eyebrow="Quick answers" heading="Questions owners ask before they send it.">
        <FAQAccordion items={faqs} />
      </Section>

      <Section
        id="audit-close"
        className="closing-band surface-dark"
        eyebrow="Takes about a minute"
        heading="See your homepage rebuilt before you decide anything."
        description="Send your website and your email. You get a private link to look at, and you are not on the hook for anything."
      >
        <div className="action-row">
          <a href="#audit-form" className="btn-conversion">Rebuild my homepage free</a>
          <a href={`tel:${site.phoneRaw}`} className="text-link">Call {site.phoneDisplay}</a>
        </div>
      </Section>
    </>
  )
}
