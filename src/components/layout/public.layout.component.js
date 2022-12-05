import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./public.module.scss";
import logo from "../../images/logo.png";

const PublicLayout = () => {
    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.header_wrap}>
                        <NavLink to={"/"} >
                            <img
                                className={styles.header_logo}
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
                                    <Link className={styles.menu_link}>
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
                            <div className={styles.footerColumn}>
                                <h2 className={styles.footerColumnHeading}>
                                    Контакты
                                </h2>
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
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
