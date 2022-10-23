import React from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import {fetchEditSchool, loadSchool} from "../../../store/admin/schoolsSlice";
import no_photo_man from "../../../images/no_photo_man.png";

const SchoolPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    const school = useSelector(state => state.schools.school);
    const {status, statusError} = useSelector(state => state.schools);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {

        if (id) {
            reset();
            dispatch(loadSchool({id}));
        }

    }, [id, dispatch]);

    React.useEffect(() => {

        if (status === "sendingError")
            setPopupErrorOpened(true);

    }, [status]);

    const onEditSubmit = (params) => {

        params.id = id;
        dispatch(fetchEditSchool(params));

    }

    const onDeleteSubmit = () => {



    }

    if (status === "sendingDone")
        return <Navigate to={"/admin/schools"}/>

    if (status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id && school === null)
        return <div className='content__section'><p>Данной школы не существует</p></div>;

    if (id && school)
        return (
            <>
                <Helmet>
                    <title>Редактирование школы ID: {id}</title>
                </Helmet>
                <div className='content__section'>
                    <div className="content__title-block">
                        <Button
                            className="--icon-back --icon-on-before --variant-icon --theme-text"
                            type="button"
                            aria-label="Назад"
                            onClick={() => navigate("/admin/schools")}
                        />
                        <h1 className="content__title">Редактирование школы ID: {id}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onEditSubmit)} className='form --place-new-user'>
                        <fieldset className='form__section --content-info'>
                            <h2 className="form__title">Основная информация</h2>
                            <div className="profile --place-edit-profile">
                                <p className='profile__text'>Фото</p>
                                <img className='profile__img'
                                     src={school.photo}
                                     alt={""}/>
                            </div>
                            <FieldInput
                                label={"Полное наименование организации"}
                                type={"textarea"}
                                rows={5}
                                placeholder={"Введите полное наименование организации..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("org_name", {value: school.org_name})}
                            />
                            <FieldInput
                                label={"Краткое наименование организации"}
                                placeholder={"Введите краткое наименование организации..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("org_short_name", {value: school.org_short_name})}
                            />
                            <FieldInput
                                label={"ФИО директора"}
                                placeholder={"Введите фио директора..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("dir_fio", {value: school.dir_fio})}
                            />
                            <FieldInput
                                label={"E-mail директора"}
                                placeholder={"Введите email директора..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("dir_email", {value: school.dir_email})}
                            />
                            <FieldInput
                                label={"Контактный телефон директора"}
                                placeholder={"Введите телефон директора..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("dir_phone", {value: school.dir_phone})}
                            />
                            <FieldInput
                                label={"Адрес"}
                                type={"textarea"}
                                rows={3}
                                placeholder={"Введите адрес..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("address", {value: school.address})}
                            />
                        </fieldset>
                        <div className="form__controls">
                            <Button text={"Сохранить"} spinnerActive={status === "sending"}/>
                            {/*<Button*/}
                            {/*    className={`--theme-text --icon-on-before --icon-trash ${status === "sending" ? "--hide" : ""}`}*/}
                            {/*    onClick={(e) => {*/}
                            {/*        e.preventDefault();*/}
                            {/*        setPopupOpened(true);*/}
                            {/*    }}*/}
                            {/*    text={"Удалить"}*/}
                            {/*/>*/}
                        </div>
                    </form>
                    <Popup
                        title={"Вы уверены что хотите удалить?"}
                        notif={{
                            active: true,
                        }}
                        opened={popupOpened}
                        onClose={() => setPopupOpened(false)}
                        buttons={
                            <>
                                <Button
                                    text={"Да"}
                                    onClick={() => {
                                        setPopupOpened(false);
                                        onDeleteSubmit();
                                    }}
                                />
                                <Button
                                    text={"Нет"}
                                    className='--theme-text'
                                    onClick={() => setPopupOpened(false)}
                                />
                            </>
                        }
                    />
                    <Popup
                        title={"Ошибка!"}
                        notif={{
                            active: true,
                            state: "error",
                            text: statusError,
                        }}
                        opened={popupErrorOpened}
                        onClose={() => setPopupErrorOpened(false)}
                    />
                </div>
            </>
        );

    return (
        <div className='content__section'>
            {
                !id && <p>Новая школа</p>
            }
        </div>
    );
};

export default SchoolPage;