import React from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import {
    init,
    clear,
    fetchAddTeacher,
    fetchEditTeacher,
    fetchRemoveTeacher,
    loadTeacher
} from "../../../store/admin/teachersSlice";
import { loadSchools } from "../../../store/admin/schoolsSlice";

const TeacherPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const { register, handleSubmit, reset } = useForm();

    const { teacher, teacherStatus, statusError } = useSelector(state => state.teachers);
    const schools = useSelector(state => state.schools);

    const [error, setError] = React.useState(false);
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {

        await dispatch(loadSchools());

        if (id) {
            reset();
            await dispatch(loadTeacher({ id }));
        }
        else
            await dispatch(init());

    }

    React.useEffect(() => {

        fetchData();

        return () => {
            dispatch(clear());
        };

    }, [id]);

    React.useEffect(() => {

        if (teacherStatus === "sendingError")
            setPopupErrorOpened(true);

    }, [teacherStatus]);

    const onClose = async () => {

        navigate("/admin/teachers");

    }

    const checkPhoto = (file) => {

        if (!file) {
            setError("Файл не читается.");
            setPopupErrorOpened(true);
            return false;
        }

        if (file.type.match('image.*')) {
            if (file.size <= 1500000) {

            }
            else {
                setError("Файл больше 1,5 Мб.");
                setPopupErrorOpened(true);
                return false;
            }
        }
        else {
            setError("Файл должен быть изображением.");
            setPopupErrorOpened(true);
            return false;
        }

        return true;

    };

    const onAddSubmit = async (params) => {

        if (params.photo.length > 0 && !checkPhoto(params.photo[0]))
            return;

        await dispatch(fetchAddTeacher(params));
        onClose();

    }

    const onEditSubmit = async (params) => {

        if (params.photo.length > 0 && !checkPhoto(params.photo[0]))
            return;

        params.id = id;
        await dispatch(fetchEditTeacher(params));
        onClose();

    }

    const onDeleteSubmit = async () => {

        await dispatch(fetchRemoveTeacher({ id }));
        onClose();

    }

    if (teacherStatus === "loading" || schools.status === "loading")
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
                            type="button"
                            iconClass={'mdi mdi-arrow-left'}
                            isIconBtn={true}
                            size='small'
                            theme="text"
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
                                    alt={"Фото педагога"} />
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
                                {...register("f", { value: teacher.f })}
                            />
                            <FieldInput
                                label={"Имя"}
                                placeholder={"Введите имя..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("i", { value: teacher.i })}
                            />
                            <FieldInput
                                label={"Отчество"}
                                placeholder={"Введите отчество..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("o", { value: teacher.o })}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("position", { value: teacher.position })}
                            />
                            <FieldInput
                                label={"Педагогический стаж"}
                                placeholder={"Введите педагогический стаж..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("experience", { value: teacher.experience })}
                            />
                            <FieldInput
                                label={"Описание"}
                                type={"textarea"}
                                rows={5}
                                placeholder={"Введите описание..."}
                                fieldClassName={"--type-flex"}
                                required={true}
                                {...register("text", { value: teacher.text })}
                            />
                            <FieldInput
                                label={"Школа"}
                                type={"select"}
                                defaultSelectItem={{
                                    title: "Выберите школу...",
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
                                {...register("schoolID", { value: teacher.schoolID })}
                            />
                        </fieldset>
                        <fieldset className='form__section --content-security'>
                            <h2 className="form__title">Безопасность</h2>
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"radio"}
                                fieldClassName={"--type-checkbox-radio"}
                                {...register("active", { value: teacher.active === "Активен" })}
                            />
                        </fieldset>
                        <div className="form__controls">
                            <Button
                                type="submit"
                                text="Сохранить"
                                spinnerActive={teacherStatus === "sending"} />
                            <Button
                                theme="text"
                                type='button'
                                iconClass={'mdi mdi-delete'}
                                extraClass={`${teacherStatus === "sending" ? "--hide" : ""}`}
                                spinnerActive={teacherStatus === "removing"}
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
                                    theme="text"
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
                            text: statusError || error,
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
                        type="button"
                        iconClass={'mdi mdi-arrow-left'}
                        isIconBtn={true}
                        size='small'
                        theme="text"
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
                            label={"Активировать учетную запись?"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("active", { value: true })}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text={"Создать"}
                            spinnerActive={teacherStatus === "sending"} />
                    </div>
                </form>
                <Popup
                    title={"Ошибка!"}
                    notif={{
                        active: true,
                        state: "error",
                        text: statusError || error,
                    }}
                    opened={popupErrorOpened}
                    onClose={() => setPopupErrorOpened(false)}
                />
            </div>
        </>
    );

};

export default TeacherPage;