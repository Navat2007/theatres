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
                        <h1 className="content__title --mb-small">
                            {theatre.title}
                        </h1>
                    </div>
                    <Tabs>
                        <Tab title={"Основная информация"}>
                            <div className="info">
                                <ul className="info__list">
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Название театра
                                        </h3>
                                        <p className="info__description">
                                            Test2
                                            <NavLink
                                                className="link"
                                                to={"/theatre/" + id}
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            >
                                                Страница театра{" "}
                                                <span className="mdi mdi-open-in-new" />
                                            </NavLink>
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">Адрес</h3>
                                        <p className="info__description">
                                            127206, город Москва, улица
                                            Вучетича, дом 30, стр. 5
                                            <NavLink
                                                className="link"
                                                to={"/theatre/" + id}
                                                target={"_blank"}
                                                rel="noopener nofollow noreferer"
                                            >
                                                Показать на карте{" "}
                                                <span className="mdi mdi-open-in-new" />
                                            </NavLink>
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Форма осуществления деятельности
                                        </h3>
                                        <p className="info__description">
                                            Объединение дополнительного
                                            образования
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Возрастной состав участников
                                            школьного театра
                                        </h3>
                                        <p className="info__description">
                                            5-9 класс
                                        </p>
                                    </li>
                                    <li className="info__item">
                                        <h3 className="info__label">
                                            Дата основания
                                        </h3>
                                        <p className="info__description">
                                            04.11.2022
                                        </p>
                                    </li>
                                </ul>
                                <h2 className="info__title">Педагоги</h2>
                            </div>
                        </Tab>
                        <Tab title={"Фотографии"}></Tab>
                        <Tab title={"Видео"}></Tab>
                    </Tabs>
                </>
            )}
        </div>
    );
};

export default TheatrePage;
