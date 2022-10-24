import React, {Fragment} from 'react';
import {useForm} from "react-hook-form";
import moment from "moment";
import {motion, AnimatePresence} from 'framer-motion';

import Button from "../simple/button/button.component";
import FieldInput from "../simple/field/field.input.component";

const SearchFilter = ({config, onSubmit, items, children}) => {

    const [opened, setOpened] = React.useState(false);
    const {register, handleSubmit, reset} = useForm();

    const variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {type: "spring", stiffness: 300, damping: 24}
        },
        closed: {
            opacity: 0,
            y: -20,
            transition: {duration: 0.2}
        },
    }

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

    const getFieldByType = ({filter, type, key, header}) => {

        if (!filter)
            return <Fragment key={key}/>;

        switch (filter) {

            case "number":
                return <FieldInput
                    key={key}
                    {...register(key, {setValueAs: v => v !== "" ? parseInt(v) : ""})}
                    defaultValue={""}
                    type={"number"}
                    label={header}
                    placeholder={`${header}...`}
                />;

            case "string":
                return <FieldInput key={key} {...register(key)} label={header} placeholder={`${header}...`}/>;

            case "date":
                return <FieldInput key={key} {...register(key)} type={"date"} label={header}/>;

            case "datetime":
                return <FieldInput key={key} {...register(key)} type={"datetime-local"} label={header}/>;

            case "select":
                return <FieldInput
                    key={key} {...register(key)}
                    type={"select"}
                    label={header}
                    selectItems={getSortedUniqueItemsForSelect(items.map(item => item[key]).filter(item => item !== null && item !== ""), type).map(item => {
                        return {
                            title: item,
                            value: item,
                        }
                    })}
                />;

            default:
                return <FieldInput key={key} {...register(key)} label={header}/>

        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="search">
                <div className="search__row --main-search">
                    <FieldInput
                        type={"search"}
                        placeholder={"Поиск..."}
                        {...register("search_string")}
                    />
                    <Button
                        className="search__button"
                        type="button"
                        text={opened ? "Скрыть" : "Фильтр"}
                        aria-label={opened ? "Скрыть" : "Фильтр"}
                        onClick={() => setOpened(!opened)}
                    />
                    {children}
                </div>

                <motion.div
                    // className={`search__accordion ${opened ? "--opened" : ""}`}
                    animate={opened ? "open" : "closed"}
                    variants={variants}
                >
                    <AnimatePresence>
                        {
                            opened
                            &&
                            <motion.div
                                className="search__row"
                                initial={{
                                    height: 0,
                                    opacity: 0,
                                    y: -20,
                                }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    y: -20,
                                }}
                            >
                                {
                                    config.map(item => getFieldByType(item))
                                }
                                <motion.div className="search__controls">
                                    <Button text={"Найти"}/>
                                    <Button
                                        text={"Очистить"}
                                        type={"button"}
                                        className={"button --theme-text"}
                                        onClick={() => {
                                            reset();
                                            onSubmit();
                                        }}
                                    />
                                </motion.div>
                            </motion.div>

                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </form>
    );
};

export default SearchFilter;