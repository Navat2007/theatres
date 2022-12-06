import React from "react";
import ReactPlayer from "react-player";
import moment from "moment";
import {NavLink} from "react-router-dom";
import createDOMPurify from "dompurify";
import {useForm} from "react-hook-form";

import useAuthStore from "../../../store/authStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Button from "../../simple/button/button.component";
import Tabs from "../../tabs/tabs.component";
import Tab from "../../tabs/tab.component";
import ImagePreview from "../../image_preview/image.preview.component";
import FieldInput from "../../simple/field/field.input.component";
import Popup from "../../popup/popup.component";

import commonStyles from "../../../pages/common.module.scss";
import styles from "./theatre.module.scss";

import no_photo_man from "../../../images/no_photo_man.png";

const Theatre = ({id, theatre, teachersStore, onBack, onEdit}) => {

    const DOMPurify = createDOMPurify(window);

    const {user} = useAuthStore();
    const {school, loadSchool} = useSchoolStore();

    const {register, handleSubmit, reset} = useForm();

    const [preview, setPreview] = React.useState(<></>);
    const [festivalRequest, setFestivalRequest] = React.useState(<></>);

    React.useEffect(() => {

        const fetchData = async () => {
            await loadSchool({id: user.schoolID});
        };

        fetchData();

    }, []);

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

    const onTaliaFestivalRequestSubmit = (data) => {
        console.log(data);
    }

    const onMelpomenaFestivalRequestSubmit = (data) => {
        console.log(data);
    }

    const handleFestivalRequestBtn = () => {

        setFestivalRequest(
            <Popup
                title={"Подача заявки на фестиваль «Живая сцена»"}
                opened={true}
                onClose={() => {
                    setFestivalRequest(<></>);
                }}
            >
                <Tabs>
                    <Tab title={"Благосклонная Талия"}>
                        <form
                            onSubmit={handleSubmit(onTaliaFestivalRequestSubmit)}
                            className="form"
                        >
                            <fieldset className="form__section --content-info">
                                <FieldInput
                                    label={"Образовательная организация:"}
                                    type={"textarea"}
                                    rows={2}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={school.org_name}
                                />
                                <FieldInput
                                    label={"Название театра:"}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={theatre.title}
                                />
                                <FieldInput
                                    label={"Направление:"}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={"«Благосклонная Талия»"}
                                />
                                <FieldInput
                                    label={"Количество участников творческого коллектива:"}
                                    type={"number"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("count", {value: 0})}
                                />
                            </fieldset>
                            <div className="form__controls">
                                <Button
                                    type="submit"
                                    text="Отправить"
                                    spinnerActive={false}
                                    style={{marginLeft: "auto", display: "block"}}
                                />
                            </div>
                        </form>
                    </Tab>
                    <Tab title={"Школьная Мельпомена"}>
                        <form
                            onSubmit={handleSubmit(onMelpomenaFestivalRequestSubmit)}
                            className="form"
                        >
                            <fieldset className="form__section --content-info">
                                <FieldInput
                                    label={"Образовательная организация:"}
                                    type={"textarea"}
                                    rows={2}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={school.org_name}
                                />
                                <FieldInput
                                    label={"Название театра:"}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={theatre.title}
                                />
                                <FieldInput
                                    label={"Направление:"}
                                    placeholder={"..."}
                                    layout="flex"
                                    size="small"
                                    disabled={true}
                                    value={"«Благосклонная Талия»"}
                                />
                                <FieldInput
                                    label={"Название спектакля:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_title", {value: ""})}
                                />
                                <FieldInput
                                    label={"Автор:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_author", {value: ""})}
                                />
                                <FieldInput
                                    label={"Название литературного материала:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_book", {value: ""})}
                                />
                                <FieldInput
                                    label={"ФИО режиссера-постановщика:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_producer", {value: ""})}
                                />
                                <FieldInput
                                    label={"Количество участников творческого коллектива:"}
                                    type={"number"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_count", {value: 0})}
                                />
                                <FieldInput
                                    label={"Количество участников творческого коллектива:"}
                                    type={"select"}
                                    defaultSelectItem={false}
                                    selectItems={[
                                        {value: 1, title: "учащиеся 1-5 классов"},
                                        {value: 2, title: "учащиеся 6-11 классов"},
                                        {value: 3, title: "учащиеся из разных возрастных групп"},
                                    ]}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_age", {value: 0})}
                                />
                                <FieldInput
                                    label={"Продолжительность спектакля (мин):"}
                                    type={"number"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_length", {value: 0})}
                                />
                                <FieldInput
                                    label={"Афиша спектакля"}
                                    type="file"
                                    multiple="multiple"
                                    extraClass="form__field"
                                    layout="flex"
                                    {...register("performance_photo")}
                                />
                                <FieldInput
                                    label={"Ссылка на видеофрагмент"}
                                    type="url"
                                    extraClass="form__field"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    {...register("performance_video")}
                                />
                                <FieldInput
                                    label={"Ответы на вопросы"}
                                    type="file"
                                    extraClass="form__field"
                                    layout="flex"
                                    {...register("performance_answer")}
                                />
                            </fieldset>
                            <div className="form__controls">
                                <Button
                                    type="submit"
                                    text="Отправить"
                                    spinnerActive={false}
                                    style={{marginLeft: "auto", display: "block"}}
                                />
                            </div>
                        </form>
                    </Tab>
                </Tabs>

            </Popup>
        )

    }

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
                {onEdit && (
                    <Button
                        size="smaller"
                        type="submit"
                        isIconBtn="true"
                        iconClass={"mdi mdi-pencil"}
                        theme="outline"
                        aria-label="Редактировать театр"
                        onClick={onEdit}
                    />
                )}
            </div>
            <Tabs>
                <Tab title={"Основная информация"}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Публичная страница</h3>
                            <p className={styles.description}>
                                <NavLink
                                    className={commonStyles.link}
                                    to={"/theatre/" + id}
                                    target={"_blank"}
                                    rel="noopener nofollow noreferer"
                                >
                                    На страницу{" "}
                                    <span className="mdi mdi-open-in-new"/>
                                </NavLink>
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Адрес</h3>
                            <p className={styles.description}>
                                {theatre.address}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Координаты</h3>
                            <p className={styles.description}>
                                <a
                                    className={commonStyles.link}
                                    href={
                                        "http://maps.yandex.ru/?text=" +
                                        theatre.coordinates
                                    }
                                    target={"_blank"}
                                    rel="noopener nofollow noreferer"
                                >
                                    {theatre.coordinates}{" "}
                                    <span className="mdi mdi-open-in-new"/>
                                </a>
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>
                                Форма осуществления деятельности
                            </h3>
                            <p className={styles.description}>
                                {theatre.form_activity
                                    .map((item) => item.activity)
                                    .join(", ")}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>
                                Возрастной состав участников школьного театра
                            </h3>
                            <p className={styles.description}>
                                {theatre.age_members
                                    .map((item) => item.age)
                                    .join(", ")}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Дата основания</h3>
                            <p className={styles.description}>
                                {moment(theatre.foundation_date).format(
                                    "DD.MM.YYYY"
                                )}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Соцсети</h3>
                            <ul className={styles.social}>
                                {theatre.social_links.map((link) => (
                                    <li key={link}>
                                        <a
                                            className={styles.socialLink}
                                            href={link}
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {window.global.getSocialIcon(link)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>
                                Страница театра на сайте образовательной
                                организации
                            </h3>
                            <p className={styles.description}>
                                <a
                                    className={commonStyles.link}
                                    href={theatre.theatre_url_school}
                                    target={"_blank"}
                                    rel="noopener nofollow noreferer"
                                >
                                    На страницу{" "}
                                    <span className="mdi mdi-open-in-new"/>
                                </a>
                            </p>
                        </li>
                        {
                            user && user.role === "user"
                            &&
                            <li className={styles.item}>
                                <h3 className={styles.label}>
                                    Фестиваль “Живая сцена”
                                </h3>
                                {/* Див для того, чтобы кнопка не растягивалась на весь экран, также можно если театр заявку подал, изменить состояние */}
                                <div>
                                    <Button
                                        type="button"
                                        text={"Подать заявку"}
                                        onClick={handleFestivalRequestBtn}
                                    />
                                </div>
                            </li>
                        }
                    </ul>
                    <h2 className={styles.title}>Педагоги</h2>
                    <ul className="teacher-list">
                        {theatre.teachers.map((item) => {
                            let teacher = teachersStore.teachers.find(
                                (teacherInStore) =>
                                    item.ID === teacherInStore.ID
                            );

                            return (
                                <NavLink
                                    key={item.ID}
                                    className={commonStyles.link}
                                    to={"/admin/teachers/" + item.ID}
                                >
                                    <li className="teacher-list__item">
                                        <img
                                            className="teacher-list__img"
                                            src={
                                                teacher?.photo
                                                    ? window.global.baseUrl +
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
                                                {teacher?.i} {teacher?.o}
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
                </Tab>
                <Tab title={"Краткое описание"}>
                    <div
                        className={styles.editor}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.short_description
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Обращение режиссёра"}>
                    <div
                        className={styles.editor}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.director_message
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Фотографии"}>
                    <h2 className={styles.title}>Фото театра</h2>
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
                    <h2 className={styles.title}>Фото посещения театра</h2>
                    {theatre.photoVisit && theatre.photoVisit.length > 0 ? (
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
                    <h2 className={styles.title}>
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

                    <h2 className={styles.title}>ВИДЕО ЛУЧШИХ ФРАГМЕНТОВ</h2>
                    {theatre.video && theatre.video.length > 0 ? (
                        <>
                            <ul className="gallery-form --content-video">
                                {theatre.video.map((item) => (
                                    <li
                                        key={item}
                                        className="gallery-form__item"
                                    >
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
                    <h2 className={styles.title}>
                        РАССКАЗ О ДРУГИХ ШКОЛЬНЫХ ТЕАТРАХ
                    </h2>
                    {theatre.reviews && theatre.reviews.length > 0 ? (
                        <>
                            {theatre.reviews.map((item) => (
                                <div key={item.title}>
                                    <h3>{item.title}</h3>
                                    <div
                                        className={styles.editor}
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
                    <h2 className={styles.title}>
                        РАССКАЗЫ (РЕЦЕНЗИИ) О ПОСЕЩЕНИИ ДРУГИХ МОСКОВСКИХ
                        ТЕАТРОВ
                    </h2>
                    {theatre.reviewsVisit && theatre.reviewsVisit.length > 0 ? (
                        <>
                            {theatre.reviewsVisit.map((item) => (
                                <div key={item.title}>
                                    <h3>{item.title}</h3>
                                    <div
                                        className={styles.editor}
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
                </Tab>
            </Tabs>
            {festivalRequest}
        </>
    );
};

export default Theatre;
