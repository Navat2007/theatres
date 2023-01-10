import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import styles from "./spectacles.module.scss";
import commonStyles from "../common.module.scss";
import Button from "../../../components/button/button.component";
import FieldInputComponent from "../../../components/field/field.input.component";
import { AdminIcons } from "../../../components/svgs.js";

const SpectaclesPage = () => {
    const spectacles = [
        {
            title: "Горе от ума",
            school: "Школа 15/18",
            ageRange: "0+",
            date: "01.02.2023г.",
            src: "https://jooinn.com/images/melbourne039s-day-5.jpg",
        },
        {
            title: "Горе от ума",
            school: "Школа 15/18",
            ageRange: "0+",
            date: "01.02.2023г.",
            src: "https://jooinn.com/images/melbourne039s-day-5.jpg",
        },
        {
            title: "Горе от ума",
            school: "Школа 15/18",
            ageRange: "0+",
            date: "01.02.2023г.",
            src: "https://jooinn.com/images/melbourne039s-day-5.jpg",
        },
    ];
    return (
        <>
            <section
                className={[commonStyles.wrap, commonStyles.bubbleCard].join(
                    " "
                )}
            >
                <h2
                    className={[commonStyles.title, styles.pageTitle].join(" ")}
                >
                    репертуар школьных театров
                </h2>
                <FieldInputComponent
                    placeholder={"Спектакли, школы.."}
                    type={"search"}
                    extraClass={styles.search}
                />
                <Splide
                    className="my-splide my-splide_arrow_line my-splide_spectacles"
                    options={{
                        type: "loop",
                        arrows: false,
                        perPage: 1,
                        perMove: 1,
                        gap: "2.5em",
                        rewind: true,
                        updateOnMove: true,
                        pauseOnHover: true,
                        autoplay: true,
                        mediaQuery: "min",
                        arrowPath:
                            "M9.5 38l-1.6-2 20.3-16.7L8 4l1.4-2 22.7 17.1L9.5 38z",
                        breakpoints: {
                            768: {
                                perPage: 1.3,
                                arrows: true,
                            },
                            1200: {
                                perPage: 1.5,
                                arrows: true,
                            },
                        },
                    }}
                >
                    {spectacles.map((item, index) => (
                        <SplideSlide
                            data-splide-interval="5000"
                            key={index}
                        >
                            <div className={styles.card}>
                                <img
                                    className={styles.image}
                                    src={item.src}
                                    alt={item.title}
                                />
                                <p className={styles.ageRange}>
                                    Спектакль <br />
                                    {item.ageRange}
                                </p>
                                <div className={styles.cardFooter}>
                                    <h3 className={styles.title}>
                                        {item.title}
                                    </h3>
                                    <ul className={styles.list}>
                                        <li className={styles.item}>
                                            {item.school}
                                        </li>
                                        <li className={styles.item}>
                                            {item.date}
                                        </li>
                                    </ul>
                                    <Button
                                        extraClass={styles.button}
                                        type="button"
                                        text="Билеты"
                                    />
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </section>
            <section
                className={[commonStyles.wrap, commonStyles.bubbleCard].join(
                    " "
                )}
            >
                <h2
                    className={[commonStyles.title, styles.pageTitle].join(" ")}
                >
                    топ спектаклей
                    <span className={styles.titleIcon}>
                        {AdminIcons.arrow_right_thin}
                    </span>
                </h2>
                <ul className={styles.topList}>
                    {spectacles.map((item, index) => (
                        <li
                            className={[styles.card, styles.card_type_top].join(
                                " "
                            )}
                        >
                            <img
                                className={styles.image}
                                src={item.src}
                                alt={item.title}
                            />
                            <p className={styles.ageRange}>
                                Спектакль <br />
                                {item.ageRange}
                            </p>
                            <h3 className={styles.title}>{item.title}</h3>
                            <ul className={styles.list}>
                                <li className={styles.item}>{item.school}</li>
                                <li className={styles.item}>{item.date}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default SpectaclesPage;
