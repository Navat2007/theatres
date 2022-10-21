import React from 'react';

const Popup = ({
                   children,
                   buttons,
                   onClose,
                   opened = false,
                   notif = false,
                   className = "",
                   title = "",
                   text = "",
                   image = {src: "", alt: "", className: ""}
               }) => {

    if (notif)
        return (
            <div className={`popup --type-notification ${className}${opened ? " --opened" : ""}`}>
                <div className="popup__container">
                    <button type='button' aria-label='Закрыть' className='popup__close' onClick={onClose}/>
                    {/* Вместо заголовка - блок с заголовоком и иконкой */}
                    <div className="popup__caption">
                        <span className='popup__icon'/>
                        <p className="popup__title">{title}</p>
                    </div>
                    <div className="popup__body">
                        <p className="popup__text">
                            {text}
                        </p>
                    </div>
                    <div className="popup__controls">
                        {
                            buttons && <>{buttons}</>
                        }
                        {
                            !buttons
                            &&
                            <>
                                <button
                                    type='button'
                                    className='button --size-sm --theme-success'
                                >
                                    ✔
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        );

    return (
        <div className={`popup ${className}${opened ? " --opened" : ""}`}>
            <div className="popup__container">
                {
                    image.src !== "" && <img src={image.src} alt={image.alt} className={image.className}/>
                }
                <h1 className="popup__title">{title}</h1>
                <button
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть окно"
                    onClick={onClose}
                />
                <div className="popup__body">
                    {children}
                </div>
                {
                    buttons && <div className="popup__controls">{buttons}</div>
                }
            </div>
        </div>
    );
};

export default Popup;

// Для окна нотификации использовать несколько иную конструкцию. В чем отличие, их два.

// Здесь добавляется модификатор --type-notification
// По-умолчанию состояние вопроса, есть еще три состояния --state-alert --state-error --state-success
