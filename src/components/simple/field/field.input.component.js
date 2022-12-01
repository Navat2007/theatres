import React, { forwardRef } from "react";

import styles from "./field.module.scss";
import { AdminIcons } from "../../svgs.js";

// Добавлен параметр hasTooltip - добавляет иконку для отображения подсказки
const FieldInput = (
    {
        id = "id_0",
        type = "text",
        size,
        layout,
        hasTooltip = false,
        extraClass = "",
        placeholder = "",
        label = null,
        required = false,
        errorText = "",
        defaultSelectItem = {
            title: "Все",
            value: "Все",
            disabled: false,
        },
        selectItems = [],
        ...rest
    },
    ref
) => {
    const [eyeActive, setEyeActive] = React.useState(false);
    const inputRef = React.useRef();

    const mergeRefs = (...refs) => {
        const filteredRefs = refs.filter(Boolean);
        if (!filteredRefs.length) return null;
        if (filteredRefs.length === 0) return filteredRefs[0];
        return (inst) => {
            for (const ref of filteredRefs) {
                if (typeof ref === "function") {
                    ref(inst);
                } else if (ref) {
                    ref.current = inst;
                }
            }
        };
    };

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    };

    const getElementByType = (type) => {
        // Для поля добавить два события 1: Когда чекбокс нажат, добавляем класс {styles.field_checked} 2: Когда он дизайблед {styles.field_disabled}
        // Добавить выбор мультиселекта, чтобы отображалась подсказка через компонент поля.
        switch (type) {
            case "textarea":
                return (
                    <>
                        <textarea
                            ref={mergeRefs(inputRef, ref)}
                            className={styles.input}
                            placeholder={placeholder}
                            required={required}
                            {...rest}
                        />
                    </>
                );

            case "password":
                return (
                    <>
                        <input
                            ref={mergeRefs(inputRef, ref)}
                            type={eyeActive ? "text" : type}
                            className={styles.input}
                            placeholder={placeholder}
                            required={required}
                            {...rest}
                        />
                    </>
                );

            case "select":
                return (
                    <>
                        <select
                            ref={ref}
                            className={styles.select}
                            required={required}
                            {...rest}
                        >
                            <option
                                defaultValue
                                disabled={defaultSelectItem.disabled}
                                value={defaultSelectItem.value}
                            >
                                {defaultSelectItem.title}
                            </option>
                            {selectItems.map((item, index) => (
                                <option
                                    key={item.value + "_" + index}
                                    value={item.value}
                                >
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </>
                );

            case "checkbox":
                return (
                    <>
                        <input
                            id={id}
                            ref={ref}
                            type={type}
                            className={styles.checkbox}
                            required={required}
                            {...rest}
                        />
                    </>
                );

            case "checkbox_variant":
                return (
                    <>
                        <input
                            id={id}
                            ref={ref}
                            type={"checkbox"}
                            className={styles.checkbox_variant}
                            required={required}
                            {...rest}
                        />
                    </>
                );

            default:
                return (
                    <>
                        <input
                            ref={mergeRefs(inputRef, ref)}
                            type={type}
                            className={styles.input}
                            placeholder={placeholder}
                            required={required}
                            {...rest}
                        />
                    </>
                );
        }
    };

    const config = [
        styles.field,
        layout ? styles["field_layout_" + layout] : null,
        size ? styles["field_size_" + size] : null,
        type === "checkbox_variant" || type === "checkbox"
            ? styles["field_type_" + type]
            : null,
        hasTooltip && !label ? styles.field_has_tooltip : null,
        errorText !== "" ? styles.field_state_error : null,
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(" ");

    return (
        <div className={finalClassName}>
            {/* Есть подсказка, но нет лэйбла (отображается перед полем) */}
            {hasTooltip && !label && (
                <span
                    className={styles.tooltip + " mdi mdi-information-outline"}
                />
            )}
            {label && (
                <label
                    className={styles.label}
                    htmlFor={id}
                >
                    {label}
                    {/* Есть лейбл, отображается в конце. */}
                    {hasTooltip && (
                        <span
                            className={
                                styles.tooltip + " mdi mdi-information-outline"
                            }
                        />
                    )}
                </label>
            )}
            {type !== "checkbox_variant" && type !== "checkbox" ? (
                type === "select" ? (
                    getElementByType(type)
                ) : (
                    <div
                        className={styles.container}
                        onClick={() => {
                            inputRef.current.focus();
                        }}
                    >
                        <div className={styles.input_container}>
                            {getElementByType(type)}
                        </div>
                        {errorText !== "" ? (
                            <span className={styles.icon}>
                                {AdminIcons.error}
                            </span>
                        ) : type === "password" ? (
                            <span
                                className={styles.icon}
                                aria-label={`${
                                    eyeActive
                                        ? "Скрыть пароль"
                                        : "Показать пароль"
                                }`}
                                onClick={toggleEye}
                            >
                                {eyeActive
                                    ? AdminIcons.eye_off
                                    : AdminIcons.eye}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                )
            ) : (
                getElementByType(type)
            )}
        </div>
    );
};

export default forwardRef(FieldInput);
