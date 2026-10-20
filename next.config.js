const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add remotePatterns here when Phase 3 pulls in external screenshots
    // (e.g. flashwash.co, leapondeals.com) that aren't served from /public.
  },
  // Client test sites, proxied from their own Vercel projects so their code
  // never mixes with this one. Unlisted: nothing links here, robots.ts and
  // the client site itself (noindex) keep search engines out. beforeFiles so
  // the [locale] route can't claim the path first.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/bluecloud', destination: 'https://bluecloud-preview.vercel.app/bluecloud' },
        { source: '/bluecloud/:path*', destination: 'https://bluecloud-preview.vercel.app/bluecloud/:path*' },
      ],
    }
  },
  // Compression: Vercel handles gzip/brotli at the edge automatically.
  // Next's own `compress` option (on by default) only matters for
  // `next start` outside Vercel, so it's left at its default rather
  // than configured here.
}

module.exports = withNextIntl(nextConfig)
