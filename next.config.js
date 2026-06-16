/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Old Squarespace URLs that don't have direct equivalents on the new site.
      // All ranking slugs from the prior site are preserved one-to-one in the new app router.
      // Add 301s here only when a previously ranking URL is renamed or removed.
    ]
  },
}

module.exports = nextConfig
