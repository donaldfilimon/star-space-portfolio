#!/usr/bin/env bash
set -euo pipefail

npm run typecheck
npm run build

curl -sfL https://donaldfilimon.github.io/ | grep -q "DONALD"
curl -sfL https://donaldfilimon.github.io/star-space-portfolio/ >/dev/null

og_status="$(curl -sS -o /dev/null -w "%{http_code}" https://donaldfilimon.github.io/og.png || true)"
if [[ "$og_status" != "200" ]]; then
  echo "smoke: og.png returned ${og_status:-error} — run npm run deploy:root with write access to donaldfilimon.github.io" >&2
  exit 1
fi

echo "smoke: ok"
