import React from 'react';

// Для активации прелодера необходимо добавить к кнопке класс --spinner-actived
const Button = ({ children, type = "submit", className = "button --theme-primary", text = "", spinnerActive = false, ...rest }) => {

    const finalClassName = className + (spinnerActive ? " --spinner-actived" : "");

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