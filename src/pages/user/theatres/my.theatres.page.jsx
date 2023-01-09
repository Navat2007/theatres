import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";
import useTheatresStore from "../../../store/user/theatresStore";

import Button from "../../../components/button/button.component";
import Table from "../../../components/table/table.component";
import Tab from "../../../components/tabs/tab.component";
import Tabs from "../../../components/tabs/tabs.component";

const MyTheatresPage = () => {
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const { theatres, loadTheatres, loading } = useTheatresStore();

    const onItemClick = (props) => {
        navigate(`/user/theatres/${props}`);
    };

    const fetchData = async () => {
        await loadTheatres({ schoolID: user.schoolID });
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
            header: "Статус",
            key: "active",
            type: "string",
            filter: "select",
            sorting: true,
        },
    ];

    return (
        <>
            <Tabs>
                <Tab title={"Театры"}>
                    <Table
                        title={"Таблица театров"}
                        loading={loading}
                        items={theatres}
                        itemsConfig={itemConfig}
                        onItemClick={onItemClick}
                        withFilter={true}
                    >
                        <Button
                            type="button"
                            iconClass={"mdi mdi-plus"}
                            size="small"
                            text="Создать"
                            aria-label="Добавить театр"
                            onClick={() => navigate("/user/theatres/new")}
                        />
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
};

export default MyTheatresPage;
