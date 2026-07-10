/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // Security headers applied to every route. HSTS is also set by Vercel; we
    // reassert it with includeSubDomains + preload. CSP is intentionally omitted
    // here — a strict policy needs per-site testing against inline styles, fonts,
    // and Vercel Analytics; add it separately once validated.
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ]
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // Old Squarespace URLs that don't have direct equivalents on the new site.
      // All ranking slugs from the prior site are preserved one-to-one in the new app router.
      // Add 301s here only when a previously ranking URL is renamed or removed.
      {
        source: '/advertising-thibodaux-la',
        destination: '/services/google-ads',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
