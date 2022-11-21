import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import styles from "./image.preview.module.scss";

const ImagePreview = ({
    children,
    items,
    open = false,
    index = 0,
    onClose,
}) => {
    const config = [styles.container, open ? styles.container_opened : null];

    const finalClassName = config.filter(Boolean).join(" ");

    return (
        <div className={finalClassName}>
            <span
                className={`${styles.close} mdi mdi-close`}
                aria-label="Закрыть"
                title="Закрыть"
                onClick={onClose}
            />
            <div>
                <Splide aria-label=""
                    config={{
                        rewind: true,
                        width: "100%"
                    }}
                >
                    {
                        items.map((item, index) => (
                            <SplideSlide key={index}>
                                <img src={item.url} alt=""/>
                            </SplideSlide>
                        ))
                    }
                </Splide>
            </div>
        </div>
    );
};

export default ImagePreview;
