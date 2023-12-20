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
import { useRef, useState, useEffect } from '@wordpress/element';
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

const ALLOWED_BLOCKS = ['gestalt/mediaandcontentslide'];
const MY_TEMPLATE = [
    ['gestalt/mediaandcontentslide', {}],
    ['gestalt/mediaandcontentslide', {}]
]


export const sliderSetting = {
    // type: 'loop',
    perPage: 1,
    autoplay: false,
    gap: '0px',
    perMove: 1,
    arrows: false,
    pagination: true,
    drag: true,
    slideFocus: false,
}

const Edit = (props) => {

    const { attributes, setAttributes, clientId } = props;
    const { heading, description, cover } = attributes;
    const sliderRef = useRef();
    const [page, setPage] = useState("");

    if (cover !== '') {
		return (
			<img src={cover} width="1728" height="826" />
		)
	}

    const addNewSlideHandler = () => {
        let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
        innerBlocks.push(createBlock('gestalt/mediaandcontentslide', {}));
        replaceInnerBlocks(clientId, innerBlocks, false);
    }

    const updatePageination = () => {
        const splidePagiantionItems = sliderRef?.current?.splide;
        const length = splidePagiantionItems?.length;
        const index = splidePagiantionItems?.index;
        setPage(`${index + 1} / ${length}`);
    };

    useEffect(() => {
        updatePageination();
    }, [addNewSlideHandler]);

    const blockProps = useBlockProps({
        className: classnames('ges-media-and-content-section')
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

    const { replaceInnerBlocks, updateBlockAttributes } = useDispatch('core/block-editor'); //Dispatch for inner blocks

    function sliderMove(action) {
        const sliderInstance = sliderRef.current;
        sliderInstance.go(action);
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slide Settings" initialOpen={true}>
                    <Button variant="secondary" className='btn-add-new-slider' onClick={addNewSlideHandler}>Add New Slide</Button>
                    <TextControl
                        label="Heading"
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
                <div className='ges-media-and-content-wrapper'>
                    <div className='ges-media-wrapper'>
                        <Splide className="ges-media-and-content-inner-wrapper"
                            hasTrack={false}
                            options={sliderSetting}
                            ref={sliderRef}
                            data-settings={JSON.stringify(sliderSetting)}
                            onMoved={() => {
                                updatePageination();
                            }}
                            onUpdated={() => {
                                updatePageination();
                            }}
                        >
                            <SplideTrack {...innerBlocksProps}>
                                {innerBlocksProps.children}
                            </SplideTrack>
                            <div className="ges-custom-arrow">
                                <button className="paginate--arrow paginate--prev" onClick={() => sliderMove("<")}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25.0086 11.2829C24.6314 10.9057 24.0257 10.9057 23.6486 11.2829L15.2829 19.6486C14.9057 20.0257 14.9057 20.6314 15.2829 21.0086L23.6486 29.3743C23.8371 29.5629 24.0829 29.6543 24.3286 29.6543C24.5743 29.6543 24.82 29.5629 25.0086 29.3743C25.3857 28.9971 25.3857 28.3914 25.0086 28.0143L17.3171 20.3286L25.0086 12.6429C25.3857 12.2657 25.3857 11.66 25.0086 11.2829Z" fill="black" />
                                    </svg>
                                </button>
                                <div className="pagination">{page}</div>
                                <button className="paginate--arrow paginate--next" onClick={() => sliderMove(">")}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9914 28.7171C15.3686 29.0943 15.9743 29.0943 16.3514 28.7171L24.7171 20.3514C25.0943 19.9743 25.0943 19.3686 24.7171 18.9914L16.3514 10.6257C16.1629 10.4371 15.9171 10.3457 15.6714 10.3457C15.4257 10.3457 15.18 10.4371 14.9914 10.6257C14.6143 11.0029 14.6143 11.6086 14.9914 11.9857L22.6829 19.6714L14.9914 27.3571C14.6143 27.7343 14.6143 28.34 14.9914 28.7171Z" fill="black" />
                                    </svg>

                                </button>
                            </div>
                        </Splide>
                    </div>
                    <div className='ges-content-details'>
                        {heading &&
                            <h2 className='ges-heading'>{heading}</h2>}
                        {description &&
                            <p className='ges-description'>{description}</p>}

                    </div>
                </div>
            </div>
        </>
    );

};

export default Edit;