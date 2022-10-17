import React from 'react';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import {loadTheatreRequests} from "../../../store/admin/theatreRequestsSlice";
import Table from "../../../components/table/table.component";
import Tab from "../../../components/tabs/tab.component";
import Tabs from "../../../components/tabs/tabs.component";

const TheatreRequestsPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const theatreRequests = useSelector(state => state.theatreRequests);

    const onItemClick = (props) => {
        navigate(`/admin/theatreRequests/${props}`);
    };

    React.useEffect(() => {

        dispatch(loadTheatreRequests());

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
                loading={theatreRequests.status === "loading"}
                items={theatreRequests.data.filter(item => item.active === 1)}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            />
        </div>
    );
};

export default TheatreRequestsPage;