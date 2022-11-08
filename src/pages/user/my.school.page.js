import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import Button from "../../components/simple/button/button.component";
import Popup from "../../components/popup/popup.component";
import FieldInput from "../../components/simple/field/field.input.component";

import {fetchEditSchool, editSchoolPhoto, loadSchool} from "../../store/user/schoolSlice";

const MySchoolPage = () => {

    const dispatch = useDispatch();
    const userStore = useSelector(state => state.auth);
    const schoolStore = useSelector(state => state.school);

    const { register, handleSubmit, reset } = useForm();

    const [phone, setPhone] = React.useState();
    const [error, setError] = React.useState(false);

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);
    const [popupSchoolEditOpened, setPopupSchoolEditOpened] = React.useState(false);

    const fetchData = async () => {

        await dispatch(loadSchool({id: userStore.user.schoolID}));

    }

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
                    dispatch(editSchoolPhoto({id: userStore.user.schoolID, photo: file}));
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

    const onPhotoDeleteSubmit = async () => {

        await dispatch(editSchoolPhoto({id: userStore.user.schoolID, delete: 1}));

    }

    const onSchoolEditSubmit = async (params) => {

        params.id = userStore.user.schoolID;
        await dispatch(fetchEditSchool(params));
        setPopupSchoolEditOpened(false);
        fetchData();

    }

    React.useEffect(() => {

        fetchData();

    }, []);

    React.useEffect(() => {

        console.log(schoolStore.school);

        if(schoolStore.school && schoolStore.school.dir_phone)
            setPhone(formatPhone(schoolStore.school.dir_phone));

    }, [schoolStore.school]);

    if (schoolStore.status === "loading")
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (schoolStore.status === "error" || (schoolStore.status === "done" && schoolStore.school === null))
        return <div className='content__section'><p>Ошибка загрузки школы</p></div>;

    return (
        <div className='content__section'>
            <h1 className="content__title">Информация о школе</h1>
            <Button
                type="button"
                text="Редактировать"
                onClick={() => {
                    setPopupSchoolEditOpened(true);
                }}
            />
            <div className="profile-card">
                <div className="profile-card__img-block">
                    <img className='profile-card__img'
                         src={schoolStore.school?.photo !== "" ? window.global.baseUrl + schoolStore.school?.photo : ""} alt={"Логотип школы"} />
                    <div className="profile-card__img-panel">
                        {
                            schoolStore.school?.photo !== ""
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
                            schoolStore.school?.photo === ""
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
                    <ul className="profile-card__table">
                        <li>
                            <h3 className='profile-card__text'>{schoolStore.school.org_name}</h3>
                            <p className='profile-card__description'>Полное наименование организации</p>
                        </li>
                        <li>
                            <h3 className='profile-card__text'>{schoolStore.school.org_short_name}</h3>
                            <p className='profile-card__description'>Краткое наименование организации</p>
                        </li>
                    </ul>
                </div>
                <ul className="profile-card__row profile-card__table">
                    {
                        schoolStore.school.dir_fio && schoolStore.school.dir_fio !== ""
                        &&
                        <li>
                            <p className='profile-card__item link --type-icon --icon-company'>
                                {schoolStore.school.dir_fio}
                                <span className='profile-card__description'>ФИО директора/руководителя</span>
                            </p>
                        </li>
                    }
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
                                <span className='profile-card__description'>Телефон директора/руководителя школы</span>
                            </a>
                        </li>
                    }
                    {
                        schoolStore.school.dir_email && schoolStore.school.dir_email !== ""
                        &&
                        <li>
                            <p className='profile-card__item link --type-icon --icon-district'>
                                {
                                    schoolStore.school.dir_email
                                }
                                <span className='profile-card__description'>Email директора/руководителя школы</span>
                            </p>
                        </li>
                    }
                    {
                        schoolStore.school.address && schoolStore.school.address !== ""
                        &&
                        <li>
                            <p className='profile-card__item link --type-icon --icon-district'>
                                {
                                    schoolStore.school.address
                                }
                                <span className='profile-card__description'>Адрес</span>
                            </p>
                        </li>
                    }
                </ul>
            </div>
            <Popup
                title={"Редактирование школы"}
                opened={popupSchoolEditOpened}
                onClose={() => {
                    setPopupSchoolEditOpened(false);
                }}
            >
                <form onSubmit={handleSubmit(onSchoolEditSubmit)} className='form'>
                    <fieldset className='form__section --content-info'>
                        <FieldInput
                            label={"Полное наименование организации:"}
                            type={"textarea"}
                            rows={5}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("org_name", { value: schoolStore.school.org_name })}
                        />
                        <FieldInput
                            label={"Краткое наименование организации:"}
                            type={"textarea"}
                            rows={2}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("org_short_name", { value: schoolStore.school.org_short_name })}
                        />
                        <FieldInput
                            label={"ФИО директора/руководителя:"}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("dir_fio", { value: schoolStore.school.dir_fio })}
                        />
                        <FieldInput
                            label={"Телефон директора/руководителя школы:"}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("dir_phone", { value: schoolStore.school.dir_phone })}
                        />
                        <FieldInput
                            label={"Email директора/руководителя школы:"}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("dir_email", { value: schoolStore.school.dir_email })}
                        />
                        <FieldInput
                            label={"Адрес школы:"}
                            type={"textarea"}
                            rows={3}
                            placeholder={"..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("address", { value: schoolStore.school.address })}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={schoolStore.status === "sending"}
                            style={{marginLeft: 'auto', display: 'block'}}/>
                    </div>
                </form>
            </Popup>
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
                                onPhotoDeleteSubmit();
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

export default MySchoolPage;