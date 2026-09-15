'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormState = 'idle' | 'loading' | 'error'

/**
 * Posts to /api/lead, which sends the branded instant reply to the lead and a
 * notification to Dayne via Resend, falling back to the existing Formspree form
 * server-side if Resend is unavailable, so a paid lead is never dropped.
 */
export default function AuditForm({ niche = 'general' }: { niche?: string }) {
  const router = useRouter()
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
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
        router.push('/free-audit/thanks')
        return
      }
      const json = await res.json().catch(() => null)
      setErrorMessage(json?.error ?? 'Something went wrong. Please try again, or call instead.')
      setStatus('error')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="audit-form-note">
      <div>
        <label htmlFor="audit-name" className="block text-sm font-medium text-text mb-2">
          Your name <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input id="audit-name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="First and last" />
      </div>

      <div>
        <label htmlFor="audit-website" className="block text-sm font-medium text-text mb-2">
          Your website <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="audit-website"
          name="website"
          type="text"
          required
          inputMode="url"
          autoComplete="url"
          className={inputClass}
          placeholder="yourbusiness.com, or your Facebook or Google page"
        />
        <p className="mt-2 text-xs text-text-dim">
          This is what gets rebuilt. If you do not have a website, send whichever page you do have.
        </p>
      </div>

      <div>
        <label htmlFor="audit-email" className="block text-sm font-medium text-text mb-2">
          Email <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input id="audit-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@business.com" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="audit-business" className="block text-sm font-medium text-text mb-2">
            Business name
          </label>
          <input id="audit-business" name="business" type="text" autoComplete="organization" className={inputClass} placeholder="What's on the truck" />
        </div>
        <div>
          <label htmlFor="audit-phone" className="block text-sm font-medium text-text mb-2">
            Phone <span className="text-text-dim font-normal">(optional)</span>
          </label>
          <input id="audit-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="Only if you'd rather talk" />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send me the free audit'}
      </button>

      <p id="audit-form-note" className="text-xs text-text-dim leading-relaxed text-center">
        No card, no sales call. The audit comes by email within one business day.
      </p>
    </form>
  )
}
