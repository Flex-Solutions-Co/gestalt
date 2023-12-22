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
  const { heading, linkText, viewMoreLink, cover } = attributes;

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
    let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
    innerBlocks.push(createBlock("gestalt/testimonials-slide", {}));
    replaceInnerBlocks(clientId, innerBlocks, false);
  };

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
      <div {...blockProps} data-settings={JSON.stringify(sliderSetting)}>
        <div className="navigation-slide">
          <div className="navigation-scroll">
            {block.innerBlocks.map((innerBlock, index) => {
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
        {/* <div {...blockProps} data-settings={JSON.stringify(sliderSetting)}> */}
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
        {/* </div> */}
      </div>
    </>
  );
};

export default Edit;
