import React from "react";
import { useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import moment from "moment";
import createDOMPurify from "dompurify";

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/admin/schoolsStore";

import VideoSlider from "../../../components/slider/video.slider.component";
import ImageGallery from "../../../components/image_gallery/image.gallery.component";
import ShowMore from "../../../components/simple/show_more/show.more.component";
import BannerSlider from "../../../components/slider/banner.slider.component";

import { MedalIcons } from "../../../components/svgs.js";
import no_photo_man from "../../../images/no_photo_man.png";
import commonStyles from "../common.module.scss";

function PublicTheatrePage() {
    let { id } = useParams();
    const DOMPurify = createDOMPurify(window);

    const schoolStore = useSchoolStore();
    const {
        theatre,
        loadTheatre,
        loading,
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
                }
            }
        };

        fetchData();
    }, [id]);

    if (loading || schoolStore.loading || teachersStore.loading) {
        return (
            <>
                <section className={commonStyles.section}>
                    <article className={commonStyles.wrap}>
                        <p className={commonStyles.title}>Загрузка...</p>
                    </article>
                </section>
            </>
        );
    }

    if (id && !theatre) return <p>Театр не найден</p>;

    return (
        <>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h1 className={commonStyles.title}>{theatre.title}</h1>
                    {/*<div className="about__level-item">*/}
                    {/*    Дебютант*/}
                    {/*    {MedalIcons.debutant}*/}
                    {/*</div>*/}
                    <div className="about__main-text">
                        <ul className="about__list">
                            <li>
                                <p className="about__text">
                                    Год основания:{" "}
                                    <span className="about__span-accent">
                                        {moment(theatre.foundation_date).format(
                                            "YYYY"
                                        )}{" "}
                                        г.
                                    </span>
                                </p>
                            </li>
                            <li>
                                <p className="about__text">
                                    Форма осуществления деятельности:{" "}
                                    <span className="about__span-accent">
                                        {theatre.form_activity
                                            .map((item) => item.activity)
                                            .join(", ")}
                                    </span>
                                </p>
                            </li>
                            <li>
                                <p className="about__text">
                                    Возрастной состав участников школьного
                                    театра:{" "}
                                    <span className="about__span-accent">
                                        {theatre.age_members
                                            .map((item) => item.age)
                                            .join(", ")}
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div className="about__description-block">
                            {(theatre.short_description ||
                                theatre.director_message) && (
                                <ShowMore>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                theatre.short_description
                                            ),
                                        }}
                                    />
                                    {theatre.director_message && (
                                        <>
                                            <h4>Обращение режиссера:</h4>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(
                                                        theatre.director_message
                                                    ),
                                                }}
                                            />
                                        </>
                                    )}
                                </ShowMore>
                            )}
                        </div>
                    </div>
                </article>
            </section>
            {theatre.teachers && theatre.teachers.length > 0 && (
                <section
                    className={
                        commonStyles.section +
                        ` ` +
                        commonStyles.section_bg_g100
                    }
                >
                    <article className={commonStyles.wrap}>
                        <h2 className={commonStyles.title}>Педагоги</h2>
                        <ul className="teachers__card-deck">
                            {theatre.teachers.map((item) => {
                                let teacher = teachersStore.teachers.find(
                                    (teacherInStore) =>
                                        item.ID === teacherInStore.ID
                                );

                                return (
                                    <li
                                        key={item.fio}
                                        className="teachers__card"
                                    >
                                        <img
                                            className="teachers__img"
                                            src={
                                                teacher?.photo
                                                    ? window.global.baseUrl +
                                                      teacher.photo
                                                    : no_photo_man
                                            }
                                            alt={item.fio}
                                        />
                                        <h3 className="teachers__title">
                                            <span className="teachers__span-accent">
                                                {teacher?.f}
                                            </span>
                                            {teacher?.i} {teacher?.o}
                                        </h3>
                                    </li>
                                );
                            })}
                        </ul>
                    </article>
                </section>
            )}
            {theatre.photo && theatre.photo.length > 0 && (
                <section className={commonStyles.section}>
                    <article className={commonStyles.wrap}>
                        <ImageGallery
                            title="Фото театра"
                            items={theatre.photo}
                        />
                    </article>
                </section>
            )}
            {theatre.photoVisit && theatre.photoVisit.length > 0 && (
                <section
                    className={
                        commonStyles.section +
                        ` ` +
                        commonStyles.section_bg_g100
                    }
                >
                    <article className={commonStyles.wrap}>
                        <ImageGallery
                            title="Фото посещения театра"
                            items={theatre.photoVisit}
                        />
                    </article>
                </section>
            )}
            {theatre.video_business_card && theatre.video_business_card !== "" && (
                <section className={commonStyles.section}>
                    <article className={commonStyles.wrap}>
                        <h2 className={commonStyles.title}>ВИДЕО ВИЗИТКА</h2>
                        <VideoSlider
                            items={[
                                {
                                    url: theatre.video_business_card,
                                },
                            ]}
                        />
                    </article>
                </section>
            )}
            {theatre.video && theatre.video.length > 0 && (
                <section className={commonStyles.section}>
                    <article className={commonStyles.wrap}>
                        <h2 className={commonStyles.title}>
                            ВИДЕО ЛУЧШИХ ФРАГМЕНТОВ
                        </h2>
                        <VideoSlider
                            thumbs={true}
                            items={theatre.video.map((item) => {
                                return { url: item };
                            })}
                        />
                    </article>
                </section>
            )}
            <section
                className={
                    commonStyles.section +
                    ` ` +
                    commonStyles.section_bg_g100 +
                    ` contact`
                }
            >
                <article className={commonStyles.wrap + " contact"}>
                    <h2 className={commonStyles.title}>Контакты</h2>
                    <div className="contact__map">
                        <YMaps>
                            <Map
                                state={{
                                    center: [
                                        theatre.coordinates
                                            .split(",")[0]
                                            .trim(),
                                        theatre.coordinates
                                            .split(",")[1]
                                            .trim(),
                                    ],
                                    zoom: 14,
                                }}
                                width="100%"
                                height="100%"
                            >
                                <Placemark
                                    geometry={[
                                        theatre.coordinates
                                            .split(",")[0]
                                            .trim(),
                                        theatre.coordinates
                                            .split(",")[1]
                                            .trim(),
                                    ]}
                                    properties={{
                                        iconCaption: theatre.title,
                                    }}
                                    options={{
                                        preset: "islands#redDotIconWithCaption",
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                    <div className="contact__columns">
                        <div className="contact__column">
                            <h3
                                className={
                                    commonStyles.subtitle + " contact__title"
                                }
                            >
                                {theatre.title}
                            </h3>
                            <address className="contact__address">
                                {theatre.address}
                            </address>
                            <a
                                className="contact__link"
                                href={"tel:" + schoolStore.school.dir_phone}
                                rel="noopener nofollow noreferer"
                            >
                                {schoolStore.school.dir_phone}
                            </a>
                        </div>
                        {theatre.social_links &&
                            theatre.social_links.length > 0 && (
                                <div className="social">
                                    <p className="social__label">
                                        Наши соцсети:
                                    </p>
                                    <ul className="social__list">
                                        {theatre.social_links.map((item) => (
                                            <li key={item}>
                                                <a
                                                    className="social__link"
                                                    href={item}
                                                    target={"_blank"}
                                                    rel="noopener nofollow noreferer"
                                                >
                                                    {window.global.getSocialIcon(
                                                        item
                                                    )}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                    </div>
                    <div className="school-info">
                        <h3 className={commonStyles.subtitle}>
                            Информация о школе
                        </h3>
                        <div className="school-info__detail">
                            <img
                                className="school-info__logo"
                                src="https://lookw.ru/8/896/1476182475-switzerland-houses-467737.jpg"
                                alt=""
                            />
                            <div className="school-info__text-block">
                                <h4 className="school-info__title">
                                    {schoolStore.school.org_short_name}
                                </h4>
                                <p className="school-info__description">
                                    {schoolStore.school.org_short}
                                </p>
                                <p className="school-info__subtitle">
                                    {schoolStore.school.dir_fio}
                                </p>
                                <p className="school-info__description">
                                    ФИО директора/руководителя
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
}

export default PublicTheatrePage;
