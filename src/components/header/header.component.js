import React from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import ProfileHeader from "./profile.header.component";
import Button from "../simple/button/button.component";

import {logout} from "../../store/authSlice";

const HeaderComponent = ({ children, handleBurger }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        if(window.confirm("Вы действительно хотите выйти?")){
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    }

    return (
        <header className="header content__header">
            <ProfileHeader className="--place-header" />
            <Button
                className="header__item --type-burger"
                type="button"
                aria-label="Открыть/Закрыть меню"
                onClick={handleBurger}
            />
            <ul className="bread-crumbs">
                <li className="bread-crumbs__item --hide">
                    Пользователи
                </li>
                <li className="bread-crumbs__item --hide">
                    Администраторы
                </li>
                <li className="bread-crumbs__item --hide">
                    Редактирование
                </li>
            </ul>
            {children}
            <Button
                className="header__item --type-exit"
                type="button"
                aria-label="Выйти из профиля"
                onClick={handleLogout}
            >
                <span>Выход</span>
            </Button>
        </header>
    );
};

export default HeaderComponent;