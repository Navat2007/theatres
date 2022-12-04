import React from "react";
import { Link } from "react-router-dom";
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
                        <Link className={commonStyles.linkButton}>
                            Подробнее
                        </Link>
                    </article>
                    <asside className={commonStyles.news}>
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
                        <Link className={commonStyles.linkButton}>
                            Все новости
                        </Link>
                    </asside>
                </div>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Спектакли</h2>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Друзья содружества</h2>
                </article>
            </section>
        </>
    );
};

export default MainPage;
