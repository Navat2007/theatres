import React from 'react';
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

// all options from https://xdsoft.net/jodit/doc/,
const Editor = ({ control, name, readonly, placeholder, value, ...rest }) => {

    const config = {
        readonly: false,
        about: false,
        addNewLine: false,
        minHeight: '500px',
        placeholder: placeholder || 'Начните писать...'
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={value}
            render={({ field }) => (
                <JoditEditor
                    ref={field.ref}
                    config={config}
                    value={field.value}
                    onChange={(value) => { }}
                    onBlur={(value) => {
                        field.onChange(value);
                    }}
                    {...rest}
                />
            )}
        />
    );
};

export default Editor;