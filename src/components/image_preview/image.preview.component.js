import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.7,
            }}
            className={finalClassName}
        >
            <span
                className={`${styles.close} mdi mdi-close`}
                aria-label="Закрыть"
                title="Закрыть"
                onClick={onClose}
            />
            <div className={styles.wrap}>
                <Carousel
                    swipeable={true}
                    emulateTouch={true}
                    swipeScrollTolerance={5}
                    thumbWidth={50}
                    className={styles.wrap}
                >
                    {items.map((item, index) => (
                        <img
                            className={styles.image}
                            key={index}
                            src={item.url}
                            alt={item.url}
                        />
                    ))}
                </Carousel>
            </div>
        </motion.div>
    );
};

export default ImagePreview;
