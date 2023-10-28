<?php
/**
 * The provided pattern indicates a video with popup block.
 */
return array(
	'title'      => __( 'Video Player', 'gestalt' ),
	'categories' => array( 'video' ),
	'content'    => '<!-- wp:group {"align":"full","className":"ges-video-section","layout":{"type":"constrained"}} -->
                    <div class="wp-block-group alignfull ges-video-section"><!-- wp:gestalt/videoplayer {"addVideoUrl":"https://www.youtube.com/watch?v=MFLVmAE4cqg","isSelfHosted":true,"poster":{"type":"image","caption":"","media":{"url":"http://localhost:10035/wp-content/uploads/2023/10/fisker.jpg","height":720,"width":1280,"orientation":"landscape"}},"lightBoxVideo":{"type":"video","caption":"","media":{"url":"http://localhost:10035/wp-content/uploads/2023/10/test-video-1.mp4","width":202,"height":360}},"align":"wide"} -->
                    <div class="wp-block-gestalt-videoplayer alignwide"><div class="video_wrapper"><a class="glightbox" href="http://localhost:10035/wp-content/uploads/2023/10/test-video-1.mp4"><img src="http://localhost:10035/wp-content/uploads/2023/10/fisker.jpg" alt="" width="1280" height="720"/></a><div class="play-icon"><svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0V36L37.4 16.6L0 0Z" fill="white"></path></svg></div></div></div>
                    <!-- /wp:gestalt/videoplayer -->
                    
                    <!-- wp:columns {"align":"wide","className":"container video-block-information"} -->
                    <div class="wp-block-columns alignwide container video-block-information"><!-- wp:column {"width":"","layout":{"type":"constrained"}} -->
                    <div class="wp-block-column"><!-- wp:group {"className":"video-block-information-wrapper","layout":{"type":"constrained","contentSize":"850px","justifyContent":"left"}} -->
                    <div class="wp-block-group video-block-information-wrapper"><!-- wp:heading {"fontSize":"small"} -->
                    <h2 class="wp-block-heading has-small-font-size">Digital Video</h2>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph {"className":"ges-video-details"} -->
                    <p class="ges-video-details">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                    <!-- /wp:paragraph --></div>
                    <!-- /wp:group --></div>
                    <!-- /wp:column --></div>
                    <!-- /wp:columns --></div>
                    <!-- /wp:group -->',
);
