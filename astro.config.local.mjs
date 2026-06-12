// Local-only build config — no cloudflare adapter (workerd crashes in the desktop env).
// Used solely to verify page rendering mechanics; CI uses astro.config.mjs.
import { defineConfig } from 'astro/config';
export default defineConfig({ output: 'static', outDir: 'dist-local' });
