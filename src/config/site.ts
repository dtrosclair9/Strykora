export const site = {
  name: 'Strykora',
  legalName: 'Strykora',
  tagline: 'Web design + SEO for Louisiana businesses.',
  description:
    'Custom Next.js websites and local SEO for Louisiana businesses. We build the website, then we make sure Google sends people to it.',
  domain: 'strykora.com',
  url: 'https://www.strykora.com',
  owner: 'Dayne Trosclair',
  email: 'info@strykora.com',
  testEmail: 'daynetrosclair@icloud.com',
  phoneDisplay: '(985) 714-9562',
  phoneRaw: '+19857149562',
  address: {
    street: '108 Ashton Dr',
    city: 'Thibodaux',
    state: 'LA',
    zip: '70301',
    parish: 'Lafourche Parish',
  },
  geo: { lat: 29.7958, lng: -90.8229 },
  social: {
    facebook: 'https://www.facebook.com/strykora',
  },
} as const

export const services = [
  {
    slug: 'web-design',
    title: 'Web Design',
    eyebrow: 'Custom Next.js builds',
    short: 'Hand-built sites that load instantly, rank well, and convert visitors into customers.',
    long: 'We build custom websites on Next.js — no Wix, no Squarespace, no template farms. Every site is engineered for speed, SEO, and conversions from the first commit. Modern stack, real craft, owned outright by you.',
    bullets: [
      'Custom Next.js builds (no page-builder bloat)',
      'Mobile-first, perfect on every device',
      'Lighthouse 95+ performance baseline',
      'SEO-ready architecture from day one',
      'Owned outright — no monthly platform tax',
    ],
    priority: 1,
  },
  {
    slug: 'seo',
    title: 'Local SEO',
    eyebrow: 'Get found on Google',
    short: 'Rank for the searches that actually drive revenue in your city. No vanity keywords.',
    long: 'We rank Louisiana businesses for what their customers actually type into Google. Keyword research grounded in local search volume. On-page optimization that compounds. Monthly content and link work that pays for itself.',
    bullets: [
      'Local keyword research grounded in real search data',
      'On-page SEO + schema for every page',
      'Monthly content + link building',
      'Transparent reporting (you see every move)',
      'No long-term contracts',
    ],
    priority: 2,
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile',
    eyebrow: 'Own the local pack',
    short: 'Show up in the map pack for "[your service] near me" — where 80% of local clicks happen.',
    long: 'Your Google Business Profile is the single biggest local SEO lever. We fully optimize the profile, post weekly, route reviews, and feed the AI-powered local pack the structured data it needs to feature you.',
    bullets: [
      'Full profile build-out and category dialing',
      'Weekly posts and photo updates',
      'Review request automation',
      'Services entries written to feed AI Overviews',
      'Monthly insights report',
    ],
    priority: 3,
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    eyebrow: 'Paid traffic on tap',
    short: 'Fastest path to leads while your SEO catches up. Lean, profitable campaigns only.',
    long: 'Google Ads done by a builder who understands the funnel end-to-end. Tight keyword targeting, conversion-tracked landing pages, weekly optimization. No agency markup, no 12-month contract.',
    bullets: [
      'Search campaigns dialed to high-intent keywords',
      'Conversion-tracked landing pages built in-house',
      'Weekly optimization and budget pacing',
      'Negative keyword lists built and maintained',
      'You keep the account — no hostage situation',
    ],
    priority: 4,
  },
] as const

export type Service = (typeof services)[number]

export const industries = [
  {
    slug: 'roofers-louisiana',
    title: 'Roofers',
    headline: 'Websites & SEO for Louisiana Roofers',
    short: 'Storm-season ready sites that rank for roof replacement in your city.',
    icon: 'roof',
    flagship: true,
  },
  {
    slug: 'contractors-louisiana',
    title: 'Contractors',
    headline: 'Websites & SEO for Louisiana Contractors',
    short: 'General contractors, paving, fence, dirt work — built to rank for the trade you actually do.',
    icon: 'hardhat',
  },
  {
    slug: 'home-services-louisiana',
    title: 'Home Services',
    headline: 'Websites & SEO for Louisiana Home Service Businesses',
    short: 'Window tint, lawn care, pressure washing, pest control — sites that turn "near me" searches into calls.',
    icon: 'home',
  },
  {
    slug: 'auto-shops-louisiana',
    title: 'Auto Shops',
    headline: 'Websites & SEO for Louisiana Auto Shops',
    short: 'Lift kits, repair, detailing, tinting — built to rank for the city and the service.',
    icon: 'wrench',
  },
] as const

export type Industry = (typeof industries)[number]

export const cities = [
  { slug: 'thibodaux-la', name: 'Thibodaux', state: 'LA', flagship: true, parish: 'Lafourche Parish' },
  { slug: 'houma-la', name: 'Houma', state: 'LA', parish: 'Terrebonne Parish' },
  { slug: 'baton-rouge-la', name: 'Baton Rouge', state: 'LA', parish: 'East Baton Rouge Parish', growth: true },
  { slug: 'new-orleans-la', name: 'New Orleans', state: 'LA', parish: 'Orleans Parish' },
  { slug: 'lafayette-la', name: 'Lafayette', state: 'LA', parish: 'Lafayette Parish' },
] as const

export type City = (typeof cities)[number]

export const cityServiceCombos = [
  { service: 'web-design', slug: 'web-design-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'seo', slug: 'seo-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'digital-marketing', slug: 'digital-marketing-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'google-ads', slug: 'advertising-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'web-design', slug: 'web-design-houma-la', cityName: 'Houma', citySlug: 'houma-la' },
  { service: 'seo', slug: 'seo-houma-la', cityName: 'Houma', citySlug: 'houma-la' },
  { service: 'web-design', slug: 'web-design-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'seo', slug: 'seo-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'google-ads', slug: 'digital-marketing-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'web-design', slug: 'web-design-lafayette-la', cityName: 'Lafayette', citySlug: 'lafayette-la' },
  { service: 'seo', slug: 'seo-lafayette-la', cityName: 'Lafayette', citySlug: 'lafayette-la' },
] as const

export const caseStudies = [
  {
    slug: 'foret-construction',
    client: 'Foret Construction',
    industry: 'Roofing',
    city: 'Raceland, LA',
    headline: 'FORTIFIED-certified roofer goes from Wix to ranking',
    blurb: 'Rebuilt a stuck Wix site on Next.js with 9 city landing pages targeting the high-ticket roof replacement keyword across South Louisiana.',
    metrics: [
      { label: 'City landing pages', value: '9' },
      { label: 'Lighthouse score', value: '98' },
      { label: 'Platform', value: 'Wix → Next.js' },
    ],
    cover: '/images/case-foret.jpg',
    featured: true,
  },
  {
    slug: 'elite-custom-automotive',
    client: 'Elite Custom Automotive',
    industry: 'Auto / Lift Kits',
    city: 'Lockport, LA',
    headline: 'Lift kit + auto repair shop with a real online presence',
    blurb: 'Modern rebuild for a BDS suspension installer covering 9 South Louisiana cities, with Cognito-style conversion paths for both lift quotes and repair appointments.',
    metrics: [
      { label: 'City landing pages', value: '9' },
      { label: 'Service paths', value: '2' },
      { label: 'Built on', value: 'Next.js 15' },
    ],
    cover: '/images/case-elite.jpg',
  },
  {
    slug: 'all-out-window-tint',
    client: 'All Out Window Tint',
    industry: 'Window Tinting',
    city: 'Gonzales + Baton Rouge, LA',
    headline: 'Baton Rouge location to #3 in Google AI search results, in 2 months',
    blurb: 'Multi-location build with one contact form swapping endpoints by location. The Baton Rouge shop now ranks #3 in Google AI search results for the market\'s biggest tinting queries, just two months after launch.',
    metrics: [
      { label: 'Google AI rank', value: '#3' },
      { label: 'Months to rank', value: '2' },
      { label: 'Locations', value: '2' },
    ],
    cover: '/images/case-allout.jpg',
  },
  {
    slug: 'hover-septic',
    client: 'Hover Septic',
    industry: 'Septic / Home Services',
    city: 'Thibodaux, LA',
    headline: '#1 organic for "septic installs Thibodaux LA"',
    blurb: 'Custom Next.js build for a Thibodaux septic installer, ranking #1 organic for the high-ticket money keyword in the home market. Multi-thousand-dollar jobs flow straight from search.',
    metrics: [
      { label: 'Organic rank', value: '#1' },
      { label: 'Market', value: 'Thibodaux, LA' },
      { label: 'Per-job ticket', value: '$$$$' },
    ],
    cover: '/images/case-hover.jpg',
  },
] as const

export type CaseStudy = (typeof caseStudies)[number]

export const trustStrip = [
  { label: 'Built in', value: 'Thibodaux, LA' },
  { label: 'Stack', value: 'Next.js + Vercel' },
  { label: 'Niche', value: 'Local service businesses' },
] as const
