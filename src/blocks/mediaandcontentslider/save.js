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
		className: classnames('ges-media-and-content-section')
	});

	const { heading, description } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);
	return (
		<div {...blockProps}>
			<div className='ges-media-and-content-wrapper'>
				<div className='ges-media-wrapper'>
					<Splide className="ges-media-and-content-inner-wrapper"
						hasTrack={false}
						options={sliderSetting}
						data-settings={JSON.stringify(sliderSetting)}
					>
						<SplideTrack {...innerBlocksProps}>
							{innerBlocksProps.children}
						</SplideTrack>
						<div className="ges-custom-arrow">
							<button className="paginate--arrow paginate--prev">
								<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M25.0086 11.2829C24.6314 10.9057 24.0257 10.9057 23.6486 11.2829L15.2829 19.6486C14.9057 20.0257 14.9057 20.6314 15.2829 21.0086L23.6486 29.3743C23.8371 29.5629 24.0829 29.6543 24.3286 29.6543C24.5743 29.6543 24.82 29.5629 25.0086 29.3743C25.3857 28.9971 25.3857 28.3914 25.0086 28.0143L17.3171 20.3286L25.0086 12.6429C25.3857 12.2657 25.3857 11.66 25.0086 11.2829Z" fill="black" />
								</svg>
							</button>
							<div className="pagination">
								<span className='current-page'>1</span>
								<span className='lash'>/</span>
								<span className='last-page'>0</span>
							</div>
							<button className="paginate--arrow paginate--next">
								<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.9914 28.7171C15.3686 29.0943 15.9743 29.0943 16.3514 28.7171L24.7171 20.3514C25.0943 19.9743 25.0943 19.3686 24.7171 18.9914L16.3514 10.6257C16.1629 10.4371 15.9171 10.3457 15.6714 10.3457C15.4257 10.3457 15.18 10.4371 14.9914 10.6257C14.6143 11.0029 14.6143 11.6086 14.9914 11.9857L22.6829 19.6714L14.9914 27.3571C14.6143 27.7343 14.6143 28.34 14.9914 28.7171Z" fill="black" />
								</svg>
							</button>
						</div>
					</Splide>
				</div>
				{(heading !== '' || linkText !== '') &&
					<div className='ges-content-details'>
						{heading &&
							<h2 className='ges-heading'>{heading}</h2>}
						{description &&
							<p className='ges-description'>{description}</p>}

					</div>
				}
			</div>
		</div>
	);
};
export default Save;