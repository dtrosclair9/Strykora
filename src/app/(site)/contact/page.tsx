import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import FAQAccordion from '@/components/FAQAccordion'
import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
import { Schema } from '@/components/Schema'
import '../editorial.css'

export const metadata: Metadata = {
  title: 'Contact: Start a Louisiana Web Design or SEO Project',
  description: `Start a web design or local SEO project with ${site.name} in ${site.address.city}, LA. Dayne replies personally within one business day and looks at where you stand online before quoting.`,
  alternates: { canonical: `${site.url}/contact` },
}

const contactFaqs = [
  {
    q: "What if I'm not sure I'm a fit?",
    a: "Send the note anyway. If Strykora isn't the right call, I'll tell you on the first reply and point you to someone who is. A good chunk of inbound gets a referral instead of a quote.",
  },
  {
    q: 'How fast can you actually start?',
    a: 'Most builds kick off within 7 to 10 days of the deposit. A full website typically goes live inside two to three weeks of the deposit, which is about a week of build time once it starts. Tight deadlines get answered honestly before any money changes hands.',
  },
  {
    q: 'Do you do free audits?',
    a: 'My first reply to your form includes what I see wrong with your current site and Google Business Profile, and that part is free. A full written audit is a separate project.',
  },
  {
    q: "I'm outside Louisiana. Will you still take the project?",
    a: 'Strykora is built around the Louisiana market, which is where the case studies live and where the local SEO work goes deepest. But web design, Google Ads, and AI search optimization are location-agnostic, so out-of-state inquiries are welcome. Send the form anyway and we will see if it is a fit.',
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
        description="Send a short note about your business. I'll get back to you within one business day, usually sooner. Most of the time that means a short call so I can look at where you stand online before I quote anything."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/contact', label: 'Contact' },
        ]}
      />

      <div className="ledger-section site-container contact-intake">
        <ContactForm />

        <aside className="contact-direct editorial-copy">
          <div>
            <p className="eyebrow">Direct lines</p>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd><a href={`tel:${site.phoneRaw}`} className="text-link">{site.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${site.email}`} className="text-link">{site.email}</a></dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="eyebrow">What happens next</p>
            <ol role="list">
              <li>1. You send the form.</li>
              <li>2. I pull up your current site and Google Business Profile and get back to you within one business day, usually to set up a short call.</li>
              <li>3. If we&apos;re a fit, I send a fixed-price quote, a one-page scope, and a launch date. No pressure, no auto-billing.</li>
            </ol>
          </div>
          <div>
            <p className="eyebrow">What I won&apos;t do</p>
            <ul role="list">
              <li><strong>No pushy sales call.</strong> The first call is about where your business stands online. If Strykora is not the right fit, you will hear that on the call.</li>
              <li><strong>No auto-billing</strong> for design work. One fixed price, half up front, half at launch.</li>
              <li><strong>No long contracts</strong> on the SEO retainer. Month to month, cancel anytime.</li>
              <li><strong>No reselling</strong> Wix, Squarespace, GoDaddy, or any other page-builder service. Strykora builds it custom or it does not take the job.</li>
            </ul>
          </div>
        </aside>
      </div>

      <Section
        id="contact-prep"
        eyebrow="Before you write"
        heading="Six things I'll ask anyway."
        description="Save us a round of email. If you can include any of these in the first message, the response you get back will be specific instead of generic."
        className="contact-prep"
      >
        <dl>
          {[
          { label: '1. Your current site', body: 'URL of what you have now, or "nothing yet." Both are fine.' },
          { label: '2. The city or cities', body: 'Where the work actually happens. Strykora targets the city, not "anywhere in LA."' },
          { label: '3. The service that makes you money', body: 'The one job that pays for the whole month. That is the page we lead with.' },
          { label: '4. A rough budget', body: 'Even a range. Tells me whether to scope a build, a retainer, or both.' },
          { label: '5. A real deadline', body: 'Storm season, grand opening, end of a contract on a builder. Helps me sequence.' },
          { label: '6. A competitor doing it well', body: 'Optional. A link to anyone you think is winning the search results in your city.' },
          ].map(({ label, body }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="contact-faq"
        eyebrow="Quick answers"
        heading="The questions almost every first email asks."
        className="editorial-faq"
      >
        <FAQAccordion items={contactFaqs} />
      </Section>
    </>
  )
}
