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
                            className={[
                                styles.menu,
                                styles.menuPlaceHeader,
                            ].join(" ")}
                        >
                            <ul
                                ref={node}
                                className={[
                                    styles.menuList,
                                    burgerOpened ? styles.menuListOpened : "",
                                ].join(" ")}
                            >
                                <li>
                                    <NavLink
                                        to={"/concord/"}
                                        className={styles.menuLink}
                                    >
                                        О Содружестве
                                    </NavLink>
                                </li>
                                <li>
                                    <Link
                                        className={[
                                            styles.menuLink,
                                            // styles.menuLinkOpened,
                                        ].join(" ")}
                                    >
                                        Деятельность
                                        {/*
                                        <span className={styles.dropDownArrow}>
                                            {AdminIcons.chevron_down}
                                        </span>
                                        */}
                                    </Link>
                                    {/*
                                    <div className={styles.dropDownMenu}>
                                        <ul
                                            className={[
                                                styles.dropDownMenuList,
                                                styles.dropDownMenuListOpened,
                                            ].join(" ")}
                                        >
                                            <li>
                                                <Link
                                                    className={styles.menuLink}
                                                >
                                                    Клуб руководителей школьных
                                                    театров
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={styles.menuLink}
                                                >
                                                    Консультация с наставником
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={styles.menuLink}
                                                >
                                                    Методическая поддержка
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    */}
                                </li>
                                <li>
                                    <Link
                                        className={styles.menuLink}
                                    >
                                        Театры
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menuLink}>
                                        Фестиваль - конкурс «Живая сцена»
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.menuLink}
                                    >
                                        Новости
                                    </Link>
                                </li>
                            </ul>
                            {/* Если не входит то добавляется этот список - выпадающее меню, как в школе. Туда переносятся все пункты с конца, которые не влезли по ширине */}
                            {/*
                            <ul
                                className={[
                                    styles.menuListMobile,
                                    // styles.menuListMobileOpened,
                                ].join(" ")}
                            >
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
                                        to={"/"}
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
                                    <NavLink
                                        to={"/"}
                                        className={styles.menuLink}
                                    >
                                        Новости
                                    </NavLink>
                                </li>
                            </ul>
                             */}
                            {/* При нажатии добавляем еще класс styles.hamburgerOpened
                            Если Меню входит по ширине экрана - кнопку не выводим */}
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
                            <div className={[
                                    styles.footerColumn,
                                    styles.footerColumnContentNavigation,
                                ].join(" ")}>
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
