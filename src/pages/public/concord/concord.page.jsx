import React from "react";

import useAuthStore from "../../../store/authStore";

import Button from "../../../components/button/button.component";
import FieldInputComponent from "../../../components/field/field.input.component";

import commonStyles from "../common.module.scss";
import styles from "./concord.module.scss";

import pushkin from "../../../images/concord/Pushkin.jpg";
import gogol from "../../../images/concord/Gogol.jpg";
import ford from "../../../images/concord/Ford.jpg";
import stanislavsky from "../../../images/concord/Stanislavsky.jpg";

const ConcordPage = () => {
    const { user } = useAuthStore();
    const ref = React.useRef();

    const [iframeHeight, setIframeHeight] = React.useState("8000px");

    React.useEffect(() => {

    }, []);

    return (
        <section className={commonStyles.wrap}>
            <iframe
                ref={ref}
                seamless={true}
                title={"Содружестве"}
                width={"100%"}
                height={iframeHeight}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/osodruzhestve.html"}
            />
        </section>
    );

    return (
        <>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <ul className={styles.cardDeck}>
                        <li className={styles.cardColumns}>
                            <h1
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                О Содружестве
                            </h1>
                            <figure className={styles.cardFigure}>
                                <figcaption className={styles.cardFigcaption}>
                                    Друзья мои <br /> прекрасен наш союз!
                                </figcaption>
                                <img
                                    className={styles.cardImg}
                                    src={pushkin}
                                    alt="Пушкин"
                                />
                            </figure>
                            <p className={styles.pharagraphBorder}>
                                «Содружество школьных театров Москвы» — это
                                объединение детских и молодежных театров,
                                созданных на базе образовательных организаций,
                                подведомственных Департаменту образования и
                                науки города Москвы
                            </p>
                        </li>
                        <li className={styles.cardColumns}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                Участники Содружества
                            </h2>
                            <figure className={styles.cardFigure}>
                                <figcaption className={styles.cardFigcaption}>
                                    Театр — это такая кафедра, <br />
                                    с которой можно много <br />
                                    сказать миру добра
                                </figcaption>
                                <img
                                    className={styles.cardImg}
                                    src={gogol}
                                    alt="Гоголь"
                                />
                            </figure>
                            <ol className={styles.listBigNumbers}>
                                <li>
                                    театры на базе общеобразовательных
                                    учреждений
                                </li>
                                <li>
                                    театры на базе учреждений дополнительного
                                    образования
                                </li>
                                <li>
                                    театры на базе профессиональных
                                    образовательных организаций
                                </li>
                            </ol>
                        </li>
                        <li className={styles.cardColumns}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                Как театру стать участником Содружества
                            </h2>
                            <figure className={styles.cardFigure}>
                                <figcaption className={styles.cardFigcaption}>
                                    Собраться вместе есть начало. <br />
                                    Держаться вместе есть прогресс. <br />
                                    Работать вместе есть успех
                                </figcaption>
                                <img
                                    className={styles.cardImg}
                                    src={ford}
                                    alt="Форд"
                                />
                            </figure>
                            <div>
                                <p className={styles.pharagraph}>
                                    Для вступления в Содружество театрам в лице
                                    ответственного сотрудника образовательной
                                    организации (руководителя, педагога
                                    школьного театра) необходимо пройти
                                    регистрацию на портале, указав:
                                </p>
                                <ul className={styles.listDisc}>
                                    <li>
                                        образовательную организацию, на базе
                                        которой работает театр; название театра;
                                    </li>
                                    <li>ФИО и контакты руководителя театра;</li>
                                    <li>
                                        форму осуществления театральной
                                        деятельности;
                                    </li>
                                    <li>
                                        возрастной состав коллектива театра;
                                    </li>
                                    <li>
                                        заполнить расширенный профиль театра
                                        (краткая информация о театре, достижения
                                        коллектива, афиши, фото и видео
                                        материалы спектаклей).
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={styles.cardColumns}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                Что для нас важно
                            </h2>
                            <figure className={styles.cardFigure}>
                                <figcaption className={styles.cardFigcaption}>
                                    Театр – искусство прекрасное. <br />
                                    Оно облагораживает, воспитывает человека
                                </figcaption>
                                <img
                                    className={styles.cardImg}
                                    src={stanislavsky}
                                    alt="Станиславский"
                                />
                            </figure>
                            <p className={styles.pharagraphJustify}>
                                Наш проект направлен, в первую очередь, на
                                решение педагогических задач. <br />{" "}
                                Рассматривая театральное искусство, как
                                уникальный и универсальный педагогический
                                инструмент, мы говорим о педагогике
                                инструментами театра. <br />
                                Использование приемов театрального искусства в
                                качестве инструментов педагогической работы в
                                школах имеет очень давнюю традицию. То, что мы
                                могли бы назвать театрализацией, всегда
                                присутствует в любом плане учебно-воспитательной
                                работы. <br /> И не случайно. Интуитивно,
                                практикующие педагоги, даже не имея специального
                                театрального образования, ощущают (или точно
                                знают!), что это универсальный педагогический
                                инструмент. Он не только раскрывает творческий
                                потенциал личности учащегося, но, главное,
                                мотивирует к образовательной деятельности. Учит
                                простым и сложным видам коммуникации, развивает
                                эмоциональный интеллект, тренирует все виды
                                памяти, тренирует тело и поднимает культурную
                                планку. <br /> Театр может стать центром
                                притяжения и формирует атмосферу школы, способен
                                объединить всех участников образовательного
                                процесса: родителей, учащихся и педагогов.{" "}
                                <br /> Так вот задачами «Содружества» является
                                системное развитие детских и молодежных театров,
                                обеспечения доступа к методическим материалам и
                                практическим знаниям, создание профессионального
                                сообщества педагогов, в котором можно не только
                                делиться опытом, но и организационно
                                поддерживать друг друга.
                            </p>
                        </li>
                        <li className={styles.card}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                О терминах и определениях
                            </h2>
                            <div className={styles.termins}>
                                <ul className={styles.list}>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            ТОП{" "}
                                        </span>
                                        – Театральное Образовательное
                                        Пространство образовательного учреждения
                                        (далее – ТОП), объединяющее в себе все
                                        формы театрализации, направленные на
                                        решение педагогических задач. Для чего
                                        мы вводим это понятие? Для того, чтобы
                                        вы могли понять на каком уровне, сейчас
                                        находится ваше театральное объединение и
                                        к чему следует стремиться. ТОП имеет
                                        четыре уровня.
                                    </li>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            Как определить уровень ТОПа своего
                                            образовательного учреждения?
                                        </span>
                                    </li>
                                </ul>
                                <p className={styles.cardNotif}>
                                    <span className={styles.cardNotifSpan}>
                                        Это важно!
                                    </span>
                                    Потому что для удобства и продуктивной
                                    коммуникации всем участникам «Содружества»
                                    необходимо говорить на одном языке. Пока
                                    этот глоссарий минимальный, но мы уверенны,
                                    что со временем он будет пополнен нашими
                                    общими усилиями.
                                </p>
                                <p className={styles.pharagraphTermins}>
                                    <span className={styles.spanAccent}>
                                        1 уровень{" "}
                                    </span>{" "}
                                    – формирование ТОПа происходит исключительно
                                    в рамках организации и проведения
                                    традиционных и школьных праздников и
                                    мероприятий, где используются элементы
                                    театрализации. <br />
                                    <span className={styles.spanAccent}>
                                        2 уровень{" "}
                                    </span>
                                    – формирование ТОПа, внутри которого, кроме
                                    плановых театрализованных или сценических
                                    действий работают театральные кружки, не
                                    ставящие своей задачей выпуск спектаклей,
                                    как творческого продукта. <br />
                                    <span className={styles.spanAccent}>
                                        3 уровень{" "}
                                    </span>
                                    – формирование ТОПа, внутри которого есть
                                    постоянный или временный коллектив, чья
                                    творческая работа направленна на выпуск
                                    спектакля. Самое главное, что в течение года
                                    идут репетиционные и организационные
                                    процессы, направленные на выпуск спектакля.{" "}
                                    <br />
                                    <span className={styles.spanAccent}>
                                        4 уровень{" "}
                                    </span>
                                    - формирование ТОПа, это когда в
                                    образовательном учреждении работает на
                                    постоянной основе школьная театральная
                                    студия, ставящая своей задачей создание и
                                    выпуск спектаклей. В ней также проводится
                                    регулярное обучение студийцев навыкам и
                                    законам театрального искусства, используются
                                    технологии и методики театральной
                                    педагогики. В школе есть специально
                                    созданные условия для сценического
                                    творчества: оборудовано помещение для показа
                                    спектаклей, есть места для хранения костюмов
                                    и иного театрального имущества. Показы
                                    спектаклей проводятся не только в рамках
                                    школьной аудитории, но и для приглашенных
                                    зрителей. Коллектив является участником
                                    театральных фестивалей и конкурсов.
                                </p>
                                <ul className={styles.list}>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            Школьный театр{" "}
                                        </span>
                                        –детское и молодежное объединение
                                        театрального творчества в любом из
                                        жанров (драматический, музыкальный,
                                        кукольный, театр на иностранном языке и
                                        др.), созданное на базе образовательной
                                        организации, основной деятельностью
                                        которого является создание и публичный
                                        показ в живом исполнении театральных
                                        постановок.
                                    </li>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            Координатор деятельности Содружества{" "}
                                        </span>
                                        — отдел сопровождения дополнительного
                                        образования Управления развития
                                        воспитательной деятельности ГБОУ города
                                        Москвы «Московский центр «Патриот.
                                        Спорт».
                                    </li>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            Служба консультантов-наставников{" "}
                                        </span>
                                        – сотрудники Координатора, которые имеют
                                        театральное образование, опыт реализации
                                        театральных проектов и осуществляют
                                        информационно-просветительскую,
                                        обучающую поддержку по вопросам
                                        организации деятельности заявкам
                                        Школьных театров;
                                    </li>
                                    <li>
                                        <span className={styles.spanAccent}>
                                            Портал Содружества Школьных театров
                                            города Москвы{" "}
                                        </span>
                                        – сайт, созданный для поддержки
                                        деятельности Содружества, размещения
                                        руководителями Школьных театров
                                        материалов о деятельности театра.
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={styles.cardColumns}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                Ваши пожелания, предложения и вопросы
                            </h2>
                            <p className={styles.pharagraph}>
                                <span className={styles.spanAccentTT}>
                                    Давайте все обсуждать, разговаривать друг с
                                    другом, вместе думать и вместе делать.{" "}
                                    <br />И это можно начинать прямо сейчас.
                                </span>
                                Пишите свои вопросы и предложения на нашу почту{" "}
                                <a
                                    className={styles.link}
                                    rel="nofollow noopener"
                                    href="mailto:sodruzhestvo@edu.mos.ru"
                                >
                                    sodruzhestvo@edu.mos.ru
                                </a>
                            </p>
                            <form className={styles.form}>
                                <p className={styles.pharagraph}>
                                    Только не забывайте указывать ваши
                                    контактные данные для обратной связи.
                                </p>
                                <h3 className={styles.formTitle}>задайте вопрос!</h3>
                                <fieldset className={styles.fieldset}>
                                    <FieldInputComponent
                                        type={"textarea"}
                                        rows="4"
                                        extraClass={styles.textarea}
                                        placeholder={"Вопрос..."}
                                    />
                                    <FieldInputComponent
                                        type={"email"}
                                        placeholder={"E-mail..."}
                                    />
                                    <FieldInputComponent
                                        type={"tel"}
                                        placeholder={"Телефон..."}
                                    />
                                    <Button
                                        type="submit"
                                        theme="accent"
                                        extraClass={styles.submitBtn}
                                        text={"Отправить"}
                                    />
                                </fieldset>
                            </form>
                        </li>
                        <li className={styles.card}>
                            <h2
                                className={[
                                    commonStyles.title,
                                    styles.cardTitle,
                                ].join(" ")}
                            >
                                Клуб руководителей школьных театров
                            </h2>
                            <ul className={styles.twoColumns}>
                                <li>
                                    <h3 className={styles.caption}>О клубе</h3>
                                    <p className={styles.pharagraph}>
                                        Городской клуб руководителей школьных
                                        театров создан в рамках реализации
                                        проекта «Школьный театр» с целью
                                        расширения возможностей педагогов
                                        московских школ получить специальные
                                        театральные знания и практические навыки
                                        для профессиональной педагогической
                                        работы, связанной с различными формами и
                                        жанрами сценических искусств. А также
                                        для адаптации театральных методик и
                                        технологий к условиям
                                        общеобразовательной школы и освоения их
                                        школьными учителями.
                                    </p>
                                </li>
                                <li>
                                    <h3 className={styles.caption}>
                                        Задачи клуба
                                    </h3>
                                    <p className={styles.pharagraph}>
                                        Формирование профессионального
                                        сообщества, где можно не только
                                        поделиться собственным опытом, но и
                                        получить профессиональную,
                                        организационную и творческую поддержку
                                        от коллег.
                                    </p>
                                    <p className={styles.pharagraph}>
                                        Обучение профессиональным театральным
                                        методикам и технологиям, тех педагогов,
                                        которые осознают в этом потребность.
                                        Получение информации о городских и
                                        федеральных программах и ресурсах,
                                        связанных с воспитательной работой школ
                                        в области театральной педагогики.
                                    </p>
                                </li>
                                <li>
                                    <h3 className={styles.caption}>
                                        Участники клуба
                                    </h3>
                                    <p className={styles.pharagraph}>
                                        К участию в работе Клуба приглашаются
                                        педагоги дополнительного образования,
                                        педагоги — организаторы и руководители
                                        школьных театральных студий, кружков и
                                        творческих проектов, использующие в
                                        педагогической работе различные формы
                                        театрализации. 
                                    </p>
                                </li>
                                <li>
                                    <h3 className={styles.caption}>
                                        Программа клуба
                                    </h3>
                                    <p className={styles.pharagraph}>
                                        В рамках работы Клуба проводятся
                                        мастер-классы, встречи с
                                        деятелями культуры, актерами,
                                        режиссерами. Посещаются сценические
                                        площадки московских театров. Члены клуба
                                        имеют возможность принять участие в
                                        выездных мастер-классах, организованных
                                        в рамках деятельности Клуба.
                                    </p>
                                </li>
                                <li>
                                    <h3 className={styles.caption}>
                                        Тематика встреч:
                                    </h3>
                                    <ol className={styles.listNumbers}>
                                        <li>
                                            Театральное искусство и
                                            учебно-воспитательные задачи школы
                                        </li>
                                        <li>
                                            Формирование и эффективное
                                            использование в педагогической
                                            работе Театрального Образовательного
                                            Пространства школ
                                        </li>
                                        <li>
                                            Особенности театрализации в школе и
                                            основы режиссуры 
                                        </li>
                                        <li>
                                            Выбор репертуара школьного театра и
                                            действенный анализ текста
                                        </li>
                                        <li>
                                            Что такое актерское мастерство и как
                                            ему обучать школьников
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
                                            Опыт публичного выступления и
                                            сценическая речь, как универсальный
                                            учебный навык
                                        </li>
                                        <li>
                                            Главные правила и реальные
                                            возможности художественного
                                            оформления сценического действия
                                            силами школы
                                        </li>
                                        <li>
                                            Световая партитура и ее возможности
                                            в условиях школьных помещений
                                        </li>
                                        <li>
                                            Художественная целостность любого
                                            сценического действия
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <h3 className={styles.caption}>
                                        Организация встреч клуба:
                                    </h3>
                                    <ul className={styles.list}>
                                        <li>
                                            Встречи Клуба проходят два раза в
                                            месяц
                                        </li>
                                        <li>
                                            Расписание встреч и темы
                                            анонсируются заранее и сразу
                                            открывается регистрация.
                                        </li>
                                        <li>
                                            Если Вы хотите заявить себя, как
                                            спикера, то это можно сделать по
                                            согласованию с руководителем клуба
                                            Злотниковым Вадимом Семеновичем. Для
                                            этого отправьте письмо на нашу
                                            почту:{" "}
                                            <a
                                                className={styles.link}
                                                rel="nofollow noopener"
                                                href="mailto:sodruzhestvo@edu.mos.ru"
                                            >
                                                sodruzhestvo&shy;@edu.mos.ru
                                            </a>
                                        </li>
                                        <li>
                                            Количество участников мастерской
                                            может быть ограниченно только
                                            возможностями помещения, в котором
                                            проходят очные встречи. Если работа
                                            ведется офлайн, то количество
                                            участников не ограниченно.
                                        </li>
                                    </ul>

                                    {user && user.role === "user" && (
                                        <a
                                            className={styles.btn}
                                            rel="noopener noopener"
                                            href="https://patriotsport.moscow/shkolnyj-teatr/"
                                            target="_blank"
                                        >
                                            ЗАПИСАТЬСЯ
                                        </a>
                                    )}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </article>
            </section>
        </>
    );
};

export default ConcordPage;