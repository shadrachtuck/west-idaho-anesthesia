<?php
/**
 * Run with WP-CLI on the server (not via web):
 *
 *   FAUST_FRONTEND_URL='http://YOUR_IP:8080' wp eval-file scripts/faust-update-frontend-uri.php \
 *     --path=/var/www/west-idaho-anesthesia/app/public --allow-root
 *
 * Updates FaustWP option faustwp_settings[frontend_uri] so public redirects stop sending
 * users to http://localhost:3000 left over from local development.
 */
if (! defined('ABSPATH')) {
    fwrite(STDERR, "Run via WP-CLI: wp eval-file scripts/faust-update-frontend-uri.php --path=/path/to/wordpress\n");
    exit(1);
}

$url = getenv('FAUST_FRONTEND_URL');
if (empty($url)) {
    fwrite(STDERR, "Set FAUST_FRONTEND_URL to your public Next.js URL (e.g. http://64.23.192.136:8080)\n");
    exit(1);
}

$settings = get_option('faustwp_settings', []);
$before = $settings['frontend_uri'] ?? '';
$settings['frontend_uri'] = untrailingslashit($url);
update_option('faustwp_settings', $settings);

echo "faustwp_settings[frontend_uri] updated.\n";
echo "  before: " . ($before !== '' ? $before : '(empty)') . "\n";
echo "  after:  " . $settings['frontend_uri'] . "\n";
