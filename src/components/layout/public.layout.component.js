import React from "react";

import '../../styles/App.public.scss';

const PublicLayout = () => {

    return (
        <>
             <header className="header">
                <menu className="menu">
                    <ul className="menu__list">
                        <li>
                            <a className="menu__link" href="">О содружестве</a>
                        </li>
                        <li>
                            <a className="menu__link" href="">Участники</a>
                        </li>
                        <li>
                            <a className="menu__link" href="">Проекты</a>
                        </li>
                        <li>
                            <a className="menu__link" href="">Фестиваль</a>
                        </li>
                        <li>
                            <a className="menu__link" href="">Театральная премия</a>
                        </li>
                    </ul>
                </menu>
             </header>
        </>
    );

}

export default PublicLayout;