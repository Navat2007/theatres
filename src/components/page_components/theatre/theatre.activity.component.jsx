import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";

import Accordion from "../../accordion/accordion.component";
import Table from "../../table/table.component";
import Button from "../../button/button.component";
import Popup from "../../popup/popup.component";
import FieldInput from "../../field/field.input.component";
import Editor from "../../reach_editor/editor.component";
import ImageSelector from "../../image_selector/image.selector.component";
import Notif from "../../notif/notif.component";

const TheatreActivityComponent = () => {

    const {register, handleSubmit, reset, control, setValue} = useForm();
    const [notif, setNotif] = React.useState(<></>);

    const [activityEvents, setActivityEvents] = React.useState(false);
    const [activityVisitFestival, setVisitFestival] = React.useState(false);
    const [activityOwnFestival, setOwnFestival] = React.useState(false);

    const [photoActivityEvents, setPhotoActivityEvents] = React.useState([]);
    const [videoActivityEvents, setVideoActivityEvents] = React.useState([]);

    const itemActivityEventsConfig = [
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
    const itemActivityVisitFestivalConfig = [
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
    const itemActivityOwnFestivalConfig = [
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

    const onActivityEventsSendSubmit = async (params) => {

        let sendObject = { ...params };

        sendObject["photo"] = photoActivityEvents;

        if (videoActivityEvents.length > 0)
            sendObject["video"] = Array.from(
                videoActivityEvents.filter((link) => link.url !== "").map((link) => link.url)
            );

        console.log(sendObject);

        let form = new FormData();
        window.global.buildFormData(form, sendObject);

        const result = await axios.postForm(window.global.baseUrl + 'php/models/user/theatres/add_activity.php', sendObject);
        console.log(result);

        reset();
        setActivityEvents(false);
        setPhotoActivityEvents([]);
        setVideoActivityEvents([]);

    }

    const onActivityVisitFestivalSendSubmit = async (params) => {

        console.log(params);

        let form = new FormData();

        for (let key in params) {
            form.append(key, params[key]);
        }

        //await axios.post(window.global.baseUrl + 'php/models/support/send.php', form);

        reset();
        setVisitFestival(false);

    }

    const onActivityOwnFestivalSendSubmit = async (params) => {

        console.log(params);

        let form = new FormData();

        for (let key in params) {
            form.append(key, params[key]);
        }

        //await axios.post(window.global.baseUrl + 'php/models/support/send.php', form);

        reset();
        setOwnFestival(false);

    }

    return (
        <>
            <Accordion title={"Посещение события"}>
                <Table
                    title={"Таблица событий в городе"}
                    loading={false}
                    items={[
                        {
                            ID: 1,
                            title: "Visit 1",
                            date: "2000-01-01",
                        },
                        {
                            ID: 2,
                            title: "Visit 2",
                            date: "2003-07-11",
                        },
                        {
                            ID: 3,
                            title: "Visit 3",
                            date: "2027-12-31",
                        },
                    ]}
                    itemsConfig={itemActivityEventsConfig}
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
                            setActivityEvents(true);
                        }}
                    />
                </Table>
            </Accordion>
            <Accordion title={"Участие в фестивалях, конкурсах"}>

            </Accordion>
            <Accordion title={"Проведение собственных фестивалей в образовательной организации"}>

            </Accordion>

            <Popup
                title={"Посещение события"}
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
                                setVideoActivityEvents([...videoActivityEvents, {id: window.global.makeid(12), url: ""}]);
                            }}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="button"
                            theme={"outline"}
                            text={"Удалить"}
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
                                                        //onDeleteSubmit();
                                                    }}
                                                />
                                            </>
                                        }
                                    />
                                );
                            }}
                        />
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