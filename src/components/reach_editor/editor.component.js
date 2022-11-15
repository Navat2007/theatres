import React from 'react';
import JoditEditor from "jodit-react";
import {Controller} from "react-hook-form";

// all options from https://xdsoft.net/jodit/doc/,
const Editor = ({control, name, readonly, placeholder = 'Начните писать...', value}, ...rest) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={value}
            render={({field}) => (
                <JoditEditor
                    ref={field.ref}
                    config={{
                        readonly: readonly,
                        placeholder: placeholder
                    }}
                    value={field.value}
                    onChange={(value) => {
                        //field.onChange(value);
                    }}
                    onBlur={() => {
                        field.onBlur();
                    }}
                    {...rest}
                />
            )}
        />
    );
};

export default Editor;