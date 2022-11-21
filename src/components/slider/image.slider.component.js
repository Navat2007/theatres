import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({
                         items,
                         index = 0,
                         infiniteLoop = true,
                         showArrows = true,
                         showIndicators = true,
                         showStatus = false,
                         showThumbs = false,
                         autoPlay = false,
                         interval = 10000,
                         transitionTime = 0,
                         swipe = true,
                     }) => {
    return (
        <>
            <Carousel
                selectedItem={index}
                infiniteLoop={infiniteLoop}
                showIndicators={showIndicators}
                showArrows={showArrows}
                showStatus={showStatus}
                autoPlay={autoPlay}
                animationHandler={"fade"}
                interval={interval}
                transitionTime={transitionTime}
                stopOnHover
                swipeable={swipe}
                emulateTouch={swipe}
                swipeScrollTolerance={5}
                showThumbs={showThumbs}
            >
                {
                    items.map((item, index) => (
                        <img
                            key={index}
                            src={item.url}
                            alt=""
                        />
                    ))
                }
            </Carousel>
        </>
    );
};

export default ImageSlider;