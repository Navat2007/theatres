import React from 'react';
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

// all options from https://xdsoft.net/jodit/docs/,
const Editor = ({ control, name, readonly, placeholder, required, value, ...rest }) => {

    const config = {
        readonly: readonly,
        toolbarSticky: false,
        toolbarAdaptive: false,
        about: false,
        addNewLine: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        minHeight: '500px',
        buttons: "bold,italic,underline,ul,ol,font,fontsize,align,|,image,video,|,undo,redo,fullsize,preview,print",
        //preset: 'inline',
        placeholder: placeholder || 'Начните писать...'
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={value}
            rules={{ required: required }}
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