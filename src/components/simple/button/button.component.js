import React from 'react';
import {motion} from 'framer-motion';

const Button = ({ children, type = "submit", className = "", text, size = "normal", spinnerActive = false, ...rest }) => {

    const defaultClassName = "button " + (className === "" ? "--theme-primary" : className);
    const finalClassName = defaultClassName + (size === "small" ? " --size-sm" : "") + (spinnerActive ? " --spinner-actived" : "");

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            className={finalClassName}
            {...rest}
        >
            {text}
            {children}
            <div className='button__spinner'><div></div><div></div><div></div></div>
        </motion.button>
    );
};

export default Button;