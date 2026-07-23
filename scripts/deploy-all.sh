#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
bash "$ROOT/scripts/deploy-root.sh"
bash "$ROOT/scripts/deploy-pages.sh"
