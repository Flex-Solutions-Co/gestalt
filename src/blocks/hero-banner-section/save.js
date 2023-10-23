/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { useState } from '@wordpress/element';
import { Icon } from '@wordpress/components';

const Save = ({ attributes }) => {

	const { desktopMediaSrc, mobileMediaSrc } = attributes;
	const blockProps = useBlockProps.save();
	return (
		<>
			<div {...blockProps}>
				<div class="ges-media-slide">
					<picture>
						{mobileMediaSrc &&
							<source media="(max-width:781px)" srcset={mobileMediaSrc} />}
						<img src={desktopMediaSrc} alt="Flowers" />
					</picture>
				</div>
			</div>
		</>
	);
};
export default Save;