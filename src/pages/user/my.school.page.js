import React from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/simple/button/button.component";
import Popup from "../../components/popup/popup.component";
import FieldInput from "../../components/simple/field/field.input.component";

import useAuthStore from "../../store/authStore";
import useSchoolStore from "../../store/user/schoolStore";
import Notif from "../../components/notif/notif.component";
import commonStyles from "../common.module.scss";

const MySchoolPage = () => {
    const { user } = useAuthStore();
    const {
        school,
        loadSchool,
        editSchool,
        editSchoolPhoto,
        loading,
        sending,
        error,
        errorText,
        setErrorText,
        clearErrorText,
    } = useSchoolStore();

    const { register, handleSubmit, reset } = useForm();

    const [phone, setPhone] = React.useState();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);
    const [popupSchoolEditOpened, setPopupSchoolEditOpened] =
        React.useState(false);

    const fetchData = async () => {
        await loadSchool({ id: user.schoolID });
    };

    const formatPhone = (value) => {
        if (value === "") return "";

        let tmpPhone = value
            .trim()
            .replaceAll(" ", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("+", "")
            .replaceAll("-", "")
            .replaceAll("_", "");

        if (tmpPhone.startsWith("7")) tmpPhone = tmpPhone.substring(1);

        if (tmpPhone.startsWith("8")) tmpPhone = tmpPhone.substring(1);

        tmpPhone = `+7 (${tmpPhone.substring(0, 3)}) ${tmpPhone.substring(
            3,
            6
        )}-${tmpPhone.substring(6, 8)}-${tmpPhone.substring(8, 10)}`;

        return tmpPhone;
    };

    const handlePhotoChange = async (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];

            if (file.type.match("image.*")) {
                if (file.size <= 1500000) {
                    await editSchoolPhoto({ id: user.schoolID, photo: file });
                } else {
                    setErrorText("Файл больше 1,5 Мб.");
                    setPopupErrorOpened(true);
                }
            } else {
                setErrorText("Файл должен быть изображением.");
                setPopupErrorOpened(true);
            }
        }
    };

    const onPhotoDeleteSubmit = async () => {
        await editSchoolPhoto({ id: user.schoolID, delete: 1 });
    };

    const onSchoolEditSubmit = async (params) => {
        params.id = user.schoolID;
        await editSchool(params);
        setPopupSchoolEditOpened(false);
        await fetchData();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        if (school && school.dir_phone) setPhone(formatPhone(school.dir_phone));
    }, [school]);

    React.useEffect(() => {
        if (error) setPopupErrorOpened(true);
    }, [error]);

    if (loading) return <p>Загрузка...</p>;

    if (!loading && school === null) return <p>Ошибка загрузки школы</p>;

    return (
        <>
            <div className={commonStyles.title_block}>
                <h1 className={commonStyles.title}>Информация о школе</h1>
            </div>
            <div className={commonStyles.profile}>
                <div className={commonStyles.profile_img_block}>
                    <img
                        className={commonStyles.profile_img}
                        src={
                            school?.photo !== ""
                                ? window.global.baseUrl + school?.photo
                                : ""
                        }
                        alt={"Логотип школы"}
                    />
                    <div className={commonStyles.profile_img_panel}>
                        {school?.photo !== "" && (
                            <>
                                <Button
                                    type="button"
                                    size="small"
                                    theme="text"
                                    isIconBtn={true}
                                    iconClass="mdi mdi-refresh"
                                    aria-label="Обновить фото"
                                    onClick={(e) => {
                                        document
                                            .getElementById("img-profile")
                                            .click();
                                    }}
                                />
                                <Button
                                    type="button"
                                    theme="text"
                                    size="small"
                                    isIconBtn={true}
                                    iconClass="mdi mdi-delete"
                                    aria-label="Удалить фото"
                                    onClick={(e) => {
                                        setPopupOpened(true);
                                    }}
                                />
                            </>
                        )}
                        {school?.photo === "" && (
                            <Button
                                type="button"
                                size="small"
                                theme="text"
                                isIconBtn={true}
                                iconClass="mdi mdi-plus-circle"
                                aria-label="Добавить фото"
                                onClick={(e) => {
                                    document
                                        .getElementById("img-profile")
                                        .click();
                                }}
                            />
                        )}
                    </div>
                    <input
                        className={commonStyles.profile_img_input}
                        id="img-profile"
                        type="file"
                        onChange={handlePhotoChange}
                    />
                </div>
                <div className={commonStyles.profile_info}>
                    <ul className={commonStyles.profile_table}>
                        <li>
                            <h3 className={commonStyles.profile_text}>
                                {school.org_name}
                            </h3>
                            <p className={commonStyles.profile_description}>
                                Полное наименование организации
                            </p>
                        </li>
                        <li>
                            <h3 className={commonStyles.profile_text}>
                                {school.org_short_name}
                            </h3>
                            <p className={commonStyles.profile_description}>
                                Краткое наименование организации
                            </p>
                        </li>
                    </ul>
                    <Button
                        theme="outline"
                        iconClass={"mdi mdi-pencil"}
                        size="small"
                        type="button"
                        text="Редактировать"
                        extraClass={commonStyles.profile_edit_btn}
                        onClick={() => {
                            setPopupSchoolEditOpened(true);
                        }}
                    />
                </div>
                <ul
                    className={
                        commonStyles.profile_row +
                        ` ` +
                        commonStyles.profile_table
                    }
                >
                    {school.dir_fio && school.dir_fio !== "" && (
                        <li>
                            <p
                                className={
                                    commonStyles.profile_item +
                                    " link --type-icon --icon-company"
                                }
                            >
                                {school.dir_fio}
                                <span
                                    className={commonStyles.profile_description}
                                >
                                    ФИО директора/руководителя
                                </span>
                            </p>
                        </li>
                    )}
                    {phone && (
                        <li>
                            <a
                                href={`tel:${phone}`}
                                className={
                                    commonStyles.profile_item +
                                    " link --type-icon --icon-phone"
                                }
                                rel="noreferrer nofollow noopener"
                                target="_blank"
                            >
                                {phone}
                                <span
                                    className={commonStyles.profile_description}
                                >
                                    Телефон директора/руководителя школы
                                </span>
                            </a>
                        </li>
                    )}
                    {school.dir_email && school.dir_email !== "" && (
                        <li>
                            <p
                                className={
                                    commonStyles.profile_item +
                                    " link --type-icon --icon-email"
                                }
                            >
                                {school.dir_email}
                                <span
                                    className={commonStyles.profile_description}
                                >
                                    Email директора/руководителя школы
                                </span>
                            </p>
                        </li>
                    )}
                    {school.address && school.address !== "" && (
                        <li>
                            <p
                                className={
                                    commonStyles.profile_item +
                                    " link --type-icon --icon-district"
                                }
                            >
                                {school.address}
                                <span
                                    className={commonStyles.profile_description}
                                >
                                    Адрес
                                </span>
                            </p>
                        </li>
                    )}
                </ul>
            </div>
            <Popup
                title={"Редактирование школы"}
                opened={popupSchoolEditOpened}
                onClose={() => {
                    reset(school);
                    setPopupSchoolEditOpened(false);
                }}
            >
                <form
                    onSubmit={handleSubmit(onSchoolEditSubmit)}
                    className="form"
                >
                    <fieldset className="form__section --content-info">
                        <FieldInput
                            label={"Полное наименование организации:"}
                            type={"textarea"}
                            rows={5}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("org_name", {
                                value: school.org_name,
                            })}
                        />
                        <FieldInput
                            label={"Краткое наименование организации:"}
                            type={"textarea"}
                            rows={2}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("org_short_name", {
                                value: school.org_short_name,
                            })}
                        />
                        <FieldInput
                            label={"ФИО директора/руководителя:"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("dir_fio", { value: school.dir_fio })}
                        />
                        <FieldInput
                            label={"Телефон директора/руководителя школы:"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("dir_phone", {
                                value: school.dir_phone,
                            })}
                        />
                        <FieldInput
                            label={"Email директора/руководителя школы:"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("dir_email", {
                                value: school.dir_email,
                            })}
                        />
                        <FieldInput
                            label={"Адрес школы:"}
                            type={"textarea"}
                            rows={3}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("address", { value: school.address })}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={sending}
                            style={{ marginLeft: "auto", display: "block" }}
                        />
                    </div>
                </form>
            </Popup>
            <Notif
                text={"Вы уверены что хотите удалить?"}
                opened={popupOpened}
                onClose={() => setPopupOpened(false)}
                buttons={
                    <>
                        <Button
                            text={"Нет"}
                            theme="text"
                            size={"small"}
                            onClick={() => setPopupOpened(false)}
                        />
                        <Button
                            text={"Да"}
                            theme="info"
                            size={"small"}
                            onClick={() => {
                                setPopupOpened(false);
                                onPhotoDeleteSubmit();
                            }}
                        />
                    </>
                }
            />
            <Notif
                title={"Ошибка!"}
                state="error"
                text={errorText}
                opened={popupErrorOpened}
                onClose={() => {
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default MySchoolPage;
