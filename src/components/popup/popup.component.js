import React from 'react';

const Popup = ({children, buttons, onClose, opened = false, className = "", title = "", image = {src: "", alt: "", className: ""}}) => {

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
<div className="popup --opened --type-notification">
    <div className="popup__container">
        <button type='button' aria-label='Закрыть' className='popup__close' />
        {/* Вместо заголовка - блок с заголовоком и иконкой */}
        <div className="popup__caption">
            <span className='popup__icon' />
            <p className="popup__title">Вы действительно хотите выйти?</p>
        </div>
        <div className="popup__body">
            {/* Тут тело состоит из текста, для того, чтобы заголовок не был слишком объемным, тут своего рода объяснение, но его может и не быть. */}
            <p className="popup__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, quod, corporis tempore, quia voluptatibus dolorem distinctio odio quisquam dolorum necessitatibus porro! Voluptatum, cumque? Quisquam corporis doloribus quibusdam enim? Ullam, eius.
            </p>
        </div>
        <div className="popup__controls">
            <button type='button'
                className='button --size-sm --theme-success'>Да</button>
            <button type='button'
                className='button --size-sm --theme-text'>Нет</button>
        </div>
    </div>
</div>