/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
// import { SplideSlide } from '@splidejs/react-splide';

const Save = ({ attributes }) => {

	// const { mediaSrc, mediaAlt } = attributes;

	const blockProps = useBlockProps.save({
		className: "ges-verticle-slide swiper-slide"
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};
export default Save;