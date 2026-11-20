import HvcoForm from '@/components/HvcoForm'
import Section from '@/components/Section'

export interface HvcoConfig {
  /** utm/niche key sent with the lead, e.g. "roofers" */
  niche: string
  eyebrow: string
  h1: string
  subhead: string
}

/**
 * Opt-in page for the 9 Questions guide.
 *
 * Top of funnel, cold traffic. Zero marginal cost to deliver, which is the whole
 * point: the free homepage rebuild costs Dayne hours and belongs one step down,
 * after someone has self-identified.
 */

const bullets = [
  {
    title: 'The free 30-second lookup that tells you whose name your domain is really in',
    body: 'You can run it yourself before you finish reading this page. A lot of owners have never checked, and some of them are in for a surprise.',
  },
  {
    title: '"As long as you are a client, the site is yours" is a different sentence from "you own the site"',
    body: 'They sound identical on a sales call. Only one of them survives you leaving. Question 1 covers how to hear the difference.',
  },
  {
    title: 'The twelve-month structure that closes your exit before you have seen the work',
    body: 'Billing starts the day you sign. Onboarding takes two months. The cancellation window is sixty days. Question 6 walks the arithmetic.',
  },
  {
    title: 'The one-line email that tells you most of what you need to know',
    body: 'Send it today to whoever runs your website now. What comes back, and how fast, is the answer.',
  },
  {
    title: 'How to tell a custom build from a recolored template',
    body: 'Three live sites and your own phone. Takes about four minutes.',
  },
  {
    title: 'What "SEO" should look like on an invoice',
    body: 'A deliverable you cannot check yourself is not a deliverable. Question 8 covers what to ask for instead.',
  },
]

function GuideFormPanel({ niche, id, className = '' }: { niche: string; id: string; className?: string }) {
  const headingId = `${id}-heading`

  return (
    <section id={id} className={`funnel-form-panel ${className}`} aria-labelledby={headingId}>
      <p className="eyebrow">Send it to me</p>
      <h2 id={headingId}>Your email and your website.</h2>
      <HvcoForm niche={niche} />
    </section>
  )
}

export default function HvcoOptInPage({ config }: { config: HvcoConfig }) {
  return (
    <>
      <section className="funnel-hero funnel-guide-hero" aria-labelledby="guide-title">
        <div className="site-container funnel-guide-intro">
          <div className="funnel-guide-title">
            <p className="eyebrow hero-eyebrow">{config.eyebrow}</p>
            <h1 id="guide-title" className="ledger-hero-title">{config.h1}</h1>
          </div>

          <GuideFormPanel id="hvco-form" className="funnel-guide-panel" niche={config.niche} />

          <div className="funnel-guide-copy">
            <p className="funnel-lede">{config.subhead}</p>
            <ul className="funnel-assurances" role="list">
              {['Free, no card', 'No sales call unless you ask', 'Yours to keep'].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="guide-contents"
        className="funnel-index-section"
        eyebrow="What is in it"
        heading="Nine questions, and what a straight answer to each one sounds like."
      >
        <ol className="funnel-index funnel-guide-index" role="list">
          {bullets.map(({ title, body }, index) => (
            <li key={title}>
              <span className="funnel-index-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="ledger-section funnel-guide-letter" aria-labelledby="guide-letter-heading">
        <div className="site-container">
          <div className="ledger-section-heading">
            <h2 id="guide-letter-heading">Why am I giving this away?</h2>
          </div>
          <div className="funnel-letter-copy">
            <p>
              Because I build websites for a living, and the fastest way to show a contractor I am not like the last
              guy is to hand him the questions that expose the last guy.
            </p>
            <p>
              Some people read this, check their own setup, and find out they are fine. Good. Some find out they do
              not own their site, and a few of those end up calling me. That is the whole catch. There is no card and
              I am not going to chase you.
            </p>
            <p className="funnel-aside">
              I am Dayne. I build websites out of Thibodaux, Louisiana, for roofers, contractors, auto shops and
              marine companies around south Louisiana. Foret Construction &amp; Roofing is one of mine. Jacob owns
              every file of what I built him, and if he ever wants to take it somewhere else, he can, and he does not
              need my permission.
            </p>
            <p>That is the standard I think you should hold anybody to, including me. It is why I wrote the list.</p>
          </div>
        </div>
      </section>

      <div className="ledger-section funnel-guide-repeat">
        <div className="site-container">
          <GuideFormPanel id="guide-request" niche={config.niche} />
        </div>
      </div>
    </>
  )
}
