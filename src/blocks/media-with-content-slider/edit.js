/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	TextControl,
	PanelBody,
    Button
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { Splide, SplideTrack } from '@splidejs/react-splide';

/**
 * external dependencies
 */
import classnames from "classnames";

const ALLOWED_BLOCKS = ['expertsinwp/hero-slide'];
const MY_TEMPLATE = [
	['expertsinwp/hero-slide', {}],
	['expertsinwp/hero-slide', {}]
]

export const sliderSetting = {
    type    : 'loop',
    perPage : 1,
    autoplay: true,
    gap: 0,
    perMove: 1,
    pauseOnHover: false,
    arrows: false,
    easing: 'linear',
    pagination: true,
    drag: true,
    slideFocus: false,
}

const Edit = (props) => {

	const { attributes, setAttributes, clientId } = props;
	
	const blockProps = useBlockProps({
		className: classnames('e-hero--slider', 'alignfull')
	});
	
	const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            template: MY_TEMPLATE,
            allowedBlocks: ALLOWED_BLOCKS,
            templateLock: false,
			renderAppender : false,
            orientation: "horizontal"
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
		innerBlocks.push(createBlock('expertsinwp/hero-slide', {}));
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
        </>
	);
	
};

export default Edit;