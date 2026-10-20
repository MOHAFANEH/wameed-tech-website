import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /noor and /autoclikerksa hold app legal pages (Noor ALDEEN, and
      // AutoAccept: Driver Assistant). They must stay publicly reachable —
      // app stores reject a policy URL that needs a login — but they are
      // deliberately unlisted: nothing on the site links to them and search
      // engines are asked to skip them. /bluecloud is an unlisted client
      // test site.
      disallow: ['/api', '/noor', '/autoclikerksa', '/bluecloud'],
    },
    sitemap: 'https://wameedtech.com/sitemap.xml',
  }
}
