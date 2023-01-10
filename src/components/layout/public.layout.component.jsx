import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import useAuthStore from "../../store/authStore";

import useOnClickOutside from "../../hook/onClickOutside";

import styles from "./public.module.scss";
import logo from "../../images/logo.png";
import { SocialIcons, AdminIcons } from "../svgs.js";

const PublicLayout = () => {
    const { user } = useAuthStore();
    const location = useLocation();
    const node = React.useRef();

    const [burgerOpened, setBurgerOpened] = React.useState(false);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        setBurgerOpened(false);
    }, [location]);

    useOnClickOutside(node, () => {
        // Only if menu is open
        if (burgerOpened) {
            setBurgerOpened(!burgerOpened);
        }
    });

    const menu = [
        {
            ext: false,
            url: "/concord/",
            title: "О Содружестве",
            submenu: [],
        },
        {
            ext: true,
            url: "https://patriotsport.moscow/shkolnyj-teatr/",
            title: "Деятельность",
            submenu: [],
        },
        {
            ext: false,
            url: "/theatres/",
            title: "Театры",
            submenu: [],
        },
        {
            ext: false,
            url: "/posters/",
            title: "Афиши",
            submenu: [],
        },
        {
            ext: false,
            url: "/festivals/",
            title: "«Живая сцена»",
            submenu: [],
        },
        {
            ext: false,
            url: "/news/",
            title: "Новости",
            submenu: [],
        },
    ];

    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.headerWrap}>
                        <NavLink
                            className={styles.headerLogo}
                            to={"/"}
                        >
                            <img
                                src={logo}
                                alt="Логотип Содружества"
                            />
                        </NavLink>
                        <nav
                            ref={node}
                            className={[
                                styles.menu,
                                styles.menuPlaceHeader,
                            ].join(" ")}
                        >
                            <ul
                                className={[
                                    styles.menuList,
                                    burgerOpened ? styles.menuListOpened : "",
                                ].join(" ")}
                            >
                                {menu.map((item) => (
                                    <li key={item.title}>
                                        {item.ext ? (
                                            <a
                                                href={item.url}
                                                target={"_blank"}
                                                className={styles.menuLink}
                                            >
                                                {item.title}
                                            </a>
                                        ) : (
                                            <NavLink
                                                to={item.url}
                                                className={styles.menuLink}
                                            >
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={[
                                    styles.hamburger,
                                    burgerOpened ? styles.hamburgerOpened : "",
                                ].join(" ")}
                                type="button"
                                aria-label="Мобильное меню"
                                onClick={() => setBurgerOpened(!burgerOpened)}
                            >
                                <div></div>
                            </button>
                        </nav>
                    </div>
                </header>
                <main className={styles.main}>
                    <Outlet />
                </main>
                <footer className={styles.footer}>
                    <div className={styles.footerWrap}>
                        <div className={styles.footerColumns}>
                            <div
                                className={[
                                    styles.footerColumn,
                                    styles.footerColumnContentContact,
                                ].join(" ")}
                            >
                                <h2 className={styles.footerColumnHeading}>
                                    Контакты
                                </h2>
                                {/*<a*/}
                                {/*    className={styles.link}*/}
                                {/*    href="tel:84956926572"*/}
                                {/*    rel="nofollow noopener noreferer"*/}
                                {/*>*/}
                                {/*    <span className={styles.linkIcon}>*/}
                                {/*        {AdminIcons.phone}*/}
                                {/*    </span>{" "}*/}
                                {/*    +7 (495) 692-65-72*/}
                                {/*</a>*/}
                                <a
                                    className={styles.link}
                                    href="mailto:sodruzhestvotheatre@edu.mos.ru"
                                    rel="nofollow noopener noreferer"
                                >
                                    <span className={styles.linkIcon}>
                                        {AdminIcons.email}
                                    </span>{" "}
                                    sodruzhestvotheatre@edu.mos.ru
                                </a>
                                <NavLink
                                    to={
                                        user
                                            ? user.role === "user"
                                                ? "/user/my_school"
                                                : "/admin/users"
                                            : "/login/"
                                    }
                                    className={styles.loginLink}
                                >
                                    Войти в Личный кабинет
                                </NavLink>
                            </div>
                            <div
                                className={[
                                    styles.footerColumn,
                                    styles.footerColumnContentNavigation,
                                ].join(" ")}
                            >
                                <h2 className={styles.footerColumnHeading}>
                                    Меню
                                </h2>
                                <nav
                                    className={[
                                        styles.menu,
                                        styles.menuPlaceFooter,
                                    ].join(" ")}
                                >
                                    <ul className={styles.menuList}>
                                        {menu.map((item) => (
                                            <li key={item.title}>
                                                {item.ext ? (
                                                    <a
                                                        href={item.url}
                                                        target={"_blank"}
                                                        className={
                                                            styles.menuLink
                                                        }
                                                    >
                                                        {item.title}
                                                    </a>
                                                ) : (
                                                    <NavLink
                                                        to={item.url}
                                                        className={
                                                            styles.menuLink
                                                        }
                                                    >
                                                        {item.title}
                                                    </NavLink>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            {/*<div className={styles.footerColumn}>*/}
                            {/*    <h2 className={styles.footerColumnHeading}>*/}
                            {/*        Соцсети*/}
                            {/*    </h2>*/}
                            {/*    <a*/}
                            {/*        className={styles.link}*/}
                            {/*        href="#"*/}
                            {/*        rel="nofollow noopener noreferer"*/}
                            {/*    >*/}
                            {/*        <span className={styles.linkIcon}>*/}
                            {/*            {SocialIcons.vk}*/}
                            {/*        </span>{" "}*/}
                            {/*        ВКонтакте*/}
                            {/*    </a>*/}
                            {/*    <a*/}
                            {/*        className={styles.link}*/}
                            {/*        href="#"*/}
                            {/*        rel="nofollow noopener noreferer"*/}
                            {/*    >*/}
                            {/*        <span className={styles.linkIcon}>*/}
                            {/*            {SocialIcons.t}*/}
                            {/*        </span>{" "}*/}
                            {/*        Телеграм*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </div>
                        <a
                            className={styles.footerCopy}
                            href={"https://patriotsport.moscow/"}
                            target={"_blank"}
                        >
                            © 2023г. «Московский центр «Патриот.Спорт»
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;

// <li>
//     <a
//         href="https://patriotsport.moscow/shkolnyj-teatr/"
//         target="_blank"
//         className={[
//             styles.menuLink,
//             // styles.menuLinkOpened,
//         ].join(" ")}
//     >
//         Деятельность
//         {/*
//                                         <span className={styles.dropDownArrow}>
//                                             {AdminIcons.chevron_down}
//                                         </span>
//                                         */}
//     </a>
//     {/*
//                                     <div className={styles.dropDownMenu}>
//                                         <ul
//                                             className={[
//                                                 styles.dropDownMenuList,
//                                                 styles.dropDownMenuListOpened,
//                                             ].join(" ")}
//                                         >
//                                             <li>
//                                                 <Link
//                                                     className={styles.menuLink}
//                                                 >
//                                                     Клуб руководителей школьных
//                                                     театров
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link
//                                                     className={styles.menuLink}
//                                                 >
//                                                     Консультация с наставником
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link
//                                                     className={styles.menuLink}
//                                                 >
//                                                     Методическая поддержка
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                     */}
// </li>
