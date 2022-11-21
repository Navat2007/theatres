import React from 'react';

const ImageGallery = ({title, items}) => {



    return (
        <article className="public-content__wrap gallery">
            <h2 className="section-title">{title}</h2>
            <ul className="gallery__card-deck">
                {
                    items.map(item => (
                        <li className="gallery__card">
                            <img
                                className="gallery__img"
                                src={item.url}
                                alt=""
                            />
                        </li>
                    ))
                }
            </ul>
        </article>
    );

};

export default ImageGallery;