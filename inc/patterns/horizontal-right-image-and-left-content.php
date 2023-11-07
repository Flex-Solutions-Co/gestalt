<?php
/**
 * This block provides you with an interface to display an image with content. The image will be rendered on the right side, and the content will be displayed on the left side.
 */
return array(
	'title'      => __( 'Horizontal right image and left content block', 'gestalt' ),
	'categories' => array( 'mediaandcontent' ),
	'content'    => '<!-- wp:group {"align":"wide","className":"ges-right-media-content-block","layout":{"type":"default"}} -->
                    <div class="wp-block-group alignwide ges-right-media-content-block"><!-- wp:columns -->
                    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"548px","className":"ges-left-media-content-image"} -->
                    <div class="wp-block-column is-vertically-aligned-center ges-left-media-content-image" style="flex-basis:548px"><!-- wp:group {"layout":{"type":"constrained","contentSize":"","justifyContent":"left"}} -->
                    <div class="wp-block-group"><!-- wp:heading {"className":"ges-media-heading-block","fontSize":"small"} -->
                    <h2 class="wp-block-heading ges-media-heading-block has-small-font-size">Website Design</h2>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph -->
                    <p>Gestalt creates engaging, intuitive, scalable website designs that build brand image and drive commerce.</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:paragraph {"className":"right-arrow"} -->
                    <p class="right-arrow"><a href="#">View Website Designs</a></p>
                    <!-- /wp:paragraph --></div>
                    <!-- /wp:group --></div>
                    <!-- /wp:column -->
                    
                    <!-- wp:column {"verticalAlignment":"center","width":"1200px"} -->
                    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:1200px"><!-- wp:image {"id":212,"sizeSlug":"full","linkDestination":"none"} -->
                    <figure class="wp-block-image size-full"><img src="https://djx35fh9.modx.dev/wp-content/uploads/2023/10/website-design.jpg" alt="Website Design" class="wp-image-212"/></figure>
                    <!-- /wp:image --></div>
                    <!-- /wp:column --></div>
                    <!-- /wp:columns --></div>
                    <!-- /wp:group -->',
);
