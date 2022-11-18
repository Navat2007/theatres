import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

import useTheatresStore from '../../../store/user/theatresStore';
import useAuthStore from '../../../store/authStore';
import useTeachersStore from '../../../store/admin/teachersStore';
import useSchoolStore from "../../../store/user/schoolStore";

import Notif from '../../../components/notif/notif.component';
import Button from '../../../components/simple/button/button.component';
import TheatreRequest from '../../../components/page_components/theatre_request/theatre_request.component';


const MyTheatrePage = () => {

    let {id} = useParams();
    const navigate = useNavigate();

    const {user} = useAuthStore();
    const {theatre, loadTheatre, addTheatre, editTheatre, loading, error, errorText, clearErrorText} = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {

        await loadTheatre({id});
        await schoolStore.loadSchool({id: user.schoolID});
        await teachersStore.loadTeachers({schoolID: user.schoolID});

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

    const onAddSubmit = async (params) => {

        params.theatreID = 0;
        params.schoolID = user.schoolID;

        const result = await addTheatre(params);

        if (!result.error) {
            back();
        }

    };

    const onEditSubmit = async (params) => {

        params.theatreID = id;
        params.schoolID = user.schoolID;

        console.log(theatre);
        console.log(params);

        return;

        const result = await addTheatre(params);

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
                            const result = await editTheatre({id, status: 5});

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

    if (id && theatre === null)
        return <div className='content__section'><p>Театр не найден</p></div>;

    return (<div className='content__section'>
        {
            (id && theatre)
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
                            onClick={() => setEdit(false)}
                        />
                        <h1 className='content__title --mb-small'>Редактирование театра ID: {id} </h1>
                    </div>
                    <TheatreRequest request={theatre} onSubmitDone={onEditSubmit} onBack={() => setEdit(false)}/>
                </>
                :
                <>
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
                        <h1 className='content__title --mb-small'>Новая заявка на театр </h1>
                    </div>
                    <TheatreRequest onSubmitDone={onAddSubmit} onBack={() => setEdit(false)}/>
                </>
        }
        {popup}
    </div>);

};

export default MyTheatrePage;
