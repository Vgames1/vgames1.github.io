# LGBTQ+ South Africa / Pride Nation landing page

A small, fast, static community landing page designed around the public SQUIDS101 community at https://squids.co.za/s/lgbtq.

## Files
- `index.html` — page structure + SEO/Open Graph/JSON-LD metadata
- `styles.css` — responsive design
- `script.js` — small UI enhancements and community stats
- `community-data.json` — editable fallback community data
- `robots.txt` and `sitemap.xml` — replace `YOUR-DOMAIN.example` with the real website domain before deployment
- `site.webmanifest` — install/share metadata
- `assets/favicon.svg` — simple temporary favicon

## Images
The page currently uses the public SQUIDS banner URL as the hero/Open Graph image. When your own images are uploaded, replace the `og:image`, `twitter:image`, and `.hero-media` background URL in `index.html`/`styles.css` with your own absolute image URL. For best social previews, keep the main Open Graph image at 1200×300 or provide a separate 1200×630 social image.

## Community counts
The visible member/post counts are deliberately a small static fallback. A static site cannot reliably "index Google" to retrieve live application data. If SQUIDS exposes a public JSON/API endpoint with CORS support, `script.js` can be changed to fetch it. Otherwise update `community-data.json`/`script.js` from your server or build process.

## SEO notes
The metadata is intentionally human rather than keyword-stuffed. The title is descriptive, the description is concise enough for search/social snippets, the canonical URL points to the actual SQUIDS community, and the page includes WebPage structured data. If this landing page is hosted on a different domain, change `canonical`, `og:url`, JSON-LD URLs, robots sitemap, and the domain in `sitemap.xml`.

## Deploy
Upload the files as-is to your static host. No build step is required.
