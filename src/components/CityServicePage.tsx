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
  'web-design-thibodaux-la': 'Thibodaux runs on word-of-mouth and proof of work. When a referral lands on your website, it has to look as legit as the recommendation. Strykora builds Thibodaux service businesses custom sites that match the work, load fast on a phone, and are owned outright by you.',
  'seo-thibodaux-la': 'Thibodaux is a smaller, denser market: fewer competitors, faster rankings, but the keyword volume per page is lower. Strykora wins by ranking you for every search a Lafourche Parish buyer might type, instead of fighting for one big keyword.',
  'digital-marketing-thibodaux-la': 'Strykora is a web design and marketing company in Thibodaux. Strykora can build your website, set up your Google Business Profile and handle your SEO and Google Ads. If you want to show up in answers from ChatGPT and Google, Strykora helps with that too.',
  'web-design-houma-la': 'Houma buyers respond to local proof: a Terrebonne address, recent project photos along the bayou, and a phone that gets answered. Strykora builds Houma service businesses sites that load fast in the field and put the local proof above the fold.',
  'seo-houma-la': 'Houma\'s SEO market is mid-competitive: several established shops with decent rankings, most stuck on slow WordPress sites with thin content. Strykora wins by being faster, more local, and set up so Google\'s AI answer can pull your services and credentials directly.',
  'web-design-baton-rouge-la': 'Baton Rouge buyers expect a polished website. A 2018 WordPress site with a stock-photo hero does not convert in this market the way it might in a smaller town. Strykora builds Baton Rouge service businesses custom sites that match what state-capital buyers expect.',
  'seo-baton-rouge-la': 'Baton Rouge is a competitive SEO market with deep keyword volume and established competitors who have been at it for years. Strykora targets the long-tail city + service + niche combinations the bigger agencies overlook, plus the AI search angle most of them are still ignoring.',
  'digital-marketing-baton-rouge-la': 'Baton Rouge buyers run their decisions through more options before calling. Strykora runs your full digital stack (website, SEO, Google Business Profile, ads, AI search) tuned for a market where both polish and proof matter.',
  'web-design-new-orleans-la': 'New Orleans buyers compare more options before they call. Reviews, photos, and recent work matter more here than in any other Louisiana market. Strykora builds New Orleans service businesses sites that surface the proof above the fold instead of burying it in a portfolio page.',
  'web-design-lafayette-la': 'Lafayette buyers are loyal to local brands and skeptical of out-of-region operators. Strykora builds Lafayette service businesses custom sites that name Lafayette Parish, mention the Acadiana oilfield cycle, and show local proof. Built by a Louisiana operator who knows the geography.',
  'seo-lafayette-la': 'Lafayette has less keyword volume than Baton Rouge but less competition too. Strykora wins niche city + service combinations fast across Acadiana (Lafayette, Crowley, Breaux Bridge) while the broader terms compound over six to twelve months.',
}

/**
 * Per-combo meta description (150-160 chars), keyword-led and city-specific.
 * Falls back to a generated string if a combo is missing.
 */
const COMBO_META_DESCRIPTION: Record<string, string> = {
  'web-design-thibodaux-la': 'Web design in Thibodaux, LA for service businesses. Custom, fast, mobile-first sites you own outright, built to match the work and turn referrals into calls.',
  'seo-thibodaux-la': "Local SEO in Thibodaux, LA. Rank across Lafourche Parish on Google and inside ChatGPT and Google's AI answer, in a smaller market where rankings come faster.",
  'digital-marketing-thibodaux-la': 'Digital marketing in Thibodaux, LA. Website, Google, ads, and AI search run by one Louisiana operator, not an account rep. Month-to-month, no lock-in.',
  'web-design-houma-la': 'Web design in Houma, LA for service businesses. Fast, custom, mobile-first sites that put your Terrebonne Parish local proof above the fold and get calls.',
  'seo-houma-la': "Local SEO in Houma, LA. Outrank the slow WordPress shops across Terrebonne Parish on Google and inside Google's AI answer, with faster, more local pages.",
  'web-design-baton-rouge-la': 'Web design in Baton Rouge, LA for service businesses. Polished custom sites that convert state-capital buyers, load fast on a phone, and are owned by you.',
  'seo-baton-rouge-la': 'Local SEO in Baton Rouge, LA. Win the long-tail city and service searches the big agencies overlook, plus the AI search angle most of them still ignore.',
  'digital-marketing-baton-rouge-la': 'Digital marketing in Baton Rouge, LA. Website, SEO, Google Business Profile, ads, and AI search run as one stack for a market where polish and proof matter.',
  'web-design-new-orleans-la': 'Web design in New Orleans, LA for service businesses. Custom sites that surface reviews, photos, and recent work above the fold so buyers call you first.',
  'web-design-lafayette-la': 'Web design in Lafayette, LA for service businesses. Custom Acadiana sites that name Lafayette Parish, show local proof, and are built by a Louisiana operator.',
  'seo-lafayette-la': 'Local SEO in Lafayette, LA. Win niche city and service searches fast across Acadiana while broader terms compound, on Google and inside AI answers.',
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
      'Houma is the seat of Terrebonne Parish and the marine, oilfield, and seafood capital of South Louisiana. The economy runs on oilfield service, marine logistics, fabrication, and the long shadow of every hurricane that has come up the bayou since Andrew. Buyers here are price-aware, brand-loyal, and Google for service businesses constantly during storm season.',
    buyerSnapshot:
      'Houma buyers respond hardest to local proof: a Terrebonne address, a parish-specific service area, and recent project photos within their own bayou.',
    faqs: [
      {
        q: 'How competitive is the Houma SEO market?',
        a: 'Mid-competitive. Several established Houma service businesses rank decent on Google, but most are stuck on slow WordPress sites with thin content. A faster site with more useful pages and a properly set up Google Business Profile can overtake them. How long that takes depends on your trade and how far behind you start.',
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
        a: 'Yes. SEO is location-agnostic on the agency side. Strykora ranks New Orleans businesses by building city-specific content for Orleans, Jefferson, and St. Tammany Parishes, optimizing your GBP for the Orleans market, and pursuing local link partnerships.',
      },
      {
        q: 'How competitive is New Orleans for local service SEO?',
        a: 'High. Established New Orleans service businesses have been investing in SEO for years. Strykora wins by being faster than them on a phone, set up so Google\'s AI answer can pull from your site, and having more depth (more pages, more FAQs, more New Orleans-specific content).',
      },
      {
        q: 'How long until I see leads from New Orleans SEO?',
        a: 'Plan for 120 to 240 days for meaningful organic lift in New Orleans. Pairing SEO with Google Ads is usually worth it here to fill the gap while SEO compounds.',
      },
    ],
  },
  'lafayette-la': {
    marketContext:
      'Lafayette is the heart of Acadiana and a service economy anchored by oilfield, healthcare, and agriculture. Buyers here are loyal to local brands and skeptical of out-of-region operators. The SERP is moderately competitive, with several established Acadiana agencies and a number of national lead-gen sites farming local queries.',
    buyerSnapshot:
      'Lafayette buyers want a Louisiana operator who understands the local economy. A site that names Lafayette Parish, mentions the oilfield cycle, and shows local proof converts better than a generic agency build.',
    faqs: [
      {
        q: 'Do Lafayette buyers prefer Acadiana-based agencies?',
        a: 'They do, but proof beats geography. Strykora is built in Thibodaux but ranks Lafayette businesses for the keywords that matter, with case studies that show the work.',
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
      description: service.long,
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

      <CTA heading={`Need help with ${label.phrase} in ${city.name}?`} />
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
