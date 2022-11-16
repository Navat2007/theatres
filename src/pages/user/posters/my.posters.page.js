import React from 'react';
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";

import Button from '../../../components/simple/button/button.component';
import Table from '../../../components/table/table.component';

const MyPostersPage = () => {

    const navigate = useNavigate();

    const {user} = useAuthStore();

    const onItemClick = (props) => {
        navigate(`/user/teachers/${props}`);
    };

    const fetchData = async () => {

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
            header: "Фото",
            key: "photo",
            type: "image"
        },
        {
            header: "Фамилия",
            key: "f",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Имя",
            key: "i",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Должность",
            key: "position",
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
        <Table
                title={"Таблица афиш"}
                loading={false}
                items={[]}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type="button"
                    iconClass={'mdi mdi-plus'}
                    text="Создать"
                    size="small"
                    aria-label="Добавить Афишу"
                    onClick={() => navigate("/user/posters/new")}
                />
            </Table>
    </>);
};

export default MyPostersPage;