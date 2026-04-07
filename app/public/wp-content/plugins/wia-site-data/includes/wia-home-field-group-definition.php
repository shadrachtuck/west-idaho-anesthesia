<?php
/**
 * Pure PHP field definitions (no WordPress). Loaded by the plugin and by bin/export-acf-json.php.
 *
 * @package WiaSiteData
 */

/**
 * Full ACF field group array (used for PHP registration and JSON export).
 *
 * @return array<string, mixed>
 */
function wia_site_data_get_home_field_group() {
	return array(
		'key'                   => 'group_wia_home',
		'title'                 => 'WIA Homepage & Site',
		'active'                => true,
		'show_in_graphql'       => true,
		'graphql_field_name'    => 'wiaHomeFields',
		'graphql_types'         => array( 'Page' ),
		'show_in_rest'          => true,
		'position'              => 'acf_after_title',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'location'              => array(
			array(
				array(
					'param'    => 'page_type',
					'operator' => '==',
					'value'    => 'front_page',
				),
			),
		),
		'fields'                => wia_site_data_get_home_fields(),
	);
}

/**
 * Hero carousel (ACF PRO repeater).
 *
 * @return array<int, array<string, mixed>>
 */
function wia_site_data_get_hero_carousel_fields() {
	return array(
		array(
			'key'     => 'field_wia_hero_carousel_help',
			'label'   => '',
			'name'    => '',
			'type'    => 'message',
			'message' => '<p><strong>Hero carousel</strong> — Add slides with a wide landscape image. Overlay text is optional; if a slide\'s overlay is blank, the Hero headline above is used.</p>',
		),
		array(
			'key'                => 'field_wia_hero_carousel',
			'label'              => 'Hero carousel slides',
			'name'               => 'hero_carousel',
			'type'               => 'repeater',
			'instructions'       => 'Recommended: wide landscape images (e.g. 1920×800).',
			'required'           => 0,
			'layout'             => 'row',
			'button_label'       => 'Add slide',
			'min'                => 0,
			'max'                => 12,
			'collapsed'          => 'field_wia_hero_carousel_slide_image',
			'show_in_graphql'    => true,
			'graphql_field_name' => 'heroCarousel',
			'sub_fields'         => array(
				array(
					'key'                => 'field_wia_hero_carousel_slide_image',
					'label'              => 'Slide image',
					'name'               => 'slide_image',
					'type'               => 'image',
					'return_format'      => 'id',
					'preview_size'       => 'large',
					'library'            => 'all',
					'show_in_graphql'    => true,
					'graphql_field_name' => 'slideImage',
				),
				array(
					'key'                => 'field_wia_hero_carousel_overlay',
					'label'              => 'Overlay text (optional)',
					'name'               => 'overlay_text',
					'type'               => 'textarea',
					'rows'               => 3,
					'show_in_graphql'    => true,
					'graphql_field_name' => 'overlayText',
				),
			),
		),
	);
}

/**
 * Field definitions with defaults matching approved copy (editable in WP).
 *
 * @return array<int, array<string, mixed>>
 */
function wia_site_data_get_home_fields() {
	return array_merge(
		array(
		array(
			'key'   => 'field_wia_tab_branding',
			'label' => 'Header & branding',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'             => 'field_wia_site_logo',
			'label'           => 'Header logo',
			'name'            => 'site_logo',
			'type'            => 'image',
			'instructions'    => 'Upload the Idaho mark / wordmark for the main navigation. Recommended: PNG or SVG on a transparent background.',
			'return_format'   => 'id',
			'preview_size'    => 'medium',
			'library'         => 'all',
			'show_in_graphql' => true,
			'graphql_field_name' => 'siteLogo',
		),
		array(
			'key'   => 'field_wia_tab_hero',
			'label' => 'Hero',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'           => 'field_wia_hero_organization_name',
			'label'         => 'Organization name',
			'name'          => 'hero_organization_name',
			'type'          => 'text',
			'default_value' => 'West Idaho Anesthesia',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_hero_heading',
			'label'         => 'Hero headline',
			'name'          => 'hero_heading',
			'type'          => 'textarea',
			'rows'          => 3,
			'default_value' => 'Every Patient Deserves a Team of Conscientious Providers Watching Out for Them Throughout Their Surgery.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_hero_service_area',
			'label'         => 'Service area line',
			'name'          => 'hero_service_area',
			'type'          => 'textarea',
			'rows'          => 2,
			'default_value' => 'Serving patients from Boise · Meridian · Nampa · Caldwell · Emmett · Eagle',
			'show_in_graphql' => true,
		),
		),
		wia_site_data_get_hero_carousel_fields(),
		array(
		array(
			'key'   => 'field_wia_tab_story',
			'label' => 'Featured story',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'           => 'field_wia_story_paragraph_1',
			'label'         => 'Story — paragraph 1',
			'name'          => 'story_paragraph_1',
			'type'          => 'textarea',
			'rows'          => 5,
			'default_value' => 'West Idaho Anesthesia offers unique educational experience for local students. Shad Westover, West Idaho Anesthesia Simulation Team Program Director, has organized an anesthesia simulation and invited high school and college students from the area to participate in real life scenarios, demonstrating all types of anesthesia, including general and regional.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_story_quote_1',
			'label'         => 'Story — quote 1',
			'name'          => 'story_quote_1',
			'type'          => 'textarea',
			'rows'          => 5,
			'default_value' => '"We are thrilled to give local students this hands-on opportunity with realistic scenarios in order to help them utilize important patient safety and crisis management principles they would face in a realistic experience," said Shad Westover, CRNA (nurse anesthesiologist).',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_story_paragraph_2',
			'label'         => 'Story — paragraph 2',
			'name'          => 'story_paragraph_2',
			'type'          => 'textarea',
			'rows'          => 6,
			'default_value' => 'The program is designed to surpass the job shadow experience. Each session is limited to five to seven students who will follow a nurse anesthesiologist and a simulated patient throughout the perioperative process. It also includes a debriefing period when the students can ask questions regarding anesthesiology as a profession and receive information for future assistance along their career path.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_story_quote_2',
			'label'         => 'Story — quote 2',
			'name'          => 'story_quote_2',
			'type'          => 'textarea',
			'rows'          => 6,
			'default_value' => '"It is more important than ever right now to make sure we are keeping students interested in the healthcare field. This was a great opportunity for local students to see firsthand what it is like to work as a nurse anesthetist. So far we\'ve held one simulation and every student expressed an increased desire to go into healthcare after the experience," said Westover.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_story_cta_paragraph',
			'label'         => 'Story — student CTA paragraph',
			'name'          => 'story_cta_paragraph',
			'type'          => 'textarea',
			'rows'          => 3,
			'default_value' => 'High school or college students interested in health care as a profession: Please email westidahoanesthesia@gmail.com and we will get you booked for our next simulation experience.',
			'show_in_graphql' => true,
		),
		array(
			'key'   => 'field_wia_tab_bill_mission',
			'label' => 'Bill pay & mission',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'           => 'field_wia_online_bill_pay_heading',
			'label'         => 'Online bill pay — heading',
			'name'          => 'online_bill_pay_heading',
			'type'          => 'text',
			'default_value' => 'Online Bill Pay',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_online_bill_pay_description',
			'label'         => 'Online bill pay — description',
			'name'          => 'online_bill_pay_description',
			'type'          => 'textarea',
			'rows'          => 3,
			'default_value' => 'Pay your bill securely online when your statement is ready. You can also reach our office with billing questions.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_mission_heading',
			'label'         => 'Mission — heading',
			'name'          => 'mission_heading',
			'type'          => 'text',
			'default_value' => 'Our Mission',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_mission_body',
			'label'         => 'Mission — body',
			'name'          => 'mission_body',
			'type'          => 'textarea',
			'rows'          => 6,
			'default_value' => 'We discovered a need in the health care industry for a service-oriented group with a central focus on customer service—customers being the patients, surgeons, and staff members we work with. Our goal is to foster the "team" aspect of the surgical team. You can come to one of our facilities and expect a level of anesthesia care comparable to anywhere in the world.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_mission_tagline',
			'label'         => 'Mission — tagline',
			'name'          => 'mission_tagline',
			'type'          => 'text',
			'default_value' => 'Our Mission is Excellence in Customer Service!',
			'show_in_graphql' => true,
		),
		array(
			'key'   => 'field_wia_tab_sections',
			'label' => 'Sections',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'           => 'field_wia_gives_back_heading',
			'label'         => 'WIA Gives Back — heading',
			'name'          => 'gives_back_heading',
			'type'          => 'text',
			'default_value' => 'WIA Gives Back',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_gives_back_text',
			'label'         => 'WIA Gives Back — text',
			'name'          => 'gives_back_text',
			'type'          => 'textarea',
			'rows'          => 3,
			'default_value' => 'We invest in our community through education and outreach—including hands-on learning opportunities for students exploring careers in healthcare.',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_simulation_heading',
			'label'         => 'Simulation — heading',
			'name'          => 'simulation_heading',
			'type'          => 'text',
			'default_value' => 'Anesthesia Simulation — Job Shadow Experience for Students',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_simulation_text',
			'label'         => 'Simulation — text',
			'name'          => 'simulation_text',
			'type'          => 'textarea',
			'rows'          => 3,
			'default_value' => 'Our simulation program gives local students realistic perioperative scenarios alongside nurse anesthesiologists—building interest in the profession and reinforcing patient safety principles.',
			'show_in_graphql' => true,
		),
		array(
			'key'   => 'field_wia_tab_team_contact',
			'label' => 'Team & contact',
			'name'  => '',
			'type'  => 'tab',
		),
		array(
			'key'             => 'field_wia_team_providers_list',
			'label'           => 'Providers (one name per line)',
			'name'            => 'team_providers_list',
			'type'            => 'textarea',
			'rows'            => 12,
			'instructions'    => 'One provider per line. Displayed on the homepage and Meet the Team page.',
			'default_value'   => "Ryan Lindemann\nShad Westover\nKevin Hamby\nJeff Borders\nDave Navarro\nGus Powell\nSkylar Thornton\nBlaine Fisk\nCody Gardner\nNate Steenblik",
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_team_section_heading',
			'label'         => 'Team section heading',
			'name'          => 'team_section_heading',
			'type'          => 'text',
			'default_value' => 'Our skilled team of providers',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_contact_address_line1',
			'label'         => 'Address line 1',
			'name'          => 'contact_address_line1',
			'type'          => 'text',
			'default_value' => "2960 E St. Luke's St, Suite 400",
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_contact_address_line2',
			'label'         => 'Address line 2',
			'name'          => 'contact_address_line2',
			'type'          => 'text',
			'default_value' => 'Meridian, ID 83642',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_contact_phone',
			'label'         => 'Phone',
			'name'          => 'contact_phone',
			'type'          => 'text',
			'default_value' => '(208) 488-0066',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_contact_email',
			'label'         => 'Email',
			'name'          => 'contact_email',
			'type'          => 'email',
			'default_value' => 'WestIdahoAnesthesia@gmail.com',
			'show_in_graphql' => true,
		),
		array(
			'key'           => 'field_wia_footer_organization_name',
			'label'         => 'Footer / contact strip — organization name',
			'name'          => 'footer_organization_name',
			'type'          => 'text',
			'default_value' => 'West Idaho Anesthesia',
			'show_in_graphql' => true,
		),
		array(
			'key'                => 'field_wia_social_links',
			'label'              => 'Social links',
			'name'               => 'social_links',
			'type'               => 'repeater',
			'instructions'       => 'One row: URLs for footer icons (LinkedIn, Instagram, Facebook).',
			'layout'             => 'table',
			'button_label'       => 'Add row',
			'min'                => 0,
			'max'                => 1,
			'show_in_graphql'    => true,
			'graphql_field_name' => 'socialLinks',
			'sub_fields'         => array(
				array(
					'key'                => 'field_wia_social_linkedin_link',
					'label'              => 'LinkedIn',
					'name'               => 'linkedin_link',
					'type'               => 'url',
					'show_in_graphql'    => true,
					'graphql_field_name' => 'linkedinLink',
				),
				array(
					'key'                => 'field_wia_social_insta_link',
					'label'              => 'Instagram',
					'name'               => 'insta_link',
					'type'               => 'url',
					'show_in_graphql'    => true,
					'graphql_field_name' => 'instaLink',
				),
				array(
					'key'                => 'field_wia_social_facebook_link',
					'label'              => 'Facebook',
					'name'               => 'facebook_link',
					'type'               => 'url',
					'show_in_graphql'    => true,
					'graphql_field_name' => 'facebookLink',
				),
			),
		),
		)
	);
}
