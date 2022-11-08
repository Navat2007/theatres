import React from 'react';
import {motion} from 'framer-motion';

import styles from './button.module.scss';

console.log(styles);

const Button = ({
                    children,
                    type = "submit",
                    size = "normal",
                    theme = "primary",
                    extraClass = "",
                    text,
                    spinnerActive = false,
                    ...rest
                }) => {

    const [sizeClass, setSizeClass] = React.useState("");
    const [themeClass, setThemeClass] = React.useState("");
    const spinnerClass = spinnerActive ? ` ${styles.button_loading}` : ``;

    React.useEffect(() => {

        switch (size) {
            case "small":
                setSizeClass(styles.button_size_sm);
                break;
            default:
                setSizeClass("");
                break;
        }

        switch (theme) {
            case "text":
                setThemeClass(styles.button_theme_text);
                break;
            case "success":
                setThemeClass(styles.button_theme_success);
                break;
            case "outline":
                setThemeClass(styles.button_theme_outline);
                break;
            default:
                setThemeClass(styles.button_theme_primary);
                break;
        }

    }, [size, theme]);

    const finalClassName = styles.button + ` ${sizeClass} ${themeClass} ${extraClass} ${spinnerClass}`;

    return (
        <motion.button
            whileTap={{scale: 0.95}}
            type={type}
            className={finalClassName}
            {...rest}
        >
            {children} 
            <span className={styles.button__text}>{text}</span>
            <div className={styles.button__spinner}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </motion.button>
    );
};

export default Button;