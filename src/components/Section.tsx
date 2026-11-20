import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow: string
  heading: ReactNode
  description?: ReactNode
  className?: string
  children?: ReactNode
}

export default function Section({ id, eyebrow, heading, description, className = '', children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={`ledger-section ${className}`}>
      <div className="site-container">
        <div className="ledger-section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId}>{heading}</h2>
          {description && <p className="ledger-section-intro">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
