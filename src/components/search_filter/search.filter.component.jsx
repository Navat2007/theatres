import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./search.module.scss";

import Button from "../button/button.component";
import FieldInput from "../field/field.input.component";

const SearchFilter = ({ config, onSubmit, items, children }) => {
    const [opened, setOpened] = React.useState(false);
    const { register, handleSubmit, reset } = useForm();

    const variants = {
        open: {
            opacity: 1,
            y: 0,
        },
        closed: {
            opacity: 0,
            y: -10,
        },
    };

    const getSortedUniqueItemsForSelect = (array, type) => {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        let unique = array.filter(onlyUnique);

        return [...unique].sort((a, b) => {
            if (!a || !b) return -1;

            switch (type) {
                case "int":
                    return a - b;
                case "string":
                    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
                case "date":
                    return moment(a).isAfter(moment(b)) ? 1 : -1;
                default:
                    return a > b ? 1 : -1;
            }
        });
    };

    const getFieldByType = ({ filter, type, key, header }) => {
        if (!filter) return <Fragment key={key} />;

        switch (filter) {
            case "number":
                return (
                    <FieldInput
                        key={key}
                        size="small"
                        extraClass={styles.field}
                        {...register(key, {
                            setValueAs: (v) => (v !== "" ? parseInt(v) : ""),
                        })}
                        defaultValue={""}
                        type={"number"}
                        label={header}
                        placeholder={`${header}...`}
                    />
                );

            case "string":
                return (
                    <FieldInput
                        key={key}
                        size="small"
                        extraClass={styles.field}
                        {...register(key)}
                        label={header}
                        placeholder={`${header}...`}
                    />
                );

            case "date":
                return (
                    <FieldInput
                        size="small"
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"date"}
                        label={header}
                    />
                );

            case "datetime":
                return (
                    <FieldInput
                        size="small"
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"datetime-local"}
                        label={header}
                    />
                );

            case "select":
                return (
                    <FieldInput
                        size="small"
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"select"}
                        label={header}
                        selectItems={getSortedUniqueItemsForSelect(
                            items
                                .map((item) => item[key])
                                .filter((item) => item !== null && item !== ""),
                            type
                        ).map((item) => {
                            return {
                                title: item,
                                value: item,
                            };
                        })}
                    />
                );

            default:
                return (
                    <FieldInput
                        size="small"
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        label={header}
                    />
                );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.search}
        >
            <div className={styles.row + ` ` + styles.row_main_search}>
                <FieldInput
                    type={"search"}
                    size="small"
                    extraClass={styles.field}
                    placeholder={"Поиск..."}
                    {...register("search_string")}
                />
                <Button
                    type="button"
                    size="small"
                    iconClass="mdi mdi-filter-variant"
                    extraClass={styles.button}
                    text={opened ? "Скрыть" : "Фильтр"}
                    aria-label={opened ? "Скрыть" : "Фильтр"}
                    onClick={() => setOpened(!opened)}
                />
                {children}
            </div>
            <motion.div
                animate={opened ? "open" : "closed"}
                variants={variants}
            >
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            className={styles.row}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                marginTop: "1.25em",
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                y: 0,
                                marginTop: "1.25em",
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.25,
                                        delay: 0.15,
                                    },
                                    marginTop: {
                                        duration: 0.25,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                marginTop: "0",
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                    },
                                    marginTop: {
                                        duration: 0.25,
                                    },
                                },
                            }}
                        >
                            {config.map((item) => getFieldByType(item))}
                            <motion.div className={styles.controls}>
                                <Button
                                    type="submit"
                                    size="small"
                                    text="Найти"
                                />
                                <Button
                                    type="button"
                                    text="Очистить"
                                    size="small"
                                    theme="text"
                                    onClick={() => {
                                        reset();
                                        onSubmit();
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </form>
    );
};

export default SearchFilter;
