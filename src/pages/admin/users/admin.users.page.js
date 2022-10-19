import React from 'react';
import { useParams } from "react-router-dom";
import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";

const AdminUsersPage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {/* {
                !id && <p>Новый админ</p>
            }
            {
                id && <p>Админ №{id}</p>
            } */}

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
                    <button className='button --theme-text --icon-on-before --icon-trash'>Удалить</button>
                    <button className='button --theme-primary'>Сохранить</button>
                </div>
            </form>
        </div>
    );
};

export default AdminUsersPage;