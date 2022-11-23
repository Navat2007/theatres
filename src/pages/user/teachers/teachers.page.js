import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import Table from "../../../components/table/table.component";
import Button from "../../../components/simple/button/button.component";

const TeachersPage = () => {
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const { teachers, loadTeachers, loading } = useTeachersStore();

    const onItemClick = (props) => {
        navigate(`/user/teachers/${props}`);
    };

    const fetchData = async () => {
        await loadTeachers({ schoolID: user.schoolID });
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
                iconClass={"mdi mdi-plus"}
                text="Создать"
                size="small"
                aria-label="Добавить педагога"
                onClick={() => navigate("/user/teachers/new")}
            />
        </Table>
    );
};

export default TeachersPage;
