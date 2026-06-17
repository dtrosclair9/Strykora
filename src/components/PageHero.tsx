import Link from 'next/link'
import Reveal from './Reveal'
import { Schema, breadcrumbSchema } from './Schema'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { href: string; label: string }[]
}

export default function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 1 && (
        <Schema data={breadcrumbSchema(breadcrumbs)} />
      )}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl opacity-30" aria-hidden="true" />

        <div className="relative container-wide">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6 flex items-center gap-2 text-sm text-text-dim" aria-label="Breadcrumb">
              {breadcrumbs.map((b, i) => (
                <div key={b.href} className="flex items-center gap-2">
                  <Link href={b.href} className="hover:text-text transition-colors">{b.label}</Link>
                  {i < breadcrumbs.length - 1 && <span className="opacity-50">/</span>}
                </div>
              ))}
            </nav>
          )}
          <Reveal as="div" stagger className="max-w-4xl space-y-5">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">{title}</h1>
            {description && (
              <p className="text-lg md:text-xl text-text-muted text-balance leading-relaxed max-w-3xl">{description}</p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
