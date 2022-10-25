import React from 'react';
import {useParams} from "react-router-dom";

const MyTheatreRequestPage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                id && <p>Заявка №{id}</p>
            }
        </div>
    );
};

export default MyTheatreRequestPage;