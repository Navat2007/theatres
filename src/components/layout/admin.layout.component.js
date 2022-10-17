import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from "../header/header.component";
import Menu from "../menu/menu.component";

const AdminLayout = () => {

    const [burgerOpened, setBurgerOpened] = React.useState(false);
    const menu = [
        {
            title: "Пользователи",
            icon: "--type-users",
            link: "/admin/users"
        },
        {
            title: "Школы",
            icon: "--type-school",
            link: "/admin/schools"
        },
        {
            title: "Мероприятия",
            icon: "--type-theatres",
            link: "/admin/theatres"
        },
        {
            title: "Заявки на участие",
            icon: "--type-requests",
            link: "/admin/requests"
        },
        {
            title: "Расписание матчей",
            icon: "--type-schedule",
            link: "/admin/schedules"
        },
        {
            title: "Регистрация участников",
            icon: "--type-registrations",
            link: "/admin/registrations"
        },
        {
            title: "Победители",
            icon: "--type-winners",
            link: "/admin/winners"
        },
        // {
        //     title: "Статистика",
        //     icon: "--type-statistics",
        //     link: "/admin/statistics"
        // },
        {
            title: "Настройки",
            icon: "--type-settings",
            link: "/admin/settings"
        },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <>
            <Header handleBurger={handleBurgerMenu} />
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main className="content__main">
                <Outlet />
            </main>
        </>
    )
}

export default AdminLayout;