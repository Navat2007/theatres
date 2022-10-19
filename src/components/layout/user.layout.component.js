import { Outlet } from 'react-router-dom';

import Header from "../header/header.component";
import SupportHeaderComponent from "../header/support.header.component";
import Menu from "../menu/menu.component";

const UserLayout = () => {

    const menu = [
        {
            title: "Моя школа",
            icon: "",
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
    ];

    return (
        <>
            <Header>
                <SupportHeaderComponent />
            </Header>
            <Menu menu={menu} />
            <main className="content__main">
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout;