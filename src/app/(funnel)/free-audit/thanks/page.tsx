import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import Reveal from '@/components/Reveal'

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
    <section className="relative pt-32 md:pt-40 pb-24 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
      <div className="relative container-wide max-w-3xl">
        <Reveal as="div" stagger className="space-y-5">
          <p className="eyebrow">Request received</p>
          <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">
            Got it. Your audit is on the way.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Thanks for sending it. Here is exactly what happens from here.
          </p>
        </Reveal>

        <ol className="mt-12 space-y-4">
          {steps.map((s) => (
            <li key={s.n}>
              <Reveal className="card p-6 flex gap-5">
                <span className="font-mono text-accent text-sm pt-1 shrink-0" aria-hidden="true">{s.n}</span>
                <div>
                  <h2 className="text-lg font-display text-text mb-2">{s.title}</h2>
                  <p className="text-text-muted text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <a href={`tel:${site.phoneRaw}`} className="btn-primary">Call {site.phoneDisplay}</a>
          <Link href="/case-studies" className="btn-secondary">See the case studies</Link>
        </Reveal>
      </div>
    </section>
  )
}
