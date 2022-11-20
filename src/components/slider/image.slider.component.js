import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({
                         items,
                         infiniteLoop = true,
                         showArrows = true,
                         showStatus = false,
                         showThumbs = false,
                         autoPlay = false,
                         interval = 10000,
                         swipe = true,
                     }) => {
    return (
        <>
            <Carousel
                infiniteLoop={infiniteLoop}
                // showIndicators={false}
                showArrows={showArrows}
                showStatus={showStatus}
                autoPlay={autoPlay}
                animationHandler={"fade"}
                interval={interval}
                transitionTime={1000}
                stopOnHover
                swipeable={swipe}
                emulateTouch={swipe}
                swipeScrollTolerance={5}
                showThumbs={showThumbs}
            >
                {
                    items.map(item => (
                        <div className="banner">
                            <div className="banner__wrap">
                                <img
                                    className="banner__img"
                                    src={item.url}
                                    alt=""
                                />
                                <h2 className="banner__title">
                                    {item.title}
                                </h2>
                                <p className="banner__subtitle">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </Carousel>
        </>
    );
};

export default ImageSlider;