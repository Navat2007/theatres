import React from "react";
import { NavLink } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import BannerSlider from "../../components/slider/banner.slider.component";

import commonStyles from "./common.module.scss";

const MainPage = () => {
    const peoples = [
        {
            name: "Евгений Владимирович Князев",
            position:
                "Народный артист РФ, ректор Театрального института имени Бориса Щукина.",
            url: "./images/people/Evgeny Vladimirovich Knyazev.jpg",
            qoute: "Сегодня школьные театры кружки и студии - это необходимость. Для детей и старших, и младших - это самый лёгкий и интересный способ соприкосновения с классической литературой. Кроме того, занятия театром, который вбирает в себя практически все виды искусства, способствуют всестороннему развитию личности ребёнка.",
        },
        {
            name: "Юрий Иванович Ерёмин",
            position:
                "Заслуженный деятель искусств РСФСР, Народный артист РСФСР, режиссёр театра им. Моссовета",
            url: "./images/people/Yuri Ivanovich Eremin.jpg",
            qoute: "С огромным удовольствием поддерживаю инициативу создания «Содружества школьных театров». Возможность участия в постановках раскрывает личность учащихся и формирует лидерские качества, которые пригодятся в любой профессии. Наша страна гордится именами великих педагогов: Выготского, Макаренко, Вышинского. Я от всей души желаю вам с достоинством продолжать дело этих великих людей.",
        },
        {
            name: "Латышев Ян Константинович",
            position: "Актёр театра Романа Виктюка",
            url: "./images/people/Latyshev Yan Konstantinovich.jpg",
            qoute: "Школьный театр - колоссальный ускоритель развития ребёнка. Через игру с невероятной скоростью осваиваются новые знания, модели поведения, способы реагирования на различные ситуации. Школьный театр - прекрасный инструмент социализации, он развивает чувство эмпатии, ребёнок становится более сенситивным, но при этом учится управлять своими эмоциями. Я могу долго перечислять все достоинства школьного театра и что он делает для детей, но красноречивей об этом расскажет моя биография. Я благодарен школьному театральному кружку.",
        },
        {
            name: "Портнягин Алексей",
            position:
                "преподаватель импровизации, сценической речи, актерского мастерства и пластики, режиссер по пластике",
            url: "./images/people/Alexey Portnyagin.jpg",
            qoute: "Я думаю, что на профессиональный театр в немалой степени влияет театр школьный, в котором воспитываются не столько будущие актеры, а умные, чуткие и мыслящие зрители. Очень здорово, что появилось «Содружество школьных театров» и театр школьников получил возможность вырасти как в культурном, так и в художественном смысле. Есть основание полагать, что в будущем, школьный театр сможет повлиять на общий уровень культуры в обществе.",
        },
        {
            name: "Юрий Ляхов",
            position: "Актер театра и кино, режиссер драматического театра.",
            url: "./images/people/Yuri Lyakhov.jpg",
            qoute: "Как сказал Николай Васильевич Гоголь «Театр - это такая кафедра, с которой можно много сказать миру добра». Но, порой, люди туда приходят уже слишком поздно или вовсе не появляются. Театр крайне необходим, как еще одна форма образования для молодого поколения, с которой можно разговаривать не только рационально, но и эмоционально. Создание содружества школьных театров позволит поднять уровень коллективов и наладит коммуникацию между школьными театрами. А это точно принесёт свои творческие плоды.",
        },
        {
            name: "Ганькина Кристина",
            position:
                "Режиссер, мастер актерско-речевого курса, педагог по актерскому мастерству и сценической речи АТО-театр.",
            url: "./images/people/Gankina Kristina.jpg",
            qoute: "В школьные годы я училась в политехническом лицее, и у нас были разные лаборатории: биологии, информатики, математики, дизайна, а вот театра не было. И, когда однажды к нам приехали профессиональные артисты ставить небольшой спектакль по случаю юбилея, случился волшебный праздник, после которого мы начали придумывать свои спектакли, бесконечно что-то создавать и интересоваться другими творческими коллективами. В этом и есть, на мой взгляд, настоящее значение школьного театра, развитию которого способствует содружество  - создавать атмосферу творчества, доверия и немного волшебства!",
        },
        {
            name: "Михаил Лукин",
            position: "Артист театра и кино, режиссер драматического театра",
            url: "./images/people/Mikhail Lukin.jpg",
            qoute: "Однажды мой знакомый рассказал такую историю: «В нашем городе люди добрые, а в соседнем злые - говорит он. Почему? - спросил я. А потому что в нашем городе есть театр, а в соседнем его нет - ответил он». И я с ним полностью согласен. А представьте, если в каждой школе будет театр, который воспитает своих актёров и зрителей, значит и добра будет больше. А если эти театры сольются в Содружество школьных театров, то это будет союз единомышленников. И не важно любительский это театр, самодеятельный или профессиональный - любой театр держится на живом общении. На занятиях в театральной студии можно получить комплекс актёрских знаний, владения собой и своим телом, голосом, умение двигаться на сцене, видеть, слышать, а самое главное - возможность познать СЕБЯ.",
        },
        {
            name: "Александр Львович Семчев",
            position: "Заслуженный артист РФ, Актер МХТ им. Чехова",
            url: "./images/people/Alexander Lvovich Semchev.jpg",
            qoute: "В современном мире, где все большее значение имеют цифровые технологии, дающие возможность дистанционной работы и дистанционного общения, все большее значение имеет возможность общения живого. Именно поэтому театральное искусство становится особенно востребованным. Несомненно, что дети, прошедшие через Школьный театр  становятся в первую очередь умными и внимательными зрителями. Поэтому считаю, создание «Содружества Школьных театров» в Москве не только актуальной, но и важнейшей культурной и образовательной инициативой. Желаю «Содружеству» творческих успехов и максимального вовлечения в его работу московских школьников",
        },
        {
            name: "Несвячёная Ксения",
            position:
                "Актриса театра, педагог актерского мастерства, режиссер-постановщик. ",
            url: "./images/people/Unholy Xenia.jpg",
            qoute: "Особую ступень в развитие человеческой личности всегда будет занимать искусство. Но наиболее ценно, когда это искусство возможно создавать самому. Школьные театры дают такую возможность для ребят всех возрастов. «Содружество школьных театров» - это, прежде всего, собрание особенных людей, объединённых общей идеей и стремлением к познанию.",
        },
    ];
    return (
        <>
            <BannerSlider
                transitionTime={1000}
                autoPlay={true}
                swipe={false}
                showArrows={false}
                items={[
                    {
                        url: "./images/banners/banner_1.jpg",
                    },
                    {
                        url: "./images/banners/banner_2.jpg",
                    },
                    {
                        url: "./images/banners/banner_3.jpg",
                    },
                ]}
            />
            <section className={commonStyles.section}>
                <div
                    className={[
                        commonStyles.wrap,
                        commonStyles.twoColumns,
                    ].join(" ")}
                >
                    <article className={commonStyles.concord}>
                        <h1 className={commonStyles.title}>О Содружестве</h1>
                        <div className={commonStyles.concordMainText}>
                            <img
                                className={commonStyles.concordImg}
                                src="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                                alt="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                            />
                            <p>
                                <b>Дорогие друзья!</b> <br />
                                Мы рады приветствовать вас на портале
                                «Содружество школьных театров города Москвы».
                            </p>
                            <p>
                                Здесь вы можете познакомиться с деятельностью
                                детских и молодежных театров на базе
                                образовательных организаций города Москвы, стать
                                участником или зрителем открытых показов в
                                рамках ежегодного фестиваля-конкурса «Живая
                                сцена» и узнать о проектах Содружества.
                            </p>
                        </div>
                        <NavLink
                            to={"/concord/"}
                            className={commonStyles.linkButton}
                        >
                            Подробнее
                        </NavLink>
                    </article>
                    <aside className={commonStyles.news}>
                        <h2 className={commonStyles.title}>Новости</h2>
                        <ul className={commonStyles.newsList}>
                            <li>
                                <img
                                    className={commonStyles.newImg}
                                    src="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                                    alt="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                                />
                                <p className={commonStyles.newDate}>
                                    15.11.2022г.
                                </p>
                                <h3 className={commonStyles.newTitle}>
                                    Название новости
                                </h3>
                                <p className={commonStyles.newPharagraph}>
                                    На прошлой неделе в школе прошел школьный
                                    конкурс «Театральные подмостки». В нем
                                    приняли участие многие ученики нашей
                                    огромной
                                </p>
                            </li>
                        </ul>
                        <NavLink
                            to={"/news/"}
                            className={commonStyles.linkButton}
                        >
                            Все новости
                        </NavLink>
                    </aside>
                </div>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article
                    className={[
                        commonStyles.wrap,
                        commonStyles.performances,
                    ].join(" ")}
                >
                    <h2 className={commonStyles.title}>Спектакли</h2>
                    <iframe
                        seamless={true}
                        title={"Спектакли"}
                        width={"100%"}
                        height={400}
                        style={{ border: 0 }}
                        //src={"https://patriotsport.moscow/premery-spektaklej/"}
                        src={"https://razgovor.moscow/test.html"}
                    />
                    {/*<ul className={commonStyles.performancesList}>*/}
                    {/*    <li>*/}
                    {/*        <Link className={commonStyles.performance}>*/}
                    {/*            <div*/}
                    {/*                className={commonStyles.performanceImgBlock}*/}
                    {/*            >*/}
                    {/*                <img*/}
                    {/*                    className={commonStyles.performanceImg}*/}
                    {/*                    src="https://avatars.mds.yandex.net/i?id=2a0000017a0e866a0be68b7925e87b4967e7-4580514-images-thumbs&n=13&exp=1"*/}
                    {/*                    alt="Грех да беда на кого не живет"*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={commonStyles.performanceInfo}>*/}
                    {/*                <h3*/}
                    {/*                    className={*/}
                    {/*                        commonStyles.performanceTitle*/}
                    {/*                    }*/}
                    {/*                >*/}
                    {/*                    Грех да беда на кого не живет*/}
                    {/*                </h3>*/}
                    {/*                <ul*/}
                    {/*                    className={commonStyles.performanceList}*/}
                    {/*                >*/}
                    {/*                    <li>*/}
                    {/*                        <p*/}
                    {/*                            className={*/}
                    {/*                                commonStyles.performancePharagraph*/}
                    {/*                            }*/}
                    {/*                        >*/}
                    {/*                            Автор:{" "}*/}
                    {/*                            <span*/}
                    {/*                                className={*/}
                    {/*                                    commonStyles.performanceSpanAccent*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                А.Н.Островский*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <p*/}
                    {/*                            className={*/}
                    {/*                                commonStyles.performancePharagraph*/}
                    {/*                            }*/}
                    {/*                        >*/}
                    {/*                            Жанр:{" "}*/}
                    {/*                            <span*/}
                    {/*                                className={*/}
                    {/*                                    commonStyles.performanceSpanAccent*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                Драма*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <p*/}
                    {/*                            className={*/}
                    {/*                                commonStyles.performancePharagraph*/}
                    {/*                            }*/}
                    {/*                        >*/}
                    {/*                            Ближайший спектакль:{" "}*/}
                    {/*                            <span*/}
                    {/*                                className={*/}
                    {/*                                    commonStyles.performanceSpanAccent*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                23 декабря*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <p*/}
                    {/*                            className={*/}
                    {/*                                commonStyles.performancePharagraph*/}
                    {/*                            }*/}
                    {/*                        >*/}
                    {/*                            Место проведения:{" "}*/}
                    {/*                            <span*/}
                    {/*                                className={*/}
                    {/*                                    commonStyles.performanceSpanAccent*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                ГБУ ГШИ №1256*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    {/*<Link className={commonStyles.linkButton}>*/}
                    {/*    Все спектакли*/}
                    {/*</Link>*/}
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Друзья содружества</h2>
                    <Splide
                        className="my-splide"
                        options={{
                            type: "loop",
                            arrows: false,
                            perPage: 1,
                            perMove: 1,
                            gap: "1.5em",
                            padding: ".75em",
                            rewind: true,
                            autoplay: true,
                            mediaQuery: "min",
                            breakpoints: {
                                1200: {
                                    perPage: 2,
                                    focus: "center",
                                    arrows: true,
                                    padding: "0",
                                    gap: ".675em",
                                },
                            },
                        }}
                    >
                        {peoples.map((item, index) => (
                            <SplideSlide
                                data-splide-interval="5000"
                                key={index}
                            >
                                <div className={commonStyles.qoute}>
                                    <img
                                        className={commonStyles.qouteImg}
                                        src={item.url}
                                        alt={item.name}
                                    />
                                    <h3 className={commonStyles.qouteTitle}>
                                        {item.name}
                                        <span
                                            className={
                                                commonStyles.qouteTitleSpan
                                            }
                                        >
                                            {item.position}
                                        </span>
                                    </h3>
                                    <blockquote
                                        className={commonStyles.qouteText}
                                    >
                                        {item.qoute}
                                    </blockquote>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </article>
            </section>
        </>
    );
};

export default MainPage;
