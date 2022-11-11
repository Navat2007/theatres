import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';

import Button from "../../../components/simple/button/button.component";

import { clear, loadTeachers } from "../../../store/admin/teachersSlice";
import { loadSchools } from "../../../store/admin/schoolsSlice";

const MyTheatrePage = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();

    const user = useSelector((state) => state.auth.user);
    const { data, statusError } = useSelector((state) => state.teachers);

    const { register, handleSubmit, reset, control } = useForm();

    const school = useSelector((state) => state.schools);

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

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

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        console.log(currentContentAsHTML);
    }

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
                            render={({ field }) => (
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
                        <br />
                        <br />
                        <Controller
                            control={control}
                            name="wys"
                            render={({ field }) => (
                                <Editor
                                    {...field}
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChange}
                                    localization={{
                                        locale: 'ru',
                                    }}
                                />
                            )}
                        />
                        <textarea
                            disabled
                            {...register("test")}
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
