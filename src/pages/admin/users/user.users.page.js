import React from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import no_photo_man from "../../../images/no_photo_man.png";

import {fetchAddUser, fetchEditUser, fetchRemoveUser, loadUser} from "../../../store/admin/usersSlice";
import {loadSchools} from "../../../store/admin/schoolsSlice";

const UserUsersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let {id} = useParams();
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    const user = useSelector(state => state.users.user);
    const {status, statusError} = useSelector(state => state.users);
    const schools = useSelector(state => state.schools);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {

        dispatch(loadSchools());

        if (id) {
            reset();
            dispatch(loadUser({id}));
        }

    }, [id, dispatch]);

    React.useEffect(() => {

        if (status === "sendingError")
            setPopupErrorOpened(true);

    }, [status]);

    const onAddSubmit = (params) => {

        dispatch(fetchAddUser(params));

    }

    const onEditSubmit = (params) => {

        params.id = id;
        dispatch(fetchEditUser(params));

    }

    const onDeleteSubmit = () => {

        dispatch(fetchRemoveUser({id}));

    }

    if (status === "sendingDone")
        return <Navigate to={"/admin/users"}/>

    if (status === "loading" || schools.status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id && (user === null || user.role !== "Пользователь"))
        return <div className='content__section'><p>Данного пользователя не существует</p></div>;

    if (id && user)
        return (
            <>
                <Helmet>
                    <title>Редактирование пользователя ID: {id}</title>
                </Helmet>
                <div className='content__section'>
                    <div className="content__title-block">
                        <Button
                            className="--icon-back --icon-on-before --variant-icon --theme-text"
                            type="button"
                            aria-label="Назад"
                            onClick={() => navigate("/admin/users")}
                        />
                        <h1 className="content__title">Редактирование пользователя ID: {id}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onEditSubmit)} className='form --place-new-user'>
                        <fieldset className='form__section --content-info'>
                            <h2 className="form__title">Основная информация</h2>
                            <div className="profile --place-edit-profile">
                                <p className='profile__text'>Фото</p>
                                <img className='profile__img'
                                     src={user.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man}
                                     alt={""}/>
                            </div>
                            <FieldInput
                                label={"Логин"}
                                placeholder={"Введите логин..."}
                                fieldClassName={"--type-flex"}
                                {...register("login", {value: user.login})}
                            />
                            <FieldInput
                                label={"Email"}
                                placeholder={"Введите email..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("email", {value: user.email})}
                            />
                            <FieldInput
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("fio", {value: user.fio})}
                            />
                            <FieldInput
                                label={"Контактный телефон"}
                                type={"phone"}
                                placeholder={"Введите контактный телефон..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("phone", {value: user.phone})}
                            />
                            <FieldInput
                                label={"Школа"}
                                type={"select"}
                                defaultSelectItem={{
                                    title: "Выберите школу",
                                    value: "",
                                    disabled: false
                                }}
                                selectItems={schools.data.map(item => {
                                    return {
                                        title: item.org_short_name,
                                        value: item.ID,
                                    }
                                }).sort()}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("schoolID", {value: user.schoolID})}
                            />
                        </fieldset>
                        <fieldset className='form__section --content-security'>
                            <h2 className="form__title">Безопасность</h2>
                            <FieldInput
                                label={"Пароль"}
                                type={"password"}
                                placeholder={"Введите новый пароль..."}
                                fieldClassName={"--type-flex"}
                                autoComplete={"new-password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message: "Минимальная длина пароля 6 символов"
                                    }
                                })}
                                errorText={errors?.password && errors.password.message}
                            />
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"radio"}
                                fieldClassName={"--type-checkbox-radio"}
                                {...register("active", {value: user.active === "Активен"})}
                            />
                        </fieldset>
                        <div className="form__controls">
                            <Button text={"Сохранить"} spinnerActive={status === "sending"}/>
                            <Button
                                className={`--theme-text --icon-on-before --icon-trash ${status === "sending" ? "--hide" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPopupOpened(true);
                                }}
                                text={"Удалить"}
                            />

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
                <title>Создание пользователя</title>
            </Helmet>
            <div className='content__section'>
                <div className="content__title-block">
                    <Button
                        className="--icon-back --icon-on-before --variant-icon --theme-text"
                        type="button"
                        aria-label="Назад"
                        onClick={() => navigate("/admin/users")}
                    />
                    <h1 className="content__title">Создание пользователя</h1>
                </div>
                <form onSubmit={handleSubmit(onAddSubmit)} className='form --place-new-user'>
                    <fieldset className='form__section --content-info'>
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Логин"}
                            placeholder={"Введите логин..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("login")}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("email")}
                        />
                        <FieldInput
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("fio")}
                        />
                        <FieldInput
                            label={"Контактный телефон"}
                            type={"phone"}
                            placeholder={"Введите контактный телефон..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("phone")}
                        />
                        <FieldInput
                            label={"Школа"}
                            type={"select"}
                            defaultSelectItem={{
                                title: "Выберите школу",
                                value: "",
                                disabled: false
                            }}
                            selectItems={schools.data.map(item => {
                                return {
                                    title: item.org_short_name,
                                    value: item.ID,
                                }
                            }).sort()}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("schoolID")}
                        />
                    </fieldset>
                    <fieldset className='form__section --content-security'>
                        <h2 className="form__title">Безопасность</h2>
                        <FieldInput
                            label={"Пароль"}
                            type={"password"}
                            placeholder={"Введите пароль..."}
                            fieldClassName={"--type-flex"}
                            autoComplete={"new-password"}
                            required={true}
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message: "Минимальная длина пароля 6 символов"
                                }
                            })}
                            errorText={errors?.password && errors.password.message}
                        />
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

export default UserUsersPage;