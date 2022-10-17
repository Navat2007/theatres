import React, {forwardRef} from 'react';

// --size-sm - маленькая
const FieldInput = ({
                        id = "id_0",
                        type = "text",
                        className = "field__input",
                        placeholder = "",
                        label = null,
                        errorText = "",
                        required = false,
                        selectItems = [],
                        ...rest
                    }, ref) => {

    const [eyeActive, setEyeActive] = React.useState(false);

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    }

    const getElementByType = (type) => {

        switch (type) {

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
                        className={className}
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
                        className={className}
                        required={required}
                        {...rest}
                    >
                        <option defaultValue value={"Все"}>Все</option>
                        {
                            selectItems.map(item => (<option key={item} value={item}>{item}</option>))
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
                        className={'field__checkbox'}
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
                            htmlFor="">
                            {label}
                        </label>
                    }
                    <input
                        ref={ref}
                        type={eyeActive ? "text" : type}
                        className={className}
                        placeholder={placeholder}
                        required={required}
                        {...rest}
                    />
                    <span className="field__icon --type-error"/>
                </>

        }

    }

    return (
        <div className={`field${errorText !== "" ? " --state-error" : ""}`}>
            {
                getElementByType(type)
            }
            <p className="field__info">{errorText}</p>
        </div>
    );
};

export default forwardRef(FieldInput);