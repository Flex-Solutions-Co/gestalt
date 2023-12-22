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
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { useRef, useEffect } from '@wordpress/element';
import {
    TextControl,
    PanelBody,
    Button,
    TextareaControl
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
// import { Splide, SplideTrack } from '@splidejs/react-splide';

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
    slidesPerView: 2.5,
    spaceBetween: 12,
};

const Edit = (props) => {
    const { attributes, setAttributes, clientId } = props;
    const { heading, description, cover } = attributes;
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

    const slideNavBlock = (clientId) => {
        dispatch("core/block-editor").selectBlock(clientId);
    };

    if (cover !== '') {
        return (
            <img src={cover} width="1728" height="826" />
        )
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slide Settings" initialOpen={true}>
                    {/* <Button variant="secondary" className='btn-add-new-slider' onClick={addNewSlideHandler}>Add New Slide</Button> */}
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

            <div {...blockProps} data-settings={JSON.stringify(sliderSetting)} >

                <div className="navigation-slide">
                    <div className="navigation-scroll">
                        {block.innerBlocks.map((innerBlock, index) => {
                            let activeBtn = index === 0 ? "active-btn" : "";

                            return (
                                <button
                                    className="slide-index-btn"
                                    onClick={() => slideNavBlock(innerBlock.clientId)}
                                >{`Slide ${index + 1}`}</button>
                            );
                        })}
                    </div>
                    <div className="add-new-slide">
                        <button
                            className="add-slide-btn"
                            onClick={() => addNewSlideHandler()}
                        >
                            Add Slide
                        </button>
                    </div>
                </div>

                <div className='ges-verticle-container'>
                    {(heading !== '' || linkText !== '') &&
                        <div className='ges-casestudy-main-heading-block'>
                            {heading &&
                                <h2 className='ges-casestudy-heading'>{heading}</h2>}
                            {description &&
                                <p className='ges-description'>{description}</p>}
                        </div>
                    }

                    <div className="swiper-container">
                        <div className="swiper ges-verticle__slider">
                            <div className="swiper-wrapper">{innerBlocksProps.children}</div>
                            <div className="swiper-scrol-top">
                                <div className="swiper-scrollbar"></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );

};

export default Edit;