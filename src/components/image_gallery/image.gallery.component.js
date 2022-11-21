import React from "react";

import ImagePreview from "../image_preview/image.preview.component";

const ImageGallery = ({title, items}) => {

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
            <article className="public-content__wrap gallery">
                <h2 className="section-title">{title}</h2>
                <ul className="gallery__card-deck">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="gallery__card"
                            onClick={() => handleOpenPreview(index)}
                        >
                            <img
                                className="gallery__img"
                                src={item.url}
                                alt=""
                            />
                        </li>
                    ))}
                </ul>
            </article>
            {preview}
        </>
    );
};

export default ImageGallery;
