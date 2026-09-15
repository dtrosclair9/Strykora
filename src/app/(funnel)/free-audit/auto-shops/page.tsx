import type { Metadata } from 'next'
import { site } from '@/config/site'
import FunnelAuditPage from '@/components/FunnelAuditPage'

export const metadata: Metadata = {
  title: 'Free Homepage Rebuild for Auto Shops',
  description:
    'Send your website and I\'ll rebuild your homepage for free so you can see it before you decide anything. Custom builds start at $3,750 and you own every file.',
  alternates: { canonical: `${site.url}/free-audit` },
  robots: { index: false, follow: true },
}

export default function AutoShopsAuditPage() {
  return (
    <FunnelAuditPage
      config={{
        niche: 'auto-shops',
        eyebrow: 'Free homepage rebuild · for auto shops',
        h1: "I'll rebuild your shop's homepage for free.",
        lede:
          'Your social page is not a website, and the work you put into it belongs to somebody else. Send me whatever you have, a website or just your business page, and I\'ll rebuild your homepage for free so you can see what your shop looks like when it is presented properly. I\'m Dayne, and I build these out of Thibodaux, Louisiana.',
        reviewAuthors: ['Reed Babin', 'Colin Richard'],
        winSlugs: ['all-out-window-tint', 'elite-custom-automotive'],
      }}
    />
  )
}
