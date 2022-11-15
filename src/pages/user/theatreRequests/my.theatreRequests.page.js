import React from 'react';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

import Table from "../../../components/table/table.component";

const MyTheatreRequestsPage = () => {

    const navigate = useNavigate();

    const onItemClick = (props) => {
        navigate(`/user/theatreRequests/${props}`);
    };

    React.useEffect(() => {



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
            header: "Название мероприятия",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Вид спорта",
            key: "sport_type",
            type: "string",
            filter: "select",
            sorting: true,
        },
        {
            header: "Дата начала проведения",
            key: "event_start",
            type: "string",
        },
        {
            header: "Дата завершения",
            key: "event_end",
            type: "string"
        },
        {
            header: "Кол-во этапов",
            key: "stages",
            type: "int",
            filter: "select",
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
            <Helmet>
                <title>Заявки на театры</title>
            </Helmet>
            <Table
                title={"Таблица заявок на театры"}
                loading={false}
                items={[]}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            />
        </div>
    );
};

export default MyTheatreRequestsPage;