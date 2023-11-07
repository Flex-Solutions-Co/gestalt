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
    Button
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { Splide, SplideTrack } from '@splidejs/react-splide';

/**
 * external dependencies
 */
import classnames from "classnames";

const ALLOWED_BLOCKS = ['gestalt/testimonials-slide'];
const MY_TEMPLATE = [
    ['gestalt/testimonials-slide', {}],
    ['gestalt/testimonials-slide', {}]
]

export const sliderSetting = {
    // type: 'loop',
    perPage: 3,
    autoplay: false,
    gap: '76px',
    perMove: 1,
    arrows: false,
    pagination: false,
    drag: true,
    slideFocus: false,
    // padding: '5rem',
    breakpoints: {
        600: {
            gap: '18px',
        },
        781: {
            gap: '50px',
            perPage: 1,
            padding: { left: '40px', right: '40px' },
        },
        1366: {
            gap: '40px',
            perPage: 2,
        },
        1600: {
            gap: '60px',
        },
    }
}

const Edit = (props) => {

    const { attributes, setAttributes, clientId } = props;

    const { heading, linkText, viewMoreLink } = attributes;
    const sliderRef = useRef();

    const blockProps = useBlockProps({
        className: classnames('ges-testimonials--slider-section')
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
        innerBlocks.push(createBlock('gestalt/testimonials-slide', {}));
        replaceInnerBlocks(clientId, innerBlocks, false);
    }

    const addStyleinProgress = () => {
        var bar = document.querySelector('.my-slider-progress-bar');
        const splidePagiantionItems = sliderRef?.current?.splide;
        const end = splidePagiantionItems.Components.Controller.getEnd() + 1;
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
                    <Button variant="secondary" className='btn-add-slider' onClick={addNewSlideHandler}>Add New Slide</Button>
                    <TextControl
                        label="Testimonials Heading"
                        value={heading}
                        onChange={(newHeading) => setAttributes({ heading: newHeading })}
                    />
                    <TextControl
                        label="View More Text"
                        value={linkText}
                        onChange={(newLinkText) => setAttributes({ linkText: newLinkText })}
                    />
                    <TextControl
                        label="View More Link"
                        value={viewMoreLink}
                        onChange={(newViewMoreLink) => setAttributes({ viewMoreLink: newViewMoreLink })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>

                <div className='ges-testimonials-container container'>
                    {(heading !== '' || linkText !== '') &&
                        <div className='ges-testimonials-main-heading-block'>
                            {heading &&
                                <h2 className='ges-testimonials-heading'>{heading}</h2>}
                            {linkText &&
                                <a className='ges-view-more wp-block-read-more right-arrow' href={viewMoreLink}>{linkText}</a>}
                        </div>}
                    <Splide className="ges-testimonials__slider"
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
                        <div class="my-slider-progress">
                            <div class="my-slider-progress-bar"></div>
                        </div>
                    </Splide>
                </div>
            </div>
        </>
    );

};

export default Edit;