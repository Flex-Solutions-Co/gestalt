<?php
/**
 * This block provides you with an interface to display an image with content. The image will be rendered on the left side, and the content will be displayed on the right side.
 */
return array(
	'title'      => __( 'Media and content block', 'gestalt' ),
	'categories' => array( 'mediaandcontent' ),
    'content'    => '<!-- wp:group {"className":"ges-media-content-block-row","layout":{"type":"constrained","contentSize":"1230px","justifyContent":"left"}} -->
                    <div class="wp-block-group ges-media-content-block-row"><!-- wp:media-text {"align":"","mediaId":392,"mediaLink":"http://localhost:10035/about/chosen-foods-celebrates-roots-with-new-brand-identity/","mediaType":"image","mediaWidth":55,"isStackedOnMobile":false,"verticalAlignment":"top","imageFill":false} -->
                    <div class="wp-block-media-text is-vertically-aligned-top" style="grid-template-columns:55% auto"><figure class="wp-block-media-text__media"><img src="http://localhost:10035/wp-content/uploads/2023/10/chosen-foods-celebrates-roots-with-new-brand-identity-1024x654.jpg" alt="Chosen Foods Celebrates Roots With New Brand Identity" class="wp-image-392 size-full"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3,"fontSize":"small"} -->
                    <h3 class="wp-block-heading has-small-font-size">Chosen Foods Celebrates Roots With New Brand Identity</h3>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph {"placeholder":"Content…","className":"ges-block-content"} -->
                    <p class="ges-block-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:paragraph {"className":"right-arrow"} -->
                    <p class="right-arrow"><a href="#">View Press Release</a></p>
                    <!-- /wp:paragraph --></div></div>
                    <!-- /wp:media-text --></div>
                    <!-- /wp:group -->',
);
