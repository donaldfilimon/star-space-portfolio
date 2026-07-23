#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$ROOT"
cat > "$TMP/index.html" <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0;url=https://donaldfilimon.github.io/" />
    <link rel="canonical" href="https://donaldfilimon.github.io/" />
    <title>Donald Filimon — redirecting</title>
    <script>location.replace("https://donaldfilimon.github.io/");</script>
  </head>
  <body>
    <p><a href="https://donaldfilimon.github.io/">Continue to Donald Filimon — Star Space</a></p>
  </body>
</html>
EOF
cp "$TMP/index.html" "$TMP/404.html"
touch "$TMP/.nojekyll"

git -C "$TMP" init -q
git -C "$TMP" checkout -q -b gh-pages
git -C "$TMP" add -A
git -C "$TMP" -c user.name='Donald Filimon' -c user.email='cbkshadow@icloud.com' commit -q -m "Redirect project Pages URL to user site root"
git -C "$TMP" remote add origin "$(git -C "$ROOT" remote get-url origin)"
git -C "$TMP" push -f origin gh-pages

echo "Redirect live at https://donaldfilimon.github.io/star-space-portfolio/"
