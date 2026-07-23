#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$ROOT"
export VITE_BASE="${VITE_BASE:-/star-space-portfolio/}"
npm run build
cp -R dist/. "$TMP/"
touch "$TMP/.nojekyll"

git -C "$TMP" init -q
git -C "$TMP" checkout -q -b gh-pages
git -C "$TMP" add -A
git -C "$TMP" -c user.name='Donald Filimon' -c user.email='cbkshadow@icloud.com' commit -q -m "Deploy Star Space portfolio"
git -C "$TMP" remote add origin "$(git -C "$ROOT" remote get-url origin)"
git -C "$TMP" push -f origin gh-pages

echo "Deployed to https://donaldfilimon.github.io/star-space-portfolio/"
