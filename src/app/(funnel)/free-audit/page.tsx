import type { Metadata } from 'next'
import { site, ogImage } from '@/config/site'
import FunnelAuditPage, { funnelFaqs } from '@/components/FunnelAuditPage'
import { Schema, faqSchema } from '@/components/Schema'

const title = 'Free Website & AI-Search Audit for Louisiana Businesses'
const description =
  'Send your business name and current site. Within one business day Dayne sends back what is costing you calls, whether Google and ChatGPT can find you, and the three fixes that matter. No sales call.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/free-audit` },
  openGraph: {
    title,
    description,
    url: `${site.url}/free-audit`,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [ogImage],
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/free-audit`,
  url: `${site.url}/free-audit`,
  name: title,
  description,
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#business` },
}

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free website and AI-search audit',
  serviceType: 'Website audit',
  provider: { '@id': `${site.url}/#business` },
  areaServed: { '@type': 'State', name: 'Louisiana' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: `${site.url}/free-audit` },
  description,
}

export default function FreeAuditPage() {
  return (
    <>
      <Schema data={pageSchema} />
      <Schema data={offerSchema} />
      <Schema data={faqSchema(funnelFaqs)} />
      <FunnelAuditPage
        config={{
          niche: 'general',
          eyebrow: 'Free audit · Louisiana businesses',
          h1: 'Free website and AI-search audit for Louisiana businesses.',
          lede:
            'Send your business name and your current site. Within one business day, Dayne sends back what is costing you calls, whether Google and ChatGPT can find you, and the three fixes that matter. Written by hand, for your business, in your city.',
          reviewAuthors: ['Timothy Caillouet', 'Reed Babin'],
          winSlugs: ['hover-septic', 'all-out-window-tint'],
        }}
      />
    </>
  )
}
