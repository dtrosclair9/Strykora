import Link from 'next/link'
import Reveal from './Reveal'
import { site } from '@/config/site'

interface CTAProps {
  heading?: string
  body?: string
}

export default function CTA({
  heading = `Stop renting a website you'll never own.`,
  body = `Tell me about your business in 60 seconds. I'll send back a candid take, including whether Strykora is the right fit, and a fixed-price quote within one business day. No sales call, no pressure.`,
}: CTAProps) {
  return (
    <section className="section-padding" aria-label="Call to action">
      <div className="container-wide">
        <Reveal>
          <div className="relative gradient-border">
            <div className="grid-pattern p-12 md:p-20 text-center">
              <p className="eyebrow mb-4">Ready when you are</p>
              <h2 className="text-display-md font-display text-text mb-6 text-balance max-w-3xl mx-auto">{heading}</h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">{body}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary">Start a project</Link>
                <a href={`tel:${site.phoneRaw}`} className="btn-secondary">Call {site.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
