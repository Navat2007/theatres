import React from 'react';
import { motion } from 'framer-motion';

import styles from './button.module.scss';

const Button = ({
    type = "submit",
    theme = "primary",
    size = "normal",
    extraClass = "",
    isIconBtn = false,
    iconClass,
    text,
    spinnerActive = false,
    ...rest
}) => {

    const config = [
        styles.button,
        isIconBtn ? styles.button_icon : ``,
        theme ? styles["button_theme_" + theme] : styles.button_theme_primary,
        size ? styles["button_size_" + size] : "",
        extraClass,
        spinnerActive ? styles.button_loading : ``,
    ];

    const finalClassName = config.join(' ');

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            className={finalClassName}
            {...rest}
        >
            {
                iconClass
                &&
                <span className={`${styles.mdi} ${iconClass}`} />
            }
            <span className={styles.button__text}>{text}</span>
            <div className={styles.button__spinner}><div></div><div></div><div></div></div>
        </motion.button>
    );
};

export default Button;