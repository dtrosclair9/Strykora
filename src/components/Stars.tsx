interface StarsProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  decorative?: boolean
}

const SIZES = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export default function Stars({ rating, size = 'md', className = '', decorative = false }: StarsProps) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-bayou-rust ${className}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `${rating} out of 5 stars`}
      aria-hidden={decorative || undefined}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={SIZES[size]}
          fill={n <= rating ? 'currentColor' : 'none'}
          stroke={n <= rating ? 'none' : 'currentColor'}
          strokeWidth="1.25"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.072 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </span>
  )
}
