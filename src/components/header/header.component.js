import React from "react";

import ProfileHeader from "./profile.header.component";
import Button from "../simple/button/button.component";
import logo from "../../images/logo.png";
import styles from "./header.module.scss";

const HeaderComponent = ({ children, handleBurger }) => {
    return (
        <header className={styles.header}>
            <img
                className={styles.logo}
                src={logo}
                alt="Маски"
            />
            <Button
                type="button"
                theme="text"
                isIconBtn={true}
                iconClass="mdi mdi-menu"
                extraClass={styles.burger}
                aria-label="Открыть/Закрыть меню"
                onClick={handleBurger}
            />
            {children}
        </header>
    );
};

export default HeaderComponent;
