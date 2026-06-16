'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const FORMSPREE_ID = 'mzdqwwed'

const serviceOptions = [
  'Web Design (new site)',
  'Web Design (rebuild)',
  'Local SEO',
  'Google Business Profile',
  'Google Ads',
  'Multiple / Not sure yet',
]

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json()
        setErrorMessage(json?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
            Name <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="business" className="block text-sm font-medium text-text mb-2">
            Business
          </label>
          <input id="business" name="business" type="text" autoComplete="organization" className={inputClass} placeholder="Business name" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@business.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(985) 555-0100" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
          What do you need?
        </label>
        <select id="service" name="service" className={inputClass}>
          <option value="">Pick one...</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
          Tell me about your business <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="What does your business do, where are your customers, and what's the goal of the project?"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-4 py-3">
          {errorMessage}
        </p>
      )}

      {status === 'success' ? (
        <div role="status" className="text-text bg-accent/10 border border-accent/40 rounded-md px-4 py-5 text-center">
          <p className="font-semibold text-base mb-1">Message sent.</p>
          <p className="text-text-muted text-sm">I&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send message'}
        </button>
      )}
    </form>
  )
}
