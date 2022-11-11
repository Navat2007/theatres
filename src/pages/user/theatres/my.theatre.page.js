import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from 'react-select'

import MultiSelect from "../../../components/multi_select/multi_select.component";

import { clear, loadTeachers } from "../../../store/admin/teachersSlice";
import { loadSchools } from "../../../store/admin/schoolsSlice";
import Button from "../../../components/simple/button/button.component";

const MyTheatrePage = () => {
    let { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const { data, statusError } = useSelector((state) => state.teachers);

    const { register, handleSubmit, reset, control } = useForm();

    const school = useSelector((state) => state.schools);

    const fetchData = async () => {
        await dispatch(loadTeachers({ schoolID: user.schoolID }));
        await dispatch(loadSchools());
    };

    React.useEffect(() => {
        fetchData();

        return () => {
            dispatch(clear());
        };
    }, [id]);

    React.useEffect(() => { }, []);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    console.log("render theatre");

    return (
        <div className="content__section">
            {!id && (
                <>
                    <h1 className="content__title">Новый театр</h1>
                    <form onSubmit={onSubmit}>
                        <p>Single select</p>
                        <MultiSelect
                            multi={false}
                            list={school.data.map((item) => {
                                return {
                                    //label: `${item.f} ${item.i} ${item.o}`,
                                    label: `${item.org_short_name}`,
                                    value: item.ID,
                                };
                            })}
                        />
                        <br />
                        <br />
                        <p>Multi select</p>
                        <MultiSelect
                            multi={true}
                            list={school.data.map((item) => {
                                return {
                                    //label: `${item.f} ${item.i} ${item.o}`,
                                    label: `${item.org_short_name}`,
                                    value: item.ID,
                                };
                            })}
                        />
                        <br />
                        <br />
                        <p>ReactSelect</p>
                        <Controller
                            control={control}
                            name="select"
                            defaultValue={[]}
                            render={({ field }) => (
                                <ReactSelect
                                    {...field}
                                    isMulti
                                    options={school.data.map((item) => {
                                        return {
                                            //label: `${item.f} ${item.i} ${item.o}`,
                                            label: `${item.org_short_name}`,
                                            value: item.ID,
                                        };
                                    })}
                                />
                            )}
                        />
                        <br />
                        <br />
                        <Button type="submit" theme="primary" text="Отправить" />
                    </form>
                </>
            )}
            {id && <p>Театр №{id}</p>}
        </div>
    );
};

export default MyTheatrePage;
