import React from 'react';
import {useForm } from 'react-hook-form';

import useAuthStore from '../../../store/authStore';
import useTeachersStore from './../../../store/admin/teachersStore';
import useTheatresStore from '../../../store/user/theatresStore';
import useSchoolStore from '../../../store/user/schoolStore';

import MultiSelect from '../../multi_select/multi_select.component';
import Editor from '../../reach_editor/editor.component';
import Button from '../../simple/button/button.component';
import FieldInput from '../../simple/field/field.input.component';
import Tab from '../../tabs/tab.component';
import Tabs from '../../tabs/tabs.component';
import Popup from "../../../components/popup/popup.component";

function TheatreRequest({onSubmitDone = () => null, onBack = () => null, onDecline = () => null, request, isAdmin}) {

    const {register, handleSubmit, reset, control, getValues, setValue, watch} = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [socialLinks, setSocialLinks] = React.useState([]);

    const theatreUrlSchoolWatch = watch('theatreUrlSchool');
    const videoBusinessCardWatch = watch('videoBusinessCard');

    const {user} = useAuthStore();
    const theatreStore = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    React.useEffect(() => {

        if (request) {

            console.log("Have data: ", request);

            setValue("title", request.title);
            setValue("address", request.address);
            setValue("foundationDate", request.foundation_date);
            setValue("theatreUrlSchool", request.theatre_url_school);
            setValue("videoBusinessCard", request.video_business_card);
            setValue("editorShortDescription", request.short_description);
            setValue("editorDirectorMessage", request.director_message);

            let socialLinksArray = request.social_links.map((link) => {
                return {id: window.global.makeid(12), url: link, img: window.global.getSocialIcon(link)};
            });

            setSocialLinks(socialLinksArray);

        }

    }, []);

    const handlePhoto = () => {

        setPopup(
            <Popup
                title={"Фото театра"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
            >

            </Popup>
        );

    };

    const handleSocialLink = () => {

        setSocialLinks([...socialLinks, {id: window.global.makeid(12), url: ""}]);

    };

    const performData = () => {

        const data = getValues();
        console.log("GetValues: ", data);

        let sendObject = {
            schoolID: user.schoolID,
            title: data.title,
            address: data.address,
            foundationDate: data.foundationDate,
            theatreUrlSchool: data.theatreUrlSchool,
            videoBusinessCard: data.videoBusinessCard,
        };

        if (data.form_activity_select && data.form_activity_select.length > 0)
            sendObject['formActivity'] = Array.from(data.form_activity_select.map(item => item.value));

        if (data.age_members_select && data.age_members_select.length > 0)
            sendObject['ageMembers'] = Array.from(data.age_members_select.map(item => item.value));

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject['teachers'] = Array.from(data.teachers_select.map(item => item.value));

        if (socialLinks.length > 0)
            sendObject['socialLinks'] = Array.from(socialLinks.map(link => link.url));

        if (data.editorShortDescription)
            sendObject['editorShortDescription'] = data.editorShortDescription;

        if (data.editorDirectorMessage)
            sendObject['editorDirectorMessage'] = data.editorDirectorMessage;

        console.log("Подготовленные данные: ", sendObject);

        return sendObject;

    };

    const onSubmit = handleSubmit(async (data) => {

        onSubmitDone(performData());

    });

    return (
        <form onSubmit={onSubmit} className='form'>
            <Tabs>
                <Tab title={"Основная информация"} extraClass='form__tab form__container --view-two-columns'>
                    <fieldset className='form__section'>
                        <FieldInput
                            label={"Название театра"}
                            type='text'
                            layout='flex'
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                        />
                        <FieldInput
                            label={"Адрес"}
                            type='textarea'
                            layout='flex'
                            required={true}
                            placeholder={"Введите адрес"}
                            {...register("address", {value: schoolStore?.school?.address})}
                        />
                        <div className="form__multy-block">
                            <p className="form__label">Форма осуществления деятельности</p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={true}
                                name={"form_activity_select"}
                                closeMenuOnSelect={false}
                                values={request?.form_activity?.map((item) => {
                                    return {
                                        label: item.activity,
                                        value: item.activity,
                                    };
                                })}
                                options={theatreStore.formActivity.map((item) => {
                                    return {
                                        label: item,
                                        value: item,
                                    };
                                })}
                            />
                        </div>
                        <div className="form__multy-block">
                            <p className="form__label">Возрастной состав участников школьного театра</p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={true}
                                name={"age_members_select"}
                                closeMenuOnSelect={false}
                                values={request?.age_members?.map((item) => {
                                    return {
                                        label: item.age,
                                        value: item.age,
                                    };
                                })}
                                options={theatreStore.ageMembers.map((item) => {
                                    return {
                                        label: item,
                                        value: item,
                                    };
                                })}
                            />
                        </div>
                        <FieldInput
                            label={"Дата основания"}
                            type='date'
                            layout='flex'
                            required={true}
                            {...register("foundationDate")}
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Ссылки на соцсети</h2>
                        {
                            socialLinks.map(item => (
                                <div
                                    className="form__group-block"
                                    key={item.id}
                                >
                                    {
                                        item.img &&
                                        <span className="form__social-icon">{item.img}</span>
                                    }
                                    <FieldInput
                                        type='text'
                                        extraClass='form__field'
                                        placeholder='Введите url-адрес...'
                                        {...register("social_" + item.id, {value: item.url})}
                                        onChange={(event) => {
                                            setSocialLinks(socialLinks.map(link => {

                                                if (link.id === item.id) {
                                                    link.img = window.global.getSocialIcon(event.target.value);
                                                }

                                                return link;

                                            }));
                                            setValue("social_" + item.id, event.target.value);
                                        }}
                                        onBlur={(event) => {
                                            setSocialLinks(socialLinks.map(link => {

                                                if (link.id === item.id) {
                                                    link.url = event.target.value;
                                                }

                                                return link;

                                            }));
                                            setValue("social_" + item.id, event.target.value);
                                        }}
                                        required={true}
                                    />
                                    {
                                        item.img &&
                                        <a
                                            className='form__social-link'
                                            href={item.url.includes('http') ? item.url : 'http://' + item.url}
                                            aria-label='Открыть в новой вкладке'
                                            title='Открыть в новой вкладке'
                                            target={'_blank'}
                                            rel='nofollow noreferer noopener'>
                                            <span className='mdi mdi-open-in-new'/>
                                        </a>
                                    }
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='smaller'
                                        extraClass="form__icon-btn"
                                        iconClass={'mdi mdi-close'}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                        onClick={() => {
                                            setSocialLinks(socialLinks.filter(link => link.id !== item.id));
                                        }}
                                    />
                                </div>
                            ))
                        }
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                            onClick={handleSocialLink}
                        />
                        <h2 className="form__title">Ссылка на страницу театра на сайте образовательной
                            организации </h2>
                        <div className="form__group-block">
                            <FieldInput
                                type='url'
                                extraClass='form__field'
                                placeholder='Введите url-адрес...'
                                {...register("theatreUrlSchool")}
                            />
                            {
                                theatreUrlSchoolWatch && theatreUrlSchoolWatch.length > 0
                                &&
                                <a
                                    className='form__social-link'
                                    href={theatreUrlSchoolWatch.includes('http') ? theatreUrlSchoolWatch : 'http://' + theatreUrlSchoolWatch}
                                    aria-label='Открыть в новой вкладке'
                                    title='Открыть в новой вкладке'
                                    target={'_blank'}
                                    rel='nofollow noreferer noopener'>
                                    <span className='mdi mdi-open-in-new'/>
                                </a>
                            }
                        </div>
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Педагоги</h2>
                        <MultiSelect
                            control={control}
                            isMulti={true}
                            name={"teachers_select"}
                            closeMenuOnSelect={false}
                            values={request?.teachers?.map((item) => {
                                return {
                                    label: item.fio,
                                    value: item.ID,
                                };
                            })}
                            options={teachersStore?.teachers?.map((item) => {
                                return {
                                    label: `${item.f} ${item.i} ${item.o}`,
                                    value: item.ID,
                                };
                            })}
                        />
                    </fieldset>
                </Tab>
                <Tab title={"Краткое описание"} extraClass='form__tab'>
                    <div className="form__editor-block">
                        <p className="form__label">Краткое описание</p>
                        <Editor
                            control={control}
                            name="editorShortDescription"
                        />
                    </div>
                </Tab>
                <Tab title={"Обращение режиссёра"} extraClass='form__tab'>
                    <div className="form__editor-block">
                        <p className="form__label">Обращение режиссёра</p>
                        <Editor
                            control={control}
                            name="editorDirectorMessage"
                        />
                    </div>
                </Tab>
                <Tab title={"Фотографии"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Фотографии театра</h2>
                        <ul className="gallery-form">
                            {/* Первая всегда Главная, там нет стрелок для смены позиции, есть только удалить, если удалить, то вторая соотв.становится Главной  */}
                            <li className='gallery-form__item'>
                                <img className='gallery-form__img'
                                     src="https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg"
                                     alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg"/>
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
                                {/* Наглядно показывает, что картинка Главная */}
                                <div className="gallery-form__title">1. Главная</div>
                            </li>
                            {/* Остальные фото будут по сл.разметке */}
                            <li className='gallery-form__item'>
                                <img className='gallery-form__img'
                                     src="https://vsegda-pomnim.com/uploads/posts/2022-03/1648678358_6-vsegda-pomnim-com-p-reki-rossii-foto-6.jpg"
                                     alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678358_6-vsegda-pomnim-com-p-reki-rossii-foto-6.jpg"/>
                                {/* Показывает какая позиция у фото */}
                                <span className="gallery-form__current-position">2</span>
                                {/* Панель при наведении показывается, можно удалить фото или сделать Главной */}
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        text={'Сделать главной'}
                                        aria-label='Сделать главной'
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
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
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-right'}
                                        aria-label='Вперед'
                                    />
                                </div>
                            </li>
                        </ul>
                        <Button
                            type='button'
                            text={'Добавить фото'}
                            extraClass={'form__add-btn'}
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Фотографии посещения театра</h2>
                        {/* Такая же структура */}
                        <p>Нет загруженного контента</p>
                    </fieldset>
                </Tab>
                <Tab title={"Видео"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Видео визитка школьного театра</h2>
                        <div className="form__group-block">
                            <FieldInput
                                label={"Ссылка на видео"}
                                type='url'
                                extraClass='form__field'
                                placeholder='Введите url-адрес...'
                                layout='flex'
                                {...register("videoBusinessCard")}
                            />
                            {
                                videoBusinessCardWatch && videoBusinessCardWatch.length > 0
                                &&
                                <a
                                    className='form__social-link'
                                    href={videoBusinessCardWatch.includes('http') ? videoBusinessCardWatch : 'http://' + videoBusinessCardWatch}
                                    aria-label='Открыть в новой вкладке'
                                    title='Открыть в новой вкладке'
                                    target={'_blank'}
                                    rel='nofollow noreferer noopener'>
                                    <span className='mdi mdi-open-in-new'/>
                                </a>
                            }
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass="form__icon-btn"
                                iconClass={'mdi mdi-close'}
                                isIconBtn='true'
                                aria-label='Удалить поле'
                            />
                        </div>
                        {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Видео лучших фрагментов</h2>
                        <div className="form__group-block">
                            <FieldInput
                                label={"Ссылка на видео"}
                                type='url'
                                extraClass='form__field'
                                placeholder='Введите url-адрес...'
                                layout='flex'
                            />
                            <a
                                className='form__social-link'
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
                                iconClass={'mdi mdi-close'}
                                isIconBtn='true'
                                aria-label='Удалить поле'
                            />
                        </div>
                        {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                </Tab>
                <Tab title={"Описания (рецензии)"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Рассказ о других школьных театрах</h2>
                        <div className="form__group-block">
                            <FieldInput
                                label={"Название театра"}
                                type='text'
                                extraClass='form__field'
                                placeholder='Введите название...'
                                layout='flex'
                            />
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass="form__icon-btn"
                                iconClass={'mdi mdi-close'}
                                isIconBtn='true'
                                aria-label='Удалить поле'
                            />
                            <div className="form__editor-block">
                                <p className="form__label">Описание театра</p>
                                <Editor
                                    control={control}
                                    name="editorTheatreDescription"
                                />
                            </div>
                        </div>
                        {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Рассказы (рецензии) о посещении других московских
                            театров</h2>
                        <div className="form__group-block">
                            <FieldInput
                                label={"Название театра"}
                                type='text'
                                extraClass='form__field'
                                placeholder='Введите название...'
                                layout='flex'
                            />
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass="form__icon-btn"
                                iconClass={'mdi mdi-close'}
                                isIconBtn='true'
                                aria-label='Удалить поле'
                            />
                            <div className="form__editor-block">
                                <p className="form__label">Описание посещения театра</p>
                                <Editor
                                    control={control}
                                    name="editorTheatreVisit"
                                />
                            </div>
                        </div>
                        {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                </Tab>
            </Tabs>
            <div className="form__controls">
                {
                    isAdmin
                        ?
                        <>
                            <Button
                                type="submit"
                                theme="primary"
                                text="Принять"
                            />
                            <Button
                                type="button"
                                theme="primary"
                                text="Отклонить"
                                onClick={() => {

                                    if (onDecline)
                                        onDecline(performData());

                                }}
                            />
                            <Button
                                type="button"
                                theme="text"
                                text="Отмена"
                                onClick={onBack}
                            />
                        </>
                        :
                        <>
                            <Button
                                type="submit"
                                theme="primary"
                                text="Сохранить"
                            />
                            <Button
                                type="button"
                                theme="text"
                                text="Отмена"
                                onClick={onBack}
                            />
                        </>
                }
            </div>
        </form>
    )
}

export default TheatreRequest
