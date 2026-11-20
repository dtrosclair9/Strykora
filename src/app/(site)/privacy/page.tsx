import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import '../editorial.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name}, the Louisiana web design and SEO studio: what we collect through the contact form and analytics, what we don't, and how we use it.`,
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: false },
}

const updated = 'November 20, 2026'

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

      <div className="ledger-section site-container policy-rows policy-privacy">
        <section aria-labelledby="what-we-collect">
          <h2 id="what-we-collect">What we collect</h2>
          <div className="editorial-copy">
            <p>
              {site.name} collects only what you give us through the contact form or the free-audit form on this site:
              your name, business name, email, phone, service of interest, your current website address, and your project
              message. We also collect standard server logs (IP, browser, page visited, timestamp) that any web host
              stores automatically for security and analytics.
            </p>
          </div>
        </section>

        <section aria-labelledby="third-party-services-we-use">
          <h2 id="third-party-services-we-use">Third-party services we use</h2>
          <div className="editorial-copy">
            <ul>
              <li><strong>Formspree</strong>: handles contact form submissions; relays the email to {site.email}.</li>
              <li><strong>Resend</strong>: sends the emails for the free homepage rebuild and the 9-questions checklist (your confirmation, and the notice to {site.owner}).</li>
              <li><strong>Vercel</strong>: hosts the site and stores standard request logs. Vercel Web Analytics and Speed Insights count page views and measure load speed without cookies.</li>
              <li><strong>Google Search Console</strong>: reports how the site appears in Google search. It does not run on your device.</li>
              <li><strong>Thibodaux Chamber of Commerce</strong>: the membership badge in the footer loads from the Chamber&apos;s directory service (ChamberMaster).</li>
              <li><strong>Meta Pixel</strong> (Facebook and Instagram): records that a page was viewed and that a homepage rebuild or checklist request was completed, so we can tell whether our Facebook ads are working. Meta may match that activity to your Facebook or Instagram account under its own privacy policy. You can limit this in your Facebook ad settings or with a browser tracker blocker; the site works either way.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="how-we-use-it">
          <h2 id="how-we-use-it">How we use it</h2>
          <div className="editorial-copy">
            <p>
              The information you submit is used to respond to your project inquiry and decide whether we&apos;re a fit. We don&apos;t
              sell, rent, or share your data. We don&apos;t add you to a marketing list without your permission.
            </p>
          </div>
        </section>

        <section aria-labelledby="cookies-tracking">
          <h2 id="cookies-tracking">Cookies & tracking</h2>
          <div className="editorial-copy">
            <p>
              The site uses minimal first-party cookies for routing and analytics, plus the Meta Pixel described above,
              which sets a Meta cookie to measure our Facebook and Instagram ads. We do not run session recorders or
              chat widgets. If you have your browser set to block cookies or trackers, the site still works.
            </p>
          </div>
        </section>

        <section aria-labelledby="your-rights">
          <h2 id="your-rights">Your rights</h2>
          <div className="editorial-copy">
            <p>
              You can ask for a copy of any information we have about you, or ask us to delete it, by emailing{' '}
              <a href={`mailto:${site.email}`} className="policy-link">{site.email}</a>. We&apos;ll respond within 30 days.
            </p>
          </div>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact">Contact</h2>
          <div className="editorial-copy">
            <p>
              Privacy questions: <a href={`mailto:${site.email}`} className="policy-link policy-contact-link">{site.email}</a>
              <br />Mail: {site.name}, {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              <br />Phone: <a href={`tel:${site.phoneRaw}`} className="policy-link policy-contact-link">{site.phoneDisplay}</a>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
