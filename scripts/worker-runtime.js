// Production worker runtime for mdl-site (motivation.digital).
// LCE-10000383. Bundled by scripts/build-worker.js with esbuild into dist-worker/worker.js.
//
// Serves:
//   - /              — Homepage (static, from ASSETS)
//   - /work          — Portfolio page (static, from ASSETS)
//   - /work/:slug    — Case study pages (static, from ASSETS — prerendered by
//                      src/pages/work/[slug].astro at build time, LCE-10000426)
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

import { ASSETS } from '../dist-worker/assets.js';

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

  const isHtml = path.endsWith('.html');
  const headers = {
    'content-type': asset.m,
    'cache-control': isHtml ? 'public, max-age=60' : 'public, max-age=86400, immutable',
    'X-Content-Type-Options': 'nosniff',
  };
  if (isHtml) {
    headers['X-Frame-Options'] = 'SAMEORIGIN';
    headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
  }

  return new Response(body, { headers });
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

    // Try exact asset match first (CSS, JS, images, etc.)
    const assetResp = serveAsset(path);
    if (assetResp) return assetResp;

    // HTML pages — Astro outputs as /path/index.html
    // (includes the prerendered case studies at /work/<slug>/index.html, LCE-10000426)
    const htmlPath = path === '/' ? '/index.html' : `${path}/index.html`;
    const htmlResp2 = serveAsset(htmlPath);
    if (htmlResp2) return htmlResp2;

    // Also try /path.html (fallback)
    const htmlPath2 = `${path}.html`;
    const htmlResp3 = serveAsset(htmlPath2);
    if (htmlResp3) return htmlResp3;

    // Unknown case-study slug → redirect to /work
    if (path.startsWith('/work/')) {
      return Response.redirect(url.origin + '/work', 301);
    }

    // 404 fallback — serve homepage
    const fallback = serveAsset('/index.html');
    if (fallback) return fallback;

    return new Response('Not found', { status: 404 });
  }
};
