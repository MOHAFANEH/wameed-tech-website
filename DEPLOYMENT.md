# Deployment Guide for Wameed Tech Website

Complete guide to deploy the website to Vercel with AWS SES email integration.

## Prerequisites

- GitHub account with the repository pushed
- AWS account with SES verified domain (already done)
- Vercel account
- Domain: wameedtech.com (already configured in Route 53)

## Step 1: Local Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Fill in the AWS SES credentials and `CONTACT_INBOX` in `.env.local`
5. Test locally: `npm run dev` and submit the contact form

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository (`MOHAFANEH/wameed-tech-website`)
4. Click "Import"

### 2.2 Add Environment Variables

In the Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add all four variables for **Production** environment:

| Variable | Value | Example |
|----------|-------|---------|
| `WAMEED_AWS_REGION` | AWS region | `us-east-1` |
| `WAMEED_AWS_ACCESS_KEY_ID` | SES access key | (from AWS) |
| `WAMEED_AWS_SECRET_ACCESS_KEY` | SES secret key | (from AWS) |
| `CONTACT_INBOX` | Recipient email | `Info@wameedtech.com` |

**Important:** Make sure these are set for the **Production** environment, not just
Preview/Development. The contact form will fail without them.

### 2.3 Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://wameedtech.com` (via the custom domain)

### 2.4 Verify Custom Domain

Vercel should already have `wameedtech.com` configured. Verify in:
- **Settings → Domains** — confirm `wameedtech.com` is listed as a Production Domain
- **Settings → Git** — confirm the repository is connected and `main` branch is deployed

## Step 3: Test the Contact Form

1. Visit [wameedtech.com](https://wameedtech.com) in your browser
2. Fill out the contact form
3. Submit
4. Check the inbox at `CONTACT_INBOX` to confirm the email arrived

## Troubleshooting

### Contact form returns a 500 error

1. Check Vercel logs: **Deployments → [latest] → Logs**
2. Look for error message about missing environment variables
3. Verify all four SES variables are set in **Settings → Environment Variables** for Production
4. If `CONTACT_INBOX` is missing, add it and redeploy

### Emails not arriving at CONTACT_INBOX

1. Check SES status in AWS Console: **SES → Account Dashboard**
2. Verify the sender domain is verified in SES: **SES → Verified Identities**
3. If SES is still in sandbox mode, add the recipient email to the verified identities
4. Check spam/junk folder in your email client

### Domain not pointing to Vercel

1. Go to AWS Route 53 console
2. Select `wameedtech.com` hosted zone
3. Verify DNS records match what Vercel shows in **Settings → Domains**
4. Wait for DNS propagation (can take 5-30 minutes, or up to 48 hours)

### Site is showing only English

Check that both message files exist: `messages/en.json` and `messages/ar.json`.
If either is missing or incomplete, the build will fail. Run `npm run build` locally
to verify.

## SEO & Discovery

### Sitemap and robots.txt
- Sitemap: `https://wameedtech.com/sitemap.xml` — auto-generated (`app/sitemap.ts`), includes home, both locale roots, the blog index, and every blog post for each locale
- Robots: `https://wameedtech.com/robots.txt` — allows all crawlers, disallows `/api`, points to the sitemap

### Structured data
- Organization and LocalBusiness JSON-LD are embedded in every page (`app/[locale]/layout.tsx`)
- Verify in DevTools: **View Source → search for `schema.org`** — should find 2 `<script type="application/ld+json">` blocks
- Validate against the live URL with [Google's Rich Results Test](https://search.google.com/test/rich-results)
- LocalBusiness does not include `openingHoursSpecification` — no confirmed real hours exist yet; add this once Mohammad confirms actual business hours

### hreflang alternates
- Every page emits `<link rel="alternate" hreflang="en">` and `hreflang="ar"`, plus a per-locale `rel="canonical"`
- On localhost, Lighthouse's canonical audit reports a false failure because the canonical points at the production domain while Lighthouse tests `localhost` — this resolves once tested against the real deploy, not something to "fix" by pointing canonicals at localhost
- After deploying, check Google Search Console recognizes `/en` and `/ar` as translations of each other, not duplicate content

### Blog
- Index: `/en/blog`, `/ar/blog`
- Individual posts: `/en/blog/[slug]`, `/ar/blog/[slug]`
- New posts are picked up automatically (see the Blog section in README.md) and appear in the sitemap on the next build — no manual sitemap editing needed

### Monitoring
- Google Search Console: monitor indexation, keywords, click-through rate
- Vercel Analytics or Google Analytics: track organic traffic by locale and Core Web Vitals

## Environment Variables Reference

See `.env.example` for a complete list of required variables. Never commit
`.env.local` to Git — it is listed in `.gitignore`.

## Support

For deployment issues: Info@wameedtech.com
