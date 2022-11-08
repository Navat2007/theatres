import React, {forwardRef} from 'react';

// --size-sm - маленькая
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
                    <span className="field__icon --type-error"/>
                </>

            case "password":
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
                    <input
                        ref={ref}
                        type={eyeActive ? "text" : type}
                        className={defaultClassName + className}
                        placeholder={placeholder}
                        required={required}
                        {...rest}
                    />
                    <span className="field__icon --type-error"/>
                    <span
                        className={`field__icon --type-eye${eyeActive ? " --actived" : ""}`}
                        aria-label={`${eyeActive ? "Скрыть пароль" : "Показать пароль"}`}
                        onClick={toggleEye}
                    />
                </>

            case "select":
                console.log(rest);
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
                    <span className="field__icon --type-dropdown"/>
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
                    <span className="field__icon --type-error"/>
                </>

        }

    }

    return (
        <div className={`field ${fieldClassName}${errorText !== "" ? " --state-error" : ""}`}>
            {
                getElementByType(type)
            }
            <p className="field__info">{errorText}</p>
        </div>
    );
};

export default forwardRef(FieldInput);