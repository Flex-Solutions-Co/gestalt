/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { SplideSlide } from '@splidejs/react-splide';

const Save = ( { attributes } ) => {

	const { mediaSrc, mediaAlt } = attributes;

	const blockProps = useBlockProps.save({
		className: "e-hero-banner-slide"
	});

	return (
		<SplideSlide>
			<div {...blockProps}>
				<div className='e-hero-banner-slide-inner container'>
					{ mediaSrc && <img src={mediaSrc} alt={mediaAlt} className='e-hero-bg-img' /> }	
					<div className='e-hero-banner-row'>
						<InnerBlocks.Content/> 
					</div>	
				</div>
			</div>
		</SplideSlide>
	);
};
export default Save;