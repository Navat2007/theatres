import React from 'react'
import {useParams} from 'react-router-dom';

import useTheatresStore from "../../../store/public/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

function PublicTheatrePage() {

    let {id} = useParams();

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

    const [sliderValue, setSliderValue] = React.useState(0);

    const slides = [
        (<img src={"https://source.unsplash.com/random/200x200?sig=1"}/>),
        (<img src={"https://source.unsplash.com/random/200x200?sig=2"}/>),
        (<img src={"https://source.unsplash.com/random/200x200?sig=3"}/>),
    ];

    const fetchData = async () => {

        if (id) {
            await loadTheatre({id});

            console.log(theatre);

            if (theatre) {

                await schoolStore.loadSchool({id: theatre.schoolID});
                await teachersStore.loadTeachers({schoolID: theatre.schoolID});

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
            <>


            </>
        );
    }

    if (id && !theatre) {
        return (
            <p>Театр не найден</p>
        );
    }

    return (
        <>
            <p>Страница театра</p>
        </>
    );

}

export default PublicTheatrePage
