import Link from 'next/link'
import { services, cities, cityServiceCombos, site, industries, SERVICE_BY_COMBO_SLUG, ogImage } from '@/config/site'
import PageHero from './PageHero'
import ProjectActions from './ProjectActions'
import Section from './Section'
import FAQAccordion from './FAQAccordion'
import CTA from './CTA'
import { Schema, faqSchema as buildFaqSchema } from './Schema'
import '@/app/(site)/interiors.css'

interface Props {
  slug: string
}

interface CityMarketCopy {
  marketContext: string
  buyerSnapshot: string
  faqs: { q: string; a: string }[]
}

/**
 * Per-combo hero description. Each entry is the city + service combination's unique angle,
 * so no two city pages read with the same templated copy above the fold.
 * Fallback (if a combo is missing here) is the generic service.short.
 */
const COMBO_HERO_DESCRIPTION: Record<string, string> = {
  'web-design-thibodaux-la': 'Most work in Thibodaux starts with a referral, and the person who got it looks you up before calling. Strykora is based here and built the websites for Acadia Pools and Hover Septic. Yours gets built the same way: custom, fast on a phone, and owned outright by you.',
  'seo-thibodaux-la': 'Thibodaux is a smaller market, with fewer competitors and less search volume per keyword. So instead of chasing one big keyword, Strykora ranks you for each service and town a Lafourche Parish buyer might type. Hover Septic, a Thibodaux client, ranks #1 for "septic installs Thibodaux LA" this way.',
  'digital-marketing-thibodaux-la': 'Strykora is a web design and marketing company in Thibodaux. Strykora can build your website, set up your Google Business Profile and handle your SEO and Google Ads. If you want to show up in answers from ChatGPT and Google, Strykora helps with that too.',
  'web-design-houma-la': 'Strykora has already built Houma pages for three South Louisiana businesses: Foret Construction & Roofing, Elite Custom Automotive and Acadia Pools. A Houma site needs what those pages have: the work you do, the Terrebonne towns you cover, real job photos, and a phone number at the top.',
  'seo-houma-la': 'Houma has plenty of established service businesses already ranking on Google. Strykora competes with them through a page for each service you offer in Houma, a Google Business Profile that matches it, and pages for the Terrebonne Parish towns you actually cover.',
  'web-design-baton-rouge-la': 'Strykora built All Out Window Tint\'s website, which gives its Baton Rouge shop a location page and six service pages of its own and sends Baton Rouge inquiries straight to co-owner Dax. Baton Rouge has more competition than most Louisiana markets, so your site has to look finished and load fast on a phone.',
  'seo-baton-rouge-la': 'Baton Rouge is a competitive SEO market, with plenty of search volume and competitors who have been at it for years. Strykora starts with the specific searches a newer site can win, like a service plus a part of town or a specialty, and builds out from there.',
  'digital-marketing-baton-rouge-la': 'Strykora builds your website and runs your local SEO, Google Business Profile and Google Ads as one job, so the ads, the map listing and the site all say the same thing. In the Baton Rouge metro that already includes All Out Window Tint\'s Gonzales and Baton Rouge shops.',
  'web-design-new-orleans-la': 'More service businesses compete for each search in the New Orleans area than anywhere else in Louisiana, so your reviews, recent jobs and the neighborhoods you serve need to sit near the top of the page. Strykora builds those sites from Thibodaux, about an hour away.',
  'web-design-lafayette-la': 'A Lafayette website should read like it was written for Acadiana: the parish and towns you cover, photos of your own jobs, and a phone number that is easy to tap. Strykora builds custom sites from Thibodaux and writes each one about the market it serves.',
  'seo-lafayette-la': 'Lafayette has less keyword volume than Baton Rouge but less competition too. Specific searches, like a service plus a smaller Acadiana town (Crowley, Breaux Bridge), tend to move first. The broader Lafayette terms take six to twelve months.',
}

/**
 * Per-combo meta description (150-160 chars), keyword-led and city-specific.
 * Falls back to a generated string if a combo is missing.
 */
const COMBO_META_DESCRIPTION: Record<string, string> = {
  'web-design-thibodaux-la': 'Web design in Thibodaux, LA for service businesses. Custom, fast, mobile-first sites you own outright, built to match the work and turn referrals into calls.',
  'seo-thibodaux-la': 'Local SEO in Thibodaux, LA from a Thibodaux company. Service pages, Google Business Profile work and local links for Lafourche Parish businesses.',
  'digital-marketing-thibodaux-la': 'Digital marketing in Thibodaux, LA. Website, Google, ads, and AI search run by one Louisiana operator, not an account rep. Month-to-month, no lock-in.',
  'web-design-houma-la': 'Web design in Houma, LA. Custom, mobile-first sites for Terrebonne Parish businesses, from the company that built Houma pages for Foret, Elite and Acadia Pools.',
  'seo-houma-la': 'Local SEO in Houma, LA. A page for each service you offer in Houma, a matching Google Business Profile, and pages for the Terrebonne Parish towns you cover.',
  'web-design-baton-rouge-la': "Web design in Baton Rouge, LA. Custom sites you own, from the company that built All Out Window Tint's Baton Rouge location and service pages.",
  'seo-baton-rouge-la': 'Local SEO in Baton Rouge, LA. Specific service and neighborhood searches first, a Google Business Profile that matches, and a plain monthly report.',
  'digital-marketing-baton-rouge-la': 'Digital marketing in Baton Rouge, LA: your website, local SEO, Google Business Profile and Google Ads, run together by the person who builds the site.',
  'web-design-new-orleans-la': 'Web design in New Orleans, LA for service businesses. Custom sites that surface reviews, photos, and recent work above the fold so buyers call you first.',
  'web-design-lafayette-la': 'Web design in Lafayette, LA for service businesses. Custom Acadiana sites that name Lafayette Parish, show local proof, and are built by a Louisiana operator.',
  'seo-lafayette-la': 'Local SEO in Lafayette, LA. Service pages, Google Business Profile work and local links for Acadiana businesses, with specific town searches moving first.',
}

/**
 * Per-combo long-form sections rendered between the main grid and the FAQ block.
 * Only combos that need extra depth get an entry; everything else renders unchanged.
 */
const COMBO_DEEP_DIVE: Record<string, { heading: string; paragraphs: string[] }[]> = {
  'digital-marketing-thibodaux-la': [
    {
      heading: 'How Strykora handles digital marketing.',
      paragraphs: [
        'Strykora helps people find your business when they search for your service in Thibodaux. The work starts with your website because that is where your other marketing sends people, and once they get there, the site should help them decide to call.',
        'Strykora builds your site with a page for each town you work in, fills out your Google Business Profile and keeps it up to date. If you need calls before your site moves up in search, Strykora can run Google Ads. Strykora does not manage Facebook or Instagram accounts, write blog posts just to have something up, or shoot photos or video.',
      ],
    },
    {
      heading: 'How pricing works.',
      paragraphs: [
        'You can pay for each service separately. A website is paid for once. The local SEO plan is a flat monthly fee and includes your Google Business Profile and the AI search audit. Managing your Google Ads is a flat monthly fee, plus what you spend on clicks, which goes straight to Google. You get a fixed quote in writing before any work starts.',
        'People often start with the website and add SEO once it is live. If you need calls right away, you can run Google Ads for the first few months while your site moves up in search.',
      ],
    },
    {
      heading: 'Who you work with.',
      paragraphs: [
        'I am Dayne Trosclair, and I run Strykora from Ashton Drive in Thibodaux. Call (985) 714-9562 and you get me, and I do the work myself. The case studies link to websites I built for clients in Thibodaux, Raceland, Lockport and Gonzales.',
      ],
    },
  ],
  'web-design-baton-rouge-la': [
    {
      heading: 'What web design costs in Baton Rouge.',
      paragraphs: [
        'Strykora builds custom websites for one fixed price, paid once, and you own every file when it is done. Around Baton Rouge you will see quotes from a few hundred dollars for a template reskin up to five figures from the bigger downtown agencies. Most of that price gap has nothing to do with how the site looks. It comes down to what is underneath: page speed, schema markup, city pages, and whether anyone actually built the thing to rank.',
        'Be careful with the monthly bundle deals where the website is "free" and you pay a couple hundred a month forever. Read the fine print on who owns the site. In most of those arrangements, cancel the payment and the website disappears with it.',
      ],
    },
    {
      heading: 'Custom code or WordPress?',
      paragraphs: [
        'Most Baton Rouge web design companies build on WordPress, and plenty of decent sites run on it. Strykora builds custom-coded sites on Next.js instead. The difference shows up after launch. WordPress sites carry a stack of plugins that need updating and patching for security holes. A custom-coded site has none of that maintenance overhead, and it loads faster than page-builder output on the same hosting.',
        'If you already have a WordPress site that ranks, keep it and put the budget into SEO. If you are starting over anyway, there is no reason to inherit the maintenance.',
      ],
    },
    {
      heading: 'Already building for the Baton Rouge metro.',
      paragraphs: [
        'Strykora client All Out Window Tint runs locations in Gonzales and Baton Rouge, and ChatGPT has recommended them for tint work in the area. That build is documented in the case studies, screenshots included.',
        'Strykora is based in Thibodaux, about an hour from Baton Rouge, and works with metro clients over calls and shared page drafts. Two current clients are in the Baton Rouge metro already.',
      ],
    },
  ],
}

/** Combos whose page sells more than the base service get their own "what you get" list. */
const COMBO_BULLETS: Record<string, string[]> = {
  'digital-marketing-thibodaux-la': [
    'A website built from scratch that you own outright',
    'Local SEO and Google Business Profile management',
    'Google Ads, if you need calls sooner',
    'Help getting your business recommended in answers from ChatGPT, Perplexity and Google\'s AI',
    'A monthly report in plain English showing where you rank in search, what changed and how many leads came in',
    'Month to month, with no 12-month commitment and no fee for leaving early',
  ],
}
COMBO_BULLETS['digital-marketing-baton-rouge-la'] = COMBO_BULLETS['digital-marketing-thibodaux-la']
/** Pages that explain pricing once ("How pricing works" + the cost FAQ) instead of in every box. No dollar amounts anywhere on the site (Dayne 2026-11-19). */
const PRICE_ONCE = new Set(['digital-marketing-thibodaux-la'])
/** These combos carry their own FAQs; the shared city FAQs are about local SEO and would duplicate the SEO page. */
const SKIP_CITY_FAQS = new Set(['digital-marketing-thibodaux-la', 'digital-marketing-baton-rouge-la'])

/**
 * Per-combo FAQs shown ahead of the shared city FAQs and included in FAQPage schema.
 */
const COMBO_EXTRA_FAQS: Record<string, { q: string; a: string }[]> = {
  'digital-marketing-thibodaux-la': [
    {
      q: 'How much does a marketing agency cost in Thibodaux?',
      a: 'A Strykora website is one fixed price, paid once. The local SEO plan and Google Ads management are flat monthly fees with no long-term contract, and ad spend goes straight to Google. You can start with one service and add others later. Every quote comes in writing within one business day.',
    },
    {
      q: 'Do you manage Facebook or Instagram?',
      a: 'No. Strykora works on your website and helps people find your business through Google search, your Google Business Profile, Google Ads and AI search when they are ready to hire.',
    },
    {
      q: 'Do I have to sign a contract?',
      a: 'No. SEO and Google Ads are month to month, and there is no fee if you stop. Your website is a one-time project, and it is yours when it is done.',
    },
  ],
  'digital-marketing-baton-rouge-la': [
    {
      q: 'What does a digital marketing agency in Baton Rouge do for a service business?',
      a: 'At Strykora it means your website, local SEO, your Google Business Profile and Google Ads, all run by the person who builds the site. It does not include managing Facebook or Instagram, photo shoots or video.',
    },
    {
      q: 'Is one agency for everything better than separate vendors?',
      a: 'Usually, for a service business. The ads send people to pages built to turn them into calls, and the SEO work happens on the same site. With separate vendors, nobody owns the whole picture when the leads slow down.',
    },
    {
      q: 'Do I have to sign a contract?',
      a: 'No. SEO and Google Ads run month to month with no fee to stop. The website is a one-time project, and it is yours when it is done.',
    },
  ],
  'web-design-baton-rouge-la': [
    {
      q: 'How much does web design cost in Baton Rouge?',
      a: 'A Strykora custom build is one fixed price, paid once, and includes copywriting, SEO structure, schema markup, and mobile testing. The site is yours when it is done. Ongoing SEO is optional, month to month.',
    },
    {
      q: 'Do you build WordPress sites?',
      a: 'No. Every Strykora site is custom-coded on Next.js. It loads faster than WordPress, has no plugins to maintain, and gives Google and the AI engines a cleaner page to read.',
    },
    {
      q: 'Can you meet in person in Baton Rouge?',
      a: 'Strykora is in Thibodaux, about an hour out. Most projects run entirely over phone calls and emailed drafts, and that has worked for our existing Baton Rouge metro clients. If a project needs a face-to-face, ask. It is about an hour of driving, so a sit-down is doable when it matters.',
    },
  ],
}

/**
 * City FAQs for the web design pages. CITY_COPY faqs are about ranking, so they stay on the SEO pages;
 * without this split each city's design and SEO pages repeated the same answers (audit 2026-11-18).
 */
const WEB_DESIGN_CITY_FAQS: Record<string, { q: string; a: string }[]> = {
  'thibodaux-la': [
    {
      q: 'Do I need a website if most of my work comes from referrals?',
      a: 'Yes, because the person who got the referral looks you up before calling. In a word-of-mouth town, the website backs up what the neighbor said: photos of real jobs, the towns you cover, and a phone number that is easy to tap.',
    },
    {
      q: 'Can the site show my work around Lafourche Parish?',
      a: 'Yes. Each service you want calls for gets its own page, and the gallery says where each job was done, so a buyer in Raceland, Lockport or Cut Off can see work near them.',
    },
    {
      q: 'What do you need from me to build the site?',
      a: 'Your logo if you have one, your list of services and the towns you work, photos of real jobs, and about an hour on the phone. Strykora writes the copy and sends you drafts to approve.',
    },
  ],
  'houma-la': [
    {
      q: 'What should a Houma service business website show first?',
      a: 'That you work in Terrebonne Parish: the towns you cover, like Bayou Blue, Gray and Chauvin, recent job photos, and a phone number at the top. Buyers here want to know you are local before they read anything else.',
    },
    {
      q: 'Will my site load on a weak phone signal?',
      a: 'Strykora builds lightweight sites that load the main content first, which matters down the bayou where the signal drops. Every site gets checked on a phone before it goes live.',
    },
    {
      q: 'Should storm work get its own page?',
      a: 'If you do storm work, like roof tarping, generator installs or debris cleanup, yes. People search for those jobs by name right after a storm, and a page for each one is how you show up.',
    },
  ],
  'new-orleans-la': [
    {
      q: 'Can a Thibodaux company build a site for a New Orleans business?',
      a: 'Yes. Most of the work runs over calls and shared drafts, and Strykora is about an hour from the city. What matters more is that the site is written about the parishes you serve, Orleans, Jefferson or St. Tammany, and shows your New Orleans jobs.',
    },
    {
      q: 'What makes a New Orleans service website get calls?',
      a: 'Buyers here compare several options before they call, so reviews, photos of recent jobs, and the neighborhoods you serve need to sit near the top. A site that hides that on a portfolio page loses to one that shows it right away.',
    },
    {
      q: 'Should Metairie, Kenner or the Northshore get their own pages?',
      a: 'If you actually take work there, yes. A page for each area you serve, written about that area, does better than one page that lists every town.',
    },
  ],
  'lafayette-la': [
    {
      q: 'Will a site built in Thibodaux feel local to Lafayette buyers?',
      a: 'It should, because it is written about Acadiana: the parishes and towns you cover and your own job photos. The copy is written for your market, not pulled from a template.',
    },
    {
      q: 'What should a Lafayette service website include?',
      a: 'A page for each main service, the towns you cover such as Broussard, Youngsville, Scott or Carencro, real job photos, and a phone number that is easy to tap. That is what buyers here look for before they call.',
    },
    {
      q: 'Is my old site worth keeping?',
      a: 'If it loads fast, ranks for something, and you can update it, maybe. If it is a slow template you rent month to month, a rebuild you own is usually the better spend.',
    },
  ],
}

/**
 * Real local work, checked against the live client sitemaps (2026-11-20). Only cities with
 * published Strykora work get this section; Lafayette and New Orleans have none yet.
 */
const CITY_PROOF: Record<string, { client: string; href: string; text: string }[]> = {
  'thibodaux-la': [
    { client: 'Acadia Pools', href: '/case-studies/acadia-pools', text: 'A Thibodaux gunite pool builder. Its site has separate Thibodaux pages for pool construction, renovation, water features and outdoor living, plus pages for Houma and Raceland.' },
    { client: 'Hover Septic', href: '/case-studies/hover-septic', text: 'A Thibodaux septic company that had no website and no Google Business Profile. Strykora built both, and Hover ranks #1 organic for "septic installs Thibodaux LA".' },
    { client: 'Foret Construction & Roofing', href: '/case-studies/foret-construction', text: 'Based in Raceland, with Thibodaux pages for FORTIFIED roofs and new home construction.' },
    { client: 'Elite Custom Automotive', href: '/case-studies/elite-custom-automotive', text: 'Based in Lockport, with Thibodaux pages for lift kits, engine and transmission work, and custom wheels and tires.' },
  ],
  'houma-la': [
    { client: 'Foret Construction & Roofing', href: '/case-studies/foret-construction', text: 'Houma pages for FORTIFIED roofs and for new home construction, alongside its Raceland and Thibodaux pages.' },
    { client: 'Elite Custom Automotive', href: '/case-studies/elite-custom-automotive', text: 'Houma pages for lift kits and suspension, engine and transmission work, and custom wheels and tires.' },
    { client: 'Acadia Pools', href: '/case-studies/acadia-pools', text: 'A pool builder page for Houma on the Thibodaux pool company\'s site.' },
  ],
  'baton-rouge-la': [
    { client: 'All Out Window Tint', href: '/case-studies/all-out-window-tint', text: 'One website for two shops. The Baton Rouge shop has its own location page and its own pages for automotive, residential, commercial and marine tint, paint protection film and vehicle wraps, and Baton Rouge inquiries go straight to co-owner Dax.' },
  ],
}

const CITY_COPY: Record<string, CityMarketCopy> = {
  'thibodaux-la': {
    marketContext:
      'Thibodaux is the Lafourche Parish seat and home to Nicholls State. A lot of people along Bayou Lafourche do business in town, from folks at Nicholls, the sugar mills and local farms to people who work in marine and oilfield services along Highway 1, all the way down to the service yards in South Lafourche.',
    buyerSnapshot:
      'Most people looking for a service in Thibodaux get a business name from a neighbor and look it up on Google before they call. What they see on your website helps them decide whether to call.',
    faqs: [
      {
        q: 'How is Thibodaux different from Houma or Lafayette for local SEO?',
        a: 'Thibodaux is a smaller, denser market. Fewer competitors means rankings move faster, but the keyword volume per page is lower. The play is to rank for everything (every service in every parish) instead of fighting for a single big keyword.',
      },
      {
        q: 'Do you handle Lafourche Parish service-area SEO?',
        a: 'Yes. Most Thibodaux service businesses cover Lafourche Parish from Galliano to the city. Strykora builds a Thibodaux city page plus a Lafourche Parish service area page that targets buyers in Cut Off, Larose, and the South Lafourche oilfield corridor.',
      },
      {
        q: 'Should I target Houma buyers from my Thibodaux site?',
        a: 'Only if you genuinely service Terrebonne Parish. If yes, you need a dedicated Houma city page with Terrebonne-specific copy. Listing "Houma" in your Thibodaux footer is not enough to rank there.',
      },
    ],
  },
  'houma-la': {
    marketContext:
      'Houma is the seat of Terrebonne Parish and a center for marine, oilfield and seafood work in South Louisiana. Oilfield service, marine logistics and fabrication drive a lot of the local economy, and every hurricane season changes what people search for.',
    buyerSnapshot:
      'Houma buyers want to see that you are local: a Terrebonne address or service area, and recent job photos from around the parish.',
    faqs: [
      {
        q: 'How competitive is the Houma SEO market?',
        a: 'Moderate. Several established Houma service businesses rank well on Google. A faster site with more useful pages and a well-kept Google Business Profile can compete with them. How long that takes depends on your trade and how far behind you start.',
      },
      {
        q: 'Do I need a separate Houma site or just a Houma page?',
        a: 'A Houma page on your main site is almost always the right answer. Separate domains split your link equity and double the SEO work. The exception is multi-location operators with separate brands per market.',
      },
      {
        q: 'What about Terrebonne Parish-wide targeting?',
        a: 'Strykora builds a Houma city page plus a Terrebonne Parish service area page so you rank for buyers in Bayou Blue, Chauvin, and Dulac, not just downtown Houma.',
      },
    ],
  },
  'baton-rouge-la': {
    marketContext:
      'Baton Rouge is the state capital and Louisiana\'s second-largest market. The economy runs on state government, LSU, the petrochemical corridor along the Mississippi River, and a sprawling residential service market across East Baton Rouge, Ascension, and Livingston Parishes. SEO competition is real here, but the buyer volume is real too.',
    buyerSnapshot:
      'Buyers here check the website before they call, and they have plenty of alternatives if what they find looks dated.',
    faqs: [
      {
        q: 'How long does it take to rank in Baton Rouge?',
        a: 'Longer than smaller Louisiana markets. Expect 90 to 180 days for meaningful organic lift in Baton Rouge, faster for niche queries (specific brand installer, specific subservice) and slower for broad terms like "[service] near me".',
      },
      {
        q: 'Should I target Ascension and Livingston Parishes from my Baton Rouge site?',
        a: 'Yes, with dedicated city pages for Gonzales, Prairieville, Denham Springs, and Walker if you service them. East Baton Rouge alone leaves Ascension and Livingston traffic on the table.',
      },
      {
        q: 'Is the Baton Rouge SEO market saturated?',
        a: 'For broad keywords, yes. For specific service plus city plus niche combinations, no. Strykora targets the long-tail combinations that established Baton Rouge agencies overlook.',
      },
      {
        q: 'How does Baton Rouge differ from a New Orleans market entry?',
        a: 'Baton Rouge is less competitive than New Orleans for most local service categories and rewards consistent local content. New Orleans rewards aggressive link building and review velocity. The cost to rank is meaningfully lower in Baton Rouge.',
      },
    ],
  },
  'new-orleans-la': {
    marketContext:
      'New Orleans is the largest, oldest, and most competitive market in Louisiana. The economy spans tourism, port logistics, healthcare, construction, and a dense residential service market across Orleans, Jefferson, and St. Tammany Parishes. Local SEO here rewards aggressive review velocity, strong link building, and substantive content.',
    buyerSnapshot:
      'New Orleans buyers vet you against more options. Reviews, photos, and recent work matter more here than in any other Louisiana market.',
    faqs: [
      {
        q: 'Can a Thibodaux-based agency rank a New Orleans business?',
        a: 'Yes. Where the agency sits matters less than the work. For a New Orleans business, Strykora builds pages about the parishes you serve (Orleans, Jefferson or St. Tammany), sets up your Google Business Profile for the area, and goes after links from New Orleans sites.',
      },
      {
        q: 'How competitive is New Orleans for local service SEO?',
        a: 'High. Established New Orleans service businesses have been investing in SEO for years. The way in is a site that is faster on a phone, more useful pages about the neighborhoods and parishes you serve, and a steady flow of reviews.',
      },
      {
        q: 'How long until I see leads from New Orleans SEO?',
        a: 'Plan for 120 to 240 days for meaningful organic lift in New Orleans. Pairing SEO with Google Ads is usually worth it here, so calls come in while the rankings build.',
      },
    ],
  },
  'lafayette-la': {
    marketContext:
      'Lafayette is the heart of Acadiana and a service economy anchored by oilfield, healthcare, and agriculture. The search results are moderately competitive, with several established Acadiana agencies and a number of national lead-gen sites farming local queries.',
    buyerSnapshot:
      'A Lafayette site that names the parish and the towns you cover and shows your own jobs makes it clear you work in Acadiana.',
    faqs: [
      {
        q: 'Does it matter that Strykora is in Thibodaux, not Lafayette?',
        a: 'Less than you might think. What makes a Lafayette site work is what is on it: the parishes and towns you cover, your own job photos and your reviews. Strykora is about two hours away and runs most projects over calls and shared drafts.',
      },
      {
        q: 'How does Lafayette differ from Baton Rouge for SEO?',
        a: 'Lafayette has less keyword volume than Baton Rouge but less competition too. Niche keywords (specific service plus Lafayette Parish) rank fast. Broad keywords are slower but achievable.',
      },
      {
        q: 'Do you target Acadia and St. Martin Parishes from Lafayette?',
        a: 'Yes, when you service them. Strykora builds a Lafayette city page plus parish service area pages so you rank in Crowley, Breaux Bridge, and the surrounding Acadiana parishes.',
      },
    ],
  },
}

/** Closing line per service type, with the city in it, so city pages don't share one close. */
const CITY_CTA_BODY: Record<string, (city: string) => string> = {
  'web-design': (city) =>
    `Tell me about your business in ${city} and the work you want the site to bring in. Within one business day you'll get a fixed-price quote. There's no sales call.`,
  seo: (city) =>
    `Tell me which jobs you want more of in ${city}. I'll reply within one business day with what the local SEO plan would cover for you.`,
  default: (city) =>
    `Tell me what brings in work in ${city} now and what doesn't. I'll reply within one business day with where I would start.`,
}

export default function CityServicePage({ slug }: Props) {
  const combo = cityServiceCombos.find((c) => c.slug === slug)
  if (!combo) return null

  const serviceKey = SERVICE_BY_COMBO_SLUG[combo.service] ?? combo.service
  const service = services.find((s) => s.slug === serviceKey)
  const city = cities.find((c) => c.slug === combo.citySlug)
  if (!service || !city) return null
  const label = comboLabel(combo.service, service.title)

  const cityCopy = CITY_COPY[city.slug]
  const deepDive = COMBO_DEEP_DIVE[slug]
  const otherCombos = cityServiceCombos.filter((c) => c.citySlug === city.slug && c.slug !== slug)
  const otherCities = cityServiceCombos.filter((c) => c.service === combo.service && c.citySlug !== city.slug)

  const title = `${label.title} in ${city.name}, ${city.state}`

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: COMBO_HERO_DESCRIPTION[slug] ?? service.long,
      provider: { '@id': `${site.url}/#business` },
      areaServed: {
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'AdministrativeArea', name: city.parish },
      },
      serviceType: label.title,
      url: `${site.url}/${slug}`,
      offers: {
        '@type': 'Offer',
        description: service.priceRange,
        priceCurrency: 'USD',
      },
    },
  ]
  const isWebDesign = combo.service === 'web-design'
  const cityFaqs = isWebDesign ? WEB_DESIGN_CITY_FAQS[city.slug] ?? [] : cityCopy?.faqs ?? []
  // Baton Rouge web design carries its own three FAQs; adding the city ones would repeat the SEO page.
  const sharedCityFaqs = SKIP_CITY_FAQS.has(slug) || (isWebDesign && COMBO_EXTRA_FAQS[slug]) ? [] : cityFaqs
  const pageFaqs = [...(COMBO_EXTRA_FAQS[slug] ?? []), ...sharedCityFaqs]
  if (pageFaqs.length > 0) {
    schemas.push(buildFaqSchema(pageFaqs))
  }

  return (
    <>
      <Schema data={schemas} />
      <PageHero
        eyebrow={`${city.name}, ${city.state}`}
        title={title}
        description={COMBO_HERO_DESCRIPTION[slug] ?? `${service.short} Built for ${city.name} businesses by an operator in ${site.address.city}.`}
        actions
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: `/${slug}`, label: title },
        ]}
      />

      <section className="ledger-section city-market" aria-labelledby="city-market-heading">
        <div className="site-container">
          <div className="city-market-copy">
            <h2 id="city-market-heading" className="interior-title">
              Why hire Strykora for {label.phrase} in {city.name}?
            </h2>
            {cityCopy ? (
              <>
                <p className="interior-copy">{cityCopy.marketContext}</p>
                <p className="city-buyer-note">
                  {cityCopy.buyerSnapshot} {LEAD_IN[combo.service] ?? LEAD_IN['web-design']}{!PRICE_ONCE.has(slug) && <> <span>{service.priceRange}</span></>}
                </p>
              </>
            ) : (
              <p className="interior-copy">
                Strykora handles {label.phrase} for {city.name} businesses, and you own everything that gets built. <span>{service.priceRange}</span>
              </p>
            )}
            <ul className="interior-ruled-list" role="list">
              {(COMBO_BULLETS[slug] ?? service.bullets).map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>

          <aside className="city-snapshot surface-dark" aria-labelledby="city-snapshot-label">
            <p id="city-snapshot-label" className="eyebrow">Local snapshot</p>
            <dl>
              <div className="city-snapshot-place"><dt>City</dt><dd>{city.name}, {city.state}</dd></div>
              <div><dt>Parish</dt><dd>{city.parish}</dd></div>
              <div><dt>Service</dt><dd>{label.title}</dd></div>
              {!PRICE_ONCE.has(slug) && <div><dt>Pricing</dt><dd>{service.priceRange}</dd></div>}
              <div><dt>Ownership</dt><dd>Yours</dd></div>
            </dl>

            {otherCombos.length > 0 && (
              <div className="city-snapshot-services">
                <p className="eyebrow">Other services in {city.name}</p>
                <ul className="interior-directory">
                  {otherCombos.map((other) => (
                    <li key={other.slug}>
                      <Link href={`/${other.slug}`} className="text-link">
                        {comboLabel(other.service, services.find((s) => s.slug === (SERVICE_BY_COMBO_SLUG[other.service] ?? other.service))?.title ?? '').title} in {other.cityName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ProjectActions />
          </aside>

          <section className="city-industries" aria-labelledby="city-industries-heading">
            <h2 id="city-industries-heading" className="interior-title">Who Strykora works with in {city.name}</h2>
            <ul className="interior-directory city-directory">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`} className="text-link">{industry.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {CITY_PROOF[city.slug] && (
        <section className="ledger-section city-market-notes interior-rule" aria-labelledby="city-proof-heading">
          <div className="site-container">
            <section>
              <h2 id="city-proof-heading" className="interior-title">Strykora work near {city.name}</h2>
              <div className="interior-copy">
                <p>These are live sites Strykora built, with pages aimed at customers in and around {city.name}.</p>
                <ul>
                  {CITY_PROOF[city.slug].map((p) => (
                    <li key={p.client}>
                      <Link href={p.href} className="text-link">{p.client}</Link>: {p.text}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </section>
      )}

      {deepDive && (
        <section className="ledger-section city-market-notes interior-rule" aria-label={`More about ${label.phrase} in ${city.name}`}>
          <div className="site-container">
            {deepDive.map((note) => (
              <section key={note.heading}>
                <h2 className="interior-title">{note.heading}</h2>
                <div className="interior-copy">
                  {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}

      {pageFaqs.length > 0 && (
        <Section
          id="city-faq"
          className="interior-faq interior-wash interior-rail"
          eyebrow="FAQ"
          heading={`Questions about ${label.phrase} in ${city.name}`}
        >
          <FAQAccordion items={pageFaqs} />
        </Section>
      )}

      {otherCities.length > 0 && (
        <Section
          id="other-cities"
          className="city-coverage interior-rule"
          eyebrow="Also serving"
          heading={`Strykora also offers ${label.phrase} in other parts of Louisiana`}
          description={`Strykora works with businesses across South Louisiana. Pick a city to see what changes for ${label.phrase} there.`}
        >
          <ul className="interior-directory city-directory">
            {otherCities.map((other) => (
              <li key={other.slug}>
                <Link href={`/${other.slug}`} className="text-link">{other.cityName}, LA</Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTA heading={`Need help with ${label.phrase} in ${city.name}?`} body={CITY_CTA_BODY[combo.service]?.(city.name) ?? CITY_CTA_BODY.default(city.name)} />
    </>
  )
}

/**
 * Digital-marketing combos reuse the SEO service's details, but need their OWN heading: without this both
 * /digital-marketing-thibodaux-la and /seo-thibodaux-la said "Local SEO in Thibodaux, LA" (Dayne 2026-11-17).
 */
const COMBO_LABEL: Record<string, { title: string; phrase: string }> = {
  'digital-marketing': { title: 'Digital Marketing Agency', phrase: 'digital marketing' },
}
/** Lowercase for mid-sentence use, but keep acronyms: "Local SEO" -> "local SEO", not "local seo". */
function midSentence(title: string) {
  return title.split(' ').map((w) => (w === w.toUpperCase() ? w : w.toLowerCase())).join(' ')
}
function comboLabel(comboService: string, serviceTitle: string) {
  return COMBO_LABEL[comboService] ?? { title: serviceTitle, phrase: midSentence(serviceTitle) }
}

/** Sentence after the city's buyer snapshot, matched to what the page sells. */
const LEAD_IN: Record<string, string> = {
  'web-design': 'Strykora builds that website for you, and you own it outright.',
  seo: 'Strykora\'s job is to make sure your business is the one they find, in the map results and the listings below them.',
  'digital-marketing': 'Strykora builds the website and runs the search work that sends people to it.',
}

export function buildMetadata(slug: string) {
  const combo = cityServiceCombos.find((c) => c.slug === slug)
  if (!combo) return {}
  const serviceKey = SERVICE_BY_COMBO_SLUG[combo.service] ?? combo.service
  const service = services.find((s) => s.slug === serviceKey)
  const city = cities.find((c) => c.slug === combo.citySlug)
  if (!service || !city) return {}
  const title = `${comboLabel(combo.service, service.title).title} in ${city.name}, ${city.state}`
  const description =
    COMBO_META_DESCRIPTION[slug] ??
    `${service.title} in ${city.name}, ${city.state} for service businesses. ${service.short.slice(0, 100)}`
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/${slug}` },
    openGraph: { title, description, url: `${site.url}/${slug}`, images: [ogImage] },
  }
}
