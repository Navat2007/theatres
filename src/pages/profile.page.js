import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import no_photo_man from '../images/no_photo_man.png';

const ProfilePage = () => {

    const {user} = useSelector(state => state.auth);
    const [phone, setPhone] = React.useState();

    const formatPhone = (value) => {

        let tmpPhone = value.trim()
            .replaceAll(' ', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('+', '')
            .replaceAll('-', '')
            .replaceAll('_', '')

        if(tmpPhone.startsWith('7'))
            tmpPhone = tmpPhone.substring(1);

        if(tmpPhone.startsWith('8'))
            tmpPhone = tmpPhone.substring(1);

        tmpPhone = `+7 (${tmpPhone.substring(0, 3)}) ${tmpPhone.substring(3, 6)}-${tmpPhone.substring(6, 8)}-${tmpPhone.substring(8, 10)}`

        return tmpPhone;

    }

    const handlePhotoChange = (e) => {
        if(e.target.files.length > 0){

            let file = e.target.files[0];

            console.log(file);
            if (file.type.match('image.*')) {
                if(file.size <= 1500000){

                }
            }

        }

    };

    React.useEffect(() => {
        console.log(user);
        setPhone(formatPhone(user.phone));
    }, [user]);

    return (
        <div className='content__section'>
            <h1 className="content__title">Информация о профиле</h1>
            <div className="profile-card">
                <div className="profile-card__img-block">
                    <img className='profile-card__img'
                         src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man} alt={user?.fio}/>
                    <label className='profile-card__img-label' htmlFor="img-profile"><span className='mdi mdi-refresh'
                                                                                           aria-label='Обновить фото'/></label>
                    <input className='profile-card__img-input' id={"img-profile"} type="file" onChange={handlePhotoChange}/>
                </div>
                <div className="profile-card__info-block">
                    <h2 className="profile-card__title">{user?.fio}</h2>
                    <ul className="profile-card__table">
                        <li>
                            <h3 className='profile-card__text'>{user?.email}</h3>
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
        </div>
    );
};

export default ProfilePage;