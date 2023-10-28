<?php
/**
 * Gestalt functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage gestalt
 * @since Gestalt 1.0
 */


if ( ! function_exists( 'gestalt_support' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Gestalt 1.0
	 *
	 * @return void
	 */
	function gestalt_support() {
		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'align-wide' );
		// Enqueue editor styles.
		add_editor_style( 'style.css' );
		add_editor_style( 'assets/css/style.css' );
		add_editor_style( 'assets/css/editor-style.css' );
	}

endif;

add_action( 'after_setup_theme', 'gestalt_support' );

if ( ! function_exists( 'gestalt_styles' ) ) :
	/**
	 * Enqueue styles.
	 *
	 * @since Gestalt 1.0
	 *
	 * @return void
	 */
	function gestalt_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );
		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style( 'gestalt-style', get_template_directory_uri() . '/style.css', array(), $version_string );
		// Enqueue theme stylesheet.
		wp_enqueue_style( 'gestalt-style' );

		wp_register_style( 'glightbox-style', get_stylesheet_directory_uri(). '/assets/css/glightbox.min.css', array(), $version_string);
		wp_enqueue_style( 'custom', get_stylesheet_directory_uri(). '/assets/css/style.css', array(), $version_string);

		//wp_enqueue_script( 'glightbox-script', get_stylesheet_directory_uri(). '/assets/js/glightbox.min.js', array(), '', true );
		wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri(). '/assets/js/custom-script.js', array(), '', true );
	}

endif;

add_action( 'wp_enqueue_scripts', 'gestalt_styles' );

// Add block patterns
require get_template_directory() . '/inc/block-patterns.php';

// Add custom hamgurger icon.
function custom_render_block_core_navigation (string $block_content, array $block) {
	if ( $block['blockName'] === 'core/navigation' && !is_admin() && !wp_is_json_request() ) {
		return preg_replace('/\<svg width(.*?)\<\/svg\>/', '<div class="ges-res-menu-btn"><span class="line"></span><span class="line"></span><span class="line"></span></div>', $block_content);
	}
	return $block_content;
}
add_filter( 'render_block', 'custom_render_block_core_navigation', null, 2 );


/**
 * Create Custom Work Cpt.
 */
function ew_add_custom_case_study_cpt() {
    $labels = array(
        'name'               => _x( 'Case Study', 'post type general name', 'gestalt' ),
        'singular_name'      => _x( 'Case Study', 'post type singular name', 'gestalt' ),
        'menu_name'          => _x( 'Case Study', 'admin menu', 'gestalt' ),
        'name_admin_bar'     => _x( 'Case Study', 'add new on admin bar', 'gestalt' ),
        'add_new'            => _x( 'Add New Case Study', 'gestalt' ),
        'add_new_item'       => __( 'Add New Case Study', 'gestalt' ),
        'new_item'           => __( 'New Case Study', 'gestalt' ),
        'edit_item'          => __( 'Edit Case Study', 'gestalt' ),
        'view_item'          => __( 'View Case Study', 'gestalt' ),
        'all_items'          => __( 'All Case Study', 'gestalt' ),
        'search_items'       => __( 'Search Case Study', 'gestalt' ),
        'parent_item_colon'  => __( 'Parent Case Study:', 'gestalt' ),
        'not_found'          => __( 'No Case Study found.', 'gestalt' ),
        'not_found_in_trash' => __( 'No Case Study found in Trash.', 'gestalt' )
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'has_archive'        => false,
		// 'menu_icon'          =>
        'hierarchical'       => true,
        'supports'           => array( 'title','editor', 'thumbnail', 'excerpt' ),
		'show_in_rest'       => true,
    );

    register_post_type( 'case-study', $args );
}
add_action( 'init', 'ew_add_custom_case_study_cpt' );

if ( file_exists( get_template_directory() . '/build/gestalt-blocks.php' ) ){
	require get_template_directory() . '/build/gestalt-blocks.php';
}
