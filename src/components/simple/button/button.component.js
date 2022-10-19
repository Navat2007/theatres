import React from 'react';

const Button = ({ children, type = "submit", className = "", text = "Кнопка", spinnerActive = false, ...rest }) => {

    const defaultClassName = "button " + (className === "" ? "--theme-primary" : className);
    const finalClassName = defaultClassName + (spinnerActive ? " --spinner-actived" : "");

    // --size-sm - маленькая
    return (
        <button
            type={type}
            className={finalClassName}
            {...rest}
        >
            {text}
            {children}
            <div className='button__spinner'><div></div><div></div><div></div></div>
        </button>
    );
};

export default Button;