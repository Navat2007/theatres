import React from 'react';
import axios from "axios";

import Button from "../simple/button/button.component";
import FieldInput from "../simple/field/field.input.component";

const ImageSelector = ({title, items, onChange, onError}) => {

    const [photo, setPhoto] = React.useState([]);
    const [photoAddBtnDisabled, setPhotoAddBtnDisabled] = React.useState(false);
    const inputRef = React.createRef();

    React.useEffect(() => {

        setPhoto(items);

    }, []);

    React.useEffect(() => {

        onChange(photo);

    }, [photo]);

    function getOrderIndex(array) {

        let index = 0;

        array.map(item => {

            if (item.order > index)
                index = item.order;

        });

        return ++index;

    }

    function setNewOrder(array) {

        return array.map((item, index) => {
            if (index === 0)
                item.main = 1;
            else
                item.main = 0;

            item.order = index + 1;

            return item;
        });

    }

    function moveElementInArray(input, from, to) {
        let numberOfDeletedElm = 1;

        const elm = input.splice(from, numberOfDeletedElm)[0];

        numberOfDeletedElm = 0;

        input.splice(to, numberOfDeletedElm, elm);
    }

    const handleAddPhoto = async () => {

        //https://source.unsplash.com/random/200x200?sig=1

        setPhotoAddBtnDisabled(true);

        const value = inputRef.current.value;
        const link = value?.includes('http') ? value : 'http://' + value;

        await axios.get(link)
            .then(res => {
                if (res.status === 200) {
                    setPhoto([...photo, {
                        main: photo.length === 0 ? 1 : 0,
                        url: link,
                        order: getOrderIndex(photo)
                    }]);

                    setPhotoAddBtnDisabled(false);
                }
            })
            .catch(err => {
                //console.log(err);
                onError("Не удалось загрузить изображение по ссылке");
                setPhotoAddBtnDisabled(false);
            });

    };

    const handleMovePhoto = (elementOrder, toOrder) => {

        let array = [...photo];

        let currentIndex = array.findIndex(item => item.order === elementOrder);
        let wantIndex = array.findIndex(item => item.order === toOrder);

        moveElementInArray(array, currentIndex, wantIndex);

        setPhoto(setNewOrder(array));

    };

    const handleDeletePhoto = (itemOrder) => {

        let array = [...photo].filter(item => item.order !== itemOrder);

        setPhoto(setNewOrder(array));

    }

    return (
        <>
            <h2 className="form__title">{title}</h2>
            <ul className="gallery-form">
                {
                    photo.map((item, index) =>
                        item.main
                            ?
                            (<li key={index} className='gallery-form__item'>
                                <img className='gallery-form__img'
                                     src={item.url}
                                     alt={"Изображение " + item.url}
                                />
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleDeletePhoto(item.order)}
                                    />
                                </div>
                                <div className="gallery-form__title">1. Главная</div>
                            </li>)
                            :
                            (<li key={index} className='gallery-form__item'>
                                <img className='gallery-form__img'
                                     src={item.url}
                                     alt={"Изображение " + item.url}
                                />
                                <span className="gallery-form__current-position">{item.order}</span>
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        text={'Сделать главной'}
                                        aria-label='Сделать главной'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleMovePhoto(item.order, 1)}
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleDeletePhoto(item.order)}
                                    />
                                </div>
                                <div className="gallery-form__thumbs">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-left'}
                                        aria-label='Назад'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleMovePhoto(item.order, item.order - 1)}
                                    />
                                    {
                                        index < photo.length - 1
                                        &&
                                        <Button
                                            type='button'
                                            theme='white'
                                            size='smaller'
                                            isIconBtn='true'
                                            iconClass={'mdi mdi-chevron-right'}
                                            aria-label='Вперед'
                                            disabled={photoAddBtnDisabled}
                                            onClick={() => handleMovePhoto(item.order, item.order + 1)}
                                        />
                                    }
                                </div>
                            </li>)
                    )
                }
            </ul>
            <div className="form__group-block">
                <FieldInput
                    ref={inputRef}
                    label={"Ссылка на фото"}
                    type='url'
                    extraClass='form__field'
                    placeholder='Введите url-адрес...'
                    layout='flex'
                />
                <a
                    className='form__social-link --hide'
                    href=""
                    aria-label='Открыть в новой вкладке'
                    title='Открыть в новой вкладке'
                    target={'_blank'}
                    rel='nofollow noreferer noopener'>
                    <span className='mdi mdi-open-in-new'/>
                </a>
                <Button
                    type='button'
                    theme='text'
                    size='small'
                    extraClass="form__icon-btn"
                    iconClass={'mdi mdi-plus'}
                    isIconBtn='true'
                    aria-label='Добавить поле'
                    disabled={photoAddBtnDisabled}
                    onClick={handleAddPhoto}
                />
            </div>
        </>
    );
};

export default ImageSelector;