import React from 'react';
import axios from "axios";

import Button from "../simple/button/button.component";
import FieldInput from "../simple/field/field.input.component";

const ImageSelector = ({title, items, onChange}) => {

    const [photo, setPhoto] = React.useState([]);
    const [photoAddBtnDisabled, setPhotoAddBtnDisabled] = React.useState(false);
    const inputRef = React.createRef();

    React.useEffect(() => {

        setPhoto(items);

    }, []);

    React.useEffect(() => {

        onChange(photo);

    }, [photo]);

    const handleAddPhoto = async () => {

        //https://source.unsplash.com/random/200x200?sig=1

        function getOrderIndex(array) {

            let index = 0;

            array.map(item => {

                if(item.order > index)
                    index = item.order;

            });

            return ++index;

        }

        setPhotoAddBtnDisabled(true);

        const value = inputRef.current.value;
        const link = value?.includes('http') ? value : 'http://' + value;

        await axios.get(link)
            .then(res => {
                if(res.status === 200)
                {
                    setPhoto([...photo, {
                        main: photo.length === 0 ? 1 : 0,
                        url: link,
                        order: getOrderIndex(photo)
                    }]);

                    setPhotoAddBtnDisabled(false);
                }
            })
            .catch(err => {
                console.log(err);
                setPhotoAddBtnDisabled(false);
            });

    };

    const handleDeletePhoto = (place) => {



    }

    return (
        <>
            <h2 className="form__title">Фотографии театра</h2>
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
                                {/* Панель при наведении показывается, можно удалить фото или сделать Главной */}
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        text={'Сделать главной'}
                                        aria-label='Сделать главной'
                                        disabled={photoAddBtnDisabled}
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
                                        disabled={photoAddBtnDisabled}
                                    />
                                </div>
                                {/* Панель при наведении показывается, для смены позиции фото, путем нажатия стрелочек влево/вправо */}
                                <div className="gallery-form__thumbs">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-left'}
                                        aria-label='Назад'
                                        disabled={photoAddBtnDisabled}
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-right'}
                                        aria-label='Вперед'
                                        disabled={photoAddBtnDisabled}
                                    />
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