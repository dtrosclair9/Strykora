import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'The 9 questions are on the way',
  description: `Your copy of the 9 questions is on its way from ${site.name}. Here is what happens next.`,
  alternates: { canonical: `${site.url}/9-questions/thanks` },
  robots: { index: false, follow: false },
}

const steps = [
  {
    n: '1',
    title: 'Check your inbox in about a minute',
    body: 'It comes from Dayne, not from a no-reply address. If it is not there, look in spam and promotions, then call and it gets resent.',
  },
  {
    n: '2',
    title: 'Do number 4 today',
    body: 'Email whoever runs your website right now and ask for the login, in writing. How fast it comes back, and whether it works, tells you most of what you need to know.',
  },
  {
    n: '3',
    title: 'I will send a couple more notes, then leave you alone',
    body: 'One on the five things that quietly cost contractors calls, and one with the exact email to send if it turns out you do not own your site. Then that is it. The unsubscribe works.',
  },
]

export default function NineQuestionsThanksPage() {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 mask-fade-bottom" aria-hidden="true" />
      <div className="relative container-wide max-w-3xl">
        <Reveal as="div" stagger className="space-y-5">
          <p className="eyebrow">On the way</p>
          <h1 className="text-display-lg font-display text-text text-balance leading-[1.02]">
            Got it. Check your email in a minute.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Here is exactly what happens from here.
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
