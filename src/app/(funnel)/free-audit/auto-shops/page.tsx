import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Website & AI-Search Audit for Louisiana Auto Shops',
  description:
    'The customer pricing a lift kit or full tint checks whether your shop looks like a real operation before they call. Find out what they see. Free, one business day.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function AutoShopsAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'auto-shops',
        eyebrow: 'Free audit · Louisiana auto shops',
        h1: 'Free website and AI-search audit for Louisiana auto shops.',
        lede:
          'Your Instagram is not your website. The customer pricing a lift kit or a full tint checks whether you look like a real operation before they call. Within one business day, Dayne sends back what that customer sees, whether Google and ChatGPT name your shop for the service and the city, and the three fixes that matter.',
        reviewAuthors: ['Reed Babin', 'Colin Richard'],
        winSlugs: ['all-out-window-tint', 'elite-custom-automotive'],
      }}
    />
  )
}
