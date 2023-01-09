import React from "react";
import { useNavigate } from "react-router-dom";

import useSchoolsStore from "../../../store/admin/schoolsStore";

import Button from "../../../components/button/button.component";
import Table from "../../../components/table/table.component";

const SchoolsPage = () => {
    const navigate = useNavigate();

    const { schools, loadSchools, loading } = useSchoolsStore();

    const onItemClick = (props) => {
        navigate(`/admin/schools/${props}`);
    };

    const fetchData = async () => {
        await loadSchools();
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
            header: "Лого",
            key: "photo",
            type: "image",
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
        <Table
            title={"Таблица школ"}
            loading={loading}
            items={schools}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type="button"
                iconClass="mdi mdi-plus"
                text="Создать"
                size="small"
                aria-label="Добавить школу"
                onClick={() => navigate("/admin/schools/new")}
            />
        </Table>
    );
};

export default SchoolsPage;
