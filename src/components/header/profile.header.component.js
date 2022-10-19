import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Button from "../simple/button/button.component";

import no_photo_man from '../../images/no_photo_man.png';

const ProfileHeader = ({className}) => {

    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [userRole, setUserRole] = React.useState("");

    React.useEffect(() => {

        switch (user.role){
            case "superadmin":
                setUserRole("Главный администратор");
                break;
            case "admin":
                setUserRole("Администратор");
                break;
            case "user":
                setUserRole("Представитель школы");
                break;
            default:
                setUserRole("");
                break;
        }

    }, [user.role]);

    return (
        <div className={`profile ${className}`} onClick={() => { navigate("/profile")}}>
            <img className="profile__img" src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man} alt="Фото профиля" />
            <div className="profile__info">
                <p className="profile__title">{user?.email}</p>
                <p className="profile__subtitle">{userRole}</p>
            </div>
            <Button
                className="profile__btn"
                type="button"
                aria-label="Выйти из профиля"
            >
            </Button>
        </div>
    );
};

export default ProfileHeader;