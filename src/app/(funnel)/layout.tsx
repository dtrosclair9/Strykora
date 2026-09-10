import Link from 'next/link'
import { site } from '@/config/site'

/**
 * Ad-landing chrome: no nav, no street address, no exits except the privacy
 * policy Meta requires. The wordmark is plain text on purpose so paid traffic
 * has exactly one thing to do on the page.
 */
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="border-b border-border">
        <div className="container-wide py-4 flex items-center justify-between">
          <p className="font-display text-lg tracking-tight text-text">{site.name}</p>
          <a href={`tel:${site.phoneRaw}`} className="text-sm text-text-muted hover:text-text transition-colors">
            {site.phoneDisplay}
          </a>
        </div>
      </div>
      <main id="main">{children}</main>
      <footer className="border-t border-border">
        <div className="container-wide py-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-text-dim">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span aria-hidden="true">·</span>
          <span>strykora.com</span>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link>
        </div>
      </footer>
    </>
  )
}
