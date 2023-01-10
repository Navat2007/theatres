import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import commonStyles from "../common.module.scss";
import styles from "./spectacle.module.scss";

import { EventIcons } from "../../../components/svgs.js";

const SpectaclePage = () => {
    const photos = [
        {
            src: "https://proprikol.ru/wp-content/uploads/2020/12/snezhnye-barsy-krasivye-kartinki-10.jpg",
        },
        {
            src: "https://static.my-shop.ru/product/3/435/4349040.jpg",
        },
        {
            src: "https://proprikol.ru/wp-content/uploads/2020/12/snezhnye-barsy-krasivye-kartinki-10.jpg",
        },
        {
            src: "https://static.my-shop.ru/product/3/435/4349040.jpg",
        },
    ];

    return (
        <section
            className={[commonStyles.wrap, commonStyles.bubbleCard].join(" ")}
        >
            <h2
                className={[
                    commonStyles.title,
                    commonStyles.title_underline,
                ].join(" ")}
            >
                горе от ума
            </h2>

            <div className={styles.columns}>
                <div
                    className={[styles.column, styles.columnDescription].join(
                        " "
                    )}
                >
                    <div>
                        <h3 className={styles.title}>
                            О событии
                            <span className={styles.titleAccent}>156 мин.</span>
                        </h3>
                        <ul className={styles.list}>
                            <li>
                                Автор:{" "}
                                <span className={styles.listAccent}>
                                    Александр Александров
                                </span>
                            </li>
                            <li>
                                Жанр:{" "}
                                <span className={styles.listAccent}>
                                    комедия
                                </span>
                            </li>
                        </ul>
                        <div className={styles.description}>
                            <p>
                                Дебютная постановка на моссоветовской сцене
                                ведущего актера труппы Александра Яцко, имеющего
                                за плечами режиссерский опыт. Спектакль дает
                                «свежий» взгляд на знакомое со школьной скамьи
                                произведение, оставаясь при этом верным духу
                                великой комедии. Александр Яцко убежден, что
                                «Горе от ума» — лучшая пьеса из когда-либо
                                написанных на русском языке.
                            </p>
                            <p>
                                Хрестоматийных героев он сделал живыми
                                современными людьми, чьи мысли и поступки близки
                                и понятны сидящим в зале. Камерная атмосфера
                                сцены «Под крышей» позволяет подробно и
                                по-новому всмотреться в лица грибоедовских
                                персонажей, понять логику и мотивы их поведения,
                                а стильная лапидарная сценография, автором
                                которой выступил сам постановщик спектакля,
                                придает действию комедии изысканную красоту.
                            </p>
                            <p>
                                Александр Яцко не сделал ни одной купюры в
                                тексте пьесы, обогатив действие своей постановки
                                двумя вальсами Грибоедова в «живом» исполнении
                                актеров-участников спектакля. Особую атмосферу
                                действию придают виртуозные импровизации
                                пианиста Евгения Борца, звучащие в записи.
                            </p>
                        </div>
                        <ul className={styles.list}>
                            <li>
                                Школьный театр:{" "}
                                <span className={styles.listAccent}>
                                    Школа 15/18
                                </span>
                            </li>
                            <li>
                                Педагоги:{" "}
                                <span className={styles.listAccent}>
                                    Анастасия Ященко <br /> Александр
                                    Александров <br /> Алексей Иванов
                                </span>
                            </li>
                            <li>
                                Возрастной состав:{" "}
                                <span className={styles.listAccent}>
                                    10-11 класс
                                </span>
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.tiketList}>
                        <li
                            className={[
                                styles.tiketItem,
                                styles.tiketItemDisabled,
                            ].join(" ")}
                        >
                            <p className={styles.tiketStatus}>Билетов нет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                        <li className={styles.tiketItem}>
                            <p className={styles.tiketStatus}>заказать билет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                        <li
                            className={[
                                styles.tiketItem,
                                styles.tiketItemDisabled,
                            ].join(" ")}
                        >
                            <p className={styles.tiketStatus}>Билетов нет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                        <li className={styles.tiketItem}>
                            <p className={styles.tiketStatus}>заказать билет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                        <li
                            className={[
                                styles.tiketItem,
                                styles.tiketItemDisabled,
                            ].join(" ")}
                        >
                            <p className={styles.tiketStatus}>Билетов нет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                        <li className={styles.tiketItem}>
                            <p className={styles.tiketStatus}>заказать билет</p>
                            <p className={styles.tiketDate}>
                                12 ферваля <br />
                                10:00
                            </p>
                        </li>
                    </ul>
                </div>
                <div
                    className={[styles.column, styles.columnPosters].join(" ")}
                >
                    <h3 className={styles.caption}>
                        Афиша/программка
                        <span className={styles.eventIcon}>
                            {EventIcons.supportive_waist}
                        </span>
                    </h3>
                    <Splide
                        className="my-splide my-splide_border-radius-sm"
                        options={{
                            type: "loop",
                            arrows: false,
                            perPage: 1,
                            perMove: 1,
                            gap: "1.25em",
                            rewind: true,
                            pauseOnHover: true,
                            autoplay: true,
                            mediaQuery: "min",
                        }}
                    >
                        {photos.map((item, index) => (
                            <SplideSlide
                                data-splide-interval="5000"
                                key={index}
                            >
                                <img
                                    className={styles.poster}
                                    src={item.src}
                                    alt={item.src}
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            </div>
            <h3 className={styles.title}>
                Фотографии
                <span className={styles.eventIcon}>
                    {EventIcons.supportive_waist}
                </span>
            </h3>
            <Splide
                className="my-splide my-splide_border-radius-sm"
                options={{
                    type: "loop",
                    arrows: false,
                    perPage: 1,
                    perMove: 1,
                    cover: true,
                    height: "12.5em",
                    gap: "1.25em",
                    rewind: true,
                    pauseOnHover: true,
                    autoplay: true,
                    mediaQuery: "min",
                    breakpoints: {
                        768: {
                            perPage: 2,
                        },
                        1024: {
                            perPage: 4,
                        },
                    },
                }}
            >
                {photos.map((item, index) => (
                    <SplideSlide
                        data-splide-interval="5000"
                        key={index}
                    >
                        <img
                            src={item.src}
                            alt={item.src}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
};

export default SpectaclePage;
