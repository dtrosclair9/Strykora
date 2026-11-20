import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelNextSteps from '@/components/FunnelNextSteps'

export const metadata: Metadata = {
  title: 'Homepage rebuild request received',
  description: `Your free homepage rebuild request reached ${site.name}. Here is what happens next and when the private link arrives.`,
  alternates: { canonical: `${site.url}/free-audit/thanks` },
  robots: { index: false, follow: false },
}

const steps = [
  {
    n: '1',
    title: 'Dayne looks at what you sent',
    body: 'On a phone, the way a customer would. If anything is missing or looks out of date, you get an email to check it before the build starts.',
  },
  {
    n: '2',
    title: 'Your homepage arrives on a private link',
    body: 'Within three business days of the details being confirmed. Open it on your phone. It is yours to keep either way. If the email does not show up, check spam, then call and it gets resent.',
  },
  {
    n: '3',
    title: 'You decide what happens next',
    body: 'Keep it, sit on it, or show it to somebody else. If you want to talk it through, the number is below.',
  },
]

export default function AuditThanksPage() {
  return (
    <section className="funnel-receipt" aria-labelledby="audit-thanks-title">
      <div className="site-container funnel-receipt-layout">
        <div className="funnel-receipt-intro">
          <p className="eyebrow hero-eyebrow">Request received</p>
          <h1 id="audit-thanks-title" className="ledger-hero-title">Got it. Your homepage is next.</h1>
          <p className="funnel-lede">Thanks for sending it. Here is exactly what happens from here.</p>
        </div>
        <FunnelNextSteps steps={steps} />
      </div>
    </section>
  )
}
