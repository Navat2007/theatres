import React from "react";

const Page404 = () => {
    React.useEffect(() => {
        document.title = "404";
    }, []);

    return (
        <div className="error-page">
            <h1 className="error-page__title">
                <span className="error-page__span-accent">Ошибка 404!</span>
                Страница не найдена.
            </h1>
            <div className="error-page__circle --big"></div>
            <div className="error-page__circle --big-two"></div>
            <div className="error-page__circle --first"></div>
            <div className="error-page__circle --second"></div>
            <div className="error-page__circle --third"></div>
            <div className="error-page__circle --forth"></div>
            <div className="error-page__circle --five"></div>
            <div className="error-page__circle --six"></div>
            <p className="error-page__text">
                К сожалению, запрашиваемая Вами страница, не найдена.
                <br />
                Повторите попытку позже.
                <br />
                <br />
                Вернуться{" "}
                <a
                    className="link"
                    href="./"
                >
                    на главную
                </a>
            </p>
        </div>
    );
};

export default Page404;
