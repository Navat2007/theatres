import React from 'react';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import {loadTheatres} from "../../../store/admin/theatresSlice";
import Button from "../../../components/simple/button/button.component";
import Table from "../../../components/table/table.component";
import Tab from "../../../components/tabs/tab.component";
import Tabs from "../../../components/tabs/tabs.component";

const MyTheatresPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theatres = useSelector(state => state.theatres);

    const onItemClick = (props) => {
        navigate(`/user/theatres/${props}`);
    };

    React.useEffect(() => {

        dispatch(loadTheatres());

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
        <>
            <Helmet>
                <title>Театры</title>
            </Helmet>
            <Tabs>
                <Tab index={1} title={"Театры"}>
                    <Table
                        title={"Таблица театров"}
                        loading={theatres.status === "loading"}
                        items={theatres?.data?.filter(item => item.active === 1)}
                        itemsConfig={itemConfig}
                        onItemClick={onItemClick}
                        withFilter={true}
                    >
                        <Button
                            className="button --icon-add --size-sm --icon-on-before --theme-primary"
                            type="button"
                            text="Создать"
                            aria-label="Добавить театр"
                            onClick={() => navigate("/user/theatres/new")}
                        />
                    </Table>
                </Tab>
                <Tab index={2} title={"Архив"}>
                    <Table
                        title={"Таблица архива театров"}
                        loading={theatres.status === "loading"}
                        items={theatres?.data?.filter(item => item.active === 0)}
                        itemsConfig={itemConfig}
                        onItemClick={onItemClick}
                        withFilter={true}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

export default MyTheatresPage;