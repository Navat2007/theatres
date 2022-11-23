import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useSchoolsStore from "../../../store/admin/schoolsStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Notif from "../../../components/notif/notif.component";
import commonStyles from "../../common.module.scss";

const TeacherPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const { register, handleSubmit, reset } = useForm();

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
        clearErrorText,
    } = useTeachersStore();
    const schools = useSchoolsStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {
        await schools.loadSchools();

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

    const back = () => navigate("/admin/teachers");

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

        const result = await addTeacher(params);

        if (!result.error) back();
    };

    const onEditSubmit = async (params) => {
        if (params.photo.length > 0 && !checkPhoto(params.photo[0])) return;

        params.id = id;
        const result = await editTeacher(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = async () => {
        const result = await removeTeacher({ id });

        if (!result.error) back();
    };

    if (loading || schools.loading) return <p>Загрузка...</p>;

    if (id && teacher === null) return <p>Данного педагога не существует</p>;

    if (id && teacher)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        iconClass={"mdi mdi-arrow-left"}
                        isIconBtn={true}
                        size="small"
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
                            <div className="profile --place-edit-profile">
                                <p className="profile__text">Фото</p>
                                <img
                                    className="profile__img"
                                    src={window.global.baseUrl + teacher.photo}
                                    alt={"Фото педагога"}
                                />
                            </div>
                            <FieldInput
                                label={"Новое фото"}
                                type="file"
                                placeholder={"Выберите фото для замены..."}
                                layout="flex"
                                {...register("photo")}
                            />
                            <FieldInput
                                label={"Фамилия"}
                                placeholder={"Введите фамилию..."}
                                layout="flex"
                                required={true}
                                {...register("f", { value: teacher.f })}
                            />
                            <FieldInput
                                label={"Имя"}
                                placeholder={"Введите имя..."}
                                layout="flex"
                                required={true}
                                {...register("i", { value: teacher.i })}
                            />
                            <FieldInput
                                label={"Отчество"}
                                placeholder={"Введите отчество..."}
                                layout="flex"
                                required={true}
                                {...register("o", { value: teacher.o })}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                layout="flex"
                                required={true}
                                {...register("position", {
                                    value: teacher.position,
                                })}
                            />
                            <FieldInput
                                label={"Педагогический стаж"}
                                placeholder={"Введите педагогический стаж..."}
                                layout="flex"
                                required={true}
                                {...register("experience", {
                                    value: teacher.experience,
                                })}
                            />
                            <FieldInput
                                label={"Описание"}
                                type={"textarea"}
                                rows={5}
                                placeholder={"Введите описание..."}
                                layout="flex"
                                required={true}
                                {...register("text", {
                                    value: teacher.text,
                                })}
                            />
                            <FieldInput
                                label={"Школа"}
                                type={"select"}
                                defaultSelectItem={{
                                    title: "Выберите школу...",
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
                                    value: teacher.schoolID,
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
                            text="Сохранить"
                            spinnerActive={sending}
                        />
                        <Button
                            theme="text"
                            type="button"
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
                                text={"Нет"}
                                theme="text"
                                size={"small"}
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                text={"Да"}
                                theme="info"
                                size={"small"}
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
                    isIconBtn={true}
                    size="small"
                    theme="text"
                    aria-label="Назад"
                    onClick={back}
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
                            label={"Фото"}
                            type="file"
                            placeholder={"Выберите фото..."}
                            layout="flex"
                            {...register("photo")}
                        />
                        <FieldInput
                            label={"Фамилия"}
                            placeholder={"Введите фамилию..."}
                            layout="flex"
                            required={true}
                            {...register("f")}
                        />
                        <FieldInput
                            label={"Имя"}
                            placeholder={"Введите имя..."}
                            layout="flex"
                            required={true}
                            {...register("i")}
                        />
                        <FieldInput
                            label={"Отчество"}
                            placeholder={"Введите отчество..."}
                            layout="flex"
                            required={true}
                            {...register("o")}
                        />
                        <FieldInput
                            label={"Должность"}
                            placeholder={"Введите должность..."}
                            layout="flex"
                            required={true}
                            {...register("position")}
                        />
                        <FieldInput
                            label={"Педагогический стаж"}
                            placeholder={"Введите педагогический стаж..."}
                            layout="flex"
                            required={true}
                            {...register("experience")}
                        />
                        <FieldInput
                            label={"Описание"}
                            type={"textarea"}
                            rows={5}
                            placeholder={"Введите описание..."}
                            layout="flex"
                            required={true}
                            {...register("text")}
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
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default TeacherPage;
