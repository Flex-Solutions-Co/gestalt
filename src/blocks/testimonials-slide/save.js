/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

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
