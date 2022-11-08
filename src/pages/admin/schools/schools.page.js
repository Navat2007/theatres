import React from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { loadSchools } from "../../../store/admin/schoolsSlice";

import Button from "../../../components/simple/button/button.component";
import Table from "../../../components/table/table.component";

const SchoolsPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const school = useSelector(state => state.schools);

    const onItemClick = (props) => {
        navigate(`/admin/schools/${props}`);
    };

    React.useEffect(() => {

        dispatch(loadSchools());

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
                <title>Школы</title>
            </Helmet>
            <Table
                title={"Таблица школ"}
                loading={school.status === "loading"}
                items={school.data}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconClass='mdi mdi-plus'
                    text="Создать"
                    size="small"
                    aria-label="Добавить школу"
                    onClick={() => navigate("/admin/schools/new")}
                />
            </Table>
        </div>
    );
};

export default SchoolsPage;