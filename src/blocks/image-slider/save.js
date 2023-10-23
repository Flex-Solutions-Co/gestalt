/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Splide, SplideTrack } from '@splidejs/react-splide';

import { sliderSetting } from './edit';


const Save = ( { attributes } ) => {

    const blockProps = useBlockProps.save({
        className: "media--slider"
    });
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return (
        <div {...blockProps} >
            <Splide className="media__slider" 
                hasTrack={ false }
                data-settings={JSON.stringify(sliderSetting)}
            >
                <SplideTrack {...innerBlocksProps}>
                    { innerBlocksProps.children }
                </SplideTrack>	
            </Splide>
        </div>
    )

}

export default Save;