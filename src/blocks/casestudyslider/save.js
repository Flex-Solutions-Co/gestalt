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
		className: classnames('ges-verticle--slider-section')
	});

	const { heading, description } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<div {...blockProps}>
			<div className='ges-verticle-container'>
				{(heading !== '' || linkText !== '') &&
					<div className='ges-casestudy-main-heading-block'>
						{heading &&
							<h2 className='ges-casestudy-heading'>{heading}</h2>}
						{description &&
							<p className='ges-description'>{description}</p>}
					</div>
				}
				<Splide className="ges-verticle__slider"
					hasTrack={false}
					options={sliderSetting}
					data-settings={JSON.stringify(sliderSetting)}
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
	);
};
export default Save;