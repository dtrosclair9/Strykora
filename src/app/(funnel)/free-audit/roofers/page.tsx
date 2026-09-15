import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Homepage Rebuild for Roofers',
  description:
    'Send your website and I\'ll rebuild your homepage for free so you can see it before you decide anything. Custom builds start at $3,750 and you own every file.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function RoofersAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'roofers',
        eyebrow: 'Free homepage rebuild · for roofers',
        h1: "I'll rebuild your roofing homepage for free.",
        lede:
          'Open your website on your phone and try to hire yourself. Can you find the work you do, see a roof you put on, and get to the phone number without hunting for it? Send me the address and I\'ll rebuild that page for you, free, so you can run the same test on it. I\'m Dayne, I build these out of Thibodaux, Louisiana, and one of the roofing companies I rebuilt, Foret Construction & Roofing, had been renting a template site with stock photos on it.',
        reviewAuthors: ['Jacob Foret', 'Timothy Caillouet'],
        winSlugs: ['foret-construction', 'hover-septic'],
      }}
    />
  )
}
