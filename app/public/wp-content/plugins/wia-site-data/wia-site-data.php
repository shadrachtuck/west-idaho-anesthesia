<?php
/**
 * Plugin Name:       WIA Site Data (ACF)
 * Description:       Registers ACF field groups for West Idaho Anesthesia homepage content, exposed to WPGraphQL. Hero carousel uses a Repeater field (requires ACF PRO).
 * Version:           1.0.0
 * Author:            West Idaho Anesthesia
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Text Domain:       wia-site-data
 *
 * @package WiaSiteData
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/includes/wia-home-field-group-definition.php';

/**
 * Register ACF JSON save point (optional — lets you sync from ACF Tools → Sync).
 */
add_filter(
	'acf/settings/save_json',
	function ( $path ) {
		return __DIR__ . '/acf-json';
	}
);

add_filter(
	'acf/settings/load_json',
	function ( $paths ) {
		unset( $paths[0] );
		$paths[] = __DIR__ . '/acf-json';
		return $paths;
	}
);

add_action(
	'acf/init',
	function () {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		acf_add_local_field_group( wia_site_data_get_home_field_group() );
	}
);

/**
 * Link from Plugins screen to ACF Field Groups (where this group appears as “Local”).
 */
add_filter(
	'plugin_row_meta',
	function ( $links, $file ) {
		if ( $file !== plugin_basename( __FILE__ ) ) {
			return $links;
		}
		if ( ! function_exists( 'acf_get_field_groups' ) ) {
			return $links;
		}
		$url     = admin_url( 'edit.php?post_type=acf-field-group' );
		$links[] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'ACF Field Groups', 'wia-site-data' ) . '</a>';
		return $links;
	},
	10,
	2
);
