import React from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";
import Table from "../../../components/table/table.component";
import Button from "../../../components/simple/button/button.component";

import useUsersStore from "../../../store/admin/usersStore";

const UsersPage = () => {
    const navigate = useNavigate();

    const { admins, users, loadAdmins, loadUsers, loading } = useUsersStore();

    const onAdminItemClick = (props) => {
        navigate(`/admin/users/admin/${props}`);
    };

    const onUserItemClick = (props) => {
        navigate(`/admin/users/user/${props}`);
    };

    const fetchData = async () => {
        await loadAdmins();
        await loadUsers();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const adminItemsConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Email",
            key: "email",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "ФИО",
            key: "fio",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Роль",
            key: "role",
            type: "string",
            filter: "select",
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
    const userItemsConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Логин",
            key: "login",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Email",
            key: "email",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "ФИО",
            key: "fio",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Телефон",
            key: "phone",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Школа",
            key: "org_name",
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
                <Tab
                    index={1}
                    title={"Администраторы"}
                >
                    <Table
                        title={"Таблица администраторов"}
                        loading={loading.admins}
                        items={admins}
                        itemsConfig={adminItemsConfig}
                        onItemClick={onAdminItemClick}
                        withFilter={true}
                    >
                        <Button
                            type="button"
                            iconClass={"mdi mdi-plus"}
                            text="Создать"
                            size="small"
                            aria-label="Создать администратора"
                            onClick={() => navigate("/admin/users/admin/new")}
                        />
                    </Table>
                </Tab>
                <Tab
                    index={2}
                    title={"Пользователи"}
                >
                    <Table
                        title={"Таблица пользователей"}
                        loading={loading.users}
                        items={users}
                        itemsConfig={userItemsConfig}
                        pageSize={10}
                        onItemClick={onUserItemClick}
                        withFilter={true}
                    >
                        <Button
                            type="button"
                            iconClass={"mdi mdi-plus"}
                            text="Создать"
                            size="small"
                            aria-label="Создать пользователя"
                            onClick={() => navigate("/admin/users/user/new")}
                        />
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
};

export default UsersPage;
