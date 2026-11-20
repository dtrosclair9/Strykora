import Link from 'next/link'
import ProjectActions from './ProjectActions'
import { Schema, breadcrumbSchema } from './Schema'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { href: string; label: string }[]
  actions?: boolean
}

export default function PageHero({ eyebrow, title, description, breadcrumbs, actions }: PageHeroProps) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 1 && <Schema data={breadcrumbSchema(breadcrumbs)} />}
      <section className="ledger-hero border-b border-bayou-hairline" aria-labelledby="page-title">
        <div className="site-container">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="page-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                {breadcrumbs.map(({ href, label }, index) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-link"
                      prefetch={false}
                      aria-current={index === breadcrumbs.length - 1 && breadcrumbs.length > 1 ? 'page' : undefined}
                      title={index === breadcrumbs.length - 1 ? label : undefined}
                    >
                      {label}
                    </Link>
                    {index < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="ledger-hero-content">
            {eyebrow && <p className="eyebrow hero-eyebrow">{eyebrow}</p>}
            <h1 id="page-title" className="ledger-hero-title">{title}</h1>
            {description && <p className="ledger-hero-description last:mb-0">{description}</p>}
            {actions && <ProjectActions />}
          </div>
        </div>
      </section>
    </>
  )
}
