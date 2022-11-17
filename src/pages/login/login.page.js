import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

import FieldInput from "../../components/simple/field/field.input.component";
import Popup from "../../components/popup/popup.component";
import Button from "../../components/simple/button/button.component";

import logo from "../../images/login/logo.png";

const LoginPage = () => {

    const { login, loading, error, errorText } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        await login(data);
        navigate("/", { replace: true });

    };
    
    return (

        <Popup
            opened={true}
            title={"Окно входа"}
            extraClass={"popup-login"}>
            <img
                src={logo}
                className='logo --place-login'
                alt="Изображение театральных масок"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form --place-login"
            >
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
                <p className={`form__info-text ${error ? "--actived" : ""}`}>{errorText}</p>
                <Button
                    type="submit"
                    text={"Войти"}
                    disabled={loading === "loading"}
                    spinnerActive={loading === "loading"} />
            </form>
        </Popup>

    );
};

export default LoginPage;