import React from "react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";

import useAuthStore from "../../store/authStore";

import styles from "./public.module.scss";
import logo from "../../images/logo.png";
import { SocialIcons, AdminIcons } from "../svgs.js";

const PublicLayout = () => {

    const {user} = useAuthStore();
    const location = useLocation();

    React.useEffect(() => {
        document.body.scrollTo(0, 0);
    }, [location]);

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
                        <nav className={styles.menu}>
                            <ul className={styles.menuList}>
                                <li>
                                    <NavLink
                                        to={"/concord/"}
                                        className={styles.menuLink}
                                    >
                                        О Содружестве
                                    </NavLink>
                                </li>
                                <li>
                                    <Link className={styles.menuLink}>
                                        Деятельность
                                    </Link>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/theatre/"}
                                        className={styles.menuLink}
                                    >
                                        Театры
                                    </NavLink>
                                </li>
                                <li>
                                    <Link className={styles.menuLink}>
                                        Фестиваль - конкурс «Живая сцена»
                                    </Link>
                                </li>
                                <li>
                                    <NavLink to={"/news/"} className={styles.menuLink}>
                                        Новости
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
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
                                <a
                                    className={styles.link}
                                    href="tel:84956926572"
                                    rel="nofollow noopener noreferer"
                                >
                                    <span className={styles.linkIcon}>
                                        {AdminIcons.phone}
                                    </span>{" "}
                                    +7 (495) 692-65-72
                                </a>
                                <a
                                    className={styles.link}
                                    href="mailto:test@mail.ru"
                                    rel="nofollow noopener noreferer"
                                >
                                    <span className={styles.linkIcon}>
                                        {AdminIcons.email}
                                    </span>{" "}
                                    test@mail.ru
                                </a>
                                <NavLink to={user ? (user.role === "user" ? "/user/" : "/admin/") : "/login/"} className={styles.loginLink}>
                                    Войти в Личный кабинет
                                </NavLink>
                            </div>
                            <div className={styles.footerColumn}>
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
                                        <li>
                                            <Link className={styles.menuLink}>
                                                О Содружестве
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={styles.menuLink}>
                                                Деятельность
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={styles.menuLink}>
                                                Театры
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={styles.menuLink}>
                                                Фестиваль - конкурс «Живая
                                                сцена»
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={styles.menuLink}>
                                                Новости
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className={styles.footerColumn}>
                                <h2 className={styles.footerColumnHeading}>
                                    Соцсети
                                </h2>
                                <a
                                    className={styles.link}
                                    href="#"
                                    rel="nofollow noopener noreferer"
                                >
                                    <span className={styles.linkIcon}>
                                        {SocialIcons.vk}
                                    </span>{" "}
                                    ВКонтакте
                                </a>
                                <a
                                    className={styles.link}
                                    href="#"
                                    rel="nofollow noopener noreferer"
                                >
                                    <span className={styles.linkIcon}>
                                        {SocialIcons.t}
                                    </span>{" "}
                                    Телеграм
                                </a>
                            </div>
                        </div>
                        <p className={styles.footerCopy}>
                            © 2022г. «Московский центр «Патриот.Спорт»
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
