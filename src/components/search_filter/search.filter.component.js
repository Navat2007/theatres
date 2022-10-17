import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";

import Button from "../simple/button/button.component";
import FieldInput from "../simple/field/field.input.component";
import moment from "moment";

const SearchFilter = ({ config, onSubmit, items }) => {

    const [opened, setOpened] = React.useState(false);
    const { register, handleSubmit, reset } = useForm();

    const getSortedUniqueItemsForSelect = (array, type) => {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        let unique = array.filter(onlyUnique);

        return [...unique].sort((a, b) => {

            if (!a || !b)
                return -1;

            switch (type) {
                case "int":
                    return a - b;
                case "string":
                    return a.toLowerCase() > b.toLowerCase() ? 1 : -1
                case "date":
                    return moment(a).isAfter(moment(b)) ? 1 : -1
                default:
                    return a > b ? 1 : -1
            }

        });

    }

    const getFieldByType = ({ filter, type, key, header }) => {

        if (!filter)
            return <Fragment key={key} />;

        switch (filter) {

            case "number":
                return <FieldInput
                    key={key}
                    {...register(key, { setValueAs: v => v !== "" ? parseInt(v) : "" })}
                    defaultValue={""}
                    type={"number"}
                    label={header}
                    placeholder={`${header}...`}
                />;

            case "string":
                return <FieldInput key={key} {...register(key)} label={header} placeholder={`${header}...`} />;

            case "date":
                return <FieldInput key={key} {...register(key)} type={"date"} label={header} />;

            case "datetime":
                return <FieldInput key={key} {...register(key)} type={"datetime-local"} label={header} />;

            case "select":
                return <FieldInput
                    key={key} {...register(key)}
                    type={"select"}
                    label={header}
                    selectItems={getSortedUniqueItemsForSelect(items.map(item => item[key]).filter(item => item !== null && item !== ""), type)}
                />;

            default:
                return <FieldInput key={key} {...register(key)} label={header} />

        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="search --place-tab">
                <div className="search__row --main-search">
                    <Button
                        className="search__button"
                        type="button"
                        text={opened ? "Скрыть" : "Фильтр"}
                        aria-label={opened ? "Скрыть" : "Фильтр"}
                        onClick={() => setOpened(!opened)}
                    />
                    <FieldInput
                        type={"search"}
                        placeholder={"Поиск..."}
                        {...register("search_string")}
                    />
                </div>
                <div className={`search__accordion ${opened ? "--opened" : ""}`}>
                    <div className="search__row">
                        {
                            config.map(item => getFieldByType(item))
                        }
                        <div className="search__controls">
                            <Button text={"Найти"} />
                            <Button
                                text={"Очистить"}
                                type={"button"}
                                className={"button --theme-text"}
                                onClick={() => {
                                    reset();
                                    onSubmit();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SearchFilter;