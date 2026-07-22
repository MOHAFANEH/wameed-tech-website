/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add remotePatterns here when Phase 3 pulls in external screenshots
    // (e.g. flashwash.co, leapondeals.com) that aren't served from /public.
  },
  // Compression: Vercel handles gzip/brotli at the edge automatically.
  // Next's own `compress` option (on by default) only matters for
  // `next start` outside Vercel, so it's left at its default rather
  // than configured here.
}

module.exports = nextConfig
