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
                className="button --icon-back --icon-on-before --theme-text"
                type="button"
                text="Назад"
                aria-label="Назад"
            />
            <h1 className="content__title">Создание администратора</h1>
            <form action="" className='form'>
                <h2 className="form__title">Основная информация</h2>
                <div class="field">
                    <label class="field__label">Email (логин)</label>
                    <input
                        type="text"
                        class="field__input"
                        placeholder="Введите email..."
                        name=""
                        required
                    />
                    <span class="field__icon --type-error"></span>
                    <p class="field__info"></p>
                </div>
                <div class="field">
                    <label class="field__label">Полное наименование организации</label>
                    <input
                        type="text"
                        class="field__input"
                        placeholder="Введите полное наименование организации..."
                        name=""
                        required
                    />
                    <span class="field__icon --type-error"></span>
                    <p class="field__info"></p>
                </div>
            </form>
        </div>
    );
};

export default AdminUsersPage;