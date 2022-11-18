import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';
import {useForm} from "react-hook-form";

import useTeachersStore from '../../../store/admin/teachersStore';
import useTheatresStore from '../../../store/admin/theatresStore';

import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';
import Notif from '../../../components/notif/notif.component';
import Popup from "../../../components/popup/popup.component";
import FieldInput from "../../../components/simple/field/field.input.component";

import no_photo_man from "../../../images/no_photo_man.png";
import Editor from "../../../components/reach_editor/editor.component";

const TheatreRequestPage = () => {

    let {id} = useParams();
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
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await requestChangeNew({id});
        const request = await loadTheatreRequest({id});
        await teachersStore.loadTeachers({schoolID: request.schoolID});

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

        }

        setPopup(
            (<Popup
                title={"Укажите причину отклонения заявки"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
            >
                <form onSubmit={handleSubmit(onSendSubmit)} className='form'>
                    <fieldset className='form__section --content-info'>
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
                            style={{ marginLeft: 'auto', display: 'block' }}
                        />
                    </div>
                </form>
            </Popup>)
        );

    };

    if (loading || teachersStore.loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (edit) {
        return (<div className='content__section'>
            <div className="content__title-block">
                <Button
                    type='button'
                    theme='text'
                    size='small'
                    iconClass={'mdi mdi-arrow-left'}
                    isIconBtn='true'
                    aria-label='Назад'
                    onClick={() => setEdit(false)}
                />
                <h1 className='content__title --mb-small'>Редактирование заявки ID: {id} </h1>
            </div>
            <TheatreRequest
                isAdmin={true}
                request={theatreRequest}
                onDecline={onDeclineSubmit}
                onSubmitDone={onAcceptSubmit}
                onBack={() => setEdit(false)}
            />
            {popup}
        </div>);
    }

    return (
        <div className='content__section'>
            {
                id && theatreRequest && Object.keys(theatreRequest).length > 0
                    ?
                    <>
                        <div className="content__title-block">
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                iconClass={'mdi mdi-arrow-left'}
                                isIconBtn='true'
                                aria-label='Назад'
                                onClick={back}
                            />
                            <h1 className='content__title --mb-small'>Заявка №{id}</h1>
                        </div>
                        <p>Статус: {theatreRequest.status}</p>
                        <p>
                            Школа: {theatreRequest.school.title} (Директор: {theatreRequest.school.dir_fio},
                            phone: {theatreRequest.school.dir_phone}, email: {theatreRequest.school.dir_email})
                            <img
                                className='profile-card__img'
                                src={theatreRequest.school.photo !== "" ? window.global.baseUrl + theatreRequest.school.photo : ""}
                                alt={"Логотип школы"}
                            />
                        </p>
                        <p>
                            Пользователь: {theatreRequest.user.fio} (email: {theatreRequest.user.email},
                            phone: {theatreRequest.user.phone})
                            <img
                                className='profile-card__img'
                                src={theatreRequest.user.photo !== "" ? window.global.baseUrl + theatreRequest.user.photo : no_photo_man}
                                alt={theatreRequest.user.fio}
                            />
                        </p>
                        <p>Название театра: {theatreRequest.title}</p>
                        <p>Дата подачи: {moment(theatreRequest.create_time).format('HH:mm DD.MM.YYYY')}</p>
                        <p>Дата обновления: {moment(theatreRequest.update_time).format('HH:mm DD.MM.YYYY')}</p>
                        <p>Текст отказа: {theatreRequest.decline_text}</p>
                        <Button text={"Просмотр заявки"} onClick={() => setEdit(true)}/>
                    </>
                    :
                    <p>Не удалось найти заявку № {id}</p>
            }
            {popup}
        </div>
    );

};

export default TheatreRequestPage;