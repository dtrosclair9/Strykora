import type { ReactNode } from 'react'
import Image from 'next/image'
import ProjectActions from './ProjectActions'
import Section from './Section'

interface CTAProps {
  /** Every page writes its own close. A shared default ended up word-for-word on 36 pages. */
  heading: ReactNode
  body: string
  eyebrow?: string
  projectLabel?: string
  phoneLabel?: string
  showMark?: boolean
}

export default function CTA({
  heading,
  body,
  eyebrow = 'Get in touch',
  projectLabel,
  phoneLabel,
  showMark = false,
}: CTAProps) {
  return (
    <Section id="cta" className="closing-band surface-dark" eyebrow={eyebrow} heading={heading} description={body}>
      <ProjectActions projectLabel={projectLabel} phoneLabel={phoneLabel} />
      {showMark && (
        <Image
          className="closing-band-mark"
          src="/brand/strykora-bird-color-on-dark.svg"
          alt=""
          width={2185}
          height={2053}
          sizes="(min-width: 1382px) 304px, (min-width: 1024px) 22vw, (min-width: 471px) 160px, (min-width: 353px) 34vw, 120px"
        />
      )}
    </Section>
  )
}
