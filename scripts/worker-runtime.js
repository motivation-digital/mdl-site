// Production worker runtime for mdl-site (motivation.digital).
// LCE-10000383. Bundled by scripts/build-worker.js with esbuild into dist-worker/worker.js.
//
// Serves:
//   - /           — Homepage (static, from ASSETS)
//   - /work       — Portfolio page (static, from ASSETS)
//   - /work/:slug — Case study pages (static, from ASSETS)
//   - All other static assets (CSS, JS, images) from ASSETS
//   - Unknown slugs → 301 to /work
//
// Architecture: The Astro build outputs static HTML to dist/client/. The build-worker.js
// script bundles all of these into an ASSETS map. At runtime this worker serves them
// directly from the map — no D1 bindings needed (motivation-site has no D1).

import { ASSETS } from '../dist-worker/assets.js';

function html(body, status = 200) {
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

    // Normalise trailing slash
    if (path !== '/' && path.endsWith('/')) {
      return Response.redirect(url.origin + path.slice(0, -1), 301);
    }

    // Try exact asset match first (CSS, JS, images, etc.)
    const assetResp = serveAsset(path);
    if (assetResp) return assetResp;

    // HTML pages — Astro outputs as /path/index.html
    const htmlPath = path === '/' ? '/index.html' : `${path}/index.html`;
    const htmlResp = serveAsset(htmlPath);
    if (htmlResp) return htmlResp;

    // Also try /path.html (fallback)
    const htmlPath2 = `${path}.html`;
    const htmlResp2 = serveAsset(htmlPath2);
    if (htmlResp2) return htmlResp2;

    // Unknown /work/:slug → redirect to /work
    if (path.startsWith('/work/')) {
      return Response.redirect(url.origin + '/work', 301);
    }

    // 404 fallback — serve homepage (motivation-site behaviour)
    const fallback = serveAsset('/index.html');
    if (fallback) return fallback;

    return new Response('Not found', { status: 404 });
  }
};
