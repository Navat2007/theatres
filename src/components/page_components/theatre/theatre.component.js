import React from 'react';
import ReactPlayer from "react-player";
import moment from "moment";
import {NavLink} from "react-router-dom";
import createDOMPurify from "dompurify";

import Button from "../../simple/button/button.component";
import Tabs from "../../tabs/tabs.component";
import Tab from "../../tabs/tab.component";
import ImagePreview from "../../image_preview/image.preview.component";

import commonStyles from "../../../pages/common.module.scss";

import no_photo_man from "../../../images/no_photo_man.png";

const Theatre = ({id, theatre, teachersStore, onBack, onEdit}) => {

    const DOMPurify = createDOMPurify(window);

    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex, items) => {
        setPreview(
            <ImagePreview
                open={true}
                index={slideIndex}
                items={items}
                onClose={() => setPreview(<></>)}
            />
        );
    };

    return (
        <>
            <div className={commonStyles.title_block}>
                <Button
                    type="button"
                    theme="text"
                    size="small"
                    iconClass={"mdi mdi-arrow-left"}
                    isIconBtn="true"
                    aria-label="Назад"
                    onClick={onBack}
                />
                <h1 className={commonStyles.title}>{theatre.title}</h1>
                {
                    onEdit
                    &&
                    <Button
                        size="smaller"
                        type="submit"
                        isIconBtn="true"
                        iconClass={"mdi mdi-pencil"}
                        theme="outline"
                        aria-label="Редактировать театр"
                        onClick={onEdit}
                    />
                }
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
                                        На страницу{" "}
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
                                    {theatre.social_links.map(
                                        (link) => (
                                            <li key={link}>
                                                <a
                                                    className="info__social-link"
                                                    href={link}
                                                    target={"_blank"}
                                                    rel="noopener nofollow noreferer"
                                                >
                                                    {window.global.getSocialIcon(
                                                        link
                                                    )}
                                                </a>
                                            </li>
                                        )
                                    )}
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
                                        href={
                                            theatre.theatre_url_school
                                        }
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
                            {theatre.teachers.map((item) => {
                                let teacher =
                                    teachersStore.teachers.find(
                                        (teacherInStore) =>
                                            item.ID ===
                                            teacherInStore.ID
                                    );

                                return (
                                    <NavLink
                                        key={item.ID}
                                        className="link"
                                        to={
                                            "/admin/teachers/" + item.ID
                                        }
                                    >
                                        <li className="teacher-list__item">
                                            <img
                                                className="teacher-list__img"
                                                src={
                                                    teacher?.photo
                                                        ? window.global
                                                            .baseUrl +
                                                        teacher.photo
                                                        : no_photo_man
                                                }
                                                alt=""
                                            />
                                            <div className="teacher-list__info">
                                                <h3 className="teacher-list__title">
                                                            <span className="teacher-list__span-accent">
                                                                {teacher?.f}{" "}
                                                            </span>
                                                    {teacher?.i}{" "}
                                                    {teacher?.o}
                                                </h3>
                                                <p className="teacher-list__text"></p>
                                                <p className="teacher-list__description">
                                                    {teacher?.position}
                                                </p>
                                            </div>
                                        </li>
                                    </NavLink>
                                );
                            })}
                        </ul>
                    </div>
                </Tab>
                <Tab title={"Краткое описание"}>
                    <div
                        className="info__editor"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.short_description
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Обращение режиссёра"}>
                    <div
                        className="info__editor"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.director_message
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Фотографии"}>
                    <h2 className="info__title">Фото театра</h2>
                    {theatre.photo && theatre.photo.length > 0 ? (
                        <>
                            <ul className="gallery-form">
                                {theatre.photo.map((item) =>
                                    item.order === 1 ? (
                                        <li
                                            key={item.url}
                                            className="gallery-form__item"
                                            onClick={() =>
                                                handleOpenPreview(
                                                    item.order - 1,
                                                    theatre.photo
                                                )
                                            }
                                        >
                                            <img
                                                className="gallery-form__img"
                                                src={item.url}
                                                alt="Изображение "
                                            />
                                            <div className="gallery-form__title">
                                                1. Главная
                                            </div>
                                        </li>
                                    ) : (
                                        <li
                                            key={item.url}
                                            className="gallery-form__item"
                                            onClick={() =>
                                                handleOpenPreview(
                                                    item.order - 1,
                                                    theatre.photo
                                                )
                                            }
                                        >
                                            <img
                                                className="gallery-form__img"
                                                src={item.url}
                                                alt="Изображение "
                                            />
                                            <span className="gallery-form__current-position">
                                                        {item.order}
                                                    </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>Нет фото</p>
                        </>
                    )}
                    <h2 className="info__title">
                        Фото посещения театра
                    </h2>
                    {theatre.photoVisit &&
                    theatre.photoVisit.length > 0 ? (
                        <>
                            <ul className="gallery-form">
                                {theatre.photoVisit.map((item) =>
                                    item.order === 1 ? (
                                        <li
                                            key={item.url}
                                            className="gallery-form__item"
                                            onClick={() =>
                                                handleOpenPreview(
                                                    item.order - 1,
                                                    theatre.photoVisit
                                                )
                                            }
                                        >
                                            <img
                                                className="gallery-form__img"
                                                src={item.url}
                                                alt="Изображение "
                                            />
                                            <div className="gallery-form__title">
                                                1. Главная
                                            </div>
                                        </li>
                                    ) : (
                                        <li
                                            key={item.url}
                                            className="gallery-form__item"
                                            onClick={() =>
                                                handleOpenPreview(
                                                    item.order - 1,
                                                    theatre.photoVisit
                                                )
                                            }
                                        >
                                            <img
                                                className="gallery-form__img"
                                                src={item.url}
                                                alt="Изображение "
                                            />
                                            <span className="gallery-form__current-position">
                                                        {item.order}
                                                    </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>Нет фото</p>
                        </>
                    )}
                    {preview}
                </Tab>
                <Tab title={"Видео"}>
                    <h2 className="info__title">
                        Видео визитка школьного театра
                    </h2>
                    {theatre.video_business_card ? (
                        <ReactPlayer
                            width="100%"
                            height={"auto"}
                            style={{
                                maxWidth: "60em",
                                aspectRatio: "16/9",
                            }}
                            url={theatre.video_business_card}
                            playing={false}
                            controls={true}
                        />
                    ) : (
                        <>
                            <p>Нет видео</p>
                        </>
                    )}

                    <h2 className="info__title">
                        ВИДЕО ЛУЧШИХ ФРАГМЕНТОВ
                    </h2>
                    {theatre.video && theatre.video.length > 0 ? (
                        <>
                            <ul className="gallery-form --content-video">
                                {theatre.video.map((item) => (
                                    <li key={item} className="gallery-form__item">
                                        <ReactPlayer
                                            width="100%"
                                            height={"auto"}
                                            className="video__react-player"
                                            url={item}
                                            playing={false}
                                            controls={true}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>Нет видео</p>
                        </>
                    )}
                </Tab>
                <Tab title={"Описания (рецензии)"}>
                    <div className="info">
                        <h2 className="info__title">
                            РАССКАЗ О ДРУГИХ ШКОЛЬНЫХ ТЕАТРАХ
                        </h2>
                        {theatre.reviews &&
                        theatre.reviews.length > 0 ? (
                            <>
                                {theatre.reviews.map((item) => (
                                    <div key={item.title}>
                                        <h3>{item.title}</h3>
                                        <div
                                            className="info__editor"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    item.text
                                                ),
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <p>Нет рассказов</p>
                            </>
                        )}
                        <h2 className="info__title">
                            РАССКАЗЫ (РЕЦЕНЗИИ) О ПОСЕЩЕНИИ ДРУГИХ
                            МОСКОВСКИХ ТЕАТРОВ
                        </h2>
                        {theatre.reviewsVisit &&
                        theatre.reviewsVisit.length > 0 ? (
                            <>
                                {theatre.reviewsVisit.map((item) => (
                                    <div key={item.title}>
                                        <h3>{item.title}</h3>
                                        <div
                                            className="info__editor"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    item.text
                                                ),
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <p>Нет рассказов</p>
                            </>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </>
    );
};

export default Theatre;