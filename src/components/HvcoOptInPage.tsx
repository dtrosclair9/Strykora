import Reveal from '@/components/Reveal'
import HvcoForm from '@/components/HvcoForm'

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

export default function HvcoOptInPage({ config }: { config: HvcoConfig }) {
  return (
    <>
      {/* Hero: form beside the pitch, form first on phones */}
      <section className="relative pt-10 md:pt-16 pb-14 md:pb-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl opacity-30"
          aria-hidden="true"
        />

        <div className="relative container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal as="div" stagger className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <p className="eyebrow">{config.eyebrow}</p>
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.05]">{config.h1}</h1>
            <p className="text-lg md:text-xl text-text-muted text-balance leading-relaxed max-w-2xl">
              {config.subhead}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm">
              {['Free, no card', 'No sales call unless you ask', 'Yours to keep'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-text">
                  <span
                    className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0"
                    aria-hidden="true"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-5 order-1 lg:order-2">
            <div className="card p-6 md:p-8" id="hvco-form">
              <p className="eyebrow mb-2">Send it to me</p>
              <h2 className="text-2xl font-display text-text mb-5">Your email and your website.</h2>
              <HvcoForm niche={config.niche} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is in it */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow mb-3">What is in it</p>
            <h2 className="text-display-sm font-display text-text mb-10 text-balance">
              Nine questions, and what a straight answer to each one sounds like.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {bullets.map((b, i) => (
              <Reveal key={b.title} as="div" className="flex gap-4">
                <span className="font-display text-accent text-lg shrink-0 pt-0.5" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-medium text-text mb-1.5 leading-snug">{b.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why am I giving this away — the skepticism block */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <Reveal className="max-w-3xl">
            <h2 className="text-display-sm font-display text-text mb-6">Why am I giving this away?</h2>
            <div className="space-y-5 text-text-muted leading-relaxed">
              <p>
                Because I build websites for a living, and the fastest way to show a contractor I am not like the last
                guy is to hand him the questions that expose the last guy.
              </p>
              <p>
                Some people read this, check their own setup, and find out they are fine. Good. Some find out they do
                not own their site, and a few of those end up calling me. That is the whole catch. There is no card and
                I am not going to chase you.
              </p>
              <p className="text-text border-l-2 border-accent pl-4">
                I am Dayne. I build websites out of Thibodaux, Louisiana, for roofers, contractors, auto shops and
                marine companies around south Louisiana. Foret Construction &amp; Roofing is one of mine. Jacob owns
                every file of what I built him, and if he ever wants to take it somewhere else, he can, and he does not
                need my permission.
              </p>
              <p>That is the standard I think you should hold anybody to, including me. It is why I wrote the list.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Repeat ask */}
      <section className="section-padding">
        <div className="container-wide max-w-xl">
          <Reveal>
            <div className="card p-6 md:p-8">
              <p className="eyebrow mb-2">Send it to me</p>
              <h2 className="text-2xl font-display text-text mb-5">Your email and your website.</h2>
              <HvcoForm niche={config.niche} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
