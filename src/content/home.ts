import { caseStudies, site } from '@/config/site'

export const home = {
  hero: {
    eyebrow: `${site.address.city}, ${site.address.state} · Web design + SEO`,
    firstLine: 'Louisiana web design, built so',
    secondLine: 'Google sends people to\u00a0it.',
    body: 'Stop renting a templated website you\'ll never own. Strykora builds you a fast, custom site that you own outright, then does the local SEO that gets it found in Google, in the map results, and in AI answers like ChatGPT.',
    workLink: 'See the work',
  },
  services: {
    eyebrow: 'What we do',
    firstLine: 'Web design first.',
    secondLine: 'SEO that stacks on top.',
    body: 'Four core services, plus a fifth nobody else in Louisiana sells: AI Search Optimization. Every quote is a fixed price in writing before any work starts, with no 12-month contracts. Strykora does not do content writing, social media, or photography. Those get referred out. Sticking to what we are great at keeps the work sharp.',
    featuredEyebrow: 'The Louisiana moat',
    featuredLink: 'See the playbook',
  },
  industries: {
    eyebrow: 'Industries we serve',
    heading: 'Built for Louisiana service and commercial businesses.',
    body: 'Strykora is not a generic marketing agency. Strykora builds for the specific verticals where local search and AI Overviews actually decide who gets the call.',
    link: 'See approach',
  },
  proof: {
    eyebrow: 'Real AI search receipts',
    heading: 'Five clients. Multiple AI engines. Real screenshots.',
    body: 'Most agencies talk about being "ready for AI search." These are actual answers from ChatGPT and Perplexity, captured between June and October 2026, when real customers asked who to call. Strykora clients win across five different verticals.',
    depth: 'Depth: one client, two AI tools, three answers',
    depthLink: 'See the Hover Septic case study',
    breadth: 'Breadth: four more clients, four verticals, four cities',
    caseLink: 'Read the case study',
    link: 'See how Strykora ranks clients inside AI answers',
  },
  caseStudy: {
    eyebrow: 'Recent work',
    heading: 'The proof Strykora\'s AI search playbook actually works.',
    link: 'Read the full story',
    allLink: 'See all case studies',
  },
  reviews: {
    heading: 'Real clients. Real reviews.',
  },
  why: {
    eyebrow: `Why ${site.name}`,
    heading: 'Everything your last agency told you didn\'t come standard.',
    founder: `Founder · ${site.address.city}, ${site.address.state}`,
  },
  comparison: {
    eyebrow: 'Strykora vs. the typical Louisiana agency',
    heading: 'The fine print everyone else hides.',
    body: 'Built from real conversations with Louisiana business owners who switched to Strykora from somebody else.',
    feature: 'What you\'re comparing',
    agency: 'Typical agency',
  },
  process: {
    eyebrow: 'How it works',
    heading: 'Four steps from kickoff to ranking.',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Common questions, honest answers.',
  },
  cta: {
    eyebrow: 'Get in touch',
    firstLine: 'Your competitor\'s site loads in a second.',
    secondLine: 'What does yours do?',
    body: 'Take a minute to tell me about your business. Within one business day, I\'ll send you a fixed-price quote and tell you whether I think I can help. There\'s no sales call.',
    projectLink: 'Start a project',
    phoneLink: `Call ${site.phoneDisplay}`,
  },
} as const

export const pillars = [
  {
    label: '01',
    title: 'You own everything, day one',
    body: 'The site, the code, the domain, the Google Business Profile, the analytics. No monthly platform tax. No agency holding your accounts hostage when you leave.',
  },
  {
    label: '02',
    title: 'You call, Dayne answers',
    body: 'No account managers, no offshore handoffs, no tickets. The person building your site is the same person who responds within one business day.',
  },
  {
    label: '03',
    title: 'Found in Google AND in ChatGPT',
    body: 'Strykora ranks you on Google, in Google AI Overviews, and inside the ChatGPT, Perplexity, and Gemini answers your future customers are already starting to trust.',
  },
  {
    label: '04',
    title: 'Real numbers, not vibes',
    body: 'Fixed-price quotes up front. No 12-month contracts. Monthly reports show tracked rankings, booked leads, and what changed. If it isn\'t working, you see it.',
  },
]

export const comparisonRows = [
  { label: 'Build time', them: '2–3 months', us: 'About 1 week once it starts' },
  { label: 'Pricing', them: 'Open-ended hourly billing', us: 'One fixed price, in writing, before you pay' },
  { label: 'Who owns the site', them: 'The agency does. Try leaving.', us: 'You do. Day one. Take it with you anywhere.' },
  { label: 'Contract length', them: '12-month minimum, auto-renew', us: 'Month-to-month, cancel any time' },
  { label: 'Who you actually talk to', them: 'An account manager, then a junior, then a ticket queue', us: 'Dayne. The person building your site.' },
  { label: 'AI search optimization', them: 'Add-on, if they offer it at all', us: 'Standard on every build' },
  { label: 'Response time', them: '3–14 days for a text change', us: 'One business day. Often same day.' },
  { label: 'Monthly reporting', them: 'A PDF of impressions and "engagement"', us: 'Tracked rankings, AI mentions of your business, and booked leads' },
]

export const processSteps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Strykora pins down your services, cities, and the highest-ticket keywords worth ranking for. One call, written brief, no fluff.',
  },
  {
    n: '02',
    title: 'Build',
    body: 'Custom-built site, mobile-first, schema-rich, deployed to a preview URL within days for your sign-off.',
  },
  {
    n: '03',
    title: 'Rank',
    body: 'On-page SEO, Google Business Profile optimization, and technical foundations all live before launch.',
  },
  {
    n: '04',
    title: 'Grow',
    body: 'Monthly SEO retainer or pay-as-you-go ads. Transparent reporting, no long-term lock-in.',
  },
]

export const faqs = [
  {
    q: 'How long does a custom website take to build?',
    a: `Most Strykora websites go live about a week after the build starts. The stack is dialed in and you work directly with the builder, so there are no agency handoffs, offshore queues, or design committees slowing the project down.`,
  },
  {
    q: 'How much does a Strykora website cost?',
    a: `It depends on what you need. A website is quoted by the number of pages and how much custom work it takes, and you pay for it once. Local SEO and Google Ads management are flat monthly fees with no long-term contract. Every quote is a fixed price in writing before any work starts, with no hourly billing. Send the form or call and you will have a number within one business day.`,
  },
  {
    q: 'Why custom-built instead of Wix, Squarespace, or WordPress?',
    a: `Custom-built sites (Strykora uses Next.js, a popular professional framework) load faster, stay fast as you add pages, and come with the behind-the-scenes code Google reads to understand who you are. Page builders and templated WordPress sites add bloat that slows the site down and hurts your search rankings. You also own everything outright, so you can leave Strykora at any time without rebuilding from scratch.`,
  },
  {
    q: 'Do you do SEO without redesigning the site?',
    a: `Yes. The local SEO plan works on whatever platform you are on. That said, if your current site is on Wix or a slow WordPress build, a rebuild usually moves the needle further than six months of SEO on the broken foundation.`,
  },
  {
    q: 'What cities and markets do you serve?',
    a: `Strykora is built in ${site.address.city}, Louisiana and serves the whole state. The strongest markets are Thibodaux, Houma, Baton Rouge, New Orleans, and Lafayette, but Strykora ships sites for clients anywhere in Louisiana.`,
  },
  {
    q: 'Do you work with clients outside Louisiana?',
    a: `Strykora is built around the Louisiana market: the buyers, the search behavior, the seasonal cycles, and the map-results dynamics. That depth is the wedge for the case study work. But web design, Google Ads, and AI search optimization are location-agnostic, so out-of-state inquiries are welcome. Just ask.`,
  },
  {
    q: 'Do you offer content writing, social media, or photography?',
    a: `No. Strykora is web design and SEO only. For copywriting, social media management, or photo and video, Strykora refers to Louisiana freelancers who specialize. Honest scope keeps quality high.`,
  },
  {
    q: 'How are you different from a generic marketing agency?',
    a: `Generic agencies are wide and shallow: content, social, ads, design, branding, all average. Strykora is narrow and deep: custom web design and local SEO, done by the person who builds your site. No account manager, no template, no platform tax.`,
  },
  {
    q: 'How do you measure success?',
    a: `Booked leads, phone calls, form submissions, and tracked ranking positions for the keywords that pay your bills. Every retainer client gets a monthly report that shows what changed, what ranked, and what to do next.`,
  },
  {
    q: 'How fast will you respond to my inquiry?',
    a: `Strykora responds to every project inquiry within one business day. You will hear whether Strykora can help and, if so, get a fixed-price quote and timeline.`,
  },
]

export const featuredCase = caseStudies.find((c) => 'featured' in c && c.featured) ?? caseStudies[0]

export interface HomeCitation {
  src: string
  alt: string
  label: string
  lead: string
  quote: string
  follow: string
  href?: string
}

export const citations: readonly HomeCitation[] = [
  {
    src: '/images/ai-citation-perplexity-hover.jpg',
    alt: 'Screenshot of Perplexity recommending Hover Septic Services as the strongest option for a septic installer in Thibodaux, Louisiana.',
    label: 'Perplexity · Hover Septic',
    lead: 'Query: ',
    quote: '"Recommend me the best septic system installer in Thibodaux LA."',
    follow: ' Answer leads with Hover Septic.',
  },
  {
    src: '/images/ai-citation-chatgpt-best-overall.jpg',
    alt: 'Screenshot of ChatGPT crowning Hover Septic Services as \'Best overall\' for septic installation in Thibodaux, Louisiana.',
    label: 'ChatGPT · Hover Septic',
    lead: 'Query: ',
    quote: '"Recommend me the best septic installation service Thibodaux LA."',
    follow: ' Answer crowns Hover Septic as "Best overall."',
  },
  {
    src: '/images/ai-citation-chatgpt-why-hover.jpg',
    alt: 'Screenshot of ChatGPT explaining why Hover Septic is the closest match for septic installation in Thibodaux.',
    label: 'ChatGPT follow-up · Hover',
    lead: '',
    quote: '"Why I\'d start with Hover."',
    follow: ' The AI explains its own pick, citing the exact positioning Strykora built into the site.',
  },
  {
    src: '/images/ai-citation-chatgpt-foret-raceland.jpg',
    alt: 'Screenshot of ChatGPT naming Foret Construction and Roofing its top local pick for the best roofing company in Raceland, Louisiana.',
    label: 'ChatGPT · Foret Construction & Roofing',
    lead: 'Query: ',
    quote: '"Best roofing company in Raceland."',
    follow: ' Answer: "My top local pick would be Foret Construction & Roofing LLC." Captured October 2026.',
    href: '/case-studies/foret-construction',
  },
  {
    src: '/images/ai-citation-perplexity-elite.jpg',
    alt: 'Screenshot of Perplexity recommending Elite Custom Automotive as the best lift kit installer in Lockport, Louisiana.',
    label: 'Perplexity · Elite Custom Automotive',
    lead: 'Query: ',
    quote: '"Recommend me the best auto shop in Lockport that does lift kits."',
    follow: ' Answer: "The best match I found in Lockport is Elite Custom Automotive."',
    href: '/case-studies/elite-custom-automotive',
  },
  {
    src: '/images/ai-citation-perplexity-acadia.jpg',
    alt: 'Screenshot of Perplexity recommending Acadia Pools as a strong local option for a pool builder in Thibodaux, Louisiana.',
    label: 'Perplexity · Acadia Pools',
    lead: 'Query: ',
    quote: '"Recommend me a pool builder in Thibodaux LA."',
    follow: ' Answer leads with: "A strong local option in Thibodaux is Acadia Pools."',
    href: '/case-studies/acadia-pools',
  },
  {
    src: '/images/ai-citation-chatgpt-allout.jpg',
    alt: 'Screenshot of ChatGPT naming All-Out Window Tint in its top picks for window tinting in Baton Rouge, Louisiana.',
    label: 'ChatGPT · All Out Window Tint',
    lead: 'Query: ',
    quote: '"Best window tinting shop in Baton Rouge."',
    follow: ' ChatGPT\'s "My pick" list names All-Out Window Tint as "a quality shop with more services."',
    href: '/case-studies/all-out-window-tint',
  },
]
