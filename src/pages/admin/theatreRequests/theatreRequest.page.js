import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';

import useTeachersStore from '../../../store/admin/teachersStore';
import useTheatresStore from '../../../store/admin/theatresStore';

import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';
import Notif from '../../../components/notif/notif.component';

import no_photo_man from "../../../images/no_photo_man.png";

const TheatreRequestPage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const {
        theatreRequest,
        loadTheatreRequest,
        editTheatre,
        requestChangeNew,
        loading,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await requestChangeNew({ id });
        const request = await loadTheatreRequest({ id });
        await teachersStore.loadTeachers({ schoolID: request.schoolID });

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
                            const result = await editTheatre({ id, status: 5 });

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
                        <div className="request-card">
                            <p className='request-status --status-review'>
                                {theatreRequest.status}
                            </p>
                            {
                                theatreRequest.decline_text &&
                                <div className='request-card__status-msg'>
                                    <p className='request-card__description'>Причина отказа</p>
                                    <h3 className='request-card__text'>
                                        {theatreRequest.decline_text}
                                    </h3>
                                </div>
                            }
                            <div className="request-card__header">
                                {
                                    theatreRequest.school.photo &&
                                    <img className="request-card__logo-img"
                                        src={window.global.baseUrl + theatreRequest.school.photo}
                                        alt={"Логотип школы"} />
                                }
                                <ul className='request-card__list --place-header'>
                                    <li className='request-card__date-item'>
                                        <p className="request-card__description">Дата подачи</p>
                                        <p className="request-card__text">
                                            {moment(theatreRequest.create_time).format('HH:mm DD.MM.YYYY')}
                                        </p>
                                    </li>
                                    <li className='request-card__date-item'>
                                        <p className="request-card__description">Дата обновления</p>
                                        <p className="request-card__text">
                                            {moment(theatreRequest.update_time).format('HH:mm DD.MM.YYYY')}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <h1 className="request-card__title">{theatreRequest.title}</h1>
                            <ul className='request-card__list'>
                                <li>
                                    <h3 className='request-card__text'>{theatreRequest.school.dir_fio}</h3>
                                    <p className='request-card__description'>Директор</p>
                                </li>
                                <li>
                                    <p className='request-card__item link --type-icon --icon-company'>{theatreRequest.school.title}
                                        <span className='request-card__description'>Полное наименование школы</span></p>
                                </li>
                                {
                                    theatreRequest.school.dir_phone &&
                                    <li>
                                        <a href={`tel:${theatreRequest.school.dir_phone}`}
                                            className='request-card__item link --type-icon --icon-phone'
                                            rel='noreferrer nofollow noopener'
                                            target='_blank'
                                        >
                                            {theatreRequest.school.dir_phone}
                                        </a>
                                    </li>
                                }
                                {
                                    theatreRequest.school.dir_phone &&
                                    <li>
                                        <a href={`mailto:${theatreRequest.school.dir_email}`}
                                            className='request-card__item link --type-icon --icon-email'
                                            rel='noreferrer nofollow noopener'
                                            target='_blank'
                                        >
                                            {theatreRequest.school.dir_email}
                                        </a>
                                    </li>
                                }
                            </ul>
                            <div class="profile --place-request">
                                <div class="profile__content">
                                    <img
                                        class="profile__img"
                                        src={theatreRequest.user.photo !== "" ? window.global.baseUrl + theatreRequest.user.photo : no_photo_man}
                                        alt={theatreRequest.user.fio} />
                                    <p class="profile__title">{theatreRequest.user.fio}</p>
                                    <p class="profile__subtitle">Пользователь</p>
                                    <ul className='profile__list'>
                                        {
                                            theatreRequest.user.email
                                            &&
                                            <li>
                                                <a href={`email:${theatreRequest.user.email}`}
                                                    className='link --type-icon --icon-email'
                                                    rel='noreferrer nofollow noopener'
                                                    target='_blank'
                                                >
                                                    {theatreRequest.user.email}
                                                </a>
                                            </li>
                                        }
                                        {
                                            theatreRequest.user.phone
                                            &&
                                            <li>
                                                <a href={`tel:${theatreRequest.user.phone}`}
                                                    className='link --type-icon --icon-phone'
                                                    rel='noreferrer nofollow noopener'
                                                    target='_blank'
                                                >
                                                    {theatreRequest.user.phone}
                                                </a>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <Button
                                type='button'
                                theme={'outline'}
                                extraClass='request-card__btn'
                                text={"Просмотр заявки"}
                                onClick={() => setEdit(true)}
                            />
                        </div>
                    </>
                    :
                    <p>Не удалось найти заявку № {id}</p>
            }
            {popup}
        </div>
    );

};

export default TheatreRequestPage;