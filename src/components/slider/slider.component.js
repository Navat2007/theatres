import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = function ({
    items = [],
    infiniteLoop = false,
    swipeable = true,
    showStatus = false,
    showThumbs = false,
    centerMode = false,
    width,
    height,
    autoPlay = false,
    autoPlayTime = 5000,
}) {
    return (
        <Carousel
            autoPlay={autoPlay}
            interval={autoPlayTime}
            infiniteLoop={infiniteLoop}
            swipeable={swipeable}
            showStatus={showStatus}
            showThumbs={showThumbs}
            centerMode={centerMode}
        >
            {items.length &&
                items.map((item) => (
                    <div key={item.alt}>
                        <img
                            src={item.url}
                            alt={item.alt}
                        />
                    </div>
                ))}
        </Carousel>
    );
};

export default Slider;
