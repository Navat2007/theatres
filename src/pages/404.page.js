import React from 'react';

import image from '../images/404.png';

const Page404 = () => {

    React.useEffect(() => {

        document.title = "404";

    }, []);

    return (
        <div className="error-page">
            <img className='error-page__img' src={image} alt="Ошибка 404" />
            <h1 className='error-page__title'>Страница не найдена.</h1>
            <p className='error-page__text'>
                К сожалению, запрашиваемая Вами страница, не найдена.
                <br />
                Повторите попытку позже.
                <br />
                <br />

                Вернуться <a className='link' href="./">на главную</a>
            </p>
        </div>
    )

}

export default Page404;

