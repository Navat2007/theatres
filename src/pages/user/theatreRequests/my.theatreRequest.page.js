import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

import useTheatresStore from '../../../store/user/theatresStore';
import useAuthStore from '../../../store/authStore';

import Notif from '../../../components/notif/notif.component';
import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';

const MyTheatreRequestPage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const { theatreRequest, loadTheatreRequest, loading, error, errorText, clearErrorText } = useTheatresStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await loadTheatreRequest({ id });

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

    if (loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (edit) {
        return (<>
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
            <TheatreRequest request={theatreRequest} onBack={() => setEdit(false)} />
        </>);
    }

    return (
        <div className='content__section'>
            {
                id && Object.keys(theatreRequest).length > 0
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
                        <p>Название театра: {theatreRequest.title}</p>
                        <p>Дата подачи: {moment(theatreRequest.create_time).format('hh:mm DD.MM.YYYY')}</p>
                        <p>Дата обновления: {moment(theatreRequest.update_time).format('hh:mm DD.MM.YYYY')}</p>
                        <p>Текст отказа: {theatreRequest.decline_text}</p>
                        <Button text={"Редактировать"} onClick={() => setEdit(true)} />
                        <br />
                        <br />
                        <Button text={"Отозвать"} />
                    </>
                    :
                    <p>Заявки № {id} не существует</p>
            }
            {popup}
        </div>
    );
};

export default MyTheatreRequestPage;