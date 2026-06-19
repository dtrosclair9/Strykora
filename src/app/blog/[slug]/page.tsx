import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CTA from '@/components/CTA'
import { Schema } from '@/components/Schema'

const posts = [
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    description: 'A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era.',
    date: '2026-06-16',
    body: [
      `Most Louisiana small business owners hear "SEO" and picture a guy in a Lafayette office charging $1,500 a month to send a vague monthly report. That is not what SEO is. That is what bad SEO sales is.`,
      `Local SEO does one thing when it works: it puts your business in front of the person typing "[your service] near me" or "[your service] in [your city]" into Google or an AI search engine. For a Louisiana roofer, plumber, auto shop, or contractor, that single mechanism is the difference between an empty pipeline and a booked-out month.`,
      `Here is what actually moves the needle in 2026:`,
      `1. **A fast website with city-specific pages.** Google ranks pages, not businesses. One generic "Services" page will not rank in Houma and Baton Rouge. You need a page for each city and service combination that matters.`,
      `2. **A fully built-out Google Business Profile.** This is the single biggest local ranking factor. Posts, photos, reviews, and the Services section feed both the map pack and Google AI Overviews.`,
      `3. **Schema markup.** Schema is the search-engine code that labels your business, your services, and your reviews so Google and the AI assistants understand exactly what you do. Skip it and you are invisible to ChatGPT, Perplexity, and Google AI Mode, all of which are eating into classic Google search.`,
      `4. **Real reviews on a consistent cadence.** Five reviews from 2022 will not cut it. Google looks for fresh signal.`,
      `If you are running a Louisiana small business and your current SEO is "we posted on Facebook this week," you are leaving real money on the table. The good news: the bar for local SEO in our markets is still low, which means a moderate investment lands you in the top three for the searches that pay your bills.`,
    ],
  },
  {
    slug: 'google-may-2026-ai-search-update-louisiana-businesses',
    title: 'Google\'s May 2026 AI Search Update: What Louisiana Service Businesses Need to Know',
    description: 'The May 21, 2026 Google core update reshaped how local search works. Here is the plain-English version for Louisiana service businesses.',
    date: '2026-05-21',
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
  },
  {
    slug: 'why-your-wix-site-isnt-ranking-louisiana',
    title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)',
    description: 'A slow Wix site can hurt your rankings more than having no site at all. Here is the honest diagnosis and three fixes for Louisiana service businesses.',
    date: '2026-04-22',
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
    dateModified: post.date,
    author: { '@id': `${site.url}/#dayne` },
    publisher: { '@id': `${site.url}/#business` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    url: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/images/og-image.jpg`,
  }

  return (
    <>
      <Schema data={blogPostingSchema} />
      <PageHero
        eyebrow={new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        title={post.title}
        description={post.description}
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

      <CTA />
    </>
  )
}
