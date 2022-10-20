import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";

import {editAdmin, loadAdmin, removeAdmin} from "../../../store/admin/adminsSlice";
import Popup from "../../../components/popup/popup.component";

const AdminUsersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { id } = useParams();
    const { register, setValue, handleSubmit, reset } = useForm();

    const admin = useSelector(state => state.admins.admin);
    const status = useSelector(state => state.admins.status);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popup2Opened, setPopup2Opened] = React.useState(false);

    React.useEffect(() => {

        reset();
        dispatch(loadAdmin({id}));

    }, [id, dispatch]);

    const onEditSubmit = (params) => {

        dispatch(editAdmin(params));

    }

    const onDeleteSubmit = () => {

        dispatch(removeAdmin({id}));

    }

    const handleDeleteButton = () => {

        if(parseInt(id) === 1 || parseInt(id) === 1519)
            setPopup2Opened(true);
        else
            setPopupOpened(true);

    }

    if(status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if(id && admin === null)
        return <div className='content__section'><p>Данного администратора не существует</p></div>;

    if(id && admin)
        return (
            <div className='content__section'>
                <Button
                    className="--icon-back --icon-on-before --theme-text"
                    type="button"
                    text="Назад"
                    aria-label="Назад"
                />
                <h1 className="content__title">Редактирование администратора ID: {id}</h1>
                <img src={window.global.baseUrl + admin.photo} alt={""} />
                <form onSubmit={handleSubmit(onEditSubmit)} className='form --place-new-user'>
                    <fieldset className='form__section --content-info'>
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Логин"}
                            placeholder={"Введите логин..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("login", {value: admin.login} )}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("email", {value: admin.email} )}
                        />
                        <FieldInput
                            label={"Наименование организации"}
                            placeholder={"Введите наименование организации..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("org_name", {value: admin.org_name} )}
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
                            {...register("password")}
                        />
                        <FieldInput
                            label={"Активировать учетную запись?"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("active", {value: admin.active === "Активен"} )}
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
                                    if (e.target.checked)
                                    {
                                        setValue("admin", false);
                                    }
                                }
                            } )}
                        />
                        <FieldInput
                            id={"id_2"}
                            label={"Администратор"}
                            type={"radio"}
                            fieldClassName={"--type-checkbox-radio"}
                            {...register("admin", {
                                value: admin.role === "Администратор",
                                onChange: (e) => {
                                    if (e.target.checked)
                                    {
                                        setValue("superadmin", false);
                                    }
                                }
                            })}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            className='--theme-text --icon-on-before --icon-trash'
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteButton();
                            }}
                            text={"Удалить"} />
                        <Button text={"Сохранить"} />
                    </div>
                </form>
                <Popup
                    title={"Вы уверены что хотите удалить?"}
                    opened={popupOpened}
                    onClose={()=> { setPopupOpened(false); }}
                >
                    <Button
                        text={"Нет"}
                        className='--theme-text'
                        onClick={() => setPopupOpened(false)}
                    />
                    <Button
                        text={"Да"}
                        onClick={onDeleteSubmit}
                    />
                </Popup>
                <Popup
                    title={"Данного администратора удалить нельзя!"}
                    opened={popup2Opened}
                    onClose={()=> { setPopup2Opened(false); }}
                />
            </div>
        );

    return (
        <div className='content__section'>
            <Button
                className="--icon-back --icon-on-before --theme-text"
                type="button"
                text="Назад"
                aria-label="Назад"
            />
            <h1 className="content__title">Создание администратора</h1>
            <form action="" className='form --place-new-user'>
                <fieldset className='form__section --content-info'>
                    <h2 className="form__title">Основная информация</h2>
                    <div className="field --type-flex">
                        <label className="field__label">Email (логин)</label>
                        <input
                            type="text"
                            className="field__input"
                            placeholder="Введите email..."
                            name=""
                            required
                        />
                        <span className="field__icon --type-error" />
                        <p className="field__info" />
                    </div>
                    <div className="field --type-flex">
                        <label className="field__label">Полное наименование организации</label>
                        <input
                            type="text"
                            className="field__input"
                            placeholder="Введите полное наименование организации..."
                            name=""
                            required
                        />
                        <span className="field__icon --type-error" />
                        <p className="field__info" />
                    </div>
                </fieldset>
                <fieldset className='form__section --content-security'>
                    <h2 className="form__title">Безопасность</h2>
                    <div className="field --type-flex">
                        <label className="field__label">Email (логин)</label>
                        <input
                            type="text"
                            className="field__input"
                            placeholder="Введите email..."
                            name=""
                            required
                        />
                        <span className="field__icon --type-error" />
                        <p className="field__info" />
                    </div>
                    <div className="field --type-checkbox-radio">
                        <input
                            type="checkbox"
                            className="field__checkbox-radio" />
                        <label className="field__label">Активировать учетную запись?</label>
                    </div>
                </fieldset>
                <fieldset className='form__section --content-access'>
                    <h2 className="form__title">Права доступа</h2>
                    <div className="field --type-checkbox-radio">
                        <input
                            type="checkbox"
                            className="field__checkbox-radio" />
                        <label className="field__label">Активировать учетную запись?</label>
                    </div>
                    <div className="field --type-checkbox-radio">
                        <input
                            type="checkbox"
                            className="field__checkbox-radio" />
                        <label className="field__label">Активировать учетную запись?</label>
                    </div>
                    <div className="field --type-checkbox-radio">
                        <input
                            type="checkbox"
                            className="field__checkbox-radio" />
                        <label className="field__label">Активировать учетную запись?</label>
                    </div>
                    <div className="field --type-checkbox-radio">
                        <input
                            type="checkbox"
                            className="field__checkbox-radio" />
                        <label className="field__label">Активировать учетную запись?</label>
                    </div>
                </fieldset>
                <div className="form__controls">
                    <button className='button --theme-primary'>Создать</button>
                </div>
            </form>
        </div>
    );
};

export default AdminUsersPage;