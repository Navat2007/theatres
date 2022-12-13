import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import useTheatresStore from "../../../store/user/theatresStore";
import useAuthStore from "../../../store/authStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Notif from "../../../components/notif/notif.component";
import Button from "../../../components/simple/button/button.component";
import TheatreRequest from "../../../components/page_components/theatre_request/theatre_request.component";
import commonStyles from "../../common.module.scss";

const MyTheatrePage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const {
        theatre,
        loadTheatre,
        addTheatre,
        editTheatre,
        loading,
        error,
        errorText,
        clearErrorText,
    } = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    const [popup, setPopup] = React.useState(<></>);
    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await loadTheatre({ id });
        await schoolStore.loadSchool({ id: user.schoolID });
        await teachersStore.loadTeachers({ schoolID: user.schoolID });
    };

    React.useEffect(() => {
        if (error) {
            setPopup(
                <Notif
                    title="Ошибка!"
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

    React.useEffect(() => {
        fetchData();
    }, []);

    const onAddSubmit = async (params) => {
        params.theatreID = 0;
        params.schoolID = user.schoolID;

        const result = await addTheatre(params);

        if (!result.error) {
            setPopup(
                <Notif
                    title=""
                    text={"Спасибо. Ваши данные сохранены, ожидайте рассмотрения заявки"}
                    opened={true}
                    onClose={() => {
                        clearErrorText();
                        setPopup(<></>);
                        navigate("/user/theatreRequests");
                    }}
                />
            );
        }
    };

    const onEditSubmit = async (params) => {
        params.theatreID = id;
        params.schoolID = user.schoolID;

        const result = await addTheatre(params);

        if (!result.error) {

            setPopup(
                <Notif
                    title=""
                    text={"Спасибо. Ваши данные сохранены, ожидайте рассмотрения заявки"}
                    opened={true}
                    onClose={() => {
                        clearErrorText();
                        setPopup(<></>);
                        navigate("/user/theatreRequests");
                    }}
                />
            );

        }
    };

    const onRevokeSubmit = async () => {
        setPopup(
            <Notif
                text={"Вы действительно хотите отозвать заявку?"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
                buttons={
                    <>
                        <Button
                            type="button"
                            text="Нет"
                            size={"small"}
                            theme="text"
                            onClick={() => setPopup(<></>)}
                        />
                        <Button
                            type="button"
                            text="Да"
                            theme="info"
                            size={"small"}
                            onClick={async () => {
                                const result = await editTheatre({
                                    id,
                                    status: 5,
                                });

                                if (!result.error) {
                                    setPopup(<></>);
                                }
                            }}
                        />
                    </>
                }
            />
        );
    };

    if (loading || teachersStore.loading) return <p>Загрузка...</p>;

    if (id && theatre === null) return <p>Театр не найден</p>;

    return (
        <>
            {id && theatre ? (
                <>
                    <div className={commonStyles.title_block}>
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                            onClick={() => navigate("/user/theatres/" + id)}
                        />
                        <h1 className={commonStyles.title}>
                            Редактирование театра ID: {id}{" "}
                        </h1>
                    </div>
                    <TheatreRequest
                        request={theatre}
                        onSubmitDone={onEditSubmit}
                        onBack={() => navigate("/user/theatres/" + id)}
                    />
                </>
            ) : (
                <>
                    <div className={commonStyles.title_block}>
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                            onClick={() => navigate("/user/theatres")}
                        />
                        <h1 className={commonStyles.title}>Новый театр</h1>
                    </div>
                    <TheatreRequest
                        onSubmitDone={onAddSubmit}
                        onBack={() => navigate("/user/theatres")}
                    />
                </>
            )}
            {popup}
        </>
    );
};

export default MyTheatrePage;
