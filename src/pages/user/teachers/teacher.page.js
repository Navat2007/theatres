import React from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

import Button from "../../../components/simple/button/button.component";
import Popup from "../../../components/popup/popup.component";
import FieldInput from "../../../components/simple/field/field.input.component";

import {clear, fetchAddTeacher, fetchEditTeacher, loadTeacher} from "../../../store/admin/teachersSlice";

const TeacherPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    const user = useSelector(state => state.auth.user);
    const {teacher, status, statusError} = useSelector(state => state.teachers);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {

        if (id) {
            reset();
            dispatch(loadTeacher({id}));
        }

    }, [id, dispatch]);

    React.useEffect(() => {

        if (status === "sendingError")
            setPopupErrorOpened(true);

    }, [status]);

    const onClose = () => {

        dispatch(clear());
        navigate("/user/teachers");

    }

    const onAddSubmit = (params) => {

        params.schoolID = user.schoolID;
        dispatch(fetchAddTeacher(params));

    }

    const onEditSubmit = (params) => {

        params.id = id;
        params.schoolID = user.schoolID;
        dispatch(fetchEditTeacher(params));

    }

    const onDeleteSubmit = () => {



    }

    if (status === "sendingDone")
        return <Navigate to={"/user/teachers"}/>

    if (status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id && teacher === null)
        return <div className='content__section'><p>Данного педагога не существует</p></div>;

    if (id && teacher)
        return (
            <>
                <Helmet>
                    <title>Редактирование педагога ID: {id}</title>
                </Helmet>
                <div className='content__section'>
                    <div className="content__title-block">
                        <Button
                            extraClass="--icon-back --icon-on-before --variant-icon "
                            theme="text"
                            type="button"
                            aria-label="Назад"
                            onClick={onClose}
                        />
                        <h1 className="content__title">Редактирование педагога ID: {id}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onEditSubmit)} className='form --place-new-user'>
                        <fieldset className='form__section --content-info'>
                            <h2 className="form__title">Основная информация</h2>
                            <div className="profile --place-edit-profile">
                                <p className='profile__text'>Фото</p>
                                <img className='profile__img'
                                     src={window.global.baseUrl + teacher.photo}
                                     alt={""}/>
                            </div>
                            <FieldInput
                                label={"Новое фото"}
                                type="file"
                                placeholder={"Выберите фото для замены..."}
                                fieldClassName={"--type-flex"}
                                {...register("photo")}
                            />
                            <FieldInput
                                label={"Фамилия"}
                                placeholder={"Введите фамилию..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("f", {value: teacher.f})}
                            />
                            <FieldInput
                                label={"Имя"}
                                placeholder={"Введите имя..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("i", {value: teacher.i})}
                            />
                            <FieldInput
                                label={"Отчество"}
                                placeholder={"Введите отчество..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("o", {value: teacher.o})}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("position", {value: teacher.position})}
                            />
                            <FieldInput
                                label={"Педагогический стаж"}
                                placeholder={"Введите педагогический стаж..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("experience", {value: teacher.experience})}
                            />
                            <FieldInput
                                label={"Описание"}
                                type={"textarea"}
                                rows={5}
                                placeholder={"Введите описание..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("text", {value: teacher.text})}
                            />
                        </fieldset>
                        <fieldset className='form__section --content-security'>
                            <h2 className="form__title">Безопасность</h2>
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"radio"}
                                fieldClassName={"--type-checkbox-radio"}
                                {...register("active", {value: teacher.active === "Активен"})}
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
        <>
            <Helmet>
                <title>Создание педагога</title>
            </Helmet>
            <div className='content__section'>
                <div className="content__title-block">
                    <Button
                        extraClass="--icon-back --icon-on-before --variant-icon"
                        theme="text"
                        type="button"
                        aria-label="Назад"
                        onClick={onClose}
                    />
                    <h1 className="content__title">Создание пользователя</h1>
                </div>
                <form onSubmit={handleSubmit(onAddSubmit)} className='form --place-new-user'>
                    <fieldset className='form__section --content-info'>
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Фото"}
                            type="file"
                            placeholder={"Выберите фото..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("photo")}
                        />
                        <FieldInput
                            label={"Фамилия"}
                            placeholder={"Введите фамилию..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("f")}
                        />
                        <FieldInput
                            label={"Имя"}
                            placeholder={"Введите имя..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("i")}
                        />
                        <FieldInput
                            label={"Отчество"}
                            placeholder={"Введите отчество..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("o")}
                        />
                        <FieldInput
                            label={"Должность"}
                            placeholder={"Введите должность..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("position")}
                        />
                        <FieldInput
                            label={"Педагогический стаж"}
                            placeholder={"Введите педагогический стаж..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("experience")}
                        />
                        <FieldInput
                            label={"Описание"}
                            type={"textarea"}
                            rows={5}
                            placeholder={"Введите описание..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("text")}
                        />
                    </fieldset>
                    <fieldset className='form__section --content-security'>
                        <h2 className="form__title">Безопасность</h2>
                        <FieldInput
                            label={"Активировать учетную запись?"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("active", {value: true})}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button text={"Создать"} spinnerActive={status === "sending"}/>
                    </div>
                </form>
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

};

export default TeacherPage;