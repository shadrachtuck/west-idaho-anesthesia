<?php
/**
 * Writes acf-json/group_wia_home.json — no WordPress or MySQL required.
 *
 * From WordPress root (app/public):
 *
 *   php wp-content/plugins/wia-site-data/bin/export-acf-json.php
 *
 * WP-CLI is optional: `wp eval-file` loads WordPress and needs a running DB.
 * This script only uses PHP’s json_encode on the field-group arrays.
 */

$plugin_dir = dirname( __DIR__ );
require_once $plugin_dir . '/includes/wia-home-field-group-definition.php';

$dir = $plugin_dir . '/acf-json';
if ( ! is_dir( $dir ) ) {
	mkdir( $dir, 0755, true );
}

$path = $dir . '/group_wia_home.json';
$json = json_encode(
	wia_site_data_get_home_field_group(),
	JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);

if ( false === $json ) {
	fwrite( STDERR, "json_encode failed.\n" );
	exit( 1 );
}

file_put_contents( $path, $json );

echo "Wrote {$path}\n";
