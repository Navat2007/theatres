import React from 'react';

import { NavLink } from "react-router-dom";

import logo from "../../images/login/logo.png";
import Button from "../simple/button/button.component";

import styles from './menu.module.scss';

const Menu = ({ menu, burgerOpened, setBurgerOpened }) => {

    const [menuSize, setMenuSize] = React.useState("");
    const [menuSizeClass, setMenuSizeClass] = React.useState("");

    const handleResize = () => {

        switch (menuSize) {
            case "":
                setMenuSize("--size-md");
                setMenuSizeClass(styles.menu_size_md);
                localStorage.setItem('menuSize', "--size-md");
                break;
            case "--size-md":
                setMenuSize("--size-sm");
                setMenuSizeClass(styles.menu_size_sm);
                localStorage.setItem('menuSize', "--size-sm");
                break;
            case "--size-sm":
                setMenuSize("");
                setMenuSizeClass("");
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
        <menu className={styles.menu + ` ${burgerOpened ? styles.menu_opened : ""} ${menuSizeClass}`}>
            <div className={styles.container}>
                <div className={styles.logo_block}>
                    <img className='logo --place-menu' src={logo} alt="Маски" />
                    <p className={styles.title}>Школьные театры</p>
                </div>
                <ul className={styles.list}>
                    {
                        menu.map(item => (
                            <li key={item.title}>
                                <NavLink to={item.link}
                                    className={({ isActive }) => isActive ? styles.link + ` ` + styles.link_actived : styles.link} aria-label={item.title}>
                                    <span className={`${styles.icon} icon ${item.icon}`} />
                                    <p className={styles.text}>{item.title}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <Button
                    type='button'
                    isIconBtn='true'
                    iconClass='mdi mdi-chevron-left'
                    extraClass={styles.button}
                    aria-label="Свернуть/Развернуть меню"
                    onClick={handleResize}
                />
            </div>
            <div className={styles.back} onClick={setBurgerOpened} />
        </menu>
    );
};

export default Menu;