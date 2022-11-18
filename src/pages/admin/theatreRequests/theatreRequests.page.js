import React from 'react';
import { useNavigate } from "react-router-dom";

import useTheatresStore from '../../../store/admin/theatresStore';

import Table from "../../../components/table/table.component";

const TheatreRequestsPage = () => {

    const navigate = useNavigate();

    const { theatreRequests, loadTheatreRequests, loading } = useTheatresStore();

    const onItemClick = (props) => {
        navigate(`/admin/theatreRequests/${props}`);
    };

    const fetchData = async () => {

        await loadTheatreRequests();

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
            header: "Тип заявки",
            key: "type",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Название театра",
            key: "title",
            type: "string",
            filter: "string",
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
            header: "Дата подачи",
            key: "create_time",
            type: "datetime",
            filter: "date",
            sorting: true,
        },
        {
            header: "Дата обновления",
            key: "update_time",
            type: "datetime",
            filter: "date",
            sorting: true,
        },
        {
            header: "Статус",
            key: "status",
            type: "string",
            filter: "select",
            sorting: true,
        },
    ];

    return (
        <div className='content__section'>
            <Table
                title={"Таблица заявок на театры"}
                loading={loading}
                items={theatreRequests}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            />
        </div>
    );
};

export default TheatreRequestsPage;