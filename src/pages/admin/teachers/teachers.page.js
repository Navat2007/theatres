import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";

import Table from "../../../components/table/table.component";
import Button from "../../../components/simple/button/button.component";

import {loadTeachers} from "../../../store/admin/teachersSlice";

const TeachersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachers);

    const onItemClick = (props) => {
        navigate(`/admin/teachers/${props}`);
    };

    React.useEffect(() => {

        dispatch(loadTeachers());

    }, [dispatch]);

    const itemConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Лого",
            key: "photo",
            type: "image"
        },
        {
            header: "Сокращенное название",
            key: "org_short_name",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Мрсд",
            key: "msrd",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "ЕКИС",
            key: "ekis",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Адрес",
            key: "address",
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
                    extraClass="--icon-add --icon-on-before"
                    type="button"
                    text="Создать"
                    theme="primary"
                    size="small"
                    aria-label="Добавить педагога"
                    onClick={() => navigate("/admin/teachers/new")}
                />
            </Table>
        </div>
    );

};

export default TeachersPage;