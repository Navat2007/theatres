import React from 'react';
import {useParams} from "react-router-dom";

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

            <h1 className="content__title">Создание администратора</h1>
            <form action="" className='form'>
                <h2 className="form__title">Основная информация</h2>
                
            </form>
        </div>
    );
};

export default AdminUsersPage;