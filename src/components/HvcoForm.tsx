'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormState = 'idle' | 'loading' | 'error'

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
      setStatus('error')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="hvco-form-note">
      <div>
        <label htmlFor="hvco-email" className="block text-sm font-medium text-text mb-2">
          Your email <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="hvco-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@business.com"
        />
      </div>

      <div>
        <label htmlFor="hvco-website" className="block text-sm font-medium text-text mb-2">
          Your website <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="hvco-website"
          name="website"
          type="text"
          required
          inputMode="url"
          autoComplete="url"
          className={inputClass}
          placeholder="yourbusiness.com"
        />
        <p className="mt-2 text-xs text-text-dim">
          So I know what trade you are in. If you do not have one, send whichever page you do have.
        </p>
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
        {status === 'loading' ? 'Sending...' : 'Send me the 9 questions'}
      </button>

      <p id="hvco-form-note" className="text-xs text-text-dim leading-relaxed text-center">
        Arrives in about a minute. Yours to keep.
      </p>
    </form>
  )
}
