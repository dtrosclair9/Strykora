import type { Metadata } from 'next'
import { League_Gothic, Libre_Franklin } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import MetaPixel from '@/components/MetaPixel'
import { site } from '@/config/site'

const headline = League_Gothic({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
})

const body = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web Design & SEO in Louisiana`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'web design louisiana',
    'web design thibodaux',
    'web design baton rouge',
    'seo louisiana',
    'local seo thibodaux',
    'roofer web design louisiana',
    'contractor web design louisiana',
    'custom website builder louisiana',
    'google business profile louisiana',
  ],
  authors: [{ name: site.owner }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Web Design & SEO in Louisiana`,
    description: site.description,
    images: [
      {
        url: '/images/og-image-marketing.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} — Web Design & SEO in Louisiana`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Web Design & SEO in Louisiana`,
    description: site.description,
    images: ['/images/og-image-marketing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-LA',
    'geo.placename': site.address.city,
    'geo.position': `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headline.variable} ${body.variable}`}>
      {/* Chrome (Header/Footer) lives in the (site) and (funnel)
          route-group layouts so ad landing pages can ship without nav or the
          street address. Only global concerns stay here. */}
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
        <MetaPixel />
      </body>
    </html>
  )
}
