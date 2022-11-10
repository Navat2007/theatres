import React from 'react';
import { useParams } from 'react-router-dom';
import Button from "../../../components/simple/button/button.component";
import MultiSelect from "../../../components/multi_select/multi_select.component";

const TheatrePage = () => {

    let { id } = useParams();

    return (
        <div className='content__section'>
            {
                !id && <>
                    <h1 className='content__title'>Новой театр</h1>
                    <MultiSelect  />
                </>
            }
            {
                id && <p>Театр №{id}</p>
            }
        </div>
    );
};

export default TheatrePage;