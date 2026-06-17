import type { Metadata } from 'next'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { Schema } from '@/components/Schema'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start a web design or SEO project with ${site.name}. Based in ${site.address.city}, LA. We respond within 24 hours.`,
  alternates: { canonical: `${site.url}/contact` },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${site.url}/contact`,
  mainEntity: { '@id': `${site.url}/#business` },
}

export default function ContactPage() {
  return (
    <>
      <Schema data={schema} />
      <PageHero
        eyebrow="Contact"
        title="Tell me about your project."
        description="A short note is all I need to send back a candid take — including whether Strykora is the right fit — plus a fixed-price quote. One business day, no sales call, no pressure."
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
                  <li>2. I read it, look at your current site, and write back within 24 hours.</li>
                  <li>3. If we&apos;re a fit, I send a fixed-price quote and timeline. No pressure, no auto-billing.</li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
