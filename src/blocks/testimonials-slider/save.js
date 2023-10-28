/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { sliderSetting } from './edit';

/**
 * external dependencies
 */
import classnames from "classnames";

const Save = ({ attributes }) => {

	const blockProps = useBlockProps.save({
		className: classnames('ges-testimonials--slider-section')
	});

	const { heading, linkText, viewMoreLink } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<div {...blockProps}>
			<div className='ges-testimonials-container container'>
				{(heading !== '' || linkText !== '') &&
					<div className='ges-testimonials-main-heading-block'>
						{heading &&
							<h2 className='ges-testimonials-heading'>{heading}</h2>}
						{linkText &&
							<a className='ges-view-more wp-block-read-more right-arrow' href={viewMoreLink}>{linkText}</a>}
					</div>
				}
				<Splide className="ges-testimonials__slider"
					hasTrack={false}
					options={sliderSetting}
					data-settings={JSON.stringify(sliderSetting)}
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
	);
};
export default Save;