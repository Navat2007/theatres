import React from "react";
import { Outlet } from 'react-router-dom';

import Header from "../header/header.component";
import Menu from "../menu/menu.component";
import SupportHeaderComponent from "../header/support.header.component";
import ProfileHeader from "../header/profile.header.component";
import {MenuIcons} from '../svgs.js';

const AdminLayout = () => {

    const [burgerOpened, setBurgerOpened] = React.useState(false);
    const menu = [
        {
            title: "Пользователи",
            icon: MenuIcons.users,
            link: "/admin/users"
        },
        {
            title: "Школы",
            icon: MenuIcons.schools,
            link: "/admin/schools"
        },
        {
            title: "Театры",
            icon: MenuIcons.theatres,
            link: "/admin/theatres"
        },
        {
            title: "Заявки на театры",
            icon: MenuIcons.requests,
            link: "/admin/theatreRequests"
        },
        {
            title: "Педагоги",
            icon: MenuIcons.users,
            link: "/admin/teachers"
        },
        // {
        //     title: "Настройки",
        //     icon: "--type-settings",
        //     link: "/admin/settings"
        // },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <div className="content">
            <Header handleBurger={handleBurgerMenu}>
                <SupportHeaderComponent />
                <ProfileHeader />
            </Header>
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main className="content__main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout;