import React from 'react';

import ProfileHeader from '../header/profile.header.component';

import { NavLink } from "react-router-dom";

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
        <menu className={`menu ${burgerOpened ? "--opened" : ""} ${menuSize}`}>
            <div className="menu__container">
                <ProfileHeader className="--place-menu" />
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
                <button
                    className="menu__button"
                    type="button"
                    aria-label="Свернуть/Развернуть меню"
                    onClick={handleResize}
                />
            </div>
            <div className="menu__back" onClick={setBurgerOpened}/>
        </menu>
    );
};

export default Menu;