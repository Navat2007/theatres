import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/header.component";
import ProfileHeader from "../header/profile.header.component";
import SupportHeaderComponent from "../header/support.header.component";
import Menu from "../menu/menu.component";
import { MenuIcons } from "../svgs.js";
import styles from "./admin.module.scss";

const UserLayout = () => {
    const [burgerOpened, setBurgerOpened] = React.useState(false);

    const menu = [
        {
            title: "Моя школа",
            icon: MenuIcons.my_school,
            link: "/user/my_school",
        },
        {
            title: "Мой театр",
            icon: MenuIcons.theatres,
            link: "/user/theatres",
        },
        {
            title: "Заявки на модерации",
            icon: MenuIcons.requests,
            link: "/user/theatreRequests",
        },
        {
            title: "Педагоги",
            icon: MenuIcons.users,
            link: "/user/teachers",
        },
        // {
        //     title: "Афиши",
        //     icon: MenuIcons.poster,
        //     link: "/user/posters",
        // },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <div className={styles.content}>
            <Header handleBurger={handleBurgerMenu}>
                <SupportHeaderComponent />
                <ProfileHeader />
            </Header>
            <Menu
                menu={menu}
                burgerOpened={burgerOpened}
                setBurgerOpened={handleBurgerMenu}
            />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
