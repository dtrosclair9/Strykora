import { site } from '@/config/site'

interface SchemaProps {
  data: object | object[]
}

export function Schema({ data }: SchemaProps) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  )
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneRaw,
  email: site.email,
  image: `${site.url}/images/og-image.jpg`,
  logo: `${site.url}/images/strykora-logo.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: [
    { '@type': 'State', name: 'Louisiana' },
    { '@type': 'City', name: 'Thibodaux' },
    { '@type': 'City', name: 'Houma' },
    { '@type': 'City', name: 'Baton Rouge' },
    { '@type': 'City', name: 'New Orleans' },
    { '@type': 'City', name: 'Lafayette' },
  ],
  sameAs: [site.social.facebook],
  founder: { '@type': 'Person', name: site.owner },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { '@id': `${site.url}/#business` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${site.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}
