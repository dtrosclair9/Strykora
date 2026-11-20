import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelNextSteps from '@/components/FunnelNextSteps'

export const metadata: Metadata = {
  title: 'Audit request received',
  description: `Your free website and AI-search audit request reached ${site.name}. Here is what happens next.`,
  alternates: { canonical: `${site.url}/free-audit/thanks` },
  robots: { index: false, follow: false },
}

const steps = [
  {
    n: '1',
    title: 'Dayne pulls up your site and your Google Business Profile',
    body: 'On a phone, the way a customer would. Then checks whether Google, the AI answer at the top of Google, and ChatGPT name your business for your main service in your city.',
  },
  {
    n: '2',
    title: 'You get the audit by email within one business day',
    body: 'Three fixes in plain English, and a fixed price if you want them done. If it is not in your inbox by then, check spam, then call and it gets resent.',
  },
  {
    n: '3',
    title: 'You decide what happens next',
    body: 'Read it, sit on it, or take the list somewhere else. If you want to talk it through, the number is below.',
  },
]

export default function AuditThanksPage() {
  return (
    <section className="funnel-receipt" aria-labelledby="audit-thanks-title">
      <div className="site-container funnel-receipt-layout">
        <div className="funnel-receipt-intro">
          <p className="eyebrow hero-eyebrow">Request received</p>
          <h1 id="audit-thanks-title" className="ledger-hero-title">Got it. Your audit is on the way.</h1>
          <p className="funnel-lede">Thanks for sending it. Here is exactly what happens from here.</p>
        </div>
        <FunnelNextSteps steps={steps} />
      </div>
    </section>
  )
}
