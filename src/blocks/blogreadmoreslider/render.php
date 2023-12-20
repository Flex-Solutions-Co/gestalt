<?php
/**
 * The given template is Single post section.
* @param   array $attributes The block settings and attributes.
* @param   string $content The block default content.
* @param   bool $block WP_Block: The block instance.
*/

$perPage = isset( $attributes['perPage']) ? $attributes['perPage'] : 5;
$kidBlogHeading = isset( $attributes['blogMainHeading'] ) ? $attributes['blogMainHeading'] : '';
$kidBlogText = isset( $attributes['allBlogText'] ) ? $attributes['allBlogText'] : '';
$kidBlogUrl = isset( $attributes['allBlogUrl'] ) ? $attributes['allBlogUrl'] : '';

$args = array(
    'post_type'   => 'post',
    'posts_per_page' => $perPage,
);

$kidpostdatas = get_posts($args);

?>
<section class="gestalt-blog-rm-section wp-block-gestalt-blogreadmoreslider">

        <?php if ( ! empty( $kidBlogHeading ) ) { ?>
            <h2 class="gestalt-main-heading"><?php echo $kidBlogHeading; ?></h2>
        <?php } ?>
        <div id="gestalt-read-more_slider" class="splide gestalt-read-more_slider">
            <div class="splide__track">
                <ul class="splide__list">
                    <?php    
                    foreach( $kidpostdatas as $kidpostdata ) {
                        $kidpostdata_id = $kidpostdata->ID;
                        $kidpostdata_title = $kidpostdata->post_title;
                        $kidpostdata_excerpt = $kidpostdata->post_excerpt;
                        ?>
                        <li class="splide__slide">
                            <div class="gestalt-read-more_header">
                                <a href="<?php echo esc_url( get_the_permalink( $kidpostdata_id ) ); ?>">
                                    <?php echo get_the_post_thumbnail($kidpostdata_id , 'full'); ?>
                                </a>
                                <?php if ( ! empty(  $kidpostdata_title ) ) : ?>
                                    <h3 class="gestalt-read-more_title">
                                        <a href="<?php echo esc_url( get_the_permalink( $kidpostdata_id ) ); ?>">
                                            <?php echo esc_html( $kidpostdata_title ); ?>
                                        </a>
                                    </h3>
                                <?php endif; ?>
                                <?php if ( ! empty( $kidpostdata_excerpt ) ) : ?>
                                    <p class="gestalt-read-more_content"><?php echo wp_kses_post( $kidpostdata_excerpt ); ?></p>
                                <?php endif; ?>
                                <a class="right-arrow wp-block-read-more" href="<?php echo esc_url( get_the_permalink( $kidpostdata_id ) ); ?>">View Blog</a>
                            </div>
                        </li>
                        <?php
                    }
                    ?>
                </ul>
            </div>
            <?php if ( ! empty( $kidBlogUrl ) ) { ?>
            <div class="read-more">
                <a class="right-arrow wp-block-read-more" href="<?php echo $kidBlogUrl; ?>"><?php echo $kidBlogText; ?></a>
            </div>
        <?php } ?>
        </div>
   
</section>
