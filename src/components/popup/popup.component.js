import React from 'react';

const Popup = ({children, onClose, opened = false, className = "", title = "", image = {src: "", alt: "", className: ""}}) => {

    return (
        <div className={`popup ${className}${opened ? " --opened": ""}`}>
            <div className="popup__container">
                {
                    image.src !== "" && <img src={image.src} alt={image.alt} className={image.className} />
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
            </div>
        </div>
    );
};

export default Popup;