import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Popup from "../../../components/popup/popup.component";


import no_photo_man from '../../../images/no_photo_man.png';
import useUsersStore from "../../../store/admin/usersStore";

const AdminUsersPage = () => {

    const navigate = useNavigate();

    let { id } = useParams();
    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();
    const {admin, loadAdmin, addAdmin, editAdmin, removeAdmin, loading, sending, error, errorText, clearErrorText} = useUsersStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {

        if (id) {
            reset();
            loadAdmin({ id });
        }

    }, [id]);

    React.useEffect(() => {

        if (error.admins)
            setPopupErrorOpened(true);

    }, [error.admins]);

    const back = () => navigate("/admin/users");

    const onAddSubmit = async (params) => {

        const result = await addAdmin(params);

        if(!result.error) back();

    }

    const onEditSubmit = async (params) => {

        params.id = id;
        const result = await editAdmin(params);

        if(!result.error) back();

    }

    const onDeleteSubmit = async () => {

        const result = await removeAdmin({ id });

        if(!result.error) back();

    }

    if (loading.admins)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id && (admin === null || admin.role === "Пользователь"))
        return <div className='content__section'><p>Данного администратора не существует</p></div>;

    if (id && admin)
        return (<>
            <div className='content__section'>
                <div className="content__title-block">
                    <Button
                        type='button'
                        theme='text'
                        size='small'
                        isIconBtn={true}
                        iconClass='mdi mdi-arrow-left'
                        aria-label="Назад"
                        onClick={() => back()}
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
                                alt={""} />
                        </div>
                        <FieldInput
                            label={"Логин"}
                            placeholder={"Введите логин..."}
                            layout='flex'
                            {...register("login", { value: admin.login })}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            layout='flex'
                            required={true}
                            {...register("email", { value: admin.email })}
                        />
                        <FieldInput
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            layout='flex'
                            required={true}
                            {...register("fio", { value: admin.fio })}
                        />
                        <FieldInput
                            label={"Контактный телефон"}
                            type={"phone"}
                            placeholder={"Введите контактный телефон..."}
                            layout='flex'
                            required={true}
                            {...register("phone", { value: admin.phone })}
                        />
                        <FieldInput
                            label={"Наименование организации"}
                            placeholder={"Введите наименование организации..."}
                            layout='flex'
                            required={true}
                            {...register("org_name", { value: admin.org_name })}
                        />
                    </fieldset>
                    <fieldset className='form__section --content-security'>
                        <h2 className="form__title">Безопасность</h2>
                        <FieldInput
                            label={"Пароль"}
                            type={"password"}
                            placeholder={"Введите новый пароль..."}
                            layout='flex'
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
                            type={"checkbox_variant"}
                            {...register("active", { value: admin.active === "Активен" })}
                        />
                    </fieldset>
                    <fieldset className='form__section --content-access'>
                        <h2 className="form__title">Права доступа</h2>
                        <FieldInput
                            id={"id_1"}
                            label={"Главный администратор"}
                            type={"checkbox_variant"}
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
                            type={"checkbox_variant"}
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
                        <Button
                            type='submit'
                            text={"Сохранить"}
                            spinnerActive={sending.admins} />
                        <Button
                            type='button'
                            iconClass={'mdi mdi-delete'}
                            theme='text'
                            extraClass={`${sending.admins ? "--hide" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPopupOpened(true);
                            }}
                            text="Удалить"
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
                    buttons={<>
                        <Button
                            type='button'
                            text={"Да"}
                            onClick={() => {
                                setPopupOpened(false);
                                onDeleteSubmit();
                            }}
                        />
                        <Button
                            type='button'
                            text={"Нет"}
                            theme='text'
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
                        text: errorText.admins,
                    }}
                    opened={popupErrorOpened}
                    onClose={() => {
                        clearErrorText();
                        setPopupErrorOpened(false)
                    }}
                />
            </div>
        </>
        );

    return (<>
        <div className='content__section'>
            <div className="content__title-block">
                <Button
                    type='button'
                    theme='text'
                    size='small'
                    isIconBtn={true}
                    iconClass='mdi mdi-arrow-left'
                    aria-label="Назад"
                    onClick={() => back()}
                />
                <h1 className="content__title">Создание администратора</h1>
            </div>
            <form onSubmit={handleSubmit(onAddSubmit)} className='form --place-new-user'>
                <fieldset className='form__section --content-info'>
                    <h2 className="form__title">Основная информация</h2>
                    <FieldInput
                        label={"Логин"}
                        placeholder={"Введите логин..."}
                        layout='flex'
                        required={true}
                        {...register("login")}
                    />
                    <FieldInput
                        label={"Email"}
                        placeholder={"Введите email..."}
                        layout='flex'
                        required={true}
                        {...register("email")}
                    />
                    <FieldInput
                        label={"ФИО"}
                        placeholder={"Введите фио..."}
                        layout='flex'
                        required={true}
                        {...register("fio")}
                    />
                    <FieldInput
                        label={"Контактный телефон"}
                        type={"phone"}
                        placeholder={"Введите контактный телефон..."}
                        layout='flex'
                        required={true}
                        {...register("phone")}
                    />
                    <FieldInput
                        label={"Наименование организации"}
                        placeholder={"Введите наименование организации..."}
                        layout='flex'
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
                        layout='flex'
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
                        type={"checkbox_variant"}
                        {...register("active", { value: true })}
                    />
                </fieldset>
                <fieldset className='form__section --content-access'>
                    <h2 className="form__title">Права доступа</h2>
                    <FieldInput
                        id={"id_1"}
                        label={"Главный администратор"}
                        type={"checkbox_variant"}
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
                        type={"checkbox_variant"}
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
                    <Button
                        type='submit'
                        text={"Создать"}
                        spinnerActive={sending.admins} />
                </div>
            </form>
            <Popup
                title={"Ошибка!"}
                notif={{
                    active: true,
                    state: "error",
                    text: errorText.admins,
                }}
                opened={popupErrorOpened}
                onClose={() => {
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </div>
    </>
    );
};

export default AdminUsersPage;