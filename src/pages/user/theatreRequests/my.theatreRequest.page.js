import React from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

import useTheatresStore from '../../../store/user/theatresStore';
import useAuthStore from '../../../store/authStore';

import Notif from '../../../components/notif/notif.component';

const MyTheatreRequestPage = () => {

    let { id } = useParams();

    const { user } = useAuthStore();
    const { theatreRequest, loadTheatreRequest, loading, error, errorText, clearErrorText } = useTheatresStore();

    const [popup, setPopup] = React.useState(<></>);

    const fetchData = async () => {

        await loadTheatreRequest({ id });

        console.log(theatreRequest);

    };

    React.useEffect(() => {

        if (error) {
            setPopup(
                <Notif
                    title="Ошибка"
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

    if (loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    return (
        <div className='content__section'>
            {
                id && Object.keys(theatreRequest).length > 0
                    ?
                    <>
                        <p>Заявка №{id}</p>
                        <p>Статус: {theatreRequest.status}</p>
                        <p>Название театра: {theatreRequest.title}</p>
                        <p>Дата подачи: {moment(theatreRequest.create_time).format('hh:mm DD.MM.YYYY')}</p>
                        <p>Дата обновления: {moment(theatreRequest.update_time).format('hh:mm DD.MM.YYYY')}</p>
                        <p>Текст отказа: {theatreRequest.decline_text}</p>
                    </>
                    :
                    <p>Заявки № {id} не существует</p>
            }
            {popup}
        </div>
    );
};

export default MyTheatreRequestPage;