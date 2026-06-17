import type { Metadata } from 'next'
import CityServicePage, { buildMetadata } from '@/components/CityServicePage'

const slug = 'web-design-new-orleans-la'

export const metadata: Metadata = buildMetadata(slug)

export default function Page() {
  return <CityServicePage slug={slug} />
}
