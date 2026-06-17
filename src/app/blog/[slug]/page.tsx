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
      `Local SEO, done right, does one thing: it puts your business in front of the person typing "[your service] near me" or "[your service] in [your city]" into Google or an AI search engine. For a Louisiana roofer, plumber, auto shop, or contractor, that single mechanism is the difference between an empty pipeline and a booked-out month.`,
      `Here is what actually moves the needle in 2026:`,
      `1. **A fast website with city-specific pages.** Google ranks pages, not businesses. One generic "Services" page will not rank in Houma and Baton Rouge. You need a page for each city and service combination that matters.`,
      `2. **A fully built-out Google Business Profile.** This is the single biggest local ranking factor. Posts, photos, reviews, and the Services section feed both the map pack and Google AI Overviews.`,
      `3. **Schema markup.** Tagging your business and services with structured data is how AI engines decide who to cite. Skip it and you are invisible to ChatGPT, Perplexity, and Google AI Mode, all of which are eating into classic search.`,
      `4. **Real reviews on a consistent cadence.** Five reviews from 2022 will not cut it. Google looks for fresh signal.`,
      `If you are running a Louisiana small business and your current SEO is "we posted on Facebook this week," you are leaving real money on the table. The good news: the bar for local SEO in our markets is still low, which means a moderate investment lands you in the top three for the searches that pay your bills.`,
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
          {post.body.map((p, i) => (
            <Reveal key={i} as="p">
              <span dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text">$1</strong>') }} />
            </Reveal>
          ))}
        </div>
      </article>

      <CTA />
    </>
  )
}
