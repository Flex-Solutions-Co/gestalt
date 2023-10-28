/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	Button,
	Icon
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { SplideSlide } from '@splidejs/react-splide';


const ALLOWED_MEDIA_TYPES = ['image'];
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/image', 'core/group', 'core/read-more'];

const MY_TEMPLATE = [
	[
		'core/group',
		{
			className: "ges-vertical-image-slider-wrapper",
			align: "full"
		},
		[

			[
				'core/image',
				{
					className: 'ges-image-wrapper'
				},

			],
			[
				'core/heading',
				{
					className: 'ges-heading-block'
				},

			],
			[
				'core/paragraph',
				{
					className: 'ges-content-information',
					content: 'Lorem Ipsum is simply dummy text.',
				},

			],
			[
				'core/paragraph',
				{
					className: 'ges-read-more right-arrow',
					content: 'View Work',
				}
			]
		]
	]
];

const Edit = (props) => {

	// const { attributes, setAttributes, isSelected } = props;
	// const { mediaId, mediaSrc, mediaAlt } = attributes;

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
					/>
				</div>
			</SplideSlide>
		</>
	);
};
export default Edit;