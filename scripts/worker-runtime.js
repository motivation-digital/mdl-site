// Production worker runtime for mdl-site (motivation.digital).
// LCE-10000383. Bundled by scripts/build-worker.js with esbuild into dist-worker/worker.js.
//
// Serves:
//   - /           — Homepage (static, from ASSETS)
//   - /work       — Portfolio page (static, from ASSETS)
//   - /work/:slug — Case study pages (rendered at runtime from PROJECTS + caseStudy())
//   - All other static assets (CSS, JS, images) from ASSETS
//   - Unknown slugs → 301 to /work
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
      'cache-control': path.endsWith('.html') ? 'public, max-age=60' : 'public, max-age=86400, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Normalise trailing slash (except root)
    if (path !== '/' && path.endsWith('/')) {
      return Response.redirect(url.origin + path.slice(0, -1), 301);
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
