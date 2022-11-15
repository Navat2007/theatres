import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {Helmet} from "react-helmet";

import useAuthStore from "../../../store/authStore";
import useTheatresStore from "../../../store/user/theatresStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useSchoolStore from "../../../store/user/schoolStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import MultiSelect from "../../../components/multi_select/multi_select.component";
import Editor from "../../../components/reach_editor/editor.component";

const MyTheatrePage = () => {

    let {id} = useParams();
    const navigate = useNavigate();

    const {user} = useAuthStore();
    const schoolStore = useSchoolStore();
    const {
        theatre,
        tempTheatre,
        loadTheatre,
        formActivity,
        ageMembers,
        theatreLevel,
        loading,
        sending,
        error,
        errorText,
        clearErrorText
    } = useTheatresStore();
    const teachersStore = useTeachersStore();

    const {register, handleSubmit, reset, control} = useForm();

    const fetchData = async () => {

        await schoolStore.loadSchool({id: user.schoolID});
        await loadTheatre({id});
        await teachersStore.loadTeachers({schoolID: user.schoolID});

    };

    React.useEffect(() => {

        fetchData();

    }, [id]);

    React.useEffect(() => {

        console.log(tempTheatre);

        return () => {

            //ЗАПИСАТЬ В ПЕРЕМЕННУЮ


        };

    }, []);

    const back = () => navigate("/user/theatres");

    const onSubmit = handleSubmit((data) => {

        console.log(data);
        //console.log(editorState);

    });

    if (loading || schoolStore.loading || teachersStore.loading)
        return <div className='content__section'><p>Загрузка...</p></div>;

    if (!schoolStore.loading && Object.keys(schoolStore.school).length === 0)
        return <div className='content__section'><p>Ошибка при загрузке школы. Попробуйте перезагрузить страницу.</p>
        </div>;

    if (id && theatre) {
        return (<>
            <Helmet>
                <title>Создание театра</title>
            </Helmet>
            <div className="content__section">

            </div>
        </>);
    }

    return (<>
        <Helmet>
            <title>Создание театра</title>
        </Helmet>
        <div className="content__section">
            {!id && (
                <>
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
                        <h1 className='content__title'>Создание театра</h1>
                    </div>
                    <form onSubmit={onSubmit} className='form --place-theatre'>
                        <div className="form__container">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Основная информация</h2>
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
                                    {...register("address", {value: schoolStore.school.address})}
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
                                <div className="form__editor-block">
                                    <p className="form__label">Краткое описание</p>
                                    <Editor
                                        control={control}
                                        name="editorShortDescription"
                                    />
                                </div>
                                <div className="form__editor-block">
                                    <p className="form__label">Обращение режиссёра</p>
                                    <Editor
                                        control={control}
                                        name="editorDirectorMessage"
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
                            <fieldset className='form__section --hide'>
                                <h2 className="form__title">Афиши спектаклей</h2>
                            </fieldset>
                            {/* Фото */}
                            <div className="accordion --theme-text --icon-plus form__accordion">
                                <div className="accordion__caption">
                                    Фотографии
                                </div>
                                <div className="accordion__section">
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">Фотографии</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Ссылка на фото"}
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
                                        <h2 className="form__title">фотографии посещения театров</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Ссылка на фото"}
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
                                </div>
                            </div>
                            {/* Видео */}
                            <div className="accordion --theme-text --icon-plus form__accordion">
                                <div className="accordion__caption">
                                    Видео
                                </div>
                                <div className="accordion__section">
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
                                </div>
                            </div>
                            {/* Описания (рецензии) */}
                            <div className="accordion --theme-text --icon-plus form__accordion">
                                <div className="accordion__caption">
                                    Описания (рецензии)
                                </div>
                                <div className="accordion__section">
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
                                            театрах</h2>
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
                                </div>
                            </div>
                        </div>
                        <div className="form__container">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Ссылки на соцсети</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        type='select'
                                        placeholder='Выберите соцсеть из списка...'
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
                                    <FieldInput
                                        type='url'
                                        extraClass='form__social-block-url'
                                        placeholder='Введите url-адрес...'
                                    />
                                </div>
                                {/* Если нужно добавить еще блок тыкаем на плюс, появляется блок как выше */}
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
                            <fieldset className='form__section --hide'>
                                <h2 className="form__title">Подать заявку на фестиваль “Живая сцена”</h2>
                                <Button
                                    type='button'
                                    iconClass={'mdi mdi-plus'}
                                    text='Подать заявку'
                                    aria-label='Подать заяку'
                                />
                            </fieldset>
                        </div>
                        <div className="form__controls">
                            <Button type="submit" theme="primary" text="Сохранить"/>
                        </div>
                    </form>
                </>
            )}
            {id && <p>Театр №{id}</p>}
        </div>
    </>);
};

export default MyTheatrePage;
