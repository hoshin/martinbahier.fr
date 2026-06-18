# martinbahier.fr

Personal website of Martin Bahier — Senior Software Engineer & Overwatch caster.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), bilingual (FR/EN), with a Markdown-based blog. Deployed to Gandi Web Hosting over SFTP.

## Stack

- **Astro 5** (static site generation)
- **Tailwind CSS 3** for styling, two accent palettes: `engineer` (teal) and `caster` (orange)
- **Content Collections** for the typed Markdown blog
- **Built-in i18n** (`/fr/...` and `/en/...`, default `/fr`)
- **RSS** per locale, **sitemap** via `@astrojs/sitemap`
- **No analytics, no tracking, no cookies**

## Local development

```bash
npm install
npm run dev          # starts the local dev server (http://localhost:4321)
npm run build        # produces a static site in dist/
npm run preview      # serves the production build locally
```

## Project layout

```
src/
├── components/        Astro components (Header, Footer, sections, etc.)
├── content/
│   ├── config.ts      Blog collection schema
│   └── blog/          Blog posts as .md files (see Authoring below)
├── data/              Structured content (bio, CV, socials)
├── i18n/              UI translation strings
├── layouts/           BaseLayout, BlogPostLayout
├── lib/               Tiny utilities (date, slug)
├── pages/
│   ├── fr/            FR routes (index, cv, blog/...)
│   ├── en/            EN routes (mirror)
│   └── index.astro    Root redirect to /fr or /en based on browser
└── styles/globals.css Tailwind layer + custom CSS
public/
├── cv/                martin-bahier-cv-{fr,en}.pdf (replace these)
├── images/            OG image, future hero illustrations
├── favicon.svg
└── robots.txt
scripts/
└── deploy.mjs         SFTP deploy script
```

## Authoring blog posts

Create a Markdown file under `src/content/blog/` named `YYYY-MM-DD-slug.{fr|en}.md`.

```markdown
---
title: "Post title"
description: "One-line summary for cards, OG and RSS."
pubDate: 2026-06-16
lang: fr            # or 'en' — drives which locale lists the post
tags: ["foo", "bar"]
draft: false        # true to hide from production
---

Markdown content here.
```

The URL slug is derived from the filename minus the `.{lang}.md` suffix.

If you write the same post in both languages, use the **same base slug** (`my-post.fr.md` + `my-post.en.md`). The language switcher will then jump between the two versions; otherwise it falls back to the blog index of the other language.

## CV

The on-page CV at `/{lang}/cv` is rendered from `src/data/cv.ts`. The download button points to `/public/cv/martin-bahier-cv-{lang}.pdf`. Replace those placeholder PDFs with your real CVs.

## Editing personal content

- **Bio** (home About section): `src/data/bio.ts`
- **CV**: `src/data/cv.ts`
- **Socials** (footer + Links section): `src/data/socials.ts`
  Most handles are marked `TODO`; replace them with your real URLs.
- **UI strings**: `src/i18n/ui.ts`

## Deployment (Gandi Web Hosting, SFTP)

1. Copy `.env.example` to `.env` and fill in your Gandi SFTP credentials:

   ```
   GANDI_SFTP_HOST=sftp.gandi.net
   GANDI_SFTP_PORT=22
   GANDI_SFTP_USER=your-gandi-user
   GANDI_SFTP_PASS=your-password
   GANDI_SFTP_REMOTE_PATH=/lamp0/web/vhosts/martinbahier.fr/htdocs
   ```

   (Get the exact remote path from your Gandi admin panel under **Web** › your hosting › **SFTP**.)

2. Deploy:

   ```bash
   npm run deploy                # builds and uploads dist/
   node scripts/deploy.mjs --dry-run   # preview without uploading
   node scripts/deploy.mjs --clean     # remove remote files no longer present locally
   ```

   `npm run deploy` runs `astro build` then the SFTP upload.

### Notes for Gandi static hosting

- Astro's static output is just HTML/CSS/JS — Gandi Simple Hosting serves it as-is. No PHP/Node runtime needed.
- The root redirect at `/` uses a `<meta http-equiv="refresh">` so it works on a static host.
- If you want pretty URLs (`/fr/blog/foo` instead of `/fr/blog/foo/index.html`), Gandi serves `index.html` automatically inside directories — Astro's `trailingSlash: 'never'` config is compatible.
- If you ever want `.fr` → `www.` (or vice versa) canonical redirects, add a small `.htaccess` to `public/` so it ships in `dist/`.

## TODO (content)

Search the repo for `TODO` to find the spots you'll want to fill in:

- Real social handles in `src/data/socials.ts`
- Confirmed dates / past employers / education details in `src/data/cv.ts`
- Real CV PDFs in `public/cv/`
- Optional: avatar / hero imagery in `public/images/`

## License

Site code: MIT (or whatever you prefer — update this line).
Content (text, photos, CV): all rights reserved.
