import React from "react";
import ReactSelect, { components } from "react-select";
import { Controller } from "react-hook-form";
import makeAnimated from 'react-select/animated';

const MultiSelect = ({
    control,
    name,
    isMulti,
    closeMenuOnSelect = true,
    placeholder = "Выберите или введите для поиска...",
    values = [],
    options = [],
    ...rest
}) => {

    const animatedComponents = makeAnimated();

    const NoOptionsMessage = ({ children, ...rest }) => {

        return (
            <>
                <components.NoOptionsMessage children={"Нет опций для отображения"} {...rest} />
            </>
        );

    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={values}
            render={({ field }) => (
                <ReactSelect
                    classNamePrefix="multy-select"
                    {...field}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    closeMenuOnSelect={closeMenuOnSelect}
                    components={{ animatedComponents, NoOptionsMessage }}
                    options={options}
                    {...rest}
                />
            )}
        />
    );

};

export default MultiSelect;