import React from 'react'
import { useParams } from 'react-router-dom';

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

function PublicTheatrePage() {

    let { id } = useParams();

    const schoolStore = useSchoolStore();
    const {
        theatre,
        loadTheatre,
        loading,
        sending,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const fetchData = async () => {

        if (id) {
            await loadTheatre({ id });

            console.log(theatre);

            if (theatre) {

                await schoolStore.loadSchool({ id: theatre.schoolID });
                await teachersStore.loadTeachers({ schoolID: theatre.schoolID });

            }

        }

    };

    React.useEffect(() => {

        fetchData();

    }, [id]);

    if (loading || schoolStore.loading || teachersStore.loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (id === "test") {
        return (
            <p>Тестовая страница театра</p>
        );
    }

    if (id && !theatre) {
        return (
            <p>Театр не найден</p>
        );
    }

    return (
        <p>Страница театра</p>
    );

}

export default PublicTheatrePage
