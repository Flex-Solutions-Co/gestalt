<?php
/**
 * This block provides you with an interface to display an image with content. The image will be rendered on the left side, and the content will be displayed on the right side.
 */
return array(
	'title'      => __( 'Horizontal image and content', 'gestalt' ),
	'categories' => array( 'mediaandcontent' ),
	'content'    => '<!-- wp:group {"align":"wide","className":"ges-image-and-content-row-scream","layout":{"type":"default"}} -->
                    <div class="wp-block-group alignwide ges-image-and-content-row-scream"><!-- wp:columns {"verticalAlignment":"center"} -->
                    <div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","width":"1230px","className":"ges-first-column"} -->
                    <div class="wp-block-column is-vertically-aligned-center ges-first-column" style="flex-basis:1230px"><!-- wp:image {"id":192,"sizeSlug":"full","linkDestination":"none"} -->
                    <figure class="wp-block-image size-full"><img src="http://localhost:10035/wp-content/uploads/2023/10/packaging-design.jpg" alt="Packaging Design" class="wp-image-192"/></figure>
                    <!-- /wp:image --></div>
                    <!-- /wp:column -->
                    
                    <!-- wp:column {"verticalAlignment":"center","width":"650px","className":"ges-second-column"} -->
                    <div class="wp-block-column is-vertically-aligned-center ges-second-column" style="flex-basis:650px"><!-- wp:group {"layout":{"type":"constrained","contentSize":"510px","justifyContent":"left"}} -->
                    <div class="wp-block-group"><!-- wp:heading {"className":"ges-media-heading-block","fontSize":"small"} -->
                    <h2 class="wp-block-heading ges-media-heading-block has-small-font-size">Packaging Design</h2>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph -->
                    <p>Often the most important piece of media for a brand, Gestalt develops distinct packaging designs that are connected to a larger brand idea and experience.</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:paragraph {"className":"right-arrow"} -->
                    <p class="right-arrow"><a href="#">View Packaging Designs</a></p>
                    <!-- /wp:paragraph --></div>
                    <!-- /wp:group --></div>
                    <!-- /wp:column --></div>
                    <!-- /wp:columns --></div>
                    <!-- /wp:group -->',
);
