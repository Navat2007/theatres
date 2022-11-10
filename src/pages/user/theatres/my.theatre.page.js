import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import MultiSelect from "../../../components/multi_select/multi_select.component";

import { clear, loadTeachers } from "../../../store/admin/teachersSlice";
import { loadSchools } from "../../../store/admin/schoolsSlice";

const MyTheatrePage = () => {
    let { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const { data, statusError } = useSelector((state) => state.teachers);

    const { register, handleSubmit, reset } = useForm();

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

    React.useEffect(() => {}, []);

    return (
        <div className="content__section">
            {!id && (
                <>
                    <h1 className="content__title">Новый театр</h1>
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
                </>
            )}
            {id && <p>Театр №{id}</p>}
        </div>
    );
};

export default MyTheatrePage;
