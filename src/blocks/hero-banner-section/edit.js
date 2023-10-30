/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	Button,
	TextareaControl,
	Icon
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = (props) => {

	const { attributes, setAttributes, isSelected } = props;

	const { desktopMediaId, desktopMediaSrc, mobileMediaId, mobileMediaSrc } = attributes;

	const blockProps = useBlockProps({
		className: "ges-media-slide-section",
		renderAppender: false,
	});

	const imageRemoveHandler = () => {
		setAttributes({ desktopMediaId: undefined, desktopMediaSrc: undefined });
	}
	const mbimageRemoveHandler = () => {
		setAttributes({ mobileMediaId: undefined, mobileMediaSrc: undefined });
	}

	// Desktop
	useSelect(
		async (select) => {
			const { getMedia } = select(coreStore);
			if (desktopMediaId) {
				const image = (desktopMediaId && isSelected) ? await getMedia(desktopMediaId, { context: 'view' }) : null;
				if (image !== null) {
					let imageSrc = image ? image?.media_details?.sizes?.large?.source_url : '';
					if (imageSrc === undefined) {
						imageSrc = image?.media_details?.sizes?.full?.source_url;
					}
					setAttributes({ desktopMediaSrc: imageSrc });
				}
			}
			if (mobileMediaId) {
				const mobileimage = (mobileMediaId && isSelected) ? await getMedia(mobileMediaId, { context: 'view' }) : null;
				if (mobileimage !== null) {
					let mbimageSrc = mobileimage ? mobileimage?.media_details?.sizes?.large?.source_url : '';
					if (mbimageSrc === undefined) {
						mbimageSrc = mobileimage?.media_details?.sizes?.full?.source_url;
					}
					setAttributes({ mobileMediaSrc: mbimageSrc });
				}
			}
		},
		[desktopMediaId, mobileMediaId, isSelected]
	);

	const ImagePlaceholder = ({ mediaOpenHandle }) => {
		return (
			<div className='slider-main-wrapper'>

				<div className={`${desktopMediaSrc ? 'slider-wrapper' : 'slider-inner-wrapper'}`} onClick={mediaOpenHandle}>
					{desktopMediaSrc && <img src={desktopMediaSrc} />}
					<Icon icon="plus-alt" />
				</div>
				{desktopMediaSrc &&
					<div className='slider-trash-icn'>
						<Icon icon="trash" onClick={imageRemoveHandler} />
					</div>
				}
			</div>
		)
	}

	const MbImagePlaceholder = ({ mediaMbOpenHandle }) => {
		return (
			<div className='slider-main-wrapper'>
				<div className={`${mobileMediaSrc ? 'slider-wrapper' : 'slider-inner-wrapper'}`} onClick={mediaMbOpenHandle}>
					{mobileMediaSrc && <img src={mobileMediaSrc} />}
					<Icon icon="plus-alt" />
				</div>
				{mobileMediaSrc &&
					<div className='slider-trash-icn'>
						<Icon icon="trash" onClick={mbimageRemoveHandler} />
					</div>
				}
			</div>
		)
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title="Media Settings" initialOpen={true}>
				<div className='media-setting-wrapper'>
						<h4 className='media-heading'>Upload desktop Media</h4>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(newMedia) => {
									setAttributes({ desktopMediaId: newMedia?.id })
								}}
								value={desktopMediaId}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								multiple={false}
								render={({ open }) => (
									<ImagePlaceholder mediaOpenHandle={open} />
								)}
							/>
						</MediaUploadCheck>
					</div>

					<div className='media-setting-wrapper'>
						<h4 className='media-heading'>Upload Mobile Media</h4>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(newMbMedia) => {
									setAttributes({ mobileMediaId: newMbMedia?.id })
								}}
								value={mobileMediaId}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								multiple={false}
								render={({ open }) => (

									<MbImagePlaceholder mediaMbOpenHandle={open} />
								)}
							/>
						</MediaUploadCheck>
					</div>
			</PanelBody>
		</InspectorControls >

			<div {...blockProps}>
				<div class="ges-media-slide">
					<picture>
						{mobileMediaSrc &&
							<source media="(max-width:781px)" srcset={mobileMediaSrc} />}
						<img src={desktopMediaSrc} alt="Hero Banner Image" />
					</picture>
				</div>
			</div>
		</>
	);
};
export default Edit;