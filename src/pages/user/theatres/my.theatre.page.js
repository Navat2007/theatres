import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuthStore from "../../../store/authStore";
import useTheatresStore from "../../../store/user/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import MultiSelect from "../../../components/multi_select/multi_select.component";
import Editor from "../../../components/reach_editor/editor.component";
import Accordion from "../../../components/simple/accordion/accordion.component";
import Popup from "../../../components/popup/popup.component";
import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";

const MyTheatrePage = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const schoolStore = useSchoolStore();
    const {
        theatre,
        tempTheatre,
        loadTheatre,
        formActivity,
        ageMembers,
        loading,
        sending,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const { register, handleSubmit, reset, control } = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [socialLinks, setSocialLinks] = React.useState([]);

    const fetchData = async () => {

        await schoolStore.loadSchool({ id: user.schoolID });
        await teachersStore.loadTeachers({ schoolID: user.schoolID });

        if (id)
            await loadTheatre({ id });

    };

    React.useEffect(() => {

        fetchData();

    }, [id]);

    React.useEffect(() => {

        console.log("Temp theatre: ", tempTheatre);

        return () => {

            //ЗАПИСАТЬ В ПЕРЕМЕННУЮ

        };

    }, []);

    const back = () => navigate("/user/theatres");

    const onSubmit = handleSubmit((data) => {

        console.log(data);
        //console.log(editorState);

    });

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

        setSocialLinks([...socialLinks, { id: window.global.makeid(12), url: "" }]);

    };

    if (loading || schoolStore.loading || teachersStore.loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (!schoolStore.loading && Object.keys(schoolStore.school).length === 0)
        return <div className='content__section'><p>Ошибка при загрузке школы. Попробуйте перезагрузить страницу.</p>
        </div>;

    if (id && theatre) {
        return (<>
            <div className="content__section">

            </div>
        </>);
    }

    return (<>
        <div className="content__section">
            <div className="content__title-block">
                <Button
                    type='button'
                    theme='text'
                    size='small'
                    iconClass={'mdi mdi-arrow-left'}
                    isIconBtn='true'
                    aria-label='Назад'
                    onClick={back}
                />
                <h1 className='content__title --mb-small'>Создание театра</h1>
            </div>
            <form onSubmit={onSubmit} className='form'>
                <Tabs>
                    <Tab index={1} title={"Основная информация"} extraClass='form__tab form__container --view-two-columns'>
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
                                {...register("address", { value: schoolStore.school.address })}
                            />
                            <div className="form__multy-block">
                                <p className="form__label">Форма осуществления деятельности</p>
                                <MultiSelect
                                    required={true}
                                    control={control}
                                    isMulti={true}
                                    name={"form_activity_select"}
                                    closeMenuOnSelect={false}
                                    options={formActivity.map((item) => {
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
                                    options={ageMembers.map((item) => {
                                        return {
                                            label: item,
                                            value: item,
                                        };
                                    })}
                                />
                            </div>
                            <FieldInput
                                label={"Год основания"}
                                type='date'
                                layout='flex'
                                required={true}
                            />
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className="form__title">Ссылки на соцсети</h2>
                            {
                                socialLinks.map(item => (
                                    <div
                                        className="form__field-block"
                                        key={item.id}
                                    >
                                        <FieldInput
                                            type='url'
                                            placeholder='Введите url-адрес...'
                                        />
                                        <Button
                                            type='button'
                                            theme='text'
                                            size='small'
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
                            <div className="form__field-block">
                                <FieldInput
                                    type='url'
                                    placeholder='Введите url-адрес...'
                                    {...register("theatreUrlSchool")}
                                />
                            </div>
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className="form__title">Педагоги</h2>
                            <MultiSelect
                                control={control}
                                isMulti={true}
                                name={"teachers_select"}
                                closeMenuOnSelect={false}
                                options={teachersStore.teachers.map((item) => {
                                    return {
                                        label: `${item.f} ${item.i} ${item.o}`,
                                        value: item.ID,
                                    };
                                })}
                            />
                        </fieldset>
                    </Tab>
                    <Tab index={2} title={"Краткое описание"} extraClass='form__tab'>
                        <div className="form__editor-block">
                            <p className="form__label">Краткое описание</p>
                            <Editor
                                required={true}
                                control={control}
                                name="editorShortDescription"
                            />
                        </div>
                    </Tab>
                    <Tab index={3} title={"Обращение режиссёра"} extraClass='form__tab'>
                        <div className="form__editor-block">
                            <p className="form__label">Обращение режиссёра</p>
                            <Editor
                                control={control}
                                name="editorDirectorMessage"
                            />
                        </div>
                    </Tab>
                    <Tab index={4} title={"Фотографии"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <h2 className="form__title">Фотографии театра</h2>
                            <ul className="gallery-form">
                                {/* Первая всегда Главная, там нет стрелок для смены позиции, есть только удалить, если удалить, то вторая соотв.становится Главной  */}
                                <li className='gallery-form__item'>
                                    <img className='gallery-form__img'
                                        src="https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg"
                                        alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg" />
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
                                        alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678358_6-vsegda-pomnim-com-p-reki-rossii-foto-6.jpg" />
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
                    <Tab index={5} title={"Видео"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <h2 className="form__title">Видео лучших фрагментов</h2>
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на видео"}
                                    type='url'
                                    placeholder='Введите url-адрес...'
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
                            <h2 className="form__title">Видео визитка школьного театра</h2>
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на видео"}
                                    type='url'
                                    placeholder='Введите url-адрес...'
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
                    <Tab index={6} title={"Описания (рецензии)"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <h2 className="form__title">Рассказ о других школьных театрах</h2>
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Название театра"}
                                    type='text'
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
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Название театра"}
                                    type='text'
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
                    <Button
                        type="submit"
                        theme="primary"
                        text="Сохранить"
                    />
                    <Button
                        type="button"
                        theme="text"
                        text="Отмена"
                        onClick={back}
                    />
                </div>
            </form>
        </div>
        {popup}
    </>);
};

export default MyTheatrePage;
