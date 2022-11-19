import React from 'react';

import ProfileHeader from "./profile.header.component";
import Button from "../simple/button/button.component";

import styles from './header.module.scss';

const HeaderComponent = ({ children, handleBurger }) => {

    return (
        <header className={styles.header}>
            <Button
                type='button'
                theme='text'
                isIconBtn={true}
                iconClass='mdi mdi-menu'
                extraClass={styles.item}
                aria-label="Открыть/Закрыть меню"
                onClick={handleBurger}
            />
            {children}
        </header>
    );
};

export default HeaderComponent;