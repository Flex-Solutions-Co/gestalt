<?php
/**
 * Gestalt: Block Patterns
 *
 * @since Gestalt 1.0
 */

/**
 * Registers block patterns and categories.
 *
 * @since Gestalt 1.0
 *
 * @return void
 */
function gestalt_register_block_patterns() {

	// The below hook is indicate remove all default patterns categories.
	remove_theme_support('core-block-patterns');

	$block_pattern_categories = array(
		'mediaandcontent' => array( 'label' => __( 'Media & Content', 'gestalt' ) ),
		'testimonial' => array( 'label' => __( 'Testimonial', 'gestalt' ) ),
		'query-loop' => array( 'label' => __( 'Query Loop', 'gestalt' ) ),
		'video' => array( 'label' => __( 'Video', 'gestalt' ) ),
	);

	/**
	 * Filters the theme block pattern categories.
	 *
	 * @since Gestalt 1.0
	 *
	 * @param array[] $block_pattern_categories {
	 *     An associative array of block pattern categories, keyed by category name.
	 *
	 *     @type array[] $properties {
	 *         An array of block category properties.
	 *
	 *         @type string $label A human-readable label for the pattern category.
	 *     }
	 * }
	 */
	$block_pattern_categories = apply_filters( 'gestalt_block_pattern_categories', $block_pattern_categories );

	foreach ( $block_pattern_categories as $name => $properties ) {
		if ( ! WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) ) {
			register_block_pattern_category( $name, $properties );
		}
	}

	$block_patterns = array(
		'vertical-image-and-content',
		'horizontal-image-and-content',
		'horizontal-right-image-and-left-content',
		'testimonial',
		'media-and-content',
		'query-loop',
		'videoplayer'
	);

	/**
	 * Filters the theme block patterns.
	 *
	 * @since Gestalt 1.0
	 *
	 * @param array $block_patterns List of block patterns by name.
	 */
	$block_patterns = apply_filters( 'gestalt_block_patterns', $block_patterns );

	foreach ( $block_patterns as $block_pattern ) {
		$pattern_file = get_theme_file_path( '/inc/patterns/' . $block_pattern . '.php' );

		register_block_pattern(
			'gestalt/' . $block_pattern,
			require $pattern_file
		);
	}
}
add_action( 'init', 'gestalt_register_block_patterns', 9 );
