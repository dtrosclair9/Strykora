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
    eyebrow: 'Services',
    firstLine: 'Websites first, then the',
    secondLine: 'local SEO that gets them found.',
    body: 'Strykora builds websites, runs local SEO, manages Google Business Profiles and Google Ads, and checks how your business comes up in AI answers. Every quote is a fixed price in writing before any work starts, and there are no 12-month contracts. Strykora writes the content for every site it builds. It does not run social media or do photography, but I can point you to people who do.',
    featuredEyebrow: 'AI search',
    featuredLink: 'How AI search optimization works',
  },
  industries: {
    eyebrow: 'Industries we serve',
    heading: 'Built for Louisiana service and commercial businesses.',
    body: 'Most of the work is for trades: roofers, contractors, home service companies, auto shops, and commercial operators. In those businesses a lot of calls go to whoever shows up first in Google\'s map results.',
    link: 'See approach',
  },
  proof: {
    eyebrow: 'AI search results',
    heading: 'ChatGPT and Perplexity naming Strykora clients.',
    body: 'These are real answers from ChatGPT and Perplexity, captured between June and October 2026, to the kind of question a customer types in: who is the best roofer in Raceland, who does lift kits in Lockport. Each one names a business Strykora built a site for. AI answers change from one run to the next, so read these as snapshots of what came up, not guarantees.',
    depth: 'Hover Septic: three answers from two AI tools',
    depthLink: 'See the Hover Septic case study',
    breadth: 'Four more clients in four other towns',
    caseLink: 'Read the case study',
    link: 'Read about AI search optimization',
  },
  caseStudy: {
    eyebrow: 'Recent work',
    heading: 'A recent project, start to finish.',
    link: 'Read the full story',
    allLink: 'See all case studies',
  },
  reviews: {
    heading: 'What clients said on Google.',
  },
  why: {
    eyebrow: `Why ${site.name}`,
    heading: 'How Strykora works with you.',
    founder: `Founder · ${site.address.city}, ${site.address.state}`,
  },
  comparison: {
    eyebrow: 'Strykora vs. the typical Louisiana agency',
    heading: 'How Strykora compares to a typical agency.',
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
    heading: 'Questions people ask before hiring Strykora.',
  },
  cta: {
    eyebrow: 'Get in touch',
    firstLine: 'Tell me about your business.',
    secondLine: 'I\'ll tell you if I can help.',
    body: 'Send the form or call. Within one business day you get a fixed-price quote, or a plain answer if Strykora is not the right fit. There is no sales call.',
    projectLink: 'Start a project',
    phoneLink: `Call ${site.phoneDisplay}`,
  },
} as const

export const pillars = [
  {
    label: '01',
    title: 'You own the site',
    body: 'The site, the code, the domain, the Google Business Profile and the analytics are yours. You are not renting it month to month like a Wix or Squarespace site, and if you ever leave, all of it goes with you.',
  },
  {
    label: '02',
    title: 'You call, Dayne answers',
    body: 'There is no account manager in between. The person building your site is the one who answers the phone and replies to your emails, within one business day.',
  },
  {
    label: '03',
    title: 'Google first, then the AI answers',
    body: 'The work goes into what Google and the AI tools read about you: your service pages, your Business Profile, and the other sites that mention you. Each month Strykora checks whether ChatGPT, Perplexity and Google\'s AI answer bring you up.',
  },
  {
    label: '04',
    title: 'Reports you can check',
    body: 'Quotes are a fixed price up front and there is no 12-month contract. The monthly report lists the searches Strykora tracks for you, where you rank for each one, the leads that came in, and what changed that month.',
  },
]

export const comparisonRows = [
  { label: 'Build time', them: '2–3 months', us: 'About 1 week once it starts' },
  { label: 'Pricing', them: 'Open-ended hourly billing', us: 'One fixed price, in writing, before you pay' },
  { label: 'Who owns the site', them: 'Often the agency or the platform', us: 'You do, and you can take it anywhere' },
  { label: 'Contract length', them: '12-month minimum, auto-renew', us: 'Month-to-month, cancel any time' },
  { label: 'Who you actually talk to', them: 'An account manager or a support ticket', us: 'Dayne, the person building your site' },
  { label: 'AI search optimization', them: 'Add-on, if they offer it at all', us: 'Checked in every local SEO plan' },
  { label: 'Response time', them: '3–14 days for a text change', us: 'Within one business day' },
  { label: 'Monthly reporting', them: 'A PDF of impressions and "engagement"', us: 'Tracked rankings, AI mentions of your business, and booked leads' },
]

export const processSteps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Strykora pins down your services, the towns you work, and the jobs worth ranking for. That takes one call, and you get it back as a written brief.',
  },
  {
    n: '02',
    title: 'Build',
    body: 'Strykora builds the site and puts it on a private preview link, so you can look it over on your phone and sign off before it goes live.',
  },
  {
    n: '03',
    title: 'Rank',
    body: 'Page titles, service pages, the Business Profile and the technical setup are finished before launch, so the site starts out ready to rank.',
  },
  {
    n: '04',
    title: 'Grow',
    body: 'After launch you can add a monthly local SEO plan, Google Ads, or both. Either one is month to month.',
  },
]

export const faqs = [
  {
    q: 'How long does a custom website take to build?',
    a: `Most Strykora websites go live about a week after the build starts. You work directly with the person building it, so nothing sits waiting on a handoff between departments.`,
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
    a: `Yes. The local SEO plan works on whatever platform you are on. That said, if your current site is on Wix or a slow WordPress build, a rebuild usually does more for your rankings than six months of SEO on the old site.`,
  },
  {
    q: 'What cities and markets do you serve?',
    a: `Strykora is built in ${site.address.city}, Louisiana and serves the whole state. The strongest markets are Thibodaux, Houma, Baton Rouge, New Orleans, and Lafayette, but Strykora ships sites for clients anywhere in Louisiana.`,
  },
  {
    q: 'Do you work with clients outside Louisiana?',
    a: `Strykora is built around Louisiana buyers and how they search, and every case study is a Louisiana business. Web design, Google Ads and AI search optimization work anywhere, though, so out-of-state inquiries are welcome.`,
  },
  {
    q: 'Do you write the website content, or do I?',
    a: `Strykora writes it. Every site comes with the content written for you, from the homepage to each service and city page, and you get drafts to approve before anything goes live. Strykora does not run social media accounts or do photo and video work, but can refer you to Louisiana freelancers who do.`,
  },
  {
    q: 'How are you different from a generic marketing agency?',
    a: `A lot of agencies sell everything from social media to branding. Strykora sticks to custom web design and local SEO, and the person who builds your site is the one you deal with the whole way through.`,
  },
  {
    q: 'How do you measure success?',
    a: `Booked leads, phone calls, form submissions, and tracked rankings for the searches that bring in your best jobs. Every retainer client gets a monthly report that shows what changed, what ranked, and what to do next.`,
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
    alt: 'Screenshot of ChatGPT naming Hover Septic Services as \'Best overall\' for septic installation in Thibodaux, Louisiana.',
    label: 'ChatGPT · Hover Septic',
    lead: 'Query: ',
    quote: '"Recommend me the best septic installation service Thibodaux LA."',
    follow: ' ChatGPT calls Hover Septic "Best overall."',
  },
  {
    src: '/images/ai-citation-chatgpt-why-hover.jpg',
    alt: 'Screenshot of ChatGPT explaining why Hover Septic is the closest match for septic installation in Thibodaux.',
    label: 'ChatGPT follow-up · Hover',
    lead: '',
    quote: '"Why I\'d start with Hover."',
    follow: ' Asked why, ChatGPT explains its pick using what Hover\'s website says about the business.',
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
