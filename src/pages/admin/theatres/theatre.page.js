import React from "react";
import { NavLink, useParams } from "react-router-dom";

import useSchoolStore from "../../../store/admin/schoolsStore";
import useTheatresStore from "../../../store/admin/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Button from "../../../components/simple/button/button.component";
import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";
import moment from "moment";

import { SocialIcons } from "../../../components/svgs.js";

const TheatrePage = () => {
    let { id } = useParams();

    const schoolStore = useSchoolStore();
    const {
        theatre,
        loadTheatre,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    React.useEffect(() => {
        const fetchData = async () => {
            if (id) {
                let tempTheatre = await loadTheatre({ id });

                if (tempTheatre) {
                    await schoolStore.loadSchool({ id: tempTheatre.schoolID });
                    await teachersStore.loadTeachers({
                        schoolID: tempTheatre.schoolID,
                    });

                    console.log(theatre);
                    console.log(schoolStore.school);
                    console.log(teachersStore.teachers);
                }
            }
        };

        fetchData();
    }, [id]);

    if (loading || schoolStore.loading || teachersStore.loading)
        return (
            <div className="content__section">
                <p>Загрузка...</p>
            </div>
        );

    if (id && !theatre) {
        return <p>Театр не найден</p>;
    }

    return (
        <div className="content__section">
            {id && theatre && (
                <>
                    <div className="content__title-block">
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                        />
                        <h1 className="content__title --mb-small">
                            {theatre.title}
                        </h1>
                    </div>
                    <Tabs>
                        <Tab title={"Основная информация"}>
                            <div className="info">
                                <ul className="info__list">
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Публичная страница
                                        </h3>
                                        <p className="info__description">
                                            <NavLink
                                                className="link"
                                                to={"/theatre/" + id}
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            >
                                                Страница театра{" "}
                                                <span className="mdi mdi-open-in-new" />
                                            </NavLink>
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">Адрес</h3>
                                        <p className="info__description">
                                            {theatre.address}
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Координаты
                                        </h3>
                                        <p className="info__description">
                                            <a
                                                className="link"
                                                href={
                                                    "http://maps.yandex.ru/?text=" +
                                                    theatre.coordinates
                                                }
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            >
                                                {theatre.coordinates}{" "}
                                                <span className="mdi mdi-open-in-new" />
                                            </a>
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Форма осуществления деятельности
                                        </h3>
                                        <p className="info__description">
                                            {theatre.form_activity
                                                .map((item) => item.activity)
                                                .join(", ")}
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Возрастной состав участников
                                            школьного театра
                                        </h3>
                                        <p className="info__description">
                                            {theatre.age_members
                                                .map((item) => item.age)
                                                .join(", ")}
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Дата основания
                                        </h3>
                                        <p className="info__description">
                                            {moment(
                                                theatre.foundation_date
                                            ).format("DD.MM.YYYY")}
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">Соцсети</h3>
                                        <ul className="info__social">
                                            <li>
                                                <a
                                                    className="info__social-link"
                                                    href=""
                                                >
                                                    {SocialIcons.vk}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="info__social-link"
                                                    href=""
                                                >
                                                    {SocialIcons.ok}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="info__social-link"
                                                    href=""
                                                >
                                                    {SocialIcons.google}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Страница театра на сайте
                                            образовательной организации
                                        </h3>
                                        <p className="info__description">
                                            <a
                                                className="link"
                                                href=""
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            >
                                                На страницу{" "}
                                                <span className="mdi mdi-open-in-new" />
                                            </a>
                                        </p>
                                    </li>
                                </ul>
                                <h2 className="info__title">Педагоги</h2>
                                <ul className="teacher-list">
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src="https://get.wallhere.com/photo/Asian-women-long-hair-1237565.jpg"
                                            alt=""
                                        />
                                        <div className="teacher-list__info">
                                            <h3 className="teacher-list__title">
                                                <span className="teacher-list__span-accent">
                                                    Иванова{" "}
                                                </span>
                                                Любовь Сергеевна
                                            </h3>
                                            <p className="teacher-list__text">
                                                3 года
                                            </p>
                                            <p className="teacher-list__description">
                                                Педагогический стаж
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Tab>
                        <Tab title={"Краткое описание"}>
                            {/* Тут стилизация, наверное, не нужна, просто все, что написали в редакторе в див выводим. */}
                            <div></div>
                        </Tab>
                        <Tab title={"Обращение режиссёра"}>
                            {/* Тут стилизация, наверное, не нужна, просто все, что написали в редакторе в див выводим. */}
                            <div></div>
                        </Tab>
                        <Tab title={"Фотографии"}>
                            <ul className="gallery-form">
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://cherepah.ru/wp-content/uploads/2/c/4/2c4e5a55cc03551fe456a92c1b66d280.jpe"
                                        alt="Изображение "
                                    />
                                    <div className="gallery-form__title">
                                        1. Главная
                                    </div>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                                <li className="gallery-form__item">
                                    <img
                                        className="gallery-form__img"
                                        src="https://art-vip.com.ua/wa-data/public/shop/products/44/06/644/images/575/575.750x0.jpg"
                                        alt="Изображение "
                                    />
                                    <span className="gallery-form__current-position">
                                        2
                                    </span>
                                </li>
                            </ul>
                        </Tab>
                        <Tab title={"Видео"}>
                            {/* Тут возможно вставить через слайдер видео со списком, как на странице теарта, например. */}
                        </Tab>
                        <Tab title={"Описания (рецензии)"}>
                            <div className="info">
                                <h2 className="info__title">Название театра</h2>
                                <div>
                                    Описание из редактора
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </>
            )}
        </div>
    );
};

export default TheatrePage;
