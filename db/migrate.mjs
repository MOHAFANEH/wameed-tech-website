// One-time migration: creates schema, seeds site_copy from messages/*.json,
// migrates existing blog posts from app/[locale]/blog/posts/*.mdx, and
// inserts the initial admin user.
//
// Usage:
//   POSTGRES_URL_NON_POOLING=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node db/migrate.mjs
//
// ADMIN_PASSWORD is read from the environment only, hashed in-memory, and
// never written to disk or logged.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import matter from 'gray-matter'
import { neon } from '@neondatabase/serverless'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
if (!connectionString) {
  console.error('POSTGRES_URL_NON_POOLING (or POSTGRES_URL) is required.')
  process.exit(1)
}

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD
if (!adminEmail || !adminPassword) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required.')
  process.exit(1)
}

const sql = neon(connectionString)

async function runSchema() {
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  // neon() executes one statement per call; split on statement-terminating
  // semicolons (schema.sql has no semicolons inside string literals).
  const statements = schemaSql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
  for (const statement of statements) {
    await sql.query(statement)
  }
  console.log('Schema created (or already existed).')
}

async function seedSiteCopy() {
  for (const locale of ['en', 'ar']) {
    const filePath = path.join(ROOT, 'messages', `${locale}.json`)
    const messages = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    await sql`
      INSERT INTO site_copy (locale, messages, updated_at)
      VALUES (${locale}, ${JSON.stringify(messages)}::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (locale) DO UPDATE SET messages = EXCLUDED.messages, updated_at = CURRENT_TIMESTAMP
    `
    console.log(`site_copy seeded for locale=${locale}`)
  }
}

async function seedBlogPosts() {
  const postsDir = path.join(ROOT, 'app', '[locale]', 'blog', 'posts')
  const files = fs.readdirSync(postsDir)

  for (const file of files) {
    const locale = file.endsWith('.ar.mdx') ? 'ar' : 'en'
    const slug = file.replace(/\.ar\.mdx$|\.mdx$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data, content } = matter(raw)

    await sql`
      INSERT INTO blog_posts (slug, locale, title, description, content, author, category, date, status, updated_at)
      VALUES (${slug}, ${locale}, ${data.title}, ${data.description}, ${content}, ${data.author}, ${data.category}, ${data.date}, 'published', CURRENT_TIMESTAMP)
      ON CONFLICT (slug, locale) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        content = EXCLUDED.content,
        author = EXCLUDED.author,
        category = EXCLUDED.category,
        date = EXCLUDED.date,
        updated_at = CURRENT_TIMESTAMP
    `
    console.log(`blog_posts seeded: slug=${slug} locale=${locale}`)
  }
}

async function seedAdminUser() {
  const passwordHash = await bcrypt.hash(adminPassword, 12)
  await sql`
    INSERT INTO admin_users (email, password_hash)
    VALUES (${adminEmail}, ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `
  console.log(`admin_users seeded: email=${adminEmail} (password not logged)`)
}

async function main() {
  await runSchema()
  await seedSiteCopy()
  await seedBlogPosts()
  await seedAdminUser()
  console.log('Migration complete.')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
