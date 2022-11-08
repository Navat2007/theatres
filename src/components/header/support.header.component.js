import React from 'react';

import Button from "../simple/button/button.component";
import Popup from "../popup/popup.component";

const SupportHeaderComponent = () => {

    const [popupOpened, setPopupOpened] = React.useState(false);

    return (
        <>
            <Button
                theme='outline'
                extraClass="header__item --type-support"
                aria-label="Задать вопрос"
                text="Поддержка"
                onClick={() => setPopupOpened(true)}
            >
                <span className="mdi mdi-help"></span>
            </Button>
            <Popup
                title={"Отправить запрос в поддержку"}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
                buttons={<>
                    <Button
                        text={"Отправить"}
                        onClick={() => {

                        }}
                    />
                </>}
            >

            </Popup>
        </>

    );
};

export default SupportHeaderComponent;