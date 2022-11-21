import React from 'react';
import {motion} from 'framer-motion';

import ImageSlider from "../slider/image.slider.component";

const ImagePreview = ({children, items, open = false, index = 0, onClose}) => {

    const config = [
        "img-preview",
        open ? "--opened" : ""
    ];

    const finalClassName = config.join(' ');

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.7
            }}
            className={finalClassName}
        >
            <span
                className="img-preview__close-btn mdi mdi-close"
                aria-label="Закрыть"
                title="Закрыть"
                onClick={onClose}
            />
            <div className="img-preview__wrap">
                <ImageSlider
                    autoPlay={false}
                    swipe={false}
                    showIndicators={false}
                    showThumbs={true}
                    showArrows={true}
                    items={items}
                    index={index}
                />
            </div>
        </motion.div>
    );
};

export default ImagePreview;