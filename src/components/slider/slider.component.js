import React, { useEffect, useState, createContext, useContext  } from "react";
import PropTypes from "prop-types";

import "./style.scss";

export const SliderContext = createContext();

const Slider = function ({ items, width, height, autoPlay, autoPlayTime }) {

    const [slide, setSlide] = useState(0);
    const [animation, setAnimation] = useState(true);

    const preloadImages = () => {
        const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
        const nextItemIndex = (slide + 1) % items.length;

        new Image().src = items[slide].url;
        new Image().src = items[prevItemIndex].url;
        new Image().src = items[nextItemIndex].url;
    }

    useEffect(() => {
        if (items.length) {
            preloadImages();
        }
    }, [slide, items])

    const changeSlide = (direction = 1) => {
        setAnimation(false);
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);

        const timeout = setTimeout(() => {
            setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

    const goToSlide = (number) => {
        setAnimation(false);
        setSlide(number % items.length);

        const timeout = setTimeout(() => {
            setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide]); // when images uploaded or slide changed manually we start timer

    return (
        <div style={{ width, height }} className="slider">
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                }}
            >
                <Arrows />
                {
                    items.length ? (
                        <Slide data={items[slide]} animation={animation} />
                    ) : null
                }
                <Dots />
            </SliderContext.Provider>
        </div>
    );
};

Slider.propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};

Slider.defaultProps = {
    autoPlay: false,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%"
};

function SlidesList() {
    const { slideNumber, items } = useContext(SliderContext);

    return (
        <div
            className="slide-list"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {items.map((slide, index) => (
                <Slide key={index} data={slide} />
            ))}
        </div>
    );
}

function Slide({ data: { url, title }, animation }) {
    return (
        <div className={`slide ${animation && 'fadeInAnimation'}`}>
            <SlideImage src={url} alt={title} />
            <SlideTitle title={title} />
        </div>
    );
}

function SlideTitle({ title }) {
    return <div className="slide-title">{title}</div>;
}

function SlideImage({ src, alt }) {
    return <img src={src} alt={alt} className="slide-image" />;
}

function Arrows() {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="arrows">
            <div className="arrow left" onClick={() => changeSlide(-1)} />
            <div className="arrow right" onClick={() => changeSlide(1)} />
        </div>
    );
}

function Dots() {
    const { slidesCount } = useContext(SliderContext);

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < slidesCount; i++) {
            dots.push(<Dot key={`dot-${i}`} number={i} />);
        }

        return dots;
    };

    return <div className="dots">{renderDots()}</div>;
}

function Dot({ number }) {
    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div
            className={`dot ${slideNumber === number ? "selected" : ""}`}
            onClick={() => goToSlide(number)}
        />
    );
}

export default Slider;