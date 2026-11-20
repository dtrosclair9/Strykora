import type { ReactNode } from 'react'
import Link from 'next/link'
import { site } from '@/config/site'

type ProjectActionsProps = {
  projectLabel?: string
  phoneLabel?: string
  children?: ReactNode
}

export default function ProjectActions({
  projectLabel = 'Start a project',
  phoneLabel = `Call ${site.phoneDisplay}`,
  children,
}: ProjectActionsProps) {
  return (
    <div className="action-row project-actions">
      <Link href="/contact" className="btn-conversion" prefetch={false}>{projectLabel}</Link>
      <a href={`tel:${site.phoneRaw}`} className="btn-secondary">{phoneLabel}</a>
      {children}
    </div>
  )
}
