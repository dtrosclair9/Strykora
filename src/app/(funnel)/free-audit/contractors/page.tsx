import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Homepage Rebuild for Contractors',
  description:
    'Send your website and I\'ll rebuild your homepage for free so you can see it before you decide anything. Custom builds start at $3,750 and you own every file.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function ContractorsAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'contractors',
        eyebrow: 'Free homepage rebuild · for contractors',
        h1: "I'll rebuild your contracting homepage for free.",
        lede:
          'If the person who built your website stopped answering tomorrow, could you keep it running? A lot of owners find out too late that they do not have the files. Send me your website address and I\'ll rebuild your homepage for free so you can see it. I\'m Dayne, I build these out of Thibodaux, Louisiana, and one of mine, Foret Construction & Roofing, came off a rented template site. Jacob owns every file of what replaced it.',
        reviewAuthors: ['Branton Vicknair', 'Jacob Foret'],
        winSlugs: ['foret-construction', 'acadia-pools'],
      }}
    />
  )
}
