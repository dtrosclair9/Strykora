export const site = {
  name: 'Strykora',
  legalName: 'Strykora',
  tagline: 'Web design + SEO for Louisiana businesses.',
  description:
    'Custom-built websites and local SEO for Louisiana businesses. We build the website, then we make sure Google sends people to it.',
  domain: 'strykora.com',
  url: 'https://strykora.com',
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
  /** Meta Pixel / dataset id (Events Manager). Public by nature; fires PageView site-wide and Lead on /free-audit/thanks. */
  metaPixelId: '1366734111941394',
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

// Shared OG image. Next.js does NOT merge openGraph.images from the parent
// layout when a page sets its own openGraph, so every generateMetadata/metadata
// that defines openGraph must spread this in explicitly or it renders imageless.
export const ogImage = {
  url: '/images/og-image-marketing.jpg',
  width: 1200,
  height: 630,
  alt: site.name,
} as const

export const services = [
  {
    slug: 'web-design',
    title: 'Web Design',
    eyebrow: 'Custom-built websites',
    short: 'A custom site built around the work you want more of, and you own every file of it.',
    metaDescription: 'Custom Louisiana web design you own outright, no Wix, no templates. Fast, mobile-first sites built to rank on Google and turn visitors into phone calls.',
    long: 'Strykora builds websites from scratch instead of starting from a Wix or Squarespace template, and uses photos of your own work instead of stock pictures. Every site is built to load fast on a phone, show up on Google, and make it easy for a visitor to call you. You own the site, the domain name, and every file. If you ever leave, you take it all with you.',
    bullets: [
      'Custom design, not picked from a template marketplace',
      'Built to load fast on a phone, and tested on one before launch',
      'Built mobile-first, because most of your customers are on a phone',
      'Built so Google understands what you do and ranks you for it',
      'Owned outright by you. Leave Strykora any time, take the site with you',
    ],
    priceRange: 'One fixed price, quoted in writing after a short scoping call.',
    priority: 1,
  },
  {
    slug: 'seo',
    title: 'Local SEO',
    eyebrow: 'Google search and map results',
    short: 'Work on your pages, your Google listing and the sites that mention you, so you show up for the jobs you want in your town.',
    metaDescription: "Local SEO for Louisiana businesses: service pages, Google Business Profile and local links aimed at the map results and Google's AI answer. Month to month.",
    long: 'Local SEO is the work that gets your business into the Google map results and the regular results below them for the searches that bring in jobs, like "roofer in Houma" or "AC repair Thibodaux." Google\'s AI answer, ChatGPT and Perplexity lean on the same signals: pages that clearly answer what buyers ask, a complete Google Business Profile, steady reviews, and other Louisiana sites that mention you. Strykora runs it as one service, so you are not paying twice for the same work under two names.',
    bullets: [
      'Real keyword research using actual Louisiana search data, not guesses',
      'Pages rewritten so each one plainly says what you do, where you work, and answers the questions buyers ask before they call',
      'Technical cleanup: page titles, internal links, site speed, and the business details search engines read (called schema)',
      'Monthly content, Google Business Profile upkeep, and mentions and links from other Louisiana sites',
      'Plain-English monthly report: what ranked, what changed, how many leads came in',
      'Month-to-month. No 12-month lock-in. No early-termination fee.',
    ],
    priceRange: 'Month to month, with no long-term contract.',
    priority: 2,
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile',
    eyebrow: 'Map results',
    short: 'Your categories, services, photos, hours and reviews kept current, so the listing customers see on Google is accurate and active.',
    metaDescription: 'Google Business Profile management for Louisiana businesses: categories, services, photos, posts and review requests, kept current so customers call you.',
    long: 'Your Google Business Profile (the listing with your reviews and the map) decides more of your map ranking than anything on your website: the right primary category, your real business name and address, accurate hours, and a steady stream of recent reviews. Google also uses it when its AI answer recommends a business. Strykora rebuilds the whole profile, keeps it active, asks your customers for reviews after each job, writes responses for you to approve, and lists your services the way Google reads them.',
    bullets: [
      'Full profile rebuild: categories, hours, services, photos',
      'Weekly posts and photo uploads, so customers see a business that is open and working',
      'Review request automation, with responses drafted for you to approve',
      'Services listed the way customers search for them',
      'Monthly insights report: views, calls, direction requests, ranking changes',
    ],
    priceRange: 'Bundled into the local SEO retainer.',
    priority: 3,
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    eyebrow: 'Paid search',
    short: 'Search ads for the jobs you want, with call tracking so you can see what the money brought in. No 12-month contract.',
    metaDescription: 'Google Ads management for Louisiana businesses. Search ads with call tracking, the account in your name, no markup on ad spend and no 12-month contract.',
    long: 'Google Ads run by the same person who builds your website, so the ads and the landing page actually work together. The ads target the phrases your buyers type, the landing pages track which clicks turn into calls, and the account gets tuned every week with a plain-English report. There is no markup on your ad spend and no 12-month contract. The Google Ads account stays in your name from day one. If you ever leave, the campaigns and the history stay with you.',
    bullets: [
      'Search ads targeted at the exact phrases your buyers type',
      'Landing pages built in-house, with tracking so you can see which clicks turned into calls',
      'Weekly check-ins and budget pacing, not "set and forget"',
      'Ongoing list of words to block so your budget skips the wrong searches',
      'The account is in your name, so the campaigns stay with you if you leave',
    ],
    priceRange: 'A flat management fee quoted up front. Your ad spend goes straight to Google.',
    priority: 4,
  },
  {
    slug: 'ai-search-optimization',
    title: 'AI Search Optimization',
    eyebrow: 'ChatGPT, Perplexity and Google\'s AI answer',
    short: 'Find out whether ChatGPT, Perplexity and Google\'s AI answer name you when customers ask, then fix what those tools read about you.',
    metaDescription: "AI search optimization for Louisiana businesses: see whether ChatGPT, Perplexity and Google's AI answer name you, then fix what they read about you.",
    long: 'When someone asks ChatGPT, Perplexity, or Google\'s AI answer which roofer or pool builder to call in their town, the answer usually names one or two businesses. Those tools pick from what is already out there: your website, your Google Business Profile, your reviews, and what other sites say about you. There is no secret file that gets you named. Google says so in its own guidance. Strykora audits where you show up today across four AI tools, rewrites your key pages so they answer buyer questions in plain sentences an AI can quote, fixes your Business Profile, and works on getting you mentioned on the local lists and sites those tools read. Then we send a monthly report on which AI tools named you and for which questions. The industry calls this GEO or AEO. It is mostly good local SEO, aimed at the questions people now ask an AI.',
    bullets: [
      'A written audit of where you show up today across ChatGPT, Perplexity, Google\'s AI answer, and Gemini',
      'Rewrites on your key pages so they answer buyer questions in plain sentences',
      'A list of the local directories, "best of" lists and sites the AI tools cite for your service, and which ones you are missing from',
      'Plain answers on your pages to the questions buyers ask, like cost, timeline, and what to expect',
      'Your Google Business Profile services list rebuilt to match how customers ask',
      'Monthly report: which AI assistants named you, for which searches, and what changed since last month',
    ],
    priceRange: 'Included in the Local SEO plan, or as a standalone audit and 30-day sprint.',
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
    metaDescription: "Websites and SEO for Louisiana roofers. Storm-season-ready sites that rank for roof replacement in your city and show homeowners your verified credentials.",
    icon: 'roof',
    flagship: true,
  },
  {
    slug: 'contractors-louisiana',
    title: 'Contractors',
    headline: 'Websites & SEO for Louisiana Contractors',
    short: 'General contractors, paving, fence, dirt work, built to rank for the trade you actually do.',
    metaDescription: 'Websites and SEO for Louisiana contractors. Paving, fence, dirt work, and GC sites built to rank for the trade you actually do in the cities you serve.',
    icon: 'hardhat',
  },
  {
    slug: 'home-services-louisiana',
    title: 'Home Services',
    headline: 'Websites & SEO for Louisiana Home Service Businesses',
    short: 'Window tint, lawn care, pressure washing, pest control, sites that turn "near me" searches into calls.',
    metaDescription: 'Websites and SEO for Louisiana home service pros. Window tint, lawn care, pressure washing, and pest control sites that turn near-me searches into calls.',
    icon: 'home',
  },
  {
    slug: 'auto-shops-louisiana',
    title: 'Auto Shops',
    headline: 'Websites & SEO for Louisiana Auto Shops',
    short: 'Lift kits, repair, detailing, tinting, built to rank for the city and the service.',
    metaDescription: 'Websites and SEO for Louisiana auto shops. Lift kits, repair, detailing, and tinting sites built to rank for your city and the service customers search.',
    icon: 'wrench',
  },
  {
    slug: 'commercial-louisiana',
    title: 'Commercial',
    headline: 'Websites & SEO for Louisiana Marine, Oil & Gas, and Industrial Operators',
    short: 'B2B sites that win procurement decisions, recruit crew, and surface fleet and equipment credentials where buyers look.',
    metaDescription: 'Websites and SEO for Louisiana marine, oil and gas, and industrial operators. B2B sites that win procurement, recruit crew, and surface your credentials.',
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
    metaDescription: 'Hover Septic had no website or Google Business Profile. Strykora built both and ranked Hover #1 for septic installs in Thibodaux. ChatGPT now names it first.',
    featured: true,
  },
  {
    slug: 'foret-construction',
    client: 'Foret Construction',
    industry: 'Roofing',
    city: 'Raceland, LA',
    headline: 'FORTIFIED roofer moves off Wix to a custom site he owns outright',
    blurb: 'Foret had a Wix site with decent search rankings, but he was paying a monthly rental fee for a templated, stock-photo site he did not own. Strykora rebuilt it as a custom site with nine service pages across Raceland, Houma and Thibodaux, full ownership, and a rebuilt Google Business Profile.',
    metrics: [
      { label: 'Service pages', value: '9' },
      { label: 'Off Wix to', value: 'Custom-built' },
      { label: 'Live since', value: '2026' },
    ],
    cover: '/images/case-foret.jpg',
    metaDescription: 'Foret Construction & Roofing was renting a Wix template. Strykora rebuilt it as a custom site with pages for three towns and redid its Google Business Profile.',
  },
  {
    slug: 'elite-custom-automotive',
    client: 'Elite Custom Automotive',
    industry: 'Auto / Lift Kits',
    city: 'Lockport, LA',
    headline: 'From templated stock-photo site to top 3 in Lockport',
    blurb: 'Elite\'s Lockport reputation didn\'t match its website. Strykora rebuilt it with a 3D hero, service pages for Lockport, Houma and Thibodaux, and a new Google Business Profile.',
    metrics: [
      { label: 'Avg local rank', value: '1.22' },
      { label: 'AI engine citing', value: 'Perplexity' },
      { label: 'Service pages', value: '9' },
    ],
    cover: '/images/case-elite.jpg',
    metaDescription: "Elite's Lockport reputation didn't match its website. Strykora rebuilt it with a 3D hero, pages for three towns, and a new Google Business Profile.",
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
    metaDescription: "Strykora rebuilt All Out Window Tint's website for its Gonzales and Baton Rouge shops, added a franchising page, and rebuilt both Google Business Profiles.",
  },
  {
    slug: 'acadia-pools',
    client: 'Acadia Pools',
    industry: 'Pool Builder',
    city: 'Thibodaux, LA',
    headline: 'Thibodaux gunite pool builder gets named first by Perplexity',
    blurb: 'Matt Glover\'s custom gunite pool operation needed a website that matched the craft. Strykora built a custom site at acadiapools.com, rebuilt the Google Business Profile, and rewrote the page copy so each service is described plainly. Two months later, when Perplexity is asked for a pool builder in Thibodaux, Acadia Pools is the first option named in the answer.',
    metrics: [
      { label: 'Perplexity rank', value: '#1' },
      { label: 'Service lines', value: '6' },
      { label: 'Parish', value: 'Lafourche' },
    ],
    cover: '/images/case-acadia.jpg',
    metaDescription: 'Strykora built Acadia Pools a custom site and rebuilt its Google Business Profile. Two months later, Perplexity named Acadia first for a Thibodaux pool builder.',
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
