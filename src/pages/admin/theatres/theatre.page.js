import React from "react";
import { NavLink, useParams } from "react-router-dom";

import useSchoolStore from "../../../store/admin/schoolsStore";
import useTheatresStore from "../../../store/admin/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Button from "../../../components/simple/button/button.component";
import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";

const TheatrePage = () => {
    let { id } = useParams();

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

                    console.log(theatre);
                    console.log(schoolStore.school);
                    console.log(teachersStore.teachers);
                }
            }
        };

        fetchData();
    }, [id]);

    if (loading || schoolStore.loading || teachersStore.loading)
        return (
            <div className="content__section">
                <p>Загрузка...</p>
            </div>
        );

    if (id && !theatre) {
        return <p>Театр не найден</p>;
    }

    return (
        <div className="content__section">
            {id && theatre && (
                <>
                    <div className="content__title-block">
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                        />
                        <h1 className="content__title">{theatre.title}</h1>
                    </div>
                    <Tabs>
                        <Tab title={"Основная информация"}>
                            <p>Краткое описание</p>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Veritatis, aspernatur.
                                    Saepe, veritatis id. Cupiditate inventore
                                    placeat veritatis eaque illo aspernatur
                                    voluptatem porro repellat. Ex fugit
                                    reiciendis tempore voluptatum totam dolorum.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Veritatis, aspernatur.
                                    Saepe, veritatis id. Cupiditate inventore
                                    placeat veritatis eaque illo aspernatur
                                    voluptatem porro repellat. Ex fugit
                                    reiciendis tempore voluptatum totam dolorum.
                                </p>
                            </div>
                        </Tab>
                    </Tabs>
                    <NavLink
                        className="link"
                        to={"/theatre/" + id}
                        target={"_blank"}
                        rel="noopener nofollow noreferer"
                    >
                        Страница театра <span className="mdi mdi-open-in-new" />
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default TheatrePage;
