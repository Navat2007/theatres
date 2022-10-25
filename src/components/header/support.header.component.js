import React from 'react';

import Button from "../simple/button/button.component";
import Popup from "../popup/popup.component";

const SupportHeaderComponent = () => {

    const [popupOpened, setPopupOpened] = React.useState(false);

    return (
        <>
            <Button
                className="--theme-outline --icon-on-before --variant-icon mdi mdi-help header__item --type-support"
                aria-label="Задать вопрос"
                onClick={() => setPopupOpened(true)}
            >
                <span>Поддержка</span>
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