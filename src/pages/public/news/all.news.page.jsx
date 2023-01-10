import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import styles from "./news.module.scss";
import commonStyles from "../common.module.scss";

const AllNewsPage = () => {
    const news = [
        {
            date: "24.11.2022 г.",
            title: "Клуб руководителей школьных театров – новый проект для столичных педагогов",
            // Описание передать из редактора
            description: `
            В рамках деятельности «Содружество школьных театров
            города Москвы» началась работа Клуба руководителей
            школьных театров. Принять участие во встречах Клуба
            могут педагоги дополнительного образования,
            руководители школьных театральных студий и
            творческих кружков. Участников ждут мастер-классы,
            тренинги, встречи с известными деятелями культуры
            (актерами, сценаристами, режиссерами) и еще много
            интересного.`,
            photos: [
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
            ],
        },
    ];
    return (
        <section className={commonStyles.wrap}>
            <h2 className={commonStyles.title}>Новости</h2>
            <iframe
                seamless={true}
                title={"Новости"}
                width={"100%"}
                height={4600}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/theater-news.html"}
            />
        </section>
    );
    return (
        <section className={commonStyles.wrap}>
            <h2 className={commonStyles.title}>Новости</h2>
            <ul className={styles.list}>
                {news.map((item, index) => (
                    <li className={styles.card}>
                        <p className={styles.date}>{item.date}</p>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.description}>
                            {item.description}
                        </div>
                        <Splide
                            className="my-splide my-splide_border-radius"
                            options={{
                                type: "loop",
                                cover: true,
                                arrows: false,
                                perPage: 1,
                                perMove: 1,
                                gap: "1.5em",
                                rewind: true,
                                autoplay: true,
                                heightRatio: 0.5625,
                            }}
                        >
                            {item.photos.map((item, index) => (
                                <SplideSlide
                                    data-splide-interval="3000"
                                    key={index}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.src}
                                    />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AllNewsPage;
