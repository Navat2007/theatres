import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

import useTheatresStore from '../../../store/user/theatresStore';
import useAuthStore from '../../../store/authStore';

import Notif from '../../../components/notif/notif.component';
import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';
import useTeachersStore from '../../../store/admin/teachersStore';
import Accordion from '../../../components/simple/accordion/accordion.component';
import JoditEditor from "jodit-react";

const MyTheatreRequestPage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const { theatreRequest, loadTheatreRequest, editTheatre, loading, error, errorText, clearErrorText } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await loadTheatreRequest({ id });
        await teachersStore.loadTeachers({ schoolID: user.schoolID });

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

    const back = () => navigate("/user/theatreRequests");

    const getStatusText = (value) => {
        switch (value) {
            case "Новая":
                return <p className='request-status --status-new'>Новая</p>;
            case "Принята":
                return <p className='request-status --status-accept'>Принята</p>;
            case "Отклонена":
                return <p className='request-status --status-decline'>Отклонена</p>;
            case "Отозвана":
                return <p className='request-status --status-callback'>Отозвана</p>;
            case "Рассмотрение":
                return <p className='request-status --status-review'>Рассмотрение</p>
            default:
                return <>{value}</>;
        }
    };

    const onEditSubmit = async (params) => {

        params.id = id;
        params.status = 2;
        params.theatreID = theatreRequest.theatreID;

        const result = await editTheatre(params);

        if (!result.error) {
            back();
        }

    };

    const onRevokeSubmit = async () => {

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
                                back();
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
            <TheatreRequest request={theatreRequest} onSubmitDone={onEditSubmit} onBack={() => setEdit(false)} />
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
                            <h1 className='content__title'>Заявка №{id}</h1>
                        </div>
                        <div className="request-card">
                            <div className="request-card__section">
                                <>{getStatusText(theatreRequest.status)}</>
                                {
                                    theatreRequest.status === "Отклонена"
                                    &&
                                    <Accordion title={'Причина отказа'}>
                                        <JoditEditor
                                            config={{readonly: true, toolbar: false}}
                                            value={theatreRequest.decline_text}
                                        />
                                    </Accordion>

                                }
                                <ul className='request-card__dates'>
                                    <li>
                                        <p className="request-card__date">Дата подачи:
                                            <span className='request-card__date-accent'> {moment(theatreRequest.create_time).format('HH:mm DD.MM.YYYY')}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="request-card__date">Дата обновления:
                                            <span className='request-card__date-accent'> {moment(theatreRequest.update_time).format('HH:mm DD.MM.YYYY')}</span>
                                        </p>
                                    </li>
                                </ul>
                                <h1 className="request-card__title">{theatreRequest.title}</h1>
                                <div className="request-card__controls">
                                    {theatreRequest.status !== "Отозвана" && <Button type='button' theme={'outline'} text={"Отозвать"} onClick={onRevokeSubmit} />}
                                    <Button
                                        type='button'
                                        extraClass={'request-card__btn'}
                                        text={"Редактировать"}
                                        onClick={() => setEdit(true)} />
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <p>Не удалось найти заявку № {id}</p>
            }
            {popup}
        </div>
    );
};

export default MyTheatreRequestPage;