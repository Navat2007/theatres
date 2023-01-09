import React from "react";
import { useNavigate } from "react-router-dom";

import useTeachersStore from "../../../store/admin/teachersStore";

import Table from "../../../components/table/table.component";
import Button from "../../../components/button/button.component";

const TeachersPage = () => {
    const navigate = useNavigate();
    const { teachers, loadTeachers, loading } = useTeachersStore();

    const onItemClick = (props) => {
        navigate(`/admin/teachers/${props}`);
    };

    const fetchData = async () => {
        await loadTeachers({});
    };

    React.useEffect(() => {
        fetchData();
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
            type: "image",
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
            header: "Школа",
            key: "school",
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
        <Table
            title={"Таблица педагогов"}
            loading={loading}
            items={teachers}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type="button"
                text="Создать"
                theme="primary"
                size="small"
                iconClass={"mdi mdi-plus"}
                aria-label="Добавить педагога"
                onClick={() => navigate("/admin/teachers/new")}
            />
        </Table>
    );
};

export default TeachersPage;
