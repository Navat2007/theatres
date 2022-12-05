import React from "react";
import {Link, NavLink} from "react-router-dom";

import BannerSlider from "../../components/slider/banner.slider.component";

import commonStyles from "./common.module.scss";

const MainPage = () => {
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
                        <img
                            className={commonStyles.concordImg}
                            src="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                            alt="https://kprf.ru/m/900/700/t/img/2016/09/713431_ssi_8962_novyi-razmer.jpg"
                        />
                        <div className={commonStyles.concordMainText}>
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
                        <NavLink to={"/concord/"} className={commonStyles.linkButton}>
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
                        <NavLink to={"/news/"} className={commonStyles.linkButton}>
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
                    <form action=""></form>
                    <ul className={commonStyles.performancesList}>
                        <li>
                            <Link className={commonStyles.performance}>
                                <div
                                    className={commonStyles.performanceImgBlock}
                                >
                                    <img
                                        className={commonStyles.performanceImg}
                                        src="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                        alt="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                    />
                                </div>
                                <div className={commonStyles.performanceInfo}>
                                    <h3
                                        className={
                                            commonStyles.performanceTitle
                                        }
                                    >
                                        Грех да беда на кого не живет
                                    </h3>
                                    <ul
                                        className={commonStyles.performanceList}
                                    >
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Автор:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    А.Н.Островский
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Жанр:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    Драма
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Ближайший спектакль:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    23 декабря
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Место проведения:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    ГБУ ГШИ №1256
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className={commonStyles.performance}>
                                <div
                                    className={commonStyles.performanceImgBlock}
                                >
                                    <img
                                        className={commonStyles.performanceImg}
                                        src="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                        alt="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                    />
                                </div>
                                <div className={commonStyles.performanceInfo}>
                                    <h3
                                        className={
                                            commonStyles.performanceTitle
                                        }
                                    >
                                        Грех да беда на кого не живет
                                    </h3>
                                    <ul
                                        className={commonStyles.performanceList}
                                    >
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Автор:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    А.Н.Островский
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Жанр:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    Драма
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Ближайший спектакль:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    23 декабря
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Место проведения:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    ГБУ ГШИ №1256
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className={commonStyles.performance}>
                                <div
                                    className={commonStyles.performanceImgBlock}
                                >
                                    <img
                                        className={commonStyles.performanceImg}
                                        src="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                        alt="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                    />
                                </div>
                                <div className={commonStyles.performanceInfo}>
                                    <h3
                                        className={
                                            commonStyles.performanceTitle
                                        }
                                    >
                                        Грех да беда на кого не живет
                                    </h3>
                                    <ul
                                        className={commonStyles.performanceList}
                                    >
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Автор:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    А.Н.Островский
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Жанр:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    Драма
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Ближайший спектакль:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    23 декабря
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Место проведения:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    ГБУ ГШИ №1256
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className={commonStyles.performance}>
                                <div
                                    className={commonStyles.performanceImgBlock}
                                >
                                    <img
                                        className={commonStyles.performanceImg}
                                        src="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                        alt="http://html.brelcg.com/wp-content/gallery/chudaki/Банщикова_1.jpeg"
                                    />
                                </div>
                                <div className={commonStyles.performanceInfo}>
                                    <h3
                                        className={
                                            commonStyles.performanceTitle
                                        }
                                    >
                                        Грех да беда на кого не живет
                                    </h3>
                                    <ul
                                        className={commonStyles.performanceList}
                                    >
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Автор:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    А.Н.Островский
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Жанр:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    Драма
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Ближайший спектакль:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    23 декабря
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className={
                                                    commonStyles.performancePharagraph
                                                }
                                            >
                                                Место проведения:{" "}
                                                <span
                                                    className={
                                                        commonStyles.performanceSpanAccent
                                                    }
                                                >
                                                    ГБУ ГШИ №1256
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <Link className={commonStyles.linkButton}>
                        Все спектакли
                    </Link>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Друзья содружества</h2>
                    <div className={commonStyles.qoute}>
                        <img
                            className={commonStyles.qouteImg}
                            src="http://andrey-eltsov.ru/wp-content/uploads/2021/01/yhe382994bh_sh-wago-gh_a7239kkkw_3-6mjh_j-amerikanskaja-kunica-na-sn.jpg"
                            alt="http://andrey-eltsov.ru/wp-content/uploads/2021/01/yhe382994bh_sh-wago-gh_a7239kkkw_3-6mjh_j-amerikanskaja-kunica-na-sn.jpg"
                        />
                        <h3 className={commonStyles.qouteTitle}>Омар Хайям</h3>
                        <blockquote className={commonStyles.qouteText}>
                            Не делай зла-вернется бумерангом, не плюй в
                            колодец-будешь воду пить, не оскорбляй того, кто
                            ниже рангом, а вдруг придётся, что нибудь просить.
                            Не предавай друзей, их не заменишь, и не теряй
                            любимых-не вернешь, не лги себе-со временем
                            проверишь что ложью сам себя ты предаёшь.
                        </blockquote>
                    </div>
                </article>
            </section>
        </>
    );
};

export default MainPage;
