import Link from 'next/link'
import { services, cities, site, comboSlugFor } from '@/config/site'
import ChamberBadge from './ChamberBadge'

const footerCityLinks = cities
  .map((c) => {
    // Prefer the web-design page for each city, fall back to whichever combo exists.
    const preferred =
      comboSlugFor('web-design', c.slug) ??
      comboSlugFor('seo', c.slug) ??
      comboSlugFor('google-ads', c.slug)
    return preferred ? { city: c, slug: preferred } : null
  })
  .filter((x): x is { city: typeof cities[number]; slug: string } => x !== null)

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated" role="contentinfo">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight">{site.name}</Link>
            <p className="mt-4 text-text-muted text-sm leading-relaxed max-w-sm">{site.tagline}</p>
            <p className="mt-6 text-text-dim text-sm">
              Built in <span className="text-text-muted">{site.address.city}, {site.address.state}</span>.
              Serving Louisiana businesses statewide.
            </p>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-text-muted hover:text-text transition-colors text-sm"
              aria-label={`${site.name} on Facebook`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-text-muted hover:text-text transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Cities</h3>
            <ul className="space-y-3">
              {footerCityLinks.map(({ city, slug }) => (
                <li key={city.slug}>
                  <Link href={`/${slug}`} className="text-sm text-text-muted hover:text-text transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/case-studies" className="text-sm text-text-muted hover:text-text transition-colors">Case Studies</Link></li>
              <li><Link href="/industries" className="text-sm text-text-muted hover:text-text transition-colors">Industries</Link></li>
              <li><Link href="/about" className="text-sm text-text-muted hover:text-text transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-text-muted hover:text-text transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-text-muted hover:text-text transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="text-sm text-text-muted hover:text-text transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${site.phoneRaw}`} className="text-text-muted hover:text-text transition-colors">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-text-muted hover:text-text transition-colors break-all">
                  {site.email}
                </a>
              </li>
              <li className="text-text-muted">
                {site.address.street}<br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <ChamberBadge />
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-text-dim">
            <p>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
            <span className="hidden sm:inline">·</span>
            <p>Built on Next.js. Hosted on Vercel.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
