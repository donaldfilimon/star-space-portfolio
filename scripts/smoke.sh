#!/usr/bin/env bash
set -euo pipefail

npm run typecheck
npm test
npm run build

root_html="$(curl -sfL https://donaldfilimon.github.io/)"
printf '%s' "$root_html" | grep -qi "Donald Filimon"

curl -sfL https://donaldfilimon.github.io/star-space-portfolio/ >/dev/null

og_status="$(curl -sS -o /dev/null -w "%{http_code}" https://donaldfilimon.github.io/og.png || true)"
if [[ "$og_status" != "200" ]]; then
  echo "smoke: og.png returned ${og_status:-error} — run npm run deploy:root with write access to donaldfilimon.github.io" >&2
  exit 1
fi

echo "smoke: ok"
