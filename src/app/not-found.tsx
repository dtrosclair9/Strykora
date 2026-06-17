import type { Metadata } from 'next'
import Link from 'next/link'
import { services, industries, site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: `That page doesn't exist on ${site.name}. Try a service, an industry, or the homepage.`,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center section-padding">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404 · Not found</p>
          <h1 className="text-display-lg font-display text-text text-balance leading-[1.05]">
            That page <span className="gradient-text">doesn&apos;t exist</span> on Strykora.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-xl">
            Maybe a typo, a stale link, or a page that moved during a rebuild. Pick a starting point below, or head back to the homepage and look around.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Tell me what you were looking for
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5 grid grid-cols-1 gap-5">
          <div className="card p-6">
            <p className="eyebrow mb-4">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-text-muted hover:text-text transition-colors flex items-center justify-between gap-3">
                    <span>{s.title}</span>
                    <span className="text-text-dim font-mono text-xs">{s.priceRange}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow mb-4">Industries</p>
            <ul className="space-y-2.5">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="text-sm text-text-muted hover:text-text transition-colors">
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
