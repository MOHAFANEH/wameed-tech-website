-- Wameed Tech admin dashboard schema (Phase 5)
-- Run once against the Neon Postgres database.

-- TIMESTAMPTZ, not TIMESTAMP, on every time-tracking column below.
-- Found empirically: computing lockout expiry via Postgres
-- (CURRENT_TIMESTAMP + make_interval(...)) into a plain TIMESTAMP column
-- and reading it back through the Neon driver produced a value off by
-- ~2h50min from real time in a clean, sub-15-second round-trip test — not
-- a clean timezone offset, just an unreliable round-trip. TIMESTAMPTZ
-- stores an unambiguous instant; app code also computes lockout expiry in
-- JS (see lib/rate-limit.ts) rather than doing the arithmetic in SQL.
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  -- Reset tokens are stored hashed (never the raw token) so a DB read alone
  -- can't be used to reset the password.
  reset_token_hash VARCHAR(255),
  reset_token_expires TIMESTAMPTZ,
  -- DB-backed login rate limiting. A serverless function has no reliable
  -- shared in-memory state between invocations, so "max 5 tries / 10 min"
  -- has to live somewhere durable — this table is that somewhere.
  failed_login_attempts INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ
);

-- Site copy, replacing messages/en.json and messages/ar.json as the runtime
-- source of truth. One row per locale holding the entire message tree as
-- JSONB — this keeps the exact same shape next-intl already expects
-- (hero.title, services.items[0].title, etc.), so the request-config change
-- is a data-source swap, not a data-shape migration.
CREATE TABLE IF NOT EXISTS site_copy (
  locale VARCHAR(2) PRIMARY KEY,
  messages JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts, replacing the .mdx files in app/[locale]/blog/posts/.
-- UNIQUE(slug, locale) — not a globally unique slug — because the site's
-- existing bilingual pattern (Phase 4) uses the SAME slug for both language
-- variants of one post (post.mdx + post.ar.mdx). A global unique constraint
-- on slug alone would make it impossible to have both locale versions of
-- the same post.
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  locale VARCHAR(2) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown/MDX body
  author VARCHAR(255),
  category VARCHAR(100),
  date DATE NOT NULL,
  -- Spec described a draft/publish workflow but the original table had no
  -- column to represent it — added here so drafts can exist without being
  -- served on /blog.
  status VARCHAR(10) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_locale_status_date
  ON blog_posts (locale, status, date DESC);
