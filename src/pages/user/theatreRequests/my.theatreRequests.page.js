import React from 'react';
import { useNavigate } from "react-router-dom";

import useTheatresStore from '../../../store/user/theatresStore';
import useAuthStore from '../../../store/authStore';

import Table from "../../../components/table/table.component";

const MyTheatreRequestsPage = () => {

    const navigate = useNavigate();

    const { user } = useAuthStore();
    const { theatreRequests, loadTheatreRequests, loading } = useTheatresStore();

    const onItemClick = (props) => {
        navigate(`/user/theatreRequests/${props}`);
    };

    const fetchData = async () => {

        await loadTheatreRequests({ schoolID: user.schoolID });

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
            type: "date",
            filter: "date",
            sorting: true,
        },
        {
            header: "Дата обновления",
            key: "update_time",
            type: "date",
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

export default MyTheatreRequestsPage;