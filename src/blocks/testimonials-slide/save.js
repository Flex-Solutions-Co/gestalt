/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { SplideSlide } from "@splidejs/react-splide";

const Save = ({ attributes }) => {
  const blockProps = useBlockProps.save({
    className: "ges-testimonials-slide-wrapper swiper-slide",
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
export default Save;
