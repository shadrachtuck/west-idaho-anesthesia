#!/usr/bin/env bash
# Update FaustWP "Front-end site URL" (frontend_uri) on the server so WordPress stops
# redirecting visitors to http://localhost:3000.
#
# Usage:
#   sudo bash scripts/faust-set-frontend-url.sh 'http://YOUR_PUBLIC_IP:8080'
#   sudo bash scripts/faust-set-frontend-url.sh 'http://YOUR_PUBLIC_IP:8080' /var/www/west-idaho-anesthesia/app/public
#
set -euo pipefail
FRONTEND_URL="${1:?Pass the public Next.js URL, e.g. http://64.23.192.136:8080}"
WP_PATH="${2:-/var/www/west-idaho-anesthesia/app/public}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v wp >/dev/null 2>&1; then
  echo "wp-cli not found. Install: https://wp-cli.org/#installing" >&2
  exit 1
fi

export FAUST_FRONTEND_URL="$FRONTEND_URL"
ALLOW_ROOT=()
if [[ "${EUID:-0}" -eq 0 ]]; then
  ALLOW_ROOT=(--allow-root)
fi
wp eval-file "$REPO_ROOT/scripts/faust-update-frontend-uri.php" --path="$WP_PATH" "${ALLOW_ROOT[@]}"

echo "Done. Test: curl -sI \"http://127.0.0.1/\" | grep -i location"
echo "(If redirects still enabled, Location should point at your Next URL, not localhost:3000.)"
