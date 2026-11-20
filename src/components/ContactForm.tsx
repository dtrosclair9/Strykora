'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type RequiredField = 'name' | 'email' | 'message'
type FieldErrors = Partial<Record<RequiredField, string>>

const FORMSPREE_ID = 'mzdqwwed'
const requiredFields = ['name', 'email', 'message'] as const
const requiredMessages = {
  name: 'Enter your name.',
  email: 'Enter your email address.',
  message: 'Tell me a little about your business.',
}

const serviceOptions = [
  'Web Design (new site)',
  'Web Design (rebuild)',
  'Local SEO',
  'Google Business Profile',
  'Google Ads',
  'AI Search Optimization',
  'Multiple / Not sure yet',
]

function RequiredMark() {
  return <span className="contact-required" aria-hidden="true">*</span>
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const submitting = useRef(false)
  const invalidField = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const feedback = useRef<HTMLDivElement>(null)

  useEffect(() => {
    invalidField.current?.focus()
    invalidField.current = null
  }, [fieldErrors])

  useEffect(() => {
    if (status === 'success' || status === 'error') feedback.current?.focus()
  }, [status])

  function clearFieldError(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget
    const name = field.name as RequiredField
    if (fieldErrors[name] && field.value.trim() && field.validity.valid) {
      setFieldErrors((errors) => ({ ...errors, [name]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return

    const form = event.currentTarget
    const errors: FieldErrors = {}
    for (const name of requiredFields) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
      if (!field.value.trim()) errors[name] = requiredMessages[name]
      else if (field.validity.typeMismatch) errors[name] = 'Enter an email address in the format name@example.com.'
      if (errors[name] && !invalidField.current) invalidField.current = field
    }
    setFieldErrors(errors)

    if (invalidField.current) {
      setStatus('idle')
      return
    }

    submitting.current = true
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        form.reset()
        setStatus('success')
      } else {
        const result = await response.json().catch(() => null)
        const message = result?.errors?.[0]?.message
        setErrorMessage(typeof message === 'string' && message.trim() ? message : 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div ref={feedback} tabIndex={-1} role="status" className="contact-feedback contact-confirmation">
        <p><strong>Message sent.</strong></p>
        <p>I&apos;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate method="post" className="contact-form">
      <div className="contact-field-pair">
        <div className="contact-field">
          <label htmlFor="name">Name <RequiredMark /></label>
          <input
            id="name" name="name" type="text" required autoComplete="name" placeholder="Your name"
            onChange={clearFieldError}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && <p id="name-error" className="contact-field-error">{fieldErrors.name}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="business">Business</label>
          <input id="business" name="business" type="text" autoComplete="organization" placeholder="Business name" />
        </div>
      </div>

      <div className="contact-field-pair">
        <div className="contact-field">
          <label htmlFor="email">Email <RequiredMark /></label>
          <input
            id="email" name="email" type="email" required autoComplete="email" placeholder="you@business.com"
            onChange={clearFieldError}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email && <p id="email-error" className="contact-field-error">{fieldErrors.email}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(985) 555-0100" />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="service">What do you need?</label>
        <div className="contact-select">
          <select id="service" name="service">
            <option value="">Pick one...</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">Tell me about your business <RequiredMark /></label>
        <textarea
          id="message" name="message" required rows={5}
          placeholder="What does your business do, where are your customers, and what's the goal of the project?"
          onChange={clearFieldError}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message && <p id="message-error" className="contact-field-error">{fieldErrors.message}</p>}
      </div>

      {status === 'error' && (
        <div ref={feedback} tabIndex={-1} className="contact-feedback contact-feedback-error">
          <p>{errorMessage}</p>
        </div>
      )}

      <button type="submit" aria-disabled={status === 'loading'} className="btn-conversion contact-submit">
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
