import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://wameedtech.com'
const POSTS_DIR = path.join(process.cwd(), 'app/[locale]/blog/posts')

function getPostSlugs(): string[] {
  const files = fs.readdirSync(POSTS_DIR)
  const slugs = new Set<string>()
  files.forEach((file) => slugs.add(file.replace(/\.ar\.mdx$|\.mdx$/, '')))
  return Array.from(slugs)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  for (const locale of routing.locales) {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    for (const slug of getPostSlugs()) {
      routes.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return routes
}
