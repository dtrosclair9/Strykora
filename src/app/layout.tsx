import type { Metadata } from 'next'
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import MetaPixel from '@/components/MetaPixel'
import { site } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
        url: '/images/og-image.jpg',
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
    images: ['/images/og-image.jpg'],
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
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      {/* Chrome (Header/Footer/SmoothScroll) lives in the (site) and (funnel)
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
