import React from 'react';
import { useNavigate } from "react-router-dom";

import useTheatresStore from "../../../store/admin/theatresStore";

import Button from "../../../components/button/button.component";
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
            header: "Название театра",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Школа",
            key: "school_title",
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

    return (<>
        <Tabs>
            <Tab title={"Театры"}>
                <Table
                    title={"Таблица театров"}
                    loading={loading}
                    items={theatres}
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