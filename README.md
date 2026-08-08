# Pride Community website

A lightweight, static LGBTQ+ community site for `https://vgames1.github.io/`.

## Files

- `index.html` — home
- `about.html` — purpose and values
- `community.html` — community landing page
- `events.html` — events
- `resources.html` — practical resources
- `safety.html` — clear community rules
- `join.html` — join CTA
- `contact.html` — contact page
- `privacy.html` — privacy page
- `404.html` — missing-page fallback
- `styles.css` — responsive styling and animations
- `script.js` — navigation, reveal animations, stats and iframe fallback
- `assets/` — supplied Pride artwork, logo, social image and SVG icon sprite
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `humans.txt`, `.nojekyll`
- `community-data.json` — easy-to-edit public member/post snapshot

## SEO

The pages include a concise title, description, canonical URL, robots directive, Open Graph, Twitter card metadata, JSON-LD and the supplied Google Search Console verification token.

The social image is `assets/og-image.jpg`, a 1200 × 630 social-card crop made from the supplied Pride artwork. It is deliberately hosted on `vgames1.github.io` so social crawlers can fetch it directly rather than depending on a third-party image transformation URL.

The community itself remains linked at `https://squids.co.za/s/lgbtq`.

## Google indexing

After publishing to GitHub Pages, add `https://vgames1.github.io/sitemap.xml` in Google Search Console and request indexing. A sitemap helps discovery but cannot force Google to index a page.

## Member and post counts

The current public snapshot is 1 member and 0 posts. GitHub Pages cannot securely pull private or changing SQUIDS data unless SQUIDS exposes a public API/feed. `community-data.json` and `script.js` keep the numbers easy to update.

## Embedding

The JavaScript detects iframe embedding and replaces the page with the social image. GitHub Pages does not let a static site set arbitrary HTTP response headers, so this is not a substitute for a server-side `Content-Security-Policy: frame-ancestors 'none'` or `X-Frame-Options` header. If you later deploy behind a service where you control headers, add those headers as well.

## Deployment

Upload the contents of this folder to the repository used for `vgames1.github.io`, enable GitHub Pages, and keep the paths exactly as supplied. The leading `/` asset paths assume the site is served from the domain root.
