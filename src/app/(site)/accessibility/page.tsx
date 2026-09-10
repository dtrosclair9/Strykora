import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: `Accessibility statement for ${site.name}: our commitment to WCAG 2.2 AA, the steps we take, and how to report an accessibility barrier.`,
  alternates: { canonical: `${site.url}/accessibility` },
  robots: { index: true, follow: false },
}

const updated = 'July 11, 2026'

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility Statement"
        description={`Last updated ${updated}.`}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/accessibility', label: 'Accessibility' },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow prose-strykora space-y-10 text-text-muted leading-relaxed">
          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Our commitment</h2>
            <p>
              {site.name} is committed to making this website usable by everyone, including people who rely on
              assistive technology such as screen readers, keyboard-only navigation, and screen magnification. We aim
              to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, the standard referenced by the
              Americans with Disabilities Act (ADA) for web accessibility.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">What we do</h2>
            <ul className="list-disc list-inside space-y-2 marker:text-accent">
              <li>Color combinations are checked to meet WCAG AA contrast ratios for text and interactive elements.</li>
              <li>Every page can be operated with a keyboard, with a visible focus indicator and a skip-to-content link.</li>
              <li>Images carry descriptive alternative text, and icons that convey meaning are labeled for screen readers.</li>
              <li>Headings follow a logical order and form fields have associated labels.</li>
              <li>We test with automated accessibility tooling and correct issues as we find them.</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Ongoing effort</h2>
            <p>
              Accessibility is an ongoing effort, not a one-time fix. As we add pages and features, we re-test against
              WCAG 2.2 AA. If any part of this site presents a barrier, we treat it as a defect and prioritize a fix.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-display text-text mb-3">Report an accessibility barrier</h2>
            <p>
              If you run into any difficulty using this site, or need information in a different format, please tell us
              and we will help. Describe the page and the problem, and we will respond within five business days.
            </p>
            <p>
              Email: <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>
              <br />Phone: <a href={`tel:${site.phoneRaw}`} className="text-accent hover:underline">{site.phoneDisplay}</a>
              <br />Mail: {site.name}, {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
