import React from "react";
import commonStyles from "../common.module.scss";
import styles from "./concord.module.scss";

import blockquote_6 from '../../../images/concord/blockquote_1.png';

const ConcordPage = () => {
    return (
        <>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h1 className={commonStyles.title}>О Содружестве</h1>
                    <div className={styles.item}>
                        <img
                            className={styles.img}
                            src={blockquote_6}
                            alt="Александр Сергеевич Пушкин, нарисован карандашом"
                        />
                        <p className={styles.pharagraph}>
                            «Содружество школьных театров Москвы» — это
                            объединение детских и молодежных театров, созданных
                            на базе образовательных организаций,
                            подведомственных Департаменту образования и науки
                            города Москвы
                        </p>
                    </div>
                </article>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>
                        Участники Содружества
                    </h2>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>
                        Как театру стать участником Содружества
                    </h2>
                </article>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Что для нас важно</h2>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>
                        О терминах и определениях
                    </h2>
                </article>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>
                        Ваши пожелания, предложения и вопросы
                    </h2>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>
                        Клуб руководителей школьных театров
                    </h2>
                    <ul className={styles.list}>
                        <li>
                            <h3 className={styles.caption}>О клубе</h3>
                            <p className={styles.pharagraph}>
                                Городской клуб руководителей школьных театров
                                создан в рамках реализации проекта «Школьный
                                театр» с целью расширения возможностей педагогов
                                московских школ получить специальные театральные
                                знания и практические навыки для
                                профессиональной педагогической работы,
                                связанной с различными формами и жанрами
                                сценических искусств. А также для адаптации
                                театральных методик и технологий к условиям
                                общеобразовательной школы и освоения их
                                школьными учителями.
                            </p>
                        </li>
                        <li>
                            <h3 className={styles.caption}>Задачи клуба</h3>
                            <p className={styles.pharagraph}>
                                Формирование профессионального сообщества, где
                                можно не только поделиться собственным опытом,
                                но и получить профессиональную, организационную
                                и творческую поддержку от коллег.
                            </p>
                            <p className={styles.pharagraph}>
                                Обучение профессиональным театральным методикам
                                и технологиям, тех педагогов, которые осознают в
                                этом потребность. Получение информации о
                                городских и федеральных программах и ресурсах,
                                связанных с воспитательной работой школ в
                                области театральной педагогики.
                            </p>
                        </li>
                        <li>
                            <h3 className={styles.caption}>Участники клуба</h3>
                            <p className={styles.pharagraph}>
                                К участию в работе Клуба приглашаются педагоги
                                дополнительного образования, педагоги —
                                организаторы и руководители школьных театральных
                                студий, кружков и творческих проектов,
                                использующие в педагогической работе различные
                                формы театрализации. 
                            </p>
                        </li>
                        <li>
                            <h3 className={styles.caption}>Программа клуба</h3>
                            <p className={styles.pharagraph}>
                                В рамках работы Клуба проводятся
                                мастер-классы, встречи с
                                деятелями культуры, актерами, режиссерами.
                                Посещаются сценические площадки московских
                                театров. Члены клуба имеют возможность принять
                                участие в выездных мастер-классах,
                                организованных в рамках деятельности Клуба.
                            </p>
                        </li>
                        <li>
                            <h3 className={styles.caption}>Тематика встреч:</h3>
                            <ol className={styles.listText}>
                                <li>
                                    Театральное искусство и
                                    учебно-воспитательные задачи школы
                                </li>
                                <li>
                                    Формирование и эффективное использование в
                                    педагогической работе Театрального
                                    Образовательного Пространства школ
                                </li>
                                <li>
                                    Особенности театрализации в школе и основы
                                    режиссуры 
                                </li>
                                <li>
                                    Выбор репертуара школьного театра и
                                    действенный анализ текста
                                </li>
                                <li>
                                    Что такое актерское мастерство и как ему
                                    обучать школьников
                                </li>
                                <li>
                                    Музыкальное оформление сценического
                                    действия 
                                </li>
                                <li>
                                    Проведение и организация занятий
                                    сценического движения в школе
                                </li>
                                <li>
                                    Костюм, бутафория и реквизит силами
                                    ресурсами школы
                                </li>
                                <li>
                                    Опыт публичного выступления и сценическая
                                    речь, как универсальный учебный навык
                                </li>
                                <li>
                                    Главные правила и реальные возможности
                                    художественного оформления сценического
                                    действия силами школы
                                </li>
                                <li>
                                    Световая партитура и ее возможности в
                                    условиях школьных помещений
                                </li>
                                <li>
                                    Художественная целостность любого
                                    сценического действия
                                </li>
                            </ol>
                            <p className={styles.pharagraph}></p>
                        </li>
                        <li>
                            <h3 className={styles.caption}>
                                Организация встреч клуба:
                            </h3>
                            <ul className={styles.listText}>
                                <li>Встречи Клуба проходят два раза в месяц</li>
                                <li>
                                    Расписание встреч и темы анонсируются
                                    заранее и сразу открывается регистрация.
                                </li>
                                <li>
                                    Если Вы хотите заявить себя, как спикера, то
                                    это можно сделать по согласованию с
                                    руководителем клуба Злотниковым Вадимом
                                    Семеновичем. Для этого отправьте письмо на
                                    нашу почту:{" "}
                                    <a
                                        className="link"
                                        rel="nofollow noopener"
                                        href="mailto:sodruzhestvo@edu.mos.ru"
                                    >
                                        sodruzhestvo@edu.mos.ru
                                    </a>
                                </li>
                                <li>
                                    Количество участников мастерской может быть
                                    ограниченно только возможностями помещения,
                                    в котором проходят очные встречи. Если
                                    работа ведется офлайн, то количество
                                    участников не ограниченно.
                                </li>
                            </ul>
                        </li>
                        <p className={styles.pharagraph}>
                            (ДЛЯ ТЕХ, КТО ВОШЕЛ ПОД ЛОГИНОМ И ПАРОЛЕМ ДАЛЕЕ
                            ДОСТУП НА ЗАПИТЬ. ОНА У НАС ЕСТЬ НА{" "}
                            <a
                                className="link"
                                rel="noopener noopener"
                                href="https://patriotsport.moscow/shkolnyj-teatr/"
                                target="_blank"
                            >
                                СТРАНИЦЕ МЦПС
                            </a>
                            )
                        </p>
                    </ul>
                </article>
            </section>
        </>
    );
};

export default ConcordPage;
