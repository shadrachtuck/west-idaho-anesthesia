#!/usr/bin/env bash
# Run once on the production droplet (as root) after fixing DB_* in app/public/wp-config.php.
# Copies that file to /etc/west-idaho/wp-config.php (chmod 600). Deploy then always reapplies
# this copy after git checkout, so Git cannot overwrite production credentials.
#
# Usage:
#   sudo bash scripts/ensure-canonical-wp-config.sh
#   sudo bash scripts/ensure-canonical-wp-config.sh /path/to/wp-config.php /etc/west-idaho/wp-config.php

set -euo pipefail
SRC="${1:-/var/www/west-idaho-anesthesia/app/public/wp-config.php}"
DEST="${2:-/etc/west-idaho/wp-config.php}"

if [ ! -f "$SRC" ]; then
  echo "Source not found: $SRC" >&2
  exit 1
fi

install -d "$(dirname "$DEST")"
cp -a "$SRC" "$DEST"
chmod 600 "$DEST"
echo "Saved canonical wp-config to $DEST — edit that file for production DB settings; deploy copies it over the repo path each run."
