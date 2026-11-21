import Image from 'next/image'
import Link from 'next/link'
import { industries, services, site } from '@/config/site'
import SiteNavigation, { type NavItem } from './SiteNavigation'

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/services',
    label: 'Services',
    children: [
      { href: '/services', label: 'All services' },
      ...services.map(({ slug, title, eyebrow }) => ({
        href: `/services/${slug}`,
        label: title,
        description: eyebrow,
      })),
    ],
  },
  {
    href: '/industries',
    label: 'Industries',
    children: [
      { href: '/industries', label: 'All industries' },
      ...industries.map(({ slug, title, short }) => ({
        href: `/industries/${slug}`,
        label: title,
        description: `${short.split('.')[0]}.`,
      })),
    ],
  },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-logo" prefetch={false}>
          <Image
            src="/brand/strykora-marketing-head-horizontal-navy.svg"
            alt="Strykora Marketing home"
            width={2901}
            height={559}
            sizes="(min-width: 1024px) 374px, (min-width: 640px) 332px, 291px"
            loading="eager"
          />
        </Link>
        <SiteNavigation items={navItems} phoneHref={`tel:${site.phoneRaw}`} phoneLabel={site.phoneDisplay} />
      </div>
    </header>
  )
}
