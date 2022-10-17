import React from 'react';
import {useParams} from "react-router-dom";

const SchoolPage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                !id && <p>Новая школа</p>
            }
            {
                id && <p>Школа №{id}</p>
            }
        </div>
    );
};

export default SchoolPage;