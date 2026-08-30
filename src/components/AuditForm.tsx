'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormState = 'idle' | 'loading' | 'error'

/**
 * Same Formspree form as the contact page, on purpose. Formspree's spam filter
 * scores each endpoint on the shape of what it usually receives, so this form
 * sends the exact same field names (name, business, email, phone, service, message)
 * with the audit-specific answers folded into `service` and `message`.
 */
const FORMSPREE_ID = 'mzdqwwed'
const SERVICE_LABEL = 'Free website + AI search audit'

export default function AuditForm() {
  const router = useRouter()
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)
    const website = String(data.get('website') ?? '').trim()
    data.delete('website')
    data.set('service', SERVICE_LABEL)
    data.set('message', `Free audit request. Current website: ${website || 'none yet'}`)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        form.reset()
        router.push('/free-audit/thanks')
        return
      }
      const json = await res.json().catch(() => null)
      setErrorMessage(json?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
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
        <label htmlFor="audit-business" className="block text-sm font-medium text-text mb-2">
          Business name <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input id="audit-business" name="business" type="text" required autoComplete="organization" className={inputClass} placeholder="What's on the truck" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="audit-phone" className="block text-sm font-medium text-text mb-2">
            Phone <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input id="audit-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="(985) 555-0100" />
        </div>
        <div>
          <label htmlFor="audit-email" className="block text-sm font-medium text-text mb-2">
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input id="audit-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@business.com" />
        </div>
      </div>

      <div>
        <label htmlFor="audit-website" className="block text-sm font-medium text-text mb-2">
          Current website
        </label>
        <input id="audit-website" name="website" type="text" inputMode="url" autoComplete="url" className={inputClass} placeholder="yourbusiness.com, or leave blank if you don't have one" />
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
