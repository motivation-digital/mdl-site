// LCE-10000383 — mdl-site case study renderer
// Migrated from motivation-site/src/worker.js
// Shared by both Astro [slug].astro pages and the worker-runtime.js

const SURVEY_URL = 'mailto:chris@motivation.digital'; // TODO: replace with Typeform URL
const CF_IMG = 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A';

function css() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0A0A0A;
      --surface: #141414;
      --surface-2: #1C1C1C;
      --border: rgba(255,255,255,0.07);
      --amber: #F59F0A;
      --amber-dim: rgba(245,159,10,0.10);
      --amber-mid: rgba(245,159,10,0.25);
      --text: #FFFFFF;
      --muted: rgba(255,255,255,0.55);
      --max: 1450px;
      --pad: clamp(24px, 5vw, 64px);
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }

    /* Header */
    .header {
      position: sticky; top: 0; z-index: 100;
      background: rgba(10,10,10,0.88);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .header-inner {
      max-width: var(--max); margin: 0 auto; padding: 0 var(--pad);
      height: 64px; display: flex; align-items: center; justify-content: space-between;
    }
    .logo { display: inline-flex; align-items: center; }
    .logo img { height: 28px; width: auto; display: block; }
    nav { display: none; gap: 2.25rem; align-items: center; }
    @media (min-width: 1450px) { nav { display: flex; } }
    nav a { font-size: 0.875rem; color: var(--muted); transition: color 0.15s; }
    nav a:hover, nav a.active { color: var(--text); }

    /* Layout */
    .max-wrap { max-width: var(--max); margin: 0 auto; }
    .section { padding: clamp(64px, 9vw, 128px) var(--pad); }
    .section.tight { padding-top: clamp(40px, 6vw, 72px); padding-bottom: clamp(40px, 6vw, 72px); }
    .divider { border: none; border-top: 1px solid var(--border); }
    .lbl {
      display: block; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
    }
    .title {
      font-size: clamp(1.875rem, 3.5vw, 2.875rem); font-weight: 300;
      letter-spacing: -0.03em; line-height: 1.12; margin-bottom: 1rem;
    }
    .sub {
      font-size: 1rem; color: var(--muted); max-width: 520px; line-height: 1.7;
      margin-bottom: 3rem;
    }

    /* Hero */
    .hero { padding: clamp(88px, 13vw, 168px) var(--pad) clamp(72px, 10vw, 140px); }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--amber); margin-bottom: 1.75rem;
    }
    .eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--amber); flex-shrink: 0; }
    .hero h1 {
      font-size: clamp(2.75rem, 6.5vw, 5.25rem); font-weight: 300;
      letter-spacing: -0.035em; line-height: 1.06; max-width: 920px; margin-bottom: 1.5rem;
    }
    .hero-sub {
      font-size: clamp(1.0625rem, 1.8vw, 1.3125rem); color: rgba(255,255,255,0.72);
      max-width: 580px; margin-bottom: 2.75rem; line-height: 1.65;
    }
    .pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 3.25rem; }
    .pill {
      display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px;
      border: 1px solid var(--border); border-radius: 100px;
      font-size: 0.8125rem; font-weight: 500; color: var(--muted); background: var(--surface);
    }
    .pill::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--amber); flex-shrink: 0;
    }
    .btn-cta {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 15px 30px; background: var(--amber); color: #000;
      font-size: 0.9375rem; font-weight: 700; border-radius: 7px;
      transition: background 0.15s, transform 0.15s;
    }
    .btn-cta:hover { background: #e8960a; transform: translateY(-1px); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px; border: 1px solid var(--border); color: var(--text);
      font-size: 0.9375rem; font-weight: 600; border-radius: 7px;
      transition: border-color 0.15s, background 0.15s;
    }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.22); background: var(--surface); }

    /* Services */
    .services {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 1px; background: var(--border); border: 1px solid var(--border);
      border-radius: 14px; overflow: hidden;
    }
    .service { background: var(--surface); padding: 2.5rem; transition: background 0.2s; }
    .service:hover { background: var(--surface-2); }
    .svc-icon {
      width: 46px; height: 46px; background: var(--amber-dim); border-radius: 11px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1.375rem; color: var(--amber);
    }
    .service h3 { font-size: 1.125rem; font-weight: 300; margin-bottom: 0.75rem; }
    .service p { font-size: 0.9rem; color: var(--muted); line-height: 1.68; }

    /* Products */
    .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .product {
      display: block; background: var(--surface); border: 1px solid var(--border);
      border-radius: 14px; padding: 2.125rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .product:hover { border-color: var(--amber-mid); transform: translateY(-2px); }
    .prod-name { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.375rem; }
    .prod-url { font-size: 0.8125rem; color: var(--amber); font-weight: 600; margin-bottom: 0.875rem; }
    .prod-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.65; }

    /* Tech */
    .tech-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .tech {
      display: inline-flex; align-items: center; gap: 9px; padding: 10px 20px;
      background: var(--surface); border: 1px solid var(--border); border-radius: 9px;
      font-size: 0.875rem; font-weight: 600; color: var(--muted);
    }
    .tech::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
      background: var(--amber); flex-shrink: 0;
    }

    /* CTA box */
    .cta-box {
      background: var(--surface); border: 1px solid var(--border); border-radius: 18px;
      padding: clamp(48px, 7vw, 88px); text-align: center;
    }
    .cta-box .title { margin: 0 auto 1.125rem; max-width: 600px; }
    .cta-box .sub { margin: 0 auto 2.75rem; text-align: center; }

    /* Portfolio page */
    .port-header { padding: clamp(64px, 9vw, 108px) var(--pad) clamp(36px, 5vw, 60px); }
    .filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2.25rem; }
    .filt {
      padding: 9px 20px; border: 1px solid var(--border); border-radius: 100px;
      background: transparent; color: var(--muted); font-size: 0.8125rem; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: all 0.15s;
    }
    .filt:hover { border-color: rgba(255,255,255,0.22); color: var(--text); }
    .filt.on { background: var(--amber); border-color: var(--amber); color: #000; font-weight: 700; }
    .port-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px; padding: 0 var(--pad) clamp(64px, 9vw, 128px);
      max-width: var(--max); margin: 0 auto;
    }
    .p-card {
      display: block; background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
      overflow: hidden; transition: border-color 0.2s, transform 0.2s;
    }
    .p-card:hover { border-color: var(--amber-mid); transform: translateY(-2px); }
    .p-card.hide { display: none; }
    .p-img {
      height: 240px; background: var(--amber-dim); overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.875rem; font-weight: 800; color: var(--amber); letter-spacing: -0.02em;
    }
    .p-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
    .p-card:hover .p-img img { transform: scale(1.04); }
    .p-body { padding: 1.625rem; }
    .p-cat {
      font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--amber); margin-bottom: 0.5rem;
    }
    .p-body h3 { font-size: 1.0625rem; font-weight: 300; margin-bottom: 0.5rem; }
    .p-body p { font-size: 0.875rem; color: var(--muted); line-height: 1.55; }
    .p-more { display: inline-flex; align-items: center; gap: 6px; margin-top: 1rem; font-size: 0.8125rem; font-weight: 600; color: var(--amber); }

    /* Reveal on scroll */
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
    }

    /* ===== CASE STUDY ===== */
    .back-link { display: inline-block; font-size: 0.8125rem; color: var(--muted); margin-bottom: 1.5rem; transition: color 0.15s; }
    .back-link:hover { color: var(--text); }
    .cs-hero { padding-top: clamp(32px, 4vw, 52px); padding-bottom: clamp(40px, 6vw, 72px); }
    .cs-hero-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; }
    @media (min-width: 880px) { .cs-hero-grid { grid-template-columns: 1fr 1fr; align-items: center; } }
    .cs-hero-text h1 { max-width: 18ch; font-weight: 300; letter-spacing: normal; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.2; }
    .cs-hero-text .hero-sub { font-size: clamp(0.875rem, 1.3vw, 1rem); margin-bottom: 1.5rem; }
    .cs-hero-shot img { width: 100%; display: block; }
    .cs-metrics { display: flex; flex-wrap: wrap; gap: clamp(28px, 5vw, 72px); margin: 2.75rem 0 2.75rem; }
    .metric { display: flex; flex-direction: column; gap: 0.4rem; }
    .metric-n { font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1; color: var(--amber); }
    .metric-l { font-size: 0.8125rem; color: var(--muted); letter-spacing: 0.02em; }
    /* ── trustcenter.pro hero embed (LCE-10000274) — scoped, faithful copy ── */
    .tc-embed{--accent:#14B8A6;--bg:#141414;--text:#F5F7F4;--mono:'JetBrains Mono',ui-monospace,Menlo,monospace;--dim:#9AA1A8;--panel:#1E1E1E;--border:rgba(255,255,255,0.07);--border-hi:rgba(255,255,255,0.11);--faint:#5A6068;--pass:#14B8A6;--bad:#F97316;background:#141414;position:relative;overflow:hidden;color:var(--text);border-radius:18px;border:1px solid rgba(255,255,255,0.06);font-family:Inter,system-ui,sans-serif;margin-top:50px;}
    .tc-embed .tc-eyebrow-row{display:flex;align-items:center;gap:14px;padding:24px 40px 0;position:relative;z-index:3;}
    .tc-embed .tc-back{font-size:0.82rem;color:var(--faint);text-decoration:none;transition:color .15s;}
    .tc-embed .tc-back:hover{color:var(--text);}
    .tc-embed .tc-eyebrow{font-size:0.6875rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--bad);}
    .tc-embed .tchero{position:relative;overflow:hidden;display:flex;flex-direction:column;}
    .tc-embed .hero-glow{position:absolute;inset:0;background:radial-gradient(at 75% 40%,rgba(20,184,166,0.09),transparent 55%),radial-gradient(at 18% 55%,rgba(249,115,22,0.06),transparent 45%);pointer-events:none;}
    .tc-embed .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(at 50% 0%,black 30%,transparent 75%);pointer-events:none;}
    .tc-embed .hero-inner{max-width:1450px;width:100%;margin:0 auto;position:relative;display:grid;grid-template-columns:1.1fr 1fr;align-content:center;gap:56px;align-items:center;flex:1 1 0%;padding:44px 40px 48px;}
    @media(max-width:960px){.tc-embed .hero-inner{grid-template-columns:1fr;padding:36px 40px 44px;}.tc-embed .diagram-col{display:none;}}
    @media(max-width:640px){.tc-embed .hero-inner{padding:32px 20px 32px;}.tc-embed .tc-eyebrow-row{padding:20px 20px 0;}}
    .tc-embed .hero-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);border-radius:100px;margin-bottom:28px;}
    .tc-embed .hero-pill-dot{width:6px;height:6px;border-radius:50%;background:#F97316;box-shadow:0 0 10px #F97316;animation:pill-pulse 2s ease infinite;}
    .tc-embed .hero-pill-text{font-size:11px;color:#F97316;letter-spacing:0.04em;font-weight:600;font-family:var(--mono);animation:pill-pulse 2s ease infinite;}
    .tc-embed .tchero h1{font-size:clamp(40px,4.5vw,60px);font-weight:600;letter-spacing:-0.02em;line-height:1.06;margin:0 0 26px;color:var(--text);}
    .tc-embed .hero-sub{font-size:17px;line-height:1.6;color:var(--dim);margin:0 0 34px;max-width:480px;}
    .tc-embed .scanner-wrap{max-width:480px;}
    .tc-embed .scanning-row{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:#F97316;margin-bottom:0.6rem;min-height:22px;opacity:0;transition:opacity .3s;}
    .tc-embed .scanning-row.visible{opacity:1;animation:pill-pulse 2s ease infinite;}
    .tc-embed .scan-pulse{width:7px;height:7px;border-radius:50%;background:#F97316;flex-shrink:0;animation:pulse-dot 1s ease infinite;}
    .tc-embed .scan-row{display:flex;align-items:center;gap:0;background:var(--panel);border:1px solid var(--border-hi);border-radius:10px;padding:4px 4px 4px 16px;box-shadow:0 8px 24px rgba(0,0,0,0.3);margin-bottom:14px;max-width:460px;}
    .tc-embed .scan-input{flex:1 1 0%;background:transparent;border:none;outline:none;color:var(--text);font-size:13.5px;padding:11px 0;min-width:0;}
    .tc-embed .scan-input::placeholder{color:var(--faint);}
    .tc-embed .scan-btn{background:#F97316;color:#fff;border:none;padding:11px 22px;border-radius:7px;font-weight:700;font-size:13px;font-family:var(--mono);white-space:nowrap;transition:opacity .15s;cursor:pointer;animation:pill-pulse 2s ease infinite;}
    .tc-embed .scan-btn:hover{opacity:0.85;}
    .tc-embed .scan-hints{display:flex;gap:22px;color:var(--faint);font-size:12px;font-family:var(--mono);}
    .tc-embed .diagram-col{display:flex;align-items:center;justify-content:center;position:relative;min-height:500px;}
    .tc-embed .diagram-wrap{width:100%;max-width:540px;aspect-ratio:1/1;position:relative;z-index:1;transition:opacity .5s;}
    .tc-embed .diagram-wrap.fading{opacity:0;pointer-events:none;}
    .tc-embed .results-card{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px;opacity:0;pointer-events:none;transition:opacity .5s;z-index:2;}
    .tc-embed .results-card.visible{opacity:1;pointer-events:auto;}
    .tc-embed .rc-inner{background:var(--panel);border:1px solid var(--border-hi);border-radius:16px;padding:32px 32px 26px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.4);}
    .tc-embed .rc-score-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid var(--border);}
    .tc-embed .rc-score-num{font-size:3rem;font-weight:800;color:var(--text);letter-spacing:-0.04em;line-height:1;font-variant-numeric:tabular-nums;}
    .tc-embed .rc-score-denom{font-size:1.1rem;color:var(--faint);font-weight:400;}
    .tc-embed .rc-score-label{font-size:0.65rem;color:var(--faint);margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;font-weight:500;font-family:var(--mono);}
    .tc-embed .rc-badge{background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.35);color:#F97316;font-size:0.68rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:100px;margin-top:2px;font-family:var(--mono);white-space:nowrap;}
    .tc-embed .check-list{list-style:none;padding:0;margin:0 0 22px;display:flex;flex-direction:column;gap:11px;}
    .tc-embed .check-item{display:flex;align-items:center;gap:8px;font-size:0.875rem;}
    .tc-embed .check-icon{width:22px;height:22px;min-width:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;}
    .tc-embed .check-icon.pass{background:rgba(20,184,166,0.12);color:var(--pass);}
    .tc-embed .check-icon.fail{background:rgba(249,115,22,0.12);color:var(--bad);}
    .tc-embed .check-label-pass{color:var(--dim);}
    .tc-embed .check-label-fail{color:var(--text);font-weight:500;}
    .tc-embed .check-tag{margin-left:auto;font-size:0.65rem;font-weight:600;padding:2px 5px;border-radius:3px;letter-spacing:0.03em;flex-shrink:0;}
    .tc-embed .check-tag.critical{background:rgba(249,115,22,0.12);color:var(--bad);}
    .tc-embed .check-tag.warning{background:rgba(255,255,255,0.06);color:var(--dim);}
    .tc-embed .check-tag.pass{background:rgba(20,184,166,0.12);color:var(--pass);}
    .tc-embed .rc-fix-cta{display:block;width:100%;background:var(--accent);color:#0A1628;font-size:0.875rem;font-weight:700;font-family:inherit;padding:0.75rem;border:none;border-radius:8px;cursor:pointer;letter-spacing:-0.01em;transition:opacity .15s;}
    .tc-embed .rc-fix-cta:hover{opacity:0.85;}
    .tc-embed .nabbr{font-family:'Font Awesome 6 Free';font-weight:900;}
    @media(max-width:960px){.tc-embed .diagram-col.has-results{display:flex!important;min-height:auto;}.tc-embed .diagram-col.has-results .diagram-wrap{display:none;}}
    @keyframes pill-pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.35;transform:scale(0.7);}}
    .tc-topbar{display:flex;flex-direction:row;align-items:center;gap:20px;flex-wrap:wrap;}
    .hero-logos-below{display:flex;align-items:center;justify-content:center;gap:28px;padding:20px 40px;flex-wrap:wrap;}
    .tchero .hero-logos-lbl{font-size:9px;letter-spacing:0.1em;color:var(--amber);text-transform:uppercase;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;margin:0;white-space:nowrap;}
    .tchero .hero-logos-grid{display:flex;flex-wrap:nowrap;gap:0 20px;align-items:center;}
    .tchero .hero-logos-grid .bw-img{height:15px;width:auto;filter:brightness(0) invert(1);opacity:0.85;transition:opacity 0.2s;}
    .tchero .hero-logos-grid .bw-img:hover{opacity:1;}
    .tc-topbar .back-link{margin-bottom:0;}
    .tc-topbar .eyebrow{font-size:1rem;margin:0;letter-spacing:0.03em;}
    .tc-cs{max-width:760px;margin-top:1.5rem;display:flex;flex-direction:column;gap:1rem;font-size:clamp(1rem,1.6vw,1.15rem);line-height:1.6;color:var(--text);}
    .tc-cs-k{display:inline-block;font-weight:700;font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;padding:3px 9px;border-radius:6px;margin-right:10px;vertical-align:middle;}
    .tc-cs-ch{background:rgba(245,159,10,0.14);color:var(--amber);}
    .tc-cs-sol{background:rgba(245,159,10,0.16);color:var(--amber);}
    .tc-count{font-variant-numeric:tabular-nums;}

    /* ===== DreamBodyClub case study (LCE-10000337) ===== */
    /* Hero frame re-skinned to the live dreambody.club cream theme (LCE-10000337) — the frame
       itself is now light, matching the framed sections, instead of the dark #141414 embed.
       Scoped to .dbc-embed only: the Trust Center and studio.video heroes stay dark.
       Surface + text tokens mirror the .tc-frame section theme so the whole hero reads as a
       faithful light screenshot. --accent set to the darker khaki for contrast on cream. */
    .tc-embed.dbc-embed{--accent:#6F7550;--bad:#C8736F;--pass:#6F7550;background:#FBF7F1;border-color:rgba(42,38,32,0.10);--text:#2A2620;--dim:#4A4239;--faint:#78705F;--panel:#FFFFFF;}
    .dbc-embed .hero-glow{background:radial-gradient(circle at 70% 30%,rgba(167,167,114,0.16),transparent 60%)!important;}
    .dbc-embed .hero-grid-bg{background-image:linear-gradient(rgba(42,38,32,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(42,38,32,0.04) 1px,transparent 1px);}
    .dbc-embed .hero-pill{background:rgba(154,159,116,0.16);border-color:rgba(154,159,116,0.34);}
    .dbc-embed .hero-pill-dot{background:#6F7550;box-shadow:0 0 10px rgba(111,117,80,0.55);}
    .dbc-embed .hero-pill-text{color:#6F7550;}
    .dbc-embed .scanning-row{color:#A7A772;}
    .dbc-embed .scan-pulse{background:#A7A772;}
    .dbc-embed .scan-btn{background:#A7A772;color:#16160F;}
    .dbc-embed .scan-hints span{color:var(--faint);}
    .dbc-embed .diagram-col{min-height:auto;}
    /* Health Index card — re-skinned to the live dreambody.club cream/khaki/rose theme (LCE-10000337),
       matching how the framed sections were re-skinned, so the hero product visual reads as a faithful
       light screenshot of the real card. Text tokens reset to ink so the card content reads on white. */
    .dbc-index-card{width:100%;max-width:430px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(42,38,32,0.10);border-radius:18px;padding:26px 26px 22px;box-shadow:0 24px 60px rgba(42,38,32,0.16);--text:#2A2620;--dim:#4A4239;--faint:#78705F;}
    .dbc-ic-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
    .dbc-ic-title{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--faint);font-family:var(--mono);}
    .dbc-ic-badge{font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6F7550;background:rgba(154,159,116,0.16);border:1px solid rgba(154,159,116,0.32);border-radius:6px;padding:3px 9px;}
    .dbc-ic-gauge{display:flex;align-items:center;gap:20px;margin-bottom:22px;}
    .dbc-gauge-ring{position:relative;width:104px;height:104px;flex-shrink:0;}
    .dbc-gauge-ring svg{transform:rotate(-90deg);}
    .dbc-gauge-num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .dbc-gauge-val{font-size:30px;font-weight:700;color:var(--text);line-height:1;font-variant-numeric:tabular-nums;}
    .dbc-gauge-max{font-size:11px;color:var(--faint);margin-top:2px;font-family:var(--mono);}
    .dbc-gauge-side .dbc-gs-lbl{font-size:12px;color:var(--dim);margin-bottom:4px;}
    .dbc-gauge-side .dbc-gs-band{font-size:17px;font-weight:600;color:#6F7550;}
    .dbc-bars{display:flex;flex-direction:column;gap:13px;}
    .dbc-bar-row .dbc-br-top{display:flex;justify-content:space-between;font-size:12.5px;color:var(--dim);margin-bottom:5px;}
    .dbc-br-val{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums;}
    .dbc-br-track{height:7px;border-radius:4px;background:rgba(42,38,32,0.08);overflow:hidden;}
    .dbc-br-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#9A9F74,#6F7550);width:0;transition:width 1.1s cubic-bezier(.22,.61,.36,1);}
    /* DBC hero — CTA, meta, social proof, floating cards (LCE-10000337) */
    .dbc-hero-cta{display:inline-flex;align-items:center;gap:9px;background:#A7A772;color:#16160F;border:none;border-radius:10px;padding:14px 30px;font-weight:700;font-size:14.5px;letter-spacing:0.01em;cursor:pointer;box-shadow:0 12px 30px rgba(167,167,114,0.22);transition:transform .15s,box-shadow .15s;margin-bottom:18px;}
    .dbc-hero-cta:hover{transform:translateY(-1px);box-shadow:0 16px 38px rgba(167,167,114,0.3);}
    .dbc-hero-cta i{font-size:13px;}
    .dbc-hero-meta{flex-wrap:wrap;gap:8px 20px;align-items:center;margin-bottom:26px;}
    .dbc-hero-meta span{display:inline-flex;align-items:center;gap:6px;}
    .dbc-hero-meta i{color:#6F7550;}
    .dbc-social{display:flex;align-items:center;gap:13px;}
    .dbc-avatars{display:flex;flex-shrink:0;}
    .dbc-av{width:34px;height:34px;border-radius:50%;background-size:cover;background-position:center;border:2px solid #FBF7F1;margin-left:-10px;box-shadow:0 2px 6px rgba(42,38,32,0.18);}
    .dbc-av:first-child{margin-left:0;}
    .dbc-social-text{font-size:12.5px;color:var(--dim);line-height:1.4;}
    .dbc-social-text strong{color:var(--text);font-weight:700;}
    .dbc-hero-visual{position:relative;width:100%;max-width:430px;margin:0 auto;padding:18px 0;}
    .dbc-ic-bar{height:8px;border-radius:5px;background:rgba(42,38,32,0.08);overflow:hidden;margin:4px 0 12px;}
    .dbc-ic-bar-fill{height:100%;width:0;border-radius:5px;background:linear-gradient(90deg,#9A9F74,#6F7550);transition:width 1.1s cubic-bezier(.22,.61,.36,1);}
    .dbc-ic-cap{font-size:12.5px;color:var(--dim);}
    .dbc-float{position:absolute;display:inline-flex;align-items:center;gap:9px;background:#FFFFFF;border:1px solid rgba(42,38,32,0.10);border-radius:12px;padding:10px 14px;font-size:12.5px;color:#4A4239;box-shadow:0 16px 38px rgba(42,38,32,0.18);backdrop-filter:blur(8px);white-space:nowrap;}
    .dbc-float b{color:#2A2620;font-weight:700;}
    .dbc-float-ic{width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(154,159,116,0.16);color:#6F7550;font-size:12px;}
    .dbc-float-train{top:6px;right:-14px;animation:dbcFloatA 5s ease-in-out infinite;}
    .dbc-float-cal{bottom:10px;left:-18px;animation:dbcFloatB 6s ease-in-out infinite;}
    @media(max-width:1100px){.dbc-float-train{right:0;}.dbc-float-cal{left:0;}}
    @keyframes dbcFloatA{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
    @keyframes dbcFloatB{0%,100%{transform:translateY(0);}50%{transform:translateY(7px);}}
    @media(prefers-reduced-motion:reduce){.dbc-float-train,.dbc-float-cal{animation:none;}}

    /* ── studio.video case study hero (LCE-10000338) ── */
    .tc-embed.sv-embed{--accent:#FF4545;--bad:#FF4545;--pass:#FF4545;}
    .sv-embed .hero-glow{background:radial-gradient(ellipse 55% 50% at 22% 0%,rgba(255,69,69,0.20),transparent 65%),radial-gradient(ellipse 45% 40% at 80% 8%,rgba(255,69,69,0.08),transparent 70%)!important;}
    .sv-embed .hero-pill{background:rgba(255,69,69,0.12);border-color:rgba(255,69,69,0.32);}
    .sv-embed .hero-pill-dot{background:#FF4545;box-shadow:0 0 10px #FF4545;}
    .sv-embed .hero-pill-text{color:#FF7A7A;}
    .sv-embed .scan-row{max-width:420px;}
    .sv-embed .scan-btn{background:#FF4545;color:#fff;}
    .sv-embed .scan-hints span{color:var(--faint);}
    .sv-embed .diagram-col{min-height:auto;}
    .sv-join-lock{color:#7BC47F;font-size:13px;margin-right:8px;flex-shrink:0;}
    .sv-join-url{flex:1 1 0%;font-family:var(--mono);font-size:13px;color:var(--text);min-width:0;white-space:nowrap;overflow:hidden;}
    .sv-join-url b{color:#fff;}
    .sv-join-caret{display:inline-block;width:1px;height:13px;background:#FF4545;margin-left:1px;vertical-align:-1px;animation:svCaret 1s step-end infinite;}
    @keyframes svCaret{50%{opacity:0;}}
    .sv-stage{position:relative;width:100%;max-width:520px;margin:0 auto;}
    .sv-room{position:relative;aspect-ratio:16/10;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#0E0D0D;box-shadow:0 30px 70px rgba(0,0,0,0.5);}
    .sv-room iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
    .sv-rec{position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:7px;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);padding:5px 11px;border-radius:100px;font-size:11px;font-weight:600;color:#fff;font-family:var(--mono);letter-spacing:0.03em;}
    .sv-rec-dot{width:7px;height:7px;border-radius:50%;background:#FF4545;box-shadow:0 0 8px #FF4545;animation:pulse-dot 1.2s ease infinite;}
    .sv-pop{position:absolute;background:rgba(26,24,24,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:11px 13px;box-shadow:0 18px 40px rgba(0,0,0,0.45);width:max-content;max-width:220px;z-index:3;}
    .sv-pop-eyebrow{display:flex;align-items:center;gap:7px;font-size:9.5px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#FF7A7A;margin-bottom:7px;}
    .sv-pop-eyebrow .ic{width:18px;height:18px;border-radius:6px;display:grid;place-items:center;background:rgba(255,69,69,0.14);color:#FF4545;font-size:9.5px;}
    .sv-pop-title{font-size:12px;font-weight:600;color:var(--text);line-height:1.3;}
    .sv-pop-hd{top:7%;right:-5%;animation:svFloat 6s ease-in-out infinite;}
    .sv-pop-join{bottom:22%;left:-7%;animation:svFloat 7s ease-in-out infinite 0.5s;}
    .sv-pop-ai{bottom:-4%;right:6%;animation:svFloat 6.5s ease-in-out infinite 1s;}
    @keyframes svFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
    .sv-wave{display:flex;align-items:flex-end;gap:3px;height:18px;margin-top:3px;}
    .sv-wave span{width:3px;border-radius:2px;background:#FF4545;animation:svWave 1s ease-in-out infinite;}
    @keyframes svWave{0%,100%{height:4px;opacity:0.5;}50%{height:16px;opacity:1;}}
    .sv-pop-joinrow{display:flex;align-items:center;gap:6px;margin-top:2px;}
    .sv-pop-joinrow .u{font-family:var(--mono);font-size:11px;color:var(--text);}
    .sv-pop-joinrow .b{background:#FF4545;color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:6px;}
    @media(max-width:1100px){.sv-pop-hd{right:0;}.sv-pop-join{left:0;}}
    /* studio.video capability sections */
    .tc-sections.sv-sections{--accent:#FF4545;--accent-border:rgba(255,69,69,0.24);}
    .sv-sections .tc-cap-k{color:#FF4545!important;}
    .sv-sections .sec--flow::before{background:radial-gradient(rgba(255,69,69,0.05) 0%,transparent 60%);}
    .sv-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:8px;}
    @media(max-width:860px){.sv-steps{grid-template-columns:1fr;}}
    .sv-step{background:var(--panel);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:22px 20px;display:flex;flex-direction:column;gap:11px;}
    .sv-step-num{display:inline-flex;align-items:center;gap:9px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--dim);font-family:var(--mono);}
    .sv-step-num b{width:24px;height:24px;border-radius:7px;background:rgba(255,69,69,0.14);color:#FF4545;display:grid;place-items:center;font-size:12px;}
    .sv-step h3{font-size:17px;font-weight:700;color:var(--text);margin:0;letter-spacing:-0.01em;}
    .sv-step>p{font-size:13.5px;color:var(--dim);line-height:1.55;margin:0;}
    .sv-step-vis{margin-top:auto;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px;font-size:11.5px;color:var(--dim);display:flex;flex-direction:column;gap:8px;}
    .sv-vrow{display:flex;align-items:center;gap:8px;}
    .sv-vlabel{font-size:11px;color:var(--faint);}
    .sv-vfield{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:6px 9px;font-family:var(--mono);font-size:11px;color:var(--dim);}
    .sv-vfield b{color:#FF4545;}
    .sv-swatches{display:flex;gap:5px;}
    .sv-swatches span{width:22px;height:22px;border-radius:6px;border:1px solid rgba(255,255,255,0.12);}
    .sv-chips{display:flex;flex-wrap:wrap;gap:6px;}
    .sv-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:7px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);font-size:11px;color:var(--dim);}
    .sv-code{font-family:var(--mono);font-size:11px;color:var(--text);background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:9px 11px;}
    .sv-code b{color:#FF4545;}
    .sv-recap{background:rgba(255,69,69,0.06);border:1px solid rgba(255,69,69,0.18);border-radius:8px;padding:9px 11px;}
    .sv-recap .k{display:flex;align-items:center;gap:6px;font-size:9.5px;text-transform:uppercase;letter-spacing:0.06em;color:#FF7A7A;font-weight:600;margin-bottom:4px;}
    .sv-recap .v{font-size:11.5px;color:var(--dim);}
    .sv-recap .v b{color:var(--text);}
    .sv-feats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:8px;}
    @media(max-width:980px){.sv-feats{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:560px){.sv-feats{grid-template-columns:1fr;}}
    .sv-feat{background:var(--panel);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px 15px;transition:border-color .2s,transform .2s;}
    .sv-feat:hover{border-color:rgba(255,69,69,0.3);transform:translateY(-2px);}
    .sv-feat.feat{border-color:rgba(255,69,69,0.28);background:rgba(255,69,69,0.05);}
    .sv-feat-ic{width:34px;height:34px;border-radius:9px;background:rgba(255,69,69,0.12);color:#FF4545;display:grid;place-items:center;font-size:14px;margin-bottom:11px;}
    .sv-feat h4{font-size:14px;font-weight:600;color:var(--text);margin:0 0 5px;}
    .sv-feat p{font-size:12.5px;color:var(--dim);line-height:1.5;margin:0;}
    .sv-feat-flag{display:inline-block;margin-top:9px;font-size:9.5px;font-weight:700;letter-spacing:0.05em;color:#FF4545;font-family:var(--mono);}
    .sv-cases{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px;}
    @media(max-width:860px){.sv-cases{grid-template-columns:1fr 1fr;}}
    @media(max-width:560px){.sv-cases{grid-template-columns:1fr;}}
    .sv-case{background:var(--panel);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px 16px 15px;}
    .sv-case-ic{color:#FF4545;font-size:15px;margin-bottom:10px;}
    .sv-case h4{font-size:14px;font-weight:600;color:var(--text);margin:0 0 4px;}
    .sv-case p{font-size:12.5px;color:var(--dim);line-height:1.5;margin:0;}

    /* ── studio.video animated prototype sections — grabbed from the live site (LCE-10000338 pt2) ── */
    .sv-sections{--sv-surface:#1A1818;--sv-surface-2:#141212;--sv-line:rgba(255,255,255,0.07);--sv-line-strong:rgba(255,255,255,0.14);--sv-ink:#F5F2F2;--sv-ink-2:#D8D2D2;--sv-ink-3:#9A9090;--sv-ink-4:#6A6060;--sv-soft:rgba(255,69,69,0.14);--sv-moss:#6FCF8A;--sv-bg-deep:#0A0909;--sv-sh-md:0 12px 30px rgba(0,0,0,0.4);--sv-sh-lg:0 24px 60px rgba(0,0,0,0.5);--sv-sh-xl:0 30px 70px rgba(0,0,0,0.55);}
    /* capability marquee (auto-scroll) */
    .sv-capmq{position:relative;overflow:visible;margin:8px calc(-1*clamp(24px,4vw,48px)) 0;padding-bottom:42px;}
    .sv-captrack{display:flex;gap:14px;align-items:stretch;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;padding:4px clamp(24px,4vw,48px);will-change:scroll-position;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 5%,#000 95%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 5%,#000 95%,transparent 100%);}
    .sv-captrack::-webkit-scrollbar{display:none;}
    .sv-cap{background:var(--sv-surface);border:1px solid var(--sv-line);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:13px;width:280px;flex-shrink:0;transition:border-color .15s ease;}
    .sv-cap:hover{border-color:var(--sv-line-strong);}
    .sv-cap-ic{width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--sv-ink);border:1px solid var(--sv-line);display:grid;place-items:center;font-size:15px;}
    .sv-cap h4{font-weight:700;font-size:15px;color:var(--sv-ink);letter-spacing:-0.012em;margin:0;line-height:1.25;}
    .sv-cap p{font-size:13px;color:var(--sv-ink-3);margin:6px 0 0;line-height:1.5;}
    .sv-cap-flag{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:600;color:#FF4545;letter-spacing:0.06em;text-transform:uppercase;margin-top:auto;}
    .sv-cap-flag .dot{width:5px;height:5px;border-radius:999px;background:#FF4545;}
    .sv-cap.featured{background:linear-gradient(160deg,rgba(255,69,69,0.10),rgba(255,69,69,0.02));border-color:rgba(255,69,69,0.32);}
    .sv-cap.featured .sv-cap-ic{background:var(--sv-soft);color:#FF4545;border-color:rgba(255,69,69,0.3);}
    .sv-cappause{position:absolute;right:clamp(24px,4vw,48px);bottom:2px;appearance:none;width:30px;height:30px;border-radius:999px;border:1px solid var(--sv-line);background:var(--sv-surface);color:var(--sv-ink-3);display:grid;place-items:center;cursor:pointer;opacity:0.55;transition:opacity .2s,color .2s,transform .15s,border-color .15s;z-index:4;}
    .sv-cappause:hover{opacity:1;color:var(--sv-ink);border-color:var(--sv-line-strong);transform:scale(1.06);}
    .sv-cappause svg{width:10px;height:10px;}
    /* white-label + Studio AI prototype */
    .sv-bai-sec{padding-bottom:168px!important;}
    @media(max-width:980px){.sv-bai-sec{padding-bottom:120px!important;}}
    .bai-wrap{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:72px;align-items:center;}
    @media(max-width:980px){.bai-wrap{grid-template-columns:1fr;gap:48px;}}
    .bai-stage{position:relative;padding:40px 30px;}
    @media(max-width:560px){.bai-stage{padding:30px 4px;}}
    .wl-card{background:var(--sv-surface);border:1px solid var(--sv-line-strong);border-radius:18px;overflow:hidden;box-shadow:var(--sv-sh-lg);position:relative;z-index:1;}
    .wl-room-bg{height:320px;position:relative;display:flex;align-items:center;justify-content:center;color:#fff;overflow:hidden;isolation:isolate;}
    .wl-video-bg{position:absolute;inset:-40px;z-index:0;pointer-events:none;filter:blur(20px) brightness(.55) saturate(.95);transform:scale(1.08);}
    .wl-video-bg iframe{width:100%;height:100%;border:0;display:block;background:transparent;}
    .wl-room-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 55% at 50% 55%,rgba(20,18,18,.55),rgba(20,18,18,.85)),linear-gradient(160deg,rgba(58,34,28,.35) 0%,rgba(20,18,18,.65) 100%);z-index:1;}
    .wl-brand,.wl-waiting{position:relative;z-index:2;}
    .wl-brand{position:absolute;top:18px;left:20px;display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:15px;letter-spacing:-0.02em;}
    .wl-brand .gm{width:24px;height:24px;border-radius:7px;background:#fff;display:grid;place-items:center;color:#3a221c;font-weight:800;font-size:12px;}
    .wl-waiting{text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center;}
    .wl-waiting .ring{width:56px;height:56px;border-radius:999px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;animation:svSpin 1.6s linear infinite;}
    @keyframes svSpin{to{transform:rotate(360deg);}}
    .wl-waiting h4{font-size:19px;font-weight:700;margin:0;letter-spacing:-0.018em;color:#fff;}
    .wl-waiting p{margin:0;font-size:13px;color:rgba(255,255,255,.7);}
    .wl-fields{padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:14px;background:var(--sv-surface-2);border-top:1px solid var(--sv-line);}
    .wl-field{display:flex;flex-direction:column;gap:6px;min-width:0;}
    .wl-field label{font-size:11px;color:var(--sv-ink-3);font-weight:600;letter-spacing:0.04em;text-transform:uppercase;}
    .wl-field .val{background:var(--sv-bg-deep);border:1px solid var(--sv-line);border-radius:8px;padding:8px 10px;font-size:12.5px;font-family:var(--mono);color:var(--sv-ink-2);display:flex;align-items:center;gap:8px;overflow:hidden;white-space:nowrap;}
    .wl-field .val .swatch{width:14px;height:14px;border-radius:4px;border:1px solid var(--sv-line-strong);flex-shrink:0;}
    .bai-ai-card{position:absolute;right:-12px;bottom:-74px;width:280px;max-width:88%;background:var(--sv-surface);border:1px solid var(--sv-line-strong);border-radius:14px;padding:14px;box-shadow:var(--sv-sh-xl);z-index:4;display:flex;flex-direction:column;gap:10px;animation:baiFloat 6s ease-in-out infinite;}
    @keyframes baiFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
    @media(max-width:980px){.bai-ai-card{right:0;bottom:-18px;}}
    .bai-ai-head{display:flex;align-items:center;gap:10px;}
    .bai-ai-mark{width:32px;height:32px;border-radius:999px;background:var(--sv-soft);color:#FF4545;display:grid;place-items:center;flex-shrink:0;}
    .bai-ai-title{font-size:13.5px;font-weight:700;color:var(--sv-ink);letter-spacing:-0.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .bai-ai-meta{font-size:11px;color:var(--sv-ink-3);margin-top:1px;}
    .bai-ai-flag{font-size:10px;font-weight:600;color:var(--sv-moss);letter-spacing:0.08em;text-transform:uppercase;background:rgba(111,207,138,.12);padding:3px 7px;border-radius:999px;flex-shrink:0;}
    .ai-tape{display:flex;gap:4px;align-items:flex-end;height:28px;}
    .ai-tape span{width:3px;border-radius:2px;display:block;background:#FF4545;opacity:.22;transform-origin:bottom;animation:svTape 2.6s ease-in-out infinite;will-change:transform,opacity;}
    @keyframes svTape{0%,100%{transform:scaleY(0.3);opacity:.2;}50%{transform:scaleY(1);opacity:1;}}
    .bai-ai-section{font-size:12.5px;color:var(--sv-ink-2);line-height:1.5;border-top:1px solid var(--sv-line);padding-top:12px;}
    .bai-ai-eyebrow{font-size:10px;color:var(--sv-ink-3);font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;}
    .bai-domain-pill{position:absolute;top:12px;right:-12px;display:inline-flex;align-items:center;gap:8px;padding:8px 12px;background:var(--sv-surface);border:1px solid var(--sv-line-strong);border-radius:999px;font-family:var(--mono);font-size:11px;color:var(--sv-ink-3);box-shadow:var(--sv-sh-md);z-index:5;animation:baiFloat2 5s ease-in-out infinite .5s;}
    @media(max-width:980px){.bai-domain-pill{right:0;}}
    @keyframes baiFloat2{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
    .bai-domain-pill b{color:var(--sv-ink);}
    .bai-pill-dot{width:4px;height:4px;border-radius:999px;background:var(--sv-ink-4);}
    .bai-embed-pill{position:absolute;bottom:-16px;left:12px;padding:12px 14px;background:var(--sv-surface);border:1px solid var(--sv-line-strong);border-radius:12px;box-shadow:var(--sv-sh-md);z-index:4;font-family:var(--mono);font-size:11px;color:var(--sv-ink-2);animation:baiFloat 7s ease-in-out infinite 1s;}
    @media(max-width:980px){.bai-embed-pill{left:0;}}
    .bai-embed-eyebrow{display:inline-flex;align-items:center;gap:5px;font-family:Inter,system-ui,sans-serif;font-size:9.5px;font-weight:600;color:var(--sv-ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;}
    .bai-embed-pill code{display:block;color:var(--sv-ink-2);}
    .tw-caret{display:inline-block;width:1px;height:1em;margin-left:2px;background:currentColor;vertical-align:-0.12em;opacity:.7;animation:svCaret 1s steps(2,start) infinite;}
    .bai-bullets{display:flex;flex-direction:column;gap:16px;}
    .ai-bullet{display:flex;gap:13px;align-items:flex-start;}
    .ai-bullet .b-mark{width:30px;height:30px;border-radius:9px;flex-shrink:0;background:var(--sv-soft);color:#FF4545;display:grid;place-items:center;font-size:13px;}
    .ai-bullet h4{font-size:14.5px;font-weight:600;color:var(--sv-ink);margin:0 0 3px;}
    .ai-bullet p{font-size:13px;color:var(--sv-ink-3);line-height:1.5;margin:0;}
    .bai-cta{display:flex;gap:10px;align-items:center;margin-top:12px;flex-wrap:wrap;}
    .bai-btn-primary{background:#FF4545;color:#fff;font-size:13.5px;font-weight:600;padding:11px 18px;border-radius:10px;text-decoration:none;transition:background .15s,transform .15s;}
    .bai-btn-primary:hover{background:#E63B3B;transform:translateY(-1px);}
    .bai-btn-ghost{display:inline-flex;align-items:center;gap:7px;color:var(--sv-ink-2);font-size:13.5px;font-weight:600;padding:11px 14px;border-radius:10px;text-decoration:none;border:1px solid var(--sv-line-strong);transition:border-color .15s,color .15s;}
    .bai-btn-ghost:hover{color:var(--sv-ink);border-color:#FF4545;}
    /* integrations marquee (CSS-animated, two rows) */
    .sv-mq-wrap{position:relative;margin-top:8px;padding-bottom:10px;}
    .sv-mq{position:relative;overflow:hidden;width:100%;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);}
    .sv-mq+.sv-mq{margin-top:28px;}
    .sv-mq-track{display:flex;gap:64px;width:max-content;align-items:center;animation:svMq linear infinite;animation-duration:70s;will-change:transform;}
    .sv-mq-track.rev{animation-name:svMqRev;animation-duration:90s;}
    @keyframes svMq{from{transform:translate3d(-33.333%,0,0);}to{transform:translate3d(0,0,0);}}
    @keyframes svMqRev{from{transform:translate3d(0,0,0);}to{transform:translate3d(-33.333%,0,0);}}
    .sv-mq-wrap.paused .sv-mq-track{animation-play-state:paused;}
    .sv-intg{display:inline-flex;align-items:center;gap:12px;color:var(--sv-ink-2);flex-shrink:0;white-space:nowrap;opacity:.72;transition:opacity .2s;}
    .sv-intg:hover{opacity:1;color:var(--sv-ink);}
    .sv-intg-mark{width:34px;height:34px;display:grid;place-items:center;color:var(--sv-ink);flex-shrink:0;}
    .sv-intg-mark svg{width:100%;height:100%;}
    .sv-intg-name{font-weight:700;font-size:18px;letter-spacing:-0.02em;}
    .sv-mq-toggle{position:absolute;right:8px;bottom:-28px;width:32px;height:32px;border-radius:999px;border:1px solid var(--sv-line-strong);background:var(--sv-surface);color:var(--sv-ink-3);display:grid;place-items:center;cursor:pointer;opacity:.55;transition:opacity .2s,color .2s,transform .15s;z-index:5;}
    .sv-mq-toggle:hover{opacity:1;color:var(--sv-ink);transform:scale(1.06);}
    .sv-mq-toggle svg{width:11px;height:11px;}
    .sv-intg-miss{display:flex;align-items:center;justify-content:center;gap:9px;margin:26px auto 0;font-size:13.5px;color:var(--sv-ink-3);}
    .sv-intg-miss b{color:var(--sv-ink);font-weight:600;}
    .sv-intg-miss .pl{width:26px;height:26px;border-radius:999px;border:1px solid var(--sv-line-strong);display:grid;place-items:center;color:#FF4545;font-size:12px;flex-shrink:0;}

    /* capability sections — re-skinned to the live dreambody.club cream/khaki/rose theme (LCE-10000337).
       The real site is a warm light theme, not dark — so each framed section reads as a faithful
       screenshot of the real product, embedded in the dark case study like the other case studies. */
    .tc-sections.dbc-sections{--accent:#6F7550;--accent-border:rgba(154,159,116,0.32);}
    .dbc-sections .tc-cap-k{color:#A7A772!important;}
    /* Light "screenshot" frame — higher specificity than the generic dark .tc-frame, and resets the
       in-frame text tokens to ink so headings/body inside the frame read on cream. */
    .tc-sections.dbc-sections .tc-frame{background:#FBF7F1;border:1px solid rgba(42,38,32,0.10);box-shadow:0 24px 60px rgba(42,38,32,0.16);--text:#2A2620;--dim:#4A4239;--faint:#78705F;--panel:#FFFFFF;}
    .dbc-sections .tc-frame .eyebrow{color:#6F7550;}
    .dbc-four{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:8px;}
    @media(max-width:760px){.dbc-four{grid-template-columns:repeat(2,1fr);}}
    .dbc-fcard{background:#FFFFFF;border:1px solid rgba(42,38,32,0.09);border-radius:14px;padding:20px 18px;}
    .dbc-fcard .dbc-fi{width:40px;height:40px;border-radius:10px;background:rgba(154,159,116,0.16);display:flex;align-items:center;justify-content:center;color:#6F7550;font-size:16px;margin-bottom:14px;}
    .dbc-fcard h4{font-size:15px;font-weight:600;color:var(--text);margin:0 0 7px;}
    .dbc-fcard p{font-size:13px;color:var(--dim);line-height:1.55;margin:0 0 14px;}
    .dbc-fcard .dbc-fscore{display:flex;align-items:center;gap:9px;}
    .dbc-fcard .dbc-fscore b{font-size:20px;color:#6F7550;font-variant-numeric:tabular-nums;}
    .dbc-fmini{flex:1;height:6px;border-radius:3px;background:rgba(42,38,32,0.08);overflow:hidden;}
    .dbc-fmini span{display:block;height:100%;background:#9A9F74;width:0;transition:width 1s ease;}
    .dbc-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:8px;}
    @media(max-width:760px){.dbc-steps{grid-template-columns:1fr;}}
    .dbc-step{background:#FFFFFF;border:1px solid rgba(42,38,32,0.09);border-radius:14px;padding:24px 22px;position:relative;}
    .dbc-step .dbc-stepn{font-family:var(--mono);font-size:12px;color:#C8736F;letter-spacing:0.1em;margin-bottom:12px;}
    .dbc-step h4{font-size:16px;font-weight:600;margin:0 0 8px;color:var(--text);}
    .dbc-step p{font-size:13.5px;color:var(--dim);line-height:1.6;margin:0;}
    .dbc-lib{background:#FFFFFF;border:1px solid rgba(42,38,32,0.09);border-radius:16px;overflow:hidden;}
    .dbc-lib-bar{display:flex;align-items:center;gap:8px;padding:12px 18px;border-bottom:1px solid rgba(42,38,32,0.08);font-family:var(--mono);font-size:11px;color:var(--faint);letter-spacing:0.06em;}
    .dbc-lib-bar .dbc-lib-count{margin-left:auto;color:#6F7550;}
    .dbc-lib-body{display:grid;grid-template-columns:190px 1fr;gap:0;}
    @media(max-width:760px){.dbc-lib-body{grid-template-columns:1fr;}.dbc-lib-side{display:none;}}
    .dbc-lib-side{border-right:1px solid rgba(42,38,32,0.08);padding:18px 16px;}
    .dbc-lib-fg{margin-bottom:16px;}
    .dbc-lib-fg .dbc-lfl{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--faint);font-family:var(--mono);margin-bottom:9px;}
    .dbc-chip{display:inline-block;font-size:11.5px;color:var(--dim);background:rgba(42,38,32,0.04);border:1px solid rgba(42,38,32,0.10);border-radius:7px;padding:4px 10px;margin:0 6px 6px 0;}
    .dbc-chip.on{background:rgba(154,159,116,0.20);border-color:rgba(154,159,116,0.45);color:#2F3322;}
    .dbc-lib-grid{padding:18px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
    @media(max-width:980px){.dbc-lib-grid{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:540px){.dbc-lib-grid{grid-template-columns:1fr;}}
    .dbc-tile{border-radius:12px;overflow:hidden;background:#FBF7F1;border:1px solid rgba(42,38,32,0.08);}
    .dbc-tile-thumb{height:96px;background:linear-gradient(135deg,rgba(154,159,116,0.30),rgba(233,165,163,0.32));display:flex;align-items:flex-end;justify-content:flex-end;padding:8px;}
    .dbc-tile-tag{font-size:10px;font-family:var(--mono);font-weight:600;color:#FBF7F1;background:#6F7550;border-radius:5px;padding:2px 7px;}
    .dbc-tile-b{padding:11px 12px 13px;}
    .dbc-tile-b h5{font-size:13px;font-weight:600;color:var(--text);margin:0 0 5px;line-height:1.35;}
    .dbc-tile-b .dbc-tile-meta{font-size:11px;color:var(--faint);font-family:var(--mono);}
    /* DBC dashboard preview — "Everything you need, always at hand" (LCE-10000337) */
    .dbcdash{display:grid;grid-template-columns:0.78fr 1.22fr;gap:34px;align-items:center;margin-top:8px;}
    @media(max-width:860px){.dbcdash{grid-template-columns:1fr;gap:24px;}}
    .dbcdash-copy{position:relative;min-height:230px;}
    @media(max-width:860px){.dbcdash-copy{min-height:0;}}
    .dbcdash-slide{position:absolute;inset:0;opacity:0;transform:translateY(10px);transition:opacity .5s ease,transform .5s ease;pointer-events:none;}
    .dbcdash-slide.dbcdash-slide-on{opacity:1;transform:none;position:relative;pointer-events:auto;}
    @media(max-width:860px){.dbcdash-slide{position:absolute;}.dbcdash-slide.dbcdash-slide-on{position:relative;}}
    .dbcdash-slide h4{font-size:19px;font-weight:700;color:var(--text);margin:0 0 9px;letter-spacing:-0.01em;}
    .dbcdash-slide>p{font-size:14px;color:var(--dim);line-height:1.55;margin:0 0 16px;}
    .dbcdash-benefits{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;}
    .dbcdash-benefits li{display:flex;align-items:flex-start;gap:11px;font-size:13px;color:var(--dim);line-height:1.45;}
    .dbcdash-benefits li i{width:26px;height:26px;flex-shrink:0;border-radius:8px;background:rgba(154,159,116,0.16);color:#6F7550;display:flex;align-items:center;justify-content:center;font-size:11px;}
    .dbcdash-browser{border:1px solid rgba(42,38,32,0.10);border-radius:14px;overflow:hidden;background:#FFFFFF;box-shadow:0 24px 60px rgba(42,38,32,0.18);}
    .dbcdash-chrome{display:flex;align-items:center;gap:12px;padding:9px 14px;background:#F4EDE1;border-bottom:1px solid rgba(42,38,32,0.08);}
    .dbcdash-dots{display:flex;gap:6px;}
    .dbcdash-dots span{width:9px;height:9px;border-radius:50%;background:rgba(42,38,32,0.16);}
    .dbcdash-url{font-family:var(--mono);font-size:11px;color:var(--faint);background:rgba(42,38,32,0.05);border-radius:6px;padding:3px 12px;}
    .dbcdash-app{display:grid;grid-template-columns:124px 1fr;position:relative;min-height:330px;}
    @media(max-width:540px){.dbcdash-app{grid-template-columns:1fr;}}
    .dbcdash-sidebar{border-right:1px solid rgba(42,38,32,0.08);padding:14px 10px;display:flex;flex-direction:column;gap:3px;background:#F4EDE1;}
    @media(max-width:540px){.dbcdash-sidebar{display:none;}}
    .dbcdash-sb-logo{width:30px;height:30px;border-radius:9px;background:rgba(154,159,116,0.18);color:#6F7550;display:flex;align-items:center;justify-content:center;font-size:14px;margin:0 0 12px 6px;}
    .dbcdash-sb-sec{font-size:8.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--faint);font-family:var(--mono);margin:10px 0 4px 8px;}
    .dbcdash-nav{display:flex;align-items:center;gap:9px;width:100%;background:transparent;border:none;color:var(--dim);font-size:11.5px;font-weight:600;letter-spacing:0.02em;padding:8px 8px;border-radius:8px;cursor:default;text-align:left;transition:background .25s,color .25s;}
    .dbcdash-nav i{width:15px;font-size:12px;color:var(--faint);transition:color .25s;}
    .dbcdash-nav.dbcdash-nav-on{background:rgba(154,159,116,0.18);color:#2F3322;}
    .dbcdash-nav.dbcdash-nav-on i{color:#6F7550;}
    .dbcdash-screens{position:relative;overflow:hidden;}
    .dbcdash-screen{position:absolute;inset:0;opacity:0;transform:translateX(14px);transition:opacity .5s ease,transform .5s ease;pointer-events:none;padding:16px 18px;overflow:hidden;}
    .dbcdash-screen.dbcdash-screen-on{opacity:1;transform:none;position:relative;pointer-events:auto;}
    .dbcdash-scr-top{margin-bottom:14px;}
    .dbcdash-scr-title{font-size:13px;color:var(--dim);}
    .dbcdash-scr-title b{font-size:20px;color:var(--text);margin:0 6px 0 8px;font-variant-numeric:tabular-nums;}
    .dbcdash-scr-title i{font-style:normal;font-size:11px;color:#6F7550;font-family:var(--mono);}
    .dbcdash-pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;}
    .dbcdash-pill{background:#FBF7F1;border:1px solid rgba(42,38,32,0.08);border-radius:12px;padding:12px 8px;text-align:center;}
    .dbcdash-pill-ic{display:inline-flex;width:26px;height:26px;border-radius:8px;background:rgba(154,159,116,0.16);color:#6F7550;align-items:center;justify-content:center;font-size:11px;margin-bottom:7px;}
    .dbcdash-pill b{display:block;font-size:18px;color:var(--text);line-height:1;font-variant-numeric:tabular-nums;}
    .dbcdash-pill-l{display:block;font-size:9.5px;letter-spacing:0.06em;text-transform:uppercase;color:var(--faint);margin-top:4px;font-family:var(--mono);}
    .dbcdash-rec-h{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--dim);font-family:var(--mono);margin:0 0 9px;}
    .dbcdash-rec-h span{color:#6F7550;font-weight:600;letter-spacing:0;text-transform:none;}
    .dbcdash-rec-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}
    .dbcdash-rec-c{background:#FBF7F1;border:1px solid rgba(42,38,32,0.08);border-radius:10px;overflow:hidden;padding-bottom:9px;}
    .dbcdash-rec-th{height:46px;background:linear-gradient(135deg,rgba(154,159,116,0.34),rgba(233,165,163,0.26));margin-bottom:8px;}
    .dbcdash-rec-th-a{background:linear-gradient(135deg,rgba(154,159,116,0.36),rgba(154,159,116,0.14));}
    .dbcdash-rec-th-b{background:linear-gradient(135deg,rgba(233,165,163,0.34),rgba(154,159,116,0.16));}
    .dbcdash-rec-th-c{background:linear-gradient(135deg,rgba(111,117,80,0.30),rgba(233,165,163,0.20));}
    .dbcdash-rec-c span{display:block;font-size:11px;font-weight:600;color:var(--text);line-height:1.3;padding:0 9px;}
    .dbcdash-rec-c i{display:block;font-style:normal;font-size:10px;color:var(--faint);font-family:var(--mono);padding:4px 9px 0;}
    .dbcdash-lib{border:none!important;border-radius:0!important;background:transparent!important;}
    .dbcdash-lib .dbc-lib-grid{grid-template-columns:repeat(3,1fr);padding:14px 0 0;}
    @media(max-width:760px){.dbcdash-lib .dbc-lib-body{grid-template-columns:160px 1fr;}.dbcdash-lib .dbc-lib-side{display:block;}}
    @media(max-width:620px){.dbcdash-lib .dbc-lib-grid{grid-template-columns:repeat(2,1fr);}}
    .dbcdash-prog{height:3px;background:rgba(42,38,32,0.08);}
    .dbcdash-prog-fill{height:100%;width:0;background:linear-gradient(90deg,#9A9F74,#6F7550);transition:width .25s linear;}
    /* ── trustcenter flow + globe sections (LCE-10000274 Rita pt2) ── */
    .tc-sections{--accent:#14B8A6;--panel:#1E1E1E;--dim:#9AA1A8;--faint:#5A6068;--text:#F5F7F4;--border:rgba(255,255,255,0.07);--mono:'JetBrains Mono',ui-monospace,Menlo,monospace;--accent-border:rgba(20,184,166,0.22);position:relative;display:block;border:none;border-radius:0;overflow:visible;margin-top:clamp(36px,5vw,64px);}
    .tc-sections .sec{padding:clamp(48px,7vw,88px) 40px;position:relative;}
    .tc-sections .sec-inner{max-width:1200px;margin:0 auto;}
    .tc-sections .eyebrow{font-size:11px;letter-spacing:0.18em;color:var(--accent);text-transform:uppercase;font-family:var(--mono);margin-bottom:12px;font-weight:600;}
    .tc-sections .sec--flow::before{content:"";position:absolute;inset:0;background:radial-gradient(rgba(20,184,166,0.05) 0%,transparent 60%);pointer-events:none;z-index:0;}
    .tc-sections .sec--flow .sec-inner{position:relative;z-index:1;}
    .tc-sections .flow-header{max-width:560px;margin:0 0 44px;text-align:left;}
    .tc-sections .flow-header h2{font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-0.025em;line-height:1.05;margin:0 0 16px;color:var(--text);}
    .tc-sections .flow-sub{font-size:15px;color:var(--dim);line-height:1.6;margin:0;}
    .tc-sections .flow-diagram{display:grid;grid-template-columns:186px 44px 110px 44px 1fr 44px 224px;align-items:center;gap:0;min-height:320px;}
    .tc-sections .flow-connector{display:flex;align-items:center;width:100%;}
    .tc-sections .flow-connector-line{height:1.5px;width:100%;background:linear-gradient(90deg,rgba(249,115,22,0.5),rgba(20,184,166,0.5));opacity:0.18;transition:opacity 0.7s;}
    .tc-sections .flow-connector-line.lit{opacity:0.75;}
    .tc-sections .flow-visitor-card{background:var(--panel);border:1.5px solid rgba(249,115,22,0.4);border-radius:14px;padding:18px;transition:border-color 0.7s,box-shadow 0.7s;}
    .tc-sections .flow-visitor-card.active{border-color:rgba(20,184,166,0.5);box-shadow:0 0 28px rgba(20,184,166,0.12);}
    .tc-sections .flow-visitor-avatar{width:42px;height:42px;border-radius:50%;background:rgba(249,115,22,0.1);border:1.5px solid rgba(249,115,22,0.4);display:flex;align-items:center;justify-content:center;margin:0 auto 8px;font-size:17px;color:#F97316;transition:0.7s;}
    .tc-sections .flow-visitor-card.active .flow-visitor-avatar{background:rgba(20,184,166,0.1);border-color:rgba(20,184,166,0.4);color:#14B8A6;}
    .tc-sections .flow-visitor-site{font-family:var(--mono);font-size:10px;color:var(--faint);text-align:center;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;}
    .tc-sections .flow-trigger{display:flex;align-items:center;gap:7px;padding:5px 8px;background:rgba(249,115,22,0.06);border-radius:6px;font-size:11px;color:var(--dim);font-family:var(--mono);margin-bottom:5px;transition:background 0.7s;}
    .tc-sections .flow-trigger:last-child{margin-bottom:0;}
    .tc-sections .flow-trigger i{color:#F97316;width:12px;text-align:center;font-size:11px;transition:color 0.7s;}
    .tc-sections .flow-visitor-card.active .flow-trigger{background:rgba(20,184,166,0.06);}
    .tc-sections .flow-visitor-card.active .flow-trigger i{color:#14B8A6;}
    .tc-sections .flow-col--hub{display:flex;justify-content:center;}
    .tc-sections .flow-hub{display:flex;flex-direction:column;align-items:center;}
    .tc-sections .flow-hub-disc{width:80px;height:80px;border-radius:50%;border:2px solid rgba(249,115,22,0.5);background:rgba(249,115,22,0.07);display:flex;align-items:center;justify-content:center;transition:0.7s;animation:fhPulse 2.4s ease-in-out infinite;}
    .tc-sections .flow-hub.active .flow-hub-disc{border-color:rgba(20,184,166,0.65);background:rgba(20,184,166,0.1);box-shadow:0 0 32px rgba(20,184,166,0.22);animation:fhPulseActive 2.4s ease-in-out infinite;}
    .tc-sections .flow-hub-icon{font-size:28px;color:#F97316;transition:color 0.7s;}
    .tc-sections .flow-hub.active .flow-hub-icon{color:#14B8A6;}
    .tc-sections .flow-hub-label{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:0.12em;text-transform:uppercase;margin-top:8px;white-space:nowrap;}
    .tc-sections .flow-nodes{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .tc-sections .flow-node{display:flex;align-items:flex-start;gap:9px;padding:8px 12px;background:var(--panel);border:1px solid rgba(249,115,22,0.15);border-radius:9px;transition:0.4s;opacity:0.32;}
    .tc-sections .flow-node i{font-size:13px;color:#F97316;width:14px;text-align:center;flex-shrink:0;transition:color 0.4s;margin-top:2px;}
    .tc-sections .flow-node-info{display:flex;flex-direction:column;gap:4px;min-width:0;}
    .tc-sections .flow-node-label{font-size:11.5px;color:var(--dim);font-family:var(--mono);white-space:nowrap;}
    .tc-sections .flow-node-logos{display:flex;gap:4px;flex-wrap:wrap;margin-top:3px;align-items:center;}
    .tc-sections .fnl{font-family:var(--mono);font-size:8.5px;letter-spacing:0.05em;padding:2px 5px;border-radius:4px;background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);color:#F97316;white-space:nowrap;transition:0.45s;}
    .tc-sections .flow-node.active .fnl{background:rgba(20,184,166,0.08);border-color:rgba(20,184,166,0.3);color:#14B8A6;}
    .tc-sections .flow-plats{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;width:76px;margin-left:auto;margin-right:auto;}
    .tc-sections .blogo{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--faint);transition:0.5s;flex-shrink:0;line-height:1;cursor:default;}
    .tc-sections .blogo i{font-size:11px;line-height:1;}
    .tc-sections .flow-node.active .blogo,.tc-sections .flow-visitor-card.active .blogo{border-color:rgba(20,184,166,0.35);color:#14B8A6;background:rgba(20,184,166,0.07);}
    .tc-sections .flow-visitor-sub{font-family:var(--mono);font-size:9px;color:var(--faint);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;}
    .tc-sections .flow-node.active{border-color:rgba(20,184,166,0.4);background:rgba(20,184,166,0.05);box-shadow:0 0 10px rgba(20,184,166,0.1);opacity:1;}
    .tc-sections .flow-node.active i{color:#14B8A6;}
    .tc-sections .flow-col--outcomes{display:flex;flex-direction:column;gap:12px;}
    .tc-sections .flow-outcome{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px;opacity:0;transform:translateX(14px);transition:opacity 0.55s,transform 0.55s,border-color 0.3s;}
    .tc-sections .flow-outcome.active{opacity:1;transform:translateX(0);}
    .tc-sections .flow-outcome:hover{border-color:rgba(20,184,166,0.45);transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.35);}
    .tc-sections .flow-outcome-icon{width:30px;height:30px;border-radius:7px;background:rgba(20,184,166,0.1);border:1px solid rgba(20,184,166,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;color:#14B8A6;margin-bottom:8px;}
    .tc-sections .flow-outcome-title{font-size:13.5px;font-weight:700;color:var(--text);margin-bottom:3px;}
    .tc-sections .flow-outcome-desc{font-size:11.5px;color:var(--dim);line-height:1.5;}
    .tc-sections .sec--globe::before{content:"";position:absolute;inset:0;background:radial-gradient(at 15% 50%,rgba(20,184,166,0.07) 0%,transparent 50%);pointer-events:none;z-index:0;}
    .tc-sections .sec--globe .sec-inner{position:relative;z-index:1;}
    .tc-sections .globe-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:start;}
    .tc-sections .globe-grid h2{font-size:clamp(32px,4vw,44px);font-weight:800;letter-spacing:-0.025em;line-height:1.05;margin:0 0 16px;color:var(--text);}
    .tc-sections .globe-grid p{font-size:14.5px;color:var(--dim);line-height:1.6;margin:0 0 18px;}
    .tc-sections .globe-stat{display:flex;gap:28px;margin-top:24px;flex-wrap:wrap;}
    .tc-sections .globe-metric{display:flex;flex-direction:column;gap:3px;}
    .tc-sections .globe-metric-num{font-size:30px;font-weight:800;color:var(--accent);letter-spacing:-0.03em;line-height:1;}
    .tc-sections .globe-metric-label{font-size:10.5px;color:var(--faint);font-family:var(--mono);letter-spacing:0.08em;text-transform:uppercase;}
    .tc-sections .j-list{display:flex;flex-direction:column;gap:8px;}
    .tc-sections .j-item{display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--panel);border:1px solid var(--border);border-radius:10px;transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;}
    .tc-sections .j-item:hover{border-color:var(--accent-border);transform:translateX(5px);box-shadow:0 6px 20px rgba(0,0,0,0.3);}
    .tc-sections .j-flag{font-size:22px;line-height:1;flex-shrink:0;}
    .tc-sections .j-name{font-size:14px;font-weight:600;color:var(--text);}
    .tc-sections .j-law{font-size:11.5px;color:var(--faint);font-family:var(--mono);margin-top:2px;}
    .tc-sections .j-status{margin-left:auto;font-size:9px;font-weight:700;letter-spacing:0.08em;color:var(--accent);font-family:var(--mono);background:rgba(20,184,166,0.1);border:1px solid var(--accent-border);padding:3px 8px;border-radius:100px;flex-shrink:0;}
    .tc-sections .sec--kb .sec-inner{position:relative;z-index:1;}
    .tc-sections .kb-header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:36px;flex-wrap:wrap;}
    .tc-sections .kb-h2{font-size:clamp(28px,3.5vw,40px);font-weight:800;letter-spacing:-0.025em;line-height:1.1;color:var(--text);margin:0;}
    .tc-sections .kb-p{font-size:14px;color:var(--dim);line-height:1.6;margin:12px 0 0;max-width:540px;}
    .tc-sections .kb-btn{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--accent);border:1px solid var(--accent-border);border-radius:8px;padding:10px 18px;text-decoration:none;white-space:nowrap;transition:background 0.2s,transform 0.2s;}
    .tc-sections .kb-btn:hover{background:rgba(20,184,166,0.1);transform:translateY(-2px);}
    .tc-sections .kb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
    .tc-sections .kcard{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:22px;display:flex;flex-direction:column;min-height:180px;text-decoration:none;color:inherit;transition:border-color 0.25s,transform 0.25s,box-shadow 0.25s;}
    .tc-sections .kcard:hover{border-color:var(--accent-border);transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,0.4);}
    .tc-sections .kcard-tag{font-size:10px;letter-spacing:0.14em;color:var(--accent);text-transform:uppercase;font-family:var(--mono);margin-bottom:12px;font-weight:700;}
    .tc-sections .kcard-h3{font-size:15px;font-weight:600;color:var(--text);line-height:1.35;margin:0 0 auto;letter-spacing:-0.01em;}
    .tc-sections .kcard-meta{font-size:11px;color:var(--faint);font-family:var(--mono);margin-top:18px;}
    @media(max-width:900px){.tc-sections .kb-grid{grid-template-columns:1fr 1fr;}}
    @media(max-width:560px){.tc-sections .kb-grid{grid-template-columns:1fr;}}
    /* Dribbble awards (LCE-10000274 Rita pt3) */
    .tc-awards-text{font-size:0.9375rem;color:var(--muted);line-height:1.65;max-width:580px;margin:0 0 8px;}
    .tc-badges{display:flex;gap:24px;align-items:center;margin-top:24px;flex-wrap:wrap;}
    @keyframes tcBadgePulse{0%,100%{transform:scale(1);opacity:0.82;}50%{transform:scale(1.055);opacity:1;}}
    .tc-badge-img{height:85px;width:auto;filter:brightness(0) invert(1);opacity:0.82;transition:opacity 0.2s;animation:tcBadgePulse 3.6s ease-in-out infinite;transform-origin:center;will-change:transform,opacity;}
    .tc-badge-img:hover{opacity:1;}
    @media(prefers-reduced-motion:reduce){.tc-badge-img{animation:none;}}
    /* Pull quote glow (LCE-10000274) */
    .tc-pull-wrap{text-align:center;padding:clamp(40px,6vw,72px) clamp(20px,5vw,80px);}
    @keyframes tcPulseGlow{0%,100%{text-shadow:0 0 24px rgba(245,159,10,0.28),0 0 48px rgba(245,159,10,0.12);}50%{text-shadow:0 0 40px rgba(245,159,10,0.55),0 0 80px rgba(245,159,10,0.25),0 0 120px rgba(245,159,10,0.1);}}
    .tc-pull-glow{font-size:clamp(1.15rem,2.2vw,1.75rem);font-weight:300;color:var(--text);line-height:1.6;max-width:820px;margin:0 auto;letter-spacing:-0.015em;animation:tcPulseGlow 3.5s ease-in-out infinite;}
    
    /* Recognition two-column (LCE-10000274) */
    .tc-recog-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,64px);align-items:center;}
    .tc-recog-left{text-align:left;}.tc-recog-h2{font-size:clamp(1.5rem,2.4vw,2rem);font-weight:600;letter-spacing:-0.025em;line-height:1.15;color:var(--text);margin:0 0 16px;}
    .tc-recog-frame{border:1px solid rgba(245,159,10,0.22);border-radius:18px;background:var(--surface);padding:clamp(26px,4vw,40px);display:flex;align-items:center;gap:24px;box-shadow:0 0 40px rgba(245,159,10,0.18),0 0 80px rgba(245,159,10,0.08),0 8px 32px rgba(0,0,0,0.35);}
    .tc-recog-frame .tc-awards-text{max-width:none;}.tc-recog-frame .tc-recog-copy{flex:1 1 0%;}.tc-recog-frame .tc-badges{flex-shrink:0;margin:0;}
    
    @media(max-width:820px){.tc-recog-grid{grid-template-columns:1fr;gap:28px;}}
    @media(max-width:1024px){.tc-sections .flow-diagram{display:flex;flex-direction:column;align-items:stretch;gap:36px;}.tc-sections .flow-connector{display:none;}.tc-sections .flow-nodes{grid-template-columns:repeat(3,1fr);}.tc-sections .flow-col--outcomes{flex-flow:wrap;gap:12px;}.tc-sections .flow-outcome{flex:1 1 0;min-width:180px;opacity:1;transform:none;}}
    @media(max-width:900px){.tc-sections .globe-grid{grid-template-columns:1fr;gap:32px;}}
    @media(max-width:640px){.tc-sections .flow-nodes{grid-template-columns:1fr 1fr;}.tc-sections .flow-col--outcomes{flex-direction:column;}}
    .tc-positioning{text-align:center;max-width:720px;margin:50px auto 0;padding:0 20px;}
    .tc-positioning h1{font-weight:300;letter-spacing:normal;font-size:clamp(2rem,5vw,3rem);line-height:1.2;margin:0 0 1.25rem;color:var(--text);}
    .tc-pos-sub{font-size:clamp(0.95rem,1.3vw,1.05rem);color:var(--muted);line-height:1.6;max-width:540px;margin:0 0 1.75rem;}
    .tc-positioning .cs-metric{margin-bottom:0.5rem;}
    .tc-positioning .cs-metric-note{max-width:560px;margin:0 auto;}

    /* ── Recognition / design-award badges (LCE-10000274) ── */
    .recog{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.25rem;max-width:760px;margin:0 auto;padding:0 20px;}
    .recog-badges{display:flex;align-items:center;justify-content:center;gap:clamp(24px,5vw,60px);flex-wrap:wrap;}
    .recog-badges img{height:clamp(76px,11vw,116px);width:auto;filter:brightness(0) invert(1);opacity:0.9;}
    .recog-copy{font-size:0.9375rem;color:var(--muted);line-height:1.7;margin:0;max-width:640px;}

    /* ── Copied-section frames + capability descriptions (LCE-10000274) ── */
    .tc-sections .tc-copied-block{margin-bottom:clamp(40px,6vw,72px);}
    .tc-sections .tc-frame{border:1px solid rgba(255,255,255,0.06);border-radius:18px;background:#141414;overflow:hidden;position:relative;}
    .tc-sections .tc-frame .sec{padding:clamp(36px,5vw,64px) clamp(24px,4vw,48px);}
    .tc-sections .tc-cap-desc{font-size:18px;color:var(--dim);line-height:1.7;max-width:660px;margin:18px 0 0;text-align:left;}
    .tc-sections .tc-cap-desc .tc-cap-k{display:block;font-family:var(--mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--amber);margin-bottom:7px;opacity:0;transform:translateX(-32px);transition:opacity 0.6s ease,transform 0.6s ease;}
    .tc-sections .tc-cap-desc .tc-cap-k.tc-k-in{opacity:1;transform:none;}
    @media(prefers-reduced-motion:reduce){.tc-sections .tc-cap-desc .tc-cap-k{opacity:1;transform:none;transition:none;}}
    .tc-sections .tc-scan-video{position:relative;width:100%;max-width:none;margin:0;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#0d0d0d;border:1px solid rgba(255,255,255,0.06);box-shadow:0 18px 48px rgba(0,0,0,0.4);}
    .tc-sections .tc-scan-video iframe{position:absolute;inset:0;width:100%;height:100%;border:none;display:block;}

    /* ── Articles library interactive prototype (LCE-10000274) ── */
    .tc-sections .kb-device{width:100%;max-width:430px;margin:8px auto 0;background:#0d0d0d;border:11px solid #1b1b1b;border-radius:40px;box-shadow:0 34px 80px rgba(0,0,0,0.55),inset 0 0 0 2px rgba(255,255,255,0.04);overflow:hidden;}
    .tc-sections .kb-screen{background:#141414;height:580px;display:flex;flex-direction:column;}
    .tc-sections .kb-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 0 8px;font-family:var(--mono);font-size:10px;letter-spacing:0.12em;color:var(--faint);text-transform:uppercase;}
    .tc-sections .kb-bar i{color:var(--accent);font-size:11px;}
    .tc-sections .kb-app-head{padding:6px 20px 12px;}
    .tc-sections .kb-app-head h3{font-size:20px;font-weight:800;letter-spacing:-0.02em;color:var(--text);margin:0 0 4px;}
    .tc-sections .kb-app-head p{font-size:11.5px;color:var(--faint);font-family:var(--mono);margin:0;}
    .tc-sections .kb-chips{display:flex;gap:7px;overflow-x:auto;padding:4px 20px 12px;scrollbar-width:none;}
    .tc-sections .kb-chips::-webkit-scrollbar{display:none;}
    .tc-sections .kb-chip{flex:0 0 auto;font-family:var(--mono);font-size:10.5px;letter-spacing:0.04em;padding:6px 12px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;transition:0.2s;white-space:nowrap;}
    .tc-sections .kb-chip:hover{border-color:var(--accent-border);color:var(--text);}
    .tc-sections .kb-chip.active{background:rgba(20,184,166,0.12);border-color:var(--accent-border);color:var(--accent);font-weight:700;}
    .tc-sections .kb-list{flex:1 1 0;overflow-y:auto;padding:4px 16px 18px;display:flex;flex-direction:column;gap:9px;scrollbar-width:thin;}
    .tc-sections .kb-art{display:block;background:#1b1b1b;border:1px solid var(--border);border-radius:13px;padding:15px 16px;text-decoration:none;color:inherit;transition:0.2s;}
    .tc-sections .kb-art:hover{border-color:var(--accent-border);transform:translateY(-2px);}
    .tc-sections .kb-art-tag{font-family:var(--mono);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);font-weight:700;}
    .tc-sections .kb-art-h{font-size:14px;font-weight:600;line-height:1.35;color:var(--text);margin:7px 0 9px;letter-spacing:-0.01em;}
    .tc-sections .kb-art-meta{font-family:var(--mono);font-size:10px;color:var(--faint);display:flex;align-items:center;gap:6px;}
    .tc-sections .kb-empty{display:none;text-align:center;color:var(--faint);font-family:var(--mono);font-size:11px;padding:40px 20px;}
    /* KB two-device layout + opened-article mockup (LCE-10000274) */
    .tc-sections .kb-devices{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4vw,44px);align-items:start;margin:8px 0 0;}
    .tc-sections .kb-devices .kb-device{margin:0;justify-self:center;}
    @media(max-width:760px){.tc-sections .kb-devices{grid-template-columns:1fr;gap:32px;}}
    .tc-sections .kb-screen--article{display:flex;flex-direction:column;}
    .tc-sections .kb-art-view{flex:1 1 0;overflow-y:auto;padding:6px 20px 22px;scrollbar-width:thin;}
    .tc-sections .kb-art-back{font-family:var(--mono);font-size:10px;letter-spacing:0.06em;color:var(--faint);display:flex;align-items:center;gap:6px;margin:4px 0 16px;text-transform:uppercase;}
    .tc-sections .kb-art-view-tag{font-family:var(--mono);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);font-weight:700;}
    .tc-sections .kb-art-view-title{font-size:18px;font-weight:800;line-height:1.25;letter-spacing:-0.02em;color:var(--text);margin:8px 0 6px;}
    .tc-sections .kb-art-view-meta{font-family:var(--mono);font-size:10px;color:var(--faint);margin-bottom:16px;}
    .tc-sections .kb-art-view-body p{font-size:12.5px;line-height:1.65;color:var(--dim);margin:0 0 12px;}
    .tc-sections .kb-art-view-body h4{font-size:13.5px;font-weight:700;color:var(--text);margin:16px 0 8px;letter-spacing:-0.01em;}
    .tc-sections .kb-art-view-body ul{list-style:none;display:flex;flex-direction:column;gap:7px;margin:0 0 12px;padding:0;}
    .tc-sections .kb-art-view-body li{position:relative;padding-left:18px;font-size:12px;line-height:1.5;color:var(--dim);}
    .tc-sections .kb-art-view-body li::before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--accent);}

    .cs-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
    .meta-item { background: var(--surface); padding: 1.5rem 1.625rem; display: flex; flex-direction: column; gap: 0.45rem; }
    .meta-k { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber); }
    .meta-v { font-size: 0.9rem; color: var(--text); line-height: 1.5; }

    /* Browser chrome frame */
    .cs-hero-shot { position: relative; isolation: isolate; }
    .browser-frame {
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      background: #111; box-shadow: 0 32px 80px rgba(0,0,0,0.5); position: relative;
    }
    .browser-bar {
      background: #1a1a1a; border-bottom: 1px solid var(--border);
      padding: 11px 16px; display: flex; align-items: center; gap: 8px;
    }
    .browser-dots { display: flex; gap: 6px; flex-shrink: 0; }
    .browser-dot { width: 11px; height: 11px; border-radius: 50%; }
    .bd-r { background: #FF5F57; }
    .bd-y { background: #FEBC2E; }
    .bd-g { background: #28C840; }
    .browser-addr {
      flex: 1; margin: 0 12px; background: var(--bg); border: 1px solid var(--border);
      border-radius: 6px; padding: 5px 14px; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.01em;
    }
    .browser-frame img { display: block; width: 100%; height: auto; }
    .browser-frame iframe { display: block; width: 100%; aspect-ratio: 16/9; border: none; }

    /* Built-with technology strip */
    .bw-strip {
      display: flex; flex-wrap: wrap; gap: clamp(14px, 2.5vw, 28px); align-items: center;
      padding: 1.5rem 2rem; background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px;
    }
    .bw-label { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); flex-shrink: 0; white-space: nowrap; }
    .bw-sep { width: 1px; height: 24px; background: var(--border); flex-shrink: 0; }
    .bw-logos { display: flex; flex-wrap: wrap; gap: clamp(18px, 3vw, 36px); align-items: center; }
    .bw-img { height: 22px; width: auto; opacity: 0.65; filter: brightness(0) invert(1); transition: opacity 0.2s; flex-shrink: 0; }
    .bw-img:hover { opacity: 1; }

    /* CS split challenge/solution */
    .cs-split { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 880px) { .cs-split { grid-template-columns: 1fr 1fr; } }
    .cs-col { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 2.25rem; }
    .cs-col .ch { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.25rem; color: var(--muted); }
    .cs-col.is-sol .ch { color: var(--amber); }
    .cs-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; }
    .cs-col li { position: relative; padding-left: 1.6rem; font-size: 0.9rem; color: var(--muted); line-height: 1.55; }
    .cs-col li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 7px; height: 7px; border-radius: 50%; background: var(--amber); }
    .cs-col.is-sol li { color: var(--text); }

    .cs-pull { font-size: clamp(1.5rem, 3.2vw, 2.25rem); font-weight: 300; letter-spacing: -0.025em; line-height: 1.25; text-align: center; width: 100%; }
    .cs-pull span { color: var(--amber); }

    /* Capabilities */
    .caps { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
    .cap { background: var(--surface); padding: 2.25rem; transition: background 0.2s; }
    .cap:hover { background: var(--surface-2); }
    .cap-icon { width: 46px; height: 46px; background: var(--amber-dim); border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; color: var(--amber); }
    .cap h3 { font-size: 1.0625rem; font-weight: 300; margin-bottom: 0.6rem; }
    .cap p { font-size: 0.875rem; color: var(--muted); line-height: 1.62; }


    /* Featured hero testimonial (Mitch) */
    .cs-quote { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: clamp(36px, 5vw, 64px); }
    .cs-quote .stars { color: var(--amber); font-size: 0.95rem; letter-spacing: 0.18em; margin-bottom: 1.25rem; }
    .cs-quote blockquote { font-size: clamp(1.125rem, 2vw, 1.5rem); font-weight: 600; letter-spacing: -0.015em; line-height: 1.5; margin-bottom: 2rem; }
    .cs-byline { display: flex; align-items: center; gap: 1.125rem; }
    .cs-byline img { height: 68px; width: auto; border-radius: 8px; object-fit: contain; background: rgba(255,255,255,0.06); padding: 4px; flex-shrink: 0; }
    .cs-byline strong { display: block; font-size: 1rem; margin-bottom: 0.2rem; }
    .cs-byline span { font-size: 0.8125rem; color: var(--muted); }

    /* Testimonial grid */
    .tgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 20px; }
    .tgrid-3 { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 700px) { .tgrid-3 { grid-template-columns: 1fr; } }
    .tcard { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.875rem; }
    .tcard .stars { color: var(--amber); font-size: 0.8rem; letter-spacing: 0.16em; margin-bottom: 1rem; }
    .tcard blockquote { font-size: 0.9rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.375rem; }
    .tcard figcaption { display: flex; align-items: center; gap: 0.875rem; }
    .tav { height: 44px; width: auto; border-radius: 6px; object-fit: contain; flex-shrink: 0; }
    .tcard figcaption strong { display: block; font-size: 0.875rem; font-weight: 400; margin-bottom: 0.15rem; }
    .tcard figcaption span { font-size: 0.75rem; color: var(--muted); }
    .tcard-top { display: flex; align-items: center; gap: 0.875rem; margin-bottom: 1rem; }
    .tcard-top strong { display: block; font-size: 0.875rem; font-weight: 400; margin-bottom: 0.15rem; }
    .tcard-top span { font-size: 0.75rem; color: var(--muted); display: block; }
    /* Testimonial slider */
    .testi-slider { margin-bottom: 2.5rem; }
    .testi-slide { display: none; }
    .testi-slide.active { display: block; }
    .testi-dots { display: flex; justify-content: center; gap: 8px; margin-top: 1.25rem; }
    .testi-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; transition: background 0.3s; flex-shrink: 0; }
    .testi-dot.active { background: var(--amber); }
    .t-am { color: var(--amber); }
    .testi-lede { font-size: 0.9375rem; color: var(--muted); text-align: center; margin-bottom: 0.5rem; }
    .testi-h { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 300; text-align: center; margin-bottom: 2rem; }
    .testi-h .amber { color: var(--amber); }

    /* Logo marquee */
    .marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); }
    .marquee-track { display: flex; align-items: center; gap: 56px; width: max-content; will-change: transform; }
    .marquee img { height: 28px; width: auto; opacity: 0.45; filter: grayscale(1) brightness(1.4); flex-shrink: 0; }


    /* Case study hero metric */
    .cs-metric { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 300; color: var(--amber); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 0.5rem; }
    .cs-metric-note { font-style: italic; color: var(--muted); font-size: 0.9rem; margin-bottom: 0; }

    /* Featured testimonial block */
    .cs-feat-testi { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: clamp(32px, 5vw, 60px); }
    .stars-date { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
    .stars { color: var(--amber); letter-spacing: 0.15em; }
    .tdate { font-size: 0.8125rem; color: var(--muted); }
    .feat-testi-q { font-size: clamp(0.875rem, 1.5vw, 1.0625rem); line-height: 1.72; color: var(--muted); margin-bottom: 2rem; }
    .feat-testi-q strong { color: var(--text); font-weight: 300; }
    .tcard blockquote strong { color: var(--text); font-weight: 300; }
    .feat-testi-by { display: flex; align-items: center; gap: 1rem; }
    .feat-testi-by img { height: 56px; width: auto; border-radius: 8px; object-fit: contain; flex-shrink: 0; }
    .feat-testi-by span { font-size: 0.875rem; color: var(--muted); }

    /* Challenge note */
    .ch-note { font-size: 0.875rem; color: var(--amber); font-style: italic; margin-bottom: 1rem; }

    /* Capabilities tabs — 2×3 grid */
    .cap-tabs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 2.5rem; }
    @media (min-width: 600px) { .cap-tabs { grid-template-columns: repeat(3, 1fr); } }
    .cap-tab { padding: 14px 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--muted); font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.15s; text-align: center; line-height: 1.3; }
    .cap-tab:hover { border-color: rgba(255,255,255,0.22); color: var(--text); background: var(--surface-2); }
    .cap-tab.active { background: var(--amber-dim); border-color: var(--amber-mid); color: var(--amber); font-weight: 700; }
    .cap-panel { display: none; }
    .cap-panel.active { display: block; }
    .cap-panel-inner { display: grid; grid-template-columns: 1fr; gap: 2rem; }
    @media (min-width: 800px) { .cap-panel-inner { grid-template-columns: 55fr 45fr; gap: 3rem; align-items: center; } }
    .cap-panel-img img { width: 100%; border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.4); display: block; }
    .cap-panel-img iframe { width: 100%; aspect-ratio: 16/9; border: none; border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.4); display: block; }
    .cap-panel-text h3 { font-size: 1.375rem; font-weight: 300; margin-bottom: 0.75rem; }
    .cap-panel-text .cap-desc { font-size: 0.9375rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
    .cap-panel-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; }
    .cap-panel-text li { position: relative; padding-left: 1.6rem; font-size: 0.9375rem; color: var(--text); line-height: 1.55; }
    .cap-panel-text li::before { content: '✓'; position: absolute; left: 0; top: 0; color: var(--amber); font-weight: 700; font-size: 0.875rem; line-height: 1.55; }

    /* Website section */
    .website-split { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start; }
    @media (min-width: 880px) { .website-split { grid-template-columns: 1fr 1.25fr; align-items: center; } }
    .website-img { border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.45); flex-shrink: 0; }
    .website-img img { width: 100%; display: block; }
    .website-body p { font-size: 0.9375rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem; }
    .website-body p strong { color: var(--text); font-weight: 300; }
    .funnel-label { font-size: 0.9375rem; font-weight: 600; color: var(--text); margin: 1.5rem 0 1rem; }

    /* Funnel list — amber circle checkmarks */
    .funnel { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem 2rem; margin-top: 2rem; }
    .funnel li { position: relative; padding-left: 2rem; font-size: 0.9375rem; color: var(--text); }
    .funnel li::before { content: '✓'; position: absolute; left: 0; top: 0.05em; width: 20px; height: 20px; border-radius: 50%; background: var(--amber); color: #000; font-size: 0.625rem; font-weight: 900; text-align: center; line-height: 20px; }

    /* Results grid */
    .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 2.5rem; }
    .result-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 2.25rem; text-align: center; }
    .result-n { font-size: clamp(2.5rem, 5vw, 3.75rem); font-weight: 900; color: var(--amber); letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.5rem; }
    .result-l { font-size: 1rem; font-weight: 700; margin-bottom: 0.375rem; }
    .result-sub { font-size: 0.875rem; color: var(--muted); }

    /* Callout box */
    .callout-box { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: clamp(48px, 7vw, 88px); text-align: center; }
    .callout-pre { font-size: 0.9375rem; color: var(--muted); margin-bottom: 0.5rem; }
    .callout-n { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; color: var(--amber); letter-spacing: -0.04em; line-height: 1; margin-bottom: 1rem; }
    .callout-sub { font-size: 1rem; color: var(--muted); max-width: 480px; margin: 0 auto; line-height: 1.65; }

    /* CTA subs */
    .cta-sub1 { font-size: 0.9375rem; color: var(--muted); margin-top: 1.5rem; }
    .cta-sub2 { font-size: 0.875rem; color: var(--muted); margin-top: 0.375rem; }
    .tcard-date { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.75rem; }

    /* Footer */
    .site-footer { border-top: 1px solid var(--border); }
    .foot-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; padding: clamp(48px, 6vw, 72px) var(--pad) 2.5rem; }
    @media (min-width: 780px) { .foot-grid { grid-template-columns: 1.6fr 1fr 1.4fr; gap: 3rem; } }
    .foot-brand .logo { margin-bottom: 1.25rem; display: inline-flex; }
    .foot-blurb { font-size: 0.875rem; color: var(--muted); line-height: 1.65; max-width: 340px; margin-bottom: 1.5rem; }
    .foot-social { display: flex; gap: 0.75rem; }
    .foot-social a { width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 9px; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: color 0.15s, border-color 0.15s; }
    .foot-social a:hover { color: var(--amber); border-color: var(--amber-mid); }
    .foot-h { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text); margin-bottom: 1.1rem; }
    .foot-nav { display: flex; flex-direction: column; gap: 0.7rem; }
    .foot-nav a { font-size: 0.875rem; color: var(--muted); transition: color 0.15s; }
    .foot-nav a:hover { color: var(--text); }
    .foot-legal p { font-size: 0.8125rem; color: var(--muted); line-height: 1.6; margin-bottom: 0.4rem; }
    .foot-bottom { border-top: 1px solid var(--border); padding: 1.5rem var(--pad); }
    .foot-bottom p { font-size: 0.75rem; color: var(--muted); }
  `;
}
function siteHeader(active) {
  return `<header class="header">
  <div class="header-inner">
    <a href="/" class="logo"><img src="https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/motivation-digital-amber-logo/public" alt="Motivation Digital" width="140" height="28"></a>
    <nav>
      <a href="/work"${active === 'work' ? ' class="active"' : ''}>Work</a>
      <a href="https://studio.video" target="_blank" rel="noopener">Studio</a>
      <a href="https://trustcenter.pro" target="_blank" rel="noopener">Products</a>
    </nav>
  </div>
</header>`;
}

function siteFooter() {
  return `<footer class="site-footer">
  <div class="max-wrap foot-grid">
    <div class="foot-brand">
      <a href="/" class="logo"><img src="https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/motivation-digital-amber-logo/public" alt="Motivation Digital" width="140" height="28"></a>
      <p class="foot-blurb">We design and build digital platforms. More visitors convert, more members stay, and your team stops fighting the tooling.</p>
      <div class="foot-social">
        <a href="https://www.linkedin.com/company/motivation-digital/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v12H.2V8zm7.3 0h4.4v1.64h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v6.74h-4.6v-5.97c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.15V20H7.5V8z"/></svg></a>
        <a href="https://www.facebook.com/kajabiagency" target="_blank" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.12 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z"/></svg></a>
        <a href="https://www.instagram.com/motivation.digital/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a>
        <a href="https://twitter.com/motivationdigi" target="_blank" rel="noopener" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.3l-7.21 8.24L23 21.75h-6.64l-5.2-6.8-5.95 6.8H1.9l7.71-8.81L1.4 2.25h6.81l4.7 6.21 5.33-6.21zm-1.16 17.52h1.83L7.01 4.13H5.05L17.08 19.77z"/></svg></a>
      </div>
    </div>
    <div class="foot-nav">
      <p class="foot-h">Company</p>
      <a href="/">Home</a>
      <a href="/work">Work</a>
      <a href="https://trustcenter.pro" target="_blank" rel="noopener">Trust &amp; Compliance</a>
      <a href="/legal-privacy/privacy-policy">Legal &amp; Privacy</a>
    </div>
    <div class="foot-legal">
      <p class="foot-h">Motivation Digital Ltd</p>
      <p>A member of the Motivation Group Ltd. Reg No. 10105398.</p>
      <p>Group VAT Registration: GB 284 6168 72</p>
      <p>Melville Building East, Royal William Yard, Plymouth, England, PL1 3RP</p>
    </div>
  </div>
  <div class="max-wrap foot-bottom">
    <p>Copyright &copy; 2008&#8211;2026 Motivation Group Ltd. All Rights Reserved.</p>
  </div>
</footer>`;
}

const PROJECTS = {
  'b2b-insurance-training-platform': {
    metaTitle: 'B2B Insurance Training Platform | GenuineShift Case Study',
    metaDesc: 'We built an enterprise-grade dual-portal learning system for GenuineShift &#8212; serving 100+ insurance firms nationwide. $250k contract win from an $8 billion customer. See the case study.',
    badge: 'Platform Engineering &#8212; B2B Training &amp; Insurance',
    title: 'B2B Insurance Training Platform',
    sub: 'Enterprise-grade dual-portal learning system for GenuineShift &#8212; purpose-built for the insurance training sector.',
    metric: '$250k Contract Win',
    metricNote: '(From an $8 billion customer. Enterprise-grade outcomes delivered on a platform built for scale.)',
    heroShot: 'https://videodelivery.net/73f9247646514955a57e837c2ca6413f/thumbnails/thumbnail.jpg?time=1s&height=720',
    heroShotAlt: 'GenuineShift &#8212; B2B insurance training platform portal view',
    siteAddr: 'genuineshift.com',
    heroVid: 'dab705b2b1dffb15f92fd0ad052ced70',
    shot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/gst-website-screenshot/public',
    shotAlt: 'GenuineShift &#8212; B2B insurance training platform website',
    featTestimonial: {
      date: 'Dec 10, 2025',
      bold: 'strategic, and reliable.',
      quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.',
      name: 'Jenn Welsh, CEO &#126; GenuineShift',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public',
    },
    transformLabel: 'The Build',
    transformTitle: 'Standalone Tools to Enterprise Learning System',
    challengeNote: 'B2B training at scale requires more than a standard course library.',
    challenge: [
      'Generic platform setup unable to handle multi-tier B2B user access',
      'No structured way to serve free, self-enrolled, and enterprise accounts from one system',
      'Pricing complexity &#8212; three membership tiers with distinct CTAs &#8212; unsupported by default',
      'Lack of brand authority and purpose-driven positioning to win enterprise contracts',
      'No content discovery or SEO strategy to reach insurance firms at scale',
    ],
    solutionNote: 'We built a dual-portal training platform purpose-built for enterprise insurance',
    solution: [
      'Personalised members portal with role-based upgrade paths and sidebar navigation',
      'Rule-based pricing architecture supporting free, self-enrol, and enterprise tiers with dual CTAs',
      'Distraction-free advanced library exclusively for paid B2B members',
      'Purpose-driven About Us page establishing founder authority and enterprise credibility',
      'SEO-optimised blog and responsive design across all devices for nationwide reach',
    ],
    pull: 'The platform did not just train people. It won a $250k contract from an $8 billion customer.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built for Enterprise Training',
    capsSub: 'Dual portals, enterprise-grade access control, and a design that converts.',
    capabilities: [
      { h: 'Members Portal',   vid: 'a1888489e6980caec3138830822a2e2f', desc: 'We rebuilt the members area from the ground up with personalised upgrade paths and intuitive sidebar navigation, so every member knows exactly where they stand.', bullets: ['Personalised portal for individual members', 'Clear upgrade paths from free to paid tiers', 'Sidebar navigation reducing friction for learners', 'Role-based content display for multi-tier accounts'] },
      { h: 'Pricing Page',     img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/gst-pricing-screenshot/public', desc: 'We built a rule-based pricing system that handles three account tiers in one seamless interface, with dual CTAs matching how insurance firms actually buy.', bullets: ['Three-tier pricing: free, self-enrol, and enterprise', 'Dual CTAs targeted to individual and corporate buyers', 'Clear value proposition at each tier', 'Conversion-led layout that removes decision friction'] },
      { h: 'Advanced Library', vid: '83e8c3f1c3bf10d395e57c320a5dab14', desc: 'We created a distraction-free advanced library exclusively for paid B2B members, delivering focused learning in an environment built for professional development.', bullets: ['Exclusive access for paid B2B members', 'Distraction-free interface for focused professional learning', 'Structured content hierarchy for insurance training programmes', 'Fast-loading video delivery for remote and field learners'] },
      { h: 'About Us Page',    vid: '98cad9968f17f2f21df850ac035334ba', desc: 'We designed a purpose-driven About Us page that establishes founder authority and communicates GenuineShift&#8217;s mission with the credibility enterprise clients demand.', bullets: ['Purpose-driven storytelling that builds enterprise trust', 'Founder authority positioning for B2B buyers', 'Clear articulation of sector expertise and track record', 'Credibility signals aligned with enterprise procurement standards'] },
      { h: 'Blog',             vid: 'ce7629966968f6c63085464bc9ab3ceb', desc: 'We built a content-rich blog with search and topic discovery, establishing GenuineShift as the knowledge authority for insurance training nationwide.', bullets: ['SEO-optimised blog for organic enterprise lead generation', 'Topic discovery for a growing insurance training library', 'Search functionality for professionals in the field', 'Authority-building content that supports enterprise sales cycles'] },
      { h: 'Responsive',       vid: '8d47e704acfa5b8bf054adebacfb139a', desc: 'We built a platform that works flawlessly across every device, because insurance professionals learn on mobile, tablet, and desktop.', bullets: ['Responsive design from mobile to widescreen', 'Optimised assets for fast load times nationwide', 'Consistent functionality across all devices and browsers', 'SEO performance baked into every page at build time'] },
    ],
    websiteLabel: 'Training Platform Design',
    websiteTitle: 'Enterprise B2B Platform Design',
    websiteBody: [
      'We didn&#8217;t adapt a generic platform. We built an enterprise learning system from the ground up.',
      'Every portal, pricing tier, and training module reflects how insurance professionals actually learn &#8212; and how enterprise buyers actually decide.',
      'The dual-portal architecture separates individual learners from corporate accounts without adding complexity for either group.',
      'With 100+ insurance firms served nationwide and a $250k contract win from an $8 billion customer, this is what B2B training looks like when the platform is built for it.',
      'If you&#8217;re building a B2B training platform that needs to serve multiple tiers and win enterprise contracts, this is exactly the kind of build we do.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Enterprise-Grade Outcomes',
    results: [
      { n: '$250k', count: 250, prefix: '$', suffix: 'k', l: 'Contract Win', sub: 'From an $8 billion customer' },
      { n: '100+', count: 100, prefix: '', suffix: '+', l: 'Insurance Firms', sub: 'Served nationwide' },
      { n: '24/7', count: 24, prefix: '', suffix: '/7', l: 'Access to Professional Learning', sub: 'Anytime. Anywhere. On demand.' },
    ],
    calloutPre: 'Helping GenuineShift win a',
    callout: '$250k contract',
    calloutSub: 'Built for B2B brands that need enterprise-grade training infrastructure.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your B2B Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build B2B training platforms that win enterprise contracts.',
    ctaSub2: 'Better access control, sharper content delivery, and systems that scale.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'healthtech-platform-qina': {
    metaTitle: 'Healthtech Platform | Qina Case Study',
    metaDesc: 'We built the nutrition technology hub for Qina &#8212; merging WordPress into a single B2B platform serving the top 10 global nutrition companies. 500+ business listings. See the case study.',
    badge: 'Platform Engineering &#8212; Healthtech &amp; Nutrition Data',
    title: 'Nutrition Technology Platform',
    sub: 'A bespoke healthtech platform built for Qina &#8212; merging WordPress into a single, intelligent nutrition technology hub.',
    metric: '500+ Business Listings',
    metricNote: '(Top 10 global nutrition companies. 24/7 access to a unified nutrition technology hub.)',
    heroShot: 'https://videodelivery.net/22a31385bdfb7c86cefcba399eaf773d/thumbnails/thumbnail.jpg?time=1s&height=720',
    heroShotAlt: 'Qina &#8212; nutrition technology platform dashboard view',
    heroVid: '22a31385bdfb7c86cefcba399eaf773d',
    siteAddr: 'qina.tech',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164654051/settings_images/ba48dc8-75a-88f0-d8d-84cfb3ba342_2e51ad-0bd4-6e-0076-3b0be3ee4ba3_image_372.png',
    shotAlt: 'Qina healthtech platform &#8212; public website screenshot',
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Standard platforms work for membership sites. Not for B2B scientific data platforms.',
    challenge: [
      'No intelligent search for filtering nutrition technologies',
      'Unable to display dynamic data visualisations',
      'Standard structure inadequate for multiple audience types',
      'Missing tools to present cutting-edge research effectively',
      'No architecture supporting four distinct membership tiers',
      'Lack of B2B digital presence to support growth with major clients',
    ],
    solutionNote: 'We repositioned Qina&#8217;s brand and built a nutrition technology hub.',
    solution: [
      'Advanced search engine filtering brands by multiple criteria',
      'Custom membership portal with dynamic data graphs',
      'Evergreen membership funnels from free to premium',
      'SEO- and AI-ready website boosting digital presence and organic growth',
      'Segmented acquisition funnel and rebranding for targeted positioning',
      'Responsive design for every screen and browser',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built for Growth',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Membership Portal',  vid: 'e722ca3d2cb927ad9b2a2c61bf80b881', desc: 'The member portal was designed to elevate the standard membership experience into a fully self-contained learning hub.', bullets: ['All content loaded within the dashboard to eliminate extra tabs', 'Enhanced library with a unified, streamlined experience', 'Custom elements introduced to create a fresh, engaging interface', 'Designed to serve multiple audience segments with clarity and impact'] },
      { h: 'Advanced Library',   vid: 'b9614372f646bb8b89b991f66603fc69', desc: 'We restructured 500+ resources into a dynamic, searchable hub with smart filtering and personalised access by membership level.', bullets: ['11+ filter groups with over 100 filters across topics and formats', 'Advanced search for instant resource discovery', 'Quick-access favourites for bookmarking key resources', 'Smart permission rules auto-tailored by plan level'] },
      { h: 'Blog Strategy',      vid: '9bad1f571a047c029b4394c6b87af7c8', desc: 'We mapped out and built a waterfall content strategy &#8212; splitting blog content by topics into dedicated public pages optimised for SEO and AI search.', bullets: ['Topic-based hub pages with supporting blog posts driving authority', 'Each post structured for high ranking with clear hierarchy and formatting', 'Fully aligned with brand voice and positioning', 'SEO &amp; AI search ready for maximum organic discoverability'] },
      { h: 'Services Pages',     vid: 'bd1bd611a3a556172d774c50f1e105c4', desc: 'We developed Qina&#8217;s B2B services pages following a SaaS-style approach &#8212; public, comprehensive, and conversion-ready.', bullets: ['Full suite of service pages guiding all users through Qina&#8217;s solutions', 'Comprehensive copy &amp; UI design that educates and converts', 'Fully aligned with brand identity and market positioning', 'SEO &amp; AI search ready for maximum discoverability'] },
      { h: 'Onboarding',         vid: '9a7445ea7d1ec2f5d0d030e7343b41d7', desc: 'The onboarding experience was designed to guide users through a seamless, conversion-focused signup journey.', bullets: ['Proven acquisition funnel with clear, step-by-step flow', 'Legal and compliance requirements built in from the start', 'Engaging design and persuasive copy at every stage', 'Optimised experience that delivers clear value from signup'] },
      { h: 'Responsive',         vid: 'd5311cc0fa8127e2547400cbfb29e1fa', desc: 'The platform was designed to deliver a fluid, high-performance experience across all screen sizes and browsers.', bullets: ['Responsive system overcoming standard platform limitations', 'Optimised layouts for mobile, tablet, desktop, and large screens', 'Fast-loading, properly sized assets to support SEO', 'Engaging, consistent experience across mobile and desktop'] },
    ],
    websiteLabel: 'Healthtech Website',
    websiteTitle: 'Health Tech Platform Design',
    websiteBody: [
      'We didn&#8217;t just design a homepage. We built the foundation of a brand experience.',
      'The homepage is the entry point to Qina &#8212; where trust is formed and clarity matters most. Every section was designed to communicate the brand&#8217;s purpose, identify user pain points, and immediately present a clear, reassuring solution.',
      'Using a proven framework, we combined visually striking sections with a carefully structured narrative. Clear hierarchy, focused messaging, and a strong call to action guide users naturally through the page.',
      'But design alone doesn&#8217;t convert. Great pages start with great stories. We work closely with our clients to understand real frustrations &#8212; and what it feels like when those problems are solved.',
      'When story, strategy, and structure come together, the result isn&#8217;t just a homepage. It&#8217;s a sales experience that wins.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO &amp; AI-search boost strategies',
      'Acquisition and onboarding funnels',
      'Conversion-led funnel architecture',
      'Hook creation and persuasive copy',
      'Intuitive, user-focused sales design',
      'Pricing and offer strategy',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: 'Top 10', count: 10, prefix: 'Top ', suffix: '', l: 'Global Nutrition Companies', sub: 'Using Qina&#8217;s database' },
      { n: '500+',   count: 500, prefix: '', suffix: '+', l: 'Business Listings', sub: 'In a unified database' },
      { n: '24/7',   count: 24, prefix: '', suffix: '/7', l: 'Platform Access', sub: 'Nutrition technology hub, on demand' },
    ],
    calloutPre: 'Helping Qina to build a',
    callout: 'Nutrition Technology Hub',
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build healthtech and membership platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'fitness-platform-physiotherapy': {
    metaTitle: 'At-Home Fitness Platform for Adults 55+ | BeMobile Case Study',
    metaDesc: 'We built the at-home, physio-led fitness platform for adults 55+ that took Be Mobile Physiotherapy from $100k to $7.6M. See the full case study.',
    badge: 'Platform Engineering — Active Ageing & Physio',
    title: 'Exercise Platform for the Over 55s',
    sub: 'Physio-led home exercise for adults 55+ &#8212; a bespoke membership platform built for Be Mobile Physiotherapy.',
    metric: '$100k to $8M+ Growth',
    metricNote: '(Yes, those numbers are real. And no, we didn&#8217;t just get lucky.)',
    heroShot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/bem-portal-hero/public',
    heroShotAlt: 'BeMobile Physiotherapy — member portal onboarding view',
    siteAddr: 'bemobilephysiotherapy.com.au',
    heroVid: '8725a1d679738ed08c79a7d5d78f0a10',
    shot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/bem-website-screenshot/public',
    shotAlt: 'BeMobile Physiotherapy lead generation website — full page screenshot',
    featTestimonial: {
      date: 'Nov 17, 2025',
      bold: 'Outstanding Technical Knowledge and Delivery.',
      quote: 'Motivation.digital helped us achieve a &#8220;Freemium&#8221; acquisition model that required significant customisation. They built a custom dashboard with dynamic views and sidebars, allowing us to display different content to different users seamlessly. <strong>Their technical depth is second to none.</strong> Communication was excellent and deadlines were met. A fantastic partner for complex builds.',
      name: 'Mitch de Mestre, CEO &#126; Be Mobile Physiotherapy',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/bem-testi-mitch/public',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Standard platforms work for a few courses — scaling takes more.',
    challenge: [
      'Generic platform setup with limited funnel architecture',
      'Paid ad dependency, lack of organic growth',
      'Course library mindset, not a guided customer journey',
      'Manual onboarding eats up team resources',
      'Revenue stuck at $100k, no scalable digital strategy',
    ],
    solutionNote: 'We built a high-performing fitness platform',
    solution: [
      'Guided fitness platform with intuitive onboarding',
      'High-quality lead acquisition journey',
      'Retention-first customer journey design',
      'Content delivered where the customer learning is',
      'Structure that enabled business growth past $7M',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built for Growth',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Dashboard',            vid: '7abfc76d545c683c8e3ab7cdda56ba32', desc: 'We stripped the standard template and rebuilt a custom fitness membership portal that actually respects how people learn.', bullets: ['Intuitive navigation for 55+ members', 'Seamless onboarding experience', 'Clear progress tracking', 'Personalised status updates and recommendations'] },
      { h: 'Multi-Currency Pricing',vid: 'eab78414d1875a8edb5a28328817a95f', desc: 'We eliminated currency confusion at checkout with a pricing system that speaks your members&#8217; language, no matter where they are.', bullets: ['Support for AUD, NZD, USD, and GBP', 'Clear pricing in members&#8217; local currency', 'Seamless checkout experience worldwide', 'Higher conversion rates and member retention'] },
      { h: 'Gamification',          vid: '49637063993534c21d4d090d25220f84', desc: 'We built a visual progress system that turns fitness goals into clear, achievable milestones. Members always know where they stand and what&#8217;s next.', bullets: ['Real-time status updates and progress visibility', 'Dedicated Steps page with milestone cards', 'Clear visual indicators for completed and upcoming goals', 'Engaging member journey that drives retention'] },
      { h: 'Course',                vid: '403a732554d67a467e238108f9bfd7a4', desc: 'We redesigned the training environment with custom themes that make learning intuitive and visually seamless across the entire platform.', bullets: ['Streamlined sidebar and clear navigation tabs', 'Favourites system for quick access to key sessions', 'Large, accessible video modules and organised content', 'Brand-aligned design that removes friction from learning'] },
      { h: 'Onboarding',            vid: 'df564c083a303aaa7a5d4bbbcbc59860', desc: 'We built an onboarding experience that respects how people actually learn, with multiple pathways instead of a one-size-fits-all welcome video.', bullets: ['1,000+ sign-ups within 10 hours of launch', 'Multiple action buttons for personalised learning paths', 'Step-by-step video guidance tailored to individual needs', 'Progressive disclosure that provides clarity, not overwhelm'] },
      { h: 'Responsive',            vid: '03685ed3d92be11055b5cc66b9708cda', desc: 'We built a platform that works flawlessly across every device, because your members don&#8217;t all browse the same way.', bullets: ['Responsive design from mobile to widescreen', 'Optimised assets for fast load times and SEO', 'Consistent functionality across all devices and browsers', 'Sharp visuals and smooth performance at every breakpoint'] },
    ],
    websiteLabel: 'Fitness Website',
    websiteTitle: 'Fitness Platform Design',
    websiteBody: [
      'We didn&#8217;t just refresh the marketing site. We rebuilt it with intention.',
      'Every page, blog, contact, program, and about reflects how a physiotherapist thinks, not just what a template designer imagines.',
      'The content structure follows the logic of the practice, not the limitations of the platform. Everything is built for clarity, retention, and ease of use.',
      'If you&#8217;re building a fitness membership platform, especially one with multiple audiences, offers and onboarding journeys, this is where we shine.',
      'That&#8217;s how we&#8217;ve helped Be Mobile Physiotherapy generate over $7.6m in revenue, bringing exercise to the world and delivering fun fitness with a purpose.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '$8m+', count: 8, prefix: '$', suffix: 'm+', l: 'Revenue Growth', sub: '$100k to $8m+ in revenue' },
      { n: '200k+', count: 200, prefix: '', suffix: 'k+', l: 'Platform Members', sub: 'Exercise at-home with our physios' },
      { n: '1000+', count: 1000, prefix: '', suffix: '+', l: 'Launch Signups', sub: 'Members in the first 24 hours' },
      { n: '70&#215;', count: 70, prefix: '', suffix: '×', l: 'Growth Multiple', sub: 'Exponential Growth Achieved' },
    ],
    calloutPre: 'Helping BeMobilePhysiotherapy generate over',
    callout: '$7.6m+',
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build fitness and health platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'recruitment-coaching-platform': {
    metaTitle: 'Recruitment Coaching Platform | Time Rich Recruiter Case Study',
    metaDesc: 'We built the high-ticket recruitment coaching platform for Time Rich Recruiter &#8212; 7% organic conversion rate, 81% group coaching engagement, scaling a $10M business.',
    badge: 'Platform Engineering &#8212; Recruitment &amp; Coaching',
    title: 'Recruitment Coaching Platform',
    sub: 'Scaling a $10M recruitment brand into a high-ticket online coaching community.',
    metric: '81% Engagement Rate',
    metricNote: '(Group coaching live sessions. Not a vanity metric &#8212; a platform that people actually show up for.)',
    heroShot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164633298/settings_images/310d2d7-b27b-dd01-f83b-0fb6b544812e_MD_Case_Studies_1_.png',
    heroShotAlt: 'Time Rich Recruiter &#8212; member portal dashboard view',
    siteAddr: 'timerichrecruiter.com',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164633298/settings_images/6a01ff5-3525-1874-6858-bf6fc8fe0c8_5aeb6d4-c3d-6e42-c106-bfd5525ec2dd_image_360.png',
    shotAlt: 'TimeRichRecruiter.com &#8212; full-page website screenshot',
    featTestimonial: {
      date: 'Nov 17, 2025',
      bold: 'One of the best decisions I&#8217;ve made for my brand.',
      quote: 'Working with Motivation has been one of the best decisions I&#8217;ve made for my brand. I came in wanting a partner who could execute on my vision &#8212; they expanded it. They showed me possibilities I couldn&#8217;t yet see and helped me shape a clearer, stronger version of what I was building. The team is sharp, thoughtful, organized, and nothing slips through the cracks. They exceeded every expectation.',
      name: 'Ashley Woods, Founder &#126; Time-Rich Recruiter',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Turning a $10M recruitment business into a scalable online platform wasn&#8217;t plug-and-play.',
    challenge: [
      'Structuring multiple offers and client journeys',
      'Building funnels that turn visitors into real leads',
      'Automating onboarding and upsells without manual grind',
      'Navigating payments, email, and platform integrations',
      'Tracking what works and what doesn&#8217;t',
    ],
    solutionNote: 'We built a scalable, automated recruitment coaching platform.',
    solution: [
      'Designed a high-converting lead gen page to attract the right people',
      'Structured offers and pathways for every client type',
      'Automated onboarding, upsells, and follow-up for a hands-off experience',
      'Handled all platform setup, from payments to email to custom domains',
      'Set up analytics to track what&#8217;s working and optimise for growth',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built to Perform',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Members Portal', vid: '500af05434113ef165e8a5f2bb181040', desc: 'The Dashboard was designed as a central command centre where members can manage learning, connections, and growth in one place.', bullets: ['Fully customised, rule-based member portal', 'Clean, intuitive layout with personalised content', 'Interactive cards and quick-access navigation', 'Built-in live calls studio for coaching and strategy sessions'] },
      { h: 'Live Sessions',  vid: 'c03fa2d9be552871e72ed1d4f4d5d786', desc: 'The live session funnel was designed to make high-value strategy and coaching calls easy to book, personalised, and seamlessly integrated into the platform.', bullets: ['Strategy call funnel embedded directly into the pricing journey', 'Pre-call survey to personalise every conversation', 'Calendly booking integrated inside the member portal', 'Automated access to live sessions via platform automation'] },
      { h: 'Community',      vid: 'b733e456983714297273486bf5bfa0fb', desc: 'The Community experience was designed to support long-term retention while keeping access flexible and member-friendly.', bullets: ['Rule-based retention funnel with platform paywalls', 'Lifetime course access with renewable community membership', 'Targeted rejoin offers triggered after cancellation', 'Flexible structure designed for long-term growth'] },
      { h: 'Course',         vid: '4bc260fa988fa39539ae80e78194d2d7', desc: 'The Course experience was designed to deliver a cohesive, scalable learning journey across both free and paid programs.', bullets: ['Intuitive and user-friendly design for free and paid programs', 'Unified visual system with layouts tailored to each user journey', 'Integrated sidebar, tabs, bookmarks, and downloadable resources', 'Fully customisable elements to support long-term growth and engagement'] },
      { h: 'Onboarding',     vid: '5ed1cbe80835666728b482a2aaa9d685', desc: 'The Onboarding flow was designed for speed, simplicity, and scalable lead qualification.', bullets: ['Frictionless two-step signup with a short qualifying survey', 'Instant access to the freebies: toolkit and community', 'Built-in consent and compliance from the first interaction', 'Seamless upsell prompts and clear CTAs throughout the journey'] },
      { h: 'Responsive',     vid: '48f215d393128e28392359d0ab855369', desc: 'The Responsive experience ensures the platform performs flawlessly across all devices and screen sizes.', bullets: ['Responsive design across pages, products, and dashboards', 'Optimised layouts for desktop, tablet, and mobile use', 'Fast, intuitive experience for users on the go', 'Consistent, professional visuals across every device'] },
    ],
    websiteLabel: 'Recruitment Coaching Website',
    websiteTitle: 'Website Design for Coaching Platforms',
    websiteBody: [
      'We didn&#8217;t just launch a coaching platform. We built a system designed to convert.',
      'Every page of the website is structured around how coaches attract, qualify, and convert clients &#8212; not how generic templates are laid out. From first interaction to enrolment, the experience is intentional, clear, and focused on action.',
      'The lead generation and onboarding funnel are designed to guide visitors through a simple, value-led journey. Clear messaging, strong visual hierarchy, and focused calls to action ensure users always know what to do next.',
      'The content structure follows the logic of the coaching business. Offers, pricing, and onboarding flows are built to support growth, retention, and ease of use &#8212; without overwhelming the user.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '$10M', count: 10, prefix: '$', suffix: 'M', l: 'Annual Revenue', sub: 'In the recruitment business' },
      { n: '7%',   count: 7,  prefix: '',  suffix: '%', l: 'Organic Conversion', sub: 'Within months of launch' },
      { n: '81%',  count: 81, prefix: '',  suffix: '%', l: 'Engagement Rate', sub: 'On group coaching live sessions' },
    ],
    calloutPre: 'Building the Time Rich Recruiter platform to',
    callout: '$10M',
    calloutSub: 'Built for coaches who need a better member experience and stronger conversion.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build coaching and membership platforms that scale.',
    ctaSub2: 'More conversions, better engagement, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'music-collaboration-platform': {
    metaTitle: 'Music Collaboration Platform | Mixmasters Case Study',
    metaDesc: 'The music collaboration platform we built for Mixmasters &#8212; share files, review mixes and refine projects in real time. Six-figure sales funnels. See the case study.',
    badge: 'Platform Engineering — Music & Creator Communities',
    title: 'Music Collaboration Platform',
    sub: 'A bespoke, community-focused platform built for DJs, producers, and electronic music communities.',
    metric: 'Six Figures in Revenue',
    metricNote: '(Yes, we brought the world of electronic music together &#8212; online and off.)',
    heroShot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164808801/settings_images/cc3c848-35bf-50f1-fb16-4418e311a086_Group_427321080.png',
    heroShotAlt: 'Mixmasters — music collaboration platform member dashboard',
    siteAddr: 'mixmasters.net',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164808801/settings_images/a877a4-3d48-2a78-fb6a-b47b284cee1_Group_163_1_.png',
    shotAlt: 'Mixmasters sales page — full page screenshot',
    transformLabel: 'The Build',
    transformTitle: 'Scattered Tools to One Collaborative Home',
    challengeNote: 'A community-focused platform needs more than a course library.',
    challenge: [
      'Tracks, files, and feedback scattered across email, chat, and cloud drives',
      'A rigid standard library couldn&#8217;t host a collaborative, experience-first workflow',
      'No structured way to share mixes and exchange feedback in one place',
      'Generic template limited brand expression and conversion on the sales page',
      'Performance and mobile UX held back organic growth',
    ],
    solutionNote: 'We built one collaborative environment for modern creators',
    solution: [
      'Custom LaunchPAD dashboard replacing the standard library with a personalised hub',
      'Structured workflow to share files, review mixes, and refine projects in real time',
      'Story-driven sales page built to communicate the brand and convert',
      'Central hub for programs, resources, and member actions',
      'Fully responsive, SEO-optimised build with fast-loading assets',
    ],
    pull: 'We didn&#8217;t just design a music tool. We built a collaborative environment for modern creators.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'Not Your Average Setup',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Member Portal', img: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164808801/settings_images/d1e10c3-5ac-38ee-1f44-375c782028_Group_164_1_.png', desc: 'The Mixmasters dashboard was built to replace a rigid library with a personalised, experience-first hub.', bullets: ['Custom LaunchPAD dashboard with a flexible, scalable layout', 'Personalised, modern experience with intuitive navigation', 'Central hub for programs, resources, and member actions'] },
      { h: 'Sales Page', vid: '6906b5f5bdcfc978a0ec104094811d5e', desc: 'A strong entry point that clearly communicates the Mixmasters brand and value proposition.', bullets: ['Story-driven page highlighting audience pain points and solutions', 'Clear CTAs that guide users toward signup', 'Visually engaging, high-performing LaunchPAD sections', 'Optimised for speed, readability, and consistency across devices'] },
      { h: 'Responsive', vid: '4826a1c779b35bf5b0434c1c84af7c92', desc: 'Engineered for speed, clarity, and performance across every device.', bullets: ['Fully responsive design across all devices', 'Rebuilt LaunchPAD layouts that enhance UX', 'Fast-loading assets and mobile-first improvements', 'Scalable structure for organic growth and SEO'] },
    ],
    websiteLabel: 'Music Platform',
    websiteTitle: 'Music Platform Design',
    websiteBody: [
      'We didn&#8217;t just design a music tool. We built a collaborative environment for modern creators.',
      'Mixmasters is a collaborative platform built for musicians, producers, and engineers to share files, review mixes, and refine projects in real time without friction.',
      'It replaces scattered tools with a structured, intuitive workflow that keeps projects clear, feedback organised, and creative momentum moving forward.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build membership and community platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'music-platform-guitar': {
    metaTitle: 'Guitar Learning Platform | Je Joue De La Guitare Case Study',
    metaDesc: 'We built the interactive guitar learning platform for Je Joue De La Guitare &#8212; six-figure revenue in 24 hours, 50k+ guitarists onboarded. See the full case study.',
    badge: 'Platform Engineering — Music & Guitar',
    title: 'Guitar Learning Platform',
    sub: 'Interactive guitar-learning platform designed for musicians and enthusiasts &#8212; built for Je Joue De La Guitare.',
    metric: 'Six-Figure Revenue in 24 Hours',
    metricNote: '(Real results. Real musicians. And no, you don&#8217;t need to be a rockstar to win big.)',
    heroShot: 'https://videodelivery.net/144066a6a9c1dd4de77972a929ebae0c/thumbnails/thumbnail.jpg?time=2s&height=600',
    heroShotAlt: 'Je Joue De La Guitare &#8212; guitar learning platform dashboard',
    siteAddr: 'jejouedelaguitare.com',
    heroVid: '144066a6a9c1dd4de77972a929ebae0c',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/74680/images/fd40207-6fc6-1ac-ccbf-8a1201b3b7ac_Screenshot_2026-02-09_at_14.01.26.png',
    shotAlt: 'Je Joue De La Guitare &#8212; guitar learning website full page screenshot',
    featTestimonial: {
      date: 'Dec 9, 2025',
      bold: 'They took care of everything.',
      quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.',
      name: 'Mathieu Tremblay, Founder &#126; JeJoueDeLaGuitare',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Years of guitar content existed, but students struggled to find their path.',
    challenge: [
      'Standard library made content feel overwhelming, not organised',
      'No live streaming for real-time teaching moments',
      'Disconnected experience between teacher and students',
      'Missing intelligent content organisation by skill level',
      'No integrated shop for discovering additional resources',
    ],
    solutionNote: 'We built an immersive guitar learning platform using Launchpad',
    solution: [
      'Custom Dashboard organising content by skill level without friction',
      'Studio integration for live lessons and community study rooms',
      'Dashboard Shop for natural course discovery without pushy upselling',
      'Acquisition Funnel with instant free course access',
      'Unified styling and compliance for a consistent brand experience',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built for Guitar Learners',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Members Portal', vid: 'dcc69da920f61e2ce67513ab69c411fc', desc: 'The Advanced Library was built as a powerful, organised learning hub designed to keep guitarists engaged, progressing, and coming back for more.', bullets: ['Centralised access to hundreds of structured guitar lessons', 'Advanced organisation by style, level, and technique', 'Clear pathways from free content to premium programs', 'Built-in upsell opportunities for specialised mini-courses'] },
      { h: 'Shop',           vid: 'f282f39fcbf6d660277239ea9fe07741', desc: 'The Shop was built as a curated, self-serve space where members can explore and purchase products at their own pace.', bullets: ['Upgraded store with flexible layouts and custom styling', 'Curated product selection designed for easy discovery', 'Self-guided purchasing without manual upselling', 'Seamless access to the shop directly from the dashboard'] },
      { h: 'Blog',           vid: 'e4a8f7f4988ba8812062df9c69583211', desc: 'The Blog was designed as a content-driven hub that builds authority, supports SEO, and nurtures the guitar learning community.', bullets: ['Clean, brand-aligned layout that highlights Mathieu&#8217;s expertise', 'SEO-optimised posts to drive organic discovery', 'Valuable insights, tips, and inspiration for members', 'Content designed to strengthen trust and long-term engagement'] },
      { h: 'Course',         vid: '035fadd62a6742a077a597bfa43d4be1', desc: 'The Course experience was designed to deliver an immersive, high-energy learning journey that keeps guitarists engaged and progressing.', bullets: ['Meteor custom theme with bold, consistent brand styling', 'Effortless navigation through modules, lessons, and resources', 'Start/resume lessons and My Favourites for continuity', 'Features designed to inspire engagement and long-term momentum'] },
      { h: 'Onboarding',     vid: 'fcac7339f2c17fa13d3ea4adc8807161', desc: 'The Onboarding experience was designed to capture attention quickly and turn visitors into active members.', bullets: ['4Ps-driven homepage with bold visuals and clear calls to action', 'Fast, frictionless signup with instant access to a free course', 'Edgy, brand-aligned lead generation funnel', 'Onboarding built to inspire connection and long-term engagement'] },
      { h: 'Responsive',     vid: 'e8a47765a5bee4f6164d4137d83886a3', desc: 'The Responsive experience was designed to support guitarists wherever and however they practice.', bullets: ['Responsive design across all pages and lessons', 'Optimised layouts for mobile, tablet, and desktop', 'Fast, intuitive performance on every device', 'Consistent visuals that support learning anywhere, anytime'] },
    ],
    websiteLabel: 'Music Learning Platform',
    websiteTitle: 'Guitar Platform Design',
    websiteBody: [
      'We didn&#8217;t just design a homepage. We built the front door to a global music platform.',
      'For Je Joue De La Guitare, every section was crafted to welcome visitors, communicate value instantly, and invite them deeper into the learning experience.',
      'The layout, messaging, and flow are designed to engage guitarists from the very first scroll. Strong visuals, clear structure, and focused calls to action guide users naturally toward taking the next step.',
      'The content follows the logic of the guitarist&#8217;s journey, not the constraints of the platform. When strategy, story, and structure align, the result isn&#8217;t just a homepage &#8212; it&#8217;s a sales experience that wins.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Acquisition funnels',
      'Conversion-led funnel architecture',
      'Hook creation and persuasive copy',
      'Intuitive, user-focused sales design',
      'Pricing and offer strategy',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '50k+', count: 50, prefix: '', suffix: 'k+', l: 'Guitarists Onboarded', sub: 'From followers to active members' },
      { n: '100+', count: 100, prefix: '', suffix: '+', l: 'On-Demand Lessons', sub: 'Across styles and levels' },
    ],
    calloutPre: 'Helping JeJoueDeLaGuitare generate over',
    callout: '6 figures',
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build music and education platforms that scale.',
    ctaSub2: 'More students, better engagement, and systems that free your time.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'healthcare-platform-dietitians': {
    metaTitle: 'Healthcare Education Membership Platform | Dietitian Success Center',
    metaDesc: 'We migrated Dietitian Success Center from WordPress to a unified membership platform &#8212; 500+ resources, a freemium funnel, and $100k+ recurring revenue. See the case study.',
    badge: 'Platform Engineering — Healthcare & Membership Education',
    title: 'Dietitian Membership Platform',
    sub: 'Migrated from WordPress and rebuilt for healthcare education &#8212; a scalable membership platform for Dietitian Success Center.',
    metric: '$100k+ Recurring Revenue',
    metricNote: '(SEO, contacts, content. All migrated. All working.)',
    heroShot: 'https://videodelivery.net/e633d51e6b00edda0669463c95cd37b1/thumbnails/thumbnail.jpg?time=2s&height=600',
    heroShotAlt: 'Dietitian Success Center — membership platform dashboard',
    siteAddr: 'dietitiansuccesscenter.com',
    heroVid: 'e633d51e6b00edda0669463c95cd37b1',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164672628/settings_images/6806b87-3e7-55e-45e0-4d6df475c0ba_2f3cb3-6aee-411e-eb5-5cb083df6374_841314-21bb-60f-0b08-cfd67d3d508_image_346.png',
    shotAlt: 'Dietitian Success Center — lead generation website',
    featTestimonial: {
      date: 'June 05, 2025',
      bold: 'It&#8217;s a million times better!!!',
      quote: 'The new site looks amazing. Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.',
      name: 'Krista Kolodziejzyk, CEO &#126; Dietitian Success Center',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'WordPress handled hundreds of resources, until it didn&#8217;t.',
    challenge: [
      'WordPress plugins clash, and layouts break',
      'Poor search, leaving members unable to find content',
      'Scattered across multiple tools (WooCommerce, ActiveCampaign)',
      'Team spends more time fixing than delivering value',
      'No clear membership architecture for thousands of users',
    ],
    solutionNote: 'We built a unified platform, ready to scale',
    solution: [
      'Clear onboarding and defined free-to-paid pathways',
      'Smart access rules tied to membership tiers',
      'Proper navigation replacing the broken WordPress structure',
      'Consolidated backend reducing manual workflow',
      'SaaS-level platform stability supporting steady growth',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'Not Your Average Setup',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Dashboard', vid: '1a18d0d21a1f09b19d47bafa2e1b4f80', desc: 'We migrated from WordPress and rebuilt the entire content structure into a scalable membership hub designed for engagement, growth, and revenue.', bullets: ['Intuitive navigation with interactive cards and quick-access links', 'Built-in upsell and personalised journey support', 'Fully responsive across desktop and mobile', 'Funnel-ready architecture for onboarding, offers, and advanced content'] },
      { h: 'Pricing Plans', vid: 'e84f25a38418254c14ea5d2e8cb4ac10', desc: 'We audited and repackaged the pricing strategy, then migrated from WooCommerce to a streamlined checkout system.', bullets: ['2% conversion rate within the first months of launch', 'Restructured offers based on conversion-audit insights', 'Three-tier layout with clear comparison and annual savings incentives', 'Advanced automations running funnels hands-free'] },
      { h: 'Advanced Library', vid: 'c350a6daa8db55b5e605beddcfb2ffba', desc: 'We migrated 500+ resources from WordPress with dynamic search, smart filtering, and personalised access based on membership level.', bullets: ['10+ filter groups across topics, formats, and membership tiers', 'Advanced search for instant resource discovery', 'Quick-access favourites and smart permission rules by plan', 'Seamless course integration with automated access management'] },
      { h: 'Course', vid: '6fa159bcc90a510e36653ce8170e86f6', desc: 'We built a purpose-designed course experience that unifies branding, content, and navigation into one seamless learning environment.', bullets: ['Versatile sidebar with tabbed navigation and favourites system', 'Clean layout supporting video, downloads, and interactive elements', 'Smart progress tracking across all course materials', 'Fully responsive design for consistent learning on any device'] },
      { h: 'Onboarding', vid: 'fc3d948338671e6cebb35ae3b6118f27', desc: 'We built a story-driven lead-gen page using the 4Ps framework and paired it with a frictionless two-step funnel to convert visitors into members.', bullets: ['3% organic lead-to-customer conversion and 5.5% subscription growth post-launch', 'High-converting homepage with compelling copy and clear calls to action', 'Freemium acquisition model as the entry point to capture and nurture leads', 'Two-step funnel with auto-populated fields for seamless onboarding'] },
      { h: 'Responsive', vid: 'b851c878f3d74fe83c5cdc01965bfca9', desc: 'We built a platform that adapts seamlessly across all devices, delivering fast performance and a consistent user experience.', bullets: ['Optimised for mobile, tablet, and desktop with fast load times', 'Modular design enabling easy updates and future scalability', 'Accessibility and performance optimised across all platforms', 'SEO-enhanced framework supporting ongoing growth and integrations'] },
    ],
    websiteLabel: 'Healthcare Website',
    websiteTitle: 'Healthcare Website Design',
    websiteBody: [
      'We didn&#8217;t just migrate the site. We rebuilt it around a guided acquisition funnel.',
      'The old homepage behaved like a content directory &#8212; long lists of blogs, podcasts, and resources with no clear path forward. Visitors were left to figure it out alone.',
      'Now, visitors get clarity in seconds. The lead-gen page follows the 4Ps copywriting framework &#8212; Promise, Picture, Proof, Push &#8212; turning browsers into believers, and believers into members.',
      'If you&#8217;re building a membership platform for professionals, especially one with freemium entry points and multi-tier offers, this is where we shine.',
      'That&#8217;s how we&#8217;ve helped Dietitian Success Center achieve 3% organic lead-to-customer conversion and 5.5% subscription growth within months of launch.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Freemium acquisition strategy',
      'Conversion-led funnel architecture',
      'Story-driven user journeys',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '$100k+', count: 100, prefix: '$', suffix: 'k+', l: 'Revenue Growth', sub: 'Sustained, since the pricing overhaul' },
      { n: '3%', count: 3, prefix: '', suffix: '%', l: 'Conversion Rate', sub: 'Organic, within months of launch' },
      { n: '5.5%', l: 'Subscription Growth', sub: 'Post-migration from WordPress' },
    ],
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build membership and education platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
    'speech-education-platform': {
    metaTitle: 'Speech Therapy Education Platform | SpeechTimeFun Case Study',
    metaDesc: 'We built the speech therapy education platform for SpeechTimeFun &#8212; 9,000+ members, 1,000+ SLP materials, and $1.8M+ revenue growth after migrating from ThriveCart to Kajabi.',
    badge: 'Platform Engineering &#8212; Speech Therapy Education',
    title: 'Speech Therapy Education Platform',
    sub: 'A scalable membership platform for speech-language pathologists &#8212; built for SpeechTimeFun to deliver professional development resources at scale.',
    metric: '$0 to $1.8M+ Revenue',
    metricNote: '(Built from the ground up into a seven-figure speech therapy education platform.)',
    heroShot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164668351/settings_images/0034f-0f1-06b3-ff52-763fdf6e6e3f_Group_181.png',
    heroShotAlt: 'SpeechTimeFun &#8212; member portal dashboard view',
    heroVid: '6d4aaee1ae1429b56cc8402d2dd6d052',
    siteAddr: 'speechtimefunpd.com',
    shot: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164668351/settings_images/aa1a24f-e880-55c8-d122-beb4c441c6ae_stf0023.png',
    shotAlt: 'SpeechTimeFun &#8212; public-facing professional development platform',
    featTestimonial: {
      date: 'Nov 20, 2025',
      bold: 'They transformed my website into a scalable platform',
      quote: 'that makes it easier to serve and support speech therapists.',
      name: 'Hallie Sherman, SpeechTimeFun',
      img: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2164668351/settings_images/5d2f472-1bb-e0f-f47c-cb7d704f44_Group_133_1_.png',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Growing a speech therapy community from passion project to professional platform.',
    challenge: [
      'Manual content delivery with no scalable membership infrastructure',
      'ThriveCart checkout limiting revenue potential and offer flexibility',
      'No structured onboarding or guided member journey',
      'Disconnected tools across checkout, content delivery, and community',
      'Revenue plateau with no path to sustainable platform growth',
    ],
    solutionNote: 'We built a full-stack speech therapy education platform.',
    solution: [
      'Migrated from ThriveCart to Kajabi for a unified membership experience',
      'Structured 1,000+ SLP materials into an organised, searchable resource library',
      'Built scalable checkout flows supporting multiple membership tiers',
      'Designed onboarding journeys for different member and plan types',
      'Enabled data-driven platform decisions through integrated analytics',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built to Scale',
    capsSub: 'No confusion. No friction. Just intentional, education-led design.',
    capabilities: [
      { h: 'Downloads',           vid: 'cf72c728ec76ddb78d5a5f31054df9f1', desc: 'We structured 1,000+ SLP materials into a searchable, organised download library &#8212; turning a growing content bank into a genuine platform asset.', bullets: ['1,000+ SLP materials categorised and searchable', 'Instant download delivery on purchase or plan access', 'Organised by topic, type, and skill level', 'Scalable structure for continuous content addition'] },
      { h: 'Datatools',           vid: 'd25ca71d70650b1ba9c411ecc2445a95', desc: 'We integrated data tools that give both members and administrators clear visibility into engagement, progress, and platform performance.', bullets: ['Member engagement tracking and admin reporting', 'Visibility across content usage and plan activity', 'Data-informed decisions on content and pricing strategy', 'Foundation for future AI-driven personalisation'] },
      { h: 'VideoAsk',            vid: 'ff1f47522abdc90cd11d1292a9fadce2', desc: 'We integrated VideoAsk to create interactive, human-led onboarding and feedback loops &#8212; replacing static forms with real conversations at scale.', bullets: ['Video-first onboarding for new members', 'Interactive feedback collection from the SLP community', 'Personalised responses that scale without manual effort', 'Higher engagement than static forms or email sequences'] },
      { h: 'Checkout Migration',  vid: 'a3351ee0be559eec02687d86ea99614a', desc: 'We executed the full ThriveCart-to-Kajabi checkout migration &#8212; preserving member access, eliminating platform fragmentation, and unlocking new revenue flexibility.', bullets: ['Full ThriveCart to Kajabi migration with zero member disruption', 'Multiple membership tiers and pricing models configured', 'Stripe integration for reliable, global payment processing', 'Upsell and cross-sell flows built into the checkout experience'] },
      { h: 'Responsive',          vid: '617de7264e3b426fbae30a3c2589117a', desc: 'We built a platform that works flawlessly for speech therapists on every device &#8212; because professional development happens on the move.', bullets: ['Fully responsive design across mobile, tablet, and desktop', 'Optimised media delivery for fast load on any connection', 'Consistent experience across all member device types', 'Accessible design for an educator-first audience'] },
    ],
    websiteLabel: 'Education Website',
    websiteTitle: 'Speech Therapy Platform Design',
    websiteBody: [
      'We didn&#8217;t just migrate content. We rebuilt the entire platform architecture.',
      'Every resource, course, download, and onboarding journey was redesigned to reflect how speech-language pathologists work and learn.',
      'The result is a professional development platform that serves 9,000+ members &#8212; not a content dump, but a structured, searchable, scalable library with a checkout and onboarding experience to match.',
      'If you&#8217;re building a professional education platform for a specialist community, this is where we have the deepest experience.',
      'That&#8217;s how we helped SpeechTimeFun grow from $0 to over $1.8M in revenue, serving the global SLP community with the resources they need.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '$1.8M+', count: 0, prefix: '$', suffix: 'M+', l: 'Revenue Growth',  sub: 'From $0 to $1.8M+ after platform migration' },
      { n: '9,000+', count: 9000, prefix: '', suffix: '+',  l: 'Members Engaged', sub: 'Across all plans and programmes' },
      { n: '1,000+', count: 1000, prefix: '', suffix: '+',  l: 'SLP Materials',   sub: 'Resources created for hands-on use' },
    ],
    calloutSub: 'Built for educators who need a platform that serves professionals at scale.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build education and membership platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'martial-arts-platform': {
    metaTitle: 'Martial Arts Membership Platform | GKR Karate Case Study',
    metaDesc: 'We built the global online dojo for GKR Karate &#8212; 3,000+ active members, 500+ on-demand videos, 87% monthly engagement. See the full case study.',
    badge: 'Platform Engineering &#8212; Martial Arts &amp; Membership',
    title: 'Global Online Dojo for 3,000+ Karate Students',
    sub: 'World-class online karate platform for GKR Karate International &#8212; training martial artists anywhere, anytime.',
    metric: '87% Monthly Member Engagement',
    metricNote: '(Members keep coming back. That&#8217;s the platform, not just the curriculum.)',
    heroShot: 'https://videodelivery.net/db01042d75cd5375d987c9f3ee63458c/thumbnails/thumbnail.jpg?time=1s&height=720',
    heroShotAlt: 'GKR Karate &#8212; member portal in action',
    heroVid: 'db01042d75cd5375d987c9f3ee63458c',
    siteAddr: 'gkrkarate.com',
    shot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/gkr-website-design/public',
    shotAlt: 'GKR Karate public website &#8212; full page screenshot',
    featTestimonial: {
      date: 'Nov 20, 2025',
      bold: 'A trusted partner for martial arts online.',
      quote: 'GKR Karate has worked with Motivation Digital for many years now. We were looking for a trusted partner to help us scope and build an online platform for students to train in martial arts anywhere anytime. Motivation Digital brought the right combination of understanding what we needed, and offering expert advice on how to improve our project &#8212; and we are very happy with what resulted.',
      name: 'Stafford Pascoe, GKR Karate International &#126; Nov 20, 2025',
      img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public',
    },
    transformLabel: 'The Transformation',
    transformTitle: 'Limitation to Limitless Growth',
    challengeNote: 'Standard platforms work for a few courses. GKR Karate needed a digital membership portal.',
    challenge: [
      'Standard library inadequate for vast on-demand content volume',
      'Default search unable to handle hundreds of karate classes',
      'No advanced video filtering by grade, instructor, or technique',
      'Lead generation funnel missing, limiting new member acquisition',
      'No infrastructure for multiple membership tiers at scale',
    ],
    solutionNote: 'We built a sophisticated online dojo ready to scale.',
    solution: [
      'Modern library with categories and scalable content management',
      'Video training search and filtering &#8212; find the right class in one click',
      'Automated lead generation and acquisition funnel converting prospects into members',
      'Multiple membership levels with currency switching and seamless upgrade flows',
      'User-friendly portal designed for all ages and built to grow',
    ],
    pull: 'The difference is not effort. It is automated systems.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-kajabi/public', alt: 'Kajabi' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-launchpad/public', alt: 'Launchpad' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
    ],
    capsTitle: 'A Platform Built for Growth',
    capsSub: 'No confusion. No friction. Just intentional, conversion-led design.',
    capabilities: [
      { h: 'Dashboard',       vid: '247c996f69c95df193d327b2c112981e', desc: 'The Custom Membership Dashboard powers every Launchpad website, and for GKR Karate it was a must-have. Built on a permissions-based system, it delivers the right content to the right members while staying clean, simple, and easy to use.', bullets: ['Personalised content delivered by membership level', 'Support for free trials, online members, and in-club students', 'Clear navigation with simple progress tracking', 'Improved engagement and repeat visits'] },
      { h: 'Pricing',         vid: '07500aac894fc6d21f51c4995940f33c', desc: 'Pricing Plans were designed to handle the complexity of a global martial arts brand while keeping the experience simple and intuitive for users.', bullets: ['Flexible three-tier membership plans with monthly and annual billing', 'Multi-currency pricing to support a global audience', 'Dynamic content and CTAs based on user permissions', 'Seamless integration with free sign-up and backend automations'] },
      { h: 'Advanced Library', vid: 'ba08f3f46ad05dfb38b64b8a798ff627', desc: 'The Advanced Library was built to organise hundreds of karate lessons into a fast, intuitive, and fully branded video hub.', bullets: ['Fully searchable and filterable video library for recorded classes', 'Advanced sidebar filtering by belt, level, technique, duration, and more', 'Custom Marketplace product theme tailored for GKR Karate', 'Easy content management for both members and the GKR team'] },
      { h: 'Course',          vid: '07b0748028b47b5325a3010a75ea387a', desc: 'The Course was designed to guide participants step by step through the challenge and seamlessly lead them toward joining the paid karate club.', bullets: ['Clear, structured daily progression with a focused end goal', 'Custom Launchpad Meteor product theme for flexibility and growth', 'Accordion-style sidebar, stacked header, and custom video layout', 'Consistent design system reused across other karate club products'] },
      { h: 'Onboarding',      vid: '0105853f63d4d862606159d080aaddc1', desc: 'The Onboarding experience was built to consistently generate leads and prove that online karate training is accessible to everyone.', bullets: ['Smooth multi-step free sign-up with minimal user friction', '5-day Self-Defence Challenge as the primary lead magnet', 'Automatic account creation and free member access', '7-day trial of the Advanced Library with no credit card required'] },
      { h: 'Responsive',      vid: 'bf6605b95c29dad3de5ce1af94757ecd', desc: 'The Responsive experience ensures the GKR website performs flawlessly across all devices and screen sizes.', bullets: ['Fully optimised layouts for mobile, tablet, laptop, desktop, and large screens', 'Improved loading speed and performance', 'Properly scaled elements for usability and clarity', 'Enhanced SEO across mobile and desktop experiences'] },
    ],
    websiteLabel: 'Martial Arts Website',
    websiteTitle: 'Platform Design for a Global Martial Arts Brand',
    websiteBody: [
      'We didn&#8217;t just update GKR&#8217;s marketing site. We reimagined it from the ground up.',
      'Every page, class, and membership journey is crafted to reflect the mindset of martial artists, not just a generic template.',
      'The site&#8217;s structure follows the logic of karate instruction and community, not the constraints of the platform. Everything is designed for clarity, engagement, and ease of use.',
      'If you&#8217;re building a martial arts membership platform &#8212; especially one with diverse audiences, programs, and onboarding paths &#8212; this is where we excel.',
      'That&#8217;s how we helped GKR Karate bring world-class instruction online, foster a thriving global community, and deliver martial arts with purpose.',
    ],
    funnelLabel: 'Key funnel elements we excel at:',
    funnel: [
      'SEO-ready lead generation pages',
      'Compelling copy and hook creation',
      'Offer-ladder pricing strategy',
      'Conversion-led funnel architecture',
      'Accessible members experience',
      'Intuitive, high-performance website design',
    ],
    resultsLabel: 'The Results',
    resultsTitle: 'Numbers That Speak Volumes',
    results: [
      { n: '3,000+', count: 3000, prefix: '', suffix: '+', l: 'Active Members', sub: 'Active online members across all programs' },
      { n: '500+',   count: 500,  prefix: '', suffix: '+', l: 'On-Demand Videos', sub: 'Search and filter in one click' },
      { n: '87%',    count: 87,   prefix: '', suffix: '%', l: 'Monthly Engagement', sub: 'Members train anytime, anywhere' },
    ],
    calloutPre: 'Helping GKR Karate build',
    callout: 'a global online dojo',
    calloutSub: 'Built for brands that need a better member experience and stronger sales.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: '', quote: 'They are undoubtedly the &#8220;Go To Guys&#8221; for complex platform builds. They can make platforms do things most builders can&#8217;t even imagine.', html: 'They are undoubtedly the <span class="t-am">&#8220;Go To Guys&#8221;</span> for complex platform builds. They can make platforms <strong>do things most builders can&#8217;t even imagine.</strong>' },
      { name: 'Jenn Welsh', role: 'CEO &#126; GenuineShift', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-jenn/public', date: 'Dec 10, 2025', quote: 'Collaborative, strategic, and reliable. Chris and his team combine long-term thinking with strong execution, and their expertise shows in the results.', html: 'Collaborative, <span class="t-am">strategic, and reliable.</span> Chris and his team combine <strong>long-term thinking with strong execution,</strong> and their expertise shows in the results.' },
      { name: 'Ashley Woods', role: 'Founder &#126; Time-Rich Recruiter', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-ashley/public', date: 'Nov 17, 2025', quote: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation expanded my vision. Sharp, thoughtful, organised &#8212; nothing slips through the cracks. They exceeded every expectation.', html: 'One of the best decisions I&#8217;ve made for my brand. Working with Motivation <span class="t-am">expanded my vision.</span> Sharp, thoughtful, organised &#8212; <strong>nothing slips through the cracks.</strong> They exceeded every expectation.' },
      { name: 'Mathieu Tremblay', role: 'Founder &#126; JeJoueDeLaGuitare', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-mathieu/public', date: 'Dec 9, 2025', quote: 'Working with Motivation has been a great experience. The team was responsive and helpful, and strategy with Chris gave us a lot of ideas to implement. They made my website clean and functional, and adjustments were made very fast. They took care of everything.', html: 'Working with Motivation has been a great experience. The team was <strong>responsive and helpful,</strong> and strategy with Chris gave us a lot of ideas to implement. They made my website <span class="t-am">clean and functional,</span> and adjustments were made very fast. They took care of everything.' },
      { name: 'Krissy Chin', role: 'Founder &#126; Groworkspace', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krissy/public', date: 'Nov 21, 2025', quote: 'Motivation are very talented and the helpdesk are also super helpful.', html: 'Motivation are <span class="t-am">very talented</span> and the helpdesk are also <strong>super helpful.</strong>' },
    ],
    ctaTitle: 'Start Your Platform Project',
    ctaBtn: 'Book a Discovery Call',
    ctaSub1: 'We design and build martial arts and membership platforms that scale.',
    ctaSub2: 'More members, better retention, and systems that free your team.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },

  'compliance-privacy-platform': {
    metaTitle: 'Trust Center Pro &#8212; Website Compliance Infrastructure | Motivation',
    metaDesc: 'We built Trust Center Pro as a multi-tenant compliance SaaS &#8212; automated cookie scanning, consent management, 8 policy templates, and DSAR handling for any brand in 54+ jurisdictions.',
    badge: 'Platform Engineering &#8212; Compliance SaaS',
    title: 'Website Compliance, Automated',
    sub: 'Building compliance infrastructure that handles consent, policies, and data requests automatically &#8212; for any brand, any jurisdiction.',
    metric: '54+ Jurisdictions',
    metricNote: '(Automated scanning and policy propagation across every brand on the platform)',
    heroShot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-portal-hero/public',
    heroShotAlt: 'Trust Center Pro &#8212; compliance hub with live status dashboard and policy sidebar',
    siteAddr: 'trustcenter.pro',
    productHero: true,
    heroVid: 'a5b46660e15b169af96037447f87e83e',
    shot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-website-screenshot/public',
    shotAlt: 'Trust Center Pro &#8212; compliance scanner showing 0&#8211;100 score with category breakdown',
    featTestimonial: {
      date: 'May 2026',
      bold: 'Compliance is infrastructure, not paperwork.',
      quote: 'Most websites are not legally compliant &#8212; not because the owners don&#8217;t care, but because compliance requires infrastructure they don&#8217;t have time to build. Trust Center Pro is that infrastructure: automated scanning, live consent management, policy templates that stay current, and data requests handled within 72 hours.',
      name: 'Christopher Brisley, Founder &#126; Motivation Digital',
    },
    transformLabel: 'The Build',
    transformTitle: 'From Static Policies to Live Compliance Infrastructure',
    challengeNote: 'Compliance is not a document problem. It is an infrastructure problem.',
    challenge: [
      'TikTok &#8364;530m, LinkedIn &#8364;310m, Uber &#8364;290m &#8212; GDPR regulators are actively enforcing',
      'Most websites fail two compliance obligations the moment a visitor arrives',
      'Managing cookie consent, privacy policies, and DSARs manually across multiple brands is unsustainable',
      'Laws evolve across 54+ jurisdictions &#8212; static documents go stale overnight',
      'Data subject access requests carry a legally mandated 30-day response window most sites miss',
    ],
    solutionNote: 'We built Trust Center Pro as a full-stack, multi-tenant compliance platform',
    solution: [
      'Automated weekly scanning across 8 compliance categories, scored 0&#8211;100',
      'Region-aware consent banner &#8212; IAB TCF 2.2 and Google Consent Mode v2',
      '8 policy templates per brand, deployable on any custom domain via CNAME',
      'Automated DSAR routing with 72-hour response SLA and full audit trail',
      'Blueprint model: update one master template, propagate to every tenant instantly',
      'Real-time compliance dashboard showing cookie inventory, open incidents, and last review date',
    ],
    pull: 'The goal was not a legal document host. It was complete compliance infrastructure &#8212; automated, always current, and built to serve any brand at any scale.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ae3c36c3-560b-4b40-feb0-88c1e1888700/public', alt: 'Trust Center Pro' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-gtm/public', alt: 'Google Tag Manager' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-claude/public', alt: 'Claude AI' },
    ],
    capsTitle: 'A Platform Built for Website Compliance',
    capsSub: 'Automated scanning. Live consent. Policy hub. Data requests handled.',
    capabilities: [
      { h: 'Compliance Scanner', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-website-screenshot/public', desc: 'The free compliance scanner audits any website in under 60 seconds across 8 categories: privacy and cookies, security headers, data requests, legal documents, analytics disclosure, and accessibility. A compliance score from 0 to 100 &#8212; with specific issues flagged and prioritised.', bullets: ['8 check categories: privacy, cookies, security, DSAR, legal, analytics, accessibility', '0&#8211;100 compliance score with per-category breakdown', 'Public scan &#8212; 60 seconds, no login, no credit card required', 'Automated weekly rescans for all active brands on the platform'] },
      { h: 'Consent Management', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-trust-portal/public', desc: 'Region-aware consent management deployed as a sidebar on your site. The sidebar serves as both the document navigation hub and the consent interface &#8212; IAB TCF 2.2 certified and Google Consent Mode v2 compliant. Consent signals feed directly into analytics and ad platforms without manual configuration.', bullets: ['IAB TCF 2.2 certified, Google Consent Mode v2 compliant', 'Region-aware &#8212; adapts automatically by visitor jurisdiction', 'Consent logs stored per visitor and per brand in D1', 'Sidebar doubles as navigation and consent interface'] },
      { h: 'Policy Hub', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-compliance-dashboard/public', desc: 'Every brand gets 8 policy documents &#8212; Privacy Policy, Cookie Policy, Sub-Processors, Terms, Services Agreement, Accessibility Statement, Acceptable Use Policy, and Disclaimer &#8212; hosted on their own domain via CNAME. Update the master template once; every tenant updates instantly.', bullets: ['8 policy document types, always current', 'Branded hub on your own domain via CNAME', 'Blueprint model: one master template propagates to all tenants', 'Per-brand clause overrides for jurisdiction-specific requirements'] },
      { h: 'Data Requests', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-vendor-assessment/public', desc: 'Data Subject Access Requests carry a legally mandated 30-day response window &#8212; and regulators check. The DSAR service provides a branded submission form per brand, routes every request to the right contact, and maintains a timestamped audit trail.', bullets: ['Branded DSAR submission form per brand', '72-hour response SLA &#8212; 30-day legal mandate met', 'Full audit trail: every request timestamped and logged', 'Scanner flags DSAR compliance as part of the domain score'] },
      { h: 'Trust Dashboard', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-security-centre/public', desc: 'The compliance dashboard surfaces what changes: cookie count from the latest automated scan, open incidents, last review date, DSAR response time, and compliance score by category. Every brand&#8217;s posture in one view &#8212; colour-coded for at-a-glance triage.', bullets: ['Overall compliance score across six categories', 'Live cookie inventory from automated weekly scans', 'Open incident count and DSAR response status', 'Last review date and next scheduled scan visible at a glance'] },
      { h: 'Multi-Tenant Engine', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/tcp-document-library/public', desc: 'The blueprint model means compliance infrastructure scales without operational overhead. One master template per policy type; brand tokens substituted at render time. Each brand gets its own D1 data partition, its own CNAME hub, and its own compliance score &#8212; with zero data cross-contamination.', bullets: ['Master templates cloned and tokenised per brand at onboarding', 'Brand tokens: name, address, DPO, jurisdiction, colour, logo', 'D1 multi-region database &#8212; data residency in WEUR', 'CNAME per brand &#8212; your domain, your compliance hub'] },
    ],
    websiteLabel: 'Platform Architecture',
    websiteTitle: 'Compliance Infrastructure Built at the Edge',
    websiteBody: [
      'Trust Center Pro runs entirely on Cloudflare&#8217;s edge network. A single Worker serves every request globally, with D1 as the multi-region database holding brand data, policy templates, consent logs, and DSAR records.',
      'The multi-tenant blueprint model means one deployment serves unlimited brands. Policy updates propagate instantly. Consent logs are written at the edge, closest to the visitor. DSARs land in a structured queue. The scanner runs weekly against every active domain.',
      'Built with zero cold starts, zero downtime deploys, and no server management.',
    ],
    funnelLabel: 'Key platform capabilities we built:',
    funnel: [
      'Multi-tenant compliance architecture',
      'Automated weekly domain scanning',
      'IAB TCF 2.2 consent infrastructure',
      'DSAR routing and audit logging',
      'Blueprint policy template engine',
      'Edge-native Cloudflare Workers + D1',
    ],
    resultsLabel: 'The Platform',
    resultsTitle: 'Compliance That Runs Itself',
    results: [
      { n: '8', count: 8, prefix: '', suffix: '', l: 'Policy Document Types', sub: 'Per brand, always current via master templates' },
      { n: '54+', count: 54, prefix: '', suffix: '+', l: 'Jurisdictions Covered', sub: 'Scan-verified compliance reach' },
      { n: '60s', count: 60, prefix: '', suffix: 's', l: 'Compliance Scan', sub: 'Free, no login, results in under a minute' },
      { n: '72hr', count: 72, prefix: '', suffix: 'hr', l: 'DSAR Response SLA', sub: 'Legally mandated 30-day window met' },
    ],
    calloutPre: 'Is your website really legal?',
    callout: 'Find out in 60 seconds',
    calloutSub: 'Built for businesses that need compliance infrastructure that actually works.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: 'Nov 17, 2025', quote: 'Working with Motivation has been outstanding. They delivered exactly what was promised, on time, and with quality that exceeded our expectations.', html: 'Working with Motivation has been outstanding. They delivered exactly what was promised, <span class="t-am">on time,</span> and with <strong>quality that exceeded our expectations.</strong>' },
    ],
    ctaTitle: 'Make Your Website Legally Compliant',
    ctaBtn: 'Scan Your Website',
    ctaSub1: 'We design and build compliance infrastructure for websites, SaaS products, and digital platforms.',
    ctaSub2: 'From cookie consent to DSAR handling &#8212; fully automated and always current.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'health-platform-dreambody': {
    metaTitle: 'DreamBodyClub &#8212; AI Health &amp; Fitness Platform | Motivation',
    metaDesc: 'We built DreamBodyClub &#8212; a free Health Index that scores four areas of wellbeing in five minutes, then builds a personalised program with a 589-workout and 316-recipe library that adapts to her life.',
    badge: 'Platform Engineering &#8212; Health &amp; Fitness',
    title: 'A Health Platform That Starts With Her',
    sub: 'A free Health Index scores four areas of wellbeing in five minutes &#8212; then DreamBodyClub builds a personalised program around the life she actually has.',
    metric: '4 Areas of Health',
    metricNote: '(Movement, Nutrition, Mind and Lifestyle &#8212; scored, then turned into a personal plan)',
    heroShot: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/33f2497e-888b-43aa-e9a5-8fd0bb911d00/public',
    heroShotAlt: 'DreamBodyClub &#8212; Health Index dashboard with four-area score breakdown',
    siteAddr: 'dreambody.club',
    productHero: true,
    dbc: true,
    recogCount: 4,
    recogCountSuffix: '',
    recogCountLabel: 'areas of health, one Index',
    pullGlow: 'The goal was never another diet. It was <span style="color:var(--amber)">a personalised health system</span> that meets every woman where she is &#8212; and moves at her pace.',
    transformLabel: 'The Build',
    transformTitle: 'From &#8220;I&#8217;ll start Monday&#8221; to a plan she actually follows',
    challengeNote: 'Most women know they should look after themselves &#8212; but have no time, no clear starting point, and a feed full of contradictory advice.',
    solutionNote: 'We built a free Health Index and a personalised program engine on Cloudflare &#8212; with a 589-workout and 316-recipe library that adapts to her life.',
    challenge: [
      'No clear starting point &#8212; &#8220;start Monday&#8221; never arrives',
      'No time: work, family and home already fill the day',
      'Endless contradictory advice, none of it personal',
      'Crash diets and one-size programs end in guilt and relapse',
    ],
    solution: [
      'A free 5-minute Health Index scoring Movement, Nutrition, Mind and Lifestyle',
      'A personalised program built from her answers, in her available time',
      'A 589-workout library &#8212; from 5 minutes, no gym, no equipment',
      'A 316-recipe library with calorie counts, filtered by time and diet',
    ],
    pull: 'The goal was never another diet. It was a personalised health system that meets every woman where she is.',
    techLogos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/1ce95ac2-a78a-41f1-83d4-768846b3f300/public', alt: 'DreamBodyClub' },
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-claude/public', alt: 'Claude AI' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
    ],
    capsTitle: 'A Platform Built Around Her Health',
    capsSub: 'Health Index. Personalised programs. Workouts and recipes that fit real life.',
    capabilities: [
      { h: 'Health Index', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/33f2497e-888b-43aa-e9a5-8fd0bb911d00/public', desc: 'A free 5-minute assessment scoring four areas of wellbeing.', bullets: ['Movement, Nutrition, Mind, Lifestyle', '0&#8211;100 score per area', 'No sign-up, results on the spot'] },
    ],
    websiteLabel: 'Platform Architecture',
    websiteTitle: 'A Health Platform Built at the Edge',
    websiteBody: [
      'DreamBodyClub runs on Cloudflare&#8217;s edge network &#8212; a fast, multilingual platform serving the Health Index, personalised programs, and the workout and recipe libraries globally.',
      'The Index feeds a personalised program engine; workouts and recipes are filtered and scheduled around the time each member actually has.',
    ],
    funnelLabel: 'Key platform capabilities we built:',
    funnel: [
      'Free Health Index assessment and scoring',
      'Personalised program engine',
      '589-workout filtered library',
      '316-recipe filtered library',
      'Member dashboard and community',
    ],
    resultsLabel: 'The Platform',
    resultsTitle: 'A First Step That Fits Real Life',
    results: [
      { n: '5min', count: 5, prefix: '', suffix: 'min', l: 'To Your Health Index', sub: 'Free, no sign-up, results on the spot' },
      { n: '4', count: 4, prefix: '', suffix: '', l: 'Areas Scored', sub: 'Movement, Nutrition, Mind, Lifestyle' },
      { n: '589', count: 589, prefix: '', suffix: '', l: 'Workouts', sub: 'From 5 minutes &#8212; no gym, no equipment' },
      { n: '316', count: 316, prefix: '', suffix: '', l: 'Recipes', sub: 'Filtered by time, diet and category' },
    ],
    calloutPre: 'Where are you right now?',
    callout: 'Find out in 5 minutes',
    calloutSub: 'Built for women who want to start with themselves &#8212; without guilt, gyms or crash diets.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: 'Nov 17, 2025', quote: 'Working with Motivation has been outstanding. They delivered exactly what was promised, on time, and with quality that exceeded our expectations.', html: 'Working with Motivation has been outstanding. They delivered exactly what was promised, <span class="t-am">on time,</span> and with <strong>quality that exceeded our expectations.</strong>' },
    ],
    ctaTitle: 'Build a Health Platform Like DreamBodyClub',
    ctaBtn: 'Start Your Project',
    ctaSub1: 'We design and build health, fitness, and membership platforms &#8212; from assessment engines to content libraries.',
    ctaSub2: 'From a free diagnostic to a personalised program &#8212; engineered to fit real lives.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
  'video-meeting-platform': {
    metaTitle: 'Studio.video &#8212; Branded Video Meetings on Your Own Domain | Motivation',
    metaDesc: 'We built Studio.video &#8212; browser-based meeting rooms, webinars and client sessions on your own domain. White-label, 100% European-hosted, with AI recaps built in. No apps, no SDKs.',
    badge: 'Platform Engineering &#8212; Video SaaS',
    title: 'Meetings on Your Own Domain',
    sub: 'Browser-based meeting rooms, webinars and client sessions &#8212; fully branded, European-hosted, and live in minutes without apps or SDKs.',
    metric: '5,000 Attendees',
    metricNote: '(From a 1:1 client call to a 5,000-seat webinar &#8212; on your own branded domain, in any browser)',
    heroShot: 'https://customer-4x18g7wq6et2wysi.cloudflarestream.com/e2e237d10b065a909b2cebe7445dfb8f/thumbnails/thumbnail.jpg?time=2s&height=630',
    heroShotAlt: 'Studio.video &#8212; branded browser meeting room with live video and AI summary',
    siteAddr: 'studio.video',
    productHero: true,
    studio: true,
    recogCount: 5000,
    recogCountSuffix: '',
    recogCountLabel: 'attendees per webinar, in a browser tab',
    pullGlow: 'The goal was never another video app. It was <span style="color:var(--amber)">a meeting room that wears your brand</span> &#8212; on your domain, in any browser, with the recap already written.',
    featTestimonial: {
      date: 'May 2026',
      bold: 'Video should carry your brand, not someone else&#8217;s.',
      quote: 'Every coach, agency and SMB hosts client calls on tools that put another company&#8217;s name on the door. Studio.video flips that: browser-based meeting rooms on your own domain, white-label end to end, European-hosted, with the AI recap drafted before the call is over. No apps, no SDKs, no engineer required.',
      name: 'Christopher Brisley, Founder &#126; Motivation Digital',
    },
    transformLabel: 'The Build',
    transformTitle: 'From Someone Else&#8217;s App to Your Own Meeting Room',
    challengeNote: 'Generic video tools put another company&#8217;s brand &#8212; and another company&#8217;s app install &#8212; between you and every client.',
    solutionNote: 'We built Studio.video on Cloudflare &#8212; browser-based, white-label meeting rooms that live on the customer&#8217;s own domain, with webinars and AI recaps built in.',
    challenge: [
      'Generic video tools put someone else&#8217;s brand on your client calls',
      'Apps, installs and logins create drop-off before the meeting starts',
      'White-label add-ons are bolt-ons &#8212; half-broken and never on your domain',
      'Webinars, bookings and recordings live in three separate tools',
      'Non-EU hosting and tracking make privacy-first teams nervous',
    ],
    solution: [
      'Browser-based meeting rooms on the customer&#8217;s own domain',
      'One-line embed for Webflow, WordPress, Notion, Framer or raw HTML',
      'Webinar mode &#8212; up to 5,000 attendees, polls, Q&amp;A and breakouts',
      'AI summaries, transcripts and follow-up emails generated automatically',
      '100% European-hosted on Cloudflare, EU sub-processors only, zero tracking',
    ],
    pull: 'The goal was never another video app. It was a meeting room that wears your brand &#8212; on your domain, in any browser.',
    techLogos: [
      { src: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg', alt: 'Cloudflare' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-claude/public', alt: 'Claude AI' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-stripe/public', alt: 'Stripe' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-tech-ga/public', alt: 'Google Analytics' },
    ],
    capsTitle: 'Everything You Need in the Room',
    capsSub: 'HD video, whiteboard, recording, transcripts and AI summaries &#8212; white-label and EU-hosted.',
    capabilities: [
      { h: 'Branded Rooms', img: 'https://customer-4x18g7wq6et2wysi.cloudflarestream.com/e2e237d10b065a909b2cebe7445dfb8f/thumbnails/thumbnail.jpg', desc: 'White-label meeting rooms on your own domain.', bullets: ['Your logo, colours and waiting room', 'meet.yourbrand.com via CNAME', 'Studio.video disappears'] },
    ],
    websiteLabel: 'Platform Architecture',
    websiteTitle: 'Video Infrastructure Built at the Edge',
    websiteBody: [
      'Studio.video runs on Cloudflare&#8217;s edge network &#8212; browser-based rooms backed by Cloudflare RealtimeKit and Stream, served globally with no apps or SDKs.',
      'White-label rooms live on each customer&#8217;s own domain via CNAME; webinars scale to thousands of attendees, and AI recaps are generated automatically at the end of every call.',
    ],
    funnelLabel: 'Key platform capabilities we built:',
    funnel: [
      'Browser-based meeting rooms',
      'One-line website embed',
      'Webinar mode up to 5,000 attendees',
      'AI summaries and transcripts',
      'White-label custom domains',
      'Edge-native Cloudflare Workers + RealtimeKit',
    ],
    resultsLabel: 'The Platform',
    resultsTitle: 'Your Brand on Every Call',
    results: [
      { n: '5,000', count: 5000, prefix: '', suffix: '', l: 'Attendees Per Webinar', sub: 'From a 1:1 call to a full-scale broadcast' },
      { n: '1', count: 1, prefix: '', suffix: '', l: 'Browser Tab', sub: 'No apps, no installs, no SDKs' },
      { n: '100%', count: 100, prefix: '', suffix: '%', l: 'European Hosted', sub: 'EU sub-processors only, zero tracking' },
      { n: '30+', count: 30, prefix: '', suffix: '+', l: 'Transcript Languages', sub: 'Speaker-labelled and searchable' },
    ],
    calloutPre: 'Whose brand is on your meetings?',
    callout: 'Put yours on the door',
    calloutSub: 'Built for coaches, consultants, agencies and teams who want meetings under their own brand.',
    testimonials: [
      { name: 'Krista Kolodziejzyk', role: 'CEO &#126; Dietitian Success Center', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-krista/public', date: 'June 05, 2025', quote: 'OH MY GOODNESS!!! It&#8217;s a million times better!!! The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. Not having to worry about tech has freed us up so much to actually figure out our funnel.', html: 'OH MY GOODNESS!!! <span class="t-am">It&#8217;s a million times better!!!</span> The new site looks amazing so far! Things have been going really well and we&#8217;re still absolutely loving the site. <strong>Not having to worry about tech</strong> has freed us up so much to actually figure out our funnel.' },
      { name: 'Caitlin Mitchel', role: 'CEO &#126; EBAcademics.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-caitlin/public', date: '', quote: 'You guys absolutely freaking nailed it for us. You guys are the best, and I want to keep working with you forever. Thank you!', html: 'You guys absolutely <span class="t-am">freaking nailed it for us.</span> You guys are the best, and <strong>I want to keep working with you forever.</strong> Thank you!' },
      { name: 'Lisa Vanderkwaak', role: 'founder &#126; SpeakToTransform.com', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-lisa/public', date: '', quote: 'The results I got from Motivation proved that nothing is impossible when you are partnered with the right company.', html: 'The results I got from Motivation proved that <strong>nothing is impossible</strong> when you are <span class="t-am">partnered with the right company.</span>' },
      { name: 'Dan Taylor', role: 'CEO &#126; TaylorCapital.co.uk', img: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-testi-dan/public', date: 'Nov 17, 2025', quote: 'Working with Motivation has been outstanding. They delivered exactly what was promised, on time, and with quality that exceeded our expectations.', html: 'Working with Motivation has been outstanding. They delivered exactly what was promised, <span class="t-am">on time,</span> and with <strong>quality that exceeded our expectations.</strong>' },
    ],
    ctaTitle: 'Build a Branded Video Platform Like Studio.video',
    ctaBtn: 'Start Your Project',
    ctaSub1: 'We design and build video, webinar and meeting platforms &#8212; white-label, on your own domain, engineered at the edge.',
    ctaSub2: 'From a branded 1:1 room to a 5,000-seat webinar &#8212; with AI recaps built in.',
    logos: [
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-trr/public', alt: 'Time Rich Recruiter' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-gkr/public', alt: 'GKR Karate' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-lifemap/public', alt: 'LifeMap' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-dsc/public', alt: 'Dietitian Success Center' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-genuineshift/public', alt: 'GenuineShift' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-bemobile/public', alt: 'Be Mobile Physio' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-ebacademics/public', alt: 'EBAcademics' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-sidehustle/public', alt: 'Side Hustle Accelerator' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-speechtime/public', alt: 'SpeechTime Fun' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-tccapital/public', alt: 'Taylor Capital' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-mixmasters/public', alt: 'MixMasters' },
      { src: 'https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-client-qina/public', alt: 'Qina Tech' },
    ],
  },
};
function caseStudy(p, slug) {
  const url = 'https://motivation.digital/work/' + slug;

  const chalList = p.challenge.map(x => `<li>${x}</li>`).join('');
  const solList  = p.solution.map(x => `<li>${x}</li>`).join('');
  const techLogos = p.techLogos.map(l => `<img class="bw-img" src="${l.src}" alt="${l.alt}" loading="eager">`).join('');
  const tabBtns = p.capabilities.map((c, i) => `<button class="cap-tab${i===0?' active':''}" data-tab="${i}">${c.h}</button>`).join('');
  const tabPanels = p.capabilities.map((c, i) => `
  <div class="cap-panel${i===0?' active':''}" data-panel="${i}">
    <div class="cap-panel-inner">
      <div class="cap-panel-img">${c.vid ? `<iframe src="https://iframe.videodelivery.net/${c.vid}?controls=true" style="width:100%;display:block;border:none" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` : `<img src="${c.img}" alt="${c.h}" style="width:100%;display:block" loading="lazy">`}</div>
      <div class="cap-panel-text"><h3>${c.h}</h3>${c.desc?`<p class="cap-desc">${c.desc}</p>`:''}<ul>${c.bullets.map(b=>`<li>${b}</li>`).join('')}</ul></div>
    </div>
  </div>`).join('');
  const websiteParas = p.websiteBody.map((t, i) => i === 0 ? `<p><strong>${t}</strong></p>` : `<p>${t}</p>`).join('');
  const funnelItems  = p.funnel.map(x => `<li>${x}</li>`).join('');
  const resultsHtml  = (p.results || []).map((r, i) => `<div class="result-card reveal" style="transition-delay:${i * 0.1}s"><div class="result-n"${r.count ? ` data-count="${r.count}" data-prefix="${r.prefix||''}" data-suffix="${r.suffix||''}"` : ''}>${r.n}</div><div class="result-l">${r.l}</div><div class="result-sub">${r.sub}</div></div>`).join('');
  const sliderHtml   = p.testimonials.map((t, i) => `
  <div class="testi-slide${i === 0 ? ' active' : ''}">
    <div class="cs-feat-testi">
      <div class="stars-date"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>${t.date ? `<span class="tdate">${t.date}</span>` : ''}</div>
      <p class="feat-testi-q">${t.html || t.quote}</p>
      <div class="feat-testi-by">
        <img src="${t.img}" alt="${t.name}" loading="lazy">
        <span>${t.name}, ${t.role}</span>
      </div>
    </div>
  </div>`).join('');
  const dotsHtml     = p.testimonials.map((_, i) => `<button class="testi-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Go to testimonial ${i+1}"></button>`).join('');
  const staticTestiHtml = [1, 2, 3].map(function(i, idx) { const t = p.testimonials[i]; return `
  <figure class="tcard reveal" style="transition-delay:${idx * 0.12}s">
    <div class="tcard-top"><img class="tav" src="${t.img}" alt="${t.name}" loading="lazy"><div><strong>${t.name}</strong><span>${t.role}</span></div></div>
    <p class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
    <blockquote>${t.html || t.quote}</blockquote>
  </figure>`;}).join('');
  const logoHtml = p.logos.concat(p.logos).map(l => `<img src="${l.src}" alt="${l.alt}" loading="lazy">`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/png" href="https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/ms-favicon/public">
<title>${p.metaTitle}</title>
<meta name="description" content="${p.metaDesc}">
<meta property="og:title" content="${p.metaTitle}">
<meta property="og:description" content="${p.metaDesc}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:image" content="${p.heroShot}">
<link rel="canonical" href="${url}">
${p.productHero ? '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">' : ''}
<style>${css()}</style>
</head>
<body>
${siteHeader('work')}

${p.productHero && !p.dbc && !p.studio ? `
<!-- ⓪ trustcenter.pro hero — faithful copy (LCE-10000274) -->
<div class="max-wrap">
  <div class="tc-topbar">
    <a href="/work" class="back-link">&larr; All work</a>
    <p class="eyebrow">${p.badge}</p>
  </div>
  <section class="tc-embed">
  <div class="tchero">
    <div class="hero-glow"></div>
    <div class="hero-grid-bg"></div>
    <div class="hero-inner">
      <div>
        <div class="hero-pill">
          <span class="hero-pill-dot"></span>
          <span class="hero-pill-text">Not protected</span>
        </div>
        <h1>Is your website<br><span style="color:var(--accent)"><span style="text-decoration:underline;text-decoration-color:#F97316;text-decoration-thickness:3px;text-underline-offset:5px">really</span> legal?</span></h1>
        <p class="hero-sub"><em>Compliance is a full-time job.</em> You either have <span style="background:rgba(249,115,22,0.15);color:#F97316;padding:1px 5px;border-radius:3px;font-weight:600">no system in place</span>, or your DIY setup has not been updated or audited since <em>the day it was installed</em>. Let&#39;s change that!</p>
        <div class="scanner-wrap">
          <div class="scanning-row" id="tc-scanning-row">
            <span class="scan-pulse"></span>
            <span id="tc-scan-label">Waiting to audit your domain</span>
          </div>
          <div class="scan-row">
            <input id="tc-hero-input" class="scan-input" type="text" placeholder="yourdomain.com" autocomplete="off">
            <button id="tc-scan-btn" class="scan-btn" type="button">Scan now</button>
          </div>
          <div class="scan-hints">
            <span>&#10003; No credit card</span>
            <span>&#10003; Results in under 60 seconds</span>
          </div>
        </div>
      </div>
      <div class="diagram-col" id="tc-diagram-col">
        <div class="results-card" id="tc-results-card">
          <div class="rc-inner">
            <div class="rc-score-row">
              <div>
                <div class="rc-score-num"><span id="tc-scan-score-display">0</span><span class="rc-score-denom">/100</span></div>
                <div class="rc-score-label">Compliance Score</div>
              </div>
              <span class="rc-badge" id="tc-rc-badge">Audit Required</span>
            </div>
            <ul class="check-list" id="tc-scan-check-list"></ul>
            <button class="rc-fix-cta" id="tc-scan-fix-cta">Fix these issues with Trust Center &rarr;</button>
          </div>
        </div>
        <div class="diagram-wrap" id="tc-diagram-wrap">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="tcsvrg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#14B8A6" stop-opacity="0.07"></stop><stop offset="100%" stop-color="#14B8A6" stop-opacity="0"></stop></radialGradient></defs>
            <circle cx="250" cy="250" r="200" fill="url(#tcsvrg)"></circle>
            <line id="tcsline-privacy-cookies" x1="250" y1="250" x2="250" y2="95" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <line id="tcsline-legal" x1="250" y1="250" x2="384" y2="173" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <line id="tcsline-security" x1="250" y1="250" x2="384" y2="328" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <line id="tcsline-analytics" x1="250" y1="250" x2="250" y2="405" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <line id="tcsline-dsar" x1="250" y1="250" x2="116" y2="328" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <line id="tcsline-accessibility" x1="250" y1="250" x2="116" y2="173" stroke="rgba(249,115,22,0.35)" stroke-width="1.25" opacity="0.2" stroke-dasharray="5 4"></line>
            <circle cx="250" cy="250" r="46" fill="#1E1E1E" stroke="#F97316" stroke-width="1.5"></circle>
            <circle cx="250" cy="250" r="40" fill="rgba(249,115,22,0.06)"></circle>
            <path d="M250 233L237 239.5V249C237 256.8 242.9 264.1 250 265.7C257.1 264.1 263 256.8 263 249V239.5L250 233Z" stroke="#F97316" stroke-width="1.5" stroke-linejoin="round" fill="none"></path>
            <path d="M246 249L249 252L255.5 245.5" stroke="#F97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <g id="tcsnode-privacy-cookies"><circle cx="250" cy="95" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="250" y="95" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf564;</text><text x="250" y="141" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Privacy &amp; Cookies</text></g>
            <g id="tcsnode-legal"><circle cx="384" cy="173" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="384" y="173" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf0e3;</text><text x="384" y="219" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Legal</text></g>
            <g id="tcsnode-security"><circle cx="384" cy="328" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="384" y="328" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf023;</text><text x="384" y="374" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Security &amp; Data</text></g>
            <g id="tcsnode-analytics"><circle cx="250" cy="405" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="250" y="405" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf080;</text><text x="250" y="451" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Analytics &amp; Ads</text></g>
            <g id="tcsnode-dsar"><circle cx="116" cy="328" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="116" y="328" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf2bb;</text><text x="116" y="374" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Data Requests</text></g>
            <g id="tcsnode-accessibility"><circle cx="116" cy="173" r="32" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="1.5"></circle><text class="nabbr" x="116" y="173" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#F97316">&#xf193;</text><text x="116" y="219" text-anchor="middle" font-size="9.5" fill="#4A5568" font-family="Inter,system-ui,sans-serif">Accessibility</text></g>
          </svg>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
</div>

<div class="hero-logos-below">${techLogos}</div>

<script>
(function(){
  var IDS=['privacy-cookies','legal','security','analytics','dsar','accessibility'];
  var LABELS=['Privacy & Cookies','Legal','Security & Data','Analytics & Ads','Data Requests','Accessibility'];
  var ICONS=['fa-cookie-bite','fa-gavel','fa-lock','fa-chart-bar','fa-address-card','fa-wheelchair'];
  var TAGS=['warning',null,'critical','critical','warning','warning'];
  var VARS=[{r:['fail','pass','fail','fail','fail','fail'],s:35},{r:['pass','pass','fail','pass','fail','fail'],s:68},{r:['pass','pass','pass','pass','pass','pass'],s:100}];
  var vi=0; function cv(){return VARS[vi%VARS.length];}
  var COL={idle:{f:'rgba(249,115,22,0.10)',s:'rgba(249,115,22,0.35)',t:'#F97316'},scanning:{f:'rgba(20,184,166,0.12)',s:'#14B8A6',t:'#14B8A6'},pass:{f:'rgba(20,184,166,0.12)',s:'#14B8A6',t:'#14B8A6'},fail:{f:'rgba(249,115,22,0.15)',s:'#F97316',t:'#F97316'}};
  var phase='idle',timers=[];
  function $(id){return document.getElementById(id);}
  function setNode(id,st){
    var g=$('tcsnode-'+id); if(!g)return;
    var c=g.querySelector('circle'),t=g.querySelector('.nabbr'),col=COL[st];
    c.style.fill=col.f;c.style.stroke=col.s;
    if(st==='pass'||st==='fail'){t.textContent=st==='pass'?'✓':'✗';t.style.fontFamily='Inter,system-ui,sans-serif';t.style.fontWeight='700';}
    else{t.textContent='';}
    t.style.fill=col.t;
    var ln=$('tcsline-'+id);
    if(ln){ln.setAttribute('stroke',col.s);
      if(st!=='idle'){ln.setAttribute('opacity','0.85');ln.setAttribute('stroke-width','1.75');ln.removeAttribute('stroke-dasharray');}
      else{ln.setAttribute('opacity','0.2');ln.setAttribute('stroke-width','1.25');ln.setAttribute('stroke-dasharray','5 4');}
    }
  }
  function animScore(target){var t0=performance.now(),dur=1000;(function tick(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);var el=$('tc-scan-score-display');if(el)el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(tick);})(performance.now());}
  function renderResults(){
    var list=$('tc-scan-check-list'); if(!list)return;
    var res=cv().r;
    var sorted=[0,1,2,3,4,5].sort(function(a,b){var pri=function(i){return res[i]==='pass'?2:(TAGS[i]==='critical'?0:1);};return pri(a)-pri(b);});
    list.innerHTML=sorted.map(function(i){var pass=res[i]==='pass',tag=TAGS[i];
      return '<li class="check-item"><span class="check-icon '+(pass?'pass':'fail')+'"><i class="fa-solid '+ICONS[i]+'"></i></span><span class="'+(pass?'check-label-pass':'check-label-fail')+'">'+LABELS[i]+'</span>'+(pass?'<span class="check-tag pass">PASS</span>':(tag?'<span class="check-tag '+tag+'">'+tag.toUpperCase()+'</span>':''))+'</li>';
    }).join('');
    var badge=$('tc-rc-badge'),cta=$('tc-scan-fix-cta'),perfect=cv().s===100;
    if(badge){badge.textContent=perfect?'TC Protected':'Audit Required';badge.style.background=perfect?'rgba(20,184,166,0.12)':'';badge.style.borderColor=perfect?'rgba(20,184,166,0.35)':'';badge.style.color=perfect?'#14B8A6':'';}
    if(cta)cta.textContent=perfect?'Get Trust Center for your site →':'Fix these issues with Trust Center →';
  }
  function reset(){
    timers.forEach(function(t){clearTimeout(t);});timers=[];phase='idle';
    var sr=$('tc-scanning-row');if(sr)sr.classList.remove('visible');
    var rc=$('tc-results-card'),dw=$('tc-diagram-wrap'),dc=$('tc-diagram-col');
    if(rc)rc.classList.remove('visible');if(dw)dw.classList.remove('fading');if(dc)dc.classList.remove('has-results');
    var sd=$('tc-scan-score-display');if(sd)sd.textContent='0';
    IDS.forEach(function(id){setNode(id,'idle');});
  }
  function start(){
    if(phase!=='idle')return;phase='scanning';
    var sr=$('tc-scanning-row'),sl=$('tc-scan-label');
    if(sl)sl.textContent='Waiting to audit your domain';
    if(sr)sr.classList.add('visible');
    IDS.forEach(function(id,i){
      timers.push(setTimeout(function(){setNode(id,'scanning');},i*1000));
      timers.push(setTimeout(function(){setNode(id,cv().r[i]);},i*1000+700));
      if(i===IDS.length-1){
        timers.push(setTimeout(function(){
          phase='done';renderResults();
          var dw=$('tc-diagram-wrap'),rc=$('tc-results-card'),dc=$('tc-diagram-col');
          if(dw)dw.classList.add('fading');if(dc)dc.classList.add('has-results');
          requestAnimationFrame(function(){requestAnimationFrame(function(){if(rc)rc.classList.add('visible');});});
          animScore(cv().s);
          timers.push(setTimeout(function(){reset();vi++;setTimeout(start,500);},5000));
        },i*1000+1000));
      }
    });
  }
  function go(){window.open('https://trustcenter.pro','_blank','noopener');}
  var btn=$('tc-scan-btn'),inp=$('tc-hero-input'),fix=$('tc-scan-fix-cta');
  if(btn)btn.addEventListener('click',go);
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter')go();});
  if(fix)fix.addEventListener('click',go);
  IDS.forEach(function(id){setNode(id,'idle');});
  window.addEventListener('load',function(){setTimeout(start,600);});
})();
(function(){function setup(){var el=document.querySelector('.tc-count');if(!el)return;var target=parseInt(el.getAttribute('data-target'),10)||54;var done=false;function run(){if(done)return;done=true;var t0=performance.now(),dur=1400;(function tick(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(tick);})(performance.now());}var obs=new IntersectionObserver(function(en){if(en[0].isIntersecting){obs.disconnect();run();}},{threshold:0.3});obs.observe(el);}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',setup);}else{setup();}})();
<\/script>


<hr class="divider">

` : ``}

${p.dbc ? `
<!-- ⓪ dreambody.club Health Index hero — faithful copy (LCE-10000337) -->
<div class="max-wrap">
  <div class="tc-topbar">
    <a href="/work" class="back-link">&larr; All work</a>
    <p class="eyebrow">${p.badge}</p>
  </div>
  <section class="tc-embed dbc-embed">
  <div class="tchero">
    <div class="hero-glow"></div>
    <div class="hero-grid-bg"></div>
    <div class="hero-inner">
      <div>
        <div class="hero-pill">
          <span class="hero-pill-dot"></span>
          <span class="hero-pill-text">Work. Family. And you?</span>
        </div>
        <h1>If I were starting my path to health over, I&#8217;d begin <span style="color:var(--accent)"><span style="text-decoration:underline;text-decoration-color:#C8736F;text-decoration-thickness:3px;text-underline-offset:5px">right here</span></span></h1>
        <p class="hero-sub">Not with a crash diet or an hour-long workout &mdash; but with understanding where my body is <em>right now</em>, and a plan built around me.</p>
        <div class="scanner-wrap">
          <button id="dbc-cta-btn" class="dbc-hero-cta" type="button">Start <i class="fa-solid fa-star"></i></button>
          <div class="scan-hints dbc-hero-meta">
            <span><i class="fa-regular fa-heart"></i> What&#8217;s your Health Index?</span>
            <span>&#10003; Free</span>
            <span>&#10003; 5 minutes</span>
          </div>
          <div class="dbc-social">
            <div class="dbc-avatars">
              <span class="dbc-av" style="background-image:url('https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/872a0e5e-8ff8-412b-9425-e95fcc61dc00/public')"></span>
              <span class="dbc-av" style="background-image:url('https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/386762d6-e221-4e9a-14d9-b45fed38a200/public')"></span>
              <span class="dbc-av" style="background-image:url('https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/3302cb23-1caa-4c28-78ff-fd49c0a13a00/public')"></span>
              <span class="dbc-av" style="background-image:url('https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/8aa6503a-1a09-4537-8e2c-8e78058ba100/public')"></span>
            </div>
            <div class="dbc-social-text"><strong><span id="dbcSocialCount" data-target="4373">0</span> women</strong> have already taken the Health Index</div>
          </div>
        </div>
      </div>
      <div class="diagram-col">
        <div class="dbc-hero-visual">
          <div class="dbc-index-card" id="dbcIndexCard">
            <div class="dbc-ic-head">
              <span class="dbc-ic-title">Your Health Index</span>
              <span class="dbc-ic-badge">Free &middot; 5 min</span>
            </div>
            <div class="dbc-ic-gauge">
              <div class="dbc-gauge-ring">
                <svg width="104" height="104" viewBox="0 0 104 104">
                  <circle cx="52" cy="52" r="46" fill="none" stroke="rgba(42,38,32,0.08)" stroke-width="8"></circle>
                  <circle id="dbcGaugeArc" cx="52" cy="52" r="46" fill="none" stroke="#6F7550" stroke-width="8" stroke-linecap="round" stroke-dasharray="289" stroke-dashoffset="289"></circle>
                </svg>
                <div class="dbc-gauge-num"><span class="dbc-gauge-val" id="dbcGaugeVal">0</span><span class="dbc-gauge-max">/ 100</span></div>
              </div>
              <div class="dbc-gauge-side">
                <div class="dbc-gs-lbl">Your index now</div>
                <div class="dbc-gs-band">Good base</div>
              </div>
            </div>
            <div class="dbc-ic-bar"><div class="dbc-ic-bar-fill" id="dbcIcBar"></div></div>
            <div class="dbc-ic-cap">Good base &mdash; room to grow</div>
          </div>
          <div class="dbc-float dbc-float-train"><span class="dbc-float-ic"><i class="fa-solid fa-dumbbell"></i></span>Workout &middot; <b>25 min</b></div>
          <div class="dbc-float dbc-float-cal"><span class="dbc-float-ic"><i class="fa-solid fa-fire-flame-curved"></i></span><b>420 kcal</b> burned</div>
        </div>
      </div>
    </div>
  </div>
  </section>
</div>

<div class="hero-logos-below">${techLogos}</div>

<script>
(function(){
  var card=document.getElementById('dbcIndexCard'); if(!card)return;
  var arc=document.getElementById('dbcGaugeArc'),val=document.getElementById('dbcGaugeVal'),bar=document.getElementById('dbcIcBar');
  var C=289,target=68,done=false;
  function run(){
    if(done)return;done=true;
    var t0=performance.now(),dur=1300;
    (function tick(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);
      if(val)val.textContent=Math.round(target*e);
      if(arc)arc.setAttribute('stroke-dashoffset',C-(C*(target/100)*e));
      if(p<1)requestAnimationFrame(tick);})(performance.now());
    if(bar)setTimeout(function(){bar.style.width=target+'%';},200);
  }
  var sc=document.getElementById('dbcSocialCount');
  function runCount(){if(!sc)return;var tg=parseInt(sc.getAttribute('data-target'),10)||0,t0=performance.now(),dur=1400;(function tk(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);sc.textContent=Math.round(tg*e).toLocaleString('en-US');if(p<1)requestAnimationFrame(tk);})(performance.now());}
  function go(){window.open('https://dreambody.club','_blank','noopener');}
  var btn=document.getElementById('dbc-cta-btn');if(btn)btn.addEventListener('click',go);
  var obs=new IntersectionObserver(function(en){if(en[0].isIntersecting){obs.disconnect();run();runCount();}},{threshold:0.3});
  obs.observe(card);
})();
<\/script>

<hr class="divider">
` : ``}

${p.studio ? `
<!-- ⓪ studio.video hero — faithful copy (LCE-10000338) -->
<div class="max-wrap">
  <div class="tc-topbar">
    <a href="/work" class="back-link">&larr; All work</a>
    <p class="eyebrow">${p.badge}</p>
  </div>
  <section class="tc-embed sv-embed">
  <div class="tchero">
    <div class="hero-glow"></div>
    <div class="hero-grid-bg"></div>
    <div class="hero-inner">
      <div>
        <div class="hero-pill">
          <span class="hero-pill-dot"></span>
          <span class="hero-pill-text">New &middot; branded webinar mode in beta</span>
        </div>
        <h1>Turn your website into a <span style="color:var(--accent)"><span style="text-decoration:underline;text-decoration-color:#FF4545;text-decoration-thickness:3px;text-underline-offset:5px">meeting room</span></span>.</h1>
        <p class="hero-sub">Create browser-based meeting rooms, webinars and client sessions on your own domain &mdash; <em>without apps, SDKs or complicated setup.</em></p>
        <div class="scanner-wrap">
          <div class="scan-row" style="max-width:420px">
            <span class="sv-join-lock">&#128274;</span>
            <span class="sv-join-url" id="svJoinUrl"></span>
            <button id="sv-cta-btn" class="scan-btn" type="button">Join</button>
          </div>
          <div class="scan-hints">
            <span>&#10003; Private beta</span>
            <span>&#10003; No credit card</span>
            <span>&#10003; 100% European hosted</span>
          </div>
        </div>
      </div>
      <div class="diagram-col">
        <div class="sv-stage">
          <div class="sv-room">
            <iframe src="https://customer-4x18g7wq6et2wysi.cloudflarestream.com/e2e237d10b065a909b2cebe7445dfb8f/iframe?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=transparent" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="Studio.video meeting"></iframe>
            <span class="sv-rec"><span class="sv-rec-dot"></span>REC &middot; <span id="svRec">24:18</span></span>
          </div>
          <div class="sv-pop sv-pop-hd">
            <div class="sv-pop-eyebrow"><span class="ic"><i class="fa-solid fa-video"></i></span>HD Video &middot; Active</div>
            <div class="sv-pop-title">High-quality video conferencing</div>
            <div class="sv-wave"><span style="animation-delay:0ms"></span><span style="animation-delay:90ms"></span><span style="animation-delay:180ms"></span><span style="animation-delay:120ms"></span><span style="animation-delay:60ms"></span><span style="animation-delay:200ms"></span><span style="animation-delay:140ms"></span><span style="animation-delay:40ms"></span></div>
          </div>
          <div class="sv-pop sv-pop-join">
            <div class="sv-pop-eyebrow"><span class="ic"><i class="fa-solid fa-lock"></i></span>Meetings that just open</div>
            <div class="sv-pop-joinrow"><span class="u">meet.yourbrand.com</span><span class="b">Join</span></div>
          </div>
          <div class="sv-pop sv-pop-ai">
            <div class="sv-pop-eyebrow"><span class="ic"><i class="fa-solid fa-wand-magic-sparkles"></i></span>AI summary &middot; ready</div>
            <div class="sv-pop-title">3 action items &middot; transcript saved</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</div>

<div class="hero-logos-below">${techLogos}</div>

<script>
(function(){
  var rec=document.getElementById('svRec');
  if(rec){var s=24*60+18;setInterval(function(){s++;var m=Math.floor(s/60),ss=s%60;rec.textContent=(m<10?'0':'')+m+':'+(ss<10?'0':'')+ss;},1000);}
  var el=document.getElementById('svJoinUrl');
  if(el){
    var URLS=['meet.yourbrand.com/strategy','meet.atelier.studio/discovery','meet.northstar.io/coaching','meet.lumen.co/workshop'];
    var wi=0,ci=0,del=false;
    function render(txt){var sl=txt.indexOf('/');var head=sl===-1?txt:txt.slice(0,sl);var tail=sl===-1?'':txt.slice(sl);el.innerHTML='<b>'+head+'</b>'+tail+'<span class="sv-join-caret"></span>';}
    function tick(){
      var full=URLS[wi];
      ci=ci+(del?-1:1);
      render(full.slice(0,ci));
      var d=del?28:58;
      if(!del&&ci===full.length){del=true;d=1600;}
      else if(del&&ci===0){del=false;wi=(wi+1)%URLS.length;d=400;}
      setTimeout(tick,d);
    }
    tick();
  }
  function go(){window.open('https://studio.video','_blank','noopener');}
  var btn=document.getElementById('sv-cta-btn');if(btn)btn.addEventListener('click',go);
})();
<\/script>

<hr class="divider">
` : ``}

${!p.productHero ? `<!-- ① Hero -->
<div class="max-wrap">
  <div class="hero cs-hero">
    <a href="/work" class="back-link reveal">&larr; All work</a>
    <div class="cs-hero-grid">
      <div class="cs-hero-text">
        <p class="eyebrow reveal">${p.badge}</p>
        <h1 class="reveal" style="transition-delay:0.06s">${p.title}</h1>
        <p class="hero-sub reveal" style="transition-delay:0.12s">${p.sub}</p>
        <p class="cs-metric reveal" style="transition-delay:0.18s">${(() => { if (!p.productHero) return p.metric; const m = String(p.metric || '').match(/^(\d+)(\S*)([\s\S]*)$/); if (!m) return p.metric; return `<span class="cs-metric-count" data-count="${m[1]}" data-suffix="${m[2]}">0${m[2]}</span>${m[3]}`; })()}</p>
        <p class="cs-metric-note reveal" style="transition-delay:0.22s">${p.metricNote}</p>
      </div>
      <div class="cs-hero-shot reveal" style="transition-delay:0.15s">
        <div class="browser-frame">
          <div class="browser-bar">
            <div class="browser-dots">
              <span class="browser-dot bd-r"></span>
              <span class="browser-dot bd-y"></span>
              <span class="browser-dot bd-g"></span>
            </div>
            <span class="browser-addr">${p.siteAddr || 'bemobilephysiotherapy.com.au'}</span>
          </div>
          ${p.heroVid ? `<iframe src="https://iframe.videodelivery.net/${p.heroVid}?autoplay=true&loop=true&muted=true&preload=auto" style="width:100%;display:block;border:none;aspect-ratio:16/9" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` : `<img src="${p.heroShot}" alt="${p.heroShotAlt}" style="width:100%;display:block" loading="eager">`}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ② Featured testimonial -->
${p.featTestimonial ? `<div class="max-wrap">
  <div class="section tight">
    <div class="cs-feat-testi reveal">
      <div class="stars-date"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span class="tdate">${p.featTestimonial.date}</span></div>
      <p class="feat-testi-q"><span class="t-am">${p.featTestimonial.bold}</span> ${p.featTestimonial.quote}</p>
      <div class="feat-testi-by">
        ${p.featTestimonial.img ? `<img src="${p.featTestimonial.img}" alt="${p.featTestimonial.name}" loading="eager">` : ``}
        <span>${p.featTestimonial.name}</span>
      </div>
    </div>
  </div>
</div>

<hr class="divider">` : ''}` : ``}

${p.productHero ? `
<!-- Dribbble Recognition -->
<div class="max-wrap">
  <div class="section tight reveal">
    <div class="tc-recog-grid">
      <div class="tc-recog-left">
        <h2 class="tc-recog-h2">${p.title}</h2>
        <p class="tc-pos-sub">${p.sub}</p>
        <p class="cs-metric"><span class="tc-count" data-target="${p.recogCount || 54}">0</span>${p.recogCountSuffix || '+'} ${p.recogCountLabel || 'Jurisdictions'}</p>
        <p class="cs-metric-note">${p.metricNote}</p>
      </div>
      <div class="tc-recog-frame">
        <div class="tc-recog-copy">
          <p class="tc-awards-text">Motivation was selected by Dribbble&#8217;s editorial team as part of their <a href="https://dribbble.com/resources/agencies/ultimate-dribbble-select-best-shots" target="_blank" rel="noopener" style="color:var(--amber);text-decoration:underline">Ultimate 2026 Dribbble Select Best Shots of the Year</a>, on our ability to deliver high quality work on complex projects and we&#8217;re listed in the newly launched <a href="https://dribbble.com/web-design-company" target="_blank" rel="noopener" style="color:var(--amber);text-decoration:underline">Dribbble Select: The Best Web Design Agencies On Dribbble</a>.</p>
        </div>
        <div class="tc-badges">
          <a href="https://dribbble.com/web-design-company" target="_blank" rel="noopener"><img class="tc-badge-img" src="https://imagedelivery.net/8taA81TQ4UD-fca9BHMP5A/78c0f87c-868c-4ce8-9160-2fba7b664900/public" alt="Dribbble Select badge" loading="lazy"></a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="max-wrap">
  <div class="tc-pull-wrap reveal">
    <p class="tc-pull-glow" id="tcPullGlow">${p.pullGlow || 'The goal was not a legal document host. It was <span style="color:var(--amber)">complete compliance infrastructure</span>, automated, always current, and built to serve any growing brand.'}</p>
  </div>
</div>

<hr class="divider">

` : ``}

<!-- ③ The Transformation -->
${p.productHero ? `
<div class="max-wrap" id="challenge">
  <div class="section tight" style="padding-bottom:0.75rem;">
    <p class="lbl reveal">${p.transformLabel}</p>
    <h2 class="title reveal" style="max-width:22ch;font-weight:600">${p.transformTitle}</h2>
    <div class="tc-cs reveal">
      <p><span class="tc-cs-k tc-cs-ch">Challenge</span>${p.challengeNote}</p>
      <p><span class="tc-cs-k tc-cs-sol">Solution</span>${p.solutionNote}</p>
    </div>
  </div>
</div>
` : `
<div class="max-wrap" id="challenge">
  <div class="section" style="padding-bottom:1.75rem;">
    <p class="lbl reveal">${p.transformLabel}</p>
    <h2 class="title reveal">${p.transformTitle}</h2>
    <div class="cs-split">
      <div class="cs-col reveal">
        <p class="ch">Challenge</p>
        <p class="ch-note">${p.challengeNote}</p>
        <ul>${chalList}</ul>
      </div>
      <div class="cs-col is-sol reveal">
        <p class="ch">Solution</p>
        <p class="ch-note">${p.solutionNote}</p>
        <ul>${solList}</ul>
      </div>
    </div>
  </div>
</div>
`}

<!-- ④ Pull quote -->
${!p.productHero ? `<div class="max-wrap">
  <div class="section tight" style="padding-top:1.75rem;padding-bottom:1.75rem;">
    <p class="cs-pull reveal">${p.pull}</p>
  </div>
</div>` : ``}

${!p.productHero ? '<hr class="divider">' : ''}

<!-- ⑥ Capabilities (DBC: index + programs + libraries; compliance: flow + coverage; others: tabs) -->
${p.dbc ? `
<div class="max-wrap">
<div class="tc-sections dbc-sections">

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// what the health index is</div>
        <h2>Four areas,<br>one system</h2>
        <p class="flow-sub">Health isn&#8217;t only training. It&#8217;s how much you move, how you eat, who&#8217;s around you and how satisfied you are with life overall. The Index checks all four areas and shows where to start looking after yourself right now &mdash; even if you only have 10 minutes a day.</p>
      </div>
      <div class="dbc-four">
        <div class="dbc-fcard"><div class="dbc-fi"><i class="fa-solid fa-person-running"></i></div><h4>Movement</h4><p>Just how active you really are, and which training format will fit your schedule.</p><div class="dbc-fscore"><b>68</b><div class="dbc-fmini"><span data-v="68"></span></div></div></div>
        <div class="dbc-fcard"><div class="dbc-fi"><i class="fa-solid fa-bowl-food"></i></div><h4>Nutrition</h4><p>What&#8217;s working in how you eat and what&#8217;s worth changing &mdash; no strict diets, for you and those close to you.</p><div class="dbc-fscore"><b>74</b><div class="dbc-fmini"><span data-v="74"></span></div></div></div>
        <div class="dbc-fcard"><div class="dbc-fi"><i class="fa-solid fa-brain"></i></div><h4>Mind</h4><p>How you relate to yourself, your body and your life overall &mdash; and what&#8217;s holding you back.</p><div class="dbc-fscore"><b>62</b><div class="dbc-fmini"><span data-v="62"></span></div></div></div>
        <div class="dbc-fcard"><div class="dbc-fi"><i class="fa-solid fa-moon"></i></div><h4>Lifestyle</h4><p>The rhythm you live at &mdash; sleep, stress, the balance of work and rest &mdash; and how to set it right.</p><div class="dbc-fscore"><b>65</b><div class="dbc-fmini"><span data-v="65"></span></div></div></div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// dreambodyclub capability</span>The free Health Index is the front door to the whole platform. In five minutes, with no sign-up, a visitor answers a short set of questions and gets a 0&ndash;100 score across four areas &mdash; Movement, Nutrition, Mind and Lifestyle &mdash; with the single most useful next step highlighted. It is the diagnostic everything personalised is built on.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// how it works</div>
        <h2>Three steps, and<br>you have a plan</h2>
        <p class="flow-sub">Five minutes on the Health Index and you&#8217;ll know where your emotional and physical health stands right now. Straight after the test you get personal recommendations &mdash; grounded in research and matched to the rhythm of your life.</p>
      </div>
      <div class="dbc-steps">
        <div class="dbc-step"><div class="dbc-stepn">STEP 01</div><h4>Take the test</h4><p>Answer simple, honest questions about your physical and emotional health, nutrition and lifestyle &mdash; so the recommendations are more precise.</p></div>
        <div class="dbc-step"><div class="dbc-stepn">STEP 02</div><h4>See your Index</h4><p>From your answers you get a result across 4 areas and see which are already in good shape and what&#8217;s worth working on.</p></div>
        <div class="dbc-step"><div class="dbc-stepn">STEP 03</div><h4>Get your plan</h4><p>No two results, and no two plans, are alike. It&#8217;s built around you, with concrete steps, at your own pace.</p></div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// dreambodyclub capability</span>No two results produce the same plan. The Index answers feed a personalised program engine that schedules workouts, meals and habits around the time she actually has &mdash; 10, 15 or 30 minutes a day &mdash; and adapts as her scores change. Recommendations are grounded in current research across fitness, nutrition and psychology, including recovery after birth.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// what&#8217;s in your plan</div>
        <h2>Everything you need,<br>always at hand</h2>
        <p class="flow-sub">A program that adapts to you &mdash; no overload, just concrete steps for the day. Your Index, your workouts and your meals, all in one place.</p>
      </div>
      <div class="dbcdash" id="dbcDash">
        <div class="dbcdash-copy">
          <div class="dbcdash-slide dbcdash-slide-on" data-screen="0">
            <h4>Your Health Index on one screen</h4>
            <p>You can see where you are. It&#8217;s clear what to do next.</p>
            <ul class="dbcdash-benefits">
              <li><i class="fa-solid fa-chart-line"></i><span>Your result across all four areas</span></li>
              <li><i class="fa-solid fa-arrow-trend-up"></i><span>A month of progress at a glance</span></li>
              <li><i class="fa-solid fa-circle-play"></i><span>Your next step is already queued</span></li>
            </ul>
          </div>
          <div class="dbcdash-slide" data-screen="1">
            <h4>Workouts from 5 minutes, whenever it suits</h4>
            <p>Matched to your level, no gym and no equipment. Any time of day.</p>
            <ul class="dbcdash-benefits">
              <li><i class="fa-solid fa-dumbbell"></i><span>589 workouts: strength, cardio, yoga, pilates</span></li>
              <li><i class="fa-solid fa-sliders"></i><span>Short formats for busy days</span></li>
              <li><i class="fa-solid fa-rotate"></i><span>The plan changes along with you</span></li>
            </ul>
          </div>
          <div class="dbcdash-slide" data-screen="2">
            <h4>No more wondering what to cook</h4>
            <p>Ready meal plans with recipes for the whole family.</p>
            <ul class="dbcdash-benefits">
              <li><i class="fa-solid fa-utensils"></i><span>Recipes for every taste, diet and skill level</span></li>
              <li><i class="fa-solid fa-check"></i><span>Calories counted, recipes tuned to your goal</span></li>
              <li><i class="fa-solid fa-heart"></i><span>Save favourites and the plan learns your tastes</span></li>
            </ul>
          </div>
        </div>
        <div class="dbcdash-browser">
          <div class="dbcdash-chrome"><span class="dbcdash-dots"><span></span><span></span><span></span></span><span class="dbcdash-url">dreambody.club</span></div>
          <div class="dbcdash-app">
            <nav class="dbcdash-sidebar">
              <div class="dbcdash-sb-logo"><i class="fa-solid fa-heart-pulse"></i></div>
              <button class="dbcdash-nav dbcdash-nav-on" data-screen="0"><i class="fa-solid fa-house"></i><span>Dashboard</span></button>
              <div class="dbcdash-sb-sec">Services</div>
              <button class="dbcdash-nav" data-screen="-1"><i class="fa-regular fa-calendar"></i><span>Programs</span></button>
              <button class="dbcdash-nav" data-screen="1"><i class="fa-solid fa-dumbbell"></i><span>Workouts</span></button>
              <button class="dbcdash-nav" data-screen="2"><i class="fa-solid fa-utensils"></i><span>Recipes</span></button>
              <div class="dbcdash-sb-sec">Community</div>
              <button class="dbcdash-nav" data-screen="-1"><i class="fa-solid fa-users"></i><span>Community</span></button>
              <button class="dbcdash-nav" data-screen="-1"><i class="fa-solid fa-book-open"></i><span>Knowledge</span></button>
            </nav>
            <div class="dbcdash-screens">
              <div class="dbcdash-screen dbcdash-screen-on" data-screen="0">
                <div class="dbcdash-scr-top"><span class="dbcdash-scr-title">Health Index <b>68</b><i>/ 100 &middot; Good base</i></span></div>
                <div class="dbcdash-pillars">
                  <div class="dbcdash-pill"><span class="dbcdash-pill-ic"><i class="fa-solid fa-person-running"></i></span><b>74</b><span class="dbcdash-pill-l">Movement</span></div>
                  <div class="dbcdash-pill"><span class="dbcdash-pill-ic"><i class="fa-solid fa-bowl-food"></i></span><b>62</b><span class="dbcdash-pill-l">Nutrition</span></div>
                  <div class="dbcdash-pill"><span class="dbcdash-pill-ic"><i class="fa-solid fa-brain"></i></span><b>65</b><span class="dbcdash-pill-l">Mind</span></div>
                  <div class="dbcdash-pill"><span class="dbcdash-pill-ic"><i class="fa-solid fa-moon"></i></span><b>71</b><span class="dbcdash-pill-l">Lifestyle</span></div>
                </div>
                <div class="dbcdash-rec">
                  <div class="dbcdash-rec-h">Recommended workouts <span>View library</span></div>
                  <div class="dbcdash-rec-row">
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th"></div><span>Upper body, no weights</span><i>Medium &middot; 24 min</i></div>
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th"></div><span>Full-body pilates</span><i>Medium &middot; 30 min</i></div>
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th"></div><span>Smart core work</span><i>Medium &middot; 22 min</i></div>
                  </div>
                  <div class="dbcdash-rec-h">Recommended meals <span>View library</span></div>
                  <div class="dbcdash-rec-row">
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th dbcdash-rec-th-a"></div><span>Cottage-cheese pancakes</span><i>358 kcal &middot; 20 min</i></div>
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th dbcdash-rec-th-b"></div><span>Chicken salad</span><i>480 kcal &middot; 25 min</i></div>
                    <div class="dbcdash-rec-c"><div class="dbcdash-rec-th dbcdash-rec-th-c"></div><span>Salmon with vegetables</span><i>420 kcal &middot; 25 min</i></div>
                  </div>
                </div>
              </div>
              <div class="dbcdash-screen" data-screen="1">
                <div class="dbc-lib dbcdash-lib">
                  <div class="dbc-lib-bar"><i class="fa-solid fa-dumbbell"></i> Workouts <span class="dbc-lib-count">589 workouts</span></div>
                  <div class="dbc-lib-body">
                    <div class="dbc-lib-side">
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Intensity</div><span class="dbc-chip">Low</span><span class="dbc-chip on">Medium</span><span class="dbc-chip">High</span></div>
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Time</div><span class="dbc-chip">15 min</span><span class="dbc-chip on">30 min</span><span class="dbc-chip">45 min</span></div>
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Body part</div><span class="dbc-chip">Full body</span><span class="dbc-chip on">Core</span><span class="dbc-chip">Glutes</span><span class="dbc-chip">Legs</span></div>
                    </div>
                    <div class="dbc-lib-grid">
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">24 min</span></div><div class="dbc-tile-b"><h5>Upper body, no weights</h5><div class="dbc-tile-meta">Medium &middot; Upper body</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">30 min</span></div><div class="dbc-tile-b"><h5>Full-body pilates</h5><div class="dbc-tile-meta">Medium &middot; no equipment</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">35 min</span></div><div class="dbc-tile-b"><h5>Glutes with dumbbells</h5><div class="dbc-tile-meta">High &middot; Legs</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">22 min</span></div><div class="dbc-tile-b"><h5>Smart core work</h5><div class="dbc-tile-meta">Medium &middot; Core</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">28 min</span></div><div class="dbc-tile-b"><h5>Elegant upper body</h5><div class="dbc-tile-meta">Medium &middot; dumbbells</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">34 min</span></div><div class="dbc-tile-b"><h5>Women&#8217;s strength: legs</h5><div class="dbc-tile-meta">Medium &middot; Legs</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dbcdash-screen" data-screen="2">
                <div class="dbc-lib dbcdash-lib">
                  <div class="dbc-lib-bar"><i class="fa-solid fa-utensils"></i> Recipes <span class="dbc-lib-count">316 recipes</span></div>
                  <div class="dbc-lib-body">
                    <div class="dbc-lib-side">
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Time</div><span class="dbc-chip on">&lt; 30 min</span><span class="dbc-chip">30&ndash;60</span><span class="dbc-chip">&gt; 60</span></div>
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Diet</div><span class="dbc-chip">Meat</span><span class="dbc-chip on">Vegetarian</span><span class="dbc-chip">Vegan</span><span class="dbc-chip">Fish</span></div>
                      <div class="dbc-lib-fg"><div class="dbc-lfl">Category</div><span class="dbc-chip on">Breakfast</span><span class="dbc-chip">Main</span><span class="dbc-chip">Salad</span><span class="dbc-chip">Dessert</span></div>
                    </div>
                    <div class="dbc-lib-grid">
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">380 kcal</span></div><div class="dbc-tile-b"><h5>Quinoa Buddha bowl</h5><div class="dbc-tile-meta">Main &middot; 25 min</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">290 kcal</span></div><div class="dbc-tile-b"><h5>Cottage-cheese pancakes with berries</h5><div class="dbc-tile-meta">Breakfast &middot; 20 min</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">320 kcal</span></div><div class="dbc-tile-b"><h5>Chicken salad</h5><div class="dbc-tile-meta">Salad &middot; 25 min</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">410 kcal</span></div><div class="dbc-tile-b"><h5>Avocado pasta</h5><div class="dbc-tile-meta">Main &middot; 30 min</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">248 kcal</span></div><div class="dbc-tile-b"><h5>Veggie omelette</h5><div class="dbc-tile-meta">Breakfast &middot; 12 min</div></div></div>
                      <div class="dbc-tile"><div class="dbc-tile-thumb"><span class="dbc-tile-tag">340 kcal</span></div><div class="dbc-tile-b"><h5>Berry pancakes</h5><div class="dbc-tile-meta">Breakfast &middot; 18 min</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dbcdash-prog"><div class="dbcdash-prog-fill" id="dbcDashProg"></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// dreambodyclub capability</span>One dashboard ties the platform together. The Health Index sets the priorities; the personalised plan schedules workouts, meals and habits around the time she actually has &mdash; 10, 15 or 30 minutes a day. The 589-workout and 316-recipe libraries feed it, every item calorie- and time-tagged, so movement and nutrition stop being separate chores and become a two-tap decision.</p>
  </div>

</div>
</div>
<script>
(function(){
  var subs=document.querySelectorAll('.dbc-sections .tc-cap-desc .tc-cap-k');
  if(subs.length&&'IntersectionObserver' in window){
    var o=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tc-k-in');o.unobserve(e.target);}});},{threshold:0.4});
    subs.forEach(function(el){o.observe(el);});
  }else{[].forEach.call(subs,function(el){el.classList.add('tc-k-in');});}
  var minis=[].slice.call(document.querySelectorAll('.dbc-fmini span'));
  if(minis.length){
    var fired=false;var fo=new IntersectionObserver(function(en){if(en[0].isIntersecting&&!fired){fired=true;fo.disconnect();minis.forEach(function(s,i){setTimeout(function(){s.style.width=s.getAttribute('data-v')+'%';},150+i*120);});}},{threshold:0.3});
    fo.observe(minis[0].closest('.dbc-four'));
  }
  var dash=document.getElementById('dbcDash');
  if(dash){
    var slides=[].slice.call(dash.querySelectorAll('.dbcdash-slide'));
    var screens=[].slice.call(dash.querySelectorAll('.dbcdash-screen'));
    var navs=[].slice.call(dash.querySelectorAll('.dbcdash-nav'));
    var prog=document.getElementById('dbcDashProg');
    var order=[0,1,2],idx=0,timer=null,raf=null,playing=false;
    function show(n){
      slides.forEach(function(el){el.classList.toggle('dbcdash-slide-on',+el.getAttribute('data-screen')===n);});
      screens.forEach(function(el){el.classList.toggle('dbcdash-screen-on',+el.getAttribute('data-screen')===n);});
      navs.forEach(function(el){el.classList.toggle('dbcdash-nav-on',+el.getAttribute('data-screen')===n);});
    }
    var DUR=4200;
    function cycle(){
      var n=order[idx];show(n);
      if(prog){prog.style.transition='none';prog.style.width='0%';void prog.offsetWidth;prog.style.transition='width '+DUR+'ms linear';prog.style.width='100%';}
      timer=setTimeout(function(){idx=(idx+1)%order.length;cycle();},DUR);
    }
    function start(){if(playing)return;playing=true;cycle();}
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(reduce){show(0);}
    else{
      var dobs=new IntersectionObserver(function(en){if(en[0].isIntersecting){dobs.disconnect();start();}},{threshold:0.3});
      dobs.observe(dash);
    }
  }
}());
<\/script>
` : (p.studio ? `
<div class="max-wrap">
<div class="tc-sections sv-sections">

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sec--flow">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// how it works</div>
        <h2>Launch a branded meeting<br>space in three steps</h2>
        <p class="flow-sub">No developers required. If you can paste a link into your site, you&#8217;re already done.</p>
      </div>
      <div class="sv-steps reveal">
        <div class="sv-step">
          <div class="sv-step-num"><b>1</b>Create a room</div>
          <h3>Pick a domain, brand it, set the rules.</h3>
          <p>Add your logo, set colours, write the waiting-room note. We provision a subdomain or point your own.</p>
          <div class="sv-step-vis">
            <div class="sv-vrow"><span class="sv-vlabel">Domain</span><span class="sv-vfield">meet.<b>yourbrand</b>.com</span></div>
            <div class="sv-vrow"><span class="sv-vlabel">Theme</span><span class="sv-swatches"><span style="background:#3a221c"></span><span style="background:#b04848"></span><span style="background:#FF4545;border-color:rgba(255,255,255,0.9)"></span><span style="background:#ffffff"></span></span></div>
          </div>
        </div>
        <div class="sv-step">
          <div class="sv-step-num"><b>2</b>Embed it</div>
          <h3>Drop one snippet into your website.</h3>
          <p>Paste an iframe or use a native block &mdash; works the same in any platform you already use.</p>
          <div class="sv-step-vis">
            <div class="sv-chips"><span class="sv-chip">Webflow</span><span class="sv-chip">WordPress</span><span class="sv-chip">Notion</span><span class="sv-chip">Framer</span><span class="sv-chip">Squarespace</span></div>
            <div class="sv-code">&lt;<b>studio-room</b> id="strategy"/&gt;</div>
          </div>
        </div>
        <div class="sv-step">
          <div class="sv-step-num"><b>3</b>Host instantly</div>
          <h3>Send a link. Start meeting. Get the recap.</h3>
          <p>Clients land on your branded page, join in a click, and you get an AI recap before they&#8217;re back at their desk.</p>
          <div class="sv-step-vis">
            <div class="sv-recap"><div class="k"><i class="fa-solid fa-wand-magic-sparkles"></i>Inbox &middot; 11:24</div><div class="v"><b>Recap ready</b> &mdash; 3 action items, full transcript.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// studio.video capability</span>Studio.video turns any website into a meeting space without code. The site owner brands a room, drops a single embed into Webflow, WordPress, Notion, Framer, Squarespace or raw HTML, and hosts instantly &mdash; with an AI recap delivered before the call has even finished.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal" style="max-width:660px">
        <div class="eyebrow">// capabilities</div>
        <h2>Everything you need in the room &mdash;<br>nothing you don&#8217;t</h2>
        <p class="flow-sub">A purpose-built feature set for serious 1:1, group and large-audience video &mdash; hosted in Europe and yours to brand end-to-end.</p>
      </div>
    </div>
    <div class="sv-capmq">
      <div class="sv-captrack" id="svCapTrack">
        <article class="sv-cap featured"><div class="sv-cap-ic"><i class="fa-solid fa-video"></i></div><div><h4>High-quality video</h4><p>1080p video for 250+ active participants. No lag, no drops.</p></div><div class="sv-cap-flag"><span class="dot"></span>250+ participants</div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-bolt"></i></div><div><h4>Instant access</h4><p>Guests click a link and they&#8217;re in. No installs, no logins.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-globe"></i></div><div><h4>On your own domain</h4><p>Run everything from meet.yourbrand.com &mdash; your trust, not ours.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-pen-ruler"></i></div><div><h4>Collaborative whiteboard</h4><p>Sketch, diagram and brainstorm together &mdash; live and shared.</p></div></article>
        <article class="sv-cap featured"><div class="sv-cap-ic"><i class="fa-solid fa-shield-halved"></i></div><div><h4>Privacy friendly</h4><p>100% European hosted. EU sub-processors only. Zero tracking.</p></div><div class="sv-cap-flag"><span class="dot"></span>EU &middot; zero tracking</div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-display"></i></div><div><h4>Screen sharing</h4><p>Share a full screen, a window, or a single tab in one click.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-file-arrow-up"></i></div><div><h4>File sharing</h4><p>Drop in a deck, PDF or image &mdash; instantly visible to everyone.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-circle-dot"></i></div><div><h4>HD recorder</h4><p>Record meetings in HD to the cloud, ready in your dashboard.</p></div></article>
        <article class="sv-cap featured"><div class="sv-cap-ic"><i class="fa-solid fa-palette"></i></div><div><h4>Custom branding</h4><p>Your logo, colours, copy and waiting room &mdash; Studio.video disappears.</p></div><div class="sv-cap-flag"><span class="dot"></span>White-label</div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-closed-captioning"></i></div><div><h4>Transcriptions</h4><p>Speaker-labelled transcripts in 30+ languages, searchable.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-wand-magic-sparkles"></i></div><div><h4>AI call summary</h4><p>A clean recap with action items emailed at the end of every call.</p></div></article>
        <article class="sv-cap"><div class="sv-cap-ic"><i class="fa-solid fa-mobile-screen"></i></div><div><h4>Mobile access</h4><p>Host, present and join from iOS and Android &mdash; in the browser.</p></div></article>
      </div>
      <button class="sv-cappause" id="svCapPause" type="button" aria-label="Pause"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg></button>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// studio.video capability</span>Twelve capabilities ship in every room &mdash; HD video for hundreds, whiteboard, screen and file sharing, HD recording, multilingual transcripts and an AI summary. All of it white-label and 100% European-hosted, so the brand on the door is the customer&#8217;s, not ours.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sv-bai-sec">
    <div class="sec-inner">
      <div class="flow-header reveal" style="max-width:680px">
        <div class="eyebrow">// white-label + studio ai</div>
        <h2>Your brand on the door.<br>Your meeting, organised by AI.</h2>
        <p class="flow-sub">Run everything from your own domain &mdash; clients land on a branded page, not a Studio.video one. Then let Studio AI handle the rest: every call ends with a clean recap, a transcript, action items and a follow-up email, drafted in your voice.</p>
      </div>
      <div class="bai-wrap reveal">
        <div class="bai-stage">
          <div class="wl-card">
            <div class="wl-room-bg">
              <div class="wl-video-bg"><iframe src="https://customer-4x18g7wq6et2wysi.cloudflarestream.com/e2e237d10b065a909b2cebe7445dfb8f/iframe?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=transparent" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="Branded waiting room"></iframe></div>
              <div class="wl-brand"><span class="gm">Y</span>Your Brand</div>
              <div class="wl-waiting">
                <div class="ring"></div>
                <h4>Your host will be with you shortly.</h4>
                <p>You are joining <b>Your Brand&#8217;s</b> private room.</p>
              </div>
            </div>
            <div class="wl-fields">
              <div class="wl-field"><label>Custom domain</label><div class="val"><i class="fa-solid fa-globe"></i>meet.yourbrand.com</div></div>
              <div class="wl-field"><label>Brand colour</label><div class="val"><span class="swatch" style="background:#3a221c"></span>#3A221C</div></div>
              <div class="wl-field"><label>Logo</label><div class="val"><i class="fa-solid fa-check" style="color:var(--sv-moss)"></i>yourlogo.svg</div></div>
              <div class="wl-field"><label>Waiting-room copy</label><div class="val" style="font-family:Inter,system-ui,sans-serif">Edited &middot; 2d ago</div></div>
            </div>
          </div>
          <div class="bai-ai-card">
            <div class="bai-ai-head">
              <span class="bai-ai-mark"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <div style="min-width:0;flex:1">
                <div class="bai-ai-title">Pricing review &middot; Northstar</div>
                <div class="bai-ai-meta">42 min &middot; just ended</div>
              </div>
              <span class="bai-ai-flag">Ready</span>
            </div>
            <div class="ai-tape">${(function(){var o='';for(var i=0;i<32;i++){var h=6+Math.round(18*Math.abs(Math.sin(i*0.45+1.2)));o+='<span style="height:'+h+'px;animation-delay:'+(i*70)+'ms"></span>';}return o;})()}</div>
            <div class="bai-ai-section"><div class="bai-ai-eyebrow">Summary &middot; 3 action items</div>Northstar approved the Q3 rate card. Priya flagged EU data residency for legal review Thursday.</div>
          </div>
          <div class="bai-domain-pill">
            <i class="fa-solid fa-globe"></i>
            <span class="tw"><b id="baiDomain">meet.yourbrand.com</b><span class="tw-caret"></span></span>
            <span class="bai-pill-dot"></span>
            <span style="color:var(--sv-moss);font-weight:600">SSL &middot; ready</span>
          </div>
          <div class="bai-embed-pill">
            <span class="bai-embed-eyebrow"><i class="fa-solid fa-code"></i> One-line embed</span>
            <code>&lt;<span style="color:#FF4545">studio-room</span> id=<span style="color:var(--sv-moss)">"<span id="baiEmbed">strategy</span>"</span><span class="tw-caret"></span>/&gt;</code>
          </div>
        </div>
        <div class="bai-bullets">
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-globe"></i></span><div><h4>Custom domain</h4><p>Point meet.yourbrand.com at us &mdash; we handle the SSL.</p></div></div>
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-palette"></i></span><div><h4>Logo, colours &amp; waiting room</h4><p>Your design system in two clicks. Studio.video disappears.</p></div></div>
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-code"></i></span><div><h4>Embed anywhere</h4><p>Drop one snippet into Webflow, WordPress, Notion or hand-written HTML.</p></div></div>
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-wand-magic-sparkles"></i></span><div><h4>AI summaries &amp; action items</h4><p>A clean recap with action items in your inbox before guests are at their desks.</p></div></div>
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-closed-captioning"></i></span><div><h4>Speaker-labelled transcripts</h4><p>Searchable, time-stamped, exportable. Find the one quote in 20 hours.</p></div></div>
          <div class="ai-bullet"><span class="b-mark"><i class="fa-solid fa-film"></i></span><div><h4>Meeting highlights</h4><p>30-second reels of the best moments &mdash; perfect for course replays.</p></div></div>
          <div class="bai-cta">
            <a class="bai-btn-primary" href="https://studio.video" target="_blank" rel="noopener">Get early access</a>
            <a class="bai-btn-ghost" href="https://studio.video" target="_blank" rel="noopener">See it live <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// studio.video capability</span>White-label is end-to-end &mdash; the room runs on the customer&#8217;s own domain with their logo, colours and waiting room, while Studio AI drafts the recap, transcript, action items and follow-up email automatically, in the host&#8217;s voice, before the guests are back at their desks.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal" style="max-width:660px">
        <div class="eyebrow">// use cases</div>
        <h2>Built for the way small<br>teams actually work</h2>
        <p class="flow-sub">From a single coach&#8217;s discovery call to a 5,000-seat webinar &mdash; Studio.video bends to fit, not the other way around. Any room flips into webinar mode with registration, moderated speakers, polls, Q&amp;A and breakouts.</p>
      </div>
      <div class="sv-cases reveal">
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-user-tie"></i></div><h4>Client consultations</h4><p>Branded 1:1 rooms &mdash; clients land on your domain, join from one page, and you get the recap.</p></div>
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-comments"></i></div><h4>Coaching calls</h4><p>Recurring private rooms with notes, recordings and follow-up emails done for you.</p></div>
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-tower-broadcast"></i></div><h4>Webinars</h4><p>Run live sessions for thousands with polls, Q&amp;A, registration and replay built in.</p></div>
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-object-group"></i></div><h4>Virtual workshops</h4><p>Breakouts, polls and shared whiteboards for hands-on group sessions.</p></div>
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-people-group"></i></div><h4>Team meetings</h4><p>Weekly stand-ups with shared agendas, summaries and decisions in one place.</p></div>
        <div class="sv-case"><div class="sv-case-ic"><i class="fa-solid fa-graduation-cap"></i></div><h4>Online courses</h4><p>Cohort-based teaching with recordings, transcripts and per-lesson rooms.</p></div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// studio.video capability</span>One platform spans the full range &mdash; intimate 1:1 consultations, recurring coaching, hands-on workshops, recurring team meetings, cohort courses and 5,000-seat webinars. Any room switches into webinar mode in a click, on the same branded domain.</p>
  </div>

  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec">
    <div class="sec-inner">
      <div class="flow-header reveal" style="max-width:680px;text-align:center;margin-left:auto;margin-right:auto">
        <div class="eyebrow">// integrations</div>
        <h2>Plays nicely with your stack</h2>
        <p class="flow-sub" style="margin-left:auto;margin-right:auto">Studio.video helps you build email lists, sync attendees and trigger follow-ups &mdash; push leads to your CRM, transcripts to your docs, and notify your team when a session wraps.</p>
      </div>
    </div>
    <div class="sv-mq-wrap" id="svMqWrap">${(function(){
      var P='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
      var IC={
        'Slack':'<rect x="4" y="14" width="10" height="4" rx="2"/><rect x="18" y="14" width="10" height="4" rx="2"/><rect x="14" y="4" width="4" height="10" rx="2"/><rect x="14" y="18" width="4" height="10" rx="2"/>',
        'Mailchimp':'<circle cx="16" cy="16" r="9"/><circle cx="13" cy="15" r="1.2" fill="currentColor"/><circle cx="19" cy="15" r="1.2" fill="currentColor"/><path d="M11 19c2 2 8 2 10 0"/>',
        'HubSpot':'<circle cx="22" cy="20" r="6"/><circle cx="8" cy="9" r="2.5"/><path d="M8 11.5v9"/><path d="M16 20l-6-4"/>',
        'Gmail':'<rect x="3" y="8" width="26" height="18" rx="2"/><path d="M3 10l13 9 13-9"/>',
        'Google Calendar':'<rect x="5" y="7" width="22" height="20" rx="2"/><path d="M5 13h22M11 4v6M21 4v6"/><text x="16" y="22" text-anchor="middle" font-size="9" fill="currentColor" stroke="none" font-family="ui-sans-serif" font-weight="700">31</text>',
        'Zapier':'<circle cx="16" cy="16" r="3" fill="currentColor" stroke="none"/><path d="M16 4v6M16 22v6M4 16h6M22 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M7 25l4-4"/>',
        'ClickUp':'<path d="M5 22l11-10 11 10"/><path d="M5 14l11-10 11 10"/>',
        'Asana':'<circle cx="16" cy="10" r="4"/><circle cx="9" cy="22" r="4"/><circle cx="23" cy="22" r="4"/>',
        'Notion':'<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M11 11l10 12V11"/>',
        'Stripe':'<path d="M22 10c-2-1-4-1.5-6-1.5-3 0-5 1-5 3 0 4 11 2 11 8 0 3-3 4.5-6 4.5-2 0-4-.5-6-1.5"/>',
        'Salesforce':'<path d="M9 22c-3 0-5-2-5-5s2-5 5-5c.5 0 1 .1 1.5.3.5-2.5 3-4.3 5.5-4.3 2 0 4 1.2 5 3 .5-.2 1-.3 1.5-.3 3 0 5 2 5 5s-2 5-5 5"/><path d="M9 22h14"/>',
        'Intercom':'<rect x="4" y="5" width="24" height="22" rx="4"/><path d="M9 11v10M14 9v14M18 9v14M23 11v10"/>',
        'GetResponse':'<circle cx="16" cy="16" r="11"/><path d="M11 14l5 5 5-9"/>',
        'Drip':'<path d="M16 4c-4 6-8 10-8 14a8 8 0 0 0 16 0c0-4-4-8-8-14z"/>',
        'Encharge':'<path d="M16 4l-8 16h8l-2 8 10-16h-8z"/>',
        'Webflow':'<path d="M4 9l4 14 5-10 4 10 5-10 3 10 3-14"/>',
        'Calendly':'<circle cx="16" cy="16" r="10"/><path d="M12 10l8 6-8 6z" fill="currentColor" stroke="none"/>',
        'WordPress':'<circle cx="16" cy="16" r="11"/><path d="M9 12l4 11 3-9 3 9 4-11"/>',
        'ActiveCampaign':'<path d="M4 8l12 8 12-8"/><path d="M4 16l12 8 12-8"/>',
        'Zoom':'<rect x="4" y="9" width="18" height="14" rx="2"/><path d="M22 13l6-3v12l-6-3z"/>'
      };
      var rowA=['Slack','Mailchimp','HubSpot','Gmail','Google Calendar','Zapier','ClickUp','Asana','Notion','Stripe'];
      var rowB=['Salesforce','Intercom','GetResponse','Drip','Encharge','Webflow','Calendly','WordPress','ActiveCampaign','Zoom'];
      function item(n){return '<div class="sv-intg"><span class="sv-intg-mark">'+P+(IC[n]||'')+'</svg></span><span class="sv-intg-name">'+n+'</span></div>';}
      function row(arr){var one=arr.map(item).join('');return one+one+one;}
      return '<div class="sv-mq"><div class="sv-mq-track">'+row(rowA)+'</div></div><div class="sv-mq"><div class="sv-mq-track rev">'+row(rowB)+'</div></div>';
    })()}
      <button class="sv-mq-toggle" id="svMqToggle" type="button" aria-label="Pause"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg></button>
    </div>
    <div class="sec-inner">
      <div class="sv-intg-miss"><span class="pl"><i class="fa-solid fa-plus"></i></span><span><b>Missing an integration?</b> Tell us and we&#8217;ll build it for you.</span></div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// studio.video capability</span>Studio.video pushes leads to your CRM, attendees to your email lists and transcripts to your docs &mdash; twenty native integrations across Slack, HubSpot, Mailchimp, Zapier, Calendly and more, so a finished session automatically triggers the follow-up.</p>
  </div>

</div>
</div>
<script>
(function(){
  var track=document.getElementById('svCapTrack');
  if(track){
    track.innerHTML+=track.innerHTML;
    var paused=false,last=null;
    function tick(t){if(last==null)last=t;var dt=Math.min((t-last)/1000,0.05);last=t;if(!paused){track.scrollLeft+=32*dt;var half=track.scrollWidth/2;if(track.scrollLeft>=half)track.scrollLeft-=half;}requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
    var pz=document.getElementById('svCapPause');
    var PL='<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>';
    var PA='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>';
    if(pz)pz.addEventListener('click',function(){paused=!paused;pz.innerHTML=paused?PL:PA;pz.setAttribute('aria-label',paused?'Play':'Pause');});
  }
  function typer(el,list){if(!el)return;var wi=0,ci=list[0].length,del=false;function step(){var full=list[wi];ci+=del?-1:1;if(ci<0)ci=0;if(ci>full.length)ci=full.length;el.textContent=full.slice(0,ci);var d=del?28:60;if(!del&&ci>=full.length){del=true;d=1700;}else if(del&&ci===0){del=false;wi=(wi+1)%list.length;d=420;}setTimeout(step,d);}setTimeout(step,1800);}
  typer(document.getElementById('baiDomain'),['meet.yourbrand.com','meet.atelier.studio','meet.northstar.io','meet.lumen.co']);
  typer(document.getElementById('baiEmbed'),['strategy','discovery','webinar','office-hours']);
  var mqWrap=document.getElementById('svMqWrap'),mqT=document.getElementById('svMqToggle');
  if(mqWrap&&mqT){
    var P2='<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>';
    var Q2='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>';
    mqT.addEventListener('click',function(){var p=mqWrap.classList.toggle('paused');mqT.innerHTML=p?P2:Q2;mqT.setAttribute('aria-label',p?'Play':'Pause');});
  }
})();
<\/script>
` : (p.productHero ? `
<div class="max-wrap">
<div class="tc-sections">
  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sec--scan-demo">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// see it in action</div>
        <h2>Scan any website<br>in under a minute</h2>
      </div>
      <div class="tc-scan-video reveal">
        <iframe id="tcScanVid" src="https://customer-4x18g7wq6et2wysi.cloudflarestream.com/252d80c9e6a25a98f07db24fcba4f8ce/iframe?autoplay=true&muted=true&loop=true&controls=false&preload=auto" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// trust center capability</span>The free compliance scanner audits any website in under 60 seconds &mdash; checking privacy, cookies, security headers, legal documents, analytics disclosure and accessibility. A visitor enters a domain and gets a 0&ndash;100 compliance score with every issue flagged and prioritised &mdash; no login, no credit card.</p>
  </div>
  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sec--flow">
    <div class="sec-inner">
      <div class="flow-header reveal">
        <div class="eyebrow">// how it works</div>
        <h2>What happens the moment<br>a visitor arrives</h2>
        <p class="flow-sub">Trust Center sits between every visitor and your compliance obligations &mdash; serving consent, managing data requests, and keeping your legal docs current. Automatically.</p>
      </div>
      <div class="flow-diagram" id="flowDiagram">
        <div class="flow-col flow-col--visitor">
          <div class="flow-visitor-card" id="flowVisitorCard">
            <div class="flow-vc-identity">
              <div class="flow-visitor-avatar"><i class="fa-solid fa-user"></i></div>
              <div class="flow-visitor-site">Your website</div>
              <div class="flow-plats">
                <span class="blogo" title="WordPress"><i class="fa-brands fa-wordpress"></i></span>
                <span class="blogo" title="Shopify"><i class="fa-brands fa-shopify"></i></span>
                <span class="blogo" title="Wix"><i class="fa-brands fa-wix"></i></span>
                <span class="blogo" title="HubSpot"><i class="fa-brands fa-hubspot"></i></span>
                <span class="blogo" title="Webflow"><i class="fa-brands fa-webflow"></i></span>
                <span class="blogo" title="Kajabi"><i class="fa-solid fa-k"></i></span>
              </div>
            </div>
            <div class="flow-vc-events">
              <div class="flow-visitor-sub">Visitor arrives</div>
              <div class="flow-trigger"><i class="fa-solid fa-cookie-bite"></i>Cookie consent fired</div>
              <div class="flow-trigger"><i class="fa-solid fa-envelope"></i>Data request received</div>
              <div class="flow-trigger"><i class="fa-solid fa-file-lines"></i>Legal page requested</div>
            </div>
          </div>
        </div>
        <div class="flow-connector"><div class="flow-connector-line" id="flowLine1"></div></div>
        <div class="flow-col flow-col--hub">
          <div class="flow-hub" id="flowHub">
            <div class="flow-hub-disc"><i class="fa-solid fa-shield-halved flow-hub-icon"></i></div>
            <div class="flow-hub-label">Trust Center</div>
          </div>
        </div>
        <div class="flow-connector"><div class="flow-connector-line" id="flowLine2"></div></div>
        <div class="flow-col flow-col--nodes">
          <div class="flow-nodes">
            <div class="flow-node" id="fnode-0"><i class="fa-solid fa-cookie-bite"></i><div class="flow-node-info"><span class="flow-node-label">Privacy &amp; Cookies</span><div class="flow-node-logos"><span class="fnl">IAB TCF 2.2</span><span class="fnl">ePrivacy</span></div></div></div>
            <div class="flow-node" id="fnode-1"><i class="fa-solid fa-gavel"></i><div class="flow-node-info"><span class="flow-node-label">Legal</span><div class="flow-node-logos"><span class="fnl">GDPR</span><span class="fnl">UK GDPR</span><span class="fnl">CCPA</span><span class="fnl">PIPEDA</span></div></div></div>
            <div class="flow-node" id="fnode-2"><i class="fa-solid fa-lock"></i><div class="flow-node-info"><span class="flow-node-label">Security &amp; Data</span><div class="flow-node-logos"><span class="blogo" title="AWS"><i class="fa-brands fa-aws"></i></span><span class="blogo" title="Cloudflare"><i class="fa-brands fa-cloudflare"></i></span><span class="blogo" title="Microsoft Azure"><i class="fa-brands fa-microsoft"></i></span><span class="blogo" title="Docker"><i class="fa-brands fa-docker"></i></span></div></div></div>
            <div class="flow-node" id="fnode-3"><i class="fa-solid fa-chart-bar"></i><div class="flow-node-info"><span class="flow-node-label">Analytics &amp; Ads</span><div class="flow-node-logos"><span class="blogo" title="Google Analytics"><i class="fa-brands fa-google"></i></span><span class="blogo" title="Meta Pixel"><i class="fa-brands fa-facebook-f"></i></span><span class="blogo" title="TikTok Ads"><i class="fa-brands fa-tiktok"></i></span><span class="blogo" title="LinkedIn Ads"><i class="fa-brands fa-linkedin-in"></i></span></div></div></div>
            <div class="flow-node" id="fnode-4"><i class="fa-solid fa-address-card"></i><div class="flow-node-info"><span class="flow-node-label">Data Requests</span><div class="flow-node-logos"><span class="fnl">DSAR</span><span class="blogo" title="Mailchimp"><i class="fa-brands fa-mailchimp"></i></span><span class="blogo" title="HubSpot"><i class="fa-brands fa-hubspot"></i></span><span class="blogo" title="Slack"><i class="fa-brands fa-slack"></i></span></div></div></div>
            <div class="flow-node" id="fnode-5"><i class="fa-solid fa-wheelchair"></i><div class="flow-node-info"><span class="flow-node-label">Accessibility</span><div class="flow-node-logos"><span class="fnl">WCAG 2.2</span><span class="fnl">ADA</span><span class="fnl">EN 301 549</span></div></div></div>
          </div>
        </div>
        <div class="flow-connector"><div class="flow-connector-line" id="flowLine3"></div></div>
        <div class="flow-col flow-col--outcomes">
          <div class="flow-outcome" id="fout-0">
            <div class="flow-outcome-icon"><i class="fa-solid fa-scale-balanced"></i></div>
            <div class="flow-outcome-title">You stay legal</div>
            <div class="flow-outcome-desc">Regulatory compliance auto-maintained across every jurisdiction your visitors come from.</div>
          </div>
          <div class="flow-outcome" id="fout-1">
            <div class="flow-outcome-icon"><i class="fa-solid fa-chart-line"></i></div>
            <div class="flow-outcome-title">Your ads perform</div>
            <div class="flow-outcome-desc">Consent signals preserved. Google Consent Mode v2 and IAB TCF 2.2 deployed and maintained.</div>
          </div>
          <div class="flow-outcome" id="fout-2">
            <div class="flow-outcome-icon"><i class="fa-solid fa-thumbs-up"></i></div>
            <div class="flow-outcome-title">Your customers trust you</div>
            <div class="flow-outcome-desc">Branded Trust Center on your domain. Transparent, current, always accessible.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// trust center capability</span>Trust Center intercepts every visitor interaction the instant it happens &mdash; firing region-aware cookie consent, routing data subject requests, and serving always-current legal documents. Compliance runs automatically across six categories, with no manual intervention from the site owner.</p>
  </div>
  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sec--globe">
    <div class="sec-inner">
      <div class="globe-grid">
        <div class="reveal">
          <div class="eyebrow">// global coverage</div>
          <h2>Protects you and your customers,<br><em style="font-style:italic">globally.</em></h2>
          <p>Privacy laws now affect more than one billion of your potential customers across Europe, the USA, Canada, Australia, and 49 other countries. We route the right compliance experience to the right visitor, automatically.</p>
          <div class="globe-stat">
            <div class="globe-metric"><span class="globe-metric-num" data-count="54" data-suffix="+">54+</span><span class="globe-metric-label">jurisdictions</span></div>
            <div class="globe-metric"><span class="globe-metric-num" data-count="1" data-suffix="bn+">1bn+</span><span class="globe-metric-label">customers covered</span></div>
            <div class="globe-metric"><span class="globe-metric-num" data-count="1" data-suffix="">1</span><span class="globe-metric-label">subscription</span></div>
          </div>
        </div>
        <div class="j-list">
          <div class="j-item"><span class="j-flag">&#127468;&#127463;</span><div><div class="j-name">United Kingdom</div><div class="j-law">UK GDPR &middot; PECR &middot; Enforced by the ICO</div></div><span class="j-status">COVERED</span></div>
          <div class="j-item"><span class="j-flag">&#127466;&#127482;</span><div><div class="j-name">European Union</div><div class="j-law">GDPR &middot; ePrivacy Directive</div></div><span class="j-status">COVERED</span></div>
          <div class="j-item"><span class="j-flag">&#127482;&#127480;</span><div><div class="j-name">United States</div><div class="j-law">CCPA/CPRA &middot; 20 state laws enforced &middot; FTC Act</div></div><span class="j-status">COVERED</span></div>
          <div class="j-item"><span class="j-flag">&#127464;&#127462;</span><div><div class="j-name">Canada</div><div class="j-law">PIPEDA &middot; Qu&eacute;bec Law 25</div></div><span class="j-status">COVERED</span></div>
          <div class="j-item"><span class="j-flag">&#127462;&#127482;</span><div><div class="j-name">Australia</div><div class="j-law">Privacy Act 1988 &middot; 2025 Amendments &middot; OAIC</div></div><span class="j-status">COVERED</span></div>
          <div class="j-item" style="background:rgba(20,184,166,0.04);border-color:var(--accent-border)"><span class="j-flag">&#127757;</span><div><div class="j-name">Global</div><div class="j-law">49+ additional jurisdictions via region-aware routing</div></div><span class="j-status">COVERED</span></div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// trust center capability</span>A single subscription extends compliance coverage across 54+ jurisdictions and more than a billion potential customers. Trust Center detects each visitor&#8217;s region and serves the correct consent experience and legal basis automatically &mdash; keeping brands compliant in every market they reach.</p>
  </div>
  <div class="tc-copied-block">
  <div class="tc-frame">
  <section class="sec sec--kb">
    <div class="sec-inner">
      <div class="kb-header reveal">
        <div>
          <div class="eyebrow">// knowledge base</div>
          <h2 class="kb-h2">A built-in compliance content engine.</h2>
          <p class="kb-p">An agent-driven article platform &mdash; 60+ plain-English guides on GDPR, CCPA, DSARs and accessibility, generated and kept current automatically. Browse the live library below.</p>
        </div>
        <a href="https://trustcenter.pro/articles" target="_blank" rel="noopener" class="kb-btn">Open the live library &rarr;</a>
      </div>
      <div class="kb-devices">
      <div class="kb-device reveal" id="kbDevice">
        <div class="kb-screen">
          <div class="kb-bar"><i class="fa-solid fa-shield-halved"></i> trustcenter.pro/articles</div>
          <div class="kb-app-head">
            <h3>Knowledge Base</h3>
            <p>60+ guides &middot; updated weekly</p>
          </div>
          <div class="kb-chips" id="kbChips">
            <button type="button" class="kb-chip active" data-cat="all">All</button>
            <button type="button" class="kb-chip" data-cat="gdpr">GDPR</button>
            <button type="button" class="kb-chip" data-cat="cookies">Cookies</button>
            <button type="button" class="kb-chip" data-cat="dsar">Data Requests</button>
            <button type="button" class="kb-chip" data-cat="security">Security</button>
            <button type="button" class="kb-chip" data-cat="ccpa">CCPA</button>
            <button type="button" class="kb-chip" data-cat="accessibility">Accessibility</button>
          </div>
          <div class="kb-list" id="kbList">
            <a class="kb-art" data-cat="gdpr" href="https://trustcenter.pro/articles/what-is-gdpr" target="_blank" rel="noopener"><span class="kb-art-tag">GDPR</span><div class="kb-art-h">What is GDPR and does it apply to my online business?</div><div class="kb-art-meta">5 min read</div></a>
            <a class="kb-art" data-cat="gdpr" href="https://trustcenter.pro/articles/gdpr-privacy-policy-requirements" target="_blank" rel="noopener"><span class="kb-art-tag">GDPR</span><div class="kb-art-h">What to include in a GDPR-compliant privacy policy</div><div class="kb-art-meta">6 min read</div></a>
            <a class="kb-art" data-cat="gdpr" href="https://trustcenter.pro/articles/legitimate-interests-vs-consent" target="_blank" rel="noopener"><span class="kb-art-tag">GDPR</span><div class="kb-art-h">Legitimate interests vs consent: which legal basis do you actually need?</div><div class="kb-art-meta">5 min read</div></a>
            <a class="kb-art" data-cat="cookies" href="https://trustcenter.pro/articles/cookie-consent-101" target="_blank" rel="noopener"><span class="kb-art-tag">Cookies</span><div class="kb-art-h">Cookie consent 101: what you actually need on your website</div><div class="kb-art-meta">5 min read</div></a>
            <a class="kb-art" data-cat="cookies" href="https://trustcenter.pro/articles" target="_blank" rel="noopener"><span class="kb-art-tag">Cookies</span><div class="kb-art-h">First-party vs third-party cookies, explained</div><div class="kb-art-meta">4 min read</div></a>
            <a class="kb-art" data-cat="dsar" href="https://trustcenter.pro/articles" target="_blank" rel="noopener"><span class="kb-art-tag">Data Requests</span><div class="kb-art-h">How to handle a data subject access request within 30 days</div><div class="kb-art-meta">7 min read</div></a>
            <a class="kb-art" data-cat="security" href="https://trustcenter.pro/articles" target="_blank" rel="noopener"><span class="kb-art-tag">Security</span><div class="kb-art-h">Security headers every website should set</div><div class="kb-art-meta">6 min read</div></a>
            <a class="kb-art" data-cat="ccpa" href="https://trustcenter.pro/articles" target="_blank" rel="noopener"><span class="kb-art-tag">CCPA</span><div class="kb-art-h">CCPA/CPRA: do US state privacy laws apply to you?</div><div class="kb-art-meta">6 min read</div></a>
            <a class="kb-art" data-cat="accessibility" href="https://trustcenter.pro/articles" target="_blank" rel="noopener"><span class="kb-art-tag">Accessibility</span><div class="kb-art-h">WCAG 2.2: a practical website accessibility checklist</div><div class="kb-art-meta">5 min read</div></a>
          </div>
          <div class="kb-empty" id="kbEmpty">No articles in this category yet.</div>
        </div>
      </div>
      <div class="kb-device kb-device--article reveal">
        <div class="kb-screen kb-screen--article">
          <div class="kb-bar"><i class="fa-solid fa-book-open"></i> trustcenter.pro/articles</div>
          <div class="kb-art-view">
            <div class="kb-art-back"><i class="fa-solid fa-arrow-left"></i> All articles</div>
            <span class="kb-art-view-tag">GDPR</span>
            <h3 class="kb-art-view-title">What is GDPR and does it apply to my online business?</h3>
            <div class="kb-art-view-meta">5 min read &middot; Updated May 2026</div>
            <div class="kb-art-view-body">
              <p>The General Data Protection Regulation governs how you collect, store, and use the personal data of anyone in the EU or UK &mdash; regardless of where your business is based.</p>
              <h4>Does it apply to me?</h4>
              <p>If your website has a single visitor from the EU or UK, GDPR applies. There is no minimum traffic threshold and no exemption for small businesses.</p>
              <ul>
                <li>You collect names, emails, or IP addresses</li>
                <li>You run analytics or advertising pixels</li>
                <li>You accept payments or store customer records</li>
              </ul>
              <h4>What you need in place</h4>
              <p>A clear privacy policy, a compliant cookie consent banner, and a process for handling data requests within 30 days. Trust Center Pro keeps all three current automatically.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
  </div>
  <p class="tc-cap-desc"><span class="tc-cap-k">// trust center capability</span>The knowledge base is an agent-driven content engine &mdash; plain-English guides on GDPR, CCPA, DSARs, cookies and accessibility, generated and kept current automatically. Visitors get clear answers; every brand gets an always-fresh compliance resource hosted on its own domain.</p>
  </div>
</div>
</div>
<script>
(function(){
  var fd=document.getElementById('flowDiagram'); if(!fd)return;
  var vc=document.getElementById('flowVisitorCard'),hub=document.getElementById('flowHub');
  var l1=document.getElementById('flowLine1'),l2=document.getElementById('flowLine2'),l3=document.getElementById('flowLine3');
  var nodes=[0,1,2,3,4,5].map(function(i){return document.getElementById('fnode-'+i);});
  var outs=[0,1,2].map(function(i){return document.getElementById('fout-'+i);});
  var fired=false;
  function run(){
    if(fired)return;fired=true;var t=[];
    t.push(setTimeout(function(){if(vc)vc.classList.add('active');},300));
    t.push(setTimeout(function(){if(l1)l1.classList.add('lit');},700));
    t.push(setTimeout(function(){if(hub)hub.classList.add('active');if(l2)l2.classList.add('lit');},1050));
    nodes.forEach(function(n,i){t.push(setTimeout(function(){if(n)n.classList.add('active');},1400+i*180));});
    t.push(setTimeout(function(){if(l3)l3.classList.add('lit');},1400));
    outs.forEach(function(o,i){t.push(setTimeout(function(){if(o)o.classList.add('active');},2650+i*220));});
    setTimeout(function(){
      t.forEach(clearTimeout);
      [vc,hub].forEach(function(el){if(el)el.classList.remove('active');});
      nodes.forEach(function(n){if(n)n.classList.remove('active');});
      outs.forEach(function(o){if(o)o.classList.remove('active');});
      [l1,l2,l3].forEach(function(l){if(l)l.classList.remove('lit');});
      fired=false;setTimeout(run,700);
    },7800);
  }
  var obs=new IntersectionObserver(function(en){if(en[0].isIntersecting){obs.disconnect();run();}},{threshold:0.2});
  obs.observe(fd);
})();
(function(){
  var nums=document.querySelectorAll('.globe-metric-num[data-count]');
  if(!nums.length)return;
  var done=false;
  function run(){if(done)return;done=true;nums.forEach(function(el){var target=parseInt(el.getAttribute('data-count'),10),suffix=el.getAttribute('data-suffix')||'';var t0=performance.now(),dur=1200;(function tick(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e)+suffix;if(p<1)requestAnimationFrame(tick);})(performance.now());});}
  var stat=document.querySelector('.globe-stat');
  if(!stat){run();return;}
  var obs=new IntersectionObserver(function(en){if(en[0].isIntersecting){obs.disconnect();run();}},{threshold:0.3});
  obs.observe(stat);
})();
(function(){
  var subs=document.querySelectorAll('.tc-cap-desc .tc-cap-k');
  if(!subs.length)return;
  if(!('IntersectionObserver' in window)){subs.forEach(function(el){el.classList.add('tc-k-in');});return;}
  var obs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tc-k-in');obs.unobserve(e.target);}});},{threshold:0.4});
  subs.forEach(function(el){obs.observe(el);});
})();
(function(){
  var el=document.querySelector('.cs-metric-count[data-count]');
  if(!el)return;
  var target=parseInt(el.getAttribute('data-count'),10),suffix=el.getAttribute('data-suffix')||'',done=false;
  function run(){if(done)return;done=true;var t0=performance.now(),dur=1400;(function tick(now){var p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e)+suffix;if(p<1)requestAnimationFrame(tick);})(performance.now());}
  var obs=new IntersectionObserver(function(en){if(en[0].isIntersecting){obs.disconnect();run();}},{threshold:0.3});
  obs.observe(el);
})();
(function(){
  var chips=document.getElementById('kbChips'); if(!chips)return;
  var list=document.getElementById('kbList'),empty=document.getElementById('kbEmpty');
  var arts=list?[].slice.call(list.querySelectorAll('.kb-art')):[];
  chips.addEventListener('click',function(e){
    var btn=e.target.closest('.kb-chip'); if(!btn)return;
    var cat=btn.getAttribute('data-cat');
    [].forEach.call(chips.querySelectorAll('.kb-chip'),function(c){c.classList.remove('active');});
    btn.classList.add('active');
    var shown=0;
    arts.forEach(function(a){var m=(cat==='all'||a.getAttribute('data-cat')===cat);a.style.display=m?'block':'none';if(m)shown++;});
    if(empty)empty.style.display=shown?'none':'block';
    if(list)list.scrollTop=0;
  });
})();
<\/script>
` : `
<div class="max-wrap">
  <div class="section">
    <h2 class="title reveal">${p.capsTitle}</h2>
    <p class="sub reveal">${p.capsSub}</p>
    <div class="cap-tabs reveal">${tabBtns}</div>
    <div class="cap-panels">${tabPanels}</div>
  </div>
</div>
`))}

<hr class="divider">

<!-- ⑦ Website / Platform section (hidden on product-hero case studies — LCE-10000274) -->
${!p.productHero ? `<div class="max-wrap">
  <div class="section">
    <div class="website-split">
      <div class="website-img reveal">
        <img src="${p.shot}" alt="${p.shotAlt}" loading="lazy">
      </div>
      <div class="website-text reveal">
        <p class="lbl">${p.websiteLabel}</p>
        <h2 class="title">${p.websiteTitle}</h2>
        <div class="website-body">${websiteParas}</div>
        <p class="funnel-label">${p.funnelLabel}</p>
        <ul class="funnel">${funnelItems}</ul>
      </div>
    </div>
  </div>
</div>

<hr class="divider">` : ''}

<!-- ⑧ The Results -->
${(p.results && p.results.length) ? `<div class="max-wrap">
  <div class="section">
    <p class="lbl reveal">${p.resultsLabel}</p>
    <h2 class="title reveal">${p.resultsTitle}</h2>
    <div class="results-grid">${resultsHtml}</div>
  </div>
</div>

<hr class="divider">` : ''}

<!-- ⑩ Trusted by serious leaders -->
<div class="max-wrap">
  <div class="section">
    <p class="testi-lede reveal">${p.calloutSub}</p>
    <h2 class="testi-h reveal">Trusted by <span class="amber">serious leaders</span></h2>
    <div class="testi-slider">
      <div class="testi-slides">${sliderHtml}</div>
      <div class="testi-dots">${dotsHtml}</div>
    </div>
    <div class="tgrid tgrid-3">${staticTestiHtml}</div>
  </div>
</div>

<!-- ⑪ Logo marquee -->
<div class="marquee" style="padding:2rem 0">
  <div class="marquee-track">${logoHtml}</div>
</div>

<hr class="divider">

<!-- ⑫ CTA -->
<div class="max-wrap">
  <div class="section">
    <div class="cta-box reveal">
      <h2 class="title">${p.ctaTitle}</h2>
      <a href="${SURVEY_URL}" class="btn-cta">${p.ctaBtn} &rarr;</a>
      <p class="cta-sub1">${p.ctaSub1}</p>
      <p class="cta-sub2">${p.ctaSub2}</p>
    </div>
  </div>
</div>

${siteFooter()}

<script>
(function(){
  var tabs = document.querySelectorAll('.cap-tab');
  var panels = document.querySelectorAll('.cap-panel');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      var i = t.dataset.tab;
      tabs.forEach(function(x){x.classList.remove('active');});
      panels.forEach(function(x){x.classList.remove('active');});
      t.classList.add('active');
      var panel = document.querySelector('[data-panel="'+i+'"]');
      panel.classList.add('active');
      var ifr = panel.querySelector('iframe');
      if (ifr) { var b = ifr.src.split('?')[0]; ifr.src = b + '?controls=true&autoplay=true&muted=true'; }
    });
  });
}());
(function(){
  var counters = document.querySelectorAll('.result-n[data-count]');
  if (counters.length) {
    var done = false;
    function runCounters() {
      if (done) return; done = true;
      counters.forEach(function(el) {
        var target = parseInt(el.dataset.count, 10);
        var prefix = el.dataset.prefix || '';
        var suffix = el.dataset.suffix || '';
        var start = performance.now();
        var dur = 1600;
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
    var io2 = new IntersectionObserver(function(entries) {
      if (entries.some(function(e){ return e.isIntersecting; })) runCounters();
    }, { threshold: 0.4 });
    counters.forEach(function(el){ io2.observe(el); });
  }
}());
(function(){
  var slides = document.querySelectorAll('.testi-slide');
  var dots   = document.querySelectorAll('.testi-dot');
  if (!slides.length) return;
  var cur = 0;
  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
  }
  var timer = setInterval(function(){ goTo(cur + 1); }, 7000);
  dots.forEach(function(d, i) {
    d.addEventListener('click', function() {
      clearInterval(timer);
      timer = setInterval(function(){ goTo(cur + 1); }, 7000);
      goTo(i);
    });
  });
}());
(function(){
  var track = document.querySelector('.marquee-track');
  if (!track) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var pos = 0, paused = false, lastTs = null;
  function step(ts) {
    if (!paused) {
      if (lastTs !== null) {
        pos -= 50 * (ts - lastTs) / 1000;
        var half = track.scrollWidth / 2;
        if (pos <= -half) pos += half;
        track.style.transform = 'translateX(' + pos + 'px)';
      }
      lastTs = ts;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  var wrap = track.parentElement;
  wrap.addEventListener('mouseenter', function() { paused = true; lastTs = null; });
  wrap.addEventListener('mouseleave', function() { paused = false; });
}());
<\/script>
</body>
</html>`;
}

export { css, siteHeader, siteFooter, PROJECTS, caseStudy };
