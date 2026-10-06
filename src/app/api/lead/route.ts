import { NextResponse } from 'next/server'
import { site } from '@/config/site'

/**
 * Funnel lead intake for the free homepage rebuild. Primary path: Resend sends
 * (1) a branded instant reply to the lead signed by Dayne and (2) a triage
 * notification to Dayne.
 * If Resend is not configured or a send fails, the lead falls back to the
 * existing Formspree form server-side, so a paid lead is never dropped.
 *
 * Env: RESEND_API_KEY (required for the branded path),
 *      LEAD_FROM_EMAIL   (default "Dayne at Strykora <dayne@strykora.com>"),
 *      LEAD_NOTIFY_EMAIL (default site.email).
 */

const FORMSPREE_ID = 'mzdqwwed'
const MAX = 300

/** Public path of the 9 Questions guide, delivered on hvco opt-in. */
const GUIDE_PATH = '/9-questions-strykora.pdf'

type LeadPayload = {
  /**
   * "rebuild" (default) is the five-field free-homepage request.
   * "hvco" is the two-field opt-in for the 9 Questions guide — top of funnel,
   * cold traffic, so it asks for email and website only. Name and phone are
   * collected one step down, on the rebuild request.
   */
  kind?: 'rebuild' | 'hvco'
  name?: string
  business?: string
  phone?: string
  email?: string
  website?: string
  niche?: string
  utm?: Record<string, string>
  page?: string
}

const clean = (v: unknown) => String(v ?? '').trim().slice(0, MAX)

/**
 * Where the lead is, from Vercel's edge geo headers. The Meta ads run across
 * Louisiana, Mississippi, Alabama and Texas, and Texas holds roughly 9x
 * Louisiana's roofing establishments, so it will likely take most of the
 * delivery. Without per-lead location we cannot tell a Texas-volume result from
 * a Texas-quality one, and the whole four-state decision becomes unreadable.
 *
 * Zero friction by design: no extra form field, so it costs no conversion rate.
 * Directional only — VPNs and mobile carriers misattribute some share.
 */
function leadLocation(req: Request) {
  const h = req.headers
  const region = h.get('x-vercel-ip-country-region') || ''
  const city = h.get('x-vercel-ip-city') || ''
  const country = h.get('x-vercel-ip-country') || ''
  const decoded = city ? decodeURIComponent(city) : ''
  const label = [decoded, region].filter(Boolean).join(', ') || 'unknown'
  return {
    region: region || 'unknown',
    city: decoded || 'unknown',
    country: country || 'unknown',
    label: country && country !== 'US' ? `${label} (${country})` : label,
  }
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function replyHtml(firstName: string, business: string) {
  const p = 'margin:0 0 14px;font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#2b3240'
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f2f4f8">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f8;padding:24px 12px"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden">
    <tr><td style="background:#0c1224;padding:20px 28px">
      <span style="font:700 18px/1 Helvetica,Arial,sans-serif;letter-spacing:2px;color:#ffffff">STRYKORA</span>
    </td></tr>
    <tr><td style="padding:28px">
      <p style="${p}">Hey ${esc(firstName)},</p>
      <p style="${p}">Your request for <strong>${esc(business)}</strong> just landed. I'm Dayne, I run Strykora out of Thibodaux, and I build these myself.</p>
      <p style="${p}">Here's what happens next. I pull up what you sent and look at it the way a customer on a phone would. If anything is missing or looks out of date, I'll email you to check it before I build, because a page built on wrong information is worse than no page. Once the details are confirmed, I rebuild your homepage and send you a private link <strong>within three business days</strong>.</p>
      <p style="${p}">When it lands, open it on your phone and try to hire yourself. Can you find the work you do? See a job you finished? Get to the phone number without hunting for it? That's the test that matters.</p>
      <p style="${p}">It costs nothing and there's nothing to sign. If you want the rest of the site after seeing it, custom builds start at $3,750, a $500 deposit starts it, and every file is yours once it's paid for.</p>
      <p style="${p}">Reply to this email and it comes straight to me. If you'd rather talk, I'm at <a href="tel:${site.phoneRaw}" style="color:#2257d6;text-decoration:none">${site.phoneDisplay}</a>, but I won't call you out of the blue.</p>
      <p style="${p};margin-bottom:0">Dayne<br><span style="color:#6b7485">Strykora · strykora.com</span></p>
    </td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid #e6eaf2">
      <p style="margin:0;font:12px/1.5 Helvetica,Arial,sans-serif;color:#8a93a6">You're getting this one email because you asked me to rebuild your homepage at strykora.com. No list, no sequence.</p>
    </td></tr>
  </table></td></tr></table></body></html>`
}

/**
 * Delivery email for the 9 Questions guide.
 *
 * Deliberately plain text styled minimally: image-heavy, logo-headed email signals
 * commercial intent to inbox providers, which hurts deliverability, and it is also
 * exactly what the companies that burned this audience send. It needs to read like
 * a man sent it, because that is what decides whether it gets opened at all.
 */
function guideHtml(guideUrl: string) {
  const p = 'margin:0 0 14px;font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#2b3240'
  return `<!doctype html><html><body style="margin:0;padding:24px 12px;background:#ffffff">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto">
    <tr><td>
      <p style="${p}">Here they are:</p>
      <p style="${p}"><a href="${guideUrl}" style="color:#2257d6">9 Questions To Ask A Web Company Before You Pay Them A Dollar</a></p>
      <p style="${p}">If you only do one, do number 4. Email whoever runs your website right now and ask for the login, in writing. What comes back, and how fast, tells you most of it.</p>
      <p style="${p}">In a couple of days I'll send you the five things I see on contractors' websites that quietly cost them calls. Number two is on almost every one I open.</p>
      <p style="${p};margin-bottom:0">Dayne<br><span style="color:#6b7485">Strykora · Thibodaux, Louisiana · ${site.phoneDisplay}</span></p>
    </td></tr>
  </table></body></html>`
}

function notifyHtml(lead: Required<Pick<LeadPayload, 'name' | 'business' | 'phone' | 'email'>> & { website: string; niche: string; page: string; utmLine: string; geo: string }) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px 6px 0;font:600 12px Helvetica,Arial,sans-serif;color:#8a93a6;text-transform:uppercase;letter-spacing:.06em;vertical-align:top">${k}</td><td style="padding:6px 0;font:14px/1.5 Helvetica,Arial,sans-serif;color:#1c2230">${v}</td></tr>`
  return `<!doctype html><html><body style="margin:0;padding:16px;background:#ffffff">
  <p style="font:700 16px Helvetica,Arial,sans-serif;color:#0c1224;margin:0 0 12px">Homepage rebuild request: ${esc(lead.business || lead.website)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0">
    ${row('Name', esc(lead.name))}
    ${row('Business', lead.business ? esc(lead.business) : 'not given (check the site)')}
    ${row('Website', `<a href="${esc(lead.website)}">${esc(lead.website)}</a>`)}
    ${row('Email', `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`)}
    ${row('Phone', lead.phone ? `<a href="tel:${esc(lead.phone)}">${esc(lead.phone)}</a>` : 'not given — email only, do not cold call')}
    ${row('Location', esc(lead.geo))}
    ${row('Niche page', esc(lead.niche) + ' (' + esc(lead.page) + ')')}
    ${row('Source', esc(lead.utmLine || 'no utm (direct or organic)'))}
  </table>
  <p style="font:12px Helvetica,Arial,sans-serif;color:#8a93a6;margin:14px 0 0">Reply-to is the lead. Check the site, confirm anything unclear, then three business days to the rebuilt homepage.</p>
  </body></html>`
}

async function sendViaResend(lead: { name: string; business: string; phone: string; email: string; website: string; niche: string; page: string; utmLine: string; geo: string }) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.LEAD_FROM_EMAIL || `Dayne at Strykora <dayne@${site.domain}>`
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || site.email
  const firstName = lead.name.split(/\s+/)[0] || 'there'

  // Notification first: reaching Dayne is the part that must not fail silently.
  const notify = await resend.emails.send({
    from,
    to: notifyTo,
    replyTo: lead.email,
    subject: `Homepage rebuild request: ${lead.business || lead.website} — ${lead.geo}`,
    html: notifyHtml(lead),
  })
  if (notify.error) throw new Error(notify.error.message)

  const reply = await resend.emails.send({
    from,
    to: lead.email,
    replyTo: notifyTo,
    subject: `Got it, ${firstName} — I'll rebuild your homepage`,
    // Business name is optional on the form now, so fall back to the website,
    // which is always present. An empty <strong></strong> reads as a broken mail-merge.
    html: replyHtml(firstName, lead.business || lead.website),
  })
  if (reply.error) {
    // Lead is already safely delivered to Dayne; log and move on.
    console.error('lead auto-reply failed:', reply.error.message)
  }
}

async function sendHvcoViaResend(lead: { email: string; website: string; niche: string; page: string; utmLine: string; geo: string }) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.LEAD_FROM_EMAIL || `Dayne at Strykora <dayne@${site.domain}>`
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || site.email

  // The guide itself is the product here, so deliver it first — unlike the rebuild
  // path, a failed delivery means the lead got nothing they were promised.
  const deliver = await resend.emails.send({
    from,
    to: lead.email,
    replyTo: notifyTo,
    // Two-to-four words. Mid-length subjects read as marketing and get sorted
    // commercial, which is where opens go to die.
    subject: 'The 9 questions',
    html: guideHtml(`${site.url}${GUIDE_PATH}`),
    headers: { 'X-Entity-Ref-ID': `hvco-${Date.now()}` },
  })
  if (deliver.error) throw new Error(deliver.error.message)

  const notify = await resend.emails.send({
    from,
    to: notifyTo,
    replyTo: lead.email,
    subject: `9Q download: ${lead.website} — ${lead.geo}`,
    html: `<!doctype html><html><body style="font:14px/1.6 Helvetica,Arial,sans-serif;color:#1c2230">
      <p style="font:700 16px Helvetica,Arial,sans-serif;margin:0 0 12px">Guide download</p>
      <p style="margin:0 0 6px">Website: <a href="${esc(lead.website)}">${esc(lead.website)}</a></p>
      <p style="margin:0 0 6px">Email: <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></p>
      <p style="margin:0 0 6px">Location: ${esc(lead.geo)}</p>
      <p style="margin:0 0 6px">Page: ${esc(lead.niche)} (${esc(lead.page)})</p>
      <p style="margin:0 0 6px">Source: ${esc(lead.utmLine || 'no utm (direct or organic)')}</p>
      <p style="margin:14px 0 0;color:#8a93a6;font-size:12px">Top of funnel. They have not asked for a rebuild yet — do not call.</p>
      </body></html>`,
  })
  if (notify.error) console.error('hvco notify failed:', notify.error.message)
}

async function sendHvcoViaFormspree(lead: { email: string; website: string; niche: string; utmLine: string; geo: string }) {
  // Fallback only logs the lead to Dayne — it cannot deliver the guide, so the
  // response tells the user it is coming by hand rather than promising a minute.
  const body = new URLSearchParams({
    name: 'Guide download',
    email: lead.email,
    service: '9 Questions guide download',
    message: `9Q guide download (${lead.niche}). Location: ${lead.geo}. Website: ${lead.website}. Source: ${lead.utmLine || 'none'}. RESEND NOT CONFIGURED — send the guide manually.`,
  })
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`formspree ${res.status}`)
}

async function sendViaFormspree(lead: { name: string; business: string; phone: string; email: string; website: string; niche: string; utmLine: string; geo: string }) {
  // Same field schema as the contact form. Never include dollar amounts here:
  // Formspree's spam filter has junked "$N,NNN" payloads before.
  const body = new URLSearchParams({
    name: lead.name,
    business: lead.business,
    email: lead.email,
    phone: lead.phone,
    service: 'Free homepage rebuild',
    message: `Free homepage rebuild request (${lead.niche}). Location: ${lead.geo}. Site to rebuild: ${lead.website}. Phone: ${lead.phone || 'not given, email only'}. Source: ${lead.utmLine || 'none'}`,
  })
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`formspree ${res.status}`)
}

export async function POST(req: Request) {
  let payload: LeadPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  const lead = {
    name: clean(payload.name),
    business: clean(payload.business),
    phone: clean(payload.phone),
    email: clean(payload.email),
    website: clean(payload.website),
    niche: clean(payload.niche) || 'general',
    page: clean(payload.page),
    geo: leadLocation(req).label,
    utmLine: Object.entries(payload.utm ?? {})
      .filter(([k]) => k.startsWith('utm_'))
      .map(([k, v]) => `${k}=${clean(v)}`)
      .join(' '),
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)

  // Top-of-funnel guide download: email and website only. Asking for a name here
  // would cost conversion rate at the point where the job is volume, and we learn
  // the name one step down anyway on the rebuild request.
  if (payload.kind === 'hvco') {
    if (!lead.website || !emailValid) {
      return NextResponse.json(
        { ok: false, error: 'Please fill in a valid email and your website.' },
        { status: 400 }
      )
    }

    if (process.env.RESEND_API_KEY) {
      try {
        await sendHvcoViaResend(lead)
        return NextResponse.json({ ok: true, via: 'resend' })
      } catch (err) {
        console.error('hvco resend path failed, falling back to formspree:', err)
      }
    }

    try {
      await sendHvcoViaFormspree(lead)
      return NextResponse.json({ ok: true, via: 'formspree' })
    } catch (err) {
      console.error('hvco delivery failed on both paths:', err)
      return NextResponse.json(
        { ok: false, error: `Something went wrong on our end. Please call ${site.phoneDisplay} instead.` },
        { status: 502 }
      )
    }
  }

  // The ad promises "no sales call", so phone is optional and must never gate a
  // lead. Website is required instead: it is the source material for the rebuild.
  // Business name is optional because it is usually derivable from the site.
  if (!lead.name || !lead.website || !emailValid) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in your name, your website, and a valid email.' },
      { status: 400 }
    )
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend(lead)
      return NextResponse.json({ ok: true, via: 'resend' })
    } catch (err) {
      console.error('resend path failed, falling back to formspree:', err)
    }
  }

  try {
    await sendViaFormspree(lead)
    return NextResponse.json({ ok: true, via: 'formspree' })
  } catch (err) {
    console.error('lead delivery failed on both paths:', err)
    return NextResponse.json(
      { ok: false, error: `Something went wrong on our end. Please call ${site.phoneDisplay} instead.` },
      { status: 502 }
    )
  }
}
