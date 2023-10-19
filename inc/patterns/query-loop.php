<?php
/**
 * This block allows you to retrieve data from any type of custom post type (CPT).
 */
return array(
	'title'      => __( 'Query Loop', 'gestalt' ),
	'categories' => array( 'query-loop' ),
    'content'    => '<!-- wp:query {"queryId":0,"query":{"perPage":"6","pages":0,"offset":0,"postType":"post","order":"asc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"tagName":"main","className":"ges-post-data-list","layout":{"contentSize":null,"type":"constrained"}} -->
                    <main class="wp-block-query ges-post-data-list"><!-- wp:post-template {"align":"wide","layout":{"type":"grid","columnCount":2}} -->
                    <!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
                    <div class="wp-block-group"><!-- wp:post-featured-image {"isLink":true,"aspectRatio":"3/2","align":"wide"} /-->
                    
                    <!-- wp:post-title {"isLink":true,"align":"wide","fontSize":"small"} /-->
                    
                    <!-- wp:post-excerpt /-->
                    
                    <!-- wp:group {"className":"ges-read-more","layout":{"type":"constrained","justifyContent":"left"}} -->
                    <div class="wp-block-group ges-read-more"><!-- wp:read-more {"content":"View Blog","className":"right-arrow"} /--></div>
                    <!-- /wp:group --></div>
                    <!-- /wp:group -->
                    <!-- /wp:post-template -->
                    
                    <!-- wp:query-pagination {"paginationArrow":"arrow","showLabel":false,"align":"wide","layout":{"type":"flex","justifyContent":"center"}} -->
                    <!-- wp:query-pagination-previous {"fontSize":"small"} /-->
                    
                    <!-- wp:query-pagination-numbers /-->
                    
                    <!-- wp:query-pagination-next {"fontSize":"small"} /-->
                    <!-- /wp:query-pagination --></main>
                    <!-- /wp:query -->',
);
