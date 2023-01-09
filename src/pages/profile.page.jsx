import React from "react";
import {useForm} from "react-hook-form";

import useAuthStore from "../store/authStore";

import Button from "../components/button/button.component";
import Notif from "../components/notif/notif.component";
import Popup from "../components/popup/popup.component";
import FieldInput from "../components/field/field.input.component";

import commonStyles from "./common.module.scss";
import { AdminIcons } from "../components/svgs.js";
import no_photo_man from "../images/no_photo_man.png";

const ProfilePage = () => {

    const { user, fetchEditPhoto, fetchEditUser } = useAuthStore();
    const { register, handleSubmit, reset } = useForm();

    const [phone, setPhone] = React.useState();
    const [popup, setPopup] = React.useState(<></>);
    const [imageInputKey, setImageInputKey] = React.useState("");
    const [sending, setSending] = React.useState(false);

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
                    await fetchEditPhoto({ id: user.ID, photo: file });
                } else {
                    setPopup(
                        <Notif
                            text={"Файл больше 1,5 Мб."}
                            opened={true}
                            onClose={() => setPopup(<></>)}
                        />
                    );
                }
            } else {
                setPopup(
                    <Notif
                        text={"Файл должен быть изображением."}
                        opened={true}
                        onClose={() => setPopup(<></>)}
                    />
                );
            }

            setImageInputKey(window.global.makeid(30));
        }
    };

    const onUserEditSubmit = async (params) => {

        params.id = user.ID;

        console.log(params);

        await fetchEditUser(params);

        setPopup(<></>);

    };

    const onEditBtnClick = () => {
        setPopup(
            <Popup
                title={"Редактирование данных"}
                opened={true}
                onClose={() => {
                    reset();
                    setPopup(<></>);
                }}
            >
                <form
                    onSubmit={handleSubmit(onUserEditSubmit)}
                    className="form"
                >
                    <fieldset className="form__section --content-info">
                        <FieldInput
                            label={"ФИО:"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("fio", {
                                value: user.fio,
                            })}
                        />
                        <FieldInput
                            label={"Телефон:"}
                            type={"phone"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("phone", {
                                value: user.phone,
                            })}
                        />
                        <FieldInput
                            label={"Должность:"}
                            placeholder={"..."}
                            layout="flex"
                            size="small"
                            required={true}
                            {...register("position", { value: user.position })}
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
        );

    };

    const onDeleteBtnClick = () => {
        setPopup(
            <Notif
                text={"Вы уверены что хотите удалить?"}
                opened={true}
                onClose={() => setPopup(<></>)}
                buttons={
                    <>
                        <Button
                            text={"Нет"}
                            theme="text"
                            size={"small"}
                            onClick={() => setPopup(<></>)}
                        />
                        <Button
                            text={"Да"}
                            theme="info"
                            onClick={async () => {
                                await fetchEditPhoto({ id: user.ID, delete: 1 });
                                setPopup(<></>);
                            }}
                        />
                    </>
                }
            />
        );

    };

    React.useEffect(() => {
        setPhone(formatPhone(user.phone));
    }, [user]);

    return (
        <>
            <div className={commonStyles.title_block}>
                <h1 className={commonStyles.title}>{user?.role === "user" ? "Информация о руководителе школьного театра" : "Информация о профиле"}</h1>
            </div>
            <div className={commonStyles.profile}>
                <div className={commonStyles.profile_img_block}>
                    <img
                        className={commonStyles.profile_img}
                        src={
                            user?.photo !== ""
                                ? window.global.baseUrl + user.photo
                                : no_photo_man
                        }
                        alt={user?.fio}
                    />
                    <div className={commonStyles.profile_img_panel}>
                        {user?.photo !== "" && (
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
                                    onClick={onDeleteBtnClick}
                                />
                            </>
                        )}
                        {user?.photo === "" && (
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
                        key={imageInputKey}
                        onChange={handlePhotoChange}
                    />
                </div>
                <div className={commonStyles.profile_info}>
                    <h2 className={commonStyles.profile_title}>{user?.fio}</h2>
                    <ul className={commonStyles.profile_table}>
                        <li>
                            <h3 className={commonStyles.profile_text}>
                                {user.email ? user.email : user.login}
                            </h3>
                            <p className={commonStyles.profile_description}>
                                E-mail (логин)
                            </p>
                        </li>
                        {
                            user.position
                            &&
                            <li>
                                <h3 className={commonStyles.profile_text}>
                                    {user.position}
                                </h3>
                                <p className={commonStyles.profile_description}>
                                    Должность
                                </p>
                            </li>
                        }
                    </ul>
                    <Button
                        theme="outline"
                        iconClass={"mdi mdi-pencil"}
                        size="small"
                        type="button"
                        text="Редактировать"
                        extraClass={commonStyles.profile_edit_btn}
                        onClick={onEditBtnClick}
                    />
                </div>
                <ul
                    className={
                        commonStyles.profile_row +
                        ` ` +
                        commonStyles.profile_table
                    }
                >
                    {phone && (
                        <li>
                            <a
                                href={`tel:${phone}`}
                                className={[
                                    commonStyles.profile_item,
                                    commonStyles.link,
                                ].join(" ")}
                                rel="noreferrer nofollow noopener"
                                target="_blank"
                            >
                                <span className={commonStyles.svgIcon}>
                                    {AdminIcons.phone}
                                </span>
                                {phone}
                            </a>
                        </li>
                    )}
                    {user?.org_name &&
                        user?.org_short_name &&
                        user?.org_name !== "" &&
                        user?.org_short_name !== "" && (
                            <li>
                                <p className={commonStyles.profile_item}>
                                    <span className={commonStyles.svgIcon}>
                                        {AdminIcons.toolbox}
                                    </span>
                                    {user?.org_name}
                                    <span
                                        className={
                                            commonStyles.profile_description
                                        }
                                    >
                                        {user?.org_short_name}
                                    </span>
                                </p>
                            </li>
                        )}
                    {user?.mrsd &&
                        user?.mrsd.length > 0 &&
                        user?.mrsd[0] !== "" &&
                        user?.mrsd[0] !== 0 && (
                            <li>
                                <p className={commonStyles.profile_item}>
                                    <span className={commonStyles.svgIcon}>
                                        {AdminIcons.crosshairs}
                                    </span>
                                    {user.mrsd.map((mrsd) => (
                                        <>№ {mrsd} </>
                                    ))}
                                    <span
                                        className={
                                            commonStyles.profile_description
                                        }
                                    >
                                        (Межрайон)
                                    </span>
                                </p>
                            </li>
                        )}
                </ul>
            </div>
            {popup}
        </>
    );
};

export default ProfilePage;
