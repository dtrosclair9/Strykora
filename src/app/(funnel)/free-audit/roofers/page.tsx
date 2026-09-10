import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Website & AI-Search Audit for Louisiana Roofers',
  description:
    'The homeowner with the leak calls the first roofer that looks legit. Find out what they see when they find you, and the three fixes that matter. Free, one business day.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function RoofersAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'roofers',
        eyebrow: 'Free audit · Louisiana roofers',
        h1: 'Free website and AI-search audit for Louisiana roofers.',
        lede:
          'The homeowner with the leak is on their phone right now, and they will call the first roofer that looks legit. Within one business day, Dayne sends back what that homeowner sees when they find you, whether Google and ChatGPT name your company for roof replacement in your city, and the three fixes that matter.',
        reviewAuthors: ['Jacob Foret', 'Timothy Caillouet'],
        winSlugs: ['foret-construction', 'hover-septic'],
      }}
    />
  )
}
