#!/usr/bin/env bash
# Idempotent-ish installer for Ubuntu 22.04/24.04 (DigitalOcean droplet):
#   - nginx, MySQL, PHP-FPM (WordPress stack)
#   - Node.js 20 + PM2 (Next.js / Faust frontend)
#   - Database + docroot for WordPress; nginx site configs
#
# Usage (as root):
#   curl -fsSL ... | bash   OR   bash scripts/setup-server.sh
#
# Optional environment:
#   WP_ROOT          WordPress files (default: /var/www/wordpress)
#   WP_DB_NAME       (default: wordpress)
#   WP_DB_USER       (default: wordpress)
#   WP_DB_PASS       if unset, a random password is generated and printed once
#   FRONTEND_ROOT    path to git clone with frontend/ (default: /var/www/west-idaho-anesthesia)
#   INSTALL_WP_CLI   set to 1 to install wp-cli.phar to /usr/local/bin/wp

set -euo pipefail

WP_ROOT="${WP_ROOT:-/var/www/wordpress}"
FRONTEND_ROOT="${FRONTEND_ROOT:-/var/www/west-idaho-anesthesia}"
WP_DB_NAME="${WP_DB_NAME:-wordpress}"
WP_DB_USER="${WP_DB_USER:-wordpress}"
INSTALL_WP_CLI="${INSTALL_WP_CLI:-0}"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run as root (sudo bash $0)" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

echo "==> apt update / install base packages"
apt-get update -qq
apt-get install -y -qq \
  ca-certificates curl gnupg software-properties-common \
  nginx \
  mysql-server \
  php-fpm php-mysql php-xml php-mbstring php-curl php-zip php-gd php-intl php-cli

echo "==> Node.js 20 (NodeSource) + PM2"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
node -v
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi
pm2 -v

if [[ "${INSTALL_WP_CLI}" == "1" ]]; then
  echo "==> wp-cli"
  if ! command -v wp >/dev/null 2>&1; then
    curl -fsSL -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x /usr/local/bin/wp
  fi
  wp --info --allow-root 2>/dev/null | head -3 || true
fi

echo "==> WordPress docroot + permissions"
mkdir -p "$WP_ROOT"
chown -R www-data:www-data "$WP_ROOT"
find "$WP_ROOT" -type d -exec chmod 755 {} \;
find "$WP_ROOT" -type f -exec chmod 644 {} \; 2>/dev/null || true

PHP_SOCK="$(ls /run/php/php*-fpm.sock 2>/dev/null | head -n1 || true)"
if [[ -z "$PHP_SOCK" ]]; then
  echo "PHP-FPM socket not found under /run/php — start php-fpm:" >&2
  systemctl enable --now "php$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')-fpm" 2>/dev/null || systemctl enable --now php-fpm
  PHP_SOCK="$(ls /run/php/php*-fpm.sock 2>/dev/null | head -n1)"
fi
if [[ -z "$PHP_SOCK" ]]; then
  echo "Could not detect php-fpm socket." >&2
  exit 1
fi
echo "Using PHP socket: $PHP_SOCK"

if [[ -z "${WP_DB_PASS:-}" ]]; then
  WP_DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
  echo "--------------------------------------------------------------------"
  echo "Generated MySQL password for user '${WP_DB_USER}' (save securely):"
  echo "$WP_DB_PASS"
  echo "--------------------------------------------------------------------"
fi

echo "==> MySQL database + user"
mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS \`${WP_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${WP_DB_USER}'@'localhost' IDENTIFIED BY '${WP_DB_PASS}';
GRANT ALL PRIVILEGES ON \`${WP_DB_NAME}\`.* TO '${WP_DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

echo "==> nginx: WordPress site (port 80)"
install -d /etc/nginx/sites-available /etc/nginx/sites-enabled
cat > /etc/nginx/sites-available/west-idaho-wordpress <<NGINX
# WordPress — PHP. GraphQL for Faust: ${WP_ROOT}/index.php?graphql (via WPGraphQL plugin)
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root ${WP_ROOT};
    index index.php index.html;

    client_max_body_size 64M;

    location / {
        try_files \$uri \$uri/ /index.php?\$args;
    }

    location ~ \\.php\$ {
        include fastcgi.conf;
        fastcgi_pass unix:${PHP_SOCK};
    }

    location ~* /(?:uploads|files)/.*\\.php\$ {
        deny all;
    }
}
NGINX

cat > /etc/nginx/sites-available/west-idaho-frontend-proxy <<'NGINX'
# Next.js (PM2) on 127.0.0.1:3000 — browse at http://SERVER_IP:8080/
# (Port 80 is WordPress above; avoids clashing roots on one hostname.)
server {
    listen 8080;
    listen [::]:8080;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Disable default site if present; enable ours
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/west-idaho-wordpress /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/west-idaho-frontend-proxy /etc/nginx/sites-enabled/

nginx -t
systemctl enable nginx
systemctl reload nginx

PHP_VER="$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
systemctl enable --now nginx mysql "php${PHP_VER}-fpm" 2>/dev/null || {
  systemctl enable --now nginx mysql
  systemctl restart "php${PHP_VER}-fpm" || systemctl restart php-fpm
}

echo ""
echo "==> Done."
echo "WordPress files:     $WP_ROOT  (add WordPress core + wp-config.php, or use: wp core download --path=$WP_ROOT)"
echo "MySQL database:      $WP_DB_NAME / user $WP_DB_USER"
echo "Frontend repo path:  $FRONTEND_ROOT"
echo ""
echo "Public URLs (IP-only):"
echo "  WordPress (CMS):    http://YOUR_IP/           (port 80)"
echo "  Next.js (Faust):    http://YOUR_IP:8080/      (nginx → PM2 :3000)  OR  http://YOUR_IP:3000/  direct"
echo ""
echo "Set NEXT_PUBLIC_WORDPRESS_URL in frontend/.env.production to match how browsers/Node reach WP,"
echo "e.g. http://127.0.0.1 if WP and Next run on the same droplet (SSR to GraphQL)."
echo "PM2 (after build):   cd $FRONTEND_ROOT/frontend && pm2 start npm --name wia-frontend -- start"
