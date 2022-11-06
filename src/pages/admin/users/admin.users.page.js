import React from 'react';
import {useNavigate, useParams, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import {fetchAddAdmin, fetchEditAdmin, fetchRemoveAdmin, loadAdmin} from "../../../store/admin/adminsSlice";

import no_photo_man from '../../../images/no_photo_man.png';

const AdminUsersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let {id} = useParams();
    const {register, setValue, handleSubmit, reset, formState: { errors }} = useForm();

    const admin = useSelector(state => state.admins.admin);
    const {status, statusError} = useSelector(state => state.admins);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {

        if(id){
            reset();
            dispatch(loadAdmin({id}));
        }

    }, [id, dispatch]);

    React.useEffect(() => {

        if(status === "sendingError")
            setPopupErrorOpened(true);

    }, [status]);

    const onAddSubmit = (params) => {

        dispatch(fetchAddAdmin(params));

    }

    const onEditSubmit = (params) => {

        params.id = id;
        dispatch(fetchEditAdmin(params));

    }

    const onDeleteSubmit = () => {

        dispatch(fetchRemoveAdmin({id}));

    }

    if (status === "sendingDone")
        return <Navigate to={"/admin/users"}/>

    if (status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id && (admin === null || admin.role === "Пользователь"))
        return <div className='content__section'><p>Данного администратора не существует</p></div>;

    if (id && admin)
        return (
            <>
                <Helmet>
                    <title>Редактирование администратора ID: {id}</title>
                </Helmet>
                <div className='content__section'>
                    <div className="content__title-block">
                        <Button
                            className="--icon-back --icon-on-before --variant-icon --theme-text"
                            type="button"
                            aria-label="Назад"
                            onClick={() => navigate("/admin/users")}
                        />
                        <h1 className="content__title">Редактирование администратора ID: {id}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onEditSubmit)} className='form --place-new-user'>
                        <fieldset className='form__section --content-info'>
                            <h2 className="form__title">Основная информация</h2>
                            <div className="profile --place-edit-profile">
                                <p className='profile__text'>Фото</p>
                                <img className='profile__img'
                                     src={admin.photo !== "" ? window.global.baseUrl + admin.photo : no_photo_man}
                                     alt={""}/>
                            </div>
                            <FieldInput
                                label={"Логин"}
                                placeholder={"Введите логин..."}
                                fieldClassName={"--type-flex"}
                                {...register("login", {value: admin.login})}
                            />
                            <FieldInput
                                label={"Email"}
                                placeholder={"Введите email..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("email", {value: admin.email})}
                            />
                            <FieldInput
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("fio", {value: admin.fio})}
                            />
                            <FieldInput
                                label={"Контактный телефон"}
                                type={"phone"}
                                placeholder={"Введите контактный телефон..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("phone", {value: admin.phone})}
                            />
                            <FieldInput
                                label={"Наименование организации"}
                                placeholder={"Введите наименование организации..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("org_name", {value: admin.org_name})}
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
                                {...register("active", {value: admin.active === "Активен"})}
                            />
                        </fieldset>
                        <fieldset className='form__section --content-access'>
                            <h2 className="form__title">Права доступа</h2>
                            <FieldInput
                                id={"id_1"}
                                label={"Главный администратор"}
                                type={"radio"}
                                fieldClassName={"--type-checkbox-radio"}
                                {...register("superadmin", {
                                    value: admin.role === "Главный администратор",
                                    onChange: (e) => {
                                        if (e.target.checked) {
                                            setValue("admin", false);
                                        }
                                    }
                                })}
                            />
                            <FieldInput
                                id={"id_2"}
                                label={"Администратор"}
                                type={"radio"}
                                fieldClassName={"--type-checkbox-radio"}
                                {...register("admin", {
                                    value: admin.role === "Администратор",
                                    onChange: (e) => {
                                        if (e.target.checked) {
                                            setValue("superadmin", false);
                                        }
                                    }
                                })}
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
                <title>Создание администратора</title>
            </Helmet>
            <div className='content__section'>
                <div className="content__title-block">
                    <Button
                        className="--icon-back --icon-on-before --variant-icon --theme-text"
                        type="button"
                        aria-label="Назад"
                        onClick={() => navigate("/admin/users")}
                    />
                    <h1 className="content__title">Создание администратора</h1>
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
                            label={"Наименование организации"}
                            placeholder={"Введите наименование организации..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("org_name")}
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
                    <fieldset className='form__section --content-access'>
                        <h2 className="form__title">Права доступа</h2>
                        <FieldInput
                            id={"id_1"}
                            label={"Главный администратор"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("superadmin", {
                                value: true,
                                onChange: (e) => {
                                    if (e.target.checked) {
                                        setValue("admin", false);
                                    }
                                }
                            })}
                        />
                        <FieldInput
                            id={"id_2"}
                            label={"Администратор"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("admin", {
                                onChange: (e) => {
                                    if (e.target.checked) {
                                        setValue("superadmin", false);
                                    }
                                }
                            })}
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

export default AdminUsersPage;