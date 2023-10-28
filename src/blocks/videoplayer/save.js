/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { VideoIcon } from "./videoicon";
const Save = ({ attributes }) => {
    const { poster, isSelfHosted, lightBoxVideo, addVideoUrl } = attributes;

    const blockProps = useBlockProps.save();

    const VideoWrapper = ({ children }) => {
        if (
            (isSelfHosted === true && lightBoxVideo?.media?.url) ||
            addVideoUrl !== ""
        ) {
            const videoUrl = isSelfHosted ? lightBoxVideo?.media?.url : addVideoUrl;
            return (
                <div className="video_wrapper">
                    <a className="glightbox" href={videoUrl}>
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
                            autoPlay
                            muted
                        >
                            <source
                                src={poster?.media?.url}
                                width={poster?.media?.width}
                                height={poster?.media?.height}
                            />
                        </video>
                    )}
                </VideoWrapper>
            ) : null}
        </div>
    );
};
export default Save;
