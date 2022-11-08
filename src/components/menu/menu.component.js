import React from 'react';

import { NavLink } from "react-router-dom";

import logo from "../../images/login/logo.png";
import Button from "../simple/button/button.component";

const Menu = ({ menu, burgerOpened, setBurgerOpened }) => {

    const [menuSize, setMenuSize] = React.useState("");

    const handleResize = () => {

        switch (menuSize) {
            case "":
                setMenuSize("--size-md");
                localStorage.setItem('menuSize', "--size-md");
                break;
            case "--size-md":
                setMenuSize("--size-sm");
                localStorage.setItem('menuSize', "--size-sm");
                break;
            case "--size-sm":
                setMenuSize("");
                localStorage.setItem('menuSize', "");
                break;
            default:
                break;
        }

    };

    React.useEffect(() => {

        const menuSizeStorage = localStorage.getItem('menuSize');

        if (menuSizeStorage)
            setMenuSize(menuSizeStorage);

    }, []);

    return (
        <menu className={`menu content__menu ${burgerOpened ? "--opened" : ""} ${menuSize}`}>
            <div className="menu__container">
                <div className="menu__logo-block">
                    <img className='logo --place-menu' src={logo} alt="Маски" />
                    <p className='menu__title'>Школьные театры</p>
                </div>
                <ul className="menu__list">
                    {
                        menu.map(item => (
                            <li key={item.title}>
                                <NavLink to={item.link} className={({ isActive }) => isActive ? "menu__link --actived" : "menu__link"} aria-label={item.title}>
                                    <span className={`menu__icon icon ${item.icon}`} />
                                    <p className="menu__text">{item.title}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <Button
                    type='button'
                    extraClass='menu__button'
                    iconClass='mdi mdi-chevron-left'
                    aria-label="Свернуть/Развернуть меню"
                    onClick={handleResize}
                />
            </div>
            <div className="menu__back" onClick={setBurgerOpened} />
        </menu>
    );
};

export default Menu;