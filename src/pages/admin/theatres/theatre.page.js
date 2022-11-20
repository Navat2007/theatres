import React from "react";
import { useParams } from "react-router-dom";

import Button from "../../../components/simple/button/button.component";

const TheatrePage = () => {
    let { id } = useParams();

    return (
        <div className="content__section">
            {!id && (
                <>
                    <div className="content__title-block">
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                        />
                        <h1 className="content__title">Создание театра</h1>
                    </div>
                </>
            )}
            {id && (
                <>
                    <div className="content__title-block">
                        <Button
                            type="button"
                            theme="text"
                            size="small"
                            iconClass={"mdi mdi-arrow-left"}
                            isIconBtn="true"
                            aria-label="Назад"
                        />
                        <h1 className="content__title">Театр №-{id}</h1>
                    </div>
                    <a
                        className="link"
                        href=""
                        target={"_blank"}
                        rel="noopener nofollow noreferer"
                    >
                        Страница театра{" "}
                        <span className="mdi mdi-open-in-new"></span>
                    </a>
                </>
            )}
        </div>
    );
};

export default TheatrePage;
