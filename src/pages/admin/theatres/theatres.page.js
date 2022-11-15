import React from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import useTheatresStore from "../../../store/admin/theatresStore";

import Button from "../../../components/simple/button/button.component";
import Table from "../../../components/table/table.component";
import Tab from "../../../components/tabs/tab.component";
import Tabs from "../../../components/tabs/tabs.component";

const TheatresPage = () => {

    const navigate = useNavigate();

    const {theatres, loadTheatres, loading} = useTheatresStore();

    const onItemClick = (props) => {
        navigate(`/admin/theatres/${props}`);
    };

    const fetchData = async () => {

        await loadTheatres({});

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

    return (<>
        <Helmet>
            <title>Театры</title>
        </Helmet>
        <Tabs>
            <Tab index={1} title={"Театры"}>
                <Table
                    title={"Таблица театров"}
                    loading={loading}
                    items={theatres.filter(item => item.active === 1)}
                    itemsConfig={itemConfig}
                    onItemClick={onItemClick}
                    withFilter={true}
                >
                    <Button
                        type='button'
                        text="Создать"
                        size="small"
                        iconClass={'mdi mdi-plus'}
                        aria-label="Добавить театр"
                        onClick={() => navigate("/admin/theatres/new")}
                    />
                </Table>
            </Tab>
            <Tab index={2} title={"Архив"}>
                <Table
                    title={"Таблица архива театров"}
                    loading={loading}
                    items={theatres.filter(item => item.active === 0)}
                    itemsConfig={itemConfig}
                    onItemClick={onItemClick}
                    withFilter={true}
                />
            </Tab>
        </Tabs>
    </>
    );
};

export default TheatresPage;