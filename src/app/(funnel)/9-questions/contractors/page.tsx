import type { Metadata } from 'next'
import { site, ogImage } from '@/config/site'
import HvcoOptInPage from '@/components/HvcoOptInPage'
import { Schema } from '@/components/Schema'

const title = '9 Questions Contractors Should Ask Before Paying A Web Company'
const description =
  'A free checklist for contractors. Nine questions that tell you who owns your website, your domain and your hosting, and what a straight answer to each one sounds like. No card.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/9-questions/contractors` },
  openGraph: {
    title,
    description,
    url: `${site.url}/9-questions/contractors`,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [ogImage],
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/9-questions/contractors`,
  url: `${site.url}/9-questions/contractors`,
  name: title,
  description,
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#business` },
}

export default function NineQuestionsContractorsPage() {
  return (
    <>
      <Schema data={pageSchema} />
      <HvcoOptInPage
        config={{
          niche: 'contractors',
          eyebrow: 'Free checklist · contractors',
          h1: 'Contractors: 9 questions to ask a web company before you pay them a dollar.',
          subhead:
            'Number 6 is the one that decides whether you own anything. Every question came out of a real complaint filed by a real business owner, and most of them you can check yourself in about ten minutes.',
        }}
      />
    </>
  )
}
