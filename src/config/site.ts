export const site = {
  name: 'Strykora',
  legalName: 'Strykora',
  tagline: 'Web design + SEO for Louisiana businesses.',
  description:
    'Custom-built websites and local SEO for Louisiana businesses. We build the website, then we make sure Google sends people to it.',
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
    eyebrow: 'Custom-built websites',
    short: 'You stop renting a template. You start owning a fast, custom site that actually represents your business.',
    long: 'Strykora builds custom websites from scratch on a modern Next.js stack. No Wix, no Squarespace, no template farms, no stock-photo heroes that look like every other shop in town. Every site is engineered for speed, SEO, and conversions from the first commit, and you own the code, the domain, and the GitHub repo outright.',
    bullets: [
      'Custom designs, not pulled from a template marketplace',
      'Loads under a second on a phone, not four',
      'Mobile-first, because most of your buyers are on a phone',
      'SEO-ready architecture: schema, semantic HTML, fast hydration',
      'Owned outright by you. Leave Strykora any time, take the site with you',
    ],
    priceRange: 'Starting at $3,750, depending on scope.',
    priority: 1,
  },
  {
    slug: 'seo',
    title: 'Local SEO + GEO',
    eyebrow: 'Found in Google AND in ChatGPT',
    short: 'Rank for the keywords that pay the bills: on Google, on Google AI Overviews, and inside ChatGPT, Perplexity, and Gemini answers.',
    long: 'Classic SEO is no longer enough. Ahrefs measured a 58% click-through rate drop on top-ranking pages when Google now shows an AI Overview, and most Louisiana service businesses have zero presence in ChatGPT or Perplexity answers. Strykora runs Local SEO and Generative Engine Optimization (GEO) as one service, ranking you in the blue links AND inside the AI answers your future customers are starting to trust.',
    bullets: [
      'Local keyword research grounded in real Louisiana search data',
      'On-page SEO + schema tuned for AI Overview citation',
      'GEO: llms.txt, structured answers, and entity associations the AI engines actually use',
      'Monthly on-page revisions, GBP posts, and ethical link building',
      'Transparent monthly report: tracked rankings and booked leads',
      'Month-to-month, no 12-month lock-in, no early-termination fee',
    ],
    priceRange: 'Retainers from $297/month.',
    priority: 2,
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile',
    eyebrow: 'Own the local pack',
    short: 'Most local businesses are losing the map pack to a competitor with a juicier GBP. Strykora flips that.',
    long: 'Your Google Business Profile is the single biggest local SEO lever, and the source most AI Overviews pull from when they recommend a Louisiana business. Strykora fully rebuilds the profile, posts weekly, routes review requests, drafts your review responses for approval, and feeds the local pack the structured data it needs to feature you instead of the shop down the road.',
    bullets: [
      'Full profile rebuild: categories, hours, services, photos',
      'Weekly posts and photo uploads (the activity signal Google rewards)',
      'Review request automation + drafted responses for your approval',
      'Services entries written to feed AI Overviews directly',
      'Monthly insights report: views, calls, direction requests, ranking changes',
    ],
    priceRange: 'Bundled into the local SEO retainer.',
    priority: 3,
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    eyebrow: 'Paid traffic on tap',
    short: 'Leads in week one, while SEO compounds in the background. No 12-month lock-in.',
    long: 'Google Ads run by a builder who understands the full funnel, not a paid-media generalist running cookie-cutter campaigns. Tight keyword targeting, conversion-tracked landing pages built in-house, weekly optimization, transparent reporting. No agency markup on your ad spend. No twelve-month contract. The account stays in your name from day one. If you leave Strykora, the campaigns and the spend history stay with you.',
    bullets: [
      'Search campaigns dialed to high-intent keywords (no broad-match waste)',
      'Conversion-tracked landing pages built in-house on the same stack',
      'Weekly optimization and budget pacing, not "set and forget"',
      'Negative keyword lists built and maintained',
      'Account in your name. No hostage situation if you walk away',
    ],
    priceRange: 'Management from $500/month, plus your ad spend.',
    priority: 4,
  },
  {
    slug: 'ai-search-optimization',
    title: 'AI Search Optimization',
    eyebrow: 'Get cited inside the AI answer',
    short: 'Become the business ChatGPT, Perplexity, and Google AI Overviews recommend by name, not the one buried under the answer.',
    long: 'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) are the new top of funnel. Google AI Overviews and AI Mode now reach more than one billion people a month, and Ahrefs measured a 58% click-through rate drop on top-ranking pages once an AI Overview is present. Most Louisiana service businesses are invisible inside ChatGPT, Perplexity, and Gemini answers. Strykora is the only Louisiana studio that sells AI Search Optimization as a dedicated service: a structured-data, entity, and citation-surface program built specifically to get your business named inside the AI answer your future customers are already starting to trust.',
    bullets: [
      'AI Overview + ChatGPT + Perplexity citation audit (where you appear, where you don\'t, and why)',
      'Entity, schema, and FAQPage structure tuned for AI answer extraction',
      'llms.txt and structured Services entries written for AI crawler ingestion',
      'Direct-answer copywriting on key service pages (question-led H2s, one-sentence answers)',
      'GBP Services entries rebuilt to feed AI Overview local pack citation',
      'Monthly AI citation report: which engines name you, for which queries, and what changed',
    ],
    priceRange: 'Bundled into the local SEO retainer, or standalone audit + sprint at $1,997.',
    priority: 5,
    featured: true,
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
  // Removed 2026-06-17: /advertising-thibodaux-la — SERP is billboards & outdoor signage, not Google Ads buyer intent.
  // 301 redirect added in next.config.js. Do not re-add without removing the redirect first.
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
    slug: 'hover-septic',
    client: 'Hover Septic',
    industry: 'Septic / Home Services',
    city: 'Thibodaux, LA',
    headline: 'From zero digital footprint to #1 organic, and a business model change',
    blurb: 'Trey had no website and no Google Business Profile when he signed on with Strykora, just a Facebook page. Strykora built him a website, a brand new GBP, and ranked him #1 organic for "septic installs Thibodaux LA". The impact was so profound that Hover Septic was able to drop low-ticket pumpout work entirely and focus on multi-thousand-dollar installs. Today both ChatGPT and Perplexity name Hover Septic first when asked for a Thibodaux septic installer.',
    metrics: [
      { label: 'Avg local rank', value: '1.00' },
      { label: 'AI engines citing', value: 'ChatGPT + Perplexity' },
      { label: 'Per-job ticket', value: 'Multi-thousand' },
    ],
    cover: '/images/case-hover.jpg',
    featured: true,
  },
  {
    slug: 'foret-construction',
    client: 'Foret Construction',
    industry: 'Roofing',
    city: 'Raceland, LA',
    headline: 'FORTIFIED roofer moves off Wix to an owned Next.js build',
    blurb: 'Decent SEO foundation on Wix, but Foret was paying monthly rental fees on a templated stock-photo site he didn\'t own. Strykora rebuilt on Next.js with nine city landing pages, full ownership, and a rebuilt Google Business Profile to feed AI Overviews.',
    metrics: [
      { label: 'City landing pages', value: '9' },
      { label: 'Platform', value: 'Wix → Next.js' },
      { label: 'Live since', value: '2026' },
    ],
    cover: '/images/case-foret.jpg',
  },
  {
    slug: 'elite-custom-automotive',
    client: 'Elite Custom Automotive',
    industry: 'Auto / Lift Kits',
    city: 'Lockport, LA',
    headline: 'From templated stock-photo site to #1 in Lockport',
    blurb: 'Elite\'s reputation in Lockport didn\'t match its website. Strykora rebuilt it from scratch with a 3D hero, two distinct conversion paths (performance and repair), nine city pages, and a rebuilt Google Business Profile. Ownership replaces the old rental fee.',
    metrics: [
      { label: 'Avg local rank', value: '1.22' },
      { label: 'AI engine citing', value: 'Perplexity' },
      { label: 'City landing pages', value: '9' },
    ],
    cover: '/images/case-elite.jpg',
  },
  {
    slug: 'all-out-window-tint',
    client: 'All Out Window Tint',
    industry: 'Window Tinting',
    city: 'Gonzales + Baton Rouge, LA',
    headline: 'Dual-location rebuild + franchising angle. Baton Rouge ranks #3 in Google AI search in 2 months',
    blurb: 'Reed opened Gonzales; Dax came in as co-owner to expand into Baton Rouge. Strykora rebuilt them from scratch (owned outright, no more monthly rental), captured the dual locations, added a dedicated franchising page, and rebuilt both Google Business Profiles. The brand new Baton Rouge profile ranks #3 in Google AI search for "tint baton rouge" two months after launch.',
    metrics: [
      { label: 'Google AI rank', value: '#3' },
      { label: 'Months to rank', value: '2' },
      { label: 'Locations', value: '2' },
    ],
    cover: '/images/case-allout.jpg',
  },
  {
    slug: 'acadia-pools',
    client: 'Acadia Pools',
    industry: 'Pool Builder',
    city: 'Thibodaux, LA',
    headline: 'Thibodaux gunite pool builder gets named first by Perplexity',
    blurb: 'Matt Glover\'s custom gunite pool operation needed a website that matched the craft. Strykora built a custom Next.js site at acadiapools.com, rebuilt the Google Business Profile, and tuned the schema and copy for AI search citation. Two months later, when a real customer asks Perplexity for a pool builder in Thibodaux, Acadia Pools is the first option named in the answer.',
    metrics: [
      { label: 'Perplexity rank', value: '#1' },
      { label: 'Service lines', value: '6' },
      { label: 'Parish', value: 'Lafourche' },
    ],
    cover: '/images/case-acadia.jpg',
  },
] as const

export type CaseStudy = (typeof caseStudies)[number]

export const trustStrip = [
  { label: 'Built in', value: 'Thibodaux, LA' },
  { label: 'Ships in', value: 'About 1 week' },
  { label: 'Owned by', value: 'You' },
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
