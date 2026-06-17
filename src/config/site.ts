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
  gbp: {
    profile: 'https://share.google/245Rc7R7IT15YNyAl',
    leaveReview: 'https://g.page/r/CfC86RlwChOQEBM/review',
  },
  timelineLabel: 'Ships in 1 week',
} as const

export const reviews = [
  {
    author: 'Timothy Caillouet',
    business: 'TIMCO',
    rating: 5,
    date: '2026-06-17',
    body: 'Dayne Trosclair with Strykora went that extra mile that many talk about but few do. He was very thorough from the jump, ensuring we wouldn\'t be wasting time and effort to attain the website product that I was looking for. You can go get AI or some jabroni off the street to work you up a site, but good luck getting them on the phone or to make edits in a timely manner. Dayne will stay with you step by step throughout the life of the site and I look forward to working with him as my companies grow. If you\'re in the market for an online presence that isn\'t just FB or Insta; take some time and reach out to Dayne at Strykora. 5 star service!',
    featured: true,
  },
  {
    author: 'Reed Babin',
    business: 'All Out Window Tint',
    rating: 5,
    date: '2026-05-20',
    body: 'Absolutely blown away by the work Dayne Trosclair at Strykora did for our All-Out website. 10/10 experience from start to finish. The graphics, layout, responsiveness, branding, and overall execution are next level. The site has a clean modern luxury feel and honestly looks like a $10K+ website. Dayne took our vision and elevated it beyond what we imagined. Professional, creative, fast, and detail-oriented the entire way through. If you need a website, branding, SEO, or anything tech related, Strykora is the real deal. Highly recommend.',
    featured: true,
  },
  {
    author: 'Colin Richard',
    business: 'Elite Custom Automotive',
    rating: 5,
    date: '2026-03-18',
    body: 'This company is first class! A marketing agency and website developer that actually listens, and brings your ideas to life. Communication was present from the jump, and stayed consistent throughout our entire process. Exceeded our expectations by a mile. Thanks Dayne and team for getting our website active and google listing present!',
    featured: true,
  },
  {
    author: 'Trey Hover',
    business: 'Hover Septic',
    rating: 5,
    date: '2026-04-01',
    body: 'Dayne built our website from scratch and handled all the Google stuff too. Honestly didn\'t know much about SEO going in but he walked me through everything and it actually makes sense now. Site looks clean and professional. Would definitely recommend him if you\'re a small business trying to get found online.',
  },
  {
    author: 'Jacob Foret',
    business: 'Foret Construction',
    rating: 5,
    date: '2026-03-25',
    body: 'Really can\'t say enough with all the help and accomplishments over the past 2 week great company and great people.',
  },
  {
    author: 'Branton Vicknair',
    business: 'Southdown Renovations',
    rating: 5,
    date: '2026-04-22',
    body: 'Had a great experience working with Dayne. He took the time to actually listen to what we wanted and came back with stuff that looked way better than I pictured. The new logo and website turned out great and he got our Google page looking sharp too. Good dude, does solid work, can\'t recommend him enough.',
  },
  {
    author: 'Matt Glover',
    business: 'Acadia Pools',
    rating: 5,
    date: '2026-04-08',
    body: 'Dayne with Strykora made the process of getting a website and google presence literally effortless. His attention to detail and his ability to multitask are second to none!',
  },
] as const

export type Review = (typeof reviews)[number]

export const reviewStats = {
  averageRating: 5,
  reviewCount: reviews.length,
} as const

export const services = [
  {
    slug: 'web-design',
    title: 'Web Design',
    eyebrow: 'Custom Next.js builds',
    short: 'Hand-built sites that load fast, rank well, and convert visitors into customers.',
    long: 'Strykora builds custom websites on Next.js. No Wix, no Squarespace, no template farms. Every site is engineered for speed, SEO, and conversions from the first commit, and you own the code outright.',
    bullets: [
      'Custom Next.js builds (no page-builder bloat)',
      'Mobile-first, designed for every device',
      'Engineered for Core Web Vitals from day one',
      'SEO-ready architecture: schema, semantic HTML, fast hydration',
      'Owned outright by you — no monthly platform tax',
    ],
    priceRange: 'Starting at $3,750, depending on scope.',
    priority: 1,
  },
  {
    slug: 'seo',
    title: 'Local SEO',
    eyebrow: 'Get found on Google',
    short: 'Rank for the searches that drive revenue in your city. No vanity keywords.',
    long: 'Strykora ranks Louisiana businesses for the searches their customers actually type. Keyword research grounded in local search data. On-page optimization that compounds. Monthly content and link work that pays for itself.',
    bullets: [
      'Local keyword research grounded in real search data',
      'On-page SEO + schema for every page',
      'Monthly content + link building',
      'Transparent reporting (you see every move)',
      'No long-term contracts',
    ],
    priceRange: 'Retainers from $297/month.',
    priority: 2,
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile',
    eyebrow: 'Own the local pack',
    short: 'Show up where local buyers actually click — the map pack and AI Overviews.',
    long: 'Your Google Business Profile is the single biggest local SEO lever. Strykora fully optimizes the profile, posts weekly, routes review requests, and feeds the AI-powered local pack the structured data it needs to feature you.',
    bullets: [
      'Full profile build-out and category dialing',
      'Weekly posts and photo updates',
      'Review request automation',
      'Services entries written to feed AI Overviews',
      'Monthly insights report',
    ],
    priceRange: 'Bundled into the local SEO retainer.',
    priority: 3,
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    eyebrow: 'Paid traffic on tap',
    short: 'Fastest path to leads while your SEO catches up. Lean, profitable campaigns only.',
    long: 'Google Ads run by a builder who understands the full funnel. Tight keyword targeting, conversion-tracked landing pages, weekly optimization, transparent reporting. No agency markup, no twelve-month contract, you keep the account.',
    bullets: [
      'Search campaigns dialed to high-intent keywords',
      'Conversion-tracked landing pages built in-house',
      'Weekly optimization and budget pacing',
      'Negative keyword lists built and maintained',
      'You keep the account — no hostage situation',
    ],
    priceRange: 'Management from $500/month, plus your ad spend.',
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
    short: 'General contractors, paving, fence, dirt work, built to rank for the trade you actually do.',
    icon: 'hardhat',
  },
  {
    slug: 'home-services-louisiana',
    title: 'Home Services',
    headline: 'Websites & SEO for Louisiana Home Service Businesses',
    short: 'Window tint, lawn care, pressure washing, pest control, sites that turn "near me" searches into calls.',
    icon: 'home',
  },
  {
    slug: 'auto-shops-louisiana',
    title: 'Auto Shops',
    headline: 'Websites & SEO for Louisiana Auto Shops',
    short: 'Lift kits, repair, detailing, tinting, built to rank for the city and the service.',
    icon: 'wrench',
  },
  {
    slug: 'commercial-louisiana',
    title: 'Commercial',
    headline: 'Websites & SEO for Louisiana Marine, Oil & Gas, and Industrial Operators',
    short: 'B2B sites that win procurement decisions, recruit crew, and surface fleet and equipment credentials where buyers look.',
    icon: 'anchor',
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

// Every entry must map to a real /<slug> route under src/app/<slug>/page.tsx.
// `service` value is looked up through SERVICE_BY_SLUG in CityServicePage.tsx,
// which resolves aliases (digital-marketing → seo, advertising → google-ads).
export const cityServiceCombos = [
  { service: 'web-design', slug: 'web-design-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'seo', slug: 'seo-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'digital-marketing', slug: 'digital-marketing-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'advertising', slug: 'advertising-thibodaux-la', cityName: 'Thibodaux', citySlug: 'thibodaux-la', preserved: true },
  { service: 'web-design', slug: 'web-design-houma-la', cityName: 'Houma', citySlug: 'houma-la' },
  { service: 'seo', slug: 'seo-houma-la', cityName: 'Houma', citySlug: 'houma-la' },
  { service: 'web-design', slug: 'web-design-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'seo', slug: 'seo-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'digital-marketing', slug: 'digital-marketing-baton-rouge-la', cityName: 'Baton Rouge', citySlug: 'baton-rouge-la' },
  { service: 'web-design', slug: 'web-design-new-orleans-la', cityName: 'New Orleans', citySlug: 'new-orleans-la' },
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
    blurb: 'Rebuilt a stuck Wix site on Next.js with nine city landing pages targeting the high-ticket roof replacement keyword across South Louisiana.',
    metrics: [
      { label: 'City landing pages', value: '9' },
      { label: 'Platform', value: 'Wix → Next.js' },
      { label: 'Live since', value: '2026' },
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
    blurb: 'Modern rebuild for a BDS suspension installer covering nine South Louisiana cities, with conversion paths for both lift quotes and repair appointments.',
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
    headline: 'Baton Rouge location ranks #3 in Google AI search results for "tint baton rouge", in 2 months',
    blurb: 'Multi-location build with one contact form swapping endpoints by location. The Baton Rouge shop ranks #3 in Google AI search results for "tint baton rouge", two months after launch.',
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
    blurb: 'Custom Next.js build for a Thibodaux septic installer, ranking #1 organic for the high-ticket money keyword in the home market.',
    metrics: [
      { label: 'Organic rank', value: '#1' },
      { label: 'Market', value: 'Thibodaux' },
      { label: 'Per-job ticket', value: 'Multi-thousand' },
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

/** Look up the service.slug that a city+service combo actually renders. */
export const SERVICE_BY_COMBO_SLUG: Record<string, string> = {
  'web-design': 'web-design',
  seo: 'seo',
  'digital-marketing': 'seo',
  advertising: 'google-ads',
  'google-ads': 'google-ads',
  'google-business-profile': 'google-business-profile',
}

/** Get the canonical city+service combo slug for a given service.slug + city.slug, or null if none ships. */
export function comboSlugFor(serviceSlug: string, citySlug: string): string | null {
  // Prefer combos whose `service` already matches the canonical service slug.
  const direct = cityServiceCombos.find(
    (c) => c.citySlug === citySlug && SERVICE_BY_COMBO_SLUG[c.service] === serviceSlug && c.service === serviceSlug
  )
  if (direct) return direct.slug
  const aliased = cityServiceCombos.find(
    (c) => c.citySlug === citySlug && SERVICE_BY_COMBO_SLUG[c.service] === serviceSlug
  )
  return aliased ? aliased.slug : null
}
