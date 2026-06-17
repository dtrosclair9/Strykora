import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Contact Strykora — Start a Louisiana Web Project',
  description: `Start a web design or local SEO project with ${site.name} in ${site.address.city}, LA. Dayne replies personally within one business day with a candid take and a fixed-price quote. No sales call.`,
  alternates: { canonical: `${site.url}/contact` },
}

const contactFaqs = [
  {
    q: "What if I'm not sure I'm a fit?",
    a: "Send the note anyway. If Strykora isn't the right call, I'll tell you on the first reply and point you to someone who is. A good chunk of inbound gets a referral instead of a quote.",
  },
  {
    q: 'How fast can you actually start?',
    a: 'Most builds kick off within 7 to 10 days of the deposit. A full website typically goes live inside two to three weeks. Tight deadlines get answered honestly before any money changes hands.',
  },
  {
    q: 'Do you do free audits?',
    a: 'The first reply to your form already includes a candid take on your current site and Google Business Profile. That part is free. A formal written audit with deliverables is a separate engagement.',
  },
  {
    q: "I'm outside Louisiana. Will you still take the project?",
    a: 'No. Strykora is a Louisiana-only studio on purpose. Local market knowledge is half the product. Out-of-state clients get a polite no.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${site.url}/contact`,
  mainEntity: { '@id': `${site.url}/#business` },
}

const contactFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ContactPage() {
  return (
    <>
      <Schema data={schema} />
      <Schema data={contactFaqSchema} />
      <PageHero
        eyebrow="Contact"
        title="Tell me about your project."
        description="A short note is all I need to send back a candid take, including whether Strykora is the right fit, plus a fixed-price quote. One business day, no sales call, no pressure."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/contact', label: 'Contact' },
        ]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="card p-8 md:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="card p-6">
                <p className="eyebrow mb-3">Direct lines</p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <p className="text-text-dim text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a href={`tel:${site.phoneRaw}`} className="text-text hover:text-accent transition-colors">
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <p className="text-text-dim text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${site.email}`} className="text-text hover:text-accent transition-colors break-all">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-text-dim text-xs uppercase tracking-wider mb-1">Office</p>
                    <p className="text-text">{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</p>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="card p-6">
                <p className="eyebrow mb-3">What happens next</p>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li>1. You send the form.</li>
                  <li>2. I read it, pull up your current site and Google Business Profile, and write back within one business day.</li>
                  <li>3. If we&apos;re a fit, I send a fixed-price quote, a one-page scope, and a launch date. No pressure, no auto-billing.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="card p-6">
                <p className="eyebrow mb-3">What I won&apos;t do</p>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li><span className="text-text">No sales call.</span> Email first. If you want a call after, we book one.</li>
                  <li><span className="text-text">No auto-billing</span> for design work. One fixed price, half up front, half at launch.</li>
                  <li><span className="text-text">No long contracts</span> on the SEO retainer. Month to month, cancel anytime.</li>
                  <li><span className="text-text">No reselling</span> Wix, Squarespace, GoDaddy, or any builder. Strykora builds Next.js or it doesn&apos;t take the job.</li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-bg-elevated border-y border-border">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">Before you write</p>
            <h2 className="text-display-md font-display text-text text-balance">
              The five things I&apos;ll ask anyway.
            </h2>
            <p className="mt-5 text-text-muted text-lg leading-relaxed">
              Save us a round of email. If you can include any of these in the first message, the response you get back will be specific instead of generic.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: '1. Your current site', body: 'URL of what you have now, or "nothing yet." Both are fine.' },
              { label: '2. The city or cities', body: 'Where the work actually happens. Strykora targets the city, not "anywhere in LA."' },
              { label: '3. The service that makes you money', body: 'The one job that pays for the whole month. That is the page we lead with.' },
              { label: '4. A rough budget', body: 'Even a range. Tells me whether to scope a build, a retainer, or both.' },
              { label: '5. A real deadline', body: 'Storm season, grand opening, end of a contract on a builder. Helps me sequence.' },
              { label: '6. A competitor doing it well', body: 'Optional. A link to anyone you think is winning the search results in your city.' },
            ].map((item) => (
              <Reveal key={item.label}>
                <div className="card p-6 h-full">
                  <p className="font-display text-text mb-2">{item.label}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Quick answers</p>
            <h2 className="text-display-md font-display text-text text-balance mb-8">
              The questions almost every first email asks.
            </h2>
          </Reveal>
          <div className="space-y-4">
            {contactFaqs.map((item) => (
              <Reveal key={item.q}>
                <details className="card p-6 group">
                  <summary className="cursor-pointer font-display text-text text-lg flex justify-between items-center gap-4">
                    <span>{item.q}</span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-text-muted leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
