import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';
import JoditEditor from 'jodit-react';

import Button from "../../../components/simple/button/button.component";

import {clear, loadTeachers} from "../../../store/admin/teachersSlice";
import {loadSchools} from "../../../store/admin/schoolsSlice";

const MyTheatrePage = () => {

    let {id} = useParams();
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();

    const user = useSelector((state) => state.auth.user);
    const {data, statusError} = useSelector((state) => state.teachers);

    const {register, handleSubmit, reset, control} = useForm();

    const school = useSelector((state) => state.schools);

    const [editorState, setEditorState] = React.useState('');

    const fetchData = async () => {
        await dispatch(loadTeachers({schoolID: user.schoolID}));
        await dispatch(loadSchools());
    };

    React.useEffect(() => {
        fetchData();

        return () => {
            dispatch(clear());
        };
    }, [id]);

    React.useEffect(() => {
    }, []);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        console.log(editorState);
    });

    return (
        <div className="content__section">
            {!id && (
                <>
                    <h1 className="content__title">Новый театр</h1>
                    <form onSubmit={onSubmit}>
                        <p>ReactSelect</p>
                        <Controller
                            control={control}
                            name="select"
                            defaultValue={[]}
                            render={({field}) => (
                                <ReactSelect
                                    classNamePrefix="multy-select"
                                    {...field}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
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
                        <br/>
                        <br/>
                        <Controller
                            control={control}
                            name="editor"
                            defaultValue={""}
                            render={({field}) => (
                                <JoditEditor
                                    ref={field.ref}
                                    config={{
                                        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
                                        placeholder: 'Начните писать...'
                                    }}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    onBlur={() => {
                                        field.onBlur();
                                    }}
                                />
                            )}
                        />
                        <br/>
                        <br/>
                        <Button type="submit" theme="primary" text="Отправить"/>
                    </form>
                </>
            )}
            {id && <p>Театр №{id}</p>}
        </div>
    );
};

export default MyTheatrePage;
