import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/config/site'
import './funnel.css'

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="funnel">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="funnel-header">
        <div className="site-container funnel-header-inner">
          <Image
            className="funnel-logo"
            src="/brand/strykora-horizontal-color.svg"
            alt={site.name}
            width={1322}
            height={254}
            sizes="(min-width: 1024px) 333px, (min-width: 640px) 250px, (min-width: 390px) 198px, 51vw"
            loading="eager"
          />
          <a href={`tel:${site.phoneRaw}`} className="text-link">{site.phoneDisplay}</a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="funnel-footer">
        <div className="site-container funnel-footer-inner">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span aria-hidden="true">·</span>
          <span>strykora.com</span>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="text-link" prefetch={false}>Privacy</Link>
        </div>
      </footer>
    </div>
  )
}
