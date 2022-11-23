import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";

import useTeachersStore from "../../../store/admin/teachersStore";
import useTheatresStore from "../../../store/admin/theatresStore";

import Button from "../../../components/simple/button/button.component";
import TheatreRequest from "../../../components/page_components/theatre_request/theatre_request.component";
import Notif from "../../../components/notif/notif.component";
import Popup from "../../../components/popup/popup.component";

import Editor from "../../../components/reach_editor/editor.component";
import Accordion from "../../../components/simple/accordion/accordion.component";
import JoditEditor from "jodit-react";
import commonStyles from "../../common.module.scss";

const TheatreRequestPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, control } = useForm();

    const {
        theatreRequest,
        loadTheatreRequest,
        editTheatre,
        requestChangeNew,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        const request = await loadTheatreRequest({ id });
        await teachersStore.loadTeachers({ schoolID: request.schoolID });

        if (request.status === "Новая") await requestChangeNew({ id });

        console.clear();
        console.log(request);
    };

    React.useEffect(() => {
        if (error) {
            setPopup(
                <Notif
                    title="Ошибка!"
                    text={errorText}
                    opened={true}
                    onClose={() => {
                        clearErrorText();
                        setPopup(<></>);
                    }}
                />
            );
        }
    }, [error]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const back = () => navigate("/admin/theatreRequests");

    const getStatusText = (value) => {
        switch (value) {
            case "Новая":
                return <p className="request-status --status-new">Новая</p>;
            case "Принята":
                return (
                    <p className="request-status --status-accept">Принята</p>
                );
            case "Отклонена":
                return (
                    <p className="request-status --status-decline">Отклонена</p>
                );
            case "Отозвана":
                return (
                    <p className="request-status --status-callback">Отозвана</p>
                );
            case "Рассмотрение":
                return (
                    <p className="request-status --status-review">
                        Рассмотрение
                    </p>
                );
            default:
                return <>{value}</>;
        }
    };

    const onAcceptSubmit = async (params) => {
        params.id = id;
        params.status = 3;
        params.theatreID = theatreRequest.theatreID;
        params.schoolID = theatreRequest.schoolID;

        const result = await editTheatre(params);

        if (!result.error) {
            back();
        }
    };

    const onDeclineSubmit = async (params) => {
        const onSendSubmit = async (text) => {
            params.id = id;
            params.status = 4;
            params.declineText = text.declineText;
            params.theatreID = theatreRequest.theatreID;
            params.schoolID = theatreRequest.schoolID;

            const result = await editTheatre(params);

            if (!result.error) {
                back();
            }
        };

        setPopup(
            <Popup
                title={"Укажите причину отклонения заявки"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
            >
                <form
                    onSubmit={handleSubmit(onSendSubmit)}
                    className="form"
                >
                    <fieldset className="form__section --content-info">
                        <Editor
                            required={true}
                            control={control}
                            name="declineText"
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={sending}
                            style={{ marginLeft: "auto", display: "block" }}
                        />
                    </div>
                </form>
            </Popup>
        );
    };

    if (loading || teachersStore.loading) return <p>Загрузка...</p>;

    if (edit) {
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        theme="text"
                        size="small"
                        iconClass={"mdi mdi-arrow-left"}
                        isIconBtn="true"
                        aria-label="Назад"
                        onClick={() => setEdit(false)}
                    />
                    <h1 className={commonStyles.title}>
                        Редактирование заявки ID: {id}{" "}
                    </h1>
                </div>
                <TheatreRequest
                    isAdmin={true}
                    request={theatreRequest}
                    onDecline={onDeclineSubmit}
                    onSubmitDone={onAcceptSubmit}
                    onBack={() => setEdit(false)}
                />
                {popup}
            </>
        );
    }

    return (
        <>
            {id && theatreRequest && Object.keys(theatreRequest).length > 0 ? (
                <>
                    <div className={commonStyles.title_block}>
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                            onClick={back}
                        />
                        <h1 className={commonStyles.title}>Заявка ID: {id}</h1>
                    </div>
                    <div className="request-card">
                        <div className="request-card__section --content-main-info">
                            <>{getStatusText(theatreRequest.status)}</>
                            {theatreRequest.status === "Отклонена" && (
                                <Accordion title={"Причина отказа"}>
                                    <JoditEditor
                                        config={{
                                            readonly: true,
                                            toolbar: false,
                                        }}
                                        value={theatreRequest.decline_text}
                                    />
                                </Accordion>
                            )}
                            <ul className="request-card__dates">
                                <li>
                                    <p className="request-card__date">
                                        Дата подачи:
                                        <span className="request-card__date-accent">
                                            {" "}
                                            {moment(
                                                theatreRequest.create_time
                                            ).format("HH:mm DD.MM.YYYY")}
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <p className="request-card__date">
                                        Дата обновления:
                                        <span className="request-card__date-accent">
                                            {" "}
                                            {moment(
                                                theatreRequest.update_time
                                            ).format("HH:mm DD.MM.YYYY")}
                                        </span>
                                    </p>
                                </li>
                            </ul>
                            <h1 className="request-card__title">
                                {theatreRequest.title}
                            </h1>
                            <p className="request-card__item link --type-icon --icon-company">
                                {theatreRequest.school.title}
                                <span className="request-card__description">
                                    Полное наименование школы
                                </span>
                            </p>
                            <Button
                                type="button"
                                theme={"outline"}
                                extraClass="request-card__btn"
                                text={"Просмотр заявки"}
                                onClick={() => setEdit(true)}
                            />
                        </div>
                        <div class="request-card__section --content-contact-person profile --place-request">
                            <p class="profile__subtitle">Контактное лицо</p>
                            <p class="profile__title">
                                {theatreRequest.user.fio}
                            </p>
                            <ul className="profile__list">
                                {theatreRequest.user.email && (
                                    <li>
                                        <a
                                            href={`email:${theatreRequest.user.email}`}
                                            className="profile__link link --type-icon --icon-email"
                                            rel="noreferrer nofollow noopener"
                                            target="_blank"
                                        >
                                            {theatreRequest.user.email}
                                        </a>
                                    </li>
                                )}
                                {theatreRequest.user.phone && (
                                    <li>
                                        <a
                                            href={`tel:${theatreRequest.user.phone}`}
                                            className="profile__link link --type-icon --icon-phone"
                                            rel="noreferrer nofollow noopener"
                                            target="_blank"
                                        >
                                            {theatreRequest.user.phone}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <p>Не удалось найти заявку № {id}</p>
            )}
            {popup}
        </>
    );
};

export default TheatreRequestPage;
