/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";
import { sliderSetting } from "./edit";

/**
 * external dependencies
 */
import classnames from "classnames";

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        className: classnames("ges-testimonials--slider-section"),
    });

    const { heading, linkText, viewMoreLink } = attributes;
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return (
        <div {...blockProps} data-settings={JSON.stringify(sliderSetting)}>
            <div className="ges-testimonials-container container">
                {(heading !== "" || linkText !== "") && (
                    <div className="ges-testimonials-main-heading-block">
                        {heading && <h2 className="ges-testimonials-heading">{heading}</h2>}
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
                    <div className="swiper ges-testimonial__slider">
                        <div className="swiper-wrapper">{innerBlocksProps.children}</div>
                        <div className="swiper-scrol-top">
                            <div className="swiper-scrollbar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Save;
