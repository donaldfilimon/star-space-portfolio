#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$ROOT"
export VITE_BASE="${VITE_BASE:-/}"
npm run build
cp -R dist/. "$TMP/"
cp "$TMP/index.html" "$TMP/404.html"
touch "$TMP/.nojekyll"
echo "donaldfilimon.com" > "$TMP/CNAME"

git -C "$TMP" init -q
git -C "$TMP" checkout -q -b gh-pages
git -C "$TMP" add -A
git -C "$TMP" -c user.name='Donald Filimon' -c user.email='cbkshadow@icloud.com' commit -q -m "Deploy Star Space portfolio to user site root"
git -C "$TMP" remote add origin "https://github.com/donaldfilimon/donaldfilimon.github.io.git"
git -C "$TMP" push -f origin gh-pages

# A heredoc body starts on the line after the command that opens it, so it
# must sit between the `if` line and `then`. Placing the bodies after `fi`
# made this block unparseable: bash died with a syntax error right after the
# force-push above, so Pages settings were never applied and deploy:all
# stopped before deploy-pages.sh.
if gh api -X PUT repos/donaldfilimon/donaldfilimon.github.io/pages --input - >/dev/null 2>&1 <<'JSON'
{"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}
JSON
then
  echo "Pages source set to gh-pages branch."
else
  echo "Note: configure Pages source manually if needed."
fi

if gh api -X PUT repos/donaldfilimon/donaldfilimon.github.io/pages --input - >/dev/null 2>&1 <<'JSON'
{"cname":"donaldfilimon.com"}
JSON
then
  echo "Custom domain CNAME queued (requires DNS: donaldfilimon.com -> donaldfilimon.github.io)."
else
  echo "Note: set the custom domain under the repo's Pages settings if needed."
fi

echo "Deployed to https://donaldfilimon.github.io/"
