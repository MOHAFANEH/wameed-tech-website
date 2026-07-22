# Wameed Tech Website

Professional web and mobile app development studio website built with Next.js, React, and Tailwind CSS.

## Features

- ✅ Bilingual Support (English LTR / Arabic RTL)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Contact Form with Email Integration
- ✅ Portfolio/Clients Section
- ✅ About Us Section
- ✅ SEO Optimized
- ✅ Dark/Light Mode Ready
- ✅ AWS SES Integration

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel or Netlify
- **Email Service:** AWS SES

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wameed-tech-website
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then fill in your actual values:

```env
# AWS SES Configuration
WAMEED_AWS_REGION=us-east-1
WAMEED_AWS_ACCESS_KEY_ID=your_access_key_here
WAMEED_AWS_SECRET_ACCESS_KEY=your_secret_key_here
CONTACT_INBOX=Info@wameedtech.com
```

See `.env.example` for all required variables.

## Project Structure

```
wameed-tech-website/
├── app/
│   ├── [locale]/            # Locale-segmented routes (/en, /ar)
│   │   ├── layout.tsx       # Root layout (sets <html lang/dir>, fonts)
│   │   ├── page.tsx         # Home page (server component)
│   │   └── not-found.tsx    # Localized 404
│   ├── not-found.tsx        # Fallback 404 (outside a locale)
│   ├── globals.css          # Global styles
│   └── api/
│       └── send-email/      # Email API route
├── components/
│   ├── Navigation.tsx       # Header with language switch (client)
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # About & services
│   ├── Clients.tsx          # Portfolio section
│   ├── CTA.tsx              # Contact form (client)
│   ├── Footer.tsx           # Footer
│   └── Reveal.tsx           # Scroll-reveal progressive enhancement (client)
├── i18n/                    # next-intl config (routing, request, navigation)
├── messages/               # en.json / ar.json — all user-facing copy
├── middleware.ts           # Locale detection + routing
├── public/                  # Static assets
└── package.json
```

## Internationalization

The site is fully bilingual:
- English: `https://wameedtech.com/en`
- Arabic: `https://wameedtech.com/ar`

Language detection is automatic — visiting `https://wameedtech.com` will redirect
to `/en` or `/ar` based on browser language. Fallback is `/en`.

All copy is stored in `messages/en.json` and `messages/ar.json`. Components read
from these files via `next-intl`. To add or change copy, edit the message files —
do not hardcode user-facing strings in components.

## Blog

The site includes a bilingual blog engine, built on `next-mdx-remote` (not
`@next/mdx` — posts are read from disk and compiled at request time, which
plays more simply with the site's `[locale]` routing than importing `.mdx`
files as page modules):

- English posts: `app/[locale]/blog/posts/*.mdx`
- Arabic posts: `app/[locale]/blog/posts/*.ar.mdx`

Each post has YAML frontmatter (`title`, `description`, `date`, `author`,
`category`). The blog index (`app/[locale]/blog/page.tsx`) lists posts sorted
by date, newest first. Individual posts (`app/[locale]/blog/[slug]/page.tsx`)
are compiled with `compileMDX`, so full Markdown — headings, lists, links,
bold/italic — renders correctly, not just plain text.

To add a post:
1. Create `posts/your-post-slug.mdx` (English) and `posts/your-post-slug.ar.mdx` (Arabic) — the slug (filename minus extension) must match between the two
2. Add frontmatter at the top of each file
3. Write the body in Markdown
4. The post appears on `/blog` automatically and is included in `sitemap.xml`

Example frontmatter:
```yaml
---
title: "Your Post Title"
description: "Short description for the blog index and meta tags"
date: "2026-01-15"
author: "Mohammad Afaneh"
category: "Web Development"
---
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables
5. Deploy!

```bash
vercel
```

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your GitHub repository
4. Set environment variables
5. Deploy!

## Email Setup

The contact form sends emails via AWS SES directly from the Next.js API route
(`app/api/send-email/route.ts`). No Lambda function is needed.

To enable:
1. Get AWS SES credentials (Access Key ID and Secret Access Key)
2. Add them to your `.env.local` (see Environment Variables section)
3. Set `CONTACT_INBOX` to the email address that should receive form submissions
4. Test by submitting the contact form on your local dev server

**Important:** The `CONTACT_INBOX` environment variable is required in production.
If it is missing, the contact form will fail silently.

## Customization

### Colors

Edit the Tailwind config in `tailwind.config.js`:

```js
colors: {
  brand: {
    deep: '#2E2560',
    indigo: '#4B3F9E',
    lilac: '#8B7FE8',
    teal: '#2FD4C4',
    bg: '#F7F6FB',
    ink: '#1A1730',
  },
}
```

### Content

Update text content in component files:
- `Hero.tsx` - Hero section text
- `Services.tsx` - About & services text
- `Clients.tsx` - Projects/clients list
- `CTA.tsx` - Contact form labels

### Add Your Logo

Replace the omega (ω) symbol in Navigation.tsx and Footer.tsx with your logo image.

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Form not sending emails?**
- Check AWS SES credentials
- Verify domain is verified in SES
- Check `CONTACT_INBOX` is set (the API route fails loudly if it's missing)

**Language toggle not working?**
- Clear browser cache
- Check browser console for errors

**Styling issues?**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`

## Support

For issues or questions, contact: Info@wameedtech.com

## License

© 2026 Wameed Tech. All rights reserved.
