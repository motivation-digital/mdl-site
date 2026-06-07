// Production worker runtime for mdl-site (motivation.digital).
// LCE-10000383. Bundled by scripts/build-worker.js with esbuild into dist-worker/worker.js.
//
// Serves:
//   - /              — Homepage (static, from ASSETS)
//   - /work          — Portfolio page (static, from ASSETS)
//   - /work/:slug    — Case study pages (rendered at runtime from PROJECTS + caseStudy())
//   - /robots.txt    — Robots.txt for motivation.digital (route: motivation.digital/robots.txt)
//   - /sitemap.xml   — XML sitemap for motivation.digital (route: motivation.digital/sitemap*)
//   - All other static assets (CSS, JS, images) from ASSETS
//   - Unknown slugs → 301 to /work
//
// Robots.txt and sitemap routes (LCE-10000383, 2026-06-07):
//   motivation.digital/robots.txt  → mdl-site (route ID: af0e4bffb14f4340b329615486ae77b8)
//   motivation.digital/sitemap*    → mdl-site (route ID: c0c6b0d387784627a96a66645a4a0938)
//   These routes override the seo-motivation catch-all for these specific paths,
//   allowing seo-motivation to be deactivated once Christopher confirms the cutover.
//
// Case study pages are rendered at runtime (not pre-built) because they embed
// a full <!DOCTYPE html> document from caseStudy() and bypass Astro's wrapper.
// This follows the same pattern as dbc-site for article pages.

import { ASSETS } from '../dist-worker/assets.js';
import { PROJECTS, caseStudy } from '../src/lib/render-case-study.js';

function htmlResp(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=60',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  });
}

function serveAsset(path) {
  const asset = ASSETS.get(path);
  if (!asset) return null;

  let body;
  if (asset.t !== undefined) {
    body = asset.t;
  } else {
    // Binary asset — decode from base64
    const bytes = atob(asset.b);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    body = arr.buffer;
  }

  return new Response(body, {
    headers: {
      'content-type': asset.m,
      // Hashed assets are content-addressed → 1y immutable; HTML stays short (LCE-10000384).
      'cache-control': path.endsWith('.html') ? 'public, max-age=60' : 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  });
}

// robots.txt for motivation.digital
// Allows all crawlers on the mdl-site-served paths.
// Disallows the www subdomain which still points to Kajabi.
const ROBOTS_TXT = `User-agent: *
Allow: /
Allow: /work
Allow: /work/

Sitemap: https://motivation.digital/sitemap.xml
`;

// XML sitemap for motivation.digital
// Lists the homepage, portfolio, and all 12 case study pages.
const CASE_STUDY_SLUGS = [
  'fitness-platform-physiotherapy',
  'healthcare-platform-dietitians',
  'music-platform-guitar',
  'b2b-insurance-training-platform',
  'healthtech-platform-qina',
  'recruitment-coaching-platform',
  'health-platform-dreambody',
  'music-collaboration-platform',
  'martial-arts-platform',
  'speech-education-platform',
  'compliance-privacy-platform',
  'video-meeting-platform',
];

function buildSitemap() {
  const BASE = 'https://motivation.digital';
  const now = new Date().toISOString().split('T')[0];
  const urls = [
    `  <url><loc>${BASE}/</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${BASE}/work</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    ...CASE_STUDY_SLUGS.map(slug =>
      `  <url><loc>${BASE}/work/${slug}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Normalise trailing slash (except root)
    if (path !== '/' && path.endsWith('/')) {
      return Response.redirect(url.origin + path.slice(0, -1), 301);
    }

    // robots.txt — served directly (route: motivation.digital/robots.txt)
    if (path === '/robots.txt') {
      return new Response(ROBOTS_TXT, {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          'cache-control': 'public, max-age=3600',
        },
      });
    }

    // sitemap.xml — served directly (route: motivation.digital/sitemap*)
    if (path === '/sitemap.xml' || path === '/sitemap') {
      return new Response(buildSitemap(), {
        headers: {
          'content-type': 'application/xml;charset=UTF-8',
          'cache-control': 'public, max-age=3600',
        },
      });
    }

    // Case study pages — served directly from caseStudy() renderer
    if (path.startsWith('/work/') && path !== '/work/') {
      const slug = path.slice('/work/'.length).replace(/\/$/, '');
      const project = PROJECTS[slug];
      if (project) {
        return htmlResp(caseStudy(project, slug));
      }
      // Unknown slug → redirect to /work
      return Response.redirect(url.origin + '/work', 301);
    }

    // Try exact asset match first (CSS, JS, images, etc.)
    const assetResp = serveAsset(path);
    if (assetResp) return assetResp;

    // HTML pages — Astro outputs as /path/index.html
    const htmlPath = path === '/' ? '/index.html' : `${path}/index.html`;
    const htmlResp2 = serveAsset(htmlPath);
    if (htmlResp2) return htmlResp2;

    // Also try /path.html (fallback)
    const htmlPath2 = `${path}.html`;
    const htmlResp3 = serveAsset(htmlPath2);
    if (htmlResp3) return htmlResp3;

    // 404 fallback — serve homepage
    const fallback = serveAsset('/index.html');
    if (fallback) return fallback;

    return new Response('Not found', { status: 404 });
  }
};
