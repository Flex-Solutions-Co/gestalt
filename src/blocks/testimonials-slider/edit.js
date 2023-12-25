/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    InspectorControls,
} from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { useSelect, useDispatch, dispatch } from "@wordpress/data";
import { TextControl, PanelBody, Button } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";

/**
 * external dependencies
 */
import classnames from "classnames";

const ALLOWED_BLOCKS = ["gestalt/testimonials-slide"];
const MY_TEMPLATE = [
    ["gestalt/testimonials-slide", {}],
    ["gestalt/testimonials-slide", {}],
];

export const sliderSetting = {
    slidesPerView: 3,
    spaceBetween: 30,
};

const Edit = (props) => {
    const { attributes, setAttributes, clientId } = props;
    const { heading, linkText, viewMoreLink, recordId, cover } = attributes;

    const blockProps = useBlockProps({
        className: classnames("ges-testimonials--slider-section"),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: MY_TEMPLATE,
        allowedBlocks: ALLOWED_BLOCKS,
        templateLock: false,
        renderAppender: false,
        orientation: "horizontal",
    });

    const block = useSelect((select) => {
        return select("core/block-editor").getBlock(clientId);
    }, []); //Get Block by ID

    const { replaceInnerBlocks, updateBlockAttributes } =
        useDispatch("core/block-editor"); //Dispatch for inner blocks

    const addNewSlideHandler = () => {
        const newBlock = createBlock("gestalt/testimonials-slide", {});
        const newIndex = innerBlocks?.length + 1;
        const { insertBlock } = dispatch("core/block-editor");
        insertBlock(newBlock, newIndex, clientId, true);
    };

    const removeBlockHandler = (clientId, index) => {
        const { removeBlock } = dispatch("core/block-editor");

        if (block.innerBlocks.length > 0) {
            const isLastBlock = index === block.innerBlocks.length - 1;
            removeBlock(clientId, true);
            if (isLastBlock && block.innerBlocks.length > 1) {
                // If it's the last block, select the previous block
                let selectPrevBlockClientId = block.innerBlocks[index - 1].clientId;
                slideNavBlock(selectPrevBlockClientId);
            } else if (!isLastBlock) {
                // If it's not the last block, select the next block
                let selectNextBlockClientId = block.innerBlocks[index + 1].clientId;
                slideNavBlock(selectNextBlockClientId);
            }
        }
    };

    const slideNavBlock = (clientId) => {
        dispatch("core/block-editor").selectBlock(clientId);
        if (recordId !== clientId) {
            setAttributes({ recordId: clientId });
        }
    };

    const innerBlocks = block?.innerBlocks;

    useEffect(() => {
        if (innerBlocks?.length > 0) {
            const defaultClientId = innerBlocks[0]?.clientId;

            if (recordId !== defaultClientId) {
                setAttributes({ recordId: defaultClientId });
            }
        }
    }, []);

    const selectedBlock = useSelect((select) =>
        select("core/block-editor").getSelectedBlock()
    );

    useEffect(() => {
        if (selectedBlock && selectedBlock?.name === "gestalt/testimonials-slide") {
            if (recordId !== selectedBlock?.clientId) {
                setAttributes({ recordId: selectedBlock.clientId });
            }
        }
    }, [selectedBlock]);

    const PlusIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#00306b"
                width="20px"
                height="20px"
            >
                <path
                    d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z"
                    fill="#00306b"
                />
                <path
                    d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z"
                    fill="#00306b"
                />
            </svg>
        );
    };

    const CloseIcon = () => {
        return (
            <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="10"
                height="10"
            >
                <path
                    d="m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                    fill="#fff"
                />
            </svg>
        );
    };

    function SlideTab() {
        return (
            <div className="navigation-slide">
                <div className="slider__tabs">
                    {block.innerBlocks.map((innerBlock, index) => {
                        let activeCls = innerBlock.clientId == recordId ? "active" : "";

                        return (
                            <div
                                className="tab__btn"
                                key={`slideItem_${innerBlock.clientId}`}
                            >
                                <button
                                    className={`tab__select ${activeCls}`}
                                    onClick={() => slideNavBlock(innerBlock.clientId)}
                                >{`Slide ${index + 1}`}</button>
                                <span
                                    className="tab__remove"
                                    onClick={() => removeBlockHandler(innerBlock.clientId, index)}
                                >
                                    <CloseIcon />
                                </span>
                            </div>
                        );
                    })}
                    <button className="tab__add" onClick={() => addNewSlideHandler()}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        );
    }

    if (cover !== '') {
		return (
			<img src={cover} width="1728" height="826" />
		)
	}

    return (
        <div className={`ges-main-block ${blockProps.className}`}>
            <InspectorControls>
                <PanelBody title="Slide Settings" initialOpen={true}>
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
                        onChange={(newViewMoreLink) =>
                            setAttributes({ viewMoreLink: newViewMoreLink })
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <SlideTab />
            <div {...blockProps} data-settings={JSON.stringify(sliderSetting)}>
           
                <div className="ges-testimonials-container container">
                    {(heading !== "" || linkText !== "") && (
                        <div className="ges-testimonials-main-heading-block">
                            {heading && (
                                <h2 className="ges-testimonials-heading">{heading}</h2>
                            )}
                            {linkText && (
                                <a
                                    className="ges-view-more wp-block-read-more right-arrow"
                                    href={viewMoreLink}
                                >
                                    {linkText}
                                </a>
                            )}
                        </div>
                    )}
                    <div className="swiper-container">
                        <div className="swiper testiSwiper">
                            <div className="swiper-wrapper">{innerBlocksProps.children}</div>
                            <div className="swiper-scrol-top">
                                <div className="swiper-scrollbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
