import React from "react";
import { Outlet } from "react-router-dom";

import logo from "../../images/public_logo.png";

const PublicLayout = () => {
    return (
        <>
            <div className="public-content">
                <header className="header">
                    <div className="header__wrap">
                        <a
                            className="header__logo"
                            rel="noopener nofolloe noreferer"
                        >
                            <img
                                src={logo}
                                alt="Логотип Содружества"
                            />
                        </a>
                        <menu className="menu">
                            <ul className="menu__list">
                                <li>
                                    <a className="menu__link">О содружестве</a>
                                </li>
                                <li>
                                    <a className="menu__link">Участники</a>
                                </li>
                                <li>
                                    <a className="menu__link">Проекты</a>
                                </li>
                                <li>
                                    <a className="menu__link">Фестиваль</a>
                                </li>
                                <li>
                                    <a className="menu__link">
                                        Театральная премия
                                    </a>
                                </li>
                            </ul>
                        </menu>
                    </div>
                </header>
                <main className="public-content__main">
                    <Outlet />
                </main>
                <footer className="footer">
                    <div className="footer__wrap">
                        <nav className="menu">
                            <ul className="menu__list">
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        О содружестве
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Участники
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Проекты
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
                                        Фестиваль
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="menu__link"
                                        href=""
                                    >
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
