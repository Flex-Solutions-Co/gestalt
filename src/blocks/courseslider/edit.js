/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, 
    useInnerBlocksProps,
	InspectorControls,
    InnerBlocks
} from '@wordpress/block-editor';
import {
	TextControl,
	PanelBody,
    Button 
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

import { Splide, SplideTrack } from '@splidejs/react-splide';


const ALLOWED_BLOCKS = [ 'gestalt/courseslide' ];

const MY_TEMPLATE = [
    [ 'gestalt/courseslide', {} ],
    [ 'gestalt/courseslide', {} ]
];

export const sliderSetting = {
    perPage: 1,
    gap: 0,
    perMove: 1,
    arrows: false,
    pagination: true,
    drag: true,
    slideFocus: false,
}

const Edit = ( props ) => {

    const { attributes, setAttributes, clientId } = props;
    const { cover } = attributes;

    const blockProps = useBlockProps({
        className: "media--slider"
    });
    
    if (cover !== '') {
		return (
			<img src={cover} width="1728" height="826" />
		)
	}

    const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            template: MY_TEMPLATE,
            allowedBlocks:["gestalt/courseslide"],
            templateLock:false,
            renderAppender:false,
            orientation: "horizontal",
        }
    );

    const block = useSelect((select) => {
		return select('core/block-editor').getBlock(clientId);
	}, []); //Get Block by ID

    const {
		replaceInnerBlocks, updateBlockAttributes
	} = useDispatch('core/block-editor'); //Dispatch for inner blocks

    const addNewSlideHandler = () => {
        let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
		innerBlocks.push(createBlock('gestalt/courseslide', {}));
		replaceInnerBlocks(clientId, innerBlocks, false);
    }
    

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slide Settings" initialOpen={ true }>
                    <Button variant="secondary" onClick={addNewSlideHandler}>Add New Slide</Button>
                </PanelBody>
            </InspectorControls>    
        <div {...blockProps}>
            <Splide className="media__slider" 
                hasTrack={ false }
                options={ sliderSetting } 
                data-settings={JSON.stringify(sliderSetting)}
            >
                <SplideTrack {...innerBlocksProps}>
                    { innerBlocksProps.children }
                </SplideTrack>	
            </Splide>
        </div>
        </>
    )

}

export default Edit;