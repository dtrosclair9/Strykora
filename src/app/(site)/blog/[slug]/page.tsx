import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero'
import FAQAccordion from '@/components/FAQAccordion'
import Section from '@/components/Section'
import CTA from '@/components/CTA'
import { Schema, faqSchema as buildFaqSchema } from '@/components/Schema'

import '../../editorial.css'

const posts = [
  {
    slug: 'why-chatgpt-recommends-your-competitor-louisiana',
    title: 'Why ChatGPT Recommends Your Competitor Instead of You',
    description: 'Ask ChatGPT for a contractor and it hands back a name or two. How those picks get made, and what it takes for a Louisiana business to be one of them.',
    date: '2026-09-06',
    updated: '2026-11-20',
    body: [
      `We keep a screenshot from earlier this year: someone asks ChatGPT for a septic installer in Thibodaux, and it names our client Hover Septic first, explains why, and links the site. There was no results page and no map pack. The AI picked one business and the customer called it.`,
      `Those answers are not random. AI assistants pick businesses in a predictable way, which means a business can position itself to be the one that gets picked. This post explains how the picking works and where most Louisiana businesses fall out of the running.`,
      `**Where ChatGPT gets its answers.**`,
      `ChatGPT, Perplexity, and Google's AI Mode do not keep a private directory of Louisiana businesses. When someone asks for a recommendation, they run live searches, read the pages that come back, and summarize what they find. If those pages describe your business clearly, you are the one that gets named.`,
      `A Yext study of 6.8 million AI citations across ChatGPT, Gemini and Perplexity (October 2025) found that about 86 percent came from sources a business manages or can strongly influence, mostly its own website and its listings, like the Google Business Profile. Reviews and social media were a much smaller share, and the rest came from places like Reddit and news sites. You cannot control what Reddit says about you, but your website and your listings are things you can fix this month.`,
      `**The four reasons the AI skips you.**`,
      `1. **Your site never answers a question.** AI engines quote pages that ask and answer questions in plain sentences. If your website is five photos and a phone number, there is nothing for the machine to quote.`,
      `2. **Your pages never say who, what, and where in plain words.** A homepage that opens with "Quality you can trust" tells a machine nothing. One that opens with "We replace roofs in Houma and Thibodaux" tells it exactly when to name you. AI tools read the visible page, so the words on it do the work.`,
      `3. **A thin Google Business Profile.** The engines lean on GBP data for local answers. Three services listed and an empty description gives them almost nothing to work with.`,
      `4. **Nobody else mentions you.** The engines cross-check. A business that exists only on its own website looks unverified. Chamber listings, directories, and a steady flow of real reviews are how the machine decides you are legitimate.`,
      `**What getting picked actually takes.**`,
      `None of this is exotic, and there is no secret file. Google's own guidance says you do not need special AI files or markup to show up in its AI answers. Answer the questions buyers ask, in plain sentences, on every service page. Fill in every field on your Google Business Profile, especially the Services section. Get listed and mentioned where the engines already look, starting with your chamber of commerce, the established directories, and any local "best of" lists for your trade. And keep the reviews coming, because a review from last month counts for more than praise from three years ago.`,
      `**The receipts.**`,
      `Hover Septic gets named by both ChatGPT and Perplexity for Thibodaux septic work. Perplexity has cited Acadia Pools for pool construction, and ChatGPT has recommended All Out Window Tint for tint work in the Baton Rouge area. None of them paid for that placement, and there is no way to pay for it. Their sites are simply the easiest ones for a machine to read and trust.`,
      `The industry calls this generative engine optimization, or GEO. Most of it is good local SEO aimed at the questions people now type into an AI. Strykora sells it as a standalone audit and 30-day sprint, or bundled into the monthly SEO retainer.`,
    ],
    faqs: [
      {
        q: 'Can I pay ChatGPT or Google to recommend my business?',
        a: 'Google sells ads that appear around its AI answers, but the AI picks who it names inside the answer, and there is no way to buy that spot. Same with ChatGPT and Perplexity. You earn it with what is on your site, how it is structured, and what your reviews say.',
      },
      {
        q: 'How long does AI search optimization take to work?',
        a: 'Page rewrites and Business Profile fixes can start showing up in answers once the engines re-read your pages, which varies by engine. The reputation side, reviews and mentions on other sites, takes months and keeps paying after that. Anyone who promises a date is guessing.',
      },
      {
        q: 'Does AI search really matter for a small Louisiana business yet?',
        a: 'It is growing, but keep it in proportion. For searches like "roofer near me," Google still shows the map results far more often than an AI answer, so your Business Profile and reviews come first. AI answers show up most on question searches, like what a new roof costs. Being the business those answers cite is the extra edge, not a replacement for the basics.',
      },
    ],
  },
  {
    slug: 'why-seo-matters-for-small-businesses-louisiana',
    title: 'Why SEO Matters for Small Businesses in Louisiana',
    description: "A practical look at what local SEO actually moves the needle for Louisiana service businesses in the AI-search era, when Google's answer sits above the results.",
    date: '2026-06-16',
    updated: '2026-11-18',
    body: [
      `Most Louisiana small business owners hear "SEO" and picture a guy in a Lafayette office charging $1,500 a month to send a vague monthly report. That is not what SEO is. That is what bad SEO sales is.`,
      `Local SEO does one thing when it works: it puts your business in front of the person typing "[your service] near me" or "[your service] in [your city]" into Google or an AI search engine. For a Louisiana roofer, plumber, auto shop, or contractor, that single mechanism is the difference between an empty pipeline and a booked-out month.`,
      `Here is what actually moves the needle in 2026:`,
      `1. **A fast website with city-specific pages.** Google ranks pages, not businesses. One generic "Services" page will not rank in Houma and Baton Rouge. You need a page for each city and service combination that matters.`,
      `2. **A fully built-out Google Business Profile.** Your primary category, real business name, address, hours, and recent reviews drive the map results more than anything on your website. Google also uses the profile when its AI answer recommends a business.`,
      `3. **Pages that answer real questions.** What does it cost to think about, how long does it take, do you work in my town? A page that answers those plainly is what Google ranks and what ChatGPT, Perplexity, and Google's AI answer quote. Behind-the-scenes code like schema is useful housekeeping, but it does not stand in for the words on the page.`,
      `4. **Real reviews on a consistent cadence.** Five reviews from 2022 will not cut it. Google looks for fresh signal.`,
      `**Local SEO for a small business in Louisiana: where to start.**`,
      `Start with the Google Business Profile, because it is free and it is the best hour you will spend on your marketing this year. Fill in every service you offer with a real description, add photos monthly, and answer every review. Then make sure your website has a page for each city you actually work in, written specifically about that city. Those two moves alone put most Louisiana small businesses ahead of their local competition.`,
      `On budget: retainers in Louisiana run from a few hundred dollars a month to the $1,500-and-up contracts the bigger agencies write. Strykora's plan is a flat monthly fee that covers the Google Business Profile work, on-page SEO, and the AI search layer. Whatever you pay and whoever you hire, ask the provider to name the exact pages and rankings they are working toward. A vague monthly report is the red flag.`,
      `If you are running a Louisiana small business and your current SEO is "we posted on Facebook this week," you are leaving real money on the table. Most of your competitors around here still have not done any of this, which is why a modest budget can still land you in the top three for the searches that actually bring in jobs.`,
    ],
    faqs: [
      {
        q: 'How much does local SEO cost for a small business in Louisiana?',
        a: 'Strykora\'s plan is a flat monthly fee with no long-term contract, covering Google Business Profile management, on-page work, and AI search optimization. Bigger agencies often charge a lot more. At any price, the provider should be able to name the exact pages and rankings your money is going toward.',
      },
      {
        q: 'Can I do local SEO myself?',
        a: 'The basics, yes. Claim your Google Business Profile, fill out every section, add photos, and ask happy customers for reviews. Where owners usually stall is the website side: city pages with real local work on them, page speed, and the technical cleanup take tools and time most owners do not have between jobs.',
      },
    ],
  },
  {
    slug: 'google-may-2026-ai-search-update-louisiana-businesses',
    title: 'Google\'s May 2026 Core Update: What Louisiana Service Businesses Should Check',
    seoTitle: 'Google\'s May 2026 Core Update and AI Search, Explained',
    description: 'Google ran a core update from May 21 to June 2, 2026. What it did and did not change, and what Louisiana service businesses should actually do about AI search.',
    date: '2026-05-21',
    updated: '2026-11-20',
    body: [
      `Google started a core update on May 21, 2026 and finished it about two weeks later, on June 2. It was the second core update of the year. Google did not say what it targeted, and it rarely does. What owners noticed was rankings moving around for two weeks and then settling.`,
      `So the honest answer to "what changed" is that nobody outside Google knows exactly. What we do know is the bigger trend the update sits inside, and that trend is worth understanding.`,
      `**Where AI answers show up, and where they don't.**`,
      `Google's AI Overviews and AI Mode show up most on question searches, like "how much does a new roof cost" or "gunite vs fiberglass pool." On plain local searches like "roofer near me" or "pool builder Houma," Google still shows the map results far more often than an AI answer. For most Louisiana service businesses, the map results are still where the calls come from.`,
      `When an AI answer does show up, people click the regular results less. That part is real. It just matters most for the question searches, not the "who do I call" searches.`,
      `**What Google says to do about AI search.**`,
      `Google published guidance on this, and it is refreshingly plain: optimizing for its AI answers is still SEO. You do not need special AI files, special markup, or a special writing style. The AI pulls from the same pages Google already ranks and from your Google Business Profile.`,
      `**What to actually do.**`,
      `1. **Answer the cost and how-long questions on your site.** Those are the searches that trigger AI answers. A page that explains what drives the price of a roof replacement in Houma, in plain words, is the kind of page those answers cite.`,
      `2. **Get the Google Business Profile right.** The right primary category, your real business name, accurate hours, a full Services section, and a steady stream of recent reviews. This drives the map results and feeds the AI answer.`,
      `3. **Get mentioned on other local sites.** Chamber listings, supplier and dealer pages, local news, and the "best of" lists for your trade. AI tools cross-check what other sites say about you before they name you.`,
      `4. **Check where you stand.** Search Console now has a report that shows when your pages appear in Google's AI answers. It is free, and it beats guessing.`,
    ],
    faqs: [
      {
        q: 'Did the May 2026 Google update hurt small business websites?',
        a: 'Some sites moved up and some moved down during the rollout, which is normal for a core update. Google did not single out small businesses. If your traffic dropped and stayed down after June 2, look at whether your pages actually answer what buyers ask, compared with the sites that passed you.',
      },
      {
        q: 'Do I need to redo my website because of AI search?',
        a: 'Usually no. Google says AI search optimization is still SEO. Most sites need clearer pages that answer real buyer questions and a built-out Google Business Profile. A rebuild only makes sense when the site is too slow or too locked down to accept those changes, which is common on older template platforms.',
      },
    ],
  },
  {
    slug: 'why-your-wix-site-isnt-ranking-louisiana',
    title: 'Why Your Wix Site Isn\'t Ranking (And What to Do About It)',
    seoTitle: 'Why Your Wix Site Isn\'t Ranking in Google',
    description: 'Why a slow, generic Wix site loses to faster competitors in Google, and three fixes for Louisiana service businesses, from Search Console checks to a rebuild.',
    date: '2026-04-22',
    updated: '2026-11-20',
    body: [
      `The biggest myth in Louisiana small business marketing is that any website is better than no website. After auditing dozens of Wix and Squarespace sites for South Louisiana service businesses, a more accurate framing is this: a slow, generic site loses to the competitor whose site is fast and specific, even when you are the better operator. Here is why, and what to do.`,
      `**The technical problem.**`,
      `Wix loads a lot of JavaScript before your content appears. On a phone, many Wix sites take several seconds before the main content shows up. Google measures that as Largest Contentful Paint (LCP), and it counts 2.5 seconds or less as good. Speed is one of many ranking signals, so a slow site loses close calls to a faster competitor.`,
      `For a Louisiana service business, a faster competitor can edge you out on a close search even when you have better photos, better reviews and more years in business. Speed alone will not explain every ranking, but it is one you can measure and fix.`,
      `**The structural problem.**`,
      `Wix puts your content inside its own template wrappers. Google still reads the text on your site, but most template sites never say plainly what the business does and where. The headings are slogans, the service pages are one paragraph, and every city you work in is crammed onto one page. Google and the AI tools that read your site end up with a generic business, not a specific Houma roofer.`,
      `**What to do about it.**`,
      `**First, figure out what you are actually losing.** Open Google Search Console on your current Wix site. If you see fewer than fifty impressions per month on commercial-intent keywords (your service in your city), the site is not earning its keep.`,
      `**Second, decide between SEO retainer or rebuild.** If your site is well-built but under-optimized, a local SEO retainer can move the needle in sixty to 120 days. If your site is on Wix or a slow WordPress build, a rebuild on Next.js usually pays back faster than six months of SEO work on the broken foundation.`,
      `**Third, if you rebuild, demand the foundations.** A page for each service you want to rank for, headings that name the service and the town, a real sitemap.xml (a map of every page on your site), and business details marked up so search engines read them correctly (called schema). None of this is magic. It is the groundwork that lets good content rank.`,
      `Louisiana service businesses are still operating in a market where the SEO bar is low. The contractors and home service businesses ranking on page one for "[service] [city]" queries are not necessarily better operators. They are often just on faster, better-built websites with a page for each job they want. That gap can be closed.`,
    ],
    faqs: [
      {
        q: 'Can a Wix site rank on Google at all?',
        a: 'Yes, especially in low-competition markets. The problem is the ceiling. When a competitor shows up for your keywords with a faster, structured site, the Wix site usually cannot close the speed and structure gap no matter how good the content is.',
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
  const seoTitle = 'seoTitle' in post ? post.seoTitle : post.title
  return {
    title: seoTitle,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: seoTitle,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: ['/images/og-image-marketing.jpg'],
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
    image: `${site.url}/images/og-image-marketing.jpg`,
  }

  const schemas: object[] = [blogPostingSchema]
  if (post.faqs.length > 0) schemas.push(buildFaqSchema([...post.faqs]))

  return (
    <>
      <Schema data={schemas} />
      <PageHero
        eyebrow={new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
        title={post.title}
        description={post.description}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
      />

      <article className="ledger-section site-container" aria-labelledby="page-title">
        <div className="journal-prose">
          {post.body.map((paragraph, index) => {
            const heading = /^\*\*(.+)\*\*\.?$/.exec(paragraph.trim())
            if (heading) return <h2 key={index}>{heading[1].replace(/\.$/, '')}</h2>

            const parts = paragraph.split(/\*\*(.+?)\*\*/g)
            return (
              <p key={index}>
                {parts.map((part, i) => i % 2 === 0 ? part : <strong key={i}>{part}</strong>)}
              </p>
            )
          })}
        </div>
      </article>

      {post.faqs.length > 0 && (
        <Section id="post-faq" eyebrow="FAQ" heading="Common questions." className="editorial-faq journal-faq">
          <FAQAccordion items={post.faqs} />
        </Section>
      )}

      <CTA
        heading="Want help with your own site?"
        body="Send me your website and tell me what is not working. I'll reply within one business day with what I would do about it."
      />
    </>
  )
}
