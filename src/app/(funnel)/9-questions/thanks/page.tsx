import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelNextSteps from '@/components/FunnelNextSteps'

export const metadata: Metadata = {
  title: 'Your copy of the 9 questions',
  description: `Download the 9 questions to ask a web company before you pay them, from ${site.name}. Here is what happens next.`,
  alternates: { canonical: `${site.url}/9-questions/thanks` },
  robots: { index: false, follow: false },
}

const steps = [
  {
    n: '1',
    title: 'A copy is on its way to your inbox',
    body: 'It comes from Dayne, not from a no-reply address. If it does not turn up, look in spam and promotions. You do not have to wait on it either way, the download is right above.',
  },
  {
    n: '2',
    title: 'Do number 4 today',
    body: 'Email whoever runs your website right now and ask for the login, in writing. How fast it comes back, and whether it works, tells you most of what you need to know.',
  },
  {
    n: '3',
    title: 'If an answer worries you, ask me',
    body: 'Reply to the email with your website address and I will take a look. There is no pressure either way.',
  },
]

export default function NineQuestionsThanksPage() {
  return (
    <section className="funnel-receipt funnel-download" aria-labelledby="guide-thanks-title">
      <div className="funnel-download-intro">
        <div className="site-container funnel-receipt-intro">
          <p className="eyebrow hero-eyebrow">Ready</p>
          <h1 id="guide-thanks-title" className="ledger-hero-title">Got it. Here are the 9 questions.</h1>
          <p className="funnel-lede">Open it now, or keep the copy that is on its way to your inbox.</p>
          <a href="/9-questions-strykora.pdf" className="btn-conversion" target="_blank" rel="noopener" download>
            Download the 9 questions (PDF)
          </a>
        </div>
      </div>
      <div className="site-container funnel-download-followup">
        <FunnelNextSteps steps={steps} />
      </div>
    </section>
  )
}
