import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { loadUserData } from "../../store/authSlice";

import FieldInput from "../../components/simple/field/field.input.component";
import Popup from "../../components/popup/popup.component";
import Button from "../../components/simple/button/button.component";

import logo from "../../images/login/logo.png";
import axios from "axios";

const LoginPage = () => {

    const dispatch = useDispatch();

    const { status, statusText } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {

        const userData = await dispatch(loadUserData(data));

        if (userData.payload && 'token' in userData.payload.params) {

            window.localStorage.removeItem('login');
            window.localStorage.removeItem('pwd');
            window.localStorage.removeItem('remember');

            if (data.remember) {

                window.localStorage.setItem('login', data.login);
                window.localStorage.setItem('pwd', data.password);
                window.localStorage.setItem('remember', 1);

            }

            let tmpObject = { ...userData.payload.params };
            tmpObject['tokenDate'] = moment(Date.now()).format('DD.MM.YYYY');
            window.localStorage.setItem('user', JSON.stringify(tmpObject));
            axios.defaults.headers.post['Authorization'] = `${tmpObject.token}&${tmpObject.ID}`;
        }

    };

    return (

        <Popup opened={true} title={"Окно входа"} className={"--type-login"}
            image={{ src: logo, alt: "Логотип патриот.спорт", className: "logo --place-login" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="form --place-login">
                <FieldInput
                    placeholder={"Введите логин..."}
                    {...register("login", { required: "Поле обязательно к заполнению" })}
                    defaultValue={window.localStorage.getItem('remember') && window.localStorage.getItem('login') ? window.localStorage.getItem('login') : ""}
                    errorText={errors?.login?.message}
                />
                <FieldInput
                    type={"password"}
                    placeholder={"Введите пароль..."}
                    {...register("password", { required: "Поле обязательно к заполнению" })}
                    defaultValue={window.localStorage.getItem('remember') && window.localStorage.getItem('pwd') ? window.localStorage.getItem('pwd') : ""}
                    errorText={errors?.password?.message}
                />
                <FieldInput
                    type={"checkbox"}
                    label={"Запомнить логин и пароль?"}
                    {...register("remember")}
                    defaultChecked={window.localStorage.getItem('remember')}
                />
                <p className={`form__info-text ${statusText === "" ? "" : "--actived"}`}>{statusText}</p>
                <Button
                    type="submit"
                    text={"Войти"}
                    disabled={status === "loading"}
                    spinnerActive={status === "loading"} />
            </form>
        </Popup>

    );
};

export default LoginPage;