import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSchoolStore from "../../../store/admin/schoolsStore";
import useTheatresStore from "../../../store/admin/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Theatre from "../../../components/page_components/theatre/theatre.component";

const TheatrePage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const schoolStore = useSchoolStore();
    const {
        theatre,
        loadTheatre,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    React.useEffect(() => {
        const fetchData = async () => {
            if (id) {
                let tempTheatre = await loadTheatre({ id });

                if (tempTheatre) {
                    await schoolStore.loadSchool({ id: tempTheatre.schoolID });
                    await teachersStore.loadTeachers({
                        schoolID: tempTheatre.schoolID,
                    });
                }
            }
        };

        fetchData();
    }, [id]);

    const back = () => navigate("/admin/theatres/");

    if (loading || schoolStore.loading || teachersStore.loading)
        return <p>Загрузка...</p>;

    if (id && !theatre) {
        return <p>Театр не найден</p>;
    }

    return (
        <>
            {id && theatre && (
                <Theatre
                    id={id}
                    theatre={theatre}
                    teachersStore={teachersStore}
                    onBack={back}
                />
            )}
        </>
    );
};

export default TheatrePage;
