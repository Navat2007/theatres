import React from 'react';

const Popup = ({
                   children,
                   buttons,
                   onClose,
                   opened = false,
                   notif = {
                       active: false,
                       state: "",
                       text: "",
                       timerInSeconds: 0,
                   },
                   className = "",
                   title = "",
                   text = "",

                   image = {src: "", alt: "", className: ""}
               }) => {

    const [notifIcon, setNotifIcon] = React.useState("");

    React.useEffect(() => {

        if(notif.active){

            switch (notif.state){
                case "error":
                    setNotifIcon("--state-error")
                    break
                case "alert":
                    setNotifIcon("--state-alert")
                    break
                case "success":
                    setNotifIcon("--state-success")
                    break
                default:
                    setNotifIcon("")
            }

        }

    }, [notif.active, notif.state]);

    const handleBackgroundClick = (event) => {

        if(event.target === event.currentTarget && onClose){
            onClose();
        }

    };

    if(notif.timerInSeconds > 0){

        setTimeout(() => {

            if(onClose)
                onClose();
            else
                opened = false;

        }, notif.timerInSeconds * 1000);

    }

    if (notif.active)
        return (
            <div
                className={`popup --type-notification ${className} ${notifIcon}${opened ? " --opened" : ""}`}
                onClick={(e) => handleBackgroundClick(e)}
            >
                <div className="popup__container">
                    <button type='button' aria-label='Закрыть' className='popup__close' onClick={onClose}/>
                    <div className="popup__caption">
                        <span className='popup__icon'/>
                        <p className="popup__title">{title}</p>
                    </div>
                    <div className="popup__body">
                        <p className="popup__text">
                            {notif.text}
                        </p>
                    </div>
                    <div className="popup__controls">
                        {
                            buttons && <>{buttons}</>
                        }
                    </div>
                </div>
            </div>
        );

    return (
        <div
            className={`popup ${className}${opened ? " --opened" : ""}`}
            onClick={(e) => handleBackgroundClick(e)}
        >
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