import React, { forwardRef } from 'react';

import styles from './field.module.scss';

const FieldInput = ({
    id = "id_0",
    type = "text",
    className = "",
    fieldClassName = "",
    placeholder = "",
    label = null,
    errorText = "",
    required = false,
    defaultSelectItem = {
        title: "Все",
        value: "Все",
        disabled: false
    },
    selectItems = [],
    ...rest
}, ref) => {

    const [eyeActive, setEyeActive] = React.useState(false);
    const defaultClassName = "field__input ";

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    }

    const getElementByType = (type) => {

        switch (type) {

            case "textarea":
                return <>
                    {
                        label
                        &&
                        <label
                            className="field__label"
                            htmlFor=""
                        >
                            {label}
                        </label>
                    }
                    <textarea
                        ref={ref}
                        className={defaultClassName + className}
                        placeholder={placeholder}
                        required={required}
                        {...rest}
                    />
                    <span className="field__icon --type-error" />
                </>

            case "password":
                return <>
                    {
                        label
                        &&
                        <label
                            className={styles.label}
                            htmlFor="">
                            {label}
                        </label>
                    }
                    <div className={styles.container}>
                        <div className={styles.value_container}>
                            <div className={styles.input_placeholder}>{placeholder}</div>
                            <div className={styles.input_container}>
                                <input
                                    ref={ref}
                                    type={eyeActive ? "text" : type}
                                    className={styles.input}
                                    required={required}
                                    {...rest}
                                />
                            </div>
                        </div>
                        {
                            errorText !== "" ?
                                <span className={styles.icon}>
                                    <svg className={styles.icon_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                                </span>
                                :
                                <span
                                    className={styles.icon}
                                    aria-label={`${eyeActive ? "Скрыть пароль" : "Показать пароль"}`}
                                    onClick={toggleEye}>
                                    {
                                        eyeActive ? <svg className={styles.icon_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
                                            :
                                            <svg className={styles.icon_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>
                                    }
                                </span>
                        }
                    </div>
                </>

            case "select":

                return <>
                    {
                        label
                        &&
                        <label
                            className="field__label"
                            htmlFor="">
                            {label}
                        </label>
                    }
                    <select
                        ref={ref}
                        className={defaultClassName + className}
                        required={required}
                        {...rest}
                    >
                        <option defaultValue disabled={defaultSelectItem.disabled} value={defaultSelectItem.value}>{defaultSelectItem.title}</option>
                        {
                            selectItems.map((item, index) => (<option key={item.value + "_" + index} value={item.value}>{item.title}</option>))
                        }
                    </select>
                    <span className="field__icon --type-dropdown" />
                </>

            case "checkbox":
                return <>
                    <input
                        id={id}
                        ref={ref}
                        type={type}
                        className={'field__checkbox ' + className}
                        required={required}
                        {...rest}
                    />
                    {
                        label
                        &&
                        <label
                            className="field__label"
                            htmlFor={id}>
                            {label}
                        </label>
                    }
                </>

            case "radio":
                return <>
                    <input
                        id={id}
                        ref={ref}
                        type={"checkbox"}
                        className={'field__checkbox-radio ' + className}
                        required={required}
                        {...rest}
                    />
                    {
                        label
                        &&
                        <label
                            className="field__label"
                            htmlFor={id}>
                            {label}
                        </label>
                    }
                </>

            default:
                return <>
                    {
                        label
                        &&
                        <label
                            className="field__label"
                            htmlFor=""
                        >
                            {label}
                        </label>
                    }
                    <input
                        ref={ref}
                        type={eyeActive ? "text" : type}
                        className={defaultClassName + className}
                        placeholder={placeholder}
                        required={required}
                        {...rest}
                    />
                    <span className="field__icon --type-error" />
                </>

        }

    }

    return (
        <div className={`${styles.field} ${errorText !== "" ? styles.field_state_error : ""}`}>
            {
                getElementByType(type)
            }
            {
                errorText !== "" ?
                    <p className={styles.info}>{errorText}</p>
                    : ''
            }
        </div>
    );
};

export default forwardRef(FieldInput);