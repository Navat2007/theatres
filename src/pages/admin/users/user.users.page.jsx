import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";
import useSchoolsStore from "../../../store/admin/schoolsStore";

import Button from "../../../components/button/button.component";
import FieldInput from "../../../components/field/field.input.component";
import Popup from "../../../components/popup/popup.component";

import no_photo_man from "../../../images/no_photo_man.png";
import Notif from "../../../components/notif/notif.component";
import commonStyles from "../../common.module.scss";

const UserUsersPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        user,
        loadUser,
        addUser,
        editUser,
        removeUser,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useUsersStore();
    const schools = useSchoolsStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    const fetchData = async () => {
        await schools.loadSchools();

        if (id) {
            reset();
            await loadUser({ id });
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    React.useEffect(() => {
        if (error.users) setPopupErrorOpened(true);
    }, [error.users]);

    const back = () => navigate("/admin/users");

    const onAddSubmit = async (params) => {
        const result = await addUser(params);

        if (!result.error) back();
    };

    const onEditSubmit = async (params) => {
        params.id = id;
        const result = await editUser(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = async () => {
        const result = await removeUser({ id });

        if (!result.error) back();
    };

    if (loading.users || schools.loading) return <p>????????????????...</p>;

    if (id && (user === null || user.role !== "????????????????????????"))
        return <p>?????????????? ???????????????????????? ???? ????????????????????</p>;

    if (id && user)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        theme="text"
                        iconClass={"mdi mdi-arrow-left"}
                        size="small"
                        isIconBtn={true}
                        aria-label="??????????"
                        onClick={() => back()}
                    />
                    <h1 className={commonStyles.title}>
                        ???????????????????????????? ???????????????????????? ID: {id}
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onEditSubmit)}
                    className="form"
                >
                    <div className="form__container --view-two-columns">
                        <fieldset className="form__section">
                            <h2 className="form__title">???????????????? ????????????????????</h2>
                            {/* ???????? ???????????????? - ?????????? ???????? ???? ???????????? ???????? */}
                            <div className="form__multy-block">
                                <p className="form__label">????????</p>
                                <div className="form__profile-img-block">
                                    <img
                                        className="form__profile-img"
                                        src={
                                            user.photo !== ""
                                                ? window.global.baseUrl + user.photo
                                                : no_photo_man
                                        }
                                        alt={""}
                                    />
                                    <div className="form__profile-img-panel">
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-refresh"}
                                            aria-label={"???????????????? ????????"}
                                            title={"???????????????? ????????"}
                                        />
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-close"}
                                            aria-label={"?????????????? ????????"}
                                            title={"?????????????? ????????"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FieldInput
                                label={"??????????"}
                                placeholder={"?????????????? ??????????..."}
                                layout="flex"
                                {...register("login", {
                                    value: user.login,
                                })}
                            />
                            <FieldInput
                                label={"Email"}
                                placeholder={"?????????????? email..."}
                                layout="flex"
                                required={true}
                                {...register("email", {
                                    value: user.email,
                                })}
                            />
                            <FieldInput
                                label={"??????"}
                                placeholder={"?????????????? ??????..."}
                                layout="flex"
                                required={true}
                                {...register("fio", { value: user.fio })}
                            />
                            <FieldInput
                                label={"???????????????????? ??????????????"}
                                type={"phone"}
                                placeholder={"?????????????? ???????????????????? ??????????????..."}
                                layout="flex"
                                required={true}
                                {...register("phone", {
                                    value: user.phone,
                                })}
                            />
                            <FieldInput
                                label={"??????????????????"}
                                placeholder={"?????????????? ??????????????????..."}
                                layout="flex"
                                required={true}
                                {...register("position", { value: user.position })}
                            />
                            <FieldInput
                                label={"??????????"}
                                type={"select"}
                                defaultSelectItem={{
                                    title: "???????????????? ??????????",
                                    value: "",
                                    disabled: false,
                                }}
                                selectItems={schools.schools
                                    .map((item) => {
                                        return {
                                            title: item.org_short_name,
                                            value: item.ID,
                                        };
                                    })
                                    .sort()}
                                layout="flex"
                                required={true}
                                {...register("schoolID", {
                                    value: user.schoolID,
                                })}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">????????????????????????</h2>
                            <FieldInput
                                label={"????????????"}
                                type={"password"}
                                placeholder={"?????????????? ?????????? ????????????..."}
                                layout="flex"
                                autoComplete={"new-password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "?????????????????????? ?????????? ???????????? 6 ????????????????",
                                    },
                                })}
                                errorText={
                                    errors?.password && errors.password.message
                                }
                            />
                            <FieldInput
                                label={"???????????????????????? ?????????????? ?????????????"}
                                type={"checkbox_variant"}
                                {...register("active", {
                                    value: user.active === "??????????????",
                                })}
                            />
                        </fieldset>
                    </div>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text={"??????????????????"}
                            spinnerActive={sending.users}
                        />
                        <Button
                            type="button"
                            theme="text"
                            iconClass={"mdi mdi-delete"}
                            extraClass={`${sending.users ? "--hide" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPopupOpened(true);
                            }}
                            text={"??????????????"}
                        />
                    </div>
                </form>
                <Notif
                    text={"???? ?????????????? ?????? ???????????? ???????????????"}
                    opened={popupOpened}
                    onClose={() => setPopupOpened(false)}
                    buttons={
                        <>
                            <Button
                                type="button"
                                text={"??????"}
                                size="size"
                                theme="text"
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type="button"
                                text={"????"}
                                size="size"
                                theme={"info"}
                                onClick={() => {
                                    setPopupOpened(false);
                                    onDeleteSubmit();
                                }}
                            />
                        </>
                    }
                />
                <Notif
                    title={"????????????!"}
                    state="error"
                    text={errorText.users}
                    opened={popupErrorOpened}
                    onClose={() => {
                        clearErrorText();
                        setPopupErrorOpened(false);
                    }}
                />
            </>
        );

    return (
        <>
            <div className={commonStyles.title_block}>
                <Button
                    type="button"
                    iconClass={"mdi mdi-arrow-left"}
                    theme="text"
                    aria-label="??????????"
                    onClick={() => back()}
                />
                <h1 className={commonStyles.title}>???????????????? ????????????????????????</h1>
            </div>
            <form
                onSubmit={handleSubmit(onAddSubmit)}
                className="form"
            >
                <div className="form__container --view-two-columns">
                    <fieldset className="form__section">
                        <h2 className="form__title">???????????????? ????????????????????</h2>
                        <FieldInput
                            label={"??????????"}
                            placeholder={"?????????????? ??????????..."}
                            layout="flex"
                            required={true}
                            {...register("login")}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"?????????????? email..."}
                            layout="flex"
                            required={true}
                            {...register("email")}
                        />
                        <FieldInput
                            label={"??????"}
                            placeholder={"?????????????? ??????..."}
                            layout="flex"
                            required={true}
                            {...register("fio")}
                        />
                        <FieldInput
                            label={"???????????????????? ??????????????"}
                            type={"phone"}
                            placeholder={"?????????????? ???????????????????? ??????????????..."}
                            layout="flex"
                            required={true}
                            {...register("phone")}
                        />
                        <FieldInput
                            label={"??????????"}
                            type={"select"}
                            defaultSelectItem={{
                                title: "???????????????? ??????????",
                                value: "",
                                disabled: false,
                            }}
                            selectItems={schools.schools
                                .map((item) => {
                                    return {
                                        title: item.org_short_name,
                                        value: item.ID,
                                    };
                                })
                                .sort()}
                            layout="flex"
                            required={true}
                            {...register("schoolID")}
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">????????????????????????</h2>
                        <FieldInput
                            label={"????????????"}
                            type={"password"}
                            placeholder={"?????????????? ????????????..."}
                            layout="flex"
                            autoComplete={"new-password"}
                            required={true}
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message:
                                        "?????????????????????? ?????????? ???????????? 6 ????????????????",
                                },
                            })}
                            errorText={
                                errors?.password && errors.password.message
                            }
                        />
                        <FieldInput
                            label={"???????????????????????? ?????????????? ?????????????"}
                            type={"checkbox_variant"}
                            {...register("active", { value: true })}
                        />
                    </fieldset>
                </div>
                <div className="form__controls">
                    <Button
                        type="submit"
                        text={"??????????????"}
                        spinnerActive={sending.users}
                    />
                </div>
            </form>
            <Notif
                title={"????????????!"}
                state="error"
                text={errorText.users}
                opened={popupErrorOpened}
                onClose={() => {
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default UserUsersPage;
