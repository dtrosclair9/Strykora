type FAQ = { q: string; a: string }

export default function FAQAccordion({ items }: { items: readonly FAQ[] }) {
  return (
    <div className="faq-list">
      {items.map(({ q, a }) => (
        <details key={q}>
          <summary>
            {q}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M1 8h14" />
              <path className="faq-icon-vertical" d="M8 1v14" />
            </svg>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}
