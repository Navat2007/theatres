import React from 'react';

import Button from "../simple/button/button.component";
import Popup from "../popup/popup.component";

const SupportHeaderComponent = () => {

    const [popupOpened, setPopupOpened] = React.useState(false);

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
                notif={{
                    active: true,
                }}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
                buttons={<>
                    <Button
                        type='button'
                        text="Отправить"
                        onClick={() => { }}
                    />
                </>}
            />
        </>

    );
};

export default SupportHeaderComponent;