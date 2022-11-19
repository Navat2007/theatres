import React from "react";
import { Outlet } from "react-router-dom";

import logo from "../../images/public_logo.png";

const PublicLayout = () => {
    return (
        <>
            <div className="public-content">
                <header className="header">
                    <div className="header__wrap">
                        <a
                            href="./"
                            className="header__logo"
                            rel="noopener nofolloe noreferer"
                        >
                            <img
                                src={logo}
                                alt="Логотип Содружества"
                            />
                        </a>
                        <menu className="menu">
                            <ul className="menu__list">
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        О содружестве
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Участники
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Проекты
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Фестиваль
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Театральная премия
                                    </a>
                                </li>
                            </ul>
                        </menu>
                    </div>
                </header>
                <main className="public-content__main">
                    <section className="public-content__section">
                        <article className="public-content__wrap about">
                            <h1 className="section-title">Театр Чайковского</h1>
                            <div className="level-item">дебютант</div>
                            <div className="about__main-text">
                                <ul className="about__list">
                                    <li>
                                        <p className="about__text">
                                            Год основания:
                                            <span className="about__span-accent">
                                                2020г.
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="about__text">
                                            Форма осуществления деятельности:
                                            <span className="about__span-accent">
                                                Объединение дополнительного
                                                образования
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="about__text">
                                            Возрастной состав участников
                                            школьного театра:
                                            <span className="about__span-accent">
                                                1-4 класс
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                                <div className="about__description-block">
                                    <p>
                                        На прошлой неделе в школе прошел
                                        школьный конкурс «Театральные
                                        подмостки». В нем приняли участие все
                                        классы. Было представлено 6 постановок.
                                        Жюри под председательством директора
                                        школы Суханкиной О.А., проанализировав
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="about__more-btn"
                                >
                                    Читать полностью
                                </button>
                            </div>
                        </article>
                    </section>
                    <section className="public-content__section public-content__section_bg_light-grey">
                        <article className="public-content__wrap teachers">
                            <h2 className="section-title">Педагоги</h2>
                            <ul className="teachers__card-deck">
                                <li className="teachers__card">
                                    <img
                                        className="teachers__img"
                                        src="https://i.pinimg.com/originals/4a/79/19/4a791974c79323c38c7db00bdd985df5.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                    <h3 className="teachers__title">
                                        <span className="teachers__span-accent">
                                            Иванова
                                        </span>
                                        Любовь Валерьевна
                                    </h3>
                                </li>
                                <li className="teachers__card">
                                    <img
                                        className="teachers__img"
                                        src="https://coolsen.ru/wp-content/uploads/2022/02/63-20220220_141754.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                    <h3 className="teachers__title">
                                        <span className="teachers__span-accent">
                                            Загогулькина
                                        </span>
                                        Анастасия Дрыздовна
                                    </h3>
                                </li>
                                <li className="teachers__card">
                                    <img
                                        className="teachers__img"
                                        src="https://img.alicdn.com/imgextra/i4/1968041872/O1CN01ylonbB1PhPuW19t7S_!!0-item_pic.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                    <h3 className="teachers__title">
                                        <span className="teachers__span-accent">
                                            Крюк
                                        </span>
                                        Кутиля Бутковна
                                    </h3>
                                </li>
                                <li className="teachers__card">
                                    <img
                                        className="teachers__img"
                                        src="https://gas-kvas.com/uploads/posts/2022-09/1663342133_2-gas-kvas-com-p-kunitsa-ptitsa-foto-2.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                    <h3 className="teachers__title">
                                        <span className="teachers__span-accent">
                                            Куница
                                        </span>
                                        Хвостатая Валерьевна
                                    </h3>
                                </li>
                            </ul>
                        </article>
                    </section>
                    <section className="public-content__section">
                        <article className="public-content__wrap gallery">
                            <h2 className="section-title">Галерея</h2>
                            <ul className="gallery__card-deck">
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://gas-kvas.com/uploads/posts/2022-09/1663342133_2-gas-kvas-com-p-kunitsa-ptitsa-foto-2.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://avatars.mds.yandex.net/i?id=92778def2b1184a361d1741b0caf899843bf4f31-7086399-images-thumbs&n=13"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://garden.hozvo.ru/storage/photos/shares/2020/28/5f0eb212d4227.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkgUtxqu-2ZccW4IxpxL5ArqaKTM5SRkZCeTgDn6uOyic"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://proprikol.ru/wp-content/uploads/2021/12/kartinki-ezhika-na-avu-3.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                                <li className="gallery__card">
                                    <img
                                        className="gallery__img"
                                        src="https://funart.pro/uploads/posts/2021-04/thumbs/1618123210_4-p-spyashchii-yezhik-zhivotnie-krasivo-foto-4.jpg"
                                        alt="Иванова Любовь Валерьевна"
                                    />
                                </li>
                            </ul>
                        </article>
                    </section>
                    <section className="public-content__section public-content__section_bg_light-grey contact">
                        <article className="public-content__wrap contact">
                            <h2 className="section-title">Контакты</h2>
                            <div className="contact__map"></div>
                            <div className="contact__columns">
                                <div className="contact__column">
                                    <h3 className="section-subtitle">
                                        КЛВ “Современник”
                                    </h3>
                                    <address className="contact__address">
                                        Москва г., пр-кт Современника, д.3А.
                                    </address>
                                    <a
                                        className="contact__link"
                                        href="tel:84956926572"
                                        rel="noopener nofollow noreferer"
                                    >
                                        +7 (495) 692-65-72
                                    </a>
                                </div>
                                <div className="social">
                                    <p className="social__label">
                                        Наши соцсети:
                                    </p>
                                    <ul className="social__list">
                                        <li>
                                            <a
                                                className="social__link"
                                                href=""
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            ></a>
                                        </li>
                                        <li>
                                            <a
                                                className="social__link"
                                                href=""
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            ></a>
                                        </li>
                                        <li>
                                            <a
                                                className="social__link"
                                                href=""
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            ></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="school-info">
                                <h3 className="section-subtitle">
                                    Информация о школе
                                </h3>
                                <img
                                    className="school-info__logo"
                                    src="https://lookw.ru/8/896/1476182475-switzerland-houses-467737.jpg"
                                    alt=""
                                />
                                <h4 className="school-info__title">
                                    ГКОУ КШИ № 1
                                </h4>
                                <p className="school-info__subtitle">
                                    Государственное казенное общеобразовательное
                                    учреждение города Москвы "Кадетская
                                    школа-интернат № 1 "Первый Московский
                                    кадетский корпус"
                                </p>
                                <p className="school-info__director">
                                    Крымский Владимир Яковлевич
                                </p>
                                <p className="school-info__position">
                                    ФИО директора/руководителя
                                </p>
                            </div>
                        </article>
                    </section>
                    <Outlet />
                </main>
                <footer className="footer">
                    <div className="footer__wrap">
                        <nav className="menu">
                            <ul className="menu__list">
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        О содружестве
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Участники
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Проекты
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Фестиваль
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Театральная премия
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
