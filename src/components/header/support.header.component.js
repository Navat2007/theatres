import React from 'react';
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

import Button from "../simple/button/button.component";
import Popup from "../popup/popup.component";
import FieldInput from "../simple/field/field.input.component";

const SupportHeaderComponent = () => {

    const user = useSelector(state => state.auth.user);

    const {register, handleSubmit, reset} = useForm();
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [sending, setSending] = React.useState(false);


    const onSendSubmit = (params) => {
        console.log(params);
    }

    return (
        <>
            <Button
                type='button'
                theme='outline'
                iconClass='mdi mdi-help'
                extraClass="header__item --type-support"
                aria-label="Задать вопрос"
                text="Поддержка"
                onClick={() => setPopupOpened(true)}
            />
            <Popup
                title={"Отправить запрос в поддержку?"}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
            >
                <form onSubmit={handleSubmit(onSendSubmit)} className='form --place-new-user'>
                    <fieldset className='form__section --content-info'>
                        <FieldInput
                            label={"Email для ответа:"}
                            placeholder={"Введите email..."}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("email", {value: user.email})}
                        />
                        <FieldInput
                            label={"Опишите Ваш вопрос:"}
                            type={"textarea"}
                            rows={10}
                            placeholder={"Ваш вопрос... \n(если Ваш вопрос касается конкретного театра, заявки, педагога и т.п., указывайте пожалуйста его ID)"}
                            fieldClassName={"--type-flex"}
                            required={true}
                            {...register("text")}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button type="submit" text="Отправить" spinnerActive={sending}/>
                    </div>
                </form>
            </Popup>
        </>

    );
};

export default SupportHeaderComponent;