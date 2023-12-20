/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";

import { TextControl, PanelBody, Icon, ToggleControl } from "@wordpress/components";

import { VideoIcon } from "./videoicon";

const ALLOWED_MEDIA_TYPES = ["image", "video"];
const ALLOWED_MEDIA_TYPES_VIDEO = ["video"];

const Edit = (props) => {
    const { attributes, setAttributes, isSelected } = props;

    const {
        addVideoUrl,
        poster,
        isSelfHosted,
        lightBoxVideo,
        lightBoxVideoMediaId,
        posterMediaId,
        cover
    } = attributes;

    if (cover !== '') {
		return (
			<img src={cover} width="1728" height="826" />
		)
	}

    const blockProps = useBlockProps({
        className: "video-player-section",
    });

    const ImagePlaceholder = ({ mediaOpenHandle }) => {
        if (poster?.media === undefined) {
            return (
                <div className="slider-main-wrapper" onClick={mediaOpenHandle}>
                    <div className="slider-inner-wrapper">
                        {" "}
                        <Icon icon="plus-alt" />
                    </div>
                </div>
            );
        }

        const { media, type, caption } = poster;

        return (
            <div className="slider-main-wrapper">
                <div
                    style={{
                        background: "#fff",
                        padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                    }}
                    onClick={mediaOpenHandle}
                >
                    {type === "image" ? (
                        <img
                            style={{
                                aspectRatio: "16/9",
                                objectFit: "contain",
                                objectPosition: "center",
                            }}
                            src={media?.url}
                            alt={caption}
                            width={media?.width}
                            height={media?.height}
                        />
                    ) : (
                        <video
                            style={{ aspectRatio: "16/9" }}
                            preload="metadata"
                            title={caption}
                        >
                            <source
                                src={media?.url}
                                width={media?.width}
                                height={media?.height}
                            />
                        </video>
                    )}
                </div>

                <div className="slider-trash-icn">
                    <Icon
                        icon="trash"
                        onClick={() => setAttributes({ poster: {} })}
                    />
                </div>
            </div>
        );
    };

    const MbImagePlaceholder = ({ mediaMbOpenHandle }) => {
        if (lightBoxVideo?.media === undefined) {
            return (
                <div className="slider-main-wrapper" onClick={mediaMbOpenHandle}>
                    <div className="slider-inner-wrapper">
                        {" "}
                        <Icon icon="plus-alt" />
                    </div>
                </div>
            );
        }
        const { media, type, caption } = lightBoxVideo;
        return (
            <div className="slider-main-wrapper">
                <div
                    style={{
                        background: "#fff",
                        padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                    }}
                    onClick={mediaMbOpenHandle}
                >
                    <video
                        style={{ aspectRatio: "16/9" }}
                        preload="metadata"
                        title={caption}
                    >
                        <source
                            src={media?.url}
                            width={media?.width}
                            height={media?.height}
                        />
                    </video>
                </div>
                <div className="slider-trash-icn">
                    <Icon
                        icon="trash"
                        onClick={() => setAttributes({ lightBoxVideo: {} })}
                    />
                </div>
            </div>
        );
    };

    const VideoWrapper = ({ children }) => {
        if (
            (isSelfHosted === true && lightBoxVideo?.media?.url) ||
            addVideoUrl !== ""
        ) {
            const videoUrl = isSelfHosted ? lightBoxVideo?.media?.url : addVideoUrl;
            return (
                <div className="video_wrapper">
                    <a
                        style={{ pointerEvents: "none" }}
                        className="glightbox"
                        href={videoUrl}
                    >
                        {children}
                    </a>
                    <div className="play-icon">
                        <VideoIcon />
                    </div>
                </div>
            );
        }

        return <div className="video_wrapper">{children}</div>;
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Media Settings" initialOpen={true}>
                    <div className="media-setting-wrapper">
                        <h4 className="media-heading">Video Poster</h4>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(newMedia) => {
                                    const type = newMedia.type;
                                    const mediaObject = {
                                        type: newMedia.type,
                                        caption: newMedia.caption,
                                    };
                                    if (type === "image") {
                                        mediaObject.media = newMedia.sizes.full;
                                    }
                                    if (type === "video") {
                                        mediaObject.media = {
                                            url: newMedia.url,
                                            width: newMedia.width,
                                            height: newMedia.height,
                                        };
                                    }
                                    setAttributes({
                                        poster: mediaObject,
                                        posterMediaId: newMedia.id,
                                    });
                                }}
                                value={posterMediaId}
                                Types={ALLOWED_MEDIA_TYPES}
                                multiple={false}
                                render={({ open }) => (
                                    <ImagePlaceholder mediaOpenHandle={open} />
                                )}
                            />
                        </MediaUploadCheck>
                    </div>

                    {!isSelfHosted && (
                        <TextControl
                            label="Lightbox video Url"
                            value={addVideoUrl}
                            onChange={(addNewVideoUrl) =>
                                setAttributes({ addVideoUrl: addNewVideoUrl })
                            }
                        />
                    )}

                    <ToggleControl
                        label="Self Hosted Video ?"
                        checked={isSelfHosted}
                        onChange={(value) => {
                            setAttributes({ isSelfHosted: value });
                        }}
                    />
                    {isSelfHosted && (
                        <div className="media-setting-wrapper">
                            <h4 className="media-heading">Upload Lightbox Video</h4>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(newMbMedia) => {
                                        const mediaObject = {
                                            type: newMbMedia?.type,
                                            caption: newMbMedia?.caption,
                                            media: {
                                                url: newMbMedia?.url,
                                                width: newMbMedia?.width,
                                                height: newMbMedia?.height,
                                            },
                                        };

                                        setAttributes({
                                            lightBoxVideo: mediaObject,
                                            lightBoxVideoMediaId: newMbMedia.id,
                                        });
                                    }}
                                    value={lightBoxVideoMediaId}
                                    allowedTypes={ALLOWED_MEDIA_TYPES_VIDEO}
                                    multiple={false}
                                    render={({ open }) => (
                                        <MbImagePlaceholder
                                            mediaMbOpenHandle={open}
                                        />
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                {poster?.media ? (
                    <VideoWrapper>
                        {poster?.type === "image" ? (
                            <img
                                src={poster?.media?.url}
                                alt={poster?.caption}
                                width={poster?.media?.width}
                                height={poster?.media?.height}
                            />
                        ) : (
                            <video
                                style={{ aspectRatio: "16/9" }}
                                preload="metadata"
                                title={poster?.caption}
                            >
                                <source
                                    src={poster?.media?.url}
                                    width={poster?.media?.width}
                                    height={poster?.media?.height}
                                />
                            </video>
                        )}
                    </VideoWrapper>
                ) : (
                    <div>Please select Poster Image and Video</div>
                )}
            </div>
        </>
    );
};
export default Edit;
