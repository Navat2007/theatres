import React from 'react';
import Button from '../components/simple/button/button.component';

import no_photo_man from '../images/no_photo_man.png';
import Popup from "../components/popup/popup.component";

import useAuthStore from "../store/authStore";

const ProfilePage = () => {

    const {user, fetchEditPhoto} = useAuthStore();

    const [phone, setPhone] = React.useState();
    const [error, setError] = React.useState(false);
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const formatPhone = (value) => {

        if (value === "")
            return "";

        let tmpPhone = value.trim()
            .replaceAll(' ', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('+', '')
            .replaceAll('-', '')
            .replaceAll('_', '')

        if (tmpPhone.startsWith('7'))
            tmpPhone = tmpPhone.substring(1);

        if (tmpPhone.startsWith('8'))
            tmpPhone = tmpPhone.substring(1);

        tmpPhone = `+7 (${tmpPhone.substring(0, 3)}) ${tmpPhone.substring(3, 6)}-${tmpPhone.substring(6, 8)}-${tmpPhone.substring(8, 10)}`

        return tmpPhone;

    }

    const handlePhotoChange = async (e) => {
        if (e.target.files.length > 0) {

            let file = e.target.files[0];

            if (file.type.match('image.*')) {
                if (file.size <= 1500000) {
                    await fetchEditPhoto({id: user.ID, photo: file});
                }
                else {
                    setError("Файл больше 1,5 Мб.");
                    setPopupErrorOpened(true);
                }
            }
            else {
                setError("Файл должен быть изображением.");
                setPopupErrorOpened(true);
            }

        }

    };

    const onDeleteSubmit = async () => {

        await fetchEditPhoto({id: user.ID, delete: 1});

    }

    React.useEffect(() => {

        setPhone(formatPhone(user.phone));

    }, [user]);

    return (
        <div className='content__section'>
            <h1 className="content__title">Информация о профиле</h1>
            <div className="profile-card">
                <div className="profile-card__img-block">
                    <img className='profile-card__img'
                        src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man} alt={user?.fio} />
                    <div className="profile-card__img-panel">
                        {
                            user?.photo !== ""
                            &&
                            <>
                                <Button
                                    type='button'
                                    size='small'
                                    theme='text'
                                    isIconBtn={true}
                                    iconClass='mdi mdi-refresh'
                                    aria-label="Обновить фото"
                                    onClick={(e) => {
                                        document.getElementById('img-profile').click();
                                    }}
                                />
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    isIconBtn={true}
                                    iconClass='mdi mdi-delete'
                                    aria-label="Удалить фото"
                                    onClick={(e) => {
                                        setPopupOpened(true);
                                    }}
                                />
                            </>
                        }
                        {
                            user?.photo === ""
                            &&
                            <Button
                                type='button'
                                size='small'
                                theme='text'
                                isIconBtn={true}
                                iconClass='mdi mdi-plus-circle'
                                aria-label="Добавить фото"
                                onClick={(e) => {
                                    document.getElementById('img-profile').click();
                                }}
                            />
                        }
                    </div>
                    <input className='profile-card__img-input' id="img-profile" type="file"
                        onChange={handlePhotoChange} />
                </div>
                <div className="profile-card__info-block">
                    <h2 className="profile-card__title">{user?.fio}</h2>
                    <ul className="profile-card__table">
                        <li>
                            <h3 className='profile-card__text'>{user.email ? user.email : user.login}</h3>
                            <p className='profile-card__description'>E-mail (логин)</p>
                        </li>
                        <li>
                            <h3 className='profile-card__text'>{user?.role_title}</h3>
                            <p className='profile-card__description'>Должность</p>
                        </li>
                    </ul>
                </div>
                <ul className="profile-card__row profile-card__table">
                    {
                        phone
                        &&
                        <li>
                            <a href={`tel:${phone}`}
                                className='profile-card__item link --type-icon --icon-phone'
                                rel='noreferrer nofollow noopener'
                                target='_blank'
                            >
                                {phone}
                            </a>
                        </li>
                    }
                    {
                        user?.org_name && user?.org_short_name && user?.org_name !== "" && user?.org_short_name !== ""
                        &&
                        <li>
                            <p className='profile-card__item link --type-icon --icon-company'>
                                {user?.org_name}
                                <span className='profile-card__description'>{user?.org_short_name}</span>
                            </p>
                        </li>
                    }
                    {
                        user?.mrsd && user?.mrsd.length > 0 && user?.mrsd[0] !== "" && user?.mrsd[0] !== 0
                        &&
                        <li>
                            <p className='profile-card__item link --type-icon --icon-district'>
                                {
                                    user.mrsd.map(mrsd => <>№ {mrsd} </>)
                                }
                                <span className='profile-card__description'>(Межрайон)</span>
                            </p>
                        </li>
                    }
                </ul>
            </div>
            <Popup
                title={"Вы уверены что хотите удалить?"}
                notif={{
                    active: true,
                    state: "alert"
                }}
                opened={popupOpened}
                onClose={() => setPopupOpened(false)}
                buttons={
                    <>
                        <Button
                            text={"Да"}
                            onClick={() => {
                                setPopupOpened(false);
                                onDeleteSubmit();
                            }}
                        />
                        <Button
                            text={"Нет"}
                            theme="text"
                            onClick={() => setPopupOpened(false)}
                        />
                    </>
                }
            />
            <Popup
                title={"Ошибка!"}
                notif={{
                    active: true,
                    state: "error",
                    text: error,
                }}
                opened={popupErrorOpened}
                onClose={() => setPopupErrorOpened(false)}
            />
        </div>
    );
};

export default ProfilePage;