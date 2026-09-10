import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema, faqSchema as buildFaqSchema } from '@/components/Schema'

const POST_HERO_IMAGE: Record<string, { src: string; alt: string }> = {
  'why-seo-matters-for-small-businesses-louisiana': {
    src: '/images/hero-blog-seo.jpg',
    alt: 'A small-town Louisiana service-business storefront at dusk with a glowing electric blue map-pin floating above it like a signal beacon, representing local SEO visibility.',
  },
  'google-may-2026-ai-search-update-louisiana-businesses': {
    src: '/images/hero-blog-ai-update.jpg',
    alt: 'A glowing electric blue answer bubble rising above a deep ocean of dim text fragments, particles streaming upward, representing the AI search answer that now sits above Google\'s regular results.',
  },
  'why-your-wix-site-isnt-ranking-louisiana': {
    src: '/images/hero-blog-wix.jpg',
    alt: 'A glowing wireframe website block disintegrating into electric blue and violet particles in deep navy space, representing a templated site falling apart.',
  },
  'why-chatgpt-recommends-your-competitor-louisiana': {
    src: '/images/hero-service-ai-search.jpg',
    alt: 'Glowing electric blue quotation mark surrounded by connected constellation nodes in deep navy space, representing a business being cited inside an AI search answer.',
  },
}

const posts = [
  {
    slug: 'why-chatgpt-recommends-your-competitor-louisiana',
    title: 'Why ChatGPT Recommends Your Competitor Instead of You',
    description: 'Ask ChatGPT for a contractor and it hands back a name or two. How those picks get made, and what it takes for a Louisiana business to be one of them.',
    date: '2026-09-06',
    updated: '2026-09-06',
    body: [
      `We keep a screenshot from earlier this year: someone asks ChatGPT for a septic installer in Thibodaux, and it names our client Hover Septic first, explains why, and links the site. There was no results page and no map pack. The AI picked one business and the customer called it.`,
      `Those answers are not random. AI assistants pick businesses in a predictable way, which means a business can position itself to be the one that gets picked. This post explains how the picking works and where most Louisiana businesses fall out of the running.`,
      `**Where ChatGPT gets its answers.**`,
      `ChatGPT, Perplexity, and Google's AI Mode do not keep a private directory of Louisiana businesses. When someone asks for a recommendation, they run live searches, read the pages that come back, and summarize what they find. If those pages describe your business clearly, you are the one that gets named.`,
      `A Whitespark study of local AI answers found that for local questions, about 86 percent of what the AI cites comes from sources you control: your website, your Google Business Profile, and your social profiles. The rest comes from third-party places like Yelp, Reddit, and local directories. You cannot control what Reddit says about you, but that first group is all stuff you can fix this month.`,
      `**The four reasons the AI skips you.**`,
      `1. **Your site never answers a question.** AI engines quote pages that ask and answer questions in plain sentences. If your website is five photos and a phone number, there is nothing for the machine to quote.`,
      `2. **No schema markup.** Schema is code that labels your pages so software knows what you do, where you work, and what customers say about you. Most Louisiana small business sites have none, so the AI reads them as generic businesses with no category.`,
      `3. **A thin Google Business Profile.** The engines lean on GBP data for local answers. Three services listed and an empty description gives them almost nothing to work with.`,
      `4. **Nobody else mentions you.** The engines cross-check. A business that exists only on its own website looks unverified. Chamber listings, directories, and a steady flow of real reviews are how the machine decides you are legitimate.`,
      `**What getting picked actually takes.**`,
      `None of this is exotic. Put question-and-answer content on every service page and mark it up with FAQPage schema. Fill in every field on your Google Business Profile, especially the Services section. Add an llms.txt file, a short page of regular sentences that tells AI tools who you are and what you do. Get listed where the engines already look, starting with your chamber of commerce and the established directories. And keep the reviews coming, because a review from last month counts for more than praise from three years ago.`,
      `**The receipts.**`,
      `Hover Septic gets named by both ChatGPT and Perplexity for Thibodaux septic work. Perplexity has cited Acadia Pools for pool construction, and ChatGPT has recommended All Out Window Tint for tint work in the Baton Rouge area. None of them paid for that placement, and there is no way to pay for it. Their sites are simply the easiest ones for a machine to read and trust.`,
      `Almost nobody in Louisiana is selling this work yet. National agencies charge $3,500 a month and up for it under the name generative engine optimization, which is the industry term for getting cited inside AI answers. Strykora sells it as a $1,997 audit and 30-day sprint, or bundled into the $297 monthly SEO retainer. The businesses that set this up now get cited first while their competitors are still deciding whether AI search is real.`,
    ],
    faqs: [
      {
        q: 'Can I pay ChatGPT or Google to recommend my business?',
        a: 'Google sells ads that appear around its AI answers, but the AI picks who it names inside the answer, and there is no way to buy that spot. Same with ChatGPT and Perplexity. You earn it with what is on your site, how it is structured, and what your reviews say.',
      },
      {
        q: 'How long does AI search optimization take to work?',
        a: 'Often faster than classic SEO. AI engines re-read the web constantly, so structural fixes like schema, FAQ content, and llms.txt can start showing up in answers within weeks. The reputation side, reviews and third-party listings, takes months and keeps paying after that.',
      },
      {
        q: 'Does AI search really matter for a small Louisiana business yet?',
        a: 'Yes. AI Overviews now appear on roughly 48 percent of Google searches, and Search Engine Land tracked ChatGPT referrals converting at 15.9 percent, where typical organic traffic converts under 2 percent. Not many people click through, but the ones who do arrive already half-sold.',
      },
    ],
  },
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    description: "A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era, when Google's answer sits above the results.",
    date: '2026-06-16',
    updated: '2026-09-06',
    body: [
      `Most Louisiana small business owners hear "SEO" and picture a guy in a Lafayette office charging $1,500 a month to send a vague monthly report. That is not what SEO is. That is what bad SEO sales is.`,
      `Local SEO does one thing when it works: it puts your business in front of the person typing "[your service] near me" or "[your service] in [your city]" into Google or an AI search engine. For a Louisiana roofer, plumber, auto shop, or contractor, that single mechanism is the difference between an empty pipeline and a booked-out month.`,
      `Here is what actually moves the needle in 2026:`,
      `1. **A fast website with city-specific pages.** Google ranks pages, not businesses. One generic "Services" page will not rank in Houma and Baton Rouge. You need a page for each city and service combination that matters.`,
      `2. **A fully built-out Google Business Profile.** This is the single biggest local ranking factor. Posts, photos, reviews, and the Services section feed both the map pack and Google AI Overviews.`,
      `3. **Schema markup.** Schema is the search-engine code that labels your business, your services, and your reviews so Google and the AI assistants understand exactly what you do. Skip it and you are invisible to ChatGPT, Perplexity, and Google AI Mode, all of which are eating into classic Google search.`,
      `4. **Real reviews on a consistent cadence.** Five reviews from 2022 will not cut it. Google looks for fresh signal.`,
      `**Local SEO for a small business in Louisiana: where to start.**`,
      `Start with the Google Business Profile, because it is free and it is the best hour you will spend on your marketing this year. Fill in every service you offer with a real description, add photos monthly, and answer every review. Then make sure your website has a page for each city you actually work in, written specifically about that city. Those two moves alone put most Louisiana small businesses ahead of their local competition.`,
      `On budget: retainers in Louisiana run from a few hundred dollars a month to the $1,500-and-up contracts the bigger agencies write. Strykora's starts at $297 monthly and covers the Google Business Profile work, on-page SEO, and the AI search layer. Whatever you pay and whoever you hire, ask the provider to name the exact pages and rankings they are working toward. A vague monthly report is the red flag.`,
      `If you are running a Louisiana small business and your current SEO is "we posted on Facebook this week," you are leaving real money on the table. Most of your competitors around here still have not done any of this, which is why a modest budget can still land you in the top three for the searches that actually bring in jobs.`,
    ],
    faqs: [
      {
        q: 'How much does local SEO cost for a small business in Louisiana?',
        a: 'Strykora\'s retainer is $297 a month and covers Google Business Profile management, on-page work, and AI search optimization. Bigger agencies charge more, sometimes a lot more. At any price, the provider should be able to name the exact pages and rankings your money is going toward.',
      },
      {
        q: 'Can I do local SEO myself?',
        a: 'The basics, yes. Claim your Google Business Profile, fill out every section, add photos, and ask happy customers for reviews. Where owners usually stall is the website side: city pages, schema markup, and page speed take tools and time most owners do not have between jobs.',
      },
    ],
  },
  {
    slug: 'google-may-2026-ai-search-update-louisiana-businesses',
    title: 'Google\'s May 2026 AI Search Update: What Louisiana Service Businesses Need to Know',
    description: 'The May 21, 2026 Google core update reshaped how local search works. Here is the plain-English version, and what it means for Louisiana service businesses.',
    date: '2026-05-21',
    updated: '2026-05-21',
    body: [
      `Google rolled out a core algorithm update on May 21, 2026 that is the biggest shift in how local search works since the original Pigeon update over a decade ago. For Louisiana service businesses, the practical changes matter. Here is the plain-English version.`,
      `**What changed.**`,
      `Google AI Overviews and AI Mode are now the default search experience for hundreds of millions of users, surpassing one billion monthly active users in the first year. Ads are now placed directly inside AI Overview responses. The classic ten blue links still exist, but they appear lower on the page, behind an AI-generated answer that often cites one to three businesses by name.`,
      `**Why this matters for your business.**`,
      `The local pack (the three-business map result at the top of "near me" searches) used to be the prize. It still matters, but it is now competing with the AI Overview, which often features just one or two businesses instead of three. Industry data shows some businesses experiencing fifty percent or greater drops in visibility on local intent queries because they fell out of the AI Overview citation but kept their local pack position.`,
      `Ahrefs measured a 58 percent click-through rate drop on top-ranking content when an AI Overview is present. Fewer clicks, but those clicks convert at meaningfully higher rates. ChatGPT-referred visitors convert around 15.9 percent versus the typical 1.76 percent organic baseline.`,
      `**What to do about it.**`,
      `The play is to be the business cited inside the AI Overview, not just the one ranked below it. Three concrete moves:`,
      `1. **Add structured FAQ blocks to every service page on your site.** Each FAQ should be one direct question and one direct answer in plain English. Mark them up with FAQPage schema. AI engines pull citation candidates from FAQ-formatted content first.`,
      `2. **Build out your Google Business Profile Services entries with full descriptions.** The Services entries feed AI Overviews directly. A Houma plumber with three Services entries gets cited less often than a Houma plumber with twelve.`,
      `3. **Add llms.txt to your website.** llms.txt is a simple text file in plain English that summarizes who you are and what services you offer, written for AI assistants to read. ChatGPT, Perplexity, and Google AI Mode are starting to use it when they pick businesses to recommend.`,
      `The May 2026 update is going to be the dividing line between Louisiana service businesses that get cited by AI search and Louisiana service businesses that disappear from the customer\'s search. The good news: the bar is still low. Most local competitors are not optimizing for any of this yet.`,
    ],
    faqs: [
      {
        q: 'Did the May 2026 Google update hurt small business websites?',
        a: 'Not directly. It changed where the visibility lives. Sites with question-and-answer content and clean structure gained AI citations, while sites that relied on their old ranking position lost clicks to the AI answer sitting above them.',
      },
      {
        q: 'Do I need to redo my website because of AI search?',
        a: 'Usually no. Most sites need a structural layer added: FAQ content, schema markup, llms.txt, and a built-out Google Business Profile. A rebuild only makes sense when the site is too slow or too locked down to accept those changes, which is common on older template platforms.',
      },
    ],
  },
  {
    slug: 'why-your-wix-site-isnt-ranking-louisiana',
    title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)',
    description: 'A slow Wix site can hurt your rankings more than having no site at all. Here is the honest diagnosis and three fixes for Louisiana service businesses.',
    date: '2026-04-22',
    updated: '2026-04-22',
    body: [
      `The biggest myth in Louisiana small business marketing is that any website is better than no website. After auditing dozens of Wix and Squarespace sites for South Louisiana service businesses, a more accurate framing is this: a slow Wix site can actively hurt your rankings compared to having no site at all. Here is why, and what to do.`,
      `**The technical problem.**`,
      `Wix loads a lot of JavaScript before your content appears. Even on a fast connection, the average Wix site takes three to five seconds to become interactive on a phone. Google measures this as Largest Contentful Paint (LCP), and sites with LCP over 2.5 seconds rank lower than faster sites for the same query.`,
      `For a Louisiana service business, this means your competitor with a stock-photo WordPress site is outranking you because their site loads a half-second faster. You can have better photos, better reviews, and more years in business, and still lose the click.`,
      `**The structural problem.**`,
      `Wix puts your content inside its own template wrappers. Google still reads the text on your site, but the labeled, structured data (schema markup) that tells Google "this is a roofing business serving Houma, Louisiana" is either missing or too generic. AI search engines like Google AI Overviews, ChatGPT, and Perplexity rely on schema even more than regular Google does. To them, a Wix site looks like just another generic business website, not a specific Houma roofer.`,
      `**What to do about it.**`,
      `**First, figure out what you are actually losing.** Open Google Search Console on your current Wix site. If you see fewer than fifty impressions per month on commercial-intent keywords (your service in your city), the site is not earning its keep.`,
      `**Second, decide between SEO retainer or rebuild.** If your site is well-built but under-optimized, a $297/month local SEO retainer can move the needle in sixty to 120 days. If your site is on Wix or a slow WordPress build, a rebuild on Next.js usually pays back faster than six months of SEO work on the broken foundation.`,
      `**Third, if you rebuild, demand the foundations.** Schema markup on every page (the labeled code Google reads), a real sitemap.xml (a map of every page on your site), robots.txt (instructions for search engines), and llms.txt (a plain-English summary written for AI assistants). These are the four files that get your business named by AI search engines. Most local agencies skip them.`,
      `Louisiana service businesses are still operating in a market where the SEO bar is low. The contractors and home service businesses ranking on page one for "[service] [city]" queries are not necessarily better operators. They are just on faster, better-built websites. Catch up and you will outrank them within a quarter.`,
    ],
    faqs: [
      {
        q: 'Can a Wix site rank on Google at all?',
        a: 'Yes, especially in low-competition markets. The problem is the ceiling. When a competitor shows up for your keywords with a faster, structured site, the Wix site usually cannot close the speed and schema gap no matter how good the content is.',
      },
      {
        q: 'Should I fix my Wix site or rebuild?',
        a: 'Run the numbers first in Google Search Console. If the site earns real impressions on commercial keywords, an SEO retainer on the existing site can be enough. If it is under about fifty impressions a month after a year online, the foundation is the problem and a rebuild pays back faster.',
      },
    ],
  },
] as const

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: ['/images/og-image.jpg'],
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@id': `${site.url}/#dayne` },
    publisher: { '@id': `${site.url}/#business` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    url: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/images/og-image.jpg`,
  }

  const schemas: object[] = [blogPostingSchema]
  if (post.faqs.length > 0) schemas.push(buildFaqSchema([...post.faqs]))

  return (
    <>
      <Schema data={schemas} />
      <PageHero
        eyebrow={new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        title={post.title}
        description={post.description}
        bgImage={POST_HERO_IMAGE[post.slug]?.src}
        bgImageAlt={POST_HERO_IMAGE[post.slug]?.alt}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
      />

      <article className="section-padding">
        <div className="container-narrow space-y-6 text-lg text-text-muted leading-relaxed">
          {post.body.map((p, i) => {
            const wholeBold = /^\*\*(.+)\*\*\.?$/.exec(p.trim())
            if (wholeBold) {
              return (
                <Reveal key={i} as="h2" className="text-2xl md:text-3xl font-display text-text mt-4 mb-0 text-balance">
                  {wholeBold[1].replace(/\.$/, '')}
                </Reveal>
              )
            }
            return (
              <Reveal key={i} as="p">
                <span dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text">$1</strong>') }} />
              </Reveal>
            )
          })}
        </div>
      </article>

      {post.faqs.length > 0 && (
        <section className="section-padding border-t border-border bg-bg-elevated" aria-labelledby="post-faq-heading">
          <div className="container-narrow">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 id="post-faq-heading" className="text-display-md font-display text-text text-balance">
                Common questions.
              </h2>
            </Reveal>
            <div className="space-y-3">
              {post.faqs.map((f) => (
                <Reveal key={f.q}>
                  <details className="card group">
                    <summary className="font-medium text-text cursor-pointer flex items-start justify-between gap-4 list-none">
                      <span>{f.q}</span>
                      <svg className="w-5 h-5 text-text-dim group-open:rotate-45 transition-transform shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-text-muted leading-relaxed">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}
