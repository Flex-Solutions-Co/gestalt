/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

import { SplideSlide } from '@splidejs/react-splide';


const ALLOWED_BLOCKS = ['core/image', 'core/group'];

const MY_TEMPLATE = [
	[
		'core/image',
		{
			className: 'ges-image-wrapper'
		},

	]
];

const Edit = (props) => {

	const blockProps = useBlockProps({
		className: "ges-verticle-slide",
		renderAppender: false,
	});

	return (
		<>
			<SplideSlide>
				<div {...blockProps}>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={MY_TEMPLATE}
						templateLock="all" 
					/>
				</div>
			</SplideSlide>
		</>
	);
};
export default Edit;