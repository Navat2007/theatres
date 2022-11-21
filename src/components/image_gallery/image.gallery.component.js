import React from "react";

import ImagePreview from "../image_preview/image.preview.component";

const ImageGallery = ({title, items}) => {

    const [opened, setOpened] = React.useState({
        open: false,
        index: 0
    });

    return (
        <>
            <article className="public-content__wrap gallery">
                <h2 className="section-title">{title}</h2>
                <ul className="gallery__card-deck">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="gallery__card"
                            onClick={() => setOpened({open: true, index})}
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
            <ImagePreview
                open={opened.open}
                index={opened.index}
                items={items}
                onClose={() => setOpened({open: false, index: 0})}
            />
        </>
    );
};

export default ImageGallery;
