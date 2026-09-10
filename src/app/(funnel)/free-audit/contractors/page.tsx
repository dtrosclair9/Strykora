import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Website & AI-Search Audit for Louisiana Contractors',
  description:
    'Word of mouth built your business. Find out what the next customer sees when they look you up, and the three fixes that matter. Free, one business day.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function ContractorsAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'contractors',
        eyebrow: 'Free audit · Louisiana contractors',
        h1: 'Free website and AI-search audit for Louisiana contractors.',
        lede:
          'Word of mouth built your business, and Google cannot see any of it. Within one business day, Dayne sends back what somebody vetting you online actually finds, whether Google and ChatGPT name your company for the trade you do in the cities you work, and the three fixes that matter.',
        reviewAuthors: ['Branton Vicknair', 'Jacob Foret'],
        winSlugs: ['foret-construction', 'acadia-pools'],
      }}
    />
  )
}
