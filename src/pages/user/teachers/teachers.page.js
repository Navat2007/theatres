import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Helmet } from "react-helmet";
import Table from "../../../components/table/table.component";
import Button from "../../../components/simple/button/button.component";

import { loadTeachers } from "../../../store/admin/teachersSlice";

const TeachersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachers);
    const user = useSelector(state => state.auth.user);

    const onItemClick = (props) => {
        navigate(`/user/teachers/${props}`);
    };

    React.useEffect(() => {

        dispatch(loadTeachers({ schoolID: user.schoolID }));

    }, []);

    const itemConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Фото",
            key: "photo",
            type: "image"
        },
        {
            header: "Фамилия",
            key: "f",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Имя",
            key: "i",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Должность",
            key: "position",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Статус",
            key: "active",
            type: "string",
            filter: "select",
            sorting: true,
        },
    ];

    return (
        <div className='content__section'>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <Table
                title={"Таблица педагогов"}
                loading={teachers.status === "loading"}
                items={teachers.data}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type="button"
                    iconClass={'mdi mdi-plus'}
                    text="Создать"
                    size="small"
                    aria-label="Добавить педагога"
                    onClick={() => navigate("/user/teachers/new")}
                />
            </Table>
        </div>
    );

};

export default TeachersPage;