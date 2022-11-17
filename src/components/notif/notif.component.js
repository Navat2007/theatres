import React from 'react'
import styles from './notif.module.scss';

function Notif({
    opened,
    onClose,
    state = 'info',
    title = 'Внимание',
    text,
    extraClass,
    timerInSeconds = 0,
    buttons
}) {

    const icons = {
        info: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='currentColor' d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        ),
        success: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='currentColor' d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>
        ),
        error: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='currentColor' d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        ),
    };

    if (timerInSeconds > 0) {

        setTimeout(() => {

            if (onClose) onClose();
            else opened = false;

        }, timerInSeconds * 1000);

    }

    const handleBackgroundClick = (event) => {

        if (event.target === event.currentTarget && onClose) {
            onClose();
        }

    };

    const config = [
        styles.notif,
        opened ? styles.notif_opened : null,
        styles["notif_state_" + state],
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(' ');

    return (
        <div
            className={finalClassName}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.caption}>
                        <span className={styles.icon}>{icons[state]}</span>
                        <h3 className={styles.title}>{title}</h3>
                    </div>
                    <p className={styles.text}>{text}</p>
                </div>
                <div className={styles.controls}>
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default Notif
