import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./public.module.scss";
import logo from "../../images/logo.png";

const PublicLayout = () => {
    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.header_wrap}>
                        <a
                            className={styles.header_logo}
                            rel="noopener nofolloe noreferer"
                        >
                            <img
                                src={logo}
                                alt="Логотип Содружества"
                            />
                        </a>
                        <menu className={styles.menu}>
                            <ul className={styles.menu_list}>
                                <li>
                                    <a className={styles.menu_link}>
                                        О содружестве
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Участники
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>Проекты</a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Фестиваль
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Театральная премия
                                    </a>
                                </li>
                            </ul>
                        </menu>
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
                                    <a className={styles.menu_link}>
                                        О содружестве
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Участники
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>Проекты</a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Фестиваль
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.menu_link}>
                                        Театральная премия
                                    </a>
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
