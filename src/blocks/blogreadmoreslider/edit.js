import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useState, useRef, useEffect } from '@wordpress/element';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import { store as editPostStore } from '@wordpress/edit-post';

export default function Edit(props) {

	const { attributes, setAttributes } = props;
	const { perPage, cover, blogMainHeading, allBlogText, allBlogUrl } = attributes;

	if (cover !== '') {
		return (
			<img src={cover} width="1728" height="826" />
		)
	}

	const [allposts, setAllPosts] = useState([]);
	const sliderRef = useRef();
	const blockProps = useBlockProps();

	const { postsData } = useSelect(select => {
		const { getEntityRecords } = select('core');

		// Retrieve the post and check its status
		const postsData = getEntityRecords('postType', 'post', { status: 'publish', perPage: -1 });
		return { postsData: postsData }

	}, []);

	if (allposts.length === 0 && postsData !== null) {
		let readMoreData = [...postsData];
		const slicedToEndArray = readMoreData.slice(0, perPage);
		setAllPosts(slicedToEndArray);
	}

	const onChangePerPage = (newValue) => {
		setAttributes({ perPage: newValue });
		let readMoreData = [...postsData];
		if (readMoreData.length > newValue) {
			const slicedToEndArray = readMoreData.slice(0, newValue);
			setAllPosts(slicedToEndArray);
		}
	}

	const RenderImg = (props) => {
		const imageID = props.imageID;

		const imageData = useSelect((select) => {
			const { getMedia } = select('core');
			return getMedia(imageID);
		}, [imageID]);

		if (imageData === undefined) return null;
		const url = imageData.media_details.sizes.full.source_url;
		const alt_text = imageData.alt_text;

		return (
			<div className="kid_featured_img">
				<img src={url} alt={alt_text} />
			</div>
		);
	};

	const { deviceType } =
		useSelect((select) => {
			return {
				deviceType:
					select(
						editPostStore
					).__experimentalGetPreviewDeviceType(),
			};
		}, []);


	useEffect(() => {
		let refresh = true;
		if (refresh && (deviceType === 'Tablet' || deviceType === 'Mobile')) {
			const sliderInstance = sliderRef.current;
			if (sliderInstance) {
				sliderInstance.splide.refresh();
				refresh = false;
			}
		}
	}, [deviceType]);

	let ItemPerPage = 3;
	// let padding = "20px";
	if (deviceType === 'Tablet') {
		ItemPerPage = 2;
	}

	if (deviceType === 'Mobile') {
		ItemPerPage = 1;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Read More Settings", "gestalt")}
					initialOpen={true}
				>

					<RangeControl
						label="Blog To show"
						value={perPage}
						onChange={onChangePerPage}
						min={5}
					/>

					<TextControl
						label="Blog Heading"
						value={blogMainHeading}
						onChange={(newblogMainHeading) => setAttributes({ blogMainHeading: newblogMainHeading })}
					/>

					<TextControl
						label="All Blog Text"
						value={allBlogText}
						onChange={(newallBlogText) => setAttributes({ allBlogText: newallBlogText })}
					/>

					<TextControl
						label="All Blog Url"
						value={allBlogUrl}
						onChange={(newallBlogUrl) => setAttributes({ allBlogUrl: newallBlogUrl })}
					/>

				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				
					{blogMainHeading && <h2 className='gestalt-main-heading'>{blogMainHeading}</h2>}
					<Splide hasTrack={false} ref={sliderRef}
						options={{
							perPage: ItemPerPage,
							perMove: 1,
							arrows: false,
							pagination: true,
							gap: "20px",
							drag: true,
							slideFocus: false,
							pauseOnHover: false,
							pauseOnFocus : false,
				
						}}
						className="gestalt-read-more_slider"
						id="gestalt-read-more_slider"
					>
						<SplideTrack>
							{allposts.map((post) => {
								return (
									<SplideSlide>
										<div className="gestalt-read-more_header">
											{
												post.featured_media &&
												<a className="pointer-none" href={post.link}>
													<RenderImg imageID={post.featured_media} />
												</a>
											}
											{
												post?.title?.rendered &&
												<h3 className="gestalt-read-more_title">
													<a className="pointer-none" href={post.link}>{post.title.rendered}</a>
												</h3>
											}
											{post?.excerpt?.raw && <p className="gestalt-read-more_content">{post.excerpt.raw}</p>}
											{post?.link && <a className="right-arrow wp-block-read-more" href={post.link}>View Blog</a>}
										</div>
									</SplideSlide>
								);
							})}
						</SplideTrack>
						{allBlogUrl &&
							<div className="read-more">
								<a className="right-arrow wp-block-read-more" href={allBlogUrl}>{allBlogText}</a></div>}
					</Splide>
		
			</section>
		</>
	);
}
