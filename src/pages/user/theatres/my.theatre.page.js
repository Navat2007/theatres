import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuthStore from "../../../store/authStore";
import useTheatresStore from "../../../store/user/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import MultiSelect from "../../../components/multi_select/multi_select.component";
import Editor from "../../../components/reach_editor/editor.component";
import Accordion from "../../../components/simple/accordion/accordion.component";
import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";
import Notif from "../../../components/notif/notif.component";
import Popup from "../../../components/popup/popup.component";
import TheatreRequest from "../../../components/page_components/theatre_request/theatre_request.component";

const MyTheatrePage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const schoolStore = useSchoolStore();
    const {
        theatre,
        loadTheatre,
        addTheatre,
        loading,
        sending,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const [popup, setPopup] = React.useState(<></>);

    const fetchData = async () => {

        await schoolStore.loadSchool({ id: user.schoolID });
        await teachersStore.loadTeachers({ schoolID: user.schoolID });

        if (id)
            await loadTheatre({ id });

    };

    React.useEffect(() => {

        fetchData();

    }, [id]);

    React.useEffect(() => {

        if (error) {
            setPopup(
                <Notif
                    title="Ошибка"
                    text={errorText}
                    opened={true}
                    onClose={() => {
                        clearErrorText();
                        setPopup(<></>);
                    }}
                />
            );
        }

    }, [error]);

    const back = () => navigate("/user/theatres");

    const onAddSubmit = async (data) => {

        const result = await addTheatre(data);

        if (!result.error) {
            navigate("/user/theatreRequests");
        }

    };

    const onEditSubmit = async (data) => {

        const result = await editTheatre(data);

        if (!result.error) {
            navigate("/user/theatreRequests");
        }

    };

    const onRemoveSubmit = async (data) => {

        const result = await removeTheatre(data);

        if (!result.error) {
            navigate("/user/theatreRequests");
        }

    };

    if (loading || schoolStore.loading || teachersStore.loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (!schoolStore.loading && Object.keys(schoolStore.school).length === 0)
        return <div className='content__section'><p>Ошибка при загрузке школы. Попробуйте перезагрузить страницу.</p>
        </div>;

    return (<>
        <div className="content__section">
            {
                id && theatre
                    ?
                    <>
                        <div className="content__title-block">
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                iconClass={'mdi mdi-arrow-left'}
                                isIconBtn='true'
                                aria-label='Назад'
                                onClick={back}
                            />
                            <h1 className='content__title --mb-small'>Театр ID: {theatre.ID} </h1>
                        </div>
                        <TheatreRequest request={theatre} onBack={back} />
                    </>
                    :
                    <>
                        <div className="content__title-block">
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                iconClass={'mdi mdi-arrow-left'}
                                isIconBtn='true'
                                aria-label='Назад'
                                onClick={back}
                            />
                            <h1 className='content__title --mb-small'>Создание театра</h1>
                        </div>
                        <TheatreRequest onSubmitDone={onAddSubmit} onBack={back} />
                    </>
            }

        </div>
        {popup}
    </>);
};

export default MyTheatrePage;
