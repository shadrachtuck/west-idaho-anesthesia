#!/usr/bin/env bash
# Run ACF JSON export from the monorepo root (no WordPress DB required).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/app/public"
exec php wp-content/plugins/wia-site-data/bin/export-acf-json.php
