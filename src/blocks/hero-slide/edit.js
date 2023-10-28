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


const ALLOWED_MEDIA_TYPES = [ 'image' ];
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/image', 'core/buttons', 'core/columns', 'core/group' ];

const MY_TEMPLATE = [
    [
        'core/group',
        {
            className: "e-hero-banner-col-block",
			align: "full"
        },
        [
           
            [
                'core/image',
                {
                    className: 'e-hero-banner-right-col'
                },
                
            ]
        ]
    ]
];



const Edit = (props) => {

	const { attributes, setAttributes, isSelected } = props;
	const { mediaId, mediaSrc, mediaAlt } = attributes;

	const blockProps = useBlockProps({
		className: "e-hero-banner-slide"
	});


	const imageRemoveHandler = () => {
		setAttributes({
			mediaId: '',
			mediaSrc: ''
		})
	}

	const BgImagePlaceholder = ({mediaOpenHadle}) => {
		return (
			<div className='bg-wrapper'>
				<div className='bg-wrapper-inner' onClick={mediaOpenHadle}> 
					{mediaSrc && <img src={mediaSrc} />}
					{ !mediaSrc && <Icon icon="plus-alt" /> }	
				</div>
				{ mediaSrc && 
					<div className='bg-slider-trash-icn'>
						<Icon icon="trash" onClick={imageRemoveHandler} />
					</div>
				}
			</div>
		)
	}

	useSelect(	async (select) => {
		const { getMedia } = select( coreStore );
		if(mediaId){
			const image = ( mediaId && isSelected) ? await getMedia( mediaId, { context: 'view' } ) : null;
			if(image !== null){
				let imageSrc = image ? image?.media_details?.sizes?.large?.source_url : '';
				if(imageSrc === undefined){
					imageSrc =  image?.media_details?.sizes?.full?.source_url;
				}

				let media_alt = image ? image?.title?.rendered : '';
				setAttributes({mediaSrc: imageSrc, mediaAlt: media_alt });

			}

		}
	}, [mediaId], isSelected );


	return (
		<>
			<InspectorControls>
				<PanelBody 
					title="Media Settings"
					initialOpen={ true }
				>
				<h4 style={{marginBottom: "10px"}}>Upload background Image</h4>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => 
								setAttributes({mediaId: media?.id})
							}
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ mediaId }
							render={ ( { open } ) => (
								<BgImagePlaceholder mediaOpenHadle={open} />
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<SplideSlide>
				<div {...blockProps}>
					<div className='e-hero-banner-slide-inner container'>
						
						{ mediaSrc && <img src={mediaSrc} alt={mediaAlt} className='e-hero-bg-img' /> }
						<div className='e-hero-banner-row'>
							<InnerBlocks 
								allowedBlocks={ALLOWED_BLOCKS}
								template={MY_TEMPLATE}
							/> 
						</div>	
					</div>
				</div>
			</SplideSlide>
		</>
	);
};
export default Edit;