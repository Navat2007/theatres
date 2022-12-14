import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";
import useSchoolsStore from "../../../store/admin/schoolsStore";

import Button from "../../../components/button/button.component";
import FieldInput from "../../../components/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import no_photo_man from "../../../images/no_photo_man.png";
import Notif from "../../../components/notif/notif.component";
import commonStyles from "../../common.module.scss";

const UserUsersPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        user,
        loadUser,
        addUser,
        editUser,
        removeUser,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useUsersStore();
    const schools = useSchoolsStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {
        await schools.loadSchools();

        if (id) {
            reset();
            await loadUser({ id });
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    React.useEffect(() => {
        if (error.users) setPopupErrorOpened(true);
    }, [error.users]);

    const back = () => navigate("/admin/users");

    const onAddSubmit = async (params) => {
        const result = await addUser(params);

        if (!result.error) back();
    };

    const onEditSubmit = async (params) => {
        params.id = id;
        const result = await editUser(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = async () => {
        const result = await removeUser({ id });

        if (!result.error) back();
    };

    if (loading.users || schools.loading) return <p>Загрузка...</p>;

    if (id && (user === null || user.role !== "Пользователь"))
        return <p>Данного пользователя не существует</p>;

    if (id && user)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        theme="text"
                        iconClass={"mdi mdi-arrow-left"}
                        size="small"
                        isIconBtn={true}
                        aria-label="Назад"
                        onClick={() => back()}
                    />
                    <h1 className={commonStyles.title}>
                        Редактирование пользователя ID: {id}
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onEditSubmit)}
                    className="form"
                >
                    <div className="form__container --view-two-columns">
                        <fieldset className="form__section">
                            <h2 className="form__title">Основная информация</h2>
                            {/* Фото педагога - новый блок со сменой фото */}
                            <div className="form__multy-block">
                                <p className="form__label">Фото</p>
                                <div className="form__profile-img-block">
                                    <img
                                        className="form__profile-img"
                                        src={
                                            user.photo !== ""
                                                ? window.global.baseUrl + user.photo
                                                : no_photo_man
                                        }
                                        alt={""}
                                    />
                                    <div className="form__profile-img-panel">
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-refresh"}
                                            aria-label={"Обновить фото"}
                                            title={"Обновить фото"}
                                        />
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-close"}
                                            aria-label={"Удалить фото"}
                                            title={"Удалить фото"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FieldInput
                                label={"Логин"}
                                placeholder={"Введите логин..."}
                                layout="flex"
                                {...register("login", {
                                    value: user.login,
                                })}
                            />
                            <FieldInput
                                label={"Email"}
                                placeholder={"Введите email..."}
                                layout="flex"
                                required={true}
                                {...register("email", {
                                    value: user.email,
                                })}
                            />
                            <FieldInput
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                layout="flex"
                                required={true}
                                {...register("fio", { value: user.fio })}
                            />
                            <FieldInput
                                label={"Контактный телефон"}
                                type={"phone"}
                                placeholder={"Введите контактный телефон..."}
                                layout="flex"
                                required={true}
                                {...register("phone", {
                                    value: user.phone,
                                })}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                layout="flex"
                                required={true}
                                {...register("position", { value: user.position })}
                            />
                            <FieldInput
                                label={"Школа"}
                                type={"select"}
                                defaultSelectItem={{
                                    title: "Выберите школу",
                                    value: "",
                                    disabled: false,
                                }}
                                selectItems={schools.schools
                                    .map((item) => {
                                        return {
                                            title: item.org_short_name,
                                            value: item.ID,
                                        };
                                    })
                                    .sort()}
                                layout="flex"
                                required={true}
                                {...register("schoolID", {
                                    value: user.schoolID,
                                })}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Безопасность</h2>
                            <FieldInput
                                label={"Пароль"}
                                type={"password"}
                                placeholder={"Введите новый пароль..."}
                                layout="flex"
                                autoComplete={"new-password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Минимальная длина пароля 6 символов",
                                    },
                                })}
                                errorText={
                                    errors?.password && errors.password.message
                                }
                            />
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"checkbox_variant"}
                                {...register("active", {
                                    value: user.active === "Активен",
                                })}
                            />
                        </fieldset>
                    </div>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text={"Сохранить"}
                            spinnerActive={sending.users}
                        />
                        <Button
                            type="button"
                            theme="text"
                            iconClass={"mdi mdi-delete"}
                            extraClass={`${sending.users ? "--hide" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPopupOpened(true);
                            }}
                            text={"Удалить"}
                        />
                    </div>
                </form>
                <Notif
                    text={"Вы уверены что хотите удалить?"}
                    opened={popupOpened}
                    onClose={() => setPopupOpened(false)}
                    buttons={
                        <>
                            <Button
                                type="button"
                                text={"Нет"}
                                size="size"
                                theme="text"
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type="button"
                                text={"Да"}
                                size="size"
                                theme={"info"}
                                onClick={() => {
                                    setPopupOpened(false);
                                    onDeleteSubmit();
                                }}
                            />
                        </>
                    }
                />
                <Notif
                    title={"Ошибка!"}
                    state="error"
                    text={errorText.users}
                    opened={popupErrorOpened}
                    onClose={() => {
                        clearErrorText();
                        setPopupErrorOpened(false);
                    }}
                />
            </>
        );

    return (
        <>
            <div className={commonStyles.title_block}>
                <Button
                    type="button"
                    iconClass={"mdi mdi-arrow-left"}
                    theme="text"
                    aria-label="Назад"
                    onClick={() => back()}
                />
                <h1 className={commonStyles.title}>Создание пользователя</h1>
            </div>
            <form
                onSubmit={handleSubmit(onAddSubmit)}
                className="form"
            >
                <div className="form__container --view-two-columns">
                    <fieldset className="form__section">
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Логин"}
                            placeholder={"Введите логин..."}
                            layout="flex"
                            required={true}
                            {...register("login")}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            layout="flex"
                            required={true}
                            {...register("email")}
                        />
                        <FieldInput
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            layout="flex"
                            required={true}
                            {...register("fio")}
                        />
                        <FieldInput
                            label={"Контактный телефон"}
                            type={"phone"}
                            placeholder={"Введите контактный телефон..."}
                            layout="flex"
                            required={true}
                            {...register("phone")}
                        />
                        <FieldInput
                            label={"Школа"}
                            type={"select"}
                            defaultSelectItem={{
                                title: "Выберите школу",
                                value: "",
                                disabled: false,
                            }}
                            selectItems={schools.schools
                                .map((item) => {
                                    return {
                                        title: item.org_short_name,
                                        value: item.ID,
                                    };
                                })
                                .sort()}
                            layout="flex"
                            required={true}
                            {...register("schoolID")}
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">Безопасность</h2>
                        <FieldInput
                            label={"Пароль"}
                            type={"password"}
                            placeholder={"Введите пароль..."}
                            layout="flex"
                            autoComplete={"new-password"}
                            required={true}
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message:
                                        "Минимальная длина пароля 6 символов",
                                },
                            })}
                            errorText={
                                errors?.password && errors.password.message
                            }
                        />
                        <FieldInput
                            label={"Активировать учетную запись?"}
                            type={"checkbox_variant"}
                            {...register("active", { value: true })}
                        />
                    </fieldset>
                </div>
                <div className="form__controls">
                    <Button
                        type="submit"
                        text={"Создать"}
                        spinnerActive={sending.users}
                    />
                </div>
            </form>
            <Notif
                title={"Ошибка!"}
                state="error"
                text={errorText.users}
                opened={popupErrorOpened}
                onClose={() => {
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default UserUsersPage;
