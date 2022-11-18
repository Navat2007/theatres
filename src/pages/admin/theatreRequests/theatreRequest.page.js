import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import moment from 'moment';

import useTeachersStore from '../../../store/admin/teachersStore';
import useTheatresStore from '../../../store/admin/theatresStore';

import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';
import Notif from '../../../components/notif/notif.component';

import no_photo_man from "../../../images/no_photo_man.png";

const TheatreRequestPage = () => {

    let {id} = useParams();
    const navigate = useNavigate();

    const {
        theatreRequest,
        loadTheatreRequest,
        editTheatre,
        loading,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await loadTheatreRequest({id});
        await teachersStore.loadTeachers({schoolID: theatreRequest.schoolID});

        console.clear();
        console.log(theatreRequest);

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

        console.log(params);

        return;

        const result = await editTheatre(params);

        if (!result.error) {
            back();
        }

    };

    const onDeclineSubmit = async (params) => {

        params.id = id;
        params.status = 4;
        params.theatreID = theatreRequest.theatreID;

        console.log(params);

        return;

        setPopup(
            <Notif
                text={"Вы действительно хотите отозвать заявку?"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
                buttons={<>
                    <Button
                        type='button'
                        text="Нет"
                        size={'small'}
                        theme="text"
                        onClick={() => setPopup(<></>)}
                    />
                    <Button
                        type='button'
                        text="Да"
                        theme='info'
                        size={'small'}
                        onClick={async () => {
                            const result = await editTheatre({id, status: 5});

                            if (!result.error) {
                                setPopup(<></>);
                                navigate("/user/theatreRequests");
                            }
                        }}
                    />
                </>}
            />
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