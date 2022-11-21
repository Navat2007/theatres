import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
            <Splide
                className={styles.wrap}
                options={{
                    rewind: true,
                    perPage: 1,
                    pagination: true,
                }}
            >
                {items.map((item, index) => (
                    <SplideSlide key={index}>
                        <img
                            className={styles.image}
                            src={item.url}
                            alt={item.url}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default ImagePreview;
