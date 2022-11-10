import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import MultiSelect from "../../../components/multi_select/multi_select.component";

import { clear, loadTeachers } from '../../../store/admin/teachersSlice';

const MyTheatrePage = () => {

    let { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const { data, statusError } = useSelector(state => state.teachers);

    const { register, handleSubmit, reset } = useForm();

    const fetchData = async () => {

        await dispatch(loadTeachers({schoolID: user.schoolID}));        

    }

    React.useEffect(() => {

        fetchData();   

        return () => {
            dispatch(clear());
        };

    }, [id]);

    React.useEffect(() => {

        

    }, []);

    console.log("From redux: ", data);

    return (
        <div className='content__section'>
            {
                !id
                &&
                <>
                    <h1 className='content__title'>Новый театр</h1>
                    <MultiSelect multi={true} list={data.map(item => {
                        return {
                            label: `${item.f} ${item.i} ${item.o}`,
                            value: item.ID
                        }
                    })} />
                </>
            }
            {
                id && <p>Театр №{id}</p>
            }
        </div>
    );
};

export default MyTheatrePage;