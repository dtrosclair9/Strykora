'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { markLeadSubmitted } from '@/components/MetaPixel'

/**
 * Posts to /api/lead, which sends the branded instant reply to the lead and a
 * notification to Dayne via Resend, falling back to the existing Formspree form
 * server-side if Resend is unavailable, so a paid lead is never dropped.
 */
export default function AuditForm({ niche = 'general' }: { niche?: string }) {
  const router = useRouter()
  const submitting = useRef(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting.current) return

    submitting.current = true
    setIsSending(true)
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)
    const utm: Record<string, string> = {}
    try {
      new URLSearchParams(window.location.search).forEach((v, k) => {
        if (k.startsWith('utm_')) utm[k] = v.slice(0, 200)
      })
    } catch {}

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? '').trim(),
          business: String(data.get('business') ?? '').trim(),
          phone: String(data.get('phone') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          website: String(data.get('website') ?? '').trim(),
          niche,
          utm,
          page: window.location.pathname,
        }),
      })

      if (res.ok) {
        form.reset()
        markLeadSubmitted()
        router.push('/free-audit/thanks')
        return
      }
      const json = await res.json().catch(() => null)
      setErrorMessage(json?.error ?? 'Something went wrong. Please try again, or call instead.')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
    }

    submitting.current = false
    setIsSending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="funnel-form funnel-audit-form" aria-describedby="audit-form-note">
      <div>
        <label htmlFor="audit-website">
          Your website <span className="funnel-required" aria-hidden="true">*</span>
        </label>
        <input
          id="audit-website"
          name="website"
          type="text"
          required
          inputMode="url"
          autoComplete="url"
          aria-describedby="audit-website-hint"
          placeholder="yourbusiness.com, or your Facebook or Google page"
        />
      </div>
      <p id="audit-website-hint" className="funnel-form-hint funnel-audit-website-hint">
        This is what gets rebuilt. If you do not have a website, send whichever page you do have.
      </p>

      <div className="funnel-form-pair">
        <div>
          <label htmlFor="audit-name">
            Your name <span className="funnel-required" aria-hidden="true">*</span>
          </label>
          <input id="audit-name" name="name" type="text" required autoComplete="name" placeholder="First and last" />
        </div>
        <div>
          <label htmlFor="audit-email">
            Email <span className="funnel-required" aria-hidden="true">*</span>
          </label>
          <input id="audit-email" name="email" type="email" required autoComplete="email" placeholder="you@business.com" />
        </div>
      </div>

      <div className="funnel-form-pair">
        <div>
          <label htmlFor="audit-business">
            Business name
          </label>
          <input id="audit-business" name="business" type="text" autoComplete="organization" placeholder="What's on the truck" />
        </div>
        <div>
          <label htmlFor="audit-phone">
            Phone <span className="funnel-required" aria-hidden="true">*</span>
          </label>
          <input id="audit-phone" name="phone" type="tel" required autoComplete="tel" placeholder="For the walkthrough" />
        </div>
      </div>

      <div className="funnel-form-error" role="alert">{errorMessage}</div>

      <button
        type="submit"
        disabled={isSending}
        className="btn-conversion"
      >
        {isSending ? 'Sending...' : 'Rebuild my homepage'}
      </button>

      <p id="audit-form-note" className="funnel-form-hint">
        No card. Your rebuilt homepage arrives on a private link within three business days of the details being
        confirmed, and it is yours to keep either way.
      </p>
    </form>
  )
}
