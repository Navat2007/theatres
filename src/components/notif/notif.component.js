import React from 'react'

function Notif({ opened, onClose, state, className = "", title = "", text = "", timerInSeconds = 0, buttons }) {

    const [notifIcon, setNotifIcon] = React.useState("");

    React.useEffect(() => {

        switch (state) {
            case "error":
                setNotifIcon("--state-error")
                break
            case "alert":
                setNotifIcon("--state-alert")
                break
            case "success":
                setNotifIcon("--state-success")
                break
            case "question":
                setNotifIcon("--state-question")
                break
            default:
                setNotifIcon("")
        }

    }, [state]);

    if (timerInSeconds > 0) {

        setTimeout(() => {

            if (onClose)
                onClose();
            else
                opened = false;

        }, timerInSeconds * 1000);

    }

    const handleBackgroundClick = (event) => {

        if (event.target === event.currentTarget && onClose) {
            onClose();
        }

    };

    return (
        <div
            className={`popup --type-notification ${className} ${notifIcon}${opened ? " --opened" : ""}`}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className="popup__container">
                <button type='button' aria-label='Закрыть' className='popup__close' onClick={onClose} />
                <div className="popup__caption">
                    <span className='popup__icon' />
                    <p className="popup__title">
                        {title}
                    </p>
                </div>
                <div className="popup__body">
                    <p className="popup__text">
                        {text}
                    </p>
                </div>
                <div className="popup__controls">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default Notif
