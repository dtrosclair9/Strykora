import type { Metadata } from 'next'
import { site, ogImage } from '@/config/site'
import HvcoOptInPage from '@/components/HvcoOptInPage'
import { Schema } from '@/components/Schema'

const title = '9 Questions To Ask A Web Company Before You Pay Them'
const description =
  'A free checklist for contractors. Nine questions that tell you who owns your website, your domain and your hosting, and what a straight answer to each one sounds like. No card.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/9-questions` },
  openGraph: {
    title,
    description,
    url: `${site.url}/9-questions`,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [ogImage],
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/9-questions`,
  url: `${site.url}/9-questions`,
  name: title,
  description,
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#business` },
}

export default function NineQuestionsPage() {
  return (
    <>
      <Schema data={pageSchema} />
      <HvcoOptInPage
        config={{
          niche: 'general',
          eyebrow: 'Free checklist · trade businesses',
          h1: '9 questions to ask a web company before you pay them a dollar.',
          subhead:
            'Number 6 is the one that decides whether you own anything. Every question came out of a real complaint filed by a real business owner, and most of them you can check yourself in about ten minutes.',
        }}
      />
    </>
  )
}
