import React from 'react';

import ProfileHeader from "./profile.header.component";
import Button from "../simple/button/button.component";

const HeaderComponent = ({ children, handleBurger }) => {

    return (
        <header className="header content__header">
            <Button
                className="header__item --type-burger"
                type="button"
                aria-label="Открыть/Закрыть меню"
                onClick={handleBurger}
            />
            {children}
            <ProfileHeader className="--place-header" />
        </header>
    );
};

export default HeaderComponent;