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
import { useRef, useEffect } from '@wordpress/element';
import {
    TextControl,
    PanelBody,
    Button,
    TextareaControl
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { Splide, SplideTrack } from '@splidejs/react-splide';

/**
 * external dependencies
 */
import classnames from "classnames";

const ALLOWED_BLOCKS = ['gestalt/casestudyslide'];
const MY_TEMPLATE = [
    ['gestalt/casestudyslide', {}],
    ['gestalt/casestudyslide', {}]
]

export const sliderSetting = {
    type: 'loop',
    perPage: 2,
    autoplay: false,
    gap: '12px',
    perMove: 1,
    arrows: false,
    pagination: false,
    drag: true,
    slideFocus: false,
    padding: { left: '0px', right: '20%' },
    breakpoints: {
        600: {
            gap: '18px',
        },
        781: {
            gap: '50px',
            perPage: 1,
            padding: { left: '0px', right: '12%' },
        }
    }
}



const Edit = (props) => {

    const { attributes, setAttributes, clientId } = props;
    const { heading, description } = attributes;
    const sliderRef = useRef();
    const blockProps = useBlockProps({
        className: classnames('ges-verticle--slider-section')
    });

    const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            template: MY_TEMPLATE,
            allowedBlocks: ALLOWED_BLOCKS,
            templateLock: false,
            renderAppender: false,
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
        innerBlocks.push(createBlock('gestalt/casestudyslide', {}));
        replaceInnerBlocks(clientId, innerBlocks, false);
    }

    const addStyleinProgress = () => {
        var bar = document.querySelector('.case-study-progress-bar');
        const splidePagiantionItems = sliderRef?.current?.splide;
        const end = splidePagiantionItems?.length;
        var rate = Math.min((splidePagiantionItems?.index + 1) / end, 1);
        bar.style.width = String(100 * rate) + '%';
    };

    useEffect(() => {
        addStyleinProgress();
    }, []);

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slide Settings" initialOpen={true}>
                    <Button variant="secondary" className='btn-add-new-slider' onClick={addNewSlideHandler}>Add New Slide</Button>
                    <TextControl
                        label="Case Study Heading"
                        value={heading}
                        onChange={(newHeading) => setAttributes({ heading: newHeading })}
                    />
                    <TextareaControl
                        label="Description"
                        value={description}
                        onChange={(newDescription) => setAttributes({ description: newDescription })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className='ges-verticle-container'>
                    {(heading !== '' || linkText !== '') &&
                        <div className='ges-casestudy-main-heading-block'>
                            {heading &&
                                <h2 className='ges-casestudy-heading'>{heading}</h2>}
                            {description &&
                                <p className='ges-description'>{description}</p>}
                        </div>}
                    <Splide className="ges-verticle__slider"
                        hasTrack={false}
                        options={sliderSetting}
                        ref={sliderRef}
                        data-settings={JSON.stringify(sliderSetting)}
                        onMoved={() => {
                            addStyleinProgress();
                        }}
                    >
                        <SplideTrack {...innerBlocksProps}>
                            {innerBlocksProps.children}
                        </SplideTrack>
                        <div class="case-study-progress">
                            <div class="case-study-progress-bar"></div>
                        </div>
                    </Splide>
                </div>

            </div>
        </>
    );

};

export default Edit;