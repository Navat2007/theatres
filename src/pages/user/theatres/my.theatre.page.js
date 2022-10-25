import React from 'react';
import { useParams } from 'react-router-dom';

const MyTheatrePage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                !id && <p>Новой театр</p>
            }
            {
                id && <p>Театр №{id}</p>
            }
        </div>
    );
};

export default MyTheatrePage;