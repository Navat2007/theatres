import React from "react";
import ReactPlayer from "react-player";
import moment from "moment";
import {NavLink} from "react-router-dom";
import createDOMPurify from "dompurify";
import {useForm} from "react-hook-form";
import axios from "axios";

import useAuthStore from "../../../store/authStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Button from "../../button/button.component";
import Tabs from "../../tabs/tabs.component";
import Tab from "../../tabs/tab.component";
import FieldInput from "../../field/field.input.component";
import Popup from "../../popup/popup.component";
import Notif from "../../notif/notif.component";
import ImageGallery from "../../image_gallery/image.gallery.component";
import TheatreActivityComponent from "./theatre.activity.component";

import commonStyles from "../../../pages/common.module.scss";
import styles from "./theatre.module.scss";
import no_photo_man from "../../../images/no_photo_man.png";
import {EventIcons} from "../../svgs.js";
import noImage from "../../../images/no_image.png";

const Theatre = ({id, theatre, teachersStore, onBack, onEdit}) => {
    const DOMPurify = createDOMPurify(window);

    const {user} = useAuthStore();
    const {school, loadSchool} = useSchoolStore((state) => ({
        school: state.school,
        loadSchool: state.loadSchool,
    }));

    const {register, handleSubmit} = useForm();

    const [notif, setNotif] = React.useState(<></>);
    const [festivalRequest, setFestivalRequest] = React.useState(<></>);

    React.useEffect(() => {
        const fetchData = async () => {
            await loadSchool({id: user.schoolID});
        };

        fetchData();
    }, []);

    const onTaliaFestivalRequestSubmit = async (data) => {
        let form = new FormData();

        form.append("section", "1");
        form.append("org", school.org_name);
        form.append("theatre", theatre.title);
        form.append("direction", "«Благосклонная Талия»");
        form.append("count", data.count);

        const response = await axios.postForm(
            "https://theatres.patriot-sport.ru/php/email/festival.php",
            form
        );

        if (response?.data?.mail_result) {
            setFestivalRequest(<></>);
            setNotif(
                <Notif
                    text="Заявка успешно отправлена"
                    state="success"
                    timerInSeconds={3}
                    opened={true}
                    onClose={() => setNotif(<></>)}
                />
            );
        } else {
            setNotif(
                <Notif
                    text="При отправке заявки произошла ошибка"
                    state="error"
                    opened={true}
                    onClose={() => setNotif(<></>)}
                />
            );
        }
    };

    const onMelpomenaFestivalRequestSubmit = async (data) => {
        let form = new FormData();
        window.global.buildFormData(form, data);

        form.append("section", "2");
        form.append("org", school.org_name);
        form.append("theatre", theatre.title);
        form.append("direction", "«Школьная Мельпомена»");

        const response = await axios({
            method: "post",
            url: "https://theatres.patriot-sport.ru/php/email/festival.php",
            data: form,
            headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
            },
        });

        if (response?.data?.mail_result) {
            setFestivalRequest(<></>);
            setNotif(
                <Notif
                    text="Заявка успешно отправлена"
                    state="success"
                    timerInSeconds={3}
                    opened={true}
                    onClose={() => setNotif(<></>)}
                />
            );
        } else {
            setNotif(
                <Notif
                    text="При отправке заявки произошла ошибка"
                    state="error"
                    opened={true}
                    onClose={() => setNotif(<></>)}
                />
            );
        }
    };

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
                            onSubmit={handleSubmit(
                                onTaliaFestivalRequestSubmit
                            )}
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
                                    label={
                                        "Количество участников творческого коллектива:"
                                    }
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
                                    style={{
                                        marginLeft: "auto",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </form>
                    </Tab>
                    <Tab title={"Школьная Мельпомена"}>
                        <form
                            onSubmit={handleSubmit(
                                onMelpomenaFestivalRequestSubmit
                            )}
                            className="form"
                            encType={"multipart/form-data"}
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
                                    value={"«Школьная Мельпомена»"}
                                />
                                <FieldInput
                                    label={"Название спектакля:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_title", {
                                        value: "",
                                    })}
                                />
                                <FieldInput
                                    label={"Автор литературного материала:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_author", {
                                        value: "",
                                    })}
                                />
                                <FieldInput
                                    label={"Название литературного материала:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_book", {
                                        value: "",
                                    })}
                                />
                                <FieldInput
                                    label={"ФИО режиссера-постановщика:"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_producer", {
                                        value: "",
                                    })}
                                />
                                <FieldInput
                                    label={
                                        "Количество участников творческого коллектива:"
                                    }
                                    type={"number"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_count", {
                                        value: 0,
                                    })}
                                />
                                <FieldInput
                                    label={"Возрастная категория:"}
                                    type={"select"}
                                    defaultSelectItem={false}
                                    selectItems={[
                                        {
                                            value: "учащиеся 1-5 классов",
                                            title: "учащиеся 1-5 классов",
                                        },
                                        {
                                            value: "учащиеся 6-11 классов",
                                            title: "учащиеся 6-11 классов",
                                        },
                                        {
                                            value: "учащиеся из разных возрастных групп",
                                            title: "учащиеся из разных возрастных групп",
                                        },
                                    ]}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_age", {
                                        value: 0,
                                    })}
                                />
                                <FieldInput
                                    label={"Продолжительность спектакля (мин):"}
                                    type={"number"}
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_length", {
                                        value: 0,
                                    })}
                                />
                                <FieldInput
                                    label={
                                        "Номинация (Драматический спектакль/музыкальный спектакль/спектакль на иностранном языке):"
                                    }
                                    layout="flex"
                                    size="small"
                                    required={true}
                                    {...register("performance_nomination", {
                                        value: "",
                                    })}
                                />
                                <FieldInput
                                    label={
                                        "Афиша спектакля (прием до 15.02.2023)"
                                    }
                                    type="file"
                                    multiple="multiple"
                                    extraClass="form__field"
                                    layout="flex"
                                    accept="image/*"
                                    {...register("performance_photo")}
                                />
                                <FieldInput
                                    label={
                                        "Ссылка на видеофрагмент (прием до 15.02.2023)"
                                    }
                                    type="url"
                                    extraClass="form__field"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    {...register("performance_video")}
                                />
                                <FieldInput
                                    label={
                                        "Ответы на вопросы (прием до 15.02.2023)"
                                    }
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
                                    style={{
                                        marginLeft: "auto",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </form>
                    </Tab>
                </Tabs>
            </Popup>
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
                <Tab title={"Основные сведения"} event={"supportive_waist"}>
                    <ul className={styles.list}>
                        <li
                            className={styles.item}
                            style={{alignItems: "center"}}
                        >
                            <h3 className={styles.label}>Эмблема театра</h3>
                            <div className={styles.logoBlock}>
                                <img
                                    className={styles.logo}
                                    src={noImage}
                                    alt={"Эмблема театра"}
                                />
                                <div className={styles.logoPanel}>
                                    <Button
                                        size={"smaller"}
                                        theme={"text"}
                                        isIconBtn={"true"}
                                        iconClass={"mdi mdi-refresh"}
                                        aria-label={"Обновить фото"}
                                        title={"Обновить фото"}
                                    />
                                    <Button
                                        size={"smaller"}
                                        theme={"text"}
                                        isIconBtn={"true"}
                                        iconClass={"mdi mdi-close"}
                                        aria-label={"Удалить фото"}
                                        title={"Удалить фото"}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Публичная страница</h3>
                            <p className={styles.description}>
                                <NavLink
                                    className={commonStyles.link}
                                    to={"/theatres/" + id}
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
                                {theatre.coordinates ? (
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
                                ) : (
                                    "Не заданы"
                                )}
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
                            <h3 className={styles.label}>
                                Соцсети
                                <span
                                    className={styles.eventIcon}
                                    aria-label="Благославенная талия"
                                    title="Благославенная талия"
                                >
                                    {EventIcons.supportive_waist}
                                </span>
                            </h3>
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
                                <span
                                    className={styles.eventIcon}
                                    aria-label="Благославенная талия"
                                    title="Благославенная талия"
                                >
                                    {EventIcons.supportive_waist}
                                </span>
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
                        {user && user.role === "user" && (
                            <li className={styles.item}>
                                <h3 className={styles.label}>
                                    Фестиваль “Живая сцена”
                                </h3>
                                <Button
                                    style={{maxWidth: "max-content"}}
                                    type="button"
                                    text={"Подать заявку"}
                                    onClick={handleFestivalRequestBtn}
                                />
                            </li>
                        )}
                    </ul>
                    <h2 className={styles.title}>Педагоги</h2>
                    {theatre.teachers.length === 0 ? (
                        <p className={styles.description}>Данные не указаны</p>
                    ) : (
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
                                        to={
                                            "/" +
                                            (user?.role === "user"
                                                ? "user"
                                                : "admin") +
                                            "/teachers/" +
                                            item.ID
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
                    )}
                </Tab>
                <Tab title={"Информация о театре"}>
                    <div
                        className={styles.editor}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.short_description
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Обращение режиссёра"} hidden={true}>
                    <div
                        className={styles.editor}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                theatre.director_message
                            ),
                        }}
                    />
                </Tab>
                <Tab title={"Фотографии"} event={"supportive_waist"}>
                    <ImageGallery title={"Фото театра"} items={theatre.photo} front={false} />
                    {/*<ImageGallery title={"Фото посещения театра"} items={theatre.photoVisit} front={false} />*/}
                </Tab>
                <Tab title={"Видео"} event={"supportive_waist"}>
                    <h2 className={styles.title}>
                        Видеовизитка школьного театра
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

                    <h2 className={styles.title}>
                        Видео лучших фрагментов спектаклей
                    </h2>
                    {theatre.video && theatre.video.length > 0 ? (
                        <>
                            {/* И этот тоже */}
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
                <Tab title={"Активность театра"} event={"supportive_waist"}>
                    <TheatreActivityComponent theatreID={theatre.ID} />
                </Tab>
                <Tab title={"Описания (рецензии)"} hidden={true}>
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
            {notif}
        </>
    );
};

export default Theatre;
