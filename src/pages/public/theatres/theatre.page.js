import React from "react";
import {useParams} from "react-router-dom";
import {YMaps, Map, Placemark} from "react-yandex-maps";

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/admin/schoolsStore";


import {SocialIcons} from "../../../components/svgs.js";
import VideoSlider from "../../../components/slider/video.slider.component";
import ImageSlider from "../../../components/slider/image.slider.component";

function PublicTheatrePage() {

    let {id} = useParams();

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

    const [showDescription, setShowDescription] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            if (id) {
                let tempTheatre = await loadTheatre({id});

                if (tempTheatre) {
                    await schoolStore.loadSchool({id: tempTheatre.schoolID});
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
    {
        return (
            <div className="content__section">
                <p>Загрузка...</p>
            </div>
        );
    }

    if (id === "test") {
        return (
            <>
                <ImageSlider
                    autoPlay={true}
                    swipe={false}
                    showArrows={false}
                    items={[
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Таланты-и-поклонники-1280x854.jpg",
                            title: "Таланты и поклонники",
                            text: "В жизни людей, принимающих на себя различные роли на сцене, постоянно случаются заботы, быт и привычки, от которых просто та избавиться не удается. А тот, кто восхищается талантом, в глубине души только посягает на него и стремиться овладеть теми же навыками."
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Тартюф.jpg",
                            title: "Тартюф",
                            text: "Целью самозванца является завоевание сердца жены хозяина, но вот добиться цели не так просто, как может показаться на первый взгляд. Трудности, с которыми персонажу предстоит столкнуться, сопровождаются настоящими эмоциями и не дают зрителям расслабиться до самого конца."
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Ревизор-1280x854.jpg",
                            title: "Ревизор",
                            text: "Знаменитая комедия Гоголя уже не раз была успешной постановкой в различных театрах, но в 2020 году зрителей ожидает настоящий шедевр. В Ермоловском театре для посетителей будет представлена история без слов."
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Там-же-тогда-же.jpg",
                            title: "Там же, тогда же",
                            text: "Спектакль доносит до зрителей общепризнанные факты: в жизни все меняется, все уходит и исчезает незадолго после появления. Но есть и нечто вечное – персонажи встречаются каждый год в то же время и в том же месте."
                        },
                        {
                            url: "https://цены-и-отзывы.рф/wp-content/uploads/2019/11/Бестолочь-1280x853.jpg",
                            title: "Бестолочь",
                            text: "Она – настоящая недотепа, недалекая деревенская дама без особенностей во внешности и сложного характера. Но супружеская чета даже не считает недостатками проблемы в работе Анны, ведь эта девушка теперь является бесконечным поводом для веселья и семейных шуток."
                        },
                    ]}
                />
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
                                    Теа́тр (греч. θέατρον — основное значение — место для зрелищ, затем — зрелище, от θεάομαι — смотреть, видеть) — зрелищный вид искусства, представляющий собой синтез различных искусств: литературы, музыки, хореографии, вокала, изобразительного искусства и других[1][2][3][4] — и обладающий собственной спецификой: отражение действительности, конфликтов, характеров, а также их трактовка и оценка, утверждение тех или иных идей здесь происходит посредством драматического действия, главным носителем которого является актёр
                                </p>
                                <p>
                                    Родовое понятие «театр» включает в себя различные его виды и формы: драматический театр, оперный, балетный, кукольный, театр пантомимы и др.
                                </p>
                                <p>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем приняли
                                    участие все классы. Было представлено 6
                                    постановок. Жюри под председательством директора
                                    школы Суханкиной О.А., проанализировав
                                </p>
                                {
                                    showDescription
                                    &&
                                    <>
                                        <p>
                                            Уважаемые зрители!

                                            Убедительная просьба соблюдать меры безопасности, оставаться в масках и сохранять социальную дистанцию во время спектакля, а также всего времени пребывания в театре. После третьего звонка любые перемещения по залу категорически запрещены. Своими действиями Вы мешаете артистам, а также другим зрителям. В случае нарушений мы будем вынуждены остановить спектакль.

                                            Дорогие зрители! Надеемся на ваше понимание и самодисциплину. Берегите себя и своих близких.
                                        </p>
                                    </>
                                }
                            </div>
                            {
                                !showDescription
                                &&
                                <button
                                    type="button"
                                    className="about__more-btn"
                                    onClick={() => {setShowDescription(true)}}
                                >
                                    Читать полностью
                                </button>
                            }
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
                        <VideoSlider
                            items={[
                                {url: "https://www.youtube.com/watch?v=FihWD9OKn-g"},
                                {url: "https://www.youtube.com/watch?v=CMfF_2LkvI0&list=PLgFdtTm2TM3OsAJ2FdE_B87-y-G6tYoQP"},
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
                                    state={{center: [55.76, 37.64], zoom: 14}}
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

    if (id && !theatre) {
        return <p>Театр не найден</p>;
    }

    return (
        <>
            {id}
        </>
    );
}

export default PublicTheatrePage;
