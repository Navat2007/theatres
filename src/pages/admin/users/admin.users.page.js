import React from 'react';
import {useParams} from "react-router-dom";

const AdminUsersPage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                !id && <p>Новый админ</p>
            }
            {
                id && <p>Админ №{id}</p>
            }
        </div>
    );
};

export default AdminUsersPage;