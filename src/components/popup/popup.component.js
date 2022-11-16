import React from 'react';

const Popup = ({
    children,
    buttons,
    onClose,
    opened = false,
    className = "",
    title = "",
    image = { src: "", alt: "", className: "" }
}) => {

    const [notifIcon, setNotifIcon] = React.useState("");

    const handleBackgroundClick = (event) => {

        if (event.target === event.currentTarget && onClose) {
            onClose();
        }

    };

    return (
        <div
            className={`popup ${className}${opened ? " --opened" : ""}`}
            onClick={(e) => handleBackgroundClick(e)}
        >
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
                {
                    buttons && <div className="popup__controls">{buttons}</div>
                }
            </div>
        </div>
    );
};

export default Popup;