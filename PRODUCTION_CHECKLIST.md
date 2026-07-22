# Production Readiness Checklist

## Pre-deployment

- [x] All Phase 4 commits on `phase-4-seo-blog`
- [x] Build passes: `npm run build`
- [x] Lint clean: `npm run lint`
- [x] Lighthouse on localhost — `/en`: Performance 92, Accessibility 94, Best Practices 100, SEO 92*
- [x] Lighthouse on localhost — `/ar`: Performance 82–94 (see note below), Accessibility 94, Best Practices 100, SEO 92*
- [x] RTL verified on the blog pages at 375px (no overflow, correct `dir`)
- [x] Contact form tested (error handling works; success requires real SES credentials — not available in this environment)
- [x] Blog index loads; placeholder post renders in both `/en` and `/ar`, Markdown actually compiles to HTML (not raw text)
- [x] Navigation and Footer both link to `/blog`
- [x] Sitemap generated at `/sitemap.xml` (home + both locales + blog index + blog posts)
- [x] `robots.txt` accessible, disallows `/api`, points to the sitemap
- [x] JSON-LD schemas in page source (verified: 2 valid `application/ld+json` blocks, Organization + LocalBusiness, on both `/en` and `/ar`)

**\*Two things about the local numbers that are testing artifacts, not real issues:**
- **SEO 92, not 100**: Lighthouse's `canonical` audit fails on localhost because our canonical URLs correctly point to `https://wameedtech.com/...` while Lighthouse is testing `http://localhost:3000/...` — it reads this as "canonical points elsewhere." This resolves automatically once tested against the real production domain.
- **`/ar` Performance was volatile**: first run scored 82, an immediate re-run with zero code changes scored 94. Total Blocking Time swung from 510ms to 130ms between runs — consistent with local machine/headless-Chrome contention, not a real regression (nothing in Phase 4 touched homepage components; only metadata and two small inline JSON-LD script tags were added to the layout). **Re-test on the actual Vercel deploy before treating this as a real perf issue.**

## Deployment (Vercel)

- [ ] All Phase 4 commits pushed and merged to `main`
- [ ] Vercel auto-deploys on push
- [ ] wameedtech.com resolves and loads
- [ ] `/en` and `/ar` load with correct `lang`/`dir`
- [ ] Blog loads at `/en/blog` and `/ar/blog`; first post renders correctly
- [ ] Re-run Lighthouse against the production URL — expect the canonical/SEO false-negative to disappear; confirm Performance is stable (not the volatile localhost numbers above)
- [ ] Validate the two JSON-LD blocks with [Google's Rich Results Test](https://search.google.com/test/rich-results) against the live URL

## Post-deployment

- [ ] Monitor error logs in the Vercel dashboard
- [ ] Test the contact form end-to-end against real SES credentials — confirm the email arrives at `CONTACT_INBOX` with all fields (including the Phase 3 phone/project-type/budget fields) rendered correctly
- [ ] Submit `https://wameedtech.com/sitemap.xml` to Google Search Console
- [ ] Verify both `hreflang` alternates are recognized as translations of each other in Search Console
- [ ] Monitor Core Web Vitals (Vercel Analytics or Google Analytics)
- [ ] Add the real founder headshot (currently a placeholder "MA" initials circle)
- [ ] Add real testimonial quotes when available (section currently shows an honest "coming soon" placeholder — no invented quotes)
- [ ] Replace the placeholder blog post with real article content
- [ ] Confirm real business hours with Mohammad, then add `openingHoursSpecification` to the LocalBusiness JSON-LD (deliberately omitted — no confirmed hours to publish as fact)

## Known TODOs (carried forward from Phase 3, still open)

- Founder headshot — placeholder "MA" circle
- Testimonial quotes — section structured for drop-in, currently empty
- FlashWash case-study stats (500+/10k+/48hr, published on their own site) — not shown on our case study; decide whether to include
- Arabic copy review — all Phase 2–4 Arabic translations were drafted directly, not reviewed by a native speaker for tone/phrasing
- First real blog post — placeholder proves the route works, needs actual article content
