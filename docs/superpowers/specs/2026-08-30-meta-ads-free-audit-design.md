# Meta ads: free-audit funnel (design)

Date: 2026-08-30. Approved by Dayne in chat before implementation.

## Goal

Run Strykora's first Meta (Facebook/Instagram) lead campaign through Meta's official Ads MCP,
sending Louisiana business owners to a landing page on strykora.com that offers a free
website + AI-search audit. Past campaigns in the ad account are explicitly NOT a reference.

## Scope

### Site (this repo)

- `/free-audit` landing page: split hero (copy left, form right; form first on mobile),
  "what you get" cards, featured reviews, three real client wins, FAQ with FAQPage schema.
  Site header/footer stay; the page is indexable and listed in the sitemap.
- Form posts to the existing Formspree form (`mzdqwwed`) using the SAME field names as the
  contact form (name, business, email, phone, service, message) so no new endpoint is needed
  and Akismet does not see a new schema. `service` is hidden ("Free website + AI search audit"),
  `message` carries the current-website answer.
- On success the form navigates to `/free-audit/thanks` (noindex), which fires the Meta `Lead`
  event and shows what happens next plus a call button.
- Meta Pixel (`MetaPixel` component in the root layout): PageView on every page and on
  client-side route changes; `Lead` only on the thanks path. Pixel/dataset id lives in
  `site.metaPixelId` (reuses existing dataset 1366734111941394).
- Privacy policy discloses the Meta Pixel and drops the "no advertising trackers" claim.

### Campaign (via meta-ads MCP, created PAUSED)

- Account 23925927063675785, page 110441698738069.
- 1 campaign, OUTCOME_LEADS, campaign budget $15/day.
- 1 ad set: Louisiana, ages 25-64, Advantage+ audience on, Audience Network excluded,
  optimization LEAD on the pixel, 7-day click / 1-day view.
- 5 single-image ads using judge-approved creatives #01, #04, #05, #09, #10 with the headline
  and white wordmark baked into the top negative space (1080x1350), CTA LEARN_MORE, landing
  URL with UTMs (`utm_source=facebook&utm_medium=paid&utm_campaign=free-audit-la&utm_content=<ad>`).

## Out of scope

Instant forms (Lead Gen ToS not accepted), the roofing.strykora.com GHL funnel, removing the
site header on the landing page, any new Formspree form, Conversions API.

## Verification

`next build`, screenshots at 390 / 810 / 1440, curl the thanks page for the Lead call,
`ads_get_ad_preview` for every ad, then commit and push (Vercel deploys main).
