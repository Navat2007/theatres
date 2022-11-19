import React from "react";
import { Outlet } from 'react-router-dom';

import Header from "../header/header.component";
import ProfileHeader from "../header/profile.header.component";
import SupportHeaderComponent from "../header/support.header.component";
import Menu from "../menu/menu.component";

const UserLayout = () => {

    const [burgerOpened, setBurgerOpened] = React.useState(false);

    const menu = [
        {
            title: "Моя школа",
            icon: "--type-my-school",
            link: "/user/my_school"
        },
        {
            title: "Театры",
            icon: "--type-theatres",
            link: "/user/theatres"
        },
        {
            title: "Заявки на театры",
            icon: "--type-requests",
            link: "/user/theatreRequests"
        },
        {
            title: "Педагоги",
            icon: "--type-users",
            link: "/user/teachers"
        },
        {
            title: "Афиши",
            icon: "--type-poster",
            link: "/user/posters"
        },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <div className="content">
            <Header handleBurger={handleBurgerMenu}>
                <SupportHeaderComponent />
                <ProfileHeader className="--place-header" />
            </Header>
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main className="content__main">
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout;