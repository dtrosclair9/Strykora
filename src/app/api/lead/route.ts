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

type LeadPayload = {
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

function notifyHtml(lead: Required<Pick<LeadPayload, 'name' | 'business' | 'phone' | 'email'>> & { website: string; niche: string; page: string; utmLine: string }) {
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
    ${row('Niche page', esc(lead.niche) + ' (' + esc(lead.page) + ')')}
    ${row('Source', esc(lead.utmLine || 'no utm (direct or organic)'))}
  </table>
  <p style="font:12px Helvetica,Arial,sans-serif;color:#8a93a6;margin:14px 0 0">Reply-to is the lead. Check the site, confirm anything unclear, then three business days to the rebuilt homepage.</p>
  </body></html>`
}

async function sendViaResend(lead: { name: string; business: string; phone: string; email: string; website: string; niche: string; page: string; utmLine: string }) {
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
    subject: `Homepage rebuild request: ${lead.business || lead.website} (${lead.niche})`,
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

async function sendViaFormspree(lead: { name: string; business: string; phone: string; email: string; website: string; niche: string; utmLine: string }) {
  // Same field schema as the contact form. Never include dollar amounts here:
  // Formspree's spam filter has junked "$N,NNN" payloads before.
  const body = new URLSearchParams({
    name: lead.name,
    business: lead.business,
    email: lead.email,
    phone: lead.phone,
    service: 'Free homepage rebuild',
    message: `Free homepage rebuild request (${lead.niche}). Site to rebuild: ${lead.website}. Phone: ${lead.phone || 'not given, email only'}. Source: ${lead.utmLine || 'none'}`,
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
    utmLine: Object.entries(payload.utm ?? {})
      .filter(([k]) => k.startsWith('utm_'))
      .map(([k, v]) => `${k}=${clean(v)}`)
      .join(' '),
  }

  // The ad promises "no sales call", so phone is optional and must never gate a
  // lead. Website is required instead: it is the source material for the rebuild.
  // Business name is optional because it is usually derivable from the site.
  if (!lead.name || !lead.website || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
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
