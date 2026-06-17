import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name} — what we collect, what we don\'t, and how we use it.`,
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: false },
}

const updated = 'June 16, 2026'

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${updated}.`}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/privacy', label: 'Privacy' },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow prose-strykora space-y-10 text-text-muted leading-relaxed">
          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">What we collect</h2>
            <p>
              {site.name} collects only what you give us through the contact form on this site: your name, business name,
              email, phone (optional), service of interest, and project message. We also collect standard server logs
              (IP, browser, page visited, timestamp) that any web host stores automatically for security and analytics.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Third-party services we use</h2>
            <ul className="list-disc list-inside space-y-2 marker:text-accent">
              <li><strong className="text-text">Formspree</strong>: handles contact form submissions; relays the email to {site.email}.</li>
              <li><strong className="text-text">Vercel</strong>: hosts the site; stores standard request logs.</li>
              <li><strong className="text-text">Google Fonts</strong>: serves the typography used across the site.</li>
              <li><strong className="text-text">Google Analytics / Search Console</strong> (if enabled): anonymized traffic and search performance data.</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">How we use it</h2>
            <p>
              The information you submit is used to respond to your project inquiry and decide whether we&apos;re a fit. We don&apos;t
              sell, rent, or share your data. We don&apos;t add you to a marketing list without your permission.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Cookies & tracking</h2>
            <p>
              The site uses minimal first-party cookies for routing and analytics. We do not run advertising trackers,
              session recorders, or chat widgets. If you have your browser set to block cookies, the site still works.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Your rights</h2>
            <p>
              You can ask for a copy of any information we have about you, or ask us to delete it, by emailing{' '}
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>. We&apos;ll respond within 30 days.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Contact</h2>
            <p>
              Privacy questions: <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>
              <br />Mail: {site.name}, {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              <br />Phone: <a href={`tel:${site.phoneRaw}`} className="text-accent hover:underline">{site.phoneDisplay}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
