import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import moment from "moment";
import createDOMPurify from "dompurify";

import Accordion from "../../accordion/accordion.component";
import Table from "../../table/table.component";
import Button from "../../button/button.component";
import Popup from "../../popup/popup.component";
import FieldInput from "../../field/field.input.component";
import Editor from "../../reach_editor/editor.component";
import ImageSelector from "../../image_selector/image.selector.component";
import Notif from "../../notif/notif.component";
import MultiSelect from "../../multi_select/multi_select.component";

import styles from "./theatre.module.scss";

const TheatreActivityComponent = ({theatreID}) => {

    const DOMPurify = createDOMPurify(window);

    const {register, handleSubmit, reset, control, setValue} = useForm();
    const [notif, setNotif] = React.useState(<></>);

    const [loading, setLoading] = React.useState(false);

    const [activityEvents, setActivityEvents] = React.useState(false);
    const [activityEventsView, setActivityEventsView] = React.useState(false);
    const [activityVisitFestival, setVisitFestival] = React.useState(false);
    const [activityVisitFestivalView, setVisitFestivalView] = React.useState(false);
    const [activityOwnFestival, setOwnFestival] = React.useState(false);
    const [activityOwnFestivalView, setOwnFestivalView] = React.useState(false);

    const [photoActivityEvents, setPhotoActivityEvents] = React.useState([]);
    const [photoActivityVisitFestival, setPhotoActivityVisitFestival] = React.useState([]);
    const [photoActivityOwnFestival, setPhotoActivityOwnFestival] = React.useState([]);

    const [videoActivityEvents, setVideoActivityEvents] = React.useState([]);

    const [event, setEvent] = React.useState(null);
    const [visit, setVisit] = React.useState(null);
    const [own, setOwn] = React.useState(null);

    const eventsItemsConfig = [
        {
            header: "Название мероприятия",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Тип события",
            key: "eventType",
            type: "string",
            filter: "select",
            sorting: true,
        },
        {
            header: "Дата посещения",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
        },
    ];
    const visitFestivalItemsConfig = [
        {
            header: "Название мероприятия",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Дата посещения",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
        },
    ];
    const ownFestivalItemsConfig = [
        {
            header: "Название мероприятия",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Дата посещения",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
        },
    ];

    const [eventsItems, setEventsItems] = React.useState([]);
    const [visitFestivalItems, setVisitFestivalItems] = React.useState([]);
    const [ownFestivalItems, setOwnFestivalItems] = React.useState([]);

    React.useEffect(() => {

        fetchData();

    }, []);

    React.useEffect(() => {

        if (event !== null)
            setActivityEventsView(true);

        if (visit !== null)
            setVisitFestivalView(true);

        if (own !== null)
            setOwnFestivalView(true);

    }, [event, visit, own]);

    const fetchData = async () => {

        setLoading(true);

        let form = new FormData();
        window.global.buildFormData(form, {theatreID});

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/load_activity.php', form);

        console.log(result.data);

        setEventsItems(result.data.params.events);
        setVisitFestivalItems(result.data.params.visits);
        setOwnFestivalItems(result.data.params.own);

        setLoading(false);

    }

    const onActivityEventsSendSubmit = async (params) => {

        console.log(params);

        let sendObject = {...params};

        sendObject["theatreID"] = theatreID;
        sendObject["place"] = "event";
        sendObject["photo"] = photoActivityEvents;
        sendObject["eventType"] = params.eventType.value;
        sendObject["editorReview"] = params.editorReview ? params.editorReview : "";

        if (videoActivityEvents.length > 0)
            sendObject["video"] = Array.from(
                videoActivityEvents.filter((link) => link.url !== "").map((link) => link.url)
            );

        console.log(sendObject);

        return;

        let form = new FormData();
        window.global.buildFormData(form, sendObject);

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/add_activity.php', form);
        console.log(result);

        reset();
        setActivityEvents(false);
        setPhotoActivityEvents([]);
        setVideoActivityEvents([]);

        await fetchData();

    }

    const onActivityVisitFestivalSendSubmit = async (params) => {

        let sendObject = {...params};

        sendObject["theatreID"] = theatreID;
        sendObject["place"] = "visit";
        sendObject["eventTitle"] = params.visitTitle;
        sendObject["eventDate"] = params.visitDate;
        sendObject["eventResult"] = params.visitResult.value;
        sendObject["editorReview"] = params.visitReview ? params.visitReview : "";
        sendObject["photo"] = photoActivityVisitFestival;

        let form = new FormData();
        window.global.buildFormData(form, sendObject);

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/add_activity.php', form);
        console.log(result);

        reset();
        setVisitFestival(false);
        setPhotoActivityVisitFestival([]);

        await fetchData();

    }

    const onActivityOwnFestivalSendSubmit = async (params) => {

        let sendObject = {...params};

        sendObject["theatreID"] = theatreID;
        sendObject["place"] = "own";
        sendObject["photo"] = photoActivityOwnFestival;
        sendObject["editorReview"] = params.editorReview ? params.editorReview.value : "";

        let form = new FormData();
        window.global.buildFormData(form, sendObject);

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/add_activity.php', form);
        console.log(result);

        reset();
        setOwnFestival(false);
        setPhotoActivityOwnFestival([]);

        await fetchData();

    }

    const onDeleteSubmit = async (ID, place) => {

        let form = new FormData();
        window.global.buildFormData(form, {
            ID, place
        });

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/remove_activity.php', form);
        console.log(result);

        setActivityEvents(false);
        setVisitFestival(false);
        setOwnFestival(false);

    }

    return (
        <>
            <Accordion title={"Посещение события"}>
                <Table
                    title={"Таблица событий"}
                    loading={loading}
                    items={eventsItems}
                    itemsConfig={eventsItemsConfig}
                    onItemClick={(itemID) => {
                        setEvent(eventsItems.find(item => item.ID === itemID));
                    }}
                    withFilter={true}
                >
                    <Button
                        type="button"
                        iconClass={"mdi mdi-plus"}
                        size="small"
                        text="Добавить"
                        aria-label="Добавить событие"
                        onClick={() => {
                            setActivityEvents(true);
                        }}
                    />
                </Table>
            </Accordion>
            <Accordion title={"Участие в фестивалях, конкурсах"}>
                <Table
                    title={"Таблица фестивалей"}
                    loading={loading}
                    items={visitFestivalItems}
                    itemsConfig={visitFestivalItemsConfig}
                    onItemClick={() => {
                        console.log("item");
                    }}
                    withFilter={true}
                >
                    <Button
                        type="button"
                        iconClass={"mdi mdi-plus"}
                        size="small"
                        text="Добавить"
                        aria-label="Добавить событие"
                        onClick={() => {
                            setVisitFestival(true);
                        }}
                    />
                </Table>
            </Accordion>
            <Accordion title={"Проведение собственных фестивалей в образовательной организации"}>
                <Table
                    title={"Таблица собственных фестивалей"}
                    loading={loading}
                    items={ownFestivalItems}
                    itemsConfig={ownFestivalItemsConfig}
                    onItemClick={() => {
                        console.log("item");
                    }}
                    withFilter={true}
                >
                    <Button
                        type="button"
                        iconClass={"mdi mdi-plus"}
                        size="small"
                        text="Добавить"
                        aria-label="Добавить событие"
                        onClick={() => {
                            setOwnFestival(true);
                        }}
                    />
                </Table>
            </Accordion>

            <Popup
                title={"Новое событие"}
                opened={activityEvents}
                onClose={() => {
                    reset();
                    setActivityEvents(false);
                }}
            >
                <form onSubmit={handleSubmit(onActivityEventsSendSubmit)} className='form'>
                    <fieldset className='form__section --content-info'>
                        <FieldInput
                            label={"Название мероприятия"}
                            placeholder={"Введите название..."}
                            required={true}
                            {...register("eventTitle")}
                        />
                        <div className="form__multy-block">
                            <p className="form__label">
                                Тип события
                            </p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={false}
                                name={"eventType"}
                                closeMenuOnSelect={true}
                                options={[
                                    {
                                        label: "Профессиональный театр",
                                        value: "Профессиональный театр",
                                    },
                                    {
                                        label: "Театральный музей",
                                        value: "Театральный музей",
                                    },
                                    {
                                        label: "Театральный мастер-класс",
                                        value: "Театральный мастер-класс",
                                    },
                                    {
                                        label: "Школьный театр",
                                        value: "Школьный театр",
                                    },
                                ]}
                            />
                        </div>
                        <FieldInput
                            label={"Дата события"}
                            type="date"
                            layout="flex"
                            required={true}
                            {...register("eventDate")}
                        />
                        <div className="form__editor-block">
                            <p className="form__label">
                                Рецензия (впечатления, отчет о посещении) о спектакле, музее, событии
                            </p>
                            <Editor
                                control={control}
                                name="editorReview"
                                minHeight={250}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="form__section">
                        <ImageSelector
                            title="Фотографии события"
                            items={photoActivityEvents}
                            multiFiles={true}
                            onChange={(items) => setPhotoActivityEvents(items)}
                            onError={(text) =>
                                setNotif(
                                    <Notif
                                        title="Ошибка!"
                                        text={text}
                                        opened={true}
                                        onClose={() => {
                                            setNotif(<></>);
                                        }}
                                    />
                                )
                            }
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">
                            Видео (интервью с участниками спектакля, режиссером, зрителями)
                        </h2>
                        {videoActivityEvents.map((item) => (
                            <div
                                className="form__group-block"
                                key={item.id}
                            >
                                <FieldInput
                                    type="text"
                                    extraClass="form__field"
                                    placeholder="Введите url-адрес..."
                                    {...register("video_" + item.id, {
                                        value: item.url,
                                    })}
                                    onBlur={(event) => {
                                        setVideoActivityEvents(
                                            videoActivityEvents.map((link) => {
                                                if (link.id === item.id) {
                                                    link.url =
                                                        event.target.value;
                                                }

                                                return link;
                                            })
                                        );
                                        setValue(
                                            "video_" + item.id,
                                            event.target.value
                                        );
                                    }}
                                    required={true}
                                />
                                {item.url && (
                                    <a
                                        className="form__social-link"
                                        href={
                                            item.url.includes("http")
                                                ? item.url
                                                : "http://" + item.url
                                        }
                                        aria-label="Открыть в новой вкладке"
                                        title="Открыть в новой вкладке"
                                        target={"_blank"}
                                        rel="nofollow noreferer noopener"
                                    >
                                        <span className="mdi mdi-open-in-new"/>
                                    </a>
                                )}
                                <Button
                                    type="button"
                                    theme="text"
                                    size="smaller"
                                    extraClass="form__icon-btn"
                                    iconClass={"mdi mdi-close"}
                                    isIconBtn="true"
                                    aria-label="Удалить поле"
                                    onClick={() => {
                                        setVideoActivityEvents(
                                            videoActivityEvents.filter((link) => link.id !== item.id)
                                        );
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            extraClass="form__icon-btn"
                            iconClass={"mdi mdi-plus"}
                            isIconBtn="true"
                            aria-label="Добавить поле"
                            onClick={() => {
                                setVideoActivityEvents([...videoActivityEvents, {
                                    id: window.global.makeid(12),
                                    url: ""
                                }]);
                            }}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={false}
                            style={{marginLeft: 'auto', display: 'block'}}
                        />
                    </div>
                </form>
            </Popup>
            <Popup
                title={"Посещение события"}
                opened={activityEventsView}
                onClose={() => {
                    setActivityEventsView(false);
                    setEvent(null);
                }}
            >
                <form className='form'>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Название мероприятия</h3>
                            <p className={styles.description}>
                                {event?.title}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Тип события</h3>
                            <p className={styles.description}>
                                {event?.eventType}
                            </p>
                        </li>
                        <li className={styles.item}>
                            <h3 className={styles.label}>Дата события</h3>
                            <p className={styles.description}>
                                {moment(event?.date).format(
                                    "DD.MM.YYYY"
                                )}
                            </p>
                        </li>

                    </ul>
                    {
                        event?.review
                        &&
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Рецензия (впечатления, отчет о посещении) о спектакле, музее, событии
                            </h2>
                            <div
                                className={styles.editor}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(event?.review),
                                }}
                            />
                        </fieldset>
                    }
                    {
                        event?.photo
                        &&
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Фотографии события
                            </h2>
                        </fieldset>
                    }
                    {
                        event?.video
                        &&
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Видео (интервью с участниками спектакля, режиссером, зрителями)
                            </h2>
                        </fieldset>
                    }
                    <div className="form__controls">
                        <Button
                            type="button"
                            theme={"outline"}
                            text={"Удалить"}
                            style={{marginLeft: 'auto', display: 'block'}}
                            onClick={() => {
                                setNotif(
                                    <Notif
                                        text={"Вы уверены что хотите удалить?"}
                                        opened={true}
                                        onClose={() => setNotif(<></>)}
                                        buttons={
                                            <>
                                                <Button
                                                    type="button"
                                                    text="Нет"
                                                    size={"small"}
                                                    theme="text"
                                                    onClick={() => setNotif(<></>)}
                                                />
                                                <Button
                                                    type="button"
                                                    text="Да"
                                                    theme={"info"}
                                                    size={"small"}
                                                    onClick={() => {
                                                        setNotif(<></>)
                                                        onDeleteSubmit(event?.ID, "event");
                                                    }}
                                                />
                                            </>
                                        }
                                    />
                                );
                            }}
                        />
                    </div>
                </form>
            </Popup>
            <Popup
                title={"Новое участие в мероприятии"}
                opened={activityVisitFestival}
                onClose={() => {
                    reset();
                    setVisitFestival(false);
                }}
            >
                <form onSubmit={handleSubmit(onActivityVisitFestivalSendSubmit)} className='form'>
                    <fieldset className='form__section --content-info'>
                        <FieldInput
                            label={"Название мероприятия"}
                            placeholder={"Введите название..."}
                            required={true}
                            {...register("visitTitle")}
                        />
                        <div className="form__multy-block">
                            <p className="form__label">
                                Результативность участия
                            </p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={false}
                                name={"visitResult"}
                                closeMenuOnSelect={true}
                                options={[
                                    {
                                        label: "Участник",
                                        value: "Участник",
                                    },
                                    {
                                        label: "Лауреат",
                                        value: "Лауреат",
                                    },
                                    {
                                        label: "Призер",
                                        value: "Призер",
                                    },
                                    {
                                        label: "Победитель",
                                        value: "Победитель",
                                    },
                                ]}
                            />
                        </div>
                        <FieldInput
                            label={"Дата мероприятия"}
                            type="date"
                            layout="flex"
                            required={true}
                            {...register("visitDate")}
                        />
                        <div className="form__editor-block">
                            <p className="form__label">
                                Описание мероприятия
                            </p>
                            <Editor
                                control={control}
                                name="visitReview"
                                minHeight={250}
                            />
                        </div>
                        <fieldset className="form__section">
                            <ImageSelector
                                title="Фотографии события"
                                items={photoActivityVisitFestival}
                                multiFiles={true}
                                onChange={(items) => setPhotoActivityVisitFestival(items)}
                                onError={(text) =>
                                    setNotif(
                                        <Notif
                                            title="Ошибка!"
                                            text={text}
                                            opened={true}
                                            onClose={() => {
                                                setNotif(<></>);
                                            }}
                                        />
                                    )
                                }
                            />
                        </fieldset>
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={false}
                            style={{marginLeft: 'auto', display: 'block'}}
                        />
                    </div>
                </form>
            </Popup>
            {notif}
        </>
    );
};

export default TheatreActivityComponent;