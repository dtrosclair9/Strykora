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

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#dayne`,
  name: site.owner,
  jobTitle: 'Founder',
  worksFor: { '@id': `${site.url}/#business` },
  url: `${site.url}/about`,
  image: `${site.url}/images/dayne-headshot.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: 'US',
  },
  sameAs: [site.social.facebook],
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
  logo: `${site.url}/images/strykora-lockup.png`,
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
  founder: { '@id': `${site.url}/#dayne` },
  employee: { '@id': `${site.url}/#dayne` },
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

export function breadcrumbSchema(items: { href: string; label: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${site.url}${item.href}`,
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
