/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = ['image'];
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/image', 'core/group', 'core/read-more'];

const MY_TEMPLATE = [
	[
		'core/group',
		{
			className: "ges-vertical-image-slider-wrapper",
			align: "full",

		},
		[
			[
				'core/image',
				{
					className: 'ges-image-wrapper',
				},

			],
			[
				'core/heading',
				{
					className: 'ges-heading-block',
				},

			],
			[
				'core/paragraph',
				{
					className: 'ges-content-information',
					placeholder: 'Lorem Ipsum is simply dummy text.',
				},

			],
			[
				'core/paragraph',
				{
					className: 'ges-read-more right-arrow',
					placeholder: 'View Work',
				}
			]
		]
	]
];


const Edit = ({ context, clientId }) => {

	// const { attributes, setAttributes, isSelected } = props;
	// const { mediaId, mediaSrc, mediaAlt } = attributes;

	const activeClientId = context["gestalt/recordId"];

	console.log(context["gestalt/recordId"]);
	console.log(clientId);

	const blockProps = useBlockProps({
		className: `ges-verticle-slide swiper-slide ${
		  activeClientId === clientId ? "active" : ""
		}`,
		renderAppender: false,
	  });

	// const blockProps = useBlockProps({
	// 	className: "",
	// });

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={MY_TEMPLATE}
					renderAppender={false}
					templateLock="all"
				/>
			</div>
		</>
	);
};
export default Edit;