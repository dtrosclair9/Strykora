import type { Metadata } from 'next'
import Link from 'next/link'
import { services, industries, site } from '@/config/site'
import './(site)/editorial.css'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: `That page doesn't exist on ${site.name}. Try a service, an industry, or the homepage.`,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main>
      <section className="ledger-hero" aria-labelledby="not-found-title">
        <div className="site-container">
          <div className="ledger-hero-content">
            <p className="eyebrow hero-eyebrow">404 · Not found</p>
            <h1 id="not-found-title" className="ledger-hero-title">That page doesn&apos;t exist on Strykora.</h1>
            <p className="ledger-hero-description">
              Maybe a typo, a stale link, or a page that moved during a rebuild. Pick a starting point below, or head back to the homepage and look around.
            </p>
            <div className="action-row">
              <Link href="/" className="btn-primary">Back to home</Link>
              <Link href="/contact" className="btn-secondary">Tell me what you were looking for</Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="not-found-directory surface-dark" aria-label="Services and industries">
        <div className="site-container">
          <div>
            <p className="eyebrow">Services</p>
            <ul role="list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <strong>{service.title}</strong>
                    <span>{service.priceRange}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Industries</p>
            <ul role="list">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`}><strong>{industry.title}</strong></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </main>
  )
}
