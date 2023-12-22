/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { SplideSlide } from "@splidejs/react-splide";

const ALLOWED_BLOCKS = ["core/heading", "core/paragraph"];

const MY_TEMPLATE = [
	[
		"core/heading",
		{
			level: 3,
			content: "Lorem Ipsum is simply dummy text.",
			className: "ges-main-heading",
		},
	],
	[
		"core/paragraph",
		{
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting.",
			className: "ges-testimonial-details",
		},
	],
	[
		"core/paragraph",
		{
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting.",
			className: "ges-testimonial-name",
		},
	],
	[
		"core/paragraph",
		{
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting.",
			className: "ges-testimonial-position",
		},
	],
];

const Edit = (props) => {
	const blockProps = useBlockProps({
		className: "ges-testimonials-slide-wrapper swiper-slide",
		renderAppender: false,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={MY_TEMPLATE}
				templateLock="all"
			/>
		</div>
	);
};
export default Edit;
