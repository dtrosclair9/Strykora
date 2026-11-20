type Metric = { label: string; value: string }

export default function CaseMetrics({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <dl className="case-metrics">
      {metrics.map(({ label, value }) => (
        <div key={label}>
          <dt className="eyebrow">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
