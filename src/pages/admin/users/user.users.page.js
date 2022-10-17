import React from 'react';
import {useParams} from "react-router-dom";

const UserUsersPage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                !id && <p>Новый представитель</p>
            }
            {
                id && <p>Представитель №{id}</p>
            }
        </div>
    );
};

export default UserUsersPage;