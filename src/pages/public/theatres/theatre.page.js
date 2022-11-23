import React from "react";
import {useParams} from "react-router-dom";
import {YMaps, Map, Placemark} from "react-yandex-maps";
import moment from "moment";
import createDOMPurify from "dompurify";

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/admin/schoolsStore";

import VideoSlider from "../../../components/slider/video.slider.component";
import ImageGallery from "../../../components/image_gallery/image.gallery.component";
import ShowMore from "../../../components/simple/show_more/show.more.component";
import BannerSlider from "../../../components/slider/banner.slider.component";

import {SocialIcons, MedalIcons} from "../../../components/svgs.js";
import no_photo_man from "../../../images/no_photo_man.png";

function PublicTheatrePage() {

    let {id} = useParams();
    const DOMPurify = createDOMPurify(window);

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

    const photo = [
        {
            url: "https://proprikol.ru/wp-content/uploads/2021/05/kartinki-teatr-30.jpg",
        },
        {
            url: "https://blog.postel-deluxe.ru/wp-content/uploads/hm/0606c590c33e2183d027c36d33f493d7f404532b0d399f76a3ea1ab18eb5e3cf.jpeg",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=188a8b0f655670854b3fff1d74b386aa5b8683c8-4809743-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=884fb757352a3a5e8fca312b496ba69b-5179886-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://yandex-images.clstorage.net/F47L2He34/043242IJxs9z/5WsMlAjVnlzYc7hL7UFANbtkUwp_WFK-maCrwjXtVQOIXI3nY06E82o6Nu9wiGO1B9NGYKKC11POJCFTbQbrZtFvyPCpIAs4eQb4y90RYeBvVULP3x2DGrxlf9KAbdUzqTkdI_Pr4PIqinUp948E5pAQdJKVYFOW-8HhF3nX_0AH3x3nvvcsPY3AejoP0AKgeZSiXq3fEqw_9p-1U5rwpu8oDTLUeMAiHy4FyDe-FoYCcXTyhnDBB-nQM6Y_pH-CdEgMxA70D40_EUo5n0KRIBmksO7-bCK-HwechlGYEvYO-S_RdSrxU-x_xLhVHJaX06InUbTCUTfZYsE2XKS8cacoTTWNpN6PvLDqCfyikqM4F1DdDy2CHXzmzrURuoFk_6iM4JUb0QOtPvT7lj22plPgxXCX4HFES7ND1fw2P0NUSh3F7WRdTkxi29p_w_PQSbWg_fzsMM9-5p4VEhogV5_YXxFWaJGyH493-pYdZVUAYaaCBKACtnhCgtaNBo2SV7pu5l4HbX9O8orZXHGRAatUM88uvQCsvBfNtHJYgLQcSE0ylTgRgz5_hHk1X1aXcLNGM_VgYmQ7sADX3HRtIaZ77pRNFw1ebjBpO9-yM4BKhDEOfV7Dj581ncYCyEK3_TlsYHSbU2KsDGWY5d3n1GJRZCGFUYF1emEB9Z1FnENEOAw3nUZOrOyiGrkvs0LAScYTDN5e8p7vRgxHI-sC9Qx4bFF1WwNgfw_2KVbv9ldx8sSSBKGAJrlRQFedJ61ghMlOJ-7k7W1uMtk5XSHyoMl3od5cb1FfnLW8BxPrgLe8GX8yVUiQYY7dNZtWz4YFksM0EbdjEoQ5cWI0rbY8IKc4bsX_VF-ezINa242z0JBa10Ltrx_Dj-0XzMYDm5J2jBvsYWZLQOEOb6RZZX1mVMGj5HN2kPOHy6Lg5Y4FfgFE-G3GradvPE2hucmNgIFzOhSAHk880v5clc3EY",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=2fbaa1348893089467299b3b18e33a5d8528cb02-5121678-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=407d8e2f059f4edabbb33e8eda68913492ab92c8-4077743-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://yandex-images.clstorage.net/F47L2He34/043242IJxs9z/5WsMlAjVnlzYc7hL7UFANbtkUwp_WFK-maWeggUNEDMYLAiyo16ENko6c59QGGNQR2ZDNbLnklPrNLFj_XOeQ9QfyNAZMGsIybb4y90RYeBvVULP3x2DGrxlf9KAbdUzqTkdI_Pr4PIqinUp948E5pAQdJKVYFOW-8HhF3nX_0AH3x3nvvcsPY3AejoP0AKgeZSiXq3fEqw_9p-1U5rwpu8oDTLUeMAiHy4FyDe-FoYCcXTyhnDBB-nQM6Y_pH-CdEgMxA70D40_EUo5n0KRIBmksO7-bCK-HwechlGYEvYO-S_RdSrxU-x_xLhVHJaX06InUbTCUTfZYsE2XKS8cacoTTWNpN6PvLDqCfyikqM4F1DdDy2CHXzmzrURuoFk_6iM4JUb0QOtPvT7lj22plPgxXCX4HFES7ND1fw2P0NUSh3F7WRdTkxi29p_w_PQSbWg_fzsMM9-5p4VEhogV5_YXxFWaJGyH493-pYdZVUAYaaCBKACtnhCgtaNBo2SV7pu5l4HbX9O8orZXHGRAatUM88uvQCsvBfNtHJYgLQcSE0ylTgRgz5_hHk1X1aXcLNGM_VgYmQ7sADX3HRtIaZ77pRNFw1ebjBpO9-yM4BKhDEOfV7Dj581ncYCyEK3_TlsYHSbU2KsDGWY5d3n1GJRZCGFUYF1emEB9Z1FnENEOAw3nUZOrOyiGrkvs0LAScYTDN5e8p7vRgxHI-sC9Qx4bFF1WwNgfw_2KVbv9ldx8sSSBKGAJrlRQFedJ61ghMlOJ-7k7W1uMtk5XSHyoMl3od5cb1FfnLW8BxPrgLe8GX8yVUiQYY7dNZtWz4YFksM0EbdjEoQ5cWI0rbY8IKc4bsX_VF-ezINa242z0JBa10Ltrx_Dj-0XzMYDm5J2jBvsYWZLQOEOb6RZZX1mVMGj5HN2kPOHy6Lg5Y4FfgFE-G3GradvPE2hucmNgIFzOhSAHk880v5clc3EY",
        },
    ];

    const photoVisit = [
        {
            url: "https://avatars.mds.yandex.net/i?id=c74aab2dff3321263371312c509551ac-4857366-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://yandex-images.clstorage.net/F47L2He34/043242IJxs9z/5WsMlAjVnlzYc7hL7UFANbtkUwp_WFK-maC71wDddSPIfCi3c14hRm9vM88wjSPAZ-MWFXfXoia-AeQzjXOLFpQ_yIBZQBtoieb4y90RYeBvVULP3x2DGrxlf9KAbdUzqTkdI_Pr4PIqinUp948E5pAQdJKVYFOW-8HhF3nX_0AH3x3nvvcsPY3AejoP0AKgeZSiXq3fEqw_9p-1U5rwpu8oDTLUeMAiHy4FyDe-FoYCcXTyhnDBB-nQM6Y_pH-CdEgMxA70D40_EUo5n0KRIBmksO7-bCK-HwechlGYEvYO-S_RdSrxU-x_xLhVHJaX06InUbTCUTfZYsE2XKS8cacoTTWNpN6PvLDqCfyikqM4F1DdDy2CHXzmzrURuoFk_6iM4JUb0QOtPvT7lj22plPgxXCX4HFES7ND1fw2P0NUSh3F7WRdTkxi29p_w_PQSbWg_fzsMM9-5p4VEhogV5_YXxFWaJGyH493-pYdZVUAYaaCBKACtnhCgtaNBo2SV7pu5l4HbX9O8orZXHGRAatUM88uvQCsvBfNtHJYgLQcSE0ylTgRgz5_hHk1X1aXcLNGM_VgYmQ7sADX3HRtIaZ77pRNFw1ebjBpO9-yM4BKhDEOfV7Dj581ncYCyEK3_TlsYHSbU2KsDGWY5d3n1GJRZCGFUYF1emEB9Z1FnENEOAw3nUZOrOyiGrkvs0LAScYTDN5e8p7vRgxHI-sC9Qx4bFF1WwNgfw_2KVbv9ldx8sSSBKGAJrlRQFedJ61ghMlOJ-7k7W1uMtk5XSHyoMl3od5cb1FfnLW8BxPrgLe8GX8yVUiQYY7dNZtWz4YFksM0EbdjEoQ5cWI0rbY8IKc4bsX_VF-ezINa242z0JBa10Ltrx_Dj-0XzMYDm5J2jBvsYWZLQOEOb6RZZX1mVMGj5HN2kPOHy6Lg5Y4FfgFE-G3GradvPE2hucmNgIFzOhSAHk880v5clc3EY",
        },
        {
            url: "https://yandex-images.clstorage.net/F47L2He34/043242IJxs9z/5WsMlAjVnlzYc7hL7UFANbtkUwp_WFK-maX-sqUYJXPdfJ3npj7k838fI08AHVNAF6MDQKK3ola-YYRjrQO-RoFPyOAJEBuYybb4y90RYeBvVULP3x2DGrxlf9KAbdUzqTkdI_Pr4PIqinUp948E5pAQdJKVYFOW-8HhF3nX_0AH3x3nvvcsPY3AejoP0AKgeZSiXq3fEqw_9p-1U5rwpu8oDTLUeMAiHy4FyDe-FoYCcXTyhnDBB-nQM6Y_pH-CdEgMxA70D40_EUo5n0KRIBmksO7-bCK-HwechlGYEvYO-S_RdSrxU-x_xLhVHJaX06InUbTCUTfZYsE2XKS8cacoTTWNpN6PvLDqCfyikqM4F1DdDy2CHXzmzrURuoFk_6iM4JUb0QOtPvT7lj22plPgxXCX4HFES7ND1fw2P0NUSh3F7WRdTkxi29p_w_PQSbWg_fzsMM9-5p4VEhogV5_YXxFWaJGyH493-pYdZVUAYaaCBKACtnhCgtaNBo2SV7pu5l4HbX9O8orZXHGRAatUM88uvQCsvBfNtHJYgLQcSE0ylTgRgz5_hHk1X1aXcLNGM_VgYmQ7sADX3HRtIaZ77pRNFw1ebjBpO9-yM4BKhDEOfV7Dj581ncYCyEK3_TlsYHSbU2KsDGWY5d3n1GJRZCGFUYF1emEB9Z1FnENEOAw3nUZOrOyiGrkvs0LAScYTDN5e8p7vRgxHI-sC9Qx4bFF1WwNgfw_2KVbv9ldx8sSSBKGAJrlRQFedJ61ghMlOJ-7k7W1uMtk5XSHyoMl3od5cb1FfnLW8BxPrgLe8GX8yVUiQYY7dNZtWz4YFksM0EbdjEoQ5cWI0rbY8IKc4bsX_VF-ezINa242z0JBa10Ltrx_Dj-0XzMYDm5J2jBvsYWZLQOEOb6RZZX1mVMGj5HN2kPOHy6Lg5Y4FfgFE-G3GradvPE2hucmNgIFzOhSAHk880v5clc3EY",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=324e2759928ba0407e4c8aadca3500e4838b6b47-5541108-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=5afe3b2a027705b4946eade5f77c75f6-4012866-images-thumbs&n=13&exp=1",
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=f648145c743319b555b3129764c250f4-5348469-images-thumbs&n=13&exp=1",
        },
    ];

    React.useEffect(() => {

        const fetchData = async () => {
            if (id) {
                let tempTheatre = await loadTheatre({id});

                if (tempTheatre) {
                    await schoolStore.loadSchool({id: tempTheatre.schoolID});
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
                <section className="public-content__section">
                    <article className="public-content__wrap about">
                        <h1 className="section-title">Загрузка...</h1>
                    </article>
                </section>
            </>
        );
    }

    if (id === "test") {
        return (
            <>
                <BannerSlider
                    transitionTime={1000}
                    autoPlay={true}
                    swipe={false}
                    showArrows={false}
                    items={[
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Таланты-и-поклонники-1280x854.jpg",
                            title: "Таланты и поклонники",
                            text: "В жизни людей, принимающих на себя различные роли на сцене, постоянно случаются заботы, быт и привычки, от которых просто та избавиться не удается. А тот, кто восхищается талантом, в глубине души только посягает на него и стремиться овладеть теми же навыками.",
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Тартюф.jpg",
                            title: "Тартюф",
                            text: "Целью самозванца является завоевание сердца жены хозяина, но вот добиться цели не так просто, как может показаться на первый взгляд. Трудности, с которыми персонажу предстоит столкнуться, сопровождаются настоящими эмоциями и не дают зрителям расслабиться до самого конца.",
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Ревизор-1280x854.jpg",
                            title: "Ревизор",
                            text: "Знаменитая комедия Гоголя уже не раз была успешной постановкой в различных театрах, но в 2020 году зрителей ожидает настоящий шедевр. В Ермоловском театре для посетителей будет представлена история без слов.",
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Там-же-тогда-же.jpg",
                            title: "Там же, тогда же",
                            text: "Спектакль доносит до зрителей общепризнанные факты: в жизни все меняется, все уходит и исчезает незадолго после появления. Но есть и нечто вечное – персонажи встречаются каждый год в то же время и в том же месте.",
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Бестолочь-1280x853.jpg",
                            title: "Бестолочь",
                            text: "Она – настоящая недотепа, недалекая деревенская дама без особенностей во внешности и сложного характера. Но супружеская чета даже не считает недостатками проблемы в работе Анны, ведь эта девушка теперь является бесконечным поводом для веселья и семейных шуток.",
                        },
                    ]}
                />
                <section className="public-content__section">
                    <article className="public-content__wrap about">
                        <h1 className="section-title">Театр Чайковского</h1>
                        <div className="about__level-item">
                            Дебютант
                            {MedalIcons.debutant}
                        </div>
                        <div className="about__main-text">
                            <ul className="about__list">
                                <li>
                                    <p className="about__text">
                                        Год основания:{" "}
                                        <span className="about__span-accent">
                                            2020г.
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <p className="about__text">
                                        Форма осуществления деятельности:{" "}
                                        <span className="about__span-accent">
                                            Объединение дополнительного
                                            образования
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <p className="about__text">
                                        Возрастной состав участников школьного
                                        театра:{" "}
                                        <span className="about__span-accent">
                                            1-4 класс
                                        </span>
                                    </p>
                                </li>
                            </ul>
                            <div className="about__description-block">
                                <ShowMore>
                                    <p>
                                        Теа́тр (греч. θέατρον — основное значение
                                        — место для зрелищ, затем — зрелище, от
                                        θεάομαι — смотреть, видеть) — зрелищный
                                        вид искусства, представляющий собой
                                        синтез различных искусств: литературы,
                                        музыки, хореографии, вокала,
                                        изобразительного искусства и обладающий
                                        собственной спецификой: отражение
                                        действительности, конфликтов,
                                        характеров, а также их трактовка и
                                        оценка, утверждение тех или иных идей
                                        здесь происходит посредством
                                        драматического действия, главным
                                        носителем которого является актёр
                                    </p>
                                    <p>
                                        Родовое понятие «театр» включает в себя
                                        различные его виды и формы:
                                        драматический театр, оперный, балетный,
                                        кукольный, театр пантомимы и др.
                                    </p>
                                    <p>
                                        На прошлой неделе в школе прошел
                                        школьный конкурс «Театральные
                                        подмостки». В нем приняли участие все
                                        классы. Было представлено 6 постановок.
                                        Жюри под председательством директора
                                        школы Суханкиной О.А., проанализировав
                                    </p>
                                    <h3>Обращение режиссера:</h3>
                                    <p>
                                        Уважаемые зрители! Убедительная просьба
                                        соблюдать меры безопасности, оставаться
                                        в масках и сохранять социальную
                                        дистанцию во время спектакля, а также
                                        всего времени пребывания в театре. После
                                        третьего звонка любые перемещения по
                                        залу категорически запрещены. Своими
                                        действиями Вы мешаете артистам, а также
                                        другим зрителям. В случае нарушений мы
                                        будем вынуждены остановить спектакль.
                                        Дорогие зрители! Надеемся на ваше
                                        понимание и самодисциплину. Берегите
                                        себя и своих близких.
                                    </p>
                                </ShowMore>
                            </div>
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
                    <ImageGallery
                        title="Фото театра"
                        items={photo}
                    />
                </section>
                <section className="public-content__section">
                    <ImageGallery
                        title="Фото посещения театра"
                        items={photoVisit}
                    />
                </section>
                <section className="public-content__section">
                    <article className="public-content__wrap video">
                        <h2 className="section-title">Видео</h2>
                        <VideoSlider
                            items={[
                                {
                                    url: "https://www.youtube.com/watch?v=FihWD9OKn-g",
                                },
                                {
                                    url: "https://www.youtube.com/watch?v=CMfF_2LkvI0&list=PLgFdtTm2TM3OsAJ2FdE_B87-y-G6tYoQP",
                                },
                            ]}
                        />
                    </article>
                </section>
                <section className="public-content__section public-content__section_bg_light-grey contact">
                    <article className="public-content__wrap contact">
                        <h2 className="section-title">Контакты</h2>
                        <div className="contact__map">
                            <YMaps>
                                <Map
                                    state={{
                                        center: [55.760178, 37.618574],
                                        zoom: 14,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Placemark
                                        geometry={[55.760178, 37.618574]}
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
                                            href="https://t.me/bolshoi_theatre"
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {SocialIcons.t}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social__link"
                                            href="https://vk.com/bolshoitheatre"
                                            target={"_blank"}
                                            rel="noopener nofollow noreferer"
                                        >
                                            {SocialIcons.vk}
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

    console.log(theatre);
    console.log(schoolStore.school);

    return (
        <>
            <section className="public-content__section">
                <article className="public-content__wrap about">
                    <h1 className="section-title">{theatre.title}</h1>
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
                                        {moment(theatre.foundation_date).format('YYYY')} г.
                                    </span>
                                </p>
                            </li>
                            <li>
                                <p className="about__text">
                                    Форма осуществления деятельности:{" "}
                                    <span className="about__span-accent">
                                        {
                                            theatre.form_activity.map(item => item.activity).join(", ")
                                        }
                                    </span>
                                </p>
                            </li>
                            <li>
                                <p className="about__text">
                                    Возрастной состав участников школьного
                                    театра:{" "}
                                    <span className="about__span-accent">
                                        {
                                            theatre.age_members.map(item => item.age).join(", ")
                                        }
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div className="about__description-block">
                            {
                                (theatre.short_description || theatre.director_message)
                                &&
                                <ShowMore>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                theatre.short_description
                                            ),
                                        }}
                                    />
                                    {
                                        theatre.director_message
                                        &&
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
                                    }
                                </ShowMore>
                            }
                        </div>
                    </div>
                </article>
            </section>
            {
                theatre.teachers && theatre.teachers.length > 0
                &&
                <section className="public-content__section public-content__section_bg_light-grey">
                    <article className="public-content__wrap teachers">
                        <h2 className="section-title">Педагоги</h2>
                        <ul className="teachers__card-deck">
                            {
                                theatre.teachers.map(item => {

                                    let teacher =
                                        teachersStore.teachers.find(
                                            (teacherInStore) =>
                                                item.ID ===
                                                teacherInStore.ID
                                        );

                                    return (
                                        <li
                                            key={item.fio}
                                            className="teachers__card"
                                        >
                                            <img
                                                className="teachers__img"
                                                src={teacher?.photo ? window.global.baseUrl + teacher.photo : no_photo_man}
                                                alt={item.fio}
                                            />
                                            <h3 className="teachers__title">
                                                <span className="teachers__span-accent">
                                                    {teacher?.f}
                                                </span>
                                                {teacher?.i}{" "}
                                                {teacher?.o}
                                            </h3>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </article>
                </section>
            }
            {
                theatre.photo && theatre.photo.length > 0
                &&
                <section className="public-content__section">
                    <ImageGallery
                        title="Фото театра"
                        items={theatre.photo}
                    />
                </section>
            }
            {
                theatre.photoVisit && theatre.photoVisit.length > 0
                &&
                <section className="public-content__section">
                    <ImageGallery
                        title="Фото посещения театра"
                        items={theatre.photoVisit}
                    />
                </section>
            }
            {
                theatre.video_business_card && theatre.video_business_card !== ""
                &&
                <section className="public-content__section">
                    <article className="public-content__wrap video">
                        <h2 className="section-title">ВИДЕО ВИЗИТКА</h2>
                        <VideoSlider
                            items={[
                                {
                                    url: theatre.video_business_card,
                                },
                            ]}
                        />
                    </article>
                </section>
            }
            {
                theatre.video && theatre.video.length > 0
                &&
                <section className="public-content__section">
                    <article className="public-content__wrap video">
                        <h2 className="section-title">ВИДЕО ЛУЧШИХ ФРАГМЕНТОВ</h2>
                        <VideoSlider
                            thumbs={true}
                            items={theatre.video.map(item => { return {url: item} })}
                        />
                    </article>
                </section>
            }
            <section className="public-content__section public-content__section_bg_light-grey contact">
                <article className="public-content__wrap contact">
                    <h2 className="section-title">Контакты</h2>
                    <div className="contact__map">
                        <YMaps>
                            <Map
                                state={{
                                    center: [theatre.coordinates.split(',')[0].trim(), theatre.coordinates.split(',')[1].trim()],
                                    zoom: 14,
                                }}
                                width="100%"
                                height="100%"
                            >
                                <Placemark
                                    geometry={[theatre.coordinates.split(',')[0].trim(), theatre.coordinates.split(',')[1].trim()]}
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
                            <h3 className="section-subtitle contact__title">
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
                        {
                            theatre.social_links && theatre.social_links.length > 0
                            &&
                            <div className="social">
                                <p className="social__label">Наши соцсети:</p>
                                <ul className="social__list">
                                    {
                                        theatre.social_links.map(item => (
                                            <li>
                                                <a
                                                    className="social__link"
                                                    href={item}
                                                    target={"_blank"}
                                                    rel="noopener nofollow noreferer"
                                                >
                                                    {window.global.getSocialIcon(item)}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
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
