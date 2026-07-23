#!/usr/bin/env bash
set -euo pipefail

npm run typecheck
npm run build

root_html="$(curl -sfL https://donaldfilimon.github.io/)"
printf '%s' "$root_html" | grep -q "DONALD"

# Legacy path should redirect or still serve the portfolio shell.
curl -sfL https://donaldfilimon.github.io/star-space-portfolio/ >/dev/null

og_status="$(curl -sf -o /dev/null -w "%{http_code}" https://donaldfilimon.github.io/og.png || true)"
if [[ "$og_status" != "200" ]]; then
  echo "smoke: warning og.png returned ${og_status:-error} (redeploy if missing)" >&2
fi

echo "smoke: ok"
