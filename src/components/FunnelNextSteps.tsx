import Link from 'next/link'
import { site } from '@/config/site'

type Step = { n: string; title: string; body: string }

export default function FunnelNextSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="funnel-next">
      <ol className="funnel-next-steps" role="list">
        {steps.map(({ n, title, body }) => (
          <li key={n}>
            <span className="funnel-index-number" aria-hidden="true">{n}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="action-row">
        <a href={`tel:${site.phoneRaw}`} className="text-link">Call {site.phoneDisplay}</a>
        <Link href="/case-studies" className="text-link" prefetch={false}>See the case studies</Link>
      </div>
    </div>
  )
}
