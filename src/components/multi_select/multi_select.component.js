import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Button from "../simple/button/button.component";

const MultiSelect = ({ list, multi = false, ...rest }) => {
    const { register, handleSubmit, reset, resetField, getValues, setValue, setFocus, watch } =
        useForm();

    const [opened, setOpened] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [search, setSearch] = React.useState("");

    const searchInput = watch("search");
    const formRef = React.useRef();

    const onSubmit = handleSubmit((data) => {
        console.log(data.search);
        console.log(data.select);
        console.log([...selectedItems].map(item => item.value));
    });

    React.useEffect(() => {

        if (formRef?.current) {

            document.addEventListener('click', (e) => {

                if (!(e.target == formRef?.current || formRef?.current?.contains(e.target))) {
                    setOpened(false);
                    resetField("search");
                }

            });
        }

    }, [formRef]);

    console.log("render select");

    return (
        <form onSubmit={onSubmit}>
            <div
                ref={formRef}
                className="field --type-multiselect"
                onClick={() => {
                    if (!opened) {
                        setOpened(!opened);
                        setFocus("search");
                    }
                }}
            >
                {selectedItems &&
                    multi &&
                    selectedItems.map((item, index) => (
                        <div
                            key={item.value + "_" + index}
                            className="field__chip"
                        >
                            <p className="field__chip-text">{item.label}</p>
                            <span
                                className="field__chip-icon"
                                aria-label="Удалить"
                                onClick={() => {
                                    setValue("check_" + item.value, !getValues("check_" + item.value));
                                    const temp = [...selectedItems];
                                    const itemIndex = temp.findIndex(tempItem => tempItem.value === item.value);
                                    temp.splice(itemIndex, 1);
                                    setSelectedItems(temp);
                                }}
                            />
                        </div>
                    ))}
                <input
                    className="field__chip-input"
                    type="text"
                    onKeyUp={(value) => setSearch(value)}
                    {...register("search")}
                />
                <select
                    className="--hide"
                    multiple={true}
                    defaultValue={[...selectedItems].map(item => item.value)}
                    {...register("select")}
                    {...rest}
                >
                    {selectedItems &&
                        selectedItems.map((item, index) => (
                            <option
                                key={item.value + "_" + index}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))}
                </select>
                <motion.span
                    animate={opened ? "open" : "closed"}
                    variants={{
                        open: { rotateX: 180 },
                        closed: { rotateX: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    className="field__icon --type-dropdown"
                    onClick={() => { setOpened(!opened) }}
                />
                {searchInput && (
                    <span
                        className="field__icon --type-delete"
                        aria-label="Очистить строку"
                        onClick={() => resetField("search")}
                    />
                )}
                {/* Стандартная иконка для отображения ошибки, отображается при установленном классе --state-error (у field) */}
                <span className="field__icon --type-error" />
                {/* Стандартное полу для вывода текста ошибки*/}
                <p className="field__info">Сообщение об ошибке</p>

                <div
                    className={`field__list-container${opened ? " --opened" : ""}`}
                >
                    <ul className="field__list">
                        {list && multi && list.length > 0 &&
                            list
                                .filter((item) => item.label.toLowerCase().includes(searchInput ? searchInput.toLowerCase() : ""))
                                .map((item, index) => (
                                    <li
                                        key={item.value + "_" + index}
                                        className="field__item"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setValue("check_" + item.value, !getValues("check_" + item.value));
                                            if (getValues("check_" + item.value)) {
                                                setSelectedItems((prevArray) => [...prevArray, { label: item.label, value: item.value, }]);
                                            } else {
                                                const temp = [...selectedItems];
                                                const itemIndex = temp.findIndex(tempItem => tempItem.value === item.value);
                                                temp.splice(itemIndex, 1);
                                                setSelectedItems(temp);
                                            }
                                        }}
                                    >
                                        <div
                                            className="field --type-checkbox"
                                            style={{ pointerEvents: "none" }}
                                        >
                                            <input
                                                className="field__checkbox"
                                                type="checkbox"
                                                id={"check_" + item.value}
                                                {...register("check_" + item.value)}
                                            />
                                            <label
                                                className="field__label"
                                                htmlFor={"check_" + item.value}
                                            >
                                                {item.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                        {list && !multi && list.length > 0 &&
                            list
                                .filter((item) =>
                                    item.label
                                        .toLowerCase()
                                        .includes(
                                            searchInput
                                                ? searchInput.toLowerCase()
                                                : ""
                                        )
                                )
                                .map((item, index) => (
                                    <li
                                        key={item.value + "_" + index}
                                        className="field__item"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setValue("search", item.label);
                                            setOpened(!opened);
                                        }}
                                    >
                                        <div
                                            className="field"
                                            style={{ pointerEvents: "none" }}
                                        >
                                            <p>{item.label}</p>
                                        </div>
                                    </li>
                                ))}
                        {(!list ||
                            list.filter((item) =>
                                item.label
                                    .toLowerCase()
                                    .includes(
                                        searchInput
                                            ? searchInput.toLowerCase()
                                            : ""
                                    )
                            ).length === 0) && (
                                <li className="field__item">
                                    <p>Нет опций для отображения</p>
                                </li>
                            )}
                    </ul>
                    {list && (
                        <div className="field__list-controls">
                            <Button
                                type="button"
                                size="small"
                                text={"Готово"}
                                onClick={() => setOpened(!opened)}
                            />
                            <Button
                                type="button"
                                size="small"
                                theme="text"
                                text={"Очистить"}
                                onClick={() => {
                                    reset();
                                    setSelectedItems([]);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </form >
    );
};

export default MultiSelect;
