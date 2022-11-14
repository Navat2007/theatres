import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from "../simple/button/button.component";
import Popup from "../popup/popup.component";

import no_photo_man from '../../images/no_photo_man.png';

import useAuthStore from "../../store/authStore";

const ProfileHeader = ({ className }) => {

    const {user, logout} = useAuthStore();
    const navigate = useNavigate();

    const [userRole, setUserRole] = React.useState("");
    const [popupOpened, setPopupOpened] = React.useState(false);

    React.useEffect(() => {

        switch (user.role) {
            case "superadmin":
                setUserRole("Главный администратор");
                break;
            case "admin":
                setUserRole("Администратор");
                break;
            case "user":
                setUserRole("Пользователь");
                break;
            default:
                setUserRole("");
                break;
        }

    }, [user.role]);

    return (
        <div className={`profile ${className}`}>
            <div
                className='profile__content'
                onClick={() => { navigate("/profile") }}
            >
                <img className="profile__img"
                    src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man} alt="Фото профиля" />
                <p className="profile__title">{user.login ? user.login : user.email}</p>
                <p className="profile__subtitle">{userRole}</p>
            </div>
            <Button
                type='button'
                theme='text'
                isIconBtn={true}
                iconClass='mdi mdi-location-exit'
                aria-label="Выйти из профиля"
                onClick={() => setPopupOpened(true)}
            />
            <Popup
                title={"Вы действительно хотите выйти?"}
                notif={{
                    active: true,
                }}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
                buttons={<>
                    <Button
                        type='button'
                        text="Да"
                        onClick={() => {
                            logout();
                            navigate("/", { replace: true });
                        }}
                    />
                    <Button
                        type='button'
                        text="Нет"
                        theme="text"
                        onClick={() => setPopupOpened(false)}
                    />
                </>}
            />
        </div>
    );
};

export default ProfileHeader;