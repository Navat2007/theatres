import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Button from "../simple/button/button.component";

import no_photo_man from '../../images/no_photo_man.png';
import {logout} from "../../store/authSlice";
import Popup from "../popup/popup.component";

const ProfileHeader = ({className}) => {

    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userRole, setUserRole] = React.useState("");

    const [popupOpened, setPopupOpened] = React.useState(false);

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
        <div className={`profile ${className}`}>
            <div className='profile__content' onClick={() => { navigate("/profile")}}>
                <img className="profile__img" src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man} alt="Фото профиля" />
                <div className="profile__info">
                    <p className="profile__title">{user?.email}</p>
                    <p className="profile__subtitle">{userRole}</p>
                </div>
            </div>
            <Button
                className="profile__btn"
                type="button"
                text={""}
                aria-label="Выйти из профиля"
                onClick={() => setPopupOpened(true)}
            >
            </Button>
            <Popup
                title={"Вы действительно хотите выйти?"}
                opened={popupOpened}
                onClose={()=> { setPopupOpened(false); }}
            >
                <Button
                    text={"Нет"}
                    className='--theme-text'
                    onClick={() => setPopupOpened(false)}
                />
                <Button
                    text={"Да"}
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login", { replace: true });
                    }}
                />
            </Popup>
        </div>
    );
};

export default ProfileHeader;