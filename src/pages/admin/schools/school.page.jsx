import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useSchoolsStore from "../../../store/admin/schoolsStore";

import Button from "../../../components/button/button.component";
import FieldInput from "../../../components/field/field.input.component";
import Notif from "../../../components/notif/notif.component";
import commonStyles from "../../common.module.scss";
import noImage from "../../../images/no_image.png";

const SchoolPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        school,
        loadSchool,
        editSchool,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useSchoolsStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {
        reset();
        await loadSchool({ id });
    };

    React.useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    React.useEffect(() => {
        if (error) setPopupErrorOpened(true);
    }, [error]);

    const back = () => navigate("/admin/schools");

    const onEditSubmit = async (params) => {
        params.id = id;
        const result = await editSchool(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = () => {};

    if (loading) return <p>Загрузка...</p>;

    if (id && school === null) return <p>Данной школы не существует</p>;

    if (id && school)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        theme="text"
                        size="small"
                        isIconBtn={true}
                        iconClass="mdi mdi-arrow-left"
                        aria-label="Назад"
                        onClick={() => back()}
                    />
                    <h1 className={commonStyles.title}>
                        Редактирование школы ID: {id}
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onEditSubmit)}
                    className="form"
                >
                    <div className="form__container --view-one-column">
                        <fieldset className="form__section">
                            <h2 className="form__title">Основная информация</h2>
                            {/* Фото педагога - новый блок со сменой фото */}
                            <div className="form__multy-block">
                                <p className="form__label">Фото</p>
                                <div className="form__profile-img-block">
                                    <img
                                        className="form__profile-img"
                                        src={
                                            school.photo
                                                ? window.global.baseUrl +
                                                  school.photo
                                                : noImage
                                        }
                                        alt={
                                            school.photo
                                                ? school.photo
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
                            <FieldInput
                                label={"Полное наименование организации"}
                                type={"textarea"}
                                rows={5}
                                placeholder={
                                    "Введите полное наименование организации..."
                                }
                                layout="flex"
                                required={true}
                                {...register("org_name", {
                                    value: school.org_name,
                                })}
                            />
                            <FieldInput
                                label={"Краткое наименование организации"}
                                placeholder={
                                    "Введите краткое наименование организации..."
                                }
                                layout="flex"
                                required={true}
                                {...register("org_short_name", {
                                    value: school.org_short_name,
                                })}
                            />
                            <FieldInput
                                label={"ФИО директора"}
                                placeholder={"Введите фио директора..."}
                                layout="flex"
                                required={true}
                                {...register("dir_fio", {
                                    value: school.dir_fio,
                                })}
                            />
                            <FieldInput
                                label={"E-mail директора"}
                                placeholder={"Введите email директора..."}
                                layout="flex"
                                required={true}
                                {...register("dir_email", {
                                    value: school.dir_email,
                                })}
                            />
                            <FieldInput
                                label={"Контактный телефон директора"}
                                placeholder={"Введите телефон директора..."}
                                layout="flex"
                                required={true}
                                {...register("dir_phone", {
                                    value: school.dir_phone,
                                })}
                            />
                            <FieldInput
                                label={"Адрес"}
                                type={"textarea"}
                                rows={3}
                                placeholder={"Введите адрес..."}
                                layout="flex"
                                required={true}
                                {...register("address", {
                                    value: school.address,
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
                                text="Нет"
                                size={"small"}
                                theme="text"
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type="button"
                                text="Да"
                                theme={"info"}
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

    if (!id) return <p>Новая школа</p>;
};

export default SchoolPage;
