import React from 'react';
import styles from './popup.module.scss';

const Popup = ({
    opened = false,
    title,
    extraClass,
    children,
    buttons,
    onClose,
}) => {

    const handleBackgroundClick = (event) => {

        if (event.target === event.currentTarget && onClose) {
            onClose();
        }

    };

    const config = [
        styles.popup,
        opened ? styles.popup_opened : null,
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(' ');

    return (
        <div
            className={finalClassName}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <button
                    type="button"
                    className={styles.close}
                    aria-label="Закрыть окно"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                </button>
                <div className={styles.body}>
                    {children}
                </div>
                {
                    buttons && <div className={styles.controls}>{buttons}</div>
                }
            </div>
        </div>
    );
};

export default Popup;