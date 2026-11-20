import Image from 'next/image'
import Link from 'next/link'
import { cities, comboSlugFor, services, site } from '@/config/site'
import ChamberBadge from './ChamberBadge'

type FooterLink = { href: string; label: string }

const serviceLinks = [
  ...services.map(({ slug, title }) => ({ href: `/services/${slug}`, label: title })),
  { href: '/services', label: 'All services' },
]

const cityLinks = cities.flatMap(({ slug, name }) => {
  const page =
    comboSlugFor('web-design', slug) ??
    comboSlugFor('seo', slug) ??
    comboSlugFor('google-ads', slug)
  return page ? [{ href: `/${page}`, label: name }] : []
})

const companyLinks = [
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/industries', label: 'Industries' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

function FooterLinks({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="eyebrow">{heading}</h3>
      <ul role="list">
        {links.map(({ href, label }) => (
          <li key={href}><Link href={href} prefetch={false}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer surface-dark">
      <div className="site-container">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo" prefetch={false}>
              <Image
                src="/brand/strykora-stacked-color-on-dark.svg"
                alt="Strykora home"
                width={1000}
                height={701}
                sizes="(min-width: 1024px) 208px, 176px"
              />
            </Link>
            <p>{site.tagline}</p>
            <p>Built in {site.address.city}, {site.address.state}. Serving Louisiana businesses statewide.</p>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <div className="site-footer-directory">
            <FooterLinks heading="Services" links={serviceLinks} />
            <FooterLinks heading="Cities" links={cityLinks} />
            <FooterLinks heading="Company" links={companyLinks} />
            <div>
              <h3 className="eyebrow">Contact</h3>
              <ul role="list">
                <li><a href={`tel:${site.phoneRaw}`}>{site.phoneDisplay}</a></li>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              </ul>
              <address>
                {site.address.street}<br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <ChamberBadge />
            </div>
          </div>
        </div>
        <div className="site-footer-base">
          <div>
            <p>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
            <p>Custom-built websites and local SEO for Louisiana businesses.</p>
          </div>
          <div className="site-footer-legal">
            <Link href="/privacy" prefetch={false}>Privacy</Link>
            <Link href="/accessibility" prefetch={false}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
