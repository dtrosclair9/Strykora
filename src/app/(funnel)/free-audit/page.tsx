import type { Metadata } from 'next'
import { site, ogImage } from '@/config/site'
import FunnelAuditPage, { funnelFaqs } from '@/components/FunnelAuditPage'
import { Schema, faqSchema } from '@/components/Schema'

const title = 'Free Homepage Rebuild for Trade Businesses'
const description =
  "Send your website and Dayne rebuilds your homepage for free, on a private link, so you can see it before deciding anything. Custom builds start at $3,750 and you own every file. No sales call."

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
  name: 'Free homepage rebuild',
  serviceType: 'Website design',
  provider: { '@id': `${site.url}/#business` },
  areaServed: [
    { '@type': 'State', name: 'Louisiana' },
    { '@type': 'State', name: 'Mississippi' },
    { '@type': 'State', name: 'Alabama' },
    { '@type': 'State', name: 'Texas' },
  ],
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
          eyebrow: 'Free homepage rebuild · trade businesses',
          h1: "I'll rebuild your homepage for free.",
          lede:
            "Send your website and I'll rebuild your homepage, free, on a private link you can open on your phone. Not a report about your site. The page itself, built for your business, so you can see the work before you decide anything. I'm Dayne, and I build these out of Thibodaux, Louisiana.",
          reviewAuthors: ['Timothy Caillouet', 'Reed Babin'],
          winSlugs: ['hover-septic', 'all-out-window-tint'],
        }}
      />
    </>
  )
}
