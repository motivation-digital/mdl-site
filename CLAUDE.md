# mdl-site

Astro 6 app for motivation.digital. Serves the apex homepage (/) and the portfolio
(/work) with 11 case study pages (/work/:slug). Migrated from motivation-site
(single-file 4,093-line CF Worker) to Astro 6 component architecture. LCE-10000383.

Deploys to: CF Worker `mdl-site` — zone routes `motivation.digital/` (apex) + `motivation.digital/work*`
Lifecycle repo: https://github.com/motivation-digital/lifecycle

## ⛔ Must not change
- `seo-motivation` worker (dashboard-managed, no GitHub repo) — owns `/robots.txt`,
  `/sitemap*.xml`, `/refresh-sitemaps`, and the `*motivation.digital/*` catch-all 301 to www.
  Do NOT broaden mdl-site routes to `motivation.digital/*` — it would shadow seo-motivation.
- `trust-center` worker — owns `motivation.digital/trust-center*`. Do not touch.
- `www.motivation.digital` is a proxied CNAME → ssl.kajabi.com (O2O). Do not modify DNS.
- Route IDs in deploy.yml — verified live 2026-06-06.
- Deploy = GitHub Actions → direct CF API only. NEVER wrangler (Rule 21).
- All CF Stream and CF Images URLs must be preserved verbatim — they reference live media.

## Current state (LCE-10000383 — CSS inline fix, 2026-06-07)
Phase 1 + CSS fix: Full Astro 6 migration from the motivation-site single-file worker.
- Homepage (/): Astro component layout, amber + dark design. Static pre-render.
- Portfolio (/work): 12 project cards, filterable by category. Static pre-render.
- Case studies (/work/:slug): Served at runtime from worker-runtime.js via caseStudy().
- All images: CF Images (imagedelivery.net/8taA81TQ4UD-fca9BHMP5A).
- All videos: CF Stream (iframe.videodelivery.net / customer-4x18g7wq6et2wysi.cloudflarestream.com).
- No D1 bindings — purely static.
- CSS is INLINED in HTML (not a separate hashed file) — BaseLayout.astro uses
  `import global.css?raw` + `<style is:inline set:html={...}>`. This avoids the
  routing problem where /_astro/*.css fell outside the mdl-site CF routes and was
  caught by the seo-motivation catch-all (301 redirect to www), causing unstyled pages.

## Repo structure
- src/pages/index.astro       — Homepage
- src/pages/work/index.astro  — Portfolio grid
- src/pages/work/[slug].astro — Case study detail (static, getStaticPaths)
- src/lib/portfolio.js        — PORTFOLIO array + SLUGS export
- src/lib/render-case-study.js — Full render function (PROJECTS + caseStudy)
- src/layouts/BaseLayout.astro — HTML head + CSS import
- src/components/Header.astro  — Site header
- src/components/Footer.astro  — Site footer
- src/styles/global.css        — Global CSS (verbatim from motivation-site)
- scripts/build-worker.js      — Bundles Astro output into dist-worker/worker.js
- scripts/worker-runtime.js    — Worker that serves static assets from ASSETS map
- .github/workflows/deploy.yml — CF API deploy workflow

## Endpoints
| Method | Path | Purpose | Auth |
| --- | --- | --- | --- |
| GET | / | Homepage | none |
| GET | /work | Portfolio grid (12 projects, filterable) | none |
| GET | /work/:slug | Case study (11 slugs pre-rendered) | none |

## Case study slugs
- fitness-platform-physiotherapy (BeMobile)
- healthcare-platform-dietitians (DSC)
- music-platform-guitar (JeJoue)
- b2b-insurance-training-platform (GenuineShift)
- healthtech-platform-qina (Qina)
- recruitment-coaching-platform (Time Rich Recruiter)
- health-platform-dreambody (DreamBodyClub)
- music-collaboration-platform (Mixmasters)
- martial-arts-platform (GKR Karate)
- speech-education-platform (SpeechTimeFun)
- compliance-privacy-platform (Trust Center Pro)
- video-meeting-platform (Studio.video)

## D1 bindings
None. motivation.digital is a purely static site.

## Deploy
Push to main → .github/workflows/deploy.yml: build Astro → bundle worker (esbuild) →
deploy `mdl-site` → repoint apex + /work* routes → smoke-test home + portfolio.
Verify the Actions run is green before declaring live (Rule 30).

## Rules (inline — full rules in lifecycle)
- Rule 1: Confirm repo first. `pwd` and `git remote -v` before anything.
- Rule 2: Read before touching. Check this CLAUDE.md and current main.
- Rule 9: Trace all consumers before removing any parameter, endpoint, or field.
  Check route overlap with `seo-motivation` and `trust-center` before changing routes.
- Rule 14: Every session is referenced by its ClickUp task ID (e.g. LCE-10000383).
