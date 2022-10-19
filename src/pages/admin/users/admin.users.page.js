import React from 'react';
import { useParams } from "react-router-dom";
import Button from "../../../components/simple/button/button.component";

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
            <form action="" className='form'>
                <h2 className="form__title">Основная информация</h2>
                <div className="field">
                    <label className="field__label">Email (логин)</label>
                    <input
                        type="text"
                        className="field__input"
                        placeholder="Введите email..."
                        name=""
                        required
                    />
                    <span className="field__icon --type-error" />
                    <p className="field__info"/>
                </div>
                <div className="field">
                    <label className="field__label">Полное наименование организации</label>
                    <input
                        type="text"
                        className="field__input"
                        placeholder="Введите полное наименование организации..."
                        name=""
                        required
                    />
                    <span className="field__icon --type-error"/>
                    <p className="field__info" />
                </div>
            </form>
        </div>
    );
};

export default AdminUsersPage;