import React from 'react';
import {motion} from 'framer-motion';

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
    const spinnerClass = spinnerActive ? " --spinner-actived" : "";

    React.useEffect(() => {

        switch (size) {
            case "small":
                setSizeClass("--size-sm");
                break;
            case "big":
                setSizeClass("--size-bg");
                break;
            default:
                setSizeClass("");
                break;
        }

        switch (theme) {
            case "dark":
                setThemeClass("--theme-dark");
                break;
            default:
                setThemeClass("--theme-primary");
                break;
        }

    }, [size, theme]);

    const finalClassName = `button ${sizeClass} ${themeClass} ${extraClass} ${spinnerClass}`;

    return (
        <motion.button
            whileTap={{scale: 0.95}}
            type={type}
            className={finalClassName}
            {...rest}
        >
            {text}
            {children}
            <div className='button__spinner'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </motion.button>
    );
};

export default Button;