import React from "react";

import ImagePreview from "../image_preview/image.preview.component";
import styles from "../page_components/theatre/theatre.module.scss";

const ImageGallery = ({title, items, front = true}) => {

    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex) => {

        setPreview(<ImagePreview
            open={true}
            index={slideIndex}
            items={items}
            onClose={() => setPreview(<></>)}
        />)

    };

    return (
        <>
            {
                front
                &&
                <article className="public-content__wrap gallery">
                    {
                        title
                        &&
                        <h2 className="section-title">{title}</h2>
                    }
                    <ul className="gallery__card-deck">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="gallery__card"
                                onClick={() => handleOpenPreview(index)}
                            >
                                <img
                                    className="gallery__img"
                                    src={item.isFile === 1 && item.isLoaded === 1 ? process.env.REACT_APP_BASE_URL + item.url : item.url}
                                    alt=""
                                />
                            </li>
                        ))}
                    </ul>
                </article>
            }
            {
                !front
                &&
                <>
                    <h2 className={styles.title}>{title}</h2>
                    {items && items.length > 0 ? (
                        <ul className="gallery-form">
                            {items.map((item) =>
                                item.order === 1 ? (
                                    <li
                                        key={item.url}
                                        className="gallery-form__item"
                                        onClick={() =>
                                            handleOpenPreview(
                                                item.order - 1,
                                                items
                                            )
                                        }
                                    >
                                        <img
                                            className="gallery-form__img"
                                            src={
                                                item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url
                                            }
                                            alt="Изображение "
                                        />
                                        <div className="gallery-form__title">
                                            1. Главная
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        key={item.url}
                                        className="gallery-form__item"
                                        onClick={() =>
                                            handleOpenPreview(
                                                item.order - 1,
                                                items
                                            )
                                        }
                                    >
                                        <img
                                            className="gallery-form__img"
                                            src={
                                                item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url
                                            }
                                            alt="Изображение "
                                        />
                                        <span className="gallery-form__current-position">
                                                {item.order}
                                            </span>
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>Нет фото</p>
                    )}
                </>
            }
            {preview}
        </>
    );
};

export default ImageGallery;
