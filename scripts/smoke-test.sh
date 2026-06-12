#!/bin/bash
# smoke test for mdl-site — motivation.digital marketing site
# Exercises home, portfolio, a case study, robots.txt, and sitemap.
BASE="${MDL_SITE_HOST:-https://motivation.digital}"
PASS=0; FAIL=0

checkcode() {
  local url="$1" want="$2" desc="$3"
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$CODE" = "$want" ]; then
    echo "PASS GET $url → $CODE ($desc)"; PASS=$((PASS+1))
  else
    echo "FAIL GET $url — expected $want got $CODE ($desc)"; FAIL=$((FAIL+1))
  fi
}

checkbody() {
  local url="$1" needle="$2" desc="$3"
  RESP=$(curl -s "$url")
  if echo "$RESP" | grep -qF "$needle"; then
    echo "PASS GET $url contains '$needle' ($desc)"; PASS=$((PASS+1))
  else
    echo "FAIL GET $url — expected to contain '$needle' ($desc)"; FAIL=$((FAIL+1))
  fi
}

# 1. Home page
checkcode "$BASE/" "200" "home page"
checkbody "$BASE/" "Motivation Digital" "brand name present"

# 2. Portfolio
checkcode "$BASE/work" "200" "portfolio"
checkbody "$BASE/work" "fitness-platform-physiotherapy" "case study link present"

# 3. A case study (prerendered at build time — src/pages/work/[slug].astro, LCE-10000426)
checkcode "$BASE/work/fitness-platform-physiotherapy" "200" "case study page"
checkbody "$BASE/work/fitness-platform-physiotherapy" "BeMobile" "case study content present"

# 4. robots.txt
checkcode "$BASE/robots.txt" "200" "robots.txt"
checkbody "$BASE/robots.txt" "User-agent" "robots.txt has User-agent"

# 5. Sitemap
checkcode "$BASE/sitemap.xml" "200" "sitemap"
checkbody "$BASE/sitemap.xml" "<urlset" "sitemap has urlset"

# 6. CSS is inlined (no external _astro/*.css reference that would break under the seo-motivation catch-all)
HOME_HTML=$(curl -s "$BASE/")
if echo "$HOME_HTML" | grep -qE '_astro/.*\.css'; then
  echo "FAIL home references external _astro CSS (should be inlined)"; FAIL=$((FAIL+1))
else
  echo "PASS home CSS is inlined (no _astro/*.css reference)"; PASS=$((PASS+1))
fi

echo ""
echo "=== mdl-site: $PASS passed, $FAIL failed ==="
[ $FAIL -eq 0 ]
