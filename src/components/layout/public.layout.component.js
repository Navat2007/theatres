import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./public.module.scss";
import logo from "../../images/logo.png";

const PublicLayout = () => {
    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.header_wrap}>
                        <img
                            className={styles.header_logo}
                            src={logo}
                            alt="Логотип Содружества"
                        />
                        <nav className={styles.menu}>
                            <ul className={styles.menu_list}>
                                <li>
                                    <Link className={styles.menu_link}>
                                        О Содружестве
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Деятельность
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Театры
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Фестиваль - конкурс «Живая сцена»
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Новости
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer className={styles.footer}>
                    <div className={styles.footer_wrap}>
                        <nav className={styles.menu}>
                            <ul className={styles.menu_list}>
                                <li>
                                    <Link className={styles.menu_link}>
                                        О Содружестве
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Деятельность
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Театры
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Фестиваль - конкурс «Живая сцена»
                                    </Link>
                                </li>
                                <li>
                                    <Link className={styles.menu_link}>
                                        Новости
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
