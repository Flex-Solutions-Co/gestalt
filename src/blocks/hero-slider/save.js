/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { sliderSetting } from './edit';

/**
 * external dependencies
 */
import classnames from "classnames";

const Save = ( { attributes } ) => {

	const blockProps = useBlockProps.save({
		className: classnames('e-hero--slider', 'alignfull')
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<div {...blockProps}>
			<div className='e-hero-container'>
                <Splide className="hero__slider" 
					hasTrack={ false }
					options={ sliderSetting } 
					data-settings={JSON.stringify(sliderSetting)}
					>
					<SplideTrack {...innerBlocksProps}>
						{ innerBlocksProps.children }
					</SplideTrack>	
                </Splide>
               </div>
		</div>
	);
};
export default Save;