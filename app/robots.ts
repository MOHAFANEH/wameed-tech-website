import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /noor holds the Noor ALDEEN privacy policy. It must stay publicly
      // reachable — Google Play rejects an app whose policy URL needs a login —
      // but it is deliberately unlisted: nothing on the site links to it and
      // search engines are asked to skip it.
      disallow: ['/api', '/noor'],
    },
    sitemap: 'https://wameedtech.com/sitemap.xml',
  }
}
