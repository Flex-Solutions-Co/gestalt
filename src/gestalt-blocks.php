<?php

/**
 * Add custom block category to default categories.
 *
 * @param array[]                 $block_categories     Block categories.
 * @param WP_Block_Editor_Context $block_editor_context Block Editor context.
 *
 * @return array
 */


function gestalt_block_categories( $block_categories, $block_editor_context ) {

	// Create your custom category
	$custom_category = array(
	   'slug'  => 'gestalt-blocks',
	   'title' => esc_html__( 'gestalt Blocks', 'gestalt' ),
   );

   // Add your custom category at the 0 index
   array_unshift($block_categories, $custom_category);

   return $block_categories;
}

add_filter( 'block_categories_all', 'gestalt_block_categories', 10, 2 );

/**
 * Enqueue Theme-Blocks: Backend.
 *
 * @return void
 */
function gestalt_auto_register_block_types() {
	if ( file_exists( get_template_directory() . '/build/' ) ) {
		$block_json_files = glob( get_template_directory() . '/build/blocks/*/block.json' );
		
		// Autoregister all blocks found in the `build/blocks` folder.
		foreach ( $block_json_files as $filename ) {
			if( $filename){
				$block_folder = dirname( $filename );

				if($block_folder){
					register_block_type( $block_folder );
				}
			}
		}
	}
}

add_action( 'init', 'gestalt_auto_register_block_types' );

// -----------

add_action( 'enqueue_block_editor_assets', 'enqueue_scripts' );
function enqueue_scripts() {
	if ( file_exists( get_template_directory() . '/build/' ) ) { 

		$mainblocksjs = get_template_directory() . '/build/index.js';
		$mainblockjsUri = get_template_directory_uri() . '/build/index.js';
		$editorcssuri = get_template_directory_uri() . '/build/index.css';
		$back_frontcssuri = get_template_directory_uri() . '/build/style-index.css';

		$asset_path =  get_template_directory() . '/build/index.asset.php';

		
		$dependency_array = file_exists($asset_path)
		? include $asset_path
		: array(
			'dependencies' => array( 'react', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-data', 'wp-edit-post', 'wp-element', 'wp-i18n' ),
			'version'      => filemtime( $mainblocksjs ),
		);

		// Enqueue the block index.js file
		wp_enqueue_script(
		  'gestaltblocks', // unique handle
		  $mainblockjsUri,
		  $dependency_array['dependencies'], // required dependencies for blocks
		  $dependency_array['version'],
		);

		
		// Enqueue the block index.css file
		wp_enqueue_style(
			'wp-gestaltblocks', // unique handle
			$editorcssuri,
			array('wp-block-editor'), // required dependencies for blocks
			$dependency_array['version'],
		);

		// Enqueue the block style-index.css file
		wp_enqueue_style(
			'wp-experts-back-front', // unique handle
			$back_frontcssuri,
			array('wp-block-editor'), // required dependencies for blocks
			$dependency_array['version'],
		);

	}
}

//frontend assets binding
add_action( 'wp_enqueue_scripts', 'enqueue_scripts_frontend' );
function enqueue_scripts_frontend() {

	if ( file_exists( get_template_directory() . '/build/' ) ) { 
		$frontendcssuri = get_stylesheet_directory_uri() . '/build/style-index.css';
		$mainjsuri = get_stylesheet_directory_uri() . '/build/js/main.js';
		$splidejsuri = get_stylesheet_directory_uri() . '/build/js/splide.js';
		$swiperjs = get_stylesheet_directory_uri() . '/build/js/swiper.js';
		$glightbox = get_stylesheet_directory_uri() . '/build/js/glightbox.js';
	
		wp_enqueue_style( 'wp-experts-fronteds', $frontendcssuri );
		wp_register_script( 'splidejs', $splidejsuri, array(), false, true);
		wp_register_script( 'swiper-script', $swiperjs, array(), false, true);
		wp_enqueue_script( 'main-script', $mainjsuri, array(), false, true);
		wp_register_script( 'lightbox-script', $glightbox, array(), false, true);
	}
}

