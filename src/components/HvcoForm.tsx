'use client'

import { useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Two-field opt-in for the 9 Questions guide.
 *
 * Deliberately lighter than AuditForm: this sits at the top of the funnel on cold
 * traffic, where the job is volume. Name and phone are collected one step down, on
 * the homepage-rebuild request, not here. The website field is not friction — it is
 * the qualifier, and it reveals the trade and the state before Dayne spends a minute.
 */
export default function HvcoForm({ niche = 'general' }: { niche?: string }) {
  const router = useRouter()
  const formId = useId()
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
          kind: 'hvco',
          email: String(data.get('email') ?? '').trim(),
          website: String(data.get('website') ?? '').trim(),
          niche,
          utm,
          page: window.location.pathname,
        }),
      })

      if (res.ok) {
        form.reset()
        router.push('/9-questions/thanks')
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
    <form onSubmit={handleSubmit} className="funnel-form" aria-describedby={`${formId}-note`}>
      <div>
        <label htmlFor={`${formId}-email`}>
          Your email <span className="funnel-required" aria-hidden="true">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@business.com"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-website`}>
          Your website <span className="funnel-required" aria-hidden="true">*</span>
        </label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          required
          inputMode="url"
          autoComplete="url"
          aria-describedby={`${formId}-website-hint`}
          placeholder="yourbusiness.com"
        />
        <p id={`${formId}-website-hint`} className="funnel-form-hint">
          So I know what trade you are in. If you do not have one, send whichever page you do have.
        </p>
      </div>

      <div className="funnel-form-error" role="alert">{errorMessage}</div>

      <button
        type="submit"
        disabled={isSending}
        className="btn-conversion"
      >
        {isSending ? 'Sending...' : 'Send me the 9 questions'}
      </button>

      <p id={`${formId}-note`} className="funnel-form-hint">
        Arrives in about a minute. Yours to keep.
      </p>
    </form>
  )
}
