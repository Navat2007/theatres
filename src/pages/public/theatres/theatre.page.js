import React from "react";
import { useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import ReactPlayer from "react-player";

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/admin/schoolsStore";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { SocialIcons } from "../../../components/svgs.js";

function PublicTheatrePage() {
    let { id } = useParams();

    const YoutubeSlide = ({ url, isSelected }) => (
        <ReactPlayer
            width="100%"
            height={"auto"}
            className="video__react-player"
            url={url}
            playing={isSelected}
        />
    );

    const customRenderItem = (item, props) => (
        <item.type
            {...item.props}
            {...props}
        />
    );

    const getVideoThumb = (videoId) =>
        `https://img.youtube.com/vi/${videoId}/default.jpg`;

    const getVideoId = (url) =>
        url.substr("https://www.youtube.com/embed/".length, url.length);

    const customRenderThumb = (children) =>
        children.map((item) => {
            const videoId = getVideoId(item.props.url);
            return <img src={getVideoThumb(videoId)} />;
        });

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

    if (id === "test") {
        return (
            <>
                <Carousel
                    infiniteLoop
                    // showIndicators={false}
                    showArrows={false}
                    showStatus={false}
                    autoPlay
                    animationHandler={"fade"}
                    interval={5000}
                    transitionTime={1000}
                    stopOnHover
                    swipeable={false}
                    emulateTouch={false}
                    swipeScrollTolerance={5}
                    showThumbs={false}
                >
                    <div className="banner">
                        <div className="banner__wrap">
                            <img
                                className="banner__img"
                                src="https://photocentra.ru/images/main63/633728_main.jpg"
                                alt=""
                            />
                            <h2 className="banner__title">
                                Чинк: Хвостатый детектив
                            </h2>
                            <p className="banner__subtitle">
                                Приключения в Медовой Долине в озвучке Мирославы
                                Карпович, Александра Олешко и Эвелины Блёданс
                            </p>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="banner__wrap">
                            <img
                                className="banner__img"
                                src="https://meloman.ru/media/upload/photos/AJyopZNpajU_tikK8m9.jpg"
                                alt=""
                            />
                            <h2 className="banner__title">
                                Чинк: Хвостатый детектив
                            </h2>
                            <p className="banner__subtitle">
                                Приключения в Медовой Долине в озвучке Мирославы
                                Карпович, Александра Олешко и Эвелины Блёданс
                            </p>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="banner__wrap">
                            <img
                                className="banner__img"
                                src="https://meloman.ru/media/upload/photos/AJyopZNpajU_tikK8m9.jpg"
                                alt=""
                            />
                            <h2 className="banner__title">
                                Чинк: Хвостатый детектив
                            </h2>
                            <p className="banner__subtitle">
                                Приключения в Медовой Долине в озвучке Мирославы
                                Карпович, Александра Олешко и Эвелины Блёданс
                            </p>
                        </div>
                    </div>
                </Carousel>
                <section className="public-content__section">
                    <article className="public-content__wrap about">
                        <h1 className="section-title">Театр Чайковского</h1>
                        <div className="about__level-item">дебютант</div>
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
                                        Возрастной состав участников школьного
                                        театра:
                                        <span className="about__span-accent">
                                            1-4 класс
                                        </span>
                                    </p>
                                </li>
                            </ul>
                            <div className="about__description-block">
                                <p>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем
                                    приняли участие все классы. Было
                                    представлено 6 постановок. Жюри под
                                    председательством директора школы Суханкиной
                                    О.А., проанализировав
                                </p>
                                <p>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем
                                    приняли участие все классы. Было
                                    представлено 6 постановок. Жюри под
                                    председательством директора школы Суханкиной
                                    О.А., проанализировав
                                </p>
                                <p>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем
                                    приняли участие все классы. Было
                                    представлено 6 постановок. Жюри под
                                    председательством директора школы Суханкиной
                                    О.А., проанализировав
                                </p>
                                <p>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем
                                    приняли участие все классы. Было
                                    представлено 6 постановок. Жюри под
                                    председательством директора школы Суханкиной
                                    О.А., проанализировав
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
                        <div className="contact__map">
                            <YMaps>
                                <Map
                                    state={{ center: [55.76, 37.64], zoom: 14 }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Placemark
                                        geometry={[55.76, 37.64]}
                                        properties={{
                                            iconCaption: "Название театра",
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
                                <h3 className="section-subtitle contact__title">
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
                                <p className="social__label">Наши соцсети:</p>
                                <ul className="social__list">
                                    <li>
                                        <a
                                            className="social__link"
                                            href=""
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {SocialIcons.t}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social__link"
                                            href=""
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {SocialIcons.vk}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social__link"
                                            href=""
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {SocialIcons.ok}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="school-info">
                            <h3 className="section-subtitle">
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
                                        ГКОУ КШИ № 1
                                    </h4>
                                    <p className="school-info__description">
                                        Государственное казенное
                                        общеобразовательное учреждение города
                                        Москвы "Кадетская школа-интернат № 1
                                        "Первый Московский кадетский корпус"
                                    </p>
                                    <p className="school-info__subtitle">
                                        Крымский Владимир Яковлевич
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

    if (id && !theatre) {
        return <p>Театр не найден</p>;
    }

    return (
        <>
            <Carousel
                infiniteLoop
                // showIndicators={false}
                showArrows={false}
                showStatus={false}
                autoPlay
                animationHandler={"fade"}
                interval={5000}
                transitionTime={1000}
                stopOnHover
                swipeable={false}
                emulateTouch={false}
                swipeScrollTolerance={5}
                showThumbs={false}
            >
                <div className="banner">
                    <div className="banner__wrap">
                        <img
                            className="banner__img"
                            src="https://photocentra.ru/images/main63/633728_main.jpg"
                            alt=""
                        />
                        <h2 className="banner__title">
                            Чинк: Хвостатый детектив
                        </h2>
                        <p className="banner__subtitle">
                            Приключения в Медовой Долине в озвучке Мирославы
                            Карпович, Александра Олешко и Эвелины Блёданс
                        </p>
                    </div>
                </div>
                <div className="banner">
                    <div className="banner__wrap">
                        <img
                            className="banner__img"
                            src="https://meloman.ru/media/upload/photos/AJyopZNpajU_tikK8m9.jpg"
                            alt=""
                        />
                        <h2 className="banner__title">
                            Чинк: Хвостатый детектив
                        </h2>
                        <p className="banner__subtitle">
                            Приключения в Медовой Долине в озвучке Мирославы
                            Карпович, Александра Олешко и Эвелины Блёданс
                        </p>
                    </div>
                </div>
                <div className="banner">
                    <div className="banner__wrap">
                        <img
                            className="banner__img"
                            src="https://meloman.ru/media/upload/photos/AJyopZNpajU_tikK8m9.jpg"
                            alt=""
                        />
                        <h2 className="banner__title">
                            Чинк: Хвостатый детектив
                        </h2>
                        <p className="banner__subtitle">
                            Приключения в Медовой Долине в озвучке Мирославы
                            Карпович, Александра Олешко и Эвелины Блёданс
                        </p>
                    </div>
                </div>
            </Carousel>
            <section className="public-content__section">
                <article className="public-content__wrap about">
                    <h1 className="section-title">Театр Чайковского</h1>
                    <div className="about__level-item">дебютант</div>
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
                                        Объединение дополнительного образования
                                    </span>
                                </p>
                            </li>
                            <li>
                                <p className="about__text">
                                    Возрастной состав участников школьного
                                    театра:
                                    <span className="about__span-accent">
                                        1-4 класс
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div className="about__description-block">
                            <p>
                                На прошлой неделе в школе прошел школьный
                                конкурс «Театральные подмостки». В нем приняли
                                участие все классы. Было представлено 6
                                постановок. Жюри под председательством директора
                                школы Суханкиной О.А., проанализировав
                            </p>
                            <p>
                                На прошлой неделе в школе прошел школьный
                                конкурс «Театральные подмостки». В нем приняли
                                участие все классы. Было представлено 6
                                постановок. Жюри под председательством директора
                                школы Суханкиной О.А., проанализировав
                            </p>
                            <p>
                                На прошлой неделе в школе прошел школьный
                                конкурс «Театральные подмостки». В нем приняли
                                участие все классы. Было представлено 6
                                постановок. Жюри под председательством директора
                                школы Суханкиной О.А., проанализировав
                            </p>
                            <p>
                                На прошлой неделе в школе прошел школьный
                                конкурс «Театральные подмостки». В нем приняли
                                участие все классы. Было представлено 6
                                постановок. Жюри под председательством директора
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
            <section className="public-content__section">
                <article className="public-content__wrap video">
                    <h2 className="section-title">Видео</h2>
                    <Carousel
                        renderItem={customRenderItem}
                        renderThumbs={customRenderThumb}
                    >
                        <YoutubeSlide
                            key="youtube-1"
                            url="https://www.youtube.com/watch?v=FihWD9OKn-g"
                        />
                        <YoutubeSlide
                            key="youtube-2"
                            url="https://www.youtube.com/watch?v=CMfF_2LkvI0&list=PLgFdtTm2TM3OsAJ2FdE_B87-y-G6tYoQP"
                        />
                    </Carousel>
                </article>
            </section>
            <section className="public-content__section public-content__section_bg_light-grey contact">
                <article className="public-content__wrap contact">
                    <h2 className="section-title">Контакты</h2>
                    <div className="contact__map">
                        <YMaps>
                            <Map
                                state={{ center: [55.76, 37.64], zoom: 14 }}
                                width="100%"
                                height="100%"
                            >
                                <Placemark
                                    geometry={[55.76, 37.64]}
                                    properties={{
                                        iconContent: "Test",
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                    <div className="contact__columns">
                        <div className="contact__column">
                            <h3 className="section-subtitle contact__title">
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
                            <p className="social__label">Наши соцсети:</p>
                            <ul className="social__list">
                                <li>
                                    <a
                                        className="social__link"
                                        href=""
                                        target={"_blank"}
                                        rel="noopener nofollow noreferer"
                                    >
                                        {SocialIcons.t}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="social__link"
                                        href=""
                                        target={"_blank"}
                                        rel="noopener nofollow noreferer"
                                    >
                                        {SocialIcons.vk}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="social__link"
                                        href=""
                                        target={"_blank"}
                                        rel="noopener nofollow noreferer"
                                    >
                                        {SocialIcons.ok}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="school-info">
                        <h3 className="section-subtitle">Информация о школе</h3>
                        <div className="school-info__detail">
                            <img
                                className="school-info__logo"
                                src="https://lookw.ru/8/896/1476182475-switzerland-houses-467737.jpg"
                                alt=""
                            />
                            <div className="school-info__text-block">
                                <h4 className="school-info__title">
                                    ГКОУ КШИ № 1
                                </h4>
                                <p className="school-info__description">
                                    Государственное казенное общеобразовательное
                                    учреждение города Москвы "Кадетская
                                    школа-интернат № 1 "Первый Московский
                                    кадетский корпус"
                                </p>
                                <p className="school-info__subtitle">
                                    Крымский Владимир Яковлевич
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
