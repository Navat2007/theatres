import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuthStore from "../../../store/authStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Button from "../../../components/button/button.component";
import Popup from "../../../components/popup/popup.component";
import FieldInput from "../../../components/field/field.input.component";
import Notif from "../../../components/notif/notif.component";
import commonStyles from "../../common.module.scss";

import noPhoto from "../../../images/no_photo_man.png";

const TeacherPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { user } = useAuthStore();
    const {
        teacher,
        loadTeacher,
        addTeacher,
        editTeacher,
        removeTeacher,
        loading,
        sending,
        error,
        errorText,
        setErrorText,
        cleatErrorText,
    } = useTeachersStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {
        if (id) {
            reset();
            await loadTeacher({ id });
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    React.useEffect(() => {
        if (error) setPopupErrorOpened(true);
    }, [error]);

    const back = () => navigate("/user/teachers");

    const checkPhoto = (file) => {
        if (!file) {
            setErrorText("Файл не читается.");
            setPopupErrorOpened(true);
            return false;
        }

        if (file.type.match("image.*")) {
            if (file.size <= 1500000) {
            } else {
                setErrorText("Файл больше 1,5 Мб.");
                setPopupErrorOpened(true);
                return false;
            }
        } else {
            setErrorText("Файл должен быть изображением.");
            setPopupErrorOpened(true);
            return false;
        }

        return true;
    };

    const onAddSubmit = async (params) => {
        if (params.photo.length > 0 && !checkPhoto(params.photo[0])) return;

        params.schoolID = user.schoolID;
        const result = await addTeacher(params);

        if (!result.error) back();
    };

    const onEditSubmit = async (params) => {
        if (params.photo.length > 0 && !checkPhoto(params.photo[0])) return;

        params.id = id;
        params.schoolID = user.schoolID;
        const result = await editTeacher(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = async () => {
        const result = await removeTeacher({ id });

        if (!result.error) back();
    };

    if (loading) return <p>Загрузка...</p>;

    if (id && (teacher === null || teacher.schoolID !== user.schoolID))
        return <p>Данного педагога не существует</p>;

    if (id && teacher)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        isIconBtn={true}
                        iconClass={"mdi mdi-arrow-left"}
                        theme="text"
                        aria-label="Назад"
                        onClick={back}
                    />
                    <h1 className={commonStyles.title}>
                        Редактирование педагога ID: {id}
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
                                            teacher.photo
                                                ? window.global.baseUrl +
                                                  teacher.photo
                                                : noPhoto
                                        }
                                        alt={
                                            teacher.photo
                                                ? teacher.photo
                                                : "Нет фото"
                                        }
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
                            {/* После реализации удалить поле ниже */}
                            <FieldInput
                                label={"Новое фото"}
                                type="file"
                                placeholder={"Выберите фото для замены..."}
                                layout={"flex"}
                                {...register("photo")}
                            />
                            <FieldInput
                                label={"Фамилия"}
                                placeholder={"Введите фамилию..."}
                                layout={"flex"}
                                required={true}
                                {...register("f", { value: teacher.f })}
                            />
                            <FieldInput
                                label={"Имя"}
                                placeholder={"Введите имя..."}
                                layout={"flex"}
                                required={true}
                                {...register("i", { value: teacher.i })}
                            />
                            <FieldInput
                                label={"Отчество"}
                                placeholder={"Введите отчество..."}
                                layout={"flex"}
                                required={true}
                                {...register("o", { value: teacher.o })}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                layout={"flex"}
                                required={true}
                                {...register("position", {
                                    value: teacher.position,
                                })}
                            />
                            <FieldInput
                                label={"Педагогический стаж"}
                                placeholder={"Введите педагогический стаж..."}
                                layout={"flex"}
                                required={true}
                                {...register("experience", {
                                    value: teacher.experience,
                                })}
                            />
                            <FieldInput
                                label={"О себе"}
                                type={"textarea"}
                                rows={5}
                                placeholder={"Введите описание..."}
                                layout={"flex"}
                                required={true}
                                {...register("text", {
                                    value: teacher.text,
                                })}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Отображение</h2>
                            <FieldInput
                                label={"Доступен для выбора?"}
                                type={"checkbox_variant"}
                                {...register("active", {
                                    value: teacher.active === "Активен",
                                })}
                            />
                        </fieldset>
                    </div>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text={"Сохранить"}
                            spinnerActive={sending}
                        />
                        <Button
                            type="button"
                            theme="text"
                            iconClass={"mdi mdi-delete"}
                            spinnerActive={sending}
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
                                size={"small"}
                                text={"Нет"}
                                theme="text"
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type="button"
                                size={"small"}
                                theme="info"
                                text={"Да"}
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
                    text={errorText}
                    opened={popupErrorOpened}
                    onClose={() => {
                        cleatErrorText();
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
                    isIconBtn={true}
                    iconClass={"mdi mdi-arrow-left"}
                    theme="text"
                    aria-label="Назад"
                    onClick={back}
                />
                <h1 className={commonStyles.title}>Создание педагога</h1>
            </div>
            <form
                onSubmit={handleSubmit(onAddSubmit)}
                className="form"
            >
                <div className="form__container --view-two-columns">
                    <fieldset className="form__section">
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Фото"}
                            type="file"
                            placeholder={"Выберите фото..."}
                            layout={"flex"}
                            {...register("photo")}
                        />
                        <FieldInput
                            label={"Фамилия"}
                            placeholder={"Введите фамилию..."}
                            layout={"flex"}
                            required={true}
                            {...register("f")}
                        />
                        <FieldInput
                            label={"Имя"}
                            placeholder={"Введите имя..."}
                            layout={"flex"}
                            required={true}
                            {...register("i")}
                        />
                        <FieldInput
                            label={"Отчество"}
                            placeholder={"Введите отчество..."}
                            layout={"flex"}
                            required={true}
                            {...register("o")}
                        />
                        <FieldInput
                            label={"Должность"}
                            placeholder={"Введите должность..."}
                            layout={"flex"}
                            required={true}
                            {...register("position")}
                        />
                        <FieldInput
                            label={"Педагогический стаж"}
                            placeholder={"Введите педагогический стаж..."}
                            layout={"flex"}
                            required={true}
                            {...register("experience")}
                        />
                        <FieldInput
                            label={"О себе"}
                            type={"textarea"}
                            rows={5}
                            placeholder={"Введите описание..."}
                            layout={"flex"}
                            required={true}
                            {...register("text")}
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">Отображение</h2>
                        <FieldInput
                            label={"Доступен для выбора?"}
                            type={"checkbox_variant"}
                            {...register("active", {
                                value: true,
                            })}
                        />
                    </fieldset>
                </div>
                <div className="form__controls">
                    <Button
                        type="submit"
                        text={"Создать"}
                        spinnerActive={sending}
                    />
                </div>
            </form>
            <Notif
                title={"Ошибка!"}
                state="error"
                text={errorText}
                opened={popupErrorOpened}
                onClose={() => {
                    cleatErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default TeacherPage;
