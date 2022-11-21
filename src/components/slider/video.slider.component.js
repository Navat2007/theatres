import React from 'react';
import {Carousel} from "react-responsive-carousel";
import ReactPlayer from "react-player";

const VideoSlider = ({items}) => {

    function youtube_parser(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const YoutubeSlide = ({url, isSelected}) => (
        <ReactPlayer
            width="100%"
            height={"auto"}
            className="video__react-player"
            url={url}
            playing={isSelected}
            controls={true}
        />
    );

    const customRenderItem = (item, props) => (
        <item.type
            {...item.props}
            {...props}
        />
    );

    const getVideoThumb = (videoId) =>
        `https://img.youtube.com/vi/${videoId}/default.jpg`;

    const customRenderThumb = (children) =>
        children.map((item) => {
            return <img src={getVideoThumb(youtube_parser(item.props.url))} alt={"Видео"}/>;
        });

    return (
        <>
            <Carousel
                showStatus={false}
                renderItem={customRenderItem}
                renderThumbs={customRenderThumb}
            >
                {
                    items.map(item => (
                        <YoutubeSlide
                            key={window.global.makeid(10)}
                            url={item.url}
                        />
                    ))
                }
            </Carousel>
        </>
    );
};

export default VideoSlider;